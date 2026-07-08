import { Flex } from '@chakra-ui/react';
import type { Locale } from 'src/shared/config';

import { HeaderLanguageSwitcher } from '../HeaderLanguageSwitcher/HeaderLanguageSwitcher';
import { HeaderLogo } from '../HeaderLogo/HeaderLogo';
import { HeaderSearch } from '../HeaderSearch/HeaderSearch';

interface HeaderProps {
  readonly locale: Locale;
  readonly logoTone: 'dark' | 'light';
  readonly query: string;
  readonly onLocaleChange: (locale: Locale) => void;
  readonly onQueryChange: (query: string) => void;
  readonly onSearchSuggestionSelect: (query: string, plantId: string) => void;
}

const copy = {
  ru: {
    homeLabel: 'Оранжерея, главная',
    languageLabel: 'Выбор языка',
    searchClearLabel: 'Очистить поиск',
    searchEmptyLabel: 'Ничего не нашлось',
    searchLabel: 'Поиск растения',
    searchPlaceholder: 'Найти растение...',
    subtitle: 'моя коллекция растений',
    title: 'Оранжерея',
  },
  en: {
    homeLabel: 'Greenhouse, home',
    languageLabel: 'Language selector',
    searchClearLabel: 'Clear search',
    searchEmptyLabel: 'Nothing found',
    searchLabel: 'Search plants',
    searchPlaceholder: 'Search plants...',
    subtitle: 'my plant collection',
    title: 'Greenhouse',
  },
} satisfies Record<Locale, Record<'homeLabel' | 'languageLabel' | 'searchClearLabel' | 'searchEmptyLabel' | 'searchLabel' | 'searchPlaceholder' | 'subtitle' | 'title', string>>;

export const Header = ({ locale, logoTone, onLocaleChange, onQueryChange, onSearchSuggestionSelect, query }: HeaderProps) => {
  const text = copy[locale];

  return (
    <Flex
      as="header"
      alignItems="center"
      backdropFilter="blur(5px) saturate(1.02)"
      borderBottom="1px solid rgba(93, 112, 71, 0.1)"
      boxShadow="0 10px 24px rgba(56, 48, 31, 0.02)"
      flexWrap="nowrap"
      gap={{ base: '8px', md: '12px', lg: '24px' }}
      justifyContent="space-between"
      left={0}
      marginBottom={{ base: '-66px', md: '-80px' }}
      padding={{ base: '10px 14px 12px', md: '14px clamp(24px, 4vw, 46px)' }}
      position="sticky"
      right={0}
      top={0}
      width="100%"
      zIndex={20}
      _after={{
        background: 'linear-gradient(90deg, rgba(95, 127, 57, 0), rgba(95, 127, 57, 0.18), rgba(95, 127, 57, 0))',
        bottom: 0,
        content: '""',
        height: '1px',
        left: 0,
        position: 'absolute',
        right: 0,
      }}
    >
      <HeaderLogo homeLabel={text.homeLabel} subtitle={text.subtitle} title={text.title} tone={logoTone} />

      <Flex alignItems="center" flex="0 0 auto" gap={{ base: '8px', md: '12px' }} justifyContent="flex-end" minWidth={0}>
        <HeaderSearch clearLabel={text.searchClearLabel} emptyLabel={text.searchEmptyLabel} label={text.searchLabel} locale={locale} onChange={onQueryChange} onSelect={onSearchSuggestionSelect} placeholder={text.searchPlaceholder} value={query} />
        <HeaderLanguageSwitcher label={text.languageLabel} locale={locale} onLocaleChange={onLocaleChange} />
      </Flex>
    </Flex>
  );
};
