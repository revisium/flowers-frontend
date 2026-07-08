import { Button, Flex } from '@chakra-ui/react';

import type { GreenhouseMenuLocale } from '../GreenhouseMenu/GreenhouseMenu';

interface GreenhouseMenuLanguageSwitcherProps {
  readonly label: string;
  readonly locale: GreenhouseMenuLocale;
  readonly onLocaleChange?: (locale: GreenhouseMenuLocale) => void;
}

export const GreenhouseMenuLanguageSwitcher = ({
  label,
  locale,
  onLocaleChange,
}: GreenhouseMenuLanguageSwitcherProps) => {
  const changeLocale = (nextLocale: GreenhouseMenuLocale) => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = nextLocale;
    }

    onLocaleChange?.(nextLocale);
  };

  return (
    <Flex
      aria-label={label}
      background="rgba(255, 248, 233, 0.42)"
      border="1px solid rgba(255, 248, 233, 0.3)"
      borderRadius="999px"
      boxShadow="0 10px 24px rgba(21, 18, 10, 0.035)"
      flex="0 0 auto"
      gap="4px"
      padding="4px"
      role="group"
    >
      <Button
        aria-pressed={locale === 'ru'}
        background={locale === 'ru' ? '#5e7f39' : 'transparent'}
        borderRadius="999px"
        color={locale === 'ru' ? '#fff8e9' : '#516344'}
        fontSize="0.78rem"
        fontWeight={800}
        height="32px"
        minWidth="42px"
        type="button"
        variant="plain"
        onClick={() => {
          changeLocale('ru');
        }}
      >
        RU
      </Button>
      <Button
        aria-pressed={locale === 'en'}
        background={locale === 'en' ? '#5e7f39' : 'transparent'}
        borderRadius="999px"
        color={locale === 'en' ? '#fff8e9' : '#516344'}
        fontSize="0.78rem"
        fontWeight={800}
        height="32px"
        minWidth="42px"
        type="button"
        variant="plain"
        onClick={() => {
          changeLocale('en');
        }}
      >
        EN
      </Button>
    </Flex>
  );
};
