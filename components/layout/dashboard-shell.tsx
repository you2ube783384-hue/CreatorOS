"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  ["Niche Intelligence", "/dashboard/niche-intelligence"],
  ["Viral Script Builder", "/dashboard/viral-script-builder"],
  ["Hook Analyzer", "/dashboard/hook-analyzer"],
  ["30-Day Planner", "/dashboard/planner"],
  ["Monetization Map", "/dashboard/monetization"],
  ["Account Settings", "/dashboard/settings"]
];

export function DashboardShell({ children, email, plan, usage }: { children: React.ReactNode; email: string; plan: string; usage: number }) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[260px_1fr]">
      <aside className="border-r border-white/10 p-5">
        <div className="mb-8 text-xl font-bold">CreatorOS</div>
        <nav className="space-y-2">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className={cn("block rounded-lg px-3 py-2 text-sm text-muted hover:bg-white/10", pathname === href && "bg-white/10 text-white")}>
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <section className="p-4 md:p-6">
        <div className="glass mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl p-4">
          <div>
            <p className="text-sm text-muted">{email}</p>
            <div className="mt-1 flex items-center gap-2">
              <Badge>{plan.toUpperCase()}</Badge>
              <span className="text-xs text-muted">Credits used: {usage}</span>
            </div>
          </div>
          <Button variant="outline" onClick={logout}>Logout</Button>
        </div>
        {children}
      </section>
    </div>
  );
}
