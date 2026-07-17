import { Box, Grid, Image, Text } from '@chakra-ui/react';
import type { GloxiniaStoryCopy } from '../../model/gloxiniaStoryData';
import { GloxiniaStoryHeading } from '../GloxiniaStoryHeading/GloxiniaStoryHeading';

interface GloxiniaSharingProps {
  readonly text: GloxiniaStoryCopy;
}

export const GloxiniaSharing = ({ text }: GloxiniaSharingProps) => (
  <Box padding={{ base: '18px', md: '18px 34px 34px', xl: '20px 40px 42px' }}>
    <Grid
      border="1px solid #ded8ca"
      borderRadius="10px"
      columnGap={{ base: '28px', lg: '44px' }}
      gridTemplateColumns={{ base: '1fr', lg: 'minmax(270px, .82fr) minmax(0, 1.58fr)' }}
      overflow="hidden"
      padding={{ base: '26px 20px 20px', md: '24px 22px 22px' }}
      rowGap="28px"
    >
      <Box>
        <GloxiniaStoryHeading>{text.sharingTitle}</GloxiniaStoryHeading>
        <Box color="#444b41" fontSize="0.88rem" fontWeight={450} lineHeight={1.62} marginTop="20px">
          {text.sharingBody.map((paragraph) => <Text key={paragraph} marginTop="14px" _first={{ marginTop: 0 }}>{paragraph}</Text>)}
        </Box>
      </Box>
      <Grid columnGap="24px" gridTemplateColumns={{ base: '1fr', md: 'repeat(3, minmax(0, 1fr))' }} rowGap="12px">
        {text.gallery.map(([src, alt, caption]) => (
          <Box alignSelf="start" as="figure" key={src} margin={0}>
            <Box position="relative">
              <Image
                alt={alt}
                aspectRatio="4 / 5"
                background="#eee9dd"
                borderRadius="8px"
                height="auto"
                objectFit="cover"
                src={src}
                width="100%"
              />
              <Text
                as="figcaption"
                background="rgba(44,55,39,.78)"
                borderRadius="999px"
                bottom="12px"
                color="white"
                fontSize="0.72rem"
                left="12px"
                padding="6px 11px"
                position="absolute"
              >
                {caption}
              </Text>
            </Box>
          </Box>
        ))}
      </Grid>
    </Grid>
  </Box>
);
