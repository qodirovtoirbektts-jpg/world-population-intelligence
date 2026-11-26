"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { SupportedLocale, Translations, dictionaries, defaultLocale, getDictionary } from "@/lib/i18n";

interface LanguageContextType {
  language: SupportedLocale;
  setLanguage: (lang: SupportedLocale) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLocale,
  setLanguage: () => {},
  t: dictionaries.uz,
});

const STORAGE_KEY = "wpi_language";

export function LanguageProvider({
  children,
  defaultLang = defaultLocale,
}: {
  children: React.ReactNode;
  defaultLang?: SupportedLocale;
}) {
  const [language, setLanguageState] = useState<SupportedLocale>(defaultLang);
  const [mounted, setMounted] = useState<boolean>(false);

  // Initialize from localStorage on client
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as SupportedLocale | null;
      if (saved && (saved === "en" || saved === "uz" || saved === "ru")) {
        setLanguageState(saved);
        document.documentElement.lang = saved;
      } else {
        document.documentElement.lang = defaultLang;
      }
    } catch {
      // Ignore localStorage issues
    }
    setMounted(true);
  }, [defaultLang]);

  const setLanguage = (lang: SupportedLocale) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    } catch {
      // Ignore localStorage issues
    }
  };

  const t = useMemo(() => {
    return getDictionary(language);
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
    }),
    [language, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}
