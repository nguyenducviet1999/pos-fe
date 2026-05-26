import React, { Suspense } from "react";
import { Route, Routes as RoutesWrapper, unstable_HistoryRouter as HistoryBrowerRouter } from "react-router-dom";
// import { Spin } from "antd";
import { Spinner } from "@src/components/ui/spinner";

import ErrorBoundary, { SomethingWentWrong } from "@src/router/ErrorBoundary";
import { pathLayout } from "@src/router/path-layout";
import PermissionRoute from "@src/router/PermissionRoute";
import { history } from "@src/history";

export const RouteLayout: React.FC = () => {
  return (
    <ErrorBoundary fallback={<SomethingWentWrong />}>
      <HistoryBrowerRouter history={history}>
        <Suspense fallback={<Spinner />}>
          <RoutesWrapper>
            {pathLayout.map((item) => (
              <Route key={item.path?.toString()} path={item.path} element={<PermissionRoute {...item} />} />
            ))}
          </RoutesWrapper>
        </Suspense>
      </HistoryBrowerRouter>
    </ErrorBoundary>
  );
};

export default RouteLayout;
