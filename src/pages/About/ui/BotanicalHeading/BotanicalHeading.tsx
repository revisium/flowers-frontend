import { Flex, Image, Text } from '@chakra-ui/react';

interface BotanicalHeadingProps {
  readonly children: React.ReactNode;
  readonly id?: string;
}

export const BotanicalHeading = ({ children, id }: BotanicalHeadingProps) => (
  <Flex alignItems="center" as="h2" color="#34402d" gap="12px" id={id} margin={0}>
    <Image
      alt=""
      aria-hidden="true"
      flex="0 0 auto"
      height={{ base: '32px', md: '38px' }}
      objectFit="contain"
      src="/about/botanical-heading-sprig-v2.webp"
      width="auto"
    />
    <Text
      as="span"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontSize={{ base: '1.65rem', md: '2rem' }}
      fontWeight={400}
      lineHeight={1.1}
    >
      {children}
    </Text>
  </Flex>
);
