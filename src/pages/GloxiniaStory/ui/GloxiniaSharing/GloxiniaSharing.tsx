import { Box, Grid, Image, Text } from '@chakra-ui/react';
import type { GloxiniaStoryCopy } from '../../model/gloxiniaStoryData';
import { GloxiniaStoryHeading } from '../GloxiniaStoryHeading/GloxiniaStoryHeading';

interface GloxiniaSharingProps {
  readonly text: GloxiniaStoryCopy;
}

export const GloxiniaSharing = ({ text }: GloxiniaSharingProps) => (
  <Box padding={{ base: '18px', md: '20px 34px 34px', xl: '22px 48px 46px' }}>
    <Grid
      border="1px solid #ded8ca"
      borderRadius="10px"
      gap={{ base: '30px', lg: '26px' }}
      gridTemplateColumns={{ base: '1fr', xl: 'minmax(320px, .82fr) minmax(0, 1.58fr)' }}
      overflow="hidden"
      padding={{ base: '28px 20px 20px', md: '32px 28px 28px' }}
    >
      <Box>
        <GloxiniaStoryHeading>{text.sharingTitle}</GloxiniaStoryHeading>
        <Box color="#555a51" fontSize="0.81rem" lineHeight={1.62} marginTop="24px">
          {text.sharingBody.map((paragraph) => <Text key={paragraph} marginTop="12px" _first={{ marginTop: 0 }}>{paragraph}</Text>)}
        </Box>
        <Text
          color="#66715b"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize={{ base: '1.08rem', md: '1.15rem' }}
          fontStyle="italic"
          lineHeight={1.45}
          marginTop="25px"
        >
          «{text.quote}»
        </Text>
      </Box>
      <Grid gap="12px" gridTemplateColumns="repeat(auto-fit, minmax(min(220px, 100%), 1fr))">
        {text.gallery.map(([src, alt, caption]) => (
          <Box alignSelf="start" as="figure" key={src} margin={0}>
            <Box position="relative">
              <Image
                alt={alt}
                aspectRatio="4 / 3"
                background="#eee9dd"
                borderRadius="8px"
                height="auto"
                objectFit="contain"
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
