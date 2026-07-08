import { Flex } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router';

import { useLayoutContext } from '../../model/layoutContext';
import { Header } from '../Header/Header';

interface LayoutProps {
  readonly children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { locale, onLocaleChange, onQueryChange, onSearchSuggestionSelect, query } = useLayoutContext();
  const location = useLocation();
  const navigate = useNavigate();
  const logoTone = location.pathname.startsWith('/collection') ? 'light' : 'dark';

  const selectSearchSuggestion = (nextQuery: string, plantId: string) => {
    onSearchSuggestionSelect(nextQuery, plantId);

    if (!location.pathname.startsWith('/collection')) {
      void navigate('/collection', {
        state: {
          searchPlantId: plantId,
        },
      });
    }
  };

  return (
    <Flex
      background="linear-gradient(180deg, #f4edde 0%, #ebe0cd 100%)"
      height="100dvh"
      justify="center"
      overflow="hidden"
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
          logoTone={logoTone}
          onLocaleChange={onLocaleChange}
          onQueryChange={onQueryChange}
          onSearchSuggestionSelect={selectSearchSuggestion}
          query={query}
        />
        {children}
      </Flex>
    </Flex>
  );
};
