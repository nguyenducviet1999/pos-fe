import { EnumStoresUserInfoProperties } from "./models/stores-user-info.model";

export enum EnumStoreKeys {
  USER_INFO = "user_info",
}

export const storesInitialState: Record<EnumStoreKeys, any> = {
  [EnumStoreKeys.USER_INFO]: {
    [EnumStoresUserInfoProperties.ID]: 1,
    [EnumStoresUserInfoProperties.TITLE]: "okoko",
  },
};
