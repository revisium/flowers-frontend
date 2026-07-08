import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import type { Locale } from 'src/shared/config';

import { createSearchSuggestions, type SearchSuggestionView } from '../../model/searchSuggestions';

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
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const hasQuery = value.trim().length > 0;
  const suggestions = createSearchSuggestions(value, locale);
  const shouldShowSuggestions = hasQuery && (isFocused || isOpen);

  const selectSuggestion = (suggestion: SearchSuggestionView) => {
    setIsOpen(false);
    setIsFocused(false);
    onSelect(suggestion.label, suggestion.id);

    if (!location.pathname.startsWith('/collection')) {
      void navigate('/collection');
    }
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
        <SearchIcon />
      </Button>

      <SearchField
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

      <SearchField
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
        <SearchSuggestions
          emptyLabel={emptyLabel}
          suggestions={suggestions}
          onSelect={selectSuggestion}
        />
      ) : null}
    </Box>
  );
};

interface SearchFieldProps {
  readonly clearLabel: string;
  readonly display: Record<string, string>;
  readonly label: string;
  readonly placeholder: string;
  readonly position: 'absolute' | 'static';
  readonly value: string;
  readonly width: string | Record<string, string>;
  readonly right?: number;
  readonly top?: string;
  readonly onBlur: () => void;
  readonly onChange: (value: string) => void;
  readonly onClear: () => void;
  readonly onFocus: () => void;
}

const SearchField = ({ clearLabel, display, label, onBlur, onChange, onClear, onFocus, placeholder, position, right, top, value, width }: SearchFieldProps) => {
  const hasValue = value.trim().length > 0;

  return (
    <Flex
      as="label"
      alignItems="center"
      background="rgba(255, 248, 233, 0.46)"
      border="1px solid rgba(255, 248, 233, 0.32)"
      borderRadius="999px"
      boxShadow="0 10px 24px rgba(21, 18, 10, 0.035)"
      color="#46543b"
      display={display}
      gap="10px"
      minHeight="40px"
      padding="0 15px"
      position={position}
      right={right}
      top={top}
      transition="box-shadow 160ms ease, border-color 160ms ease"
      width={width}
      zIndex={30}
      _focusWithin={{
        borderColor: 'rgba(94, 127, 57, 0.38)',
        boxShadow: '0 0 0 3px rgba(94, 127, 57, 0.24), 0 10px 24px rgba(21, 18, 10, 0.035)',
      }}
    >
      <SearchIcon />
      <Input
        aria-label={label}
        background="transparent"
        border={0}
        color="#46543b"
        height="38px"
        outline={0}
        padding={0}
        placeholder={placeholder}
        type="search"
        value={value}
        _focusVisible={{ outline: 'none' }}
        _placeholder={{ color: 'rgba(70, 84, 59, 0.58)' }}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {hasValue ? (
        <Button
          aria-label={clearLabel}
          border="1px solid currentColor"
          borderRadius="999px"
          color="rgba(70, 84, 59, 0.62)"
          flex="0 0 auto"
          height="20px"
          minWidth="20px"
          padding={0}
          type="button"
          variant="plain"
          width="20px"
          onClick={onClear}
        >
          <Box as="span" fontSize="15px" lineHeight="18px">
            ×
          </Box>
        </Button>
      ) : null}
    </Flex>
  );
};

interface SearchSuggestionsProps {
  readonly emptyLabel: string;
  readonly suggestions: readonly SearchSuggestionView[];
  readonly onSelect: (suggestion: SearchSuggestionView) => void;
}

const SearchSuggestions = ({ emptyLabel, onSelect, suggestions }: SearchSuggestionsProps) => {
  return (
    <Flex
      background="rgba(255, 252, 246, 0.95)"
      border="1px solid rgba(126, 104, 69, 0.18)"
      borderRadius="14px"
      boxShadow="0 18px 42px rgba(38, 30, 16, 0.14)"
      direction="column"
      gap="2px"
      padding="6px"
      position="absolute"
      right={0}
      top={{ base: 'calc(100% + 58px)', md: 'calc(100% + 8px)' }}
      width={{ base: 'min(78vw, 360px)', sm: '360px', md: '220px', xl: '260px' }}
      zIndex={40}
    >
      {suggestions.length > 0 ? (
        suggestions.map((suggestion) => (
          <Button
            alignItems="center"
            borderRadius="10px"
            color="#2d3c2d"
            height="auto"
            justifyContent="flex-start"
            key={suggestion.id}
            minHeight="36px"
            padding="7px 10px"
            textAlign="left"
            type="button"
            variant="plain"
            width="100%"
            _hover={{ background: 'rgba(94, 127, 57, 0.1)' }}
            onClick={(event) => {
              if (event.detail === 0) {
                onSelect(suggestion);
              }
            }}
            onPointerDown={(event) => {
              event.preventDefault();
              onSelect(suggestion);
            }}
          >
            <Text as="span" fontWeight={760} lineHeight={1.15} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" width="100%">
              {suggestion.label}
            </Text>
          </Button>
        ))
      ) : (
        <Text color="#706b5d" fontSize="0.88rem" padding="10px 12px">
          {emptyLabel}
        </Text>
      )}
    </Flex>
  );
};

const SearchIcon = () => {
  return (
    <Box
      aria-hidden="true"
      border="2px solid currentColor"
      borderRadius="999px"
      flex="0 0 auto"
      height="12px"
      position="relative"
      width="12px"
      _after={{
        background: 'currentColor',
        content: '""',
        height: '7px',
        left: '9px',
        position: 'absolute',
        top: '8px',
        transform: 'rotate(45deg)',
        width: '2px',
      }}
    />
  );
};
