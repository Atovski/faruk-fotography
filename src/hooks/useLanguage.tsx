'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import tr, { Translations } from '@/i18n/tr';
import en from '@/i18n/en';
import { Language } from '@/types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const translations: Record<Language, Translations> = { tr, en };

const LanguageContext = createContext<LanguageContextType>({
  language: 'tr',
  setLanguage: () => {},
  t: tr,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('tr');

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('faruk-lang', lang);
      document.documentElement.lang = lang;
    }
  }, []);

  React.useEffect(() => {
    const saved = localStorage.getItem('faruk-lang') as Language;
    if (saved && (saved === 'tr' || saved === 'en')) {
      setLanguageState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
