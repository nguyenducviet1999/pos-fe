import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Navigate, useLocation } from "react-router-dom";

import { pathConstants } from "@src/router/path.constants";
import type { IPermissionRouteProps } from "@src/router/prop-state.type";
import { getSessionId } from "@src/requests/token";
import { getSelectedStore } from "@src/utils";
// import { useFetchUserInfor } from "@src/hooks/use-fetch-user-infor";
// import { getSessionId } from "@/requests/token";
// import { useFetchUserInfor } from "@/hooks/use-fetch-user-infor";

const RouteComponent: React.FC<IPermissionRouteProps> = ({
  layout: LayoutWrapper,
  component: ComponentRender,
  redirectPath,
  title,
}: IPermissionRouteProps) => {
  const translate = useTranslation().t;
  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }
  if (!ComponentRender) return <></>;

  if (LayoutWrapper) {
    return (
      <LayoutWrapper>
        <Helmet>
          <title>{translate(title || "")}</title>
        </Helmet>
        <ComponentRender />
      </LayoutWrapper>
    );
  }

  return <ComponentRender />;
};

const PermissionRoute: React.FC<IPermissionRouteProps> = ({
  isPrivate = false,
  isAuth = false,
  ...props
}: IPermissionRouteProps) => {
  const isAuthenticated = getSessionId() || true;
  const { pathname } = useLocation();
  // useFetchUserInfor(!!isAuthenticated);

  if (!isAuthenticated && isPrivate)
    return <Navigate to={pathConstants.LOGIN} replace />;
  if (isAuthenticated && isAuth)
    return <Navigate to={pathConstants.HOME} replace />;

  if (
    isPrivate &&
    !getSelectedStore() &&
    pathname !== pathConstants.SELECT_STORE
  ) {
    return <Navigate to={pathConstants.SELECT_STORE} replace />;
  }

  return <RouteComponent {...props} />;
};

export default PermissionRoute;
