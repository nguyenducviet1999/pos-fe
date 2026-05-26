// import { RangePickerProps } from "antd/es/date-picker/generatePicker/interface";
import dayjs, { Dayjs } from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";

import "dayjs/locale/fr";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(timezone);
dayjs.extend(utc);

export const FORMAT_DATE = {
  BASIC: "MM.DD.YYYY",
  DATE_TIME: "MM.DD.YYYY HH:mm",
  HOUR_MINUTES: "HH:mm",
  HOUR_MINUTES_SECONDS: "HH:mm:ss",
  NORMAL: "YYYY-MM-DD",
  YEAR_MONTH: "YYYY-MM",
  NORMAL_REVERSE: "DD-MM-YYYY", //
  NORMAL_DATE_TIME_REVERSE: "DD-MM-YYYY HH:mm",
  NORMAL_DATE_TIME: "YYYY-MM-DD HH:mm:ss",
  BE_DATE_TIME: "YYYY-MM-DD[T]HH:mm:ss",
  YEAR_MONTH_DAY: "YYYY.MM.DD",
  YEAR_MONTH_DAY_HOUR_MIN: "YYYY.MM.DD HH:mm",
  FULL_FORMAT: "YYYY.MM.DD HH:mm:ss", //
  FORMAT_DATE_TIME: "MM.DD.YYYY HH:mm", //
  MONTH_DAY_YEAR: "MMM DD, YYYY",
  MONTH_DAY_YEAR_HOUR_MIN_SEC: "MMM DD, YYYY HH:mm:ss", //
  HOUR: "HH",
  MINTUES: "mm",
  COMPETITION: "MM-DD-YYYY",
  DAY_MONTH_YEAR_HOUR_MIN: "DD/MM/YYYY HH:mm",
  DAY_MONTH_YEAR: "DD - MMM - YYYY",
  FILE_DOWNLOAD: "YYYYMMDDHHmmss",
};

export const TIME_START_DATE = "00:00:00";
export const TIME_END_DATE = "23:59:59";
export const BASE_TIME_ZONE = "America/New_York";
export const JAPAN_TIME_ZONE = "Asia/Tokyo";

// export const disabledDateInPast: RangePickerProps["disabledDate"] = (current) => {
//   return current && current < dayjs().endOf("day").add(-1, "day");
// };

// export const disabledDateInFuture: RangePickerProps["disabledDate"] = (current) => {
//   return current && current > dayjs().endOf("day");
// };

export const renderDateTime = (dateTime?: string, format: string = FORMAT_DATE.MONTH_DAY_YEAR) => {
  if (!dateTime) return "";
  return dayjs(dateTime).format(format);
};

export const handleChangeDateTime = (date: any, field: any) => {
  const newDate = date && date !== "" ? date.format(FORMAT_DATE.NORMAL_DATE_TIME) : "";
  field.onChange(newDate);
};
// =========================
export const handleGetNewDate = (date: any, value: any, format = "") => {
  const newDate = value ? dayjs(value)?.year(date?.year())?.month(date?.month())?.date(date?.date()) : date;
  return format ? newDate.format(format) : newDate.toString();
};

export const handleChangeDate = (date: any, field: any, format = "") => {
  const newValue = handleGetNewDate(date, field.value, format);
  field.onChange(newValue);
};
export const handleGetNewTime = (date: any, value: any, format = "") => {
  const newDate = value ? dayjs(value)?.hour(date?.hour())?.minute(date?.minute()) : date;
  return format ? newDate.format(format) : newDate.toString();
};

export const handleChangeTime = (date: any, field: any, format = "") => {
  const newValue = handleGetNewTime(date, field.value, format);
  field.onChange(newValue);
};

export const handleGetNewDateV1 = (
  date: any,
  value: any,
  timezoneConfig?: {
    serverTimezone?: string;
    localTimezone?: string;
  },
  format = "",
) => {
  const newDate = value ? newDayjs(value, timezoneConfig)?.year(date?.year())?.month(date?.month())?.date(date?.date()) : date;
  // chuyển đổi về múi server trước khi trả về
  newDate.tz(timezoneConfig?.serverTimezone || BASE_TIME_ZONE);
  return format ? newDate.format(format) : newDate.toString();
};

