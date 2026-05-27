export enum EnumStoreProperties {
  ID = "id",
  CODE = "code",
  NAME = "name",
  ADDRESS = "address",
  CITY = "city",
  STATE = "state",
}

export interface IStore {
  [EnumStoreProperties.ID]: string;
  [EnumStoreProperties.CODE]: string;
  [EnumStoreProperties.NAME]: string;
  [EnumStoreProperties.ADDRESS]: string;
  [EnumStoreProperties.CITY]: string;
  [EnumStoreProperties.STATE]: string;
}

export const STORES_MOCK: IStore[] = [
  {
    [EnumStoreProperties.ID]: "store-001",
    [EnumStoreProperties.CODE]: "T",
    [EnumStoreProperties.NAME]: "Test Store: Vu",
    [EnumStoreProperties.ADDRESS]: "123 Sunset Blvd",
    [EnumStoreProperties.CITY]: "LA",
    [EnumStoreProperties.STATE]: "LA",
  },
  {
    [EnumStoreProperties.ID]: "store-002",
    [EnumStoreProperties.CODE]: "DT",
    [EnumStoreProperties.NAME]: "Downtown Salon",
    [EnumStoreProperties.ADDRESS]: "456 Main Street",
    [EnumStoreProperties.CITY]: "San Francisco",
    [EnumStoreProperties.STATE]: "CA",
  },
  {
    [EnumStoreProperties.ID]: "store-003",
    [EnumStoreProperties.CODE]: "BH",
    [EnumStoreProperties.NAME]: "Beverly Hills Flagship",
    [EnumStoreProperties.ADDRESS]: "789 Rodeo Drive",
    [EnumStoreProperties.CITY]: "Beverly Hills",
    [EnumStoreProperties.STATE]: "CA",
  },
  {
    [EnumStoreProperties.ID]: "store-004",
    [EnumStoreProperties.CODE]: "BK",
    [EnumStoreProperties.NAME]: "Brooklyn Spot",
    [EnumStoreProperties.ADDRESS]: "12 Bedford Ave",
    [EnumStoreProperties.CITY]: "Brooklyn",
    [EnumStoreProperties.STATE]: "NY",
  },
];
