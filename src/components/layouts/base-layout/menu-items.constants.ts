import {
  BarChart3Icon,
  BookOpenIcon,
  CalendarIcon,
  ClipboardListIcon,
  ClockIcon,
  DollarSignIcon,
  type LucideIcon,
  PackageIcon,
  RepeatIcon,
  ShoppingCartIcon,
  StarIcon,
  TagIcon,
  UsersIcon,
} from "lucide-react";

import { pathConstants } from "@src/router/path.constants";

export interface IBaseMenuItem {
  key: string;
  labelKey: string;
  icon: LucideIcon;
  path: string;
}

export const BASE_LAYOUT_MENU_ITEMS: IBaseMenuItem[] = [
  {
    key: "pos",
    labelKey: "layouts.base.menu.POINT_OF_SALE",
    icon: ShoppingCartIcon,
    path: pathConstants.HOME,
  },
  {
    key: "turns",
    labelKey: "layouts.base.menu.TURNS_TRACKER",
    icon: RepeatIcon,
    path: "/turns-tracker",
  },
  {
    key: "clock",
    labelKey: "layouts.base.menu.CLOCK_IN_OUT",
    icon: ClockIcon,
    path: "/clock-in-out",
  },
  {
    key: "timesheets",
    labelKey: "layouts.base.menu.EMPLOYEE_TIMESHEETS",
    icon: ClipboardListIcon,
    path: "/employee-timesheets",
  },
  {
    key: "dashboard",
    labelKey: "layouts.base.menu.DASHBOARD",
    icon: BarChart3Icon,
    path: pathConstants.DASHBOARD,
  },
  {
    key: "calendar",
    labelKey: "layouts.base.menu.CALENDAR",
    icon: CalendarIcon,
    path: "/calendar",
  },
  {
    key: "customers",
    labelKey: "layouts.base.menu.CUSTOMERS",
    icon: UsersIcon,
    path: "/customers",
  },
  {
    key: "payroll",
    labelKey: "layouts.base.menu.PAYROLL",
    icon: DollarSignIcon,
    path: "/payroll",
  },
  {
    key: "book-keeping",
    labelKey: "layouts.base.menu.BOOK_KEEPING",
    icon: BookOpenIcon,
    path: "/book-keeping",
  },
  {
    key: "inventory",
    labelKey: "layouts.base.menu.INVENTORY",
    icon: PackageIcon,
    path: "/inventory",
  },
  {
    key: "loyalty",
    labelKey: "layouts.base.menu.LOYALTY",
    icon: StarIcon,
    path: "/loyalty",
  },
  {
    key: "discounts",
    labelKey: "layouts.base.menu.DISCOUNTS",
    icon: TagIcon,
    path: "/discounts",
  },
];
