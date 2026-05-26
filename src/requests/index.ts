import { translate } from "@src/locales";
import { notification } from "antd";
import axios, { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import i18next from "i18next";
import jwtDecode from "jwt-decode";

import { getSessionId, removeSessionId, saveSessionId } from "@src/requests/token";
import { getTimezoneOffsetHHMM } from "@src/utils";

import { loginMiddleware } from "./api/account/login";
import { getRefreshToken, removeRefreshToken, saveRefreshToken } from "./refresh-token";

let isRefreshing = false;
const CODE_EXCEPTION_LIST = [
  "USER_NAME_OR_PASSWORD_INVALID",
  // "ACCOUNT_HAS_NOT_BEEN_REGISTERED",
];

const instance = axios.create({
  baseURL: window.__APP_CONFIG__.SITE_BASE_API_URL,
  timeout: 70000,
  headers: {
    "Content-Type": "application/json",
  },
});

const logout = () => {
  removeSessionId();
  removeRefreshToken();
  window.location.href = "/login";
};

const waitRefreshToken = () => {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (!isRefreshing) {
        clearInterval(interval);
        resolve(true);
      }
    }, 100);
  });
};

const onRequestSuccess = async (req: any) => {
  if (req.url === loginMiddleware.OAUTH_URL) return req;
  if (isRefreshing) {
    await waitRefreshToken();
  }
  req.headers["X-Timezone-Offset"] = getTimezoneOffsetHHMM();

  const accessToken = getSessionId();
  if (accessToken) {
    const jwtPayload: any = jwtDecode(accessToken);
    //     exp
    // :
    // 1765897052
    // iat
    // :
    // 1765810652
    // permissions
    // :
    // (17) ['user:create', 'user:read', 'user:update', 'user:delete', 'quotation:create', 'quotation:read', 'quotation:update', 'quotation:delete', 'role:create', 'role:read', 'role:update', 'role:delete', 'permission:read', 'api_permission:create', 'api_permission:read', 'api_permission:update', 'api_permission:delete']
    // roles
    // :
    // ['admin']
    // sub
    // :
    // "1"
    // user_id
    // :
    // "1"
    // username
    // :
    // "admin"

    if (!jwtPayload.exp) return req;

    if (jwtPayload.exp < Date.now() / 1000) {
      isRefreshing = true;
      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) return req;
        const response = await loginMiddleware.refreshToken({ refreshToken });
        saveSessionId(response.accessToken, response.expiresIn / 3600);
        saveRefreshToken(response.refreshToken, response.expiresIn / 3600);

        req.headers.Authorization = `Bearer ${response.accessToken}`;
        return req;
      } catch (error: any) {
        logout();
      } finally {
        isRefreshing = false;
      }
    }

    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
};

const onRequestError = (err: any) => Promise.reject(err);

const onResponseSuccess = (response: AxiosResponse) => response;

const onResponseError = (err: AxiosError<any>) => {
  const status = err.status || (err.response ? err.response.status : 0);

  if (status === HttpStatusCode.Unauthorized) {
    logout();
    return;
  }
  if (
    err.config?.url === loginMiddleware.OAUTH_URL &&
    (status === HttpStatusCode.Unauthorized || status === HttpStatusCode.Forbidden || status === HttpStatusCode.Locked)
  ) {
    return Promise.reject(err);
  } else if (err.config?.url === loginMiddleware.OAUTH_URL) {
    notification.error({ message: translate("error.UNKNOWN_ERROR").toString() });
    return;
  }
  const messageError = err.response?.data;
  const messError = `error.${messageError?.code}`;
  const existErrorMess = i18next.exists(messError);
  const badRequestMessage = err.response?.status === HttpStatusCode.BadRequest ? err.response?.data?.message : "";

  if (CODE_EXCEPTION_LIST.includes(messageError)) {
    return Promise.reject(messageError);
  }

  // if (existErrorMess) {
  //   notification.error({ message: translate(messError).toString() });
  // } else if (status === HttpStatusCode.BadRequest) {
  //   notification.error({ message: translate("error.ERR_BAD_REQUEST_CLIENT_INFO").toString() });
  // } else if (status === HttpStatusCode.InternalServerError) {
  //   notification.error({ message: translate("error.ERR_BAD_RESPONSE_INTERNAL_SERVER").toString() });
  // } else if (status === HttpStatusCode.NotImplemented) {
  //   notification.error({ message: translate("error.ERR_BAD_RESPONSE_NOT_IMPLEMENTED").toString() });
  // } else if (status === HttpStatusCode.ServiceUnavailable) {
  //   notification.error({ message: translate("error.ERR_BAD_RESPONSE_SERVICE_UNAVAILABLE").toString() });
  // } else if (status === HttpStatusCode.BadGateway || status === HttpStatusCode.GatewayTimeout) {
  //   notification.error({ message: translate("error.ERR_BAD_RESPONSE_GATEWAY_ERROR").toString() });
  // } else {
  //   notification.error({ message: translate("error.UNKNOWN_ERROR").toString() });
  // }
  if (badRequestMessage) {
    notification.error({ message: badRequestMessage });
  } else {
    notification.error({ message: translate("error.UNKNOWN_ERROR").toString() });
  }
  return Promise.reject(err);
};

instance.interceptors.request.use(onRequestSuccess, onRequestError);

instance.interceptors.response.use(onResponseSuccess, onResponseError);

export default instance;
