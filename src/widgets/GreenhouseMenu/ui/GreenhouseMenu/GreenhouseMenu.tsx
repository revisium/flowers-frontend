import { Flex } from '@chakra-ui/react';

import { GreenhouseMenuLanguageSwitcher } from '../GreenhouseMenuLanguageSwitcher/GreenhouseMenuLanguageSwitcher';
import { GreenhouseMenuLogo } from '../GreenhouseMenuLogo/GreenhouseMenuLogo';
import { GreenhouseMenuSearch } from '../GreenhouseMenuSearch/GreenhouseMenuSearch';

export type GreenhouseMenuLocale = 'ru' | 'en';

interface GreenhouseMenuProps {
  readonly languageLabel: string;
  readonly locale: GreenhouseMenuLocale;
  readonly logoTone: 'dark' | 'light';
  readonly searchLabel: string;
  readonly searchPlaceholder: string;
  readonly query?: string;
  readonly onLocaleChange?: (locale: GreenhouseMenuLocale) => void;
  readonly onQueryChange?: (query: string) => void;
}

export function GreenhouseMenu({
  languageLabel,
  locale,
  logoTone,
  onLocaleChange,
  onQueryChange,
  query,
  searchLabel,
  searchPlaceholder,
}: GreenhouseMenuProps) {
  return (
    <Flex
      as="header"
      alignItems="center"
      backdropFilter="blur(8px) saturate(1.04)"
      background="linear-gradient(90deg, rgba(255, 248, 233, 0.26), rgba(255, 255, 255, 0.12))"
      borderBottom="1px solid rgba(93, 112, 71, 0.14)"
      boxShadow="0 14px 34px rgba(56, 48, 31, 0.035)"
      flexWrap={{ base: 'wrap', md: 'nowrap' }}
      gap={{ base: '14px', lg: '28px' }}
      justifyContent="space-between"
      padding={{ base: '14px 16px 16px', md: '22px clamp(24px, 4vw, 46px)' }}
      position="relative"
      width="100%"
      zIndex={7}
      _after={{
        background: 'linear-gradient(90deg, rgba(95, 127, 57, 0), rgba(95, 127, 57, 0.26), rgba(95, 127, 57, 0))',
        bottom: 0,
        content: '""',
        height: '1px',
        left: 0,
        position: 'absolute',
        right: 0,
      }}
    >
      <GreenhouseMenuLogo tone={logoTone} />

      <Flex alignItems="center" flex={{ base: '1 1 100%', md: '1 1 auto' }} gap="12px" justifyContent={{ base: 'stretch', md: 'flex-end' }} minWidth={0}>
        <GreenhouseMenuSearch
          label={searchLabel}
          onChange={onQueryChange}
          placeholder={searchPlaceholder}
          value={query}
        />
        <GreenhouseMenuLanguageSwitcher
          label={languageLabel}
          locale={locale}
          onLocaleChange={onLocaleChange}
        />
      </Flex>
    </Flex>
  );
}
