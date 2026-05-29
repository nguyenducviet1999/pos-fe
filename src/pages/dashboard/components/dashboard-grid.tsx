import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import "./styles.scss";
import ReactGridLayout, {
  WidthProvider,
  type Layout,
} from "react-grid-layout/legacy";

import { EnumDashboardWidgetId } from "@src/enums/dashboard.enum";
import { cn } from "@src/lib/utils";
import { DashboardWidgetCard } from "@src/pages/dashboard/components/dashboard-widget-card";
import {
  DASHBOARD_GRID_COLS,
  DASHBOARD_GRID_MARGIN,
  DASHBOARD_ROW_HEIGHT,
  demoDashboardStats,
} from "@src/pages/dashboard/dashboard.constants";

const GridLayout = WidthProvider(ReactGridLayout);

interface DashboardGridProps {
  layout: Layout;
  onLayoutChange: (layout: Layout) => void;
  isCustomizing: boolean;
  periodLabel: string;
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

export function DashboardGrid({
  layout,
  onLayoutChange,
  isCustomizing,
  periodLabel,
}: DashboardGridProps) {
  const { t } = useTranslation();

  const paymentMethodLabels = useMemo(
    () => ({
      cash: t("dashboard.PAYMENT_CASH"),
      card: t("dashboard.PAYMENT_CARD"),
      other: t("dashboard.PAYMENT_OTHER"),
    }),
    [t],
  );

  return (
    <div
      className={cn(
        "dashboard-grid",
        isCustomizing && "dashboard-grid--editing",
      )}
    >
      <GridLayout
        className="layout"
        layout={layout}
        cols={DASHBOARD_GRID_COLS}
        rowHeight={DASHBOARD_ROW_HEIGHT}
        margin={DASHBOARD_GRID_MARGIN}
        isDraggable={isCustomizing}
        isResizable={isCustomizing}
        draggableHandle=".dashboard-widget-drag-handle"
        onLayoutChange={onLayoutChange}
        compactType="vertical"
      >
        <div key={EnumDashboardWidgetId.DAILY_PAY}>
          <DashboardWidgetCard
            title={
              <span className="dashboard-widget-drag-handle flex items-center gap-2">
                <span aria-hidden>💵</span>
                {t("dashboard.DAILY_PAY")}
              </span>
            }
          >
            <p className="text-3xl font-semibold tracking-tight">
              {formatCurrency(demoDashboardStats.dailyPay)}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{periodLabel}</p>
          </DashboardWidgetCard>
        </div>

        <div key={EnumDashboardWidgetId.REVENUE}>
          <DashboardWidgetCard
            title={
              <span className="dashboard-widget-drag-handle flex items-center gap-2">
                <span aria-hidden>💵</span>
                {t("dashboard.TODAYS_REVENUE")}
              </span>
            }
          >
            <div className="space-y-4">
              <div>
                <p className="text-3xl font-semibold tracking-tight">
                  {formatCurrency(demoDashboardStats.revenue)}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t("dashboard.TRANSACTION_COUNT", {
                    count: demoDashboardStats.transactionCount,
                  })}
                </p>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {demoDashboardStats.paymentMethods.map((method) => (
                  <div
                    key={method.key}
                    className="rounded-xl bg-muted/50 px-3 py-2"
                  >
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {
                        paymentMethodLabels[
                          method.key as keyof typeof paymentMethodLabels
                        ]
                      }
                    </p>
                    <p className="text-sm font-semibold">
                      {formatCurrency(method.amount)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {method.percent}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </DashboardWidgetCard>
        </div>

        <div key={EnumDashboardWidgetId.TIPS}>
          <DashboardWidgetCard
            title={
              <span className="dashboard-widget-drag-handle flex items-center gap-2">
                <span aria-hidden>🪙</span>
                {t("dashboard.TIPS")}
              </span>
            }
          >
            <p className="text-3xl font-semibold tracking-tight">
              {formatCurrency(demoDashboardStats.tips)}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{periodLabel}</p>
          </DashboardWidgetCard>
        </div>

        <div key={EnumDashboardWidgetId.PAYMENT_METHODS}>
          <DashboardWidgetCard
            title={
              <span className="dashboard-widget-drag-handle">
                {t("dashboard.PAYMENT_BREAKDOWN")}
              </span>
            }
          >
            <div className="space-y-3">
              {demoDashboardStats.paymentMethods.map((method) => (
                <div
                  key={method.key}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="text-sm font-medium">
                    {
                      paymentMethodLabels[
                        method.key as keyof typeof paymentMethodLabels
                      ]
                    }
                  </span>
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      {formatCurrency(method.amount)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {method.percent}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </DashboardWidgetCard>
        </div>

        <div key={EnumDashboardWidgetId.TOP_SERVICES}>
          <DashboardWidgetCard
            title={
              <span className="dashboard-widget-drag-handle">
                {t("dashboard.TOP_SERVICES")}
              </span>
            }
          >
            <div className="space-y-3">
              {demoDashboardStats.topServices.map((service) => (
                <div
                  key={service.name}
                  className="flex items-center justify-between gap-3 border-b border-border/40 pb-3 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-medium">{service.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t("dashboard.SERVICE_COUNT", { count: service.count })}
                    </p>
                  </div>
                  <p className="text-sm font-semibold">
                    {formatCurrency(service.amount)}
                  </p>
                </div>
              ))}
            </div>
          </DashboardWidgetCard>
        </div>
      </GridLayout>
    </div>
  );
}
