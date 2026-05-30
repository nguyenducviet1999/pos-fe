import loadable from "@loadable/component";
import { BaseLayout } from "@src/components/layouts";

import { EnumFilterDateRangeType } from "@src/enums";
import { pathConstants } from "@src/router/path.constants";
// import { EnumQuoteFilterProperties } from "@src/models";
// import BasicLayout from "@src/components/layouts/basic";
// import NormalLayout from "@src/components/layouts/normal";

const LoginPage = loadable(() => import("@src/pages/login"));
const SelectStorePage = loadable(() => import("@src/pages/select-store"));
// const HomePage = loadable(() => import("@src/pages/dashboard"));
const NotFoundPage = loadable(() => import("@src/pages/not-found"));
const FormDemoPage = loadable(() => import("@src/pages/form-demo"));
const DashboardPage = loadable(() => import("@src/pages/dashboard"));
// ================= User Management ================
export const pathLayout = [
  {
    path: pathConstants.LOGIN,
    component: LoginPage,
    isAuth: true,
    title: "title_header.LOGIN",
  },
  {
    path: pathConstants.HOME,
    component: DashboardPage,
    layout: BaseLayout,
    isPrivate: true,
    title: "title_header.DASHBOARD",
  },
  {
    path: pathConstants.SELECT_STORE,
    component: SelectStorePage,
    layout: BaseLayout,
    isPrivate: true,
    title: "title_header.SELECT_STORE",
  },
  // {
  //   path: pathConstants.HOME,
  //   redirectPath: `${pathConstants.COMPLETED_QUOTES}?${EnumQuoteFilterProperties.FILTER_TYPE}=${EnumFilterDateRangeType.TODAY}`,
  //   component: HomePage,
  //   layout: NormalLayout,
  //   isPrivate: true,
  //   title: "title_header.DASHBOARD",
  // },

  {
    path: pathConstants.FORM_DEMO,
    layout: BaseLayout,
    component: FormDemoPage,
    title: "title_header.FORM_DEMO",
  },
  {
    path: pathConstants.DASHBOARD,
    layout: BaseLayout,
    component: DashboardPage,
    isPrivate: true,
    title: "title_header.DASHBOARD",
  },
  {
    path: pathConstants.PAGE_NOT_FOUND,
    layout: BaseLayout,
    component: NotFoundPage,
    title: "title_header.PAGE_NOT_FOUND",
  },
  {
    path: "*",
    redirectPath: pathConstants.PAGE_NOT_FOUND,
  },
];
