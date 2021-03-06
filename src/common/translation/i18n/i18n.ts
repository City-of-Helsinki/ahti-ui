import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './translations/en.json';
import fi from './translations/fi.json';
import sv from './translations/sv.json';
import { SUPPORTED_LANGUAGES } from '../TranslationConstants';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      fi: {
        translation: fi,
      },
      sv: {
        translation: sv,
      },
    },
    whitelist: Object.values(SUPPORTED_LANGUAGES),
    fallbackLng: SUPPORTED_LANGUAGES.FI,
    nsSeparator: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
