import type { Dayjs } from "dayjs";

import dayjs, { FORMAT_DATE } from "@src/utils/datetime";

export const optionValueToKey = (value: unknown) => JSON.stringify(value);

export const parseDateValue = (value?: string | Date | Dayjs | null) => {
  if (value === null || value === undefined || value === "") {
    return undefined;
  }

  const parsed = dayjs(value);
  return parsed.isValid() ? parsed.toDate() : undefined;
};

export const formatDateValue = (
  date: Date | undefined,
  format = FORMAT_DATE.NORMAL,
) => {
  if (!date) {
    return null;
  }

  return dayjs(date).format(format);
};
