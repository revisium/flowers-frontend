import { Box } from '@chakra-ui/react';

import { HomeCategoriesSection } from '../HomeCategoriesSection/HomeCategoriesSection';
import { HomeHero } from '../HomeHero/HomeHero';

export function HomePage() {
  return (
    <Box minHeight="100%" overflow="hidden">
      <HomeHero />
      <HomeCategoriesSection />
    </Box>
  );
}
