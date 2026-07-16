import { Flex, Image, Text } from '@chakra-ui/react';

interface GloxiniaStoryHeadingProps {
  readonly children: React.ReactNode;
  readonly id?: string;
}

export const GloxiniaStoryHeading = ({ children, id }: GloxiniaStoryHeadingProps) => (
  <Flex alignItems="center" as="h2" color="#34402d" gap={{ base: '10px', md: '13px' }} id={id} margin={0}>
    <Image
      alt=""
      aria-hidden="true"
      flex="0 0 auto"
      height={{ base: '30px', md: '38px' }}
      objectFit="contain"
      src="/about/botanical-heading-sprig-v2.png"
      width="auto"
    />
    <Text
      as="span"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontSize={{ base: '1.7rem', md: '2.15rem' }}
      fontWeight={400}
      letterSpacing="-0.025em"
      lineHeight={1.08}
    >
      {children}
    </Text>
  </Flex>
);
