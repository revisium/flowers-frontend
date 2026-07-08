import { Flex } from '@chakra-ui/react';

import { useLayoutContext } from '../../model/layoutContext';
import { Header } from '../Header/Header';

interface LayoutProps {
  readonly children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { locale, onLocaleChange, onQueryChange, onSearchSuggestionSelect, query } = useLayoutContext();

  return (
    <Flex
      background="linear-gradient(180deg, #f4edde 0%, #ebe0cd 100%)"
      height="100dvh"
      justify="center"
      padding="18px"
    >
      <Flex
        background="#f2eadb"
        borderRadius="20px"
        boxShadow="0 24px 80px rgba(52, 43, 28, 0.16)"
        direction="column"
        h="100%"
        maxWidth="1920px"
        overflow="auto"
        position="relative"
        w="100%"
        css={{
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Header
          locale={locale}
          onLocaleChange={onLocaleChange}
          onQueryChange={onQueryChange}
          onSearchSuggestionSelect={onSearchSuggestionSelect}
          query={query}
        />
        {children}
      </Flex>
    </Flex>
  );
};
