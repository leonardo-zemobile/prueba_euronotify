import Stripe from "stripe";

// Initialize the Stripe client with the secret key and a specific API version.
// It's good practice to keep the API version consistent.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});
