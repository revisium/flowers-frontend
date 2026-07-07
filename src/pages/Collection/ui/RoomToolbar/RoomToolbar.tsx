import { Box, Button, Flex, Input } from '@chakra-ui/react';

import type { CollectionCopy, Locale } from '../../model/collectionModel';

interface RoomToolbarProps {
  readonly locale: Locale;
  readonly query: string;
  readonly text: CollectionCopy;
  readonly onLocaleChange: (locale: Locale) => void;
  readonly onQueryChange: (query: string) => void;
}

export function RoomToolbar({
  locale,
  onLocaleChange,
  onQueryChange,
  query,
  text,
}: RoomToolbarProps) {
  return (
    <Flex
      gap="12px"
      position="absolute"
      right={{ base: '12px', md: '22px' }}
      top={{ base: '76px', md: '22px' }}
      zIndex={7}
    >
      <Flex
        as="label"
        alignItems="center"
        backdropFilter="blur(18px)"
        background="rgba(255, 248, 233, 0.82)"
        border="1px solid rgba(255, 248, 233, 0.58)"
        borderRadius="999px"
        boxShadow="0 14px 34px rgba(21, 18, 10, 0.12)"
        color="#46543b"
        gap="10px"
        minHeight="44px"
        padding="0 15px"
        width={{ base: 'min(58vw, 320px)', md: '320px' }}
      >
        <Box
          as="span"
          border="2px solid #5f704a"
          borderRadius="999px"
          height="14px"
          position="relative"
          width="14px"
          _after={{
            background: '#5f704a',
            content: '""',
            height: '7px',
            left: '10px',
            position: 'absolute',
            top: '9px',
            transform: 'rotate(45deg)',
            width: '2px',
          }}
        />
        <Input
          aria-label={text.searchLabel}
          background="transparent"
          border={0}
          color="#46543b"
          fontSize="0.92rem"
          height="42px"
          outline={0}
          padding={0}
          _placeholder={{ color: 'rgba(70, 84, 59, 0.62)' }}
          onChange={(event) => {
            onQueryChange(event.target.value);
          }}
          placeholder={text.searchPlaceholder}
          type="search"
          value={query}
        />
      </Flex>

      <Flex
        aria-label={text.languageLabel}
        background="rgba(255, 248, 233, 0.72)"
        border="1px solid rgba(255, 248, 233, 0.52)"
        borderRadius="999px"
        boxShadow="0 14px 34px rgba(21, 18, 10, 0.1)"
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
          height="36px"
          minWidth="42px"
          onClick={() => {
            onLocaleChange('ru');
          }}
          type="button"
          variant="plain"
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
          height="36px"
          minWidth="42px"
          onClick={() => {
            onLocaleChange('en');
          }}
          type="button"
          variant="plain"
        >
          EN
        </Button>
      </Flex>
    </Flex>
  );
}
