import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Locale } from 'src/shared/config';
import { usePreferredLocale } from 'src/shared/config';

interface LayoutContextValue {
  readonly locale: Locale;
  readonly query: string;
  readonly onLocaleChange: (locale: Locale) => void;
  readonly onQueryChange: (query: string) => void;
}

export const LayoutContext = createContext<LayoutContextValue | null>(null);

interface LayoutProviderProps {
  readonly children: ReactNode;
}

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const [locale, changeLocale] = usePreferredLocale();
  const [query, setQuery] = useState('');

  return (
    <LayoutContext.Provider
      value={{
        locale,
        onLocaleChange: changeLocale,
        onQueryChange: setQuery,
        query,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error('useLayoutContext must be used inside Layout');
  }

  return context;
};
