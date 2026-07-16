import { Box, Flex, Image, Text } from '@chakra-ui/react';
import type { GloxiniaJourneyEntry } from '../../model/gloxiniaStoryData';

interface GloxiniaJourneyStepProps {
  readonly entry: GloxiniaJourneyEntry;
}

export const GloxiniaJourneyStep = ({ entry }: GloxiniaJourneyStepProps) => (
  <Flex direction="column" height="100%">
    <Box minHeight={{ md: '152px', xl: '138px' }} paddingRight={{ md: '8px' }}>
      <Text color="#3f473a" fontSize="0.76rem" fontWeight={700} lineHeight={1.25}>{entry.date}</Text>
      <Text color="#30372e" fontSize="0.9rem" fontWeight={600} lineHeight={1.3} marginTop="8px">{entry.title}</Text>
      <Text color="#66695f" fontSize="0.78rem" lineHeight={1.55} marginTop="9px">{entry.description}</Text>
    </Box>
    <Flex alignItems="center" height="28px" marginY="7px" position="relative">
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
