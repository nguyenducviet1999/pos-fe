import {
  EnumDashboardScreen,
  EnumDashboardWidgetCategory,
  EnumDashboardWidgetId,
} from "@src/enums/dashboard.enum";
import { DashboardWidgetCard } from "@src/pages/dashboard/components/dashboard-widget-card";
import type {
  DashboardLayouts,
  DashboardWidgetConfigEntry,
  DashboardWidgetLayoutItem,
  LayoutCustom,
} from "@src/pages/dashboard/dashboard.types";

export type {
  DashboardLayouts,
  DashboardWidgetEditProps,
  DashboardWidgetRenderProps,
  LayoutCustom,
} from "@src/pages/dashboard/dashboard.types";

export type DashboardWidgetCatalogEntry = {
  id: EnumDashboardWidgetId;
  icon: string;
  titleKey: string;
  descriptionKey: string;
};

export type DashboardWidgetCategoryGroup = {
  category: EnumDashboardWidgetCategory;
  icon: string;
  labelKey: string;
  widgets: DashboardWidgetCatalogEntry[];
};

export const DASHBOARD_GRID_COLS = 4;
export const DASHBOARD_ROW_HEIGHT = 64;
export const DASHBOARD_GRID_MARGIN: [number, number] = [16, 16];
export const DASHBOARD_WIDGET_MAX_HEIGHT = 12;

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

const statLayoutDefaults = { w: 1, h: 5, minW: 1, minH: 4 } as const;

function statLayout(
  position: Pick<DashboardWidgetLayoutItem, "x" | "y">,
): DashboardWidgetLayoutItem {
  return { ...statLayoutDefaults, ...position };
}

function wideLayout(
  position: Pick<DashboardWidgetLayoutItem, "x" | "y" | "w">,
): DashboardWidgetLayoutItem {
  return { w: 4, h: 6, minW: 1, minH: 6, ...position };
}

export const demoEmployees = [
  { label: "Anh Duy", value: "anh-duy" },
  { label: "Jessica", value: "jessica" },
  { label: "John", value: "john" },
  { label: "Kim", value: "kim" },
  { label: "Vu", value: "vu" },
  { label: "A Vân", value: "a-van" },
];

export const demoDashboardStats = {
  dailyPay: 0,
  revenue: 0,
  transactionCount: 0,
  tips: 0,
  paymentMethods: [
    { key: "cash", amount: 0, percent: 0 },
    { key: "card", amount: 0, percent: 0 },
    { key: "other", amount: 0, percent: 0 },
  ],
  topServices: [
    { name: "Manicure", count: 0, amount: 0 },
    { name: "Pedicure", count: 0, amount: 0 },
    { name: "Gel polish", count: 0, amount: 0 },
  ],
};

export const dashboardWidgetCatalog: DashboardWidgetCategoryGroup[] = [
  {
    category: EnumDashboardWidgetCategory.MONEY,
    icon: "💰",
    labelKey: "dashboard.WIDGET_CATEGORY_MONEY",
    widgets: [
      {
        id: EnumDashboardWidgetId.REVENUE,
        icon: "💰",
        titleKey: "dashboard.TODAYS_REVENUE",
        descriptionKey: "dashboard.WIDGET_REVENUE_DESC",
      },
      {
        id: EnumDashboardWidgetId.TIPS,
        icon: "🪙",
        titleKey: "dashboard.TIPS",
        descriptionKey: "dashboard.WIDGET_TIPS_DESC",
      },
      {
        id: EnumDashboardWidgetId.DAILY_PAY,
        icon: "💵",
        titleKey: "dashboard.DAILY_PAY",
        descriptionKey: "dashboard.WIDGET_DAILY_PAY_DESC",
      },
      {
        id: EnumDashboardWidgetId.PAYMENT_METHODS,
        icon: "💳",
        titleKey: "dashboard.PAYMENT_BREAKDOWN",
        descriptionKey: "dashboard.WIDGET_PAYMENT_METHODS_DESC",
      },
    ],
  },
  {
    category: EnumDashboardWidgetCategory.SERVICES,
    icon: "📊",
    labelKey: "dashboard.WIDGET_CATEGORY_SERVICES",
    widgets: [
      {
        id: EnumDashboardWidgetId.TOP_SERVICES,
        icon: "✨",
        titleKey: "dashboard.TOP_SERVICES",
        descriptionKey: "dashboard.WIDGET_TOP_SERVICES_DESC",
      },
    ],
  },
];

