import { useCallback, useEffect, useState } from 'react';

export type Locale = 'ru' | 'en';

const defaultLocale: Locale = 'ru';
const localeStorageKey = 'flowers.locale';

const isLocale = (value: string | null): value is Locale => {
  return value === 'ru' || value === 'en';
};

const applyDocumentLocale = (locale: Locale) => {
  document.documentElement.lang = locale;
};

export const usePreferredLocale = () => {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const storedLocale = window.localStorage.getItem(localeStorageKey);

    if (isLocale(storedLocale)) {
      setLocale(storedLocale);
      applyDocumentLocale(storedLocale);
      return;
    }

    applyDocumentLocale(defaultLocale);
  }, []);

  const changeLocale = useCallback((nextLocale: Locale) => {
    setLocale(nextLocale);
    window.localStorage.setItem(localeStorageKey, nextLocale);
    applyDocumentLocale(nextLocale);
  }, []);

  return [locale, changeLocale] as const;
};
