import type { Layout } from "react-grid-layout/legacy";

import { EnumDashboardWidgetId } from "@src/enums/dashboard.enum";

export const DASHBOARD_GRID_COLS = 4;
export const DASHBOARD_ROW_HEIGHT = 64;
export const DASHBOARD_GRID_MARGIN: [number, number] = [16, 16];

export const defaultDashboardLayout: Layout = [
  {
    i: EnumDashboardWidgetId.DAILY_PAY,
    x: 0,
    y: 0,
    w: 1,
    h: 5,
    minW: 1,
    minH: 4,
  },
  {
    i: EnumDashboardWidgetId.REVENUE,
    x: 1,
    y: 0,
    w: 1,
    h: 5,
    minW: 1,
    minH: 4,
  },
  {
    i: EnumDashboardWidgetId.TIPS,
    x: 2,
    y: 0,
    w: 1,
    h: 5,
    minW: 1,
    minH: 4,
  },
  {
    i: EnumDashboardWidgetId.PAYMENT_METHODS,
    x: 3,
    y: 0,
    w: 1,
    h: 5,
    minW: 1,
    minH: 4,
  },
  {
    i: EnumDashboardWidgetId.TOP_SERVICES,
    x: 0,
    y: 5,
    w: 4,
    h: 6,
    minW: 1,
    minH: 6,
  },
];

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
