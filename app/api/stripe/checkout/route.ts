import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { env } from "@/lib/env";

export async function POST() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.redirect(`${env.appUrl}/login`);

  const hdrs = headers();
  const origin = hdrs.get("origin") ?? env.appUrl;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: user.email,
    line_items: [{ price: env.stripePriceId, quantity: 1 }],
    success_url: `${origin}/dashboard/settings?billing=success`,
    cancel_url: `${origin}/dashboard/settings?billing=cancelled`,
    metadata: { userId: user.id }
  });

  return NextResponse.redirect(session.url!, { status: 303 });
}
