import { Box, Grid, Image, Text } from '@chakra-ui/react';
import type { GloxiniaStoryCopy } from '../../model/gloxiniaStoryData';
import { GloxiniaStat } from '../GloxiniaStat/GloxiniaStat';
import { GloxiniaStoryHeading } from '../GloxiniaStoryHeading/GloxiniaStoryHeading';

interface GloxiniaFactsProps {
  readonly text: GloxiniaStoryCopy;
}

export const GloxiniaFacts = ({ text }: GloxiniaFactsProps) => (
  <Grid
    columnGap="36px"
    gridTemplateColumns={{ base: '1fr', lg: '0.93fr 1.07fr' }}
    padding={{ base: '26px 18px 0', md: '30px 34px 0', xl: '32px 40px 0' }}
    rowGap="18px"
  >
    <Box background="#fffdf8" border="1px solid #ded8ca" borderRadius="10px" padding={{ base: '26px 20px', md: '26px 24px' }}>
      <Box borderBottom="1px solid #e8e2d7" paddingBottom="20px">
        <GloxiniaStoryHeading>{text.factsTitle}</GloxiniaStoryHeading>
      </Box>
      <Grid gridTemplateColumns={{ base: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))' }} marginTop="20px">
        {text.stats.map(([value, label], index) => <GloxiniaStat index={index} key={label} label={label} value={value} />)}
      </Grid>
    </Box>
    <Grid
      border="1px solid #ded8ca"
      borderRadius="10px"
      gridTemplateColumns={{ base: '1fr', md: 'minmax(0, 1.1fr) minmax(210px, .9fr)' }}
      overflow="hidden"
    >
      <Box padding={{ base: '26px 20px', md: '26px 24px' }}>
        <GloxiniaStoryHeading>{text.originTitle}</GloxiniaStoryHeading>
        <Box color="#444b41" fontSize="0.88rem" fontWeight={450} lineHeight={1.62} marginTop="20px">
          {text.originBody.map((paragraph) => <Text key={paragraph} marginTop="12px" _first={{ marginTop: 0 }}>{paragraph}</Text>)}
        </Box>
      </Box>
      <Image
        alt={text.originImageAlt}
        alignSelf="center"
        aspectRatio="4 / 3"
        background="#eee9dd"
        height="auto"
        objectFit="cover"
        src="/blog/gloxinia-story/06-first-bloom.webp"
        width="100%"
      />
    </Grid>
  </Grid>
);
