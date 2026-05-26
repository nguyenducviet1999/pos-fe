export interface ISignInRequest {
  username: string;
  password: string;
}

export interface ISignInResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: UserInfo;
}

export interface ISignIn2FaResponse {
  login_id: string;
  country: string;
  usr_no: number;
  role: number;
  status: any;
  twoFaFirstTime: any;
  twoFaQr: string;
  verifier: string;
}

export interface IRefreshTokenRequest {
  refreshToken: string;
}

export interface UserInfo {
  id: string;
  username: string;
  email: string;
  fullName: string;
  roles: string[];
  permissions: string[];
}
