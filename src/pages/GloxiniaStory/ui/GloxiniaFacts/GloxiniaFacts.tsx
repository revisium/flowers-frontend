import { Box, Grid, Image, Text } from '@chakra-ui/react';
import type { GloxiniaStoryCopy } from '../../model/gloxiniaStoryData';
import { GloxiniaStat } from '../GloxiniaStat/GloxiniaStat';
import { GloxiniaStoryHeading } from '../GloxiniaStoryHeading/GloxiniaStoryHeading';

interface GloxiniaFactsProps {
  readonly text: GloxiniaStoryCopy;
}

export const GloxiniaFacts = ({ text }: GloxiniaFactsProps) => (
  <Grid
    gap="18px"
    gridTemplateColumns={{ base: '1fr', xl: '0.93fr 1.07fr' }}
    padding={{ base: '28px 18px 0', md: '34px 34px 0', xl: '38px 48px 0' }}
  >
    <Box border="1px solid #ded8ca" borderRadius="10px" padding={{ base: '28px 20px', md: '30px 26px' }}>
      <GloxiniaStoryHeading>{text.factsTitle}</GloxiniaStoryHeading>
      <Grid gridTemplateColumns={{ base: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))' }} marginTop="34px">
        {text.stats.map(([value, label]) => <GloxiniaStat key={label} label={label} value={value} />)}
      </Grid>
    </Box>
    <Grid
      border="1px solid #ded8ca"
      borderRadius="10px"
      gridTemplateColumns={{ base: '1fr', md: 'minmax(0, 1.15fr) minmax(220px, .85fr)' }}
      overflow="hidden"
    >
      <Box padding={{ base: '28px 20px', md: '30px 28px' }}>
        <GloxiniaStoryHeading>{text.originTitle}</GloxiniaStoryHeading>
        <Box color="#555a51" fontSize="0.78rem" lineHeight={1.6} marginTop="24px">
          {text.originBody.map((paragraph) => <Text key={paragraph} marginTop="9px" _first={{ marginTop: 0 }}>{paragraph}</Text>)}
        </Box>
      </Box>
      <Image
        alt={text.originImageAlt}
        alignSelf="center"
        aspectRatio="4 / 3"
        background="#eee9dd"
        height="auto"
        objectFit="contain"
        src="/gloxinia-story/06-first-bloom.webp"
        width="100%"
      />
    </Grid>
  </Grid>
);
