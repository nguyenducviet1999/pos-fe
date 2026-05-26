import { useMemo } from "react";

import { ctCountryCode, LANGUAGE } from "@src/constants";
import { getLocalStorage } from "@src/utils";

export const useGetLanguage = () => {
  // get current language from localStorage
  const currentLang = getLocalStorage(LANGUAGE);
  const lang = useMemo(() => {
    return currentLang || ctCountryCode.VIETNAM;
  }, [currentLang]);
  return lang;
};
