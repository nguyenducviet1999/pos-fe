import loadable from "@loadable/component";

import { EnumFilterDateRangeType } from "@src/enums";
import { pathConstants } from "@src/router/path.constants";
// import { EnumQuoteFilterProperties } from "@src/models";
// import BasicLayout from "@src/components/layouts/basic";
// import NormalLayout from "@src/components/layouts/normal";

const LoginPage = loadable(() => import("@src/pages/login"));
const SelectStorePage = loadable(() => import("@src/pages/select-store"));
// const HomePage = loadable(() => import("@src/pages/dashboard"));
const NotFoundPage = loadable(() => import("@src/pages/not-found"));
// ================= User Management ================
export const pathLayout = [
  {
    path: pathConstants.LOGIN,
    component: LoginPage,
    isAuth: true,
    title: "pages.title_header.LOGIN",
  },
  {
    path: pathConstants.SELECT_STORE,
    component: SelectStorePage,
    isPrivate: true,
    title: "pages.title_header.SELECT_STORE",
  },
  // {
  //   path: pathConstants.HOME,
  //   redirectPath: `${pathConstants.COMPLETED_QUOTES}?${EnumQuoteFilterProperties.FILTER_TYPE}=${EnumFilterDateRangeType.TODAY}`,
  //   component: HomePage,
  //   layout: NormalLayout,
  //   isPrivate: true,
  //   title: "pages.title_header.DASHBOARD",
  // },
  {
    path: pathConstants.PAGE_NOT_FOUND,
    component: NotFoundPage,
    title: "pages.title_header.PAGE_NOT_FOUND",
  },
  {
    path: "*",
    redirectPath: pathConstants.PAGE_NOT_FOUND,
  },
];
