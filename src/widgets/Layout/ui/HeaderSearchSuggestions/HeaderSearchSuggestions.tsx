import { Button, Flex, Text } from '@chakra-ui/react';

import type { SearchSuggestionView } from '../../model/searchSuggestions';

interface HeaderSearchSuggestionsProps {
  readonly emptyLabel: string;
  readonly suggestions: readonly SearchSuggestionView[];
  readonly onSelect: (suggestion: SearchSuggestionView) => void;
}

export const HeaderSearchSuggestions = ({ emptyLabel, onSelect, suggestions }: HeaderSearchSuggestionsProps) => {
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
            <Text
              as="span"
              lineHeight={1.15}
              overflow="hidden"
              textStyle="bold-md"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              width="100%"
            >
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
