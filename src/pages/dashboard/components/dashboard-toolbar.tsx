import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Settings2Icon } from "lucide-react";

import {
  DateRangePicker,
  Select,
  type DateRangeValue,
} from "@src/components/custom/form";
import { Button } from "@src/components/ui/button";
import { EnumDashboardPeriodType } from "@src/enums/dashboard.enum";
import { cn } from "@src/lib/utils";
import { demoEmployees } from "@src/pages/dashboard/dashboard.constants";

interface DashboardToolbarProps {
  period: EnumDashboardPeriodType;
  onPeriodChange: (period: EnumDashboardPeriodType) => void;
  customRange: DateRangeValue;
  onCustomRangeChange: (range: DateRangeValue) => void;
  employeeId: string;
  onEmployeeChange: (employeeId: string) => void;
  isCustomizing: boolean;
  onCustomizeToggle: () => void;
}

const periodOptions = [
  EnumDashboardPeriodType.DAY,
  EnumDashboardPeriodType.WEEK,
  EnumDashboardPeriodType.MONTH,
  EnumDashboardPeriodType.YEAR,
  EnumDashboardPeriodType.CUSTOM,
] as const;

const periodLabelKey: Record<EnumDashboardPeriodType, string> = {
  [EnumDashboardPeriodType.DAY]: "commons.DAY",
  [EnumDashboardPeriodType.WEEK]: "commons.WEEK",
  [EnumDashboardPeriodType.MONTH]: "commons.MONTH",
  [EnumDashboardPeriodType.YEAR]: "commons.YEAR",
  [EnumDashboardPeriodType.CUSTOM]: "commons.CUSTOM",
};

export function DashboardToolbar({
  period,
  onPeriodChange,
  customRange,
  onCustomRangeChange,
  employeeId,
  onEmployeeChange,
  isCustomizing,
  onCustomizeToggle,
}: DashboardToolbarProps) {
  const { t } = useTranslation();

  const employeeOptions = useMemo(
    () => [
      { label: t("dashboard.ALL_EMPLOYEES"), value: "all" },
      ...demoEmployees.map((employee) => ({
        label: employee.label,
        value: employee.value,
      })),
    ],
    [t],
  );

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <div
          className="inline-flex flex-wrap gap-1 rounded-full bg-card p-1 shadow-sm"
          role="tablist"
          aria-label={t("dashboard.PERIOD_FILTER")}
        >
          {periodOptions.map((option) => {
            const isActive = period === option;

            return (
              <button
                key={option}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onPeriodChange(option)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {t(periodLabelKey[option])}
              </button>
            );
          })}
        </div>

        {period === EnumDashboardPeriodType.CUSTOM && (
          <div className="w-full sm:w-72">
            <DateRangePicker
              value={customRange}
              onChange={onCustomRangeChange}
              placeholder={t("commons.PICK_DATE_RANGE")}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="w-full sm:w-56">
          <Select
            value={employeeId}
            onChange={onEmployeeChange}
            options={employeeOptions}
            placeholder={t("dashboard.ALL_EMPLOYEES")}
          />
        </div>
        <Button
          type="button"
          variant={isCustomizing ? "default" : "outline"}
          className="shrink-0"
          onClick={onCustomizeToggle}
        >
          <Settings2Icon />
          {t("dashboard.CUSTOMIZE")}
        </Button>
      </div>
    </div>
  );
}
