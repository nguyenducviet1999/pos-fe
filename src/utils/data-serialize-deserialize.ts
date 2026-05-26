import dayjs from "dayjs";

// Serialize: convert Object(array(Object)) have field type Day.js -> ISO String
export const serializeDayjs = (data: any): any => {
  const isTypeDayjs = !!data && typeof data === "object" && data.$y !== undefined;
  if (isTypeDayjs) {
    return data.toISOString();
  }
  if (Array.isArray(data)) {
    return data.map(serializeDayjs);
  }
  if (typeof data === "object" && data !== null) {
    return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, serializeDayjs(value)]));
  }
  return data;
};

// Deserialize: convert Object(array(Object)) have field type ISO String same Dayjs (example: "2025-01-05T17:00:00.000Z") -> Day.js
export const deserializeDayjs = (data: any): any => {
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z?$/;
  const isStringDate = isoDateRegex.test(data);
  if (typeof data === "string" && isStringDate && dayjs(data).isValid()) {
    return dayjs(data);
  }
  if (Array.isArray(data)) {
    return data.map(deserializeDayjs);
  }
  if (typeof data === "object" && !!data) {
    return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, deserializeDayjs(value)]));
  }
  return data;
};
