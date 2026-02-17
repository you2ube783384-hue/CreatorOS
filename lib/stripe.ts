import Stripe from "stripe";
import { env } from "@/lib/env";

export const stripe = new Stripe(env.stripeSecretKey, {
  apiVersion: "2025-01-27.acacia"
});
