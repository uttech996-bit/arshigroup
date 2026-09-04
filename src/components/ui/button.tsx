import * as React from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:-translate-y-0.5 hover:bg-blue-500",
  secondary: "border border-border bg-card/70 text-foreground hover:-translate-y-0.5 hover:bg-accent",
  ghost: "text-muted-foreground hover:bg-accent hover:text-foreground",
  outline: "border border-border bg-transparent text-foreground hover:bg-accent",
} as const;

export function Button({ className, variant = "primary", size = "md", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof variants; size?: "sm" | "md" | "lg" }) {
  return <button className={cn("inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50", variants[variant], size === "sm" ? "px-4 py-2 text-sm" : size === "lg" ? "px-7 py-4 text-base" : "px-5 py-2.5 text-sm", className)} {...props} />;
}

export function ButtonLink({ className, variant = "primary", size = "md", ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: keyof typeof variants; size?: "sm" | "md" | "lg" }) {
  return <a className={cn("inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500", variants[variant], size === "sm" ? "px-4 py-2 text-sm" : size === "lg" ? "px-7 py-4 text-base" : "px-5 py-2.5 text-sm", className)} {...props} />;
}
