export enum EnumStoresUserInfoProperties {
  ID = "id",
  TITLE = "title",
}

export interface StoresUserInfoModel {
  [EnumStoresUserInfoProperties.ID]: number;
  [EnumStoresUserInfoProperties.TITLE]: string;
}