export const handleChangeDateV1 = (
  date: any,
  field: any,
  timezoneConfig?: {
    serverTimezone?: string;
    localTimezone?: string;
  },
  format = "",
) => {
  const newValue = handleGetNewDateV1(date, field.value, timezoneConfig, format);
  field.onChange(newValue);
};

export const handleGetNewTimeV1 = (
  date: any,
  value: any,
  timezoneConfig?: {
    serverTimezone?: string;
    localTimezone?: string;
  },
  format = "",
) => {
  const newDate = value ? newDayjs(value, timezoneConfig)?.hour(date?.hour())?.minute(date?.minute()) : date;
  // chuyển đổi về múi server trước khi trả về
  newDate.tz(timezoneConfig?.serverTimezone || BASE_TIME_ZONE);
  return format ? newDate.format(format) : newDate.toString();
};

export const handleChangeTimeV1 = (
  date: any,
  field: any,
  timezoneConfig?: {
    serverTimezone?: string;
    localTimezone?: string;
  },
  format = "",
) => {
  const newValue = handleGetNewTimeV1(date, field.value, timezoneConfig, format);
  field.onChange(newValue);
};

// =========================

export const convertDateTimeWithTimeZone = (data: { dateTime: string; toTimezone: string; fromTimezone?: string; format?: string }) => {
  if (!data.dateTime) return "";
  const dateTime = data.dateTime ?? "";
  const fromTimezone = data.fromTimezone ?? BASE_TIME_ZONE;
  const toTimezone = data.toTimezone ?? BASE_TIME_ZONE;
  const format = data.format ?? FORMAT_DATE.NORMAL_DATE_TIME;
  return dayjs.tz(dateTime, fromTimezone).tz(toTimezone).format(format);
};

export const newDayjs = (
  dateTime?: dayjs.ConfigType,
  timezoneConfig?: {
    serverTimezone?: string;
    localTimezone?: string;
  },
) => {
  const dateTimeData = dateTime || undefined;
  const serverTimezone = timezoneConfig?.serverTimezone ?? BASE_TIME_ZONE;
  const localTimezone = timezoneConfig?.localTimezone ?? BASE_TIME_ZONE;
  return dayjs.tz(dateTimeData, serverTimezone).tz(localTimezone);
};

export const newDateBE = (timeValueBE: number) => {
  const timeValue = 1000 * timeValueBE;
  return dayjs(timeValue);
};

export const getLocalTime = (
  dateTime?: dayjs.ConfigType,
  timezoneConfig?: {
    serverTimezone?: string;
    localTimezone?: string;
  },
  format: string = FORMAT_DATE.NORMAL_DATE_TIME,
) => {
  return newDayjs(dateTime, timezoneConfig).format(format);
};

export const listHoursDisabled = (value: Dayjs, isAfter?: boolean) => {
  let startStamp = 0;
  let endStamp = 24;
  const dateTimeValue = value;
  if (!dateTimeValue) return [];
  const hourValue = dateTimeValue.hour();
  if (isAfter) {
    startStamp = hourValue + 1;
  } else {
    endStamp = hourValue - 1;
  }
  const hours = [];
  for (let i = startStamp; i <= endStamp; i++) {
    hours.push(i);
  }
  return hours;
};

export const listMinutesDisabled = (hour: number, value: Dayjs, isAfter?: boolean) => {
  let hourStamp;
  let startMinuteStamp = 0;
  let endMinuteStamp = 60;
  const dateTimeValue = value;
  if (!dateTimeValue) return [];
  if (isAfter) {
    hourStamp = dateTimeValue.hour();
    startMinuteStamp = dateTimeValue.minute() + 1;
  } else {
    hourStamp = dateTimeValue.hour();
    endMinuteStamp = dateTimeValue.minute() - 1;
  }
  const minutes = [];
  if (hourStamp === hour) {
    for (let i = startMinuteStamp; i <= endMinuteStamp; i++) {
      minutes.push(i);
    }
  }
  return minutes;
};

