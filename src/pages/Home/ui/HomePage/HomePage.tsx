import { Box } from '@chakra-ui/react';
import { Layout } from 'src/widgets/Layout';

import { HomeCategoriesSection } from '../HomeCategoriesSection/HomeCategoriesSection';
import { HomeHero } from '../HomeHero/HomeHero';

export const HomePage = () => {
  return (
    <Layout>
      <Box minHeight="100%" overflow="hidden">
        <HomeHero />
        <HomeCategoriesSection />
      </Box>
    </Layout>
  );
};
