import type { MouseEvent, PropsWithChildren, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@src/components/ui/button";
import { cn } from "@src/lib/utils";

interface DashboardWidgetCardProps extends PropsWithChildren {
  title: ReactNode;
  action?: ReactNode;
  className?: string;
  bodyClassName?: string;
  isCustomizing?: boolean;
  canIncreaseWidth?: boolean;
  canDecreaseWidth?: boolean;
  canIncreaseHeight?: boolean;
  canDecreaseHeight?: boolean;
  onIncreaseWidth?: () => void;
  onDecreaseWidth?: () => void;
  onIncreaseHeight?: () => void;
  onDecreaseHeight?: () => void;
  onRemove?: () => void;
}

function stopDragPropagation(event: MouseEvent) {
  event.stopPropagation();
}

export function DashboardWidgetCard({
  title,
  action,
  className,
  bodyClassName,
  children,
  isCustomizing = false,
  canIncreaseWidth = true,
  canDecreaseWidth = true,
  canIncreaseHeight = true,
  canDecreaseHeight = true,
  onIncreaseWidth,
  onDecreaseWidth,
  onIncreaseHeight,
  onDecreaseHeight,
  onRemove,
}: DashboardWidgetCardProps) {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm",
        isCustomizing &&
          "dashboard-widget-card--editing ring-2 ring-primary/30",
        className,
      )}
    >
      {isCustomizing && (
        <div
          className="dashboard-widget-toolbar"
          onMouseDown={stopDragPropagation}
        >
          <div className="flex items-center gap-0.5">
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label={t("dashboard.DECREASE_WIDTH")}
              disabled={!canDecreaseWidth}
              onClick={onDecreaseWidth}
            >
              <Minus />
            </Button>
            <span className="px-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              W
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label={t("dashboard.INCREASE_WIDTH")}
              disabled={!canIncreaseWidth}
              onClick={onIncreaseWidth}
            >
              <Plus />
            </Button>
          </div>
          <div className="flex items-center gap-0.5">
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label={t("dashboard.DECREASE_HEIGHT")}
              disabled={!canDecreaseHeight}
              onClick={onDecreaseHeight}
            >
              <Minus />
            </Button>
            <span className="px-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              H
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label={t("dashboard.INCREASE_HEIGHT")}
              disabled={!canIncreaseHeight}
              onClick={onIncreaseHeight}
            >
              <Plus />
            </Button>
          </div>
          <Button
            type="button"
            variant="destructive"
            size="icon-xs"
            aria-label={t("dashboard.REMOVE_WIDGET")}
            onClick={onRemove}
          >
            <Trash2 />
          </Button>
        </div>
      )}

      <div
        className={cn(
          "flex flex-1 flex-col overflow-hidden",
          isCustomizing && "pointer-events-none select-none",
        )}
      >
        <div className="flex items-center justify-between gap-3 border-b border-border/50 px-4 py-3">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          {!isCustomizing && action}
        </div>
        <div className={cn("flex flex-1 flex-col p-4", bodyClassName)}>
          {children}
        </div>
      </div>

      {isCustomizing && (
        <div className="dashboard-widget-edit-overlay" aria-hidden />
      )}
    </div>
  );
}
