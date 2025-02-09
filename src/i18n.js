// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "../public/locales/en/translation.json";
import ukTranslation from "../public/locales/uk/translation.json";
import frTranslation from "../public/locales/fr/translation.json";
import deTranslation from "../public/locales/de/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    fr: {
      translation: frTranslation,
    },
    uk: {
      translation: ukTranslation,
    },
    de: {
      translation: deTranslation,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
