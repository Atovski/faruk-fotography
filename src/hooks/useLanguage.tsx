'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import tr, { Translations } from '@/i18n/tr';
import en from '@/i18n/en';
import { localizePathname } from '@/i18n/config';

type Language = 'tr' | 'en';

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

interface LanguageProviderProps {
  children: ReactNode;
  lang?: Language;
}

export function LanguageProvider({ children, lang }: LanguageProviderProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Determine language from prop (server-side) or URL
  const getLanguageFromUrl = useCallback((): Language => {
    if (lang) return lang;
    if (pathname.startsWith('/en')) return 'en';
    if (pathname.startsWith('/tr')) return 'tr';
    return 'tr';
  }, [lang, pathname]);

  const [language, setLanguageState] = useState<Language>(getLanguageFromUrl);

  // Sync language when URL changes
  useEffect(() => {
    const urlLang = getLanguageFromUrl();
    if (urlLang !== language) {
      setLanguageState(urlLang);
    }
  }, [pathname, getLanguageFromUrl, language]);

  // Update html lang attribute
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback(
    (newLang: Language) => {
      if (newLang === language) return;

      // Navigate to the equivalent page in the target language
      const newPath = localizePathname(pathname, newLang);
      setLanguageState(newLang);
      router.push(newPath);
    },
    [language, pathname, router]
  );

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
