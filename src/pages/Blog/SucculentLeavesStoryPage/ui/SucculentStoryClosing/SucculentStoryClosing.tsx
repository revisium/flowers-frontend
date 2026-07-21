import { Box, Flex, Text } from '@chakra-ui/react';
import type { SucculentLeavesStoryCopy } from '../../model/succulentLeavesStoryData';

interface SucculentStoryClosingProps {
  readonly text: SucculentLeavesStoryCopy;
}

export const SucculentStoryClosing = ({ text }: SucculentStoryClosingProps) => (
  <Box padding={{ base: '0 18px 24px', md: '0 34px 36px', xl: '0 42px 44px' }}>
    <Flex
      alignItems="center"
      backgroundImage="linear-gradient(90deg, rgba(39,49,35,.8), rgba(39,49,35,.22) 65%, rgba(39,49,35,.12)), url('/blog/succulent-leaves-story/closing.webp')"
      backgroundPosition="center"
      backgroundSize="cover"
      borderRadius="12px"
      minHeight={{ base: '390px', md: '360px', xl: '430px' }}
      overflow="hidden"
      padding={{ base: '36px 26px', md: '56px' }}
    >
      <Flex alignItems="flex-start" color="#fffdf7" direction="column" maxWidth="510px">
        <Text fontSize="0.7rem" fontWeight={700} letterSpacing="0.13em" textTransform="uppercase">
          {text.closingEyebrow}
        </Text>
        <Text
          as="h2"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize={{ base: '2.15rem', md: '3rem' }}
          fontWeight={400}
          letterSpacing="-0.035em"
          lineHeight={1.06}
          marginTop="13px"
        >
          {text.nextTitle}
        </Text>
        <Flex direction="column" fontSize="0.9rem" gap="12px" lineHeight={1.62} marginTop="21px">
          {text.nextBody.map((paragraph) => (
            <Text key={paragraph}>{paragraph}</Text>
          ))}
        </Flex>
        <Text
          borderTop="1px solid rgba(255,255,255,.45)"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="1rem"
          fontStyle="italic"
          lineHeight={1.5}
          marginTop="24px"
          paddingTop="18px"
        >
          {text.closing}
        </Text>
      </Flex>
    </Flex>
  </Box>
);
