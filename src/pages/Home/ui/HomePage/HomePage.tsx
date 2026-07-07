import { Box } from '@chakra-ui/react';

import { HomeCategoriesSection } from '../HomeCategoriesSection/HomeCategoriesSection';
import { HomeHero } from '../HomeHero/HomeHero';

export function HomePage() {
  return (
    <Box
      as="main"
      background="linear-gradient(180deg, #f7f0e4 0%, #f2eadb 56%, #efe4d2 100%)"
      color="#2d3c2d"
      minHeight="100vh"
      overflow="hidden"
    >
      <HomeHero />
      <HomeCategoriesSection />
    </Box>
  );
}
