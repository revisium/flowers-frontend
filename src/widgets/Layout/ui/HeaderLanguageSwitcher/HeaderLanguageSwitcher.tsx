import { Button, Flex } from '@chakra-ui/react';
import type { Locale } from 'src/shared/config';

interface HeaderLanguageSwitcherProps {
  readonly label: string;
  readonly locale: Locale;
  readonly onLocaleChange: (locale: Locale) => void;
}

export const HeaderLanguageSwitcher = ({ label, locale, onLocaleChange }: HeaderLanguageSwitcherProps) => {
  return (
    <Flex
      aria-label={label}
      background="rgba(255, 248, 233, 0.42)"
      border="1px solid rgba(255, 248, 233, 0.3)"
      borderRadius="999px"
      boxShadow="0 10px 24px rgba(21, 18, 10, 0.035)"
      flex="0 0 auto"
      gap={{ base: '1px', md: '2px', xl: '3px' }}
      padding={{ base: '2px', xl: '3px' }}
      role="group"
    >
      <Button
        aria-pressed={locale === 'ru'}
        background={locale === 'ru' ? '#5e7f39' : 'transparent'}
        borderRadius="999px"
        color={locale === 'ru' ? '#fff8e9' : '#516344'}
        fontSize={{ base: '0.68rem', md: '0.72rem', xl: '0.74rem' }}
        fontWeight={800}
        height={{ base: '30px', md: '32px' }}
        minWidth={{ base: '30px', md: '32px' }}
        padding={0}
        width={{ base: '30px', md: '32px' }}
        type="button"
        variant="plain"
        onClick={() => {
          onLocaleChange('ru');
        }}
      >
        RU
      </Button>
      <Button
        aria-pressed={locale === 'en'}
        background={locale === 'en' ? '#5e7f39' : 'transparent'}
        borderRadius="999px"
        color={locale === 'en' ? '#fff8e9' : '#516344'}
        fontSize={{ base: '0.68rem', md: '0.72rem', xl: '0.74rem' }}
        fontWeight={800}
        height={{ base: '30px', md: '32px' }}
        minWidth={{ base: '30px', md: '32px' }}
        padding={0}
        width={{ base: '30px', md: '32px' }}
        type="button"
        variant="plain"
        onClick={() => {
          onLocaleChange('en');
        }}
      >
        EN
      </Button>
    </Flex>
  );
};
