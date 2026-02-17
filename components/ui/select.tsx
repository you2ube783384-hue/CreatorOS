import { cn } from "@/lib/utils";

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn("w-full rounded-lg border border-white/15 bg-[#0b1220] px-3 py-2 text-sm", props.className)} />;
}
