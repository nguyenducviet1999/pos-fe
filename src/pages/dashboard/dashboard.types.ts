import type { ReactNode } from "react";
import type { TFunction } from "i18next";
import type { LayoutItem } from "react-grid-layout/legacy";

import type {
  EnumDashboardScreen,
  EnumDashboardWidgetId,
} from "@src/enums/dashboard.enum";

export type LayoutCustom = (LayoutItem & {
  hidden?: boolean;
})[];

export type DashboardLayouts = Record<EnumDashboardScreen, LayoutCustom>;

export type DashboardWidgetEditProps = {
  isCustomizing: boolean;
  canIncreaseWidth: boolean;
  canDecreaseWidth: boolean;
  canIncreaseHeight: boolean;
  canDecreaseHeight: boolean;
  onIncreaseWidth: () => void;
  onDecreaseWidth: () => void;
  onIncreaseHeight: () => void;
  onDecreaseHeight: () => void;
  onRemove: () => void;
};

export type DashboardWidgetRenderProps = {
  t: TFunction;
  periodLabel: string;
  paymentMethodLabels: Record<"cash" | "card" | "other", string>;
  editProps: DashboardWidgetEditProps;
};

export type DashboardWidgetLayoutItem = Omit<LayoutItem, "i">;

export type DashboardWidgetConfigEntry = {
  key: EnumDashboardWidgetId;
  layouts: Record<EnumDashboardScreen, DashboardWidgetLayoutItem>;
  render: (props: DashboardWidgetRenderProps) => ReactNode;
};
