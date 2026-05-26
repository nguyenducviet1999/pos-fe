import Cookies from "js-cookie";

import { ACCESS_TOKEN, expiresToken } from "@src/constants";

export const saveSessionId = (sessionId: string, expires = expiresToken) => {
  Cookies.set(ACCESS_TOKEN, sessionId, { expires });
};

export const getSessionId = () => {
  return Cookies.get(ACCESS_TOKEN);
};

export const removeSessionId = () => {
  Cookies.remove(ACCESS_TOKEN);
};
