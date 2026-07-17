import { Box, Flex, Grid, Image, Text } from '@chakra-ui/react';
import type { GloxiniaStoryCopy } from '../../model/gloxiniaStoryData';
import { GloxiniaStat } from '../GloxiniaStat/GloxiniaStat';
import { GloxiniaStoryHeading } from '../GloxiniaStoryHeading/GloxiniaStoryHeading';

interface GloxiniaFactsProps {
  readonly text: GloxiniaStoryCopy;
}

export const GloxiniaFacts = ({ text }: GloxiniaFactsProps) => (
  <Grid
    columnGap="18px"
    gridTemplateColumns={{ base: '1fr', lg: 'repeat(2, minmax(0, 1fr))' }}
    padding={{ base: '26px 18px 0', md: '30px 34px 0', xl: '32px 40px 0' }}
    rowGap="18px"
  >
    <Box
      border="1px solid #ded8ca"
      background="#fffdf8"
      borderRadius="10px"
      minHeight={{ lg: '300px' }}
      padding={{ base: '26px 20px', md: '26px 24px' }}
    >
      <Box borderBottom="1px solid #e8e2d7" paddingBottom="20px">
        <GloxiniaStoryHeading>{text.factsTitle}</GloxiniaStoryHeading>
      </Box>
      <Grid
        gridTemplateColumns={{ base: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))' }}
        marginTop={{ base: '20px', lg: '28px' }}
      >
        {text.stats.map(([value, label], index) => (
          <GloxiniaStat index={index} key={label} label={label} value={value} />
        ))}
      </Grid>
    </Box>
    <Flex
      background="#fffdf8"
      border="1px solid #ded8ca"
      borderRadius="10px"
      minHeight={{ lg: '300px' }}
      overflow="hidden"
      position="relative"
      direction={{ base: 'column', md: 'row', lg: 'column' }}
      padding={{ base: '26px 20px 8px', md: '26px 24px 8px', lg: '26px 24px' }}
    >
      <Box position="relative">
        <GloxiniaStoryHeading>{text.originTitle}</GloxiniaStoryHeading>
        <Box
          color="#444b41"
          fontSize={{ base: '0.9rem', md: '0.94rem' }}
          fontWeight={450}
          lineHeight={1.62}
          marginTop="20px"
        >
          {text.originBody.map((paragraph) => (
            <Text key={paragraph} marginTop="8px" _first={{ marginTop: 0 }}>
              {paragraph}
            </Text>
          ))}
        </Box>
      </Box>
      <Image
        alt={text.originImageAlt}
        display="block"
        marginLeft="auto"
        marginTop={{ base: '-2px', lg: 0 }}
        maxHeight={{ lg: '72%' }}
        objectFit="contain"
        objectPosition="right bottom"
        right={{ lg: '-1px' }}
        src="/blog/gloxinia-story/origin-pots.webp"
        bottom={{ lg: 0 }}
        width={{ base: '40%', lg: '39%' }}
      />
    </Flex>
  </Grid>
);
