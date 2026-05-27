// env.d.ts
declare const APP_ENV: {
  MODE: string;
  SITE_LOCAL_HOST_PORT: string;
  SITE_BASE_API_URL: string;
};

declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}
declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";
