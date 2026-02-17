import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("rounded-full border border-accent/40 px-2 py-0.5 text-xs text-accent", className)} {...props} />;
}
