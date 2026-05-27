import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export interface DateTimeFormatData {
  DATE_TIME: string;
  TIME: string;
  DATE_1: string;
  DATE_2: string;
  DATE_3: string;
  DATE_4: string;
}
export const useGetDateTimeFormat = () => {
  const translate = useTranslation().t;
  const dateTimeFormat: DateTimeFormatData = useMemo(() => {
    return {
      DATE_TIME:
        translate("global.date_format.DATE_TIME") || "YYYY.MM.DD HH:mm:ss",
      TIME: translate("global.date_format.TIME"),
      DATE_1: translate("global.date_format.DATE_1"),
      DATE_2: translate("global.date_format.DATE_2"),
      DATE_3: translate("global.date_format.DATE_3"),
      DATE_4: translate("global.date_format.DATE_4"),
    };
  }, [translate]);
  return dateTimeFormat;
};
