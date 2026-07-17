import { Box, Grid, Image, Text } from '@chakra-ui/react';
import type { GloxiniaStoryCopy } from '../../model/gloxiniaStoryData';
import { GloxiniaStoryHeading } from '../GloxiniaStoryHeading/GloxiniaStoryHeading';

interface GloxiniaSharingProps {
  readonly text: GloxiniaStoryCopy;
}

export const GloxiniaSharing = ({ text }: GloxiniaSharingProps) => (
  <Box padding={{ base: '18px', md: '18px 34px 34px', lg: '34px', xl: '40px 40px 42px' }}>
    <Grid
      border="1px solid #ded8ca"
      borderRadius="10px"
      columnGap={{ base: '28px', lg: '44px' }}
      gridTemplateColumns={{ base: '1fr', lg: 'minmax(360px, 1.28fr) minmax(0, 1fr)' }}
      overflow="hidden"
      padding={{ base: '26px 20px 20px', md: '24px 22px 22px' }}
      rowGap="28px"
    >
      <Box>
        <GloxiniaStoryHeading>{text.sharingTitle}</GloxiniaStoryHeading>
        <Box color="#444b41" fontSize="0.88rem" fontWeight={450} lineHeight={1.62} marginTop="20px">
          {text.sharingBody.map((paragraph) => (
            <Text key={paragraph} marginTop="14px" _first={{ marginTop: 0 }}>
              {paragraph}
            </Text>
          ))}
        </Box>
      </Box>
      <Grid
        alignContent="start"
        columnGap={{ base: '12px', md: '16px', xl: '20px' }}
        gridTemplateColumns={{ base: 'repeat(2, minmax(0, 1fr))', md: 'repeat(3, minmax(0, 1fr))' }}
        rowGap={{ base: '12px', md: '16px', xl: '20px' }}
      >
        {text.gallery.map(([src, alt]) => (
          <Box alignSelf="start" as="figure" key={src} margin={0}>
            <Image
              alt={alt}
              aspectRatio="1 / 1"
              background="#eee9dd"
              borderRadius="8px"
              height="auto"
              objectFit="cover"
              src={src}
              width="100%"
            />
          </Box>
        ))}
      </Grid>
    </Grid>
  </Box>
);