export const dashboardConfig = {
  breakpoints: {
    [EnumDashboardScreen.MD]: 768,
    [EnumDashboardScreen.SM]: 0,
  },
  cols: {
    [EnumDashboardScreen.MD]: 4,
    [EnumDashboardScreen.SM]: 2,
  },
  rowHeight: DASHBOARD_ROW_HEIGHT,
  margin: DASHBOARD_GRID_MARGIN,
  widgetConfig: {
    [EnumDashboardWidgetId.DAILY_PAY]: {
      key: EnumDashboardWidgetId.DAILY_PAY,
      layouts: {
        [EnumDashboardScreen.MD]: statLayout({ x: 0, y: 0 }),
        [EnumDashboardScreen.SM]: statLayout({ x: 0, y: 0 }),
      },
      render: ({ t, periodLabel, editProps }) => (
        <DashboardWidgetCard
          title={
            <span className="flex items-center gap-2">
              <span aria-hidden>💵</span>
              {t("dashboard.DAILY_PAY")}
            </span>
          }
          {...editProps}
        >
          <p className="text-3xl font-semibold tracking-tight">
            {formatCurrency(demoDashboardStats.dailyPay)}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{periodLabel}</p>
        </DashboardWidgetCard>
      ),
    },
    [EnumDashboardWidgetId.REVENUE]: {
      key: EnumDashboardWidgetId.REVENUE,
      layouts: {
        [EnumDashboardScreen.MD]: statLayout({ x: 1, y: 0 }),
        [EnumDashboardScreen.SM]: statLayout({ x: 1, y: 0 }),
      },
      render: ({ t, paymentMethodLabels, editProps }) => (
        <DashboardWidgetCard
          title={
            <span className="flex items-center gap-2">
              <span aria-hidden>💵</span>
              {t("dashboard.TODAYS_REVENUE")}
            </span>
          }
          {...editProps}
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
      ),
    },
    [EnumDashboardWidgetId.TIPS]: {
      key: EnumDashboardWidgetId.TIPS,
      layouts: {
        [EnumDashboardScreen.MD]: statLayout({ x: 2, y: 0 }),
        [EnumDashboardScreen.SM]: statLayout({ x: 0, y: 5 }),
      },
      render: ({ t, periodLabel, editProps }) => (
        <DashboardWidgetCard
          title={
            <span className="flex items-center gap-2">
              <span aria-hidden>🪙</span>
              {t("dashboard.TIPS")}
            </span>
          }
          {...editProps}
        >
          <p className="text-3xl font-semibold tracking-tight">
            {formatCurrency(demoDashboardStats.tips)}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{periodLabel}</p>
        </DashboardWidgetCard>
      ),
    },
    [EnumDashboardWidgetId.PAYMENT_METHODS]: {
      key: EnumDashboardWidgetId.PAYMENT_METHODS,
      layouts: {
        [EnumDashboardScreen.MD]: statLayout({ x: 3, y: 0 }),
        [EnumDashboardScreen.SM]: statLayout({ x: 1, y: 5 }),
      },
      render: ({ t, paymentMethodLabels, editProps }) => (
        <DashboardWidgetCard
          title={t("dashboard.PAYMENT_BREAKDOWN")}
          {...editProps}
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
      ),
    },
    [EnumDashboardWidgetId.TOP_SERVICES]: {
      key: EnumDashboardWidgetId.TOP_SERVICES,
      layouts: {
        [EnumDashboardScreen.MD]: wideLayout({ x: 0, y: 5, w: 4 }),
        [EnumDashboardScreen.SM]: wideLayout({ x: 0, y: 10, w: 2 }),
      },
      render: ({ t, editProps }) => (
        <DashboardWidgetCard title={t("dashboard.TOP_SERVICES")} {...editProps}>
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
      ),
    },
  } satisfies Record<EnumDashboardWidgetId, DashboardWidgetConfigEntry>,
};

function buildDefaultDashboardLayouts(): DashboardLayouts {
  const screens = Object.values(EnumDashboardScreen);

  return Object.fromEntries(
    screens.map((screen) => [
      screen,
      Object.values(dashboardConfig.widgetConfig).map((config) => ({
        i: config.key,
        ...config.layouts[screen],
      })),
    ]),
  ) as DashboardLayouts;
}

export const defaultDashboardLayouts = buildDefaultDashboardLayouts();

// export const defaultDashboardLayout: LayoutCustom =
//   defaultDashboardLayouts[EnumDashboardScreen.MD];

export function getDashboardWidgetDefault(
  widgetId: EnumDashboardWidgetId,
  screen: EnumDashboardScreen = EnumDashboardScreen.MD,
): LayoutCustom[number] | undefined {
  const config = dashboardConfig.widgetConfig[widgetId];

  if (!config) {
    return undefined;
  }

  return {
    i: widgetId,
    ...config.layouts[screen],
  };
}

export const dashboardWidgetEntries = Object.values(
  dashboardConfig.widgetConfig,
);
