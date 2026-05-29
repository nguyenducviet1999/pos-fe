import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Layout } from "react-grid-layout/legacy";

import type { DateRangeValue } from "@src/components/custom/form";
import { EnumDashboardPeriodType } from "@src/enums/dashboard.enum";
import { DashboardGrid } from "@src/pages/dashboard/components/dashboard-grid";
import { DashboardToolbar } from "@src/pages/dashboard/components/dashboard-toolbar";
import { defaultDashboardLayout } from "@src/pages/dashboard/dashboard.constants";
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
  const [layout, setLayout] = useState<Layout>(defaultDashboardLayout);

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
          onCustomizeToggle={() => setIsCustomizing((prev) => !prev)}
        />

        <DashboardGrid
          layout={layout}
          onLayoutChange={setLayout}
          isCustomizing={isCustomizing}
          periodLabel={periodLabel}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
