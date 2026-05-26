import React from "react";
import { type RouteProps } from "react-router-dom";

export type IPermissionRouteProps = {
  path?: string;
  title?: string;
  component?: React.FunctionComponent | React.ComponentClass;
  layout?: React.ComponentType<any>;
  isPrivate?: boolean;
  isAuth?: boolean;
  redirectPath?: string;
} & RouteProps;
