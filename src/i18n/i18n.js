import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './translations/translationEN.json';
import translationFI from './translations/translationFI.json';

/**
 * This module configures internationalisation in the application.
 * It also exports common functions to work with that data, for cases
 * where we've been tripped up in the past.
 */

const resources = {
  en: {
    translation: translationEN,
  },
  fi: {
    translation: translationFI,
  },
};

export const initialize = () => {
  i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
      resources,
      // Only pass through 'en' and 'fi', otherwise fallback
      // NOTE: This is important, because otherwise we can end up with
      // en-GB, which would break custom translations in data
      whitelist: ['en', 'fi'],
      // If a language does not match, pick 'en'
      fallbackLng: 'en',
      debug: false,

      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
    });
};
