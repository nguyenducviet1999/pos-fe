import type { PropsWithChildren, ReactNode } from "react";

import { cn } from "@src/lib/utils";

interface DashboardWidgetCardProps extends PropsWithChildren {
  title: ReactNode;
  action?: ReactNode;
  className?: string;
  bodyClassName?: string;
}

export function DashboardWidgetCard({
  title,
  action,
  className,
  bodyClassName,
  children,
}: DashboardWidgetCardProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-border/50 px-4 py-3">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {action}
      </div>
      <div className={cn("flex flex-1 flex-col p-4", bodyClassName)}>
        {children}
      </div>
    </div>
  );
}
