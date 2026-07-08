import { Button, Flex } from '@chakra-ui/react';
import type { Locale } from 'src/shared/config';

interface HeaderLanguageSwitcherProps {
  readonly label: string;
  readonly locale: Locale;
  readonly onLocaleChange: (locale: Locale) => void;
}

const languageOptions = [
  { label: 'RU', locale: 'ru' },
  { label: 'EN', locale: 'en' },
] satisfies readonly { readonly label: string; readonly locale: Locale }[];

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
      {languageOptions.map((option) => {
        const isActive = locale === option.locale;

        return (
          <Button
            aria-pressed={isActive}
            background={isActive ? '#5e7f39' : 'transparent'}
            borderRadius="999px"
            color={isActive ? '#fff8e9' : '#516344'}
            fontSize={{ base: '0.68rem', md: '0.72rem', xl: '0.74rem' }}
            fontWeight={800}
            height={{ base: '30px', md: '32px' }}
            key={option.locale}
            minWidth={{ base: '30px', md: '32px' }}
            padding={0}
            type="button"
            variant="plain"
            width={{ base: '30px', md: '32px' }}
            onClick={() => {
              onLocaleChange(option.locale);
            }}
          >
            {option.label}
          </Button>
        );
      })}
    </Flex>
  );
};
