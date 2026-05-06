import type { Direction } from '@keter-ui/core';

/** RTL languages by ISO 639-1 code */
export const RTL_LANGUAGES = new Set([
  'ar', // Arabic
  'he', // Hebrew
  'fa', // Persian/Farsi
  'ur', // Urdu
  'ps', // Pashto
  'ku', // Kurdish (Sorani)
  'yi', // Yiddish
  'dv', // Dhivehi
  'ug', // Uyghur
]);

export function isRTLLocale(locale: string): boolean {
  const lang = locale.split('-')[0]?.toLowerCase();
  return lang ? RTL_LANGUAGES.has(lang) : false;
}

export function getDirection(locale: string): Direction {
  return isRTLLocale(locale) ? 'rtl' : 'ltr';
}

export function applyDirection(element: HTMLElement, dir: Direction): void {
  element.dir = dir;
  element.lang = element.lang;
}

/** Apply direction to document root */
export function applyDocumentDirection(dir: Direction, lang?: string): void {
  document.documentElement.dir = dir;
  if (lang) document.documentElement.lang = lang;
}
