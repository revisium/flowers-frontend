import { Box } from '@chakra-ui/react';
import { Layout } from 'src/widgets/Layout';

import { HomeCategoriesSection } from '../HomeCategoriesSection/HomeCategoriesSection';
import { HomeHero } from '../HomeHero/HomeHero';

export const HomePage = () => {
  return (
    <Layout>
      <Box as="main" color="#2d3c2d" minHeight="100%">
        <HomeHero />
        <HomeCategoriesSection />
      </Box>
    </Layout>
  );
};
