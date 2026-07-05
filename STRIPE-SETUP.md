# Activating Stripe online payments

The site is already wired for Stripe — customers will see a "💳 Pay online now"
option at checkout once you complete these steps. Until then it shows
"coming soon" and orders default to pay-at-pickup.

The payment function is included for both hosts:
- **Vercel** → `api/create-checkout.js` (endpoint `/api/create-checkout`)
- **Netlify** → `netlify/functions/create-checkout.js` (endpoint `/.netlify/functions/create-checkout`)

## What you need
1. A free Stripe account: https://dashboard.stripe.com/register
2. The site deployed on Vercel (or Netlify)

## Steps (Vercel)

1. **Get your Stripe secret key**
   - In the Stripe dashboard go to **Developers → API keys**.
   - Copy the **Secret key** (starts with `sk_live_...`, or `sk_test_...` for testing).

2. **Add environment variables in Vercel**
   - Your project → **Settings → Environment Variables** → add:
     - `STRIPE_SECRET_KEY` = your secret key
     - `SITE_URL` = your site's URL, e.g. `https://sweet-bar-website.vercel.app`
   - Redeploy the site after saving (Deployments → ⋯ → Redeploy).

3. **Turn on the card option in the site code**
   - In `app.js`, find `const STRIPE_ENDPOINT = "";`
   - Change it to: `const STRIPE_ENDPOINT = "/api/create-checkout";`
   - Commit/upload the change so Vercel redeploys.

4. **Test it**
   - Use a `sk_test_...` key first. At checkout pick "Pay online now" and pay with
     Stripe's test card `4242 4242 4242 4242`, any future date, any CVC.
   - Pickup name, phone, time and notes arrive in Stripe under the payment's
     **metadata**, so you can see who each order is for.
   - When everything works, swap in the `sk_live_...` key to accept real payments.

Stripe's fee is 2.9% + 30¢ per card payment. Never put the secret key in
`app.js` or anywhere in the website files — it only goes in the host's
environment variables.
