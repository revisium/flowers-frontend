import { Flex } from '@chakra-ui/react';
import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router';

import { useLayoutContext } from 'src/shared/config';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

interface LayoutProps {
  readonly children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { locale, onCollectionOpen, onLocaleChange } = useLayoutContext();
  const { hash, pathname } = useLocation();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer) {
      return;
    }

    const hashTarget = hash ? document.getElementById(hash.slice(1)) : null;

    if (hashTarget) {
      hashTarget.scrollIntoView({ behavior: 'auto', block: 'start' });
      return;
    }

    scrollContainer.scrollTo({ behavior: 'auto', top: 0 });
  }, [hash, pathname]);

  return (
    <Flex
      background="linear-gradient(180deg, #f4edde 0%, #ebe0cd 100%)"
      height="100dvh"
      justify="center"
      overflow="hidden"
      padding="18px"
    >
      <Flex
        ref={scrollContainerRef}
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
          '& > main': {
            flexShrink: 0,
          },
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Header
          locale={locale}
          logoTone="dark"
          onCollectionOpen={onCollectionOpen}
          onLocaleChange={onLocaleChange}
        />
        {children}
        <Footer locale={locale} onCollectionOpen={onCollectionOpen} />
      </Flex>
    </Flex>
  );
};