export const listHoursDisabledV2 = (value: Dayjs, maxValue?: Dayjs, minValue?: Dayjs) => {
  let startStamp = 0;
  let endStamp = 23;
  const dateTimeMaxValue = maxValue;
  const dateTimeMinValue = minValue;
  if (!maxValue && !minValue) return [];
  if (dateTimeMaxValue && value.date() === dateTimeMaxValue.date()) {
    endStamp = dateTimeMaxValue.hour();
  }
  if (dateTimeMinValue && value.date() === dateTimeMinValue.date()) {
    startStamp = dateTimeMinValue.hour();
  }
  const hours = [];
  for (let i = 0; i <= startStamp - 1; i++) {
    hours.push(i);
  }
  for (let i = endStamp + 1; i <= 23; i++) {
    hours.push(i);
  }
  return hours;
};

export const listMinutesDisabledV2 = (value: Dayjs, maxValue?: Dayjs, minValue?: Dayjs) => {
  let startMinuteStamp = 0;
  let endMinuteStamp = 59;
  if (!maxValue && !minValue) return [];
  if (value.date() === maxValue?.date() && value.hour() === maxValue?.hour()) {
    endMinuteStamp = maxValue.minute();
  }
  if (value.date() === minValue?.date() && value.hour() === minValue?.hour()) {
    startMinuteStamp = minValue.minute();
  }
  const minutes = [];
  for (let i = 0; i <= startMinuteStamp - 1; i++) {
    minutes.push(i);
  }
  for (let i = endMinuteStamp + 1; i <= 59; i++) {
    minutes.push(i);
  }
  return minutes;
};

export const getDisabledTimeFn = (maxDate?: any, minDate?: any) => {
  return (date: Dayjs, range?: "start" | "end") => {
    if (!maxDate && !minDate) {
      return {};
    }
    const maxDateValue = maxDate ? dayjs(maxDate) : undefined;
    const minDateValue = minDate ? dayjs(minDate) : undefined;

    return {
      disabledHours: () => {
        return listHoursDisabledV2(date, maxDateValue, minDateValue);
      },
      disabledMinutes: (hour: number) => {
        return listMinutesDisabledV2(date, maxDateValue, minDateValue);
      },
    };
  };
};

export const getDisabledTimeStartFn = (startDate: any, endDate: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (date: Dayjs, range?: "start" | "end") => {
    if (!endDate && !startDate) {
      return {};
    }
    const startDateValue = dayjs(startDate);
    const endDateValue = dayjs(endDate);
    if (startDateValue.day() !== endDateValue.day()) {
      return {};
    }

    return {
      disabledHours: () => {
        return listHoursDisabled(endDateValue, true);
      },
      disabledMinutes: (hour: number) => {
        return listMinutesDisabled(hour, endDateValue, true);
      },
    };
  };
};

export const getDisabledTimeEndFn = (startDate: any, endDate: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (date: Dayjs, range?: "start" | "end") => {
    if (!endDate && !startDate) {
      return {};
    }
    const startDateValue = dayjs(startDate);
    const endDateValue = dayjs(endDate);
    if (startDateValue.day() !== endDateValue.day()) {
      return {};
    }

    return {
      disabledHours: () => {
        return listHoursDisabled(startDateValue, false);
      },
      disabledMinutes: (hour: number) => {
        return listMinutesDisabled(hour, startDateValue, false);
      },
    };
  };
};

export const isValidDateTime = (dateStr: string) => {
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
};

export const getTimezoneOffsetHHMM = () => {
  const offset = -new Date().getTimezoneOffset();
  const sign = offset >= 0 ? "+" : "-";
  const abs = Math.abs(offset);

  const hours = String(Math.floor(abs / 60)).padStart(2, "0");
  const minutes = String(abs % 60).padStart(2, "0");

  return `${sign}${hours}${minutes}`;
};

dayjs.locale("fr");
export default dayjs;
