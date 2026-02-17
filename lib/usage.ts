import { supabaseServer } from "@/lib/supabase-server";
import { FeatureKey } from "@/lib/types";

const FREE_LIMIT = 15;

export async function assertCanGenerate(userId: string) {
  const { data: subscription } = await supabaseServer
    .from("subscriptions")
    .select("plan,status")
    .eq("user_id", userId)
    .maybeSingle();

  if (subscription?.plan === "pro" && subscription.status === "active") {
    return { allowed: true, plan: "pro" as const };
  }

  const { count } = await supabaseServer
    .from("usage_logs")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);

  return { allowed: (count ?? 0) < FREE_LIMIT, plan: "free" as const, remaining: FREE_LIMIT - (count ?? 0) };
}

export async function logUsage(userId: string, feature: FeatureKey, tokens: number, prompt: string, result: unknown) {
  await supabaseServer.from("usage_logs").insert({
    user_id: userId,
    feature,
    tokens_consumed: tokens
  });

  await supabaseServer.from("generations").insert({
    user_id: userId,
    feature,
    prompt,
    output: result
  });
}
