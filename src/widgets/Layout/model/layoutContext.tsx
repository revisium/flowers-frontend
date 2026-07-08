import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Locale } from 'src/shared/config';
import { usePreferredLocale } from 'src/shared/config';

interface LayoutContextValue {
  readonly locale: Locale;
  readonly query: string;
  readonly selectedSearchPlantId: string | null;
  readonly selectedSearchPlantRequest: number;
  readonly onLocaleChange: (locale: Locale) => void;
  readonly onQueryChange: (query: string) => void;
  readonly onSearchPlantClear: () => void;
  readonly onSearchPlantSelect: (plantId: string) => void;
  readonly onSearchSuggestionSelect: (query: string, plantId: string) => void;
}

export const LayoutContext = createContext<LayoutContextValue | null>(null);

interface LayoutProviderProps {
  readonly children: ReactNode;
}

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const [locale, changeLocale] = usePreferredLocale();
  const [query, setQuery] = useState('');
  const [selectedSearchPlantId, setSelectedSearchPlantId] = useState<string | null>(null);
  const [selectedSearchPlantRequest, setSelectedSearchPlantRequest] = useState(0);

  const changeSearchQuery = (nextQuery: string) => {
    setQuery(nextQuery);
    setSelectedSearchPlantId(null);
  };

  const selectSearchPlant = (plantId: string) => {
    setSelectedSearchPlantId(plantId);
    setSelectedSearchPlantRequest((request) => request + 1);
  };

  const selectSearchSuggestion = (nextQuery: string, plantId: string) => {
    setQuery(nextQuery);
    setSelectedSearchPlantId(plantId);
    setSelectedSearchPlantRequest((request) => request + 1);
  };

  const clearSearchPlant = () => {
    setSelectedSearchPlantId(null);
  };

  return (
    <LayoutContext.Provider
      value={{
        locale,
        onLocaleChange: changeLocale,
        onQueryChange: changeSearchQuery,
        onSearchPlantClear: clearSearchPlant,
        onSearchPlantSelect: selectSearchPlant,
        onSearchSuggestionSelect: selectSearchSuggestion,
        query,
        selectedSearchPlantId,
        selectedSearchPlantRequest,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error('useLayoutContext must be used inside LayoutProvider');
  }

  return context;
};
