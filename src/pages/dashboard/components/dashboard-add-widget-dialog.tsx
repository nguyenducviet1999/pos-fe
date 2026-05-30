import { useTranslation } from "react-i18next";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@src/components/ui/dialog";
import { EnumDashboardWidgetId } from "@src/enums/dashboard.enum";
import { cn } from "@src/lib/utils";
import {
  dashboardWidgetCatalog,
  type DashboardWidgetCatalogEntry,
} from "@src/pages/dashboard/dashboard.constants";

interface DashboardAddWidgetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeWidgetIds: Set<string>;
  onAddWidget: (widgetId: EnumDashboardWidgetId) => void;
}

function WidgetPickerRow({
  widget,
  isOnDashboard,
  onAdd,
}: {
  widget: DashboardWidgetCatalogEntry;
  isOnDashboard: boolean;
  onAdd: () => void;
}) {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      disabled={isOnDashboard}
      onClick={onAdd}
      className={cn(
        "flex w-full items-start gap-4 rounded-2xl border border-solid px-4 py-4 text-left transition-colors",
        isOnDashboard
          ? "cursor-not-allowed bg-muted/40 opacity-70"
          : "hover:border-border hover:bg-muted/30",
      )}
    >
      <div
        className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted text-xl"
        aria-hidden
      >
        {widget.icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="block text-sm font-semibold text-foreground">
          {t(widget.titleKey)}
        </div>
        <div className="mt-1 block text-sm text-muted-foreground">
          {t(widget.descriptionKey)}
        </div>
        {isOnDashboard && (
          <div className="mt-2 block text-xs text-red-500 font-medium text-muted-foreground">
            {t("dashboard.WIDGET_ALREADY_ON_DASHBOARD")}
          </div>
        )}
      </div>
    </button>
  );
}

export function DashboardAddWidgetDialog({
  open,
  onOpenChange,
  activeWidgetIds,
  onAddWidget,
}: DashboardAddWidgetDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="max-h-[85vh] w-full max-w-[880px] overflow-y-auto rounded-[18px] bg-white p-0 shadow-[0_20px_60px_rgba(0,0,0,0.3)] ring-0 sm:max-w-[880px] dark:bg-white dark:text-foreground"
      >
        <div className="sticky top-0 z-10 border-b border-border/60 bg-white px-6 pb-4 pt-6 dark:bg-white">
          <DialogHeader className="gap-2 pr-10">
            <DialogTitle className="text-xl font-semibold tracking-tight">
              {t("dashboard.ADD_WIDGET_TITLE")}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {t("dashboard.ADD_WIDGET_SUBTITLE")}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="space-y-8 px-6 pb-6 pt-2">
          {dashboardWidgetCatalog.map((group) => (
            <section key={group.category} className="space-y-2">
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <span aria-hidden>{group.icon}</span>
                {t(group.labelKey)}
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {group.widgets.map((widget) => (
                  <WidgetPickerRow
                    key={widget.id}
                    widget={widget}
                    isOnDashboard={activeWidgetIds.has(widget.id)}
                    onAdd={() => onAddWidget(widget.id)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
