import { Box } from '@chakra-ui/react';

import { HomeCategoriesSection } from '../HomeCategoriesSection/HomeCategoriesSection';
import { HomeHero } from '../HomeHero/HomeHero';

export function HomePage() {
  return (
    <Box overflow="hidden">
      <HomeHero />
      <HomeCategoriesSection />
    </Box>
  );
}
