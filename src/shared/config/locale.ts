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

const readStoredLocale = () => {
  if (typeof window === 'undefined') {
    return defaultLocale;
  }

  try {
    const storedLocale = window.localStorage.getItem(localeStorageKey);

    if (isLocale(storedLocale)) {
      return storedLocale;
    }
  } catch {
    return defaultLocale;
  }

  return defaultLocale;
};

export const usePreferredLocale = () => {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const storedLocale = readStoredLocale();

    setLocale(storedLocale);
    applyDocumentLocale(storedLocale);
  }, []);

  const changeLocale = useCallback((nextLocale: Locale) => {
    setLocale(nextLocale);

    try {
      window.localStorage.setItem(localeStorageKey, nextLocale);
    } catch {
      // Locale persistence is best-effort; UI state still updates.
    }

    applyDocumentLocale(nextLocale);
  }, []);

  return [locale, changeLocale] as const;
};
