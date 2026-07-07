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
    <Flex className="room-tools">
      <Flex as="label" className="room-search">
        <Box as="span" className="room-search__icon" />
        <Input
          aria-label={text.searchLabel}
          onChange={(event) => {
            onQueryChange(event.target.value);
          }}
          placeholder={text.searchPlaceholder}
          type="search"
          value={query}
        />
      </Flex>

      <Flex className="language-switch" aria-label={text.languageLabel} role="group">
        <Button
          aria-pressed={locale === 'ru'}
          className={
            locale === 'ru'
              ? 'language-switch__item language-switch__item--active'
              : 'language-switch__item'
          }
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
          className={
            locale === 'en'
              ? 'language-switch__item language-switch__item--active'
              : 'language-switch__item'
          }
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
