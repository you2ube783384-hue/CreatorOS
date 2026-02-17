import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { env } from "@/lib/env";
import { supabaseServer } from "@/lib/supabase-server";

export async function POST(req: Request) {
  const rawBody = await req.text();
  const sig = headers().get("stripe-signature");
  if (!sig) return new Response("Missing signature", { status: 400 });

  const event = stripe.webhooks.constructEvent(rawBody, sig, env.stripeWebhookSecret);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    await supabaseServer.from("subscriptions").upsert({
      user_id: session.metadata?.userId,
      stripe_customer_id: session.customer,
      stripe_subscription_id: session.subscription,
      plan: "pro",
      status: "active"
    });
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object;
    await supabaseServer
      .from("subscriptions")
      .update({ status: "canceled", plan: "free" })
      .eq("stripe_subscription_id", subscription.id);
  }

  return new Response("ok");
}
