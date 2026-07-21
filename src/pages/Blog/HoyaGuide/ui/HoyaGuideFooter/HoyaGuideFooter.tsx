import { Box, Grid } from '@chakra-ui/react';

import { HoyaBloomPanel } from '../HoyaBloomPanel/HoyaBloomPanel';
import { HoyaClosingBanner } from '../HoyaClosingBanner/HoyaClosingBanner';
import { HoyaRecommendationsPanel } from '../HoyaRecommendationsPanel/HoyaRecommendationsPanel';

export const HoyaGuideFooter = () => {
  return (
    <Box>
      <Grid
        gap={{ base: '20px', lg: '28px' }}
        gridTemplateColumns={{ base: '1fr', lg: 'minmax(0, .72fr) minmax(0, 1.28fr)' }}
        paddingX={{ base: '18px', md: '30px' }}
      >
        <HoyaRecommendationsPanel />
        <HoyaBloomPanel />
      </Grid>
      <HoyaClosingBanner />
    </Box>
  );
};
