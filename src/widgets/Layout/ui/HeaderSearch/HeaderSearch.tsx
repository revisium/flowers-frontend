import { Box, Button } from '@chakra-ui/react';
import { useState } from 'react';
import type { Locale } from 'src/shared/config';

import { createSearchSuggestions, type SearchSuggestionView } from '../../model/searchSuggestions';
import { HeaderSearchField } from '../HeaderSearchField/HeaderSearchField';
import { HeaderSearchIcon } from '../HeaderSearchIcon/HeaderSearchIcon';
import { HeaderSearchSuggestions } from '../HeaderSearchSuggestions/HeaderSearchSuggestions';

interface HeaderSearchProps {
  readonly clearLabel: string;
  readonly emptyLabel: string;
  readonly label: string;
  readonly locale: Locale;
  readonly placeholder: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly onSelect: (query: string, plantId: string) => void;
}

export const HeaderSearch = ({ clearLabel, emptyLabel, label, locale, onChange, onSelect, placeholder, value }: HeaderSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const hasQuery = value.trim().length > 0;
  const suggestions = createSearchSuggestions(value, locale);
  const shouldShowSuggestions = hasQuery && (isFocused || isOpen);

  const selectSuggestion = (suggestion: SearchSuggestionView) => {
    setIsOpen(false);
    setIsFocused(false);
    onSelect(suggestion.label, suggestion.id);
  };

  return (
    <Box position="relative">
      <Button
        aria-expanded={isOpen}
        aria-label={label}
        background="rgba(255, 248, 233, 0.46)"
        border="1px solid rgba(255, 248, 233, 0.32)"
        borderRadius="999px"
        color="#46543b"
        display={{ base: 'inline-flex', md: 'none' }}
        height="40px"
        minWidth="40px"
        padding={0}
        type="button"
        variant="plain"
        onClick={() => {
          setIsOpen((current) => !current);
        }}
      >
        <HeaderSearchIcon />
      </Button>

      <HeaderSearchField
        label={label}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        display={{ base: isOpen ? 'flex' : 'none', md: 'none' }}
        position="absolute"
        right={0}
        top="calc(100% + 10px)"
        width={{ base: 'min(78vw, 360px)', sm: '360px' }}
        onClear={() => {
          onChange('');
        }}
        clearLabel={clearLabel}
        onBlur={() => {
          window.setTimeout(() => {
            setIsFocused(false);
          }, 120);
        }}
        onFocus={() => {
          setIsFocused(true);
        }}
      />

      <HeaderSearchField
        label={label}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        display={{ base: 'none', md: 'flex' }}
        position="static"
        width={{ md: '220px', xl: '260px' }}
        onClear={() => {
          onChange('');
        }}
        clearLabel={clearLabel}
        onBlur={() => {
          window.setTimeout(() => {
            setIsFocused(false);
          }, 120);
        }}
        onFocus={() => {
          setIsFocused(true);
        }}
      />

      {shouldShowSuggestions ? (
        <HeaderSearchSuggestions
          emptyLabel={emptyLabel}
          suggestions={suggestions}
          onSelect={selectSuggestion}
        />
      ) : null}
    </Box>
  );
};
