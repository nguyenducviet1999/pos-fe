import { EnumFilterDateRangeType } from "@src/enums";

export const demo = "demo constant";

export const ctDefaultData = {
  DEBOUNCE_TIME: 700,
  MAP_ZOOM: 15,
};
export const ctCountryCode = {
  VIETNAM: "vn",
  FRANCE: "fr",
};

export const ITEM_PER_PAGE = 10;
export const ctLocalesData = [
  { label: "Tiếng Việt", value: ctCountryCode.VIETNAM },
  { label: "Français", value: ctCountryCode.FRANCE },
];

export const statusOptionsData = [
  { label: "commons.ACTIVE", value: true },
  { label: "commons.INACTIVE", value: false },
];

export const adminRoleCodes = ["admin", "operator"];

export const filterDateRangeTypeOptionsData = [
  { label: "commons.ALL", value: EnumFilterDateRangeType.ALL },
  { label: "commons.TODAY", value: EnumFilterDateRangeType.TODAY },
  { label: "commons.YESTERDAY", value: EnumFilterDateRangeType.YESTERDAY },
  { label: "commons.THIS_WEEK", value: EnumFilterDateRangeType.THIS_WEEK },
  { label: "commons.LAST_WEEK", value: EnumFilterDateRangeType.LAST_WEEK },
  { label: "commons.THIS_MONTH", value: EnumFilterDateRangeType.THIS_MONTH },
  { label: "commons.THIS_YEAR", value: EnumFilterDateRangeType.THIS_YEAR },
  { label: "commons.CUSTOM", value: EnumFilterDateRangeType.CUSTOM },
];
