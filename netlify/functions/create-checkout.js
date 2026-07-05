// Serverless function that creates a Stripe Checkout session for the cart.
// Deployed automatically by Netlify from this folder. Requires the
// STRIPE_SECRET_KEY and SITE_URL environment variables (see STRIPE-SETUP.md).
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (e) {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  const items = Array.isArray(payload.items) ? payload.items : [];
  if (!items.length) {
    return { statusCode: 400, body: "Cart is empty" };
  }

  const line_items = items.map((it) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: String(it.name).slice(0, 120),
        description: String(it.details || "").slice(0, 250) || undefined,
      },
      unit_amount: Math.round(Number(it.unitPrice) * 100),
    },
    quantity: Math.max(1, Math.min(50, Number(it.qty) || 1)),
  }));

  const customer = payload.customer || {};
  const siteUrl = process.env.SITE_URL || `https://${event.headers.host}`;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${siteUrl}/?order=success`,
      cancel_url: `${siteUrl}/?order=cancelled`,
      metadata: {
        customer_name: String(customer.name || "").slice(0, 100),
        customer_phone: String(customer.phone || "").slice(0, 30),
        pickup_time: String(customer.pickupTime || "").slice(0, 50),
        notes: String(customer.notes || "").slice(0, 400),
      },
    });
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error("Stripe error:", err.message);
    return { statusCode: 500, body: "Could not create checkout session" };
  }
};
