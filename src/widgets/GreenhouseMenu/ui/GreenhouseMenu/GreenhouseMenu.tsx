import { Flex } from '@chakra-ui/react';
import type { Locale } from 'src/shared/config';

import { GreenhouseMenuLanguageSwitcher } from '../GreenhouseMenuLanguageSwitcher/GreenhouseMenuLanguageSwitcher';
import { GreenhouseMenuLogo } from '../GreenhouseMenuLogo/GreenhouseMenuLogo';
import { GreenhouseMenuSearch } from '../GreenhouseMenuSearch/GreenhouseMenuSearch';

interface GreenhouseMenuProps {
  readonly languageLabel: string;
  readonly locale: Locale;
  readonly logoTone: 'dark' | 'light';
  readonly searchLabel: string;
  readonly searchPlaceholder: string;
  readonly query?: string;
  readonly onLocaleChange?: (locale: Locale) => void;
  readonly onQueryChange?: (query: string) => void;
}

export const GreenhouseMenu = ({
  languageLabel,
  locale,
  logoTone,
  onLocaleChange,
  onQueryChange,
  query,
  searchLabel,
  searchPlaceholder,
}: GreenhouseMenuProps) => {
  const logoCopy =
    locale === 'ru'
      ? {
          homeLabel: 'Оранжерея, главная',
          subtitle: 'моя коллекция растений',
          title: 'Оранжерея',
        }
      : {
          homeLabel: 'Greenhouse, home',
          subtitle: 'my plant collection',
          title: 'Greenhouse',
        };

  return (
    <Flex
      as="header"
      alignItems="center"
      backdropFilter="blur(5px) saturate(1.02)"
      borderBottom="1px solid rgba(93, 112, 71, 0.1)"
      boxShadow="0 10px 24px rgba(56, 48, 31, 0.02)"
      flexWrap={{ base: 'wrap', md: 'nowrap' }}
      gap={{ base: '10px', lg: '24px' }}
      justifyContent="space-between"
      padding={{ base: '10px 14px 12px', md: '14px clamp(24px, 4vw, 46px)' }}
      position="sticky"
      top={0}
      width="100%"
      zIndex={7}
      _after={{
        background:
          'linear-gradient(90deg, rgba(95, 127, 57, 0), rgba(95, 127, 57, 0.18), rgba(95, 127, 57, 0))',
        bottom: 0,
        content: '""',
        height: '1px',
        left: 0,
        position: 'absolute',
        right: 0,
      }}
    >
      <GreenhouseMenuLogo
        homeLabel={logoCopy.homeLabel}
        subtitle={logoCopy.subtitle}
        title={logoCopy.title}
        tone={logoTone}
      />

      <Flex
        alignItems="center"
        flex={{ base: '1 1 100%', md: '1 1 auto' }}
        gap="12px"
        justifyContent={{ base: 'stretch', md: 'flex-end' }}
        minWidth={0}
      >
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
};
