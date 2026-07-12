import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import { type Locale, usePreferredLocale } from './locale';

interface LayoutContextValue {
  readonly isCollectionOpen: boolean;
  readonly locale: Locale;
  readonly onCollectionClose: () => void;
  readonly onCollectionOpen: () => void;
  readonly onLocaleChange: (locale: Locale) => void;
}

const LayoutContext = createContext<LayoutContextValue | null>(null);

interface LayoutProviderProps {
  readonly children: ReactNode;
}

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);
  const [locale, changeLocale] = usePreferredLocale();
  const openCollection = useCallback(() => {
    setIsCollectionOpen(true);
  }, []);

  const closeCollection = useCallback(() => {
    setIsCollectionOpen(false);
  }, []);

  const contextValue = useMemo(
    () => ({
      isCollectionOpen,
      locale,
      onCollectionClose: closeCollection,
      onCollectionOpen: openCollection,
      onLocaleChange: changeLocale,
    }),
    [changeLocale, closeCollection, isCollectionOpen, locale, openCollection],
  );

  return <LayoutContext.Provider value={contextValue}>{children}</LayoutContext.Provider>;
};

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error('useLayoutContext must be used inside LayoutProvider');
  }

  return context;
};
