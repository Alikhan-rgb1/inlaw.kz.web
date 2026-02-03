"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ru } from '@/locales/ru';
import { en } from '@/locales/en';
import { zh } from '@/locales/zh';

type Language = 'ru' | 'en' | 'chi';
type Translations = typeof ru;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('ru');

  // Load language from localStorage if available
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && ['ru', 'en', 'chi'].includes(savedLang)) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const getTranslations = (lang: Language): Translations => {
    switch (lang) {
      case 'en': return en;
      case 'chi': return zh;
      default: return ru;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t: getTranslations(language) }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
