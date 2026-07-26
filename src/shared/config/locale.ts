import { useCallback, useEffect, useState } from 'react';

export type Locale = 'ru' | 'en';

export const defaultLocale: Locale = 'ru';
const localeCookieKey = 'flowers.locale';
const localeStorageKey = 'flowers.locale';
const localeTitles: Record<Locale, string> = {
  en: 'Greenhouse. My personal collection.',
  ru: 'Оранжерея. Моя личная коллекция.',
};

const isLocale = (value: string | null): value is Locale => {
  return value === 'ru' || value === 'en';
};

const applyDocumentLocale = (locale: Locale) => {
  document.documentElement.lang = locale;
  document.title = getLocaleTitle(locale);
};

export const getLocaleTitle = (locale: Locale) => localeTitles[locale];

const detectLocale = (languages: readonly string[]): Locale => {
  const primaryLanguage = languages[0]?.trim().toLowerCase();

  return primaryLanguage === 'ru' || primaryLanguage?.startsWith('ru-')
    ? 'ru'
    : 'en';
};

const readLocaleCookie = (cookieHeader: string | null) => {
  const storedLocale = cookieHeader
    ?.split(';')
    .map((cookie) => cookie.trim().split('='))
    .find(([key]) => key === localeCookieKey)?.[1];
  const locale = storedLocale ?? null;

  return isLocale(locale) ? locale : null;
};

export const getRequestLocale = (request: Request): Locale => {
  const storedLocale = readLocaleCookie(request.headers.get('cookie'));

  if (storedLocale) {
    return storedLocale;
  }

  const acceptedLanguages = request.headers
    .get('accept-language')
    ?.split(',')
    .map((language) => language.split(';')[0] ?? '') ?? [];

  return detectLocale(acceptedLanguages);
};

const readBrowserLocale = (fallbackLocale: Locale) => {
  if (typeof window === 'undefined') {
    return fallbackLocale;
  }

  try {
    const storedLocale = window.localStorage.getItem(localeStorageKey);

    if (isLocale(storedLocale)) {
      return storedLocale;
    }
  } catch {
    // Browser language detection still works when storage is unavailable.
  }

  const cookieLocale = readLocaleCookie(document.cookie);

  if (cookieLocale) {
    return cookieLocale;
  }

  return window.navigator.languages.length > 0
    ? detectLocale(window.navigator.languages)
    : fallbackLocale;
};

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieKey}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;

  try {
    window.localStorage.setItem(localeStorageKey, locale);
  } catch {
    // Locale persistence is best-effort; UI state still updates.
  }
};

export const usePreferredLocale = (initialLocale: Locale = defaultLocale) => {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  useEffect(() => {
    const preferredLocale = readBrowserLocale(initialLocale);

    setLocale(preferredLocale);
    applyDocumentLocale(preferredLocale);
  }, [initialLocale]);

  const changeLocale = useCallback((nextLocale: Locale) => {
    setLocale(nextLocale);
    persistLocale(nextLocale);
    applyDocumentLocale(nextLocale);
  }, []);

  return [locale, changeLocale] as const;
};
