import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-lg px-4 py-2 text-sm font-medium transition",
        variant === "default" ? "bg-accent text-black hover:bg-accent/80" : "border border-white/20 hover:bg-white/10",
        className
      )}
      {...props}
    />
  );
}
