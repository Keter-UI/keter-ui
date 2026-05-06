import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './en.json';
import pt from './pt.json';
import es from './es.json';
import he from './he.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
      es: { translation: es },
      he: { translation: he },
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
