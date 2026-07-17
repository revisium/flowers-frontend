import { Box, Flex, Image, Text } from '@chakra-ui/react';
import type { GloxiniaJourneyEntry } from '../../model/gloxiniaStoryData';

interface GloxiniaJourneyStepProps {
  readonly entry: GloxiniaJourneyEntry;
}

export const GloxiniaJourneyStep = ({ entry }: GloxiniaJourneyStepProps) => (
  <Flex direction="column" height="100%">
    <Box
      height={{ lg: '190px', xl: '160px', '2xl': '145px' }}
      minHeight={{ md: '142px', lg: 'unset' }}
      paddingRight={{ md: '6px' }}
    >
      <Text color="#34402f" fontSize="0.82rem" fontWeight={700} lineHeight={1.3}>{entry.date}</Text>
      <Text color="#283126" fontSize="0.94rem" fontWeight={700} lineHeight={1.35} marginTop="8px">{entry.title}</Text>
      <Text color="#50564d" fontSize="0.82rem" fontWeight={450} lineHeight={1.55} marginTop="10px">{entry.description}</Text>
    </Box>
    <Flex alignItems="center" height="24px" marginY="5px" position="relative">
      <Box background="#ded7c8" height="1px" left={0} position="absolute" right={0} />
      <Box
        background="#fbf9f3"
        border="2px solid #cabc9e"
        borderRadius="50%"
        height="9px"
        marginLeft={{ base: '16px', md: '14px' }}
        position="relative"
        width="9px"
      />
    </Flex>
    <Image
      alt={entry.alt}
      aspectRatio="4 / 5"
      background="#eee9dd"
      borderRadius="9px"
      objectFit={entry.fillsFrame ? 'cover' : 'contain'}
      src={entry.image}
      width="100%"
    />
  </Flex>
);
