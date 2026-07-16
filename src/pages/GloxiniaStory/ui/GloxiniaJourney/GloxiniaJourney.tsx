import { Box, Grid } from '@chakra-ui/react';
import type { GloxiniaStoryCopy } from '../../model/gloxiniaStoryData';
import { GloxiniaJourneyStep } from '../GloxiniaJourneyStep/GloxiniaJourneyStep';
import { GloxiniaStoryHeading } from '../GloxiniaStoryHeading/GloxiniaStoryHeading';

interface GloxiniaJourneyProps {
  readonly text: GloxiniaStoryCopy;
}

export const GloxiniaJourney = ({ text }: GloxiniaJourneyProps) => (
  <Box padding={{ base: '54px 18px 26px', md: '68px 34px 34px', xl: '72px 48px 38px' }}>
    <GloxiniaStoryHeading id="gloxinia-journey">{text.journeyTitle}</GloxiniaStoryHeading>
    <Grid
      aria-labelledby="gloxinia-journey"
      gap={{ base: '38px 16px', md: '30px 14px', xl: '20px' }}
      gridTemplateColumns={{ base: '1fr', md: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))', xl: 'repeat(6, minmax(0, 1fr))' }}
      marginTop={{ base: '38px', md: '44px' }}
    >
      {text.journey.map((entry) => <GloxiniaJourneyStep entry={entry} key={entry.title} />)}
    </Grid>
  </Box>
);
