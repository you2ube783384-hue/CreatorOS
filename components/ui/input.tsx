import { cn } from "@/lib/utils";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn("w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm", props.className)} />;
}
