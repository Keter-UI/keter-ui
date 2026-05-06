import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { type Language, translations, type Translations } from '../locales';

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  direction: 'ltr' | 'rtl';
  t: Translations;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('keter-theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const direction: 'ltr' | 'rtl' = lang === 'he' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('keter-theme', isDark ? 'dark' : 'light');
  }, [direction, isDark]);

  const value = {
    lang,
    setLang,
    isDark,
    setIsDark,
    direction,
    t: translations[lang],
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
