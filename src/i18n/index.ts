import i18n, { TOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import vi from "./locales/vi.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      vi: {
        translation: vi,
      },
    },

    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });
export function translate(
  name: string,
  params?: TOptions<{ [key: string]: any }> | string,
) {
  return i18n.t(name, params as any);
}

export default i18n;
