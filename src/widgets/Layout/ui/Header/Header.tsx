import { Button, Flex, Text } from '@chakra-ui/react';
import { getCollectionPlantCount } from 'src/entities/collection';
import type { Locale } from 'src/shared/config';

import { HeaderLanguageSwitcher } from '../HeaderLanguageSwitcher/HeaderLanguageSwitcher';
import { HeaderLogo } from '../HeaderLogo/HeaderLogo';
import { HeaderNavigation } from '../HeaderNavigation/HeaderNavigation';

interface HeaderProps {
  readonly locale: Locale;
  readonly logoTone: 'dark' | 'light';
  readonly onCollectionOpen: () => void;
  readonly onLocaleChange: (locale: Locale) => void;
}

const copy = {
  ru: {
    homeLabel: 'Оранжерея, главная',
    languageLabel: 'Выбор языка',
    plantsLabel: 'Мои растения',
    subtitle: 'моя коллекция растений',
    title: 'Оранжерея',
  },
  en: {
    homeLabel: 'Greenhouse, home',
    languageLabel: 'Language selector',
    plantsLabel: 'My plants',
    subtitle: 'my plant collection',
    title: 'Greenhouse',
  },
} as const;

export const Header = ({ locale, logoTone, onCollectionOpen, onLocaleChange }: HeaderProps) => {
  const text = copy[locale];
  const plantCount = getCollectionPlantCount();

  return (
    <Flex
      as="header"
      alignItems="center"
      background="rgba(255, 252, 247, 0.92)"
      backdropFilter="blur(14px) saturate(1.02)"
      borderBottom="1px solid rgba(119, 108, 83, 0.14)"
      boxShadow="0 10px 24px rgba(56, 48, 31, 0.035)"
      flexWrap={{ base: 'wrap', md: 'nowrap' }}
      gap={{ base: '8px', md: '12px', lg: '14px' }}
      justifyContent="space-between"
      left={0}
      marginBottom={{ base: '-99px', md: '-80px' }}
      padding={{ base: '10px 14px 12px', md: '12px clamp(22px, 3vw, 40px)' }}
      position="sticky"
      right={0}
      top={0}
      width="100%"
      zIndex={20}
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
      <HeaderLogo
        homeLabel={text.homeLabel}
        subtitle={text.subtitle}
        title={text.title}
        tone={logoTone}
      />

      <HeaderNavigation locale={locale} onCollectionOpen={onCollectionOpen} />

      <Flex
        alignItems="center"
        flex="0 0 auto"
        gap={{ base: '8px', md: '10px' }}
        justifyContent="flex-end"
        minWidth={0}
      >
        <Button
          aria-label={`${text.plantsLabel} · ${plantCount}`}
          background="#3f5737"
          borderRadius="999px"
          color="white"
          display="inline-flex"
          fontSize="0.78rem"
          fontWeight={600}
          gap={{ base: '5px', lg: '7px' }}
          height={{ base: '34px', md: '38px' }}
          onClick={onCollectionOpen}
          paddingX={{ base: '10px', md: '11px', lg: '14px', xl: '18px' }}
          whiteSpace="nowrap"
          _hover={{ background: '#32472c' }}
        >
          <Text aria-hidden="true" as="span" fontSize="0.95rem">
            ❧
          </Text>
          <Text as="span" display={{ base: 'none', lg: 'inline' }}>
            {text.plantsLabel} ·
          </Text>
          <Text as="span">{plantCount}</Text>
        </Button>
        <HeaderLanguageSwitcher
          label={text.languageLabel}
          locale={locale}
          onLocaleChange={onLocaleChange}
        />
      </Flex>
    </Flex>
  );
};
