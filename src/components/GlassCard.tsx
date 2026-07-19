import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

export function GlassCard({
  className,
  children,
  strong,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { strong?: boolean; children: ReactNode }) {
  return (
    <div
      className={cn(
        strong ? "glass-strong" : "glass",
        "rounded-2xl p-5 transition-all duration-300",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
