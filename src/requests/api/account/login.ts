import { IRes } from "@src/models";
import axios from "@src/requests";
import { IRefreshTokenRequest, ISignIn2FaResponse, ISignInRequest, ISignInResponse } from "@src/requests/api/account/prop-state.type";

const OAUTH_URL = "/auth";

const loginWithIdAndPassword = async (data: ISignInRequest) => {
  const formData = new FormData();
  formData.append("username", data.username);
  formData.append("password", data.password);
  // formData.append("country", data.country);

  const response = await axios.post<ISignInResponse>(`${OAUTH_URL}/login`, formData);
  return response.data;
};

const refreshToken = async (data: IRefreshTokenRequest) => {
  const formData = new FormData();
  formData.append("refreshToken", data.refreshToken);

  const response = await axios.post<ISignInResponse>(OAUTH_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const loginMiddleware = {
  loginWithIdAndPassword,
  refreshToken,
  OAUTH_URL,
};
