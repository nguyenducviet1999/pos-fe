export enum EnumLoginProperties {
  EMAIL = "email",
  PASSWORD = "password",
}

export interface ILogin {
  [EnumLoginProperties.EMAIL]: string;
  [EnumLoginProperties.PASSWORD]: string;
}

export enum EnumLoginUserType {
  STAFF = "staff",
  CUSTOMER = "customer",
}
