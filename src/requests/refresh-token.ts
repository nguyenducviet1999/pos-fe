import Cookies from "js-cookie";

import { expiresToken, REFRESH_TOKEN } from "@src/constants";

export const saveRefreshToken = async (refreshToken: string, expires = expiresToken) => {
  Cookies.set(REFRESH_TOKEN, refreshToken, { sameSite: "strict", secure: true, expires });
};

export const getRefreshToken = () => {
  return Cookies.get(REFRESH_TOKEN);
};

export const removeRefreshToken = () => {
  Cookies.remove(REFRESH_TOKEN);
};
