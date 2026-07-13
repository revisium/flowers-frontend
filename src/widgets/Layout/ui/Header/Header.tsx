import { Box, Button, Flex } from '@chakra-ui/react';
import { getCollectionPlantCount } from 'src/entities/collection';
import type { Locale } from 'src/shared/config';
import { PlantCollectionIcon } from 'src/shared/ui';

import { HeaderLanguageSwitcher } from '../HeaderLanguageSwitcher/HeaderLanguageSwitcher';
import { HeaderLogo } from '../HeaderLogo/HeaderLogo';

interface HeaderProps {
  readonly locale: Locale;
  readonly logoTone: 'dark' | 'light';
  readonly onLocaleChange: (locale: Locale) => void;
  readonly onCollectionOpen: () => void;
}

const copy = {
  ru: {
    homeLabel: 'Оранжерея, главная',
    collectionLabel: 'Мои растения',
    languageLabel: 'Выбор языка',
    subtitle: 'моя коллекция растений',
    title: 'Оранжерея',
  },
  en: {
    homeLabel: 'Greenhouse, home',
    collectionLabel: 'My plants',
    languageLabel: 'Language selector',
    subtitle: 'my plant collection',
    title: 'Greenhouse',
  },
} satisfies Record<Locale, Record<'collectionLabel' | 'homeLabel' | 'languageLabel' | 'subtitle' | 'title', string>>;

export const Header = ({ locale, logoTone, onCollectionOpen, onLocaleChange }: HeaderProps) => {
  const text = copy[locale];
  const collectionLabel = `${text.collectionLabel} · ${getCollectionPlantCount()}`;

  return (
    <Flex
      as="header"
      alignItems="center"
      background="rgba(255, 251, 243, 0.58)"
      backdropFilter="blur(14px) saturate(1.04) brightness(1.08)"
      borderBottom="1px solid rgba(119, 108, 83, 0.14)"
      boxShadow="0 10px 24px rgba(56, 48, 31, 0.035)"
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
        <Button
          aria-label={collectionLabel}
          background="#526246"
          borderRadius="999px"
          color="#fffaf0"
          display="inline-flex"
          fontWeight={720}
          gap="8px"
          height={{ base: '36px', md: '38px' }}
          minWidth={{ base: '40px', md: 'auto' }}
          padding={{ base: 0, md: '0 16px' }}
          type="button"
          variant="plain"
          onClick={onCollectionOpen}
          _focusVisible={{ boxShadow: '0 0 0 3px rgba(94, 127, 57, 0.3)', outline: 'none' }}
          _hover={{ background: '#3e513d' }}
        >
          <PlantCollectionIcon size={27} />
          <Box as="span" display={{ base: 'none', lg: 'inline' }}>
            {collectionLabel}
          </Box>
        </Button>
        <HeaderLanguageSwitcher label={text.languageLabel} locale={locale} onLocaleChange={onLocaleChange} />
      </Flex>
    </Flex>
  );
};
