import type { Locale } from 'src/shared/config';

interface SearchSuggestion {
  readonly id: string;
  readonly latinName: string;
  readonly name: Record<Locale, string>;
}

export interface SearchSuggestionView {
  readonly id: string;
  readonly label: string;
  readonly latinName: string;
}

const suggestions: readonly SearchSuggestion[] = [
  {
    id: 'trd-zbr',
    latinName: 'Tradescantia zebrina',
    name: {
      ru: 'Традесканция',
      en: 'Tradescantia',
    },
  },
  {
    id: 'mon-del',
    latinName: 'Monstera deliciosa',
    name: {
      ru: 'Монстера',
      en: 'Monstera',
    },
  },
  {
    id: 'chl-com',
    latinName: 'Chlorophytum comosum',
    name: {
      ru: 'Хлорофитум',
      en: 'Spider Plant',
    },
  },
  {
    id: 'glo-vel',
    latinName: 'Sinningia speciosa',
    name: {
      ru: 'Глоксиния',
      en: 'Gloxinia',
    },
  },
  {
    id: 'pha-whi',
    latinName: 'Phalaenopsis',
    name: {
      ru: 'Орхидея фаленопсис',
      en: 'Phalaenopsis Orchid',
    },
  },
];

const normalizeSearchValue = (value: string) => value.trim().toLowerCase();

export const createSearchSuggestions = (query: string, locale: Locale): readonly SearchSuggestionView[] => {
  const normalizedQuery = normalizeSearchValue(query);

  if (!normalizedQuery) {
    return [];
  }

  return suggestions
    .filter((suggestion) => {
      const searchableValues = [
        suggestion.name.ru,
        suggestion.name.en,
        suggestion.latinName,
      ];

      return searchableValues.some((value) => normalizeSearchValue(value).includes(normalizedQuery));
    })
    .slice(0, 5)
    .map((suggestion) => ({
      id: suggestion.id,
      label: suggestion.name[locale],
      latinName: suggestion.latinName,
    }));
};
