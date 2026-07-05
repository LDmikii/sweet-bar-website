// Vercel serverless function that creates a Stripe Checkout session for the cart.
// Lives at /api/create-checkout when deployed on Vercel. Requires the
// STRIPE_SECRET_KEY and SITE_URL environment variables (see STRIPE-SETUP.md).
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const payload = req.body || {};
  const items = Array.isArray(payload.items) ? payload.items : [];
  if (!items.length) {
    return res.status(400).send("Cart is empty");
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
  const siteUrl = process.env.SITE_URL || `https://${req.headers.host}`;

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
    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err.message);
    return res.status(500).send("Could not create checkout session");
  }
};
