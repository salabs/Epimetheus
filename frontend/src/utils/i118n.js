import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import frontpage from "../locales/en/frontpage.json"
import common from "../locales/en/common.json"

const resources = {
  en: {
    common: common,
    frontpage: frontpage
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    debug: false,
    interpolation: {
      escapeValue: false
    },
  });