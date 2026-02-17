import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { supabaseServer } from "@/lib/supabase-server";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const { data: subscription } = await supabaseServer
    .from("subscriptions")
    .select("plan")
    .eq("user_id", user.id)
    .maybeSingle();

  const { count } = await supabaseServer
    .from("usage_logs")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id);

  return (
    <DashboardShell email={user.email ?? "Unknown"} plan={subscription?.plan ?? "free"} usage={count ?? 0}>
      {children}
    </DashboardShell>
  );
}
