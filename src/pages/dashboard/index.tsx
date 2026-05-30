import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import type { DateRangeValue } from "@src/components/custom/form";
import {
  EnumDashboardPeriodType,
  EnumDashboardScreen,
  EnumDashboardWidgetId,
} from "@src/enums/dashboard.enum";
import {
  addWidget,
  DashboardGrid,
} from "@src/pages/dashboard/components/dashboard-grid";
import { DashboardToolbar } from "@src/pages/dashboard/components/dashboard-toolbar";
import { defaultDashboardLayouts } from "@src/pages/dashboard/dashboard.constants";
import type { DashboardLayouts } from "@src/pages/dashboard/dashboard.types";
import dayjs from "@src/utils/datetime";

const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const [period, setPeriod] = useState(EnumDashboardPeriodType.DAY);
  const [customRange, setCustomRange] = useState<DateRangeValue>({
    from: null,
    to: null,
  });
  const [employeeId, setEmployeeId] = useState("all");
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [layouts, setLayouts] = useState<DashboardLayouts>(() =>
    structuredClone(defaultDashboardLayouts),
  );

  const activeWidgetIds = useMemo(
    () =>
      new Set(
        layouts[EnumDashboardScreen.MD]
          .filter((item) => !item.hidden)
          .map((item) => item.i as EnumDashboardWidgetId),
      ),
    [layouts],
  );

  const handleAddWidget = useCallback((widgetId: EnumDashboardWidgetId) => {
    setLayouts((current) => addWidget(current, widgetId));
  }, []);

  const handleResetLayout = useCallback(() => {
    setLayouts(structuredClone(defaultDashboardLayouts));
  }, []);

  const periodLabel = useMemo(() => {
    switch (period) {
      case EnumDashboardPeriodType.DAY:
        return t("dashboard.PERIOD_DAY_LABEL", {
          date: dayjs().format("MMM D, YYYY"),
        });
      case EnumDashboardPeriodType.WEEK:
        return t("dashboard.PERIOD_WEEK_LABEL", {
          from: dayjs().startOf("week").format("MMM D"),
          to: dayjs().endOf("week").format("MMM D, YYYY"),
        });
      case EnumDashboardPeriodType.MONTH:
        return t("dashboard.PERIOD_MONTH_LABEL", {
          month: dayjs().format("MMMM YYYY"),
        });
      case EnumDashboardPeriodType.YEAR:
        return t("dashboard.PERIOD_YEAR_LABEL", {
          year: dayjs().format("YYYY"),
        });
      case EnumDashboardPeriodType.CUSTOM: {
        const from = customRange.from
          ? dayjs(customRange.from).format("MMM D, YYYY")
          : "—";
        const to = customRange.to
          ? dayjs(customRange.to).format("MMM D, YYYY")
          : "—";

        return t("dashboard.PERIOD_CUSTOM_LABEL", { from, to });
      }
      default:
        return "";
    }
  }, [customRange.from, customRange.to, period, t]);

  return (
    <div className="min-h-full bg-[#f1f4fb] px-7 pt-7 pb-14">
      <div className="mx-auto flex flex-col gap-6">
        <header className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">
            {t("dashboard.EYEBROW")}
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">
            {t("dashboard.TITLE")}
          </h1>
          <p className="text-sm text-muted-foreground">{periodLabel}</p>
        </header>

        <DashboardToolbar
          period={period}
          onPeriodChange={setPeriod}
          customRange={customRange}
          onCustomRangeChange={setCustomRange}
          employeeId={employeeId}
          onEmployeeChange={setEmployeeId}
          isCustomizing={isCustomizing}
          onCustomizeStart={() => setIsCustomizing(true)}
          onCustomizeEnd={() => setIsCustomizing(false)}
          onResetLayout={handleResetLayout}
          activeWidgetIds={activeWidgetIds}
          onAddWidget={handleAddWidget}
        />

        <DashboardGrid
          layouts={layouts}
          onLayoutsChange={setLayouts}
          isCustomizing={isCustomizing}
          periodLabel={periodLabel}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
