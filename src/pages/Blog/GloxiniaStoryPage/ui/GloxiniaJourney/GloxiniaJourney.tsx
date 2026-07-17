import { Box, Grid } from '@chakra-ui/react';
import type { GloxiniaStoryCopy } from '../../model/gloxiniaStoryData';
import { GloxiniaJourneyStep } from '../GloxiniaJourneyStep/GloxiniaJourneyStep';
import { GloxiniaStoryHeading } from '../GloxiniaStoryHeading/GloxiniaStoryHeading';

interface GloxiniaJourneyProps {
  readonly text: GloxiniaStoryCopy;
}

export const GloxiniaJourney = ({ text }: GloxiniaJourneyProps) => (
  <Box padding={{ base: '48px 18px 24px', md: '46px 34px 30px', xl: '48px 40px 34px' }}>
    <GloxiniaStoryHeading id="gloxinia-journey">{text.journeyTitle}</GloxiniaStoryHeading>
    <Grid
      aria-labelledby="gloxinia-journey"
      columnGap={{ base: '28px', lg: '30px' }}
      gridTemplateColumns={{
        base: '1fr',
        md: 'repeat(3, minmax(0, 1fr))',
        lg: 'repeat(6, minmax(0, 1fr))',
      }}
      marginTop={{ base: '34px', md: '36px' }}
      rowGap={{ base: '36px', md: '52px', lg: '15px' }}
    >
      {text.journey.map((entry) => (
        <GloxiniaJourneyStep entry={entry} key={entry.title} />
      ))}
    </Grid>
  </Box>
);
