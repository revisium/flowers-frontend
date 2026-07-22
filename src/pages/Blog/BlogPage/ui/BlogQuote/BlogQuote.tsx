import { Box, Flex, Image, Text } from '@chakra-ui/react';
import type { BlogCopy } from '../../model/blogPageData';

interface BlogQuoteProps {
  readonly text: BlogCopy;
}

export const BlogQuote = ({ text }: BlogQuoteProps) => (
  <Flex
    alignItems="center"
    as="section"
    background="linear-gradient(90deg, #edf0e3 0%, #f4f1e6 52%, #f0eee3 100%)"
    borderRadius="10px"
    justifyContent="center"
    margin={{ base: '0 18px 18px', md: '0 34px 34px', xl: '0 42px 42px' }}
    minHeight={{ base: '250px', md: '205px' }}
    overflow="hidden"
    padding={{ base: '42px 28px', md: '34px 140px' }}
    position="relative"
  >
    <Image
      alt=""
      aria-hidden="true"
      bottom={{ base: '-94px', md: '-112px' }}
      height={{ base: '250px', md: '300px' }}
      left={{ base: '-38px', md: '28px' }}
      opacity={0.62}
      position="absolute"
      src="/about/quote-botanical-sketch.webp"
    />
    <Box maxWidth="720px" position="relative" textAlign="center" zIndex={1}>
      <Text
        color="#43503d"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize={{ base: '1.16rem', md: '1.42rem' }}
        lineHeight={1.45}
      >
        {text.quote}
      </Text>
      <Box height="30px" margin="16px auto 0" overflow="hidden" width="134px">
        <Image
          alt={text.signatureAlt}
          height="30px"
          maxWidth="none"
          objectFit="contain"
          opacity={0.58}
          src="/about/anastasia-signature-v2.webp"
          transform="translateX(-23px)"
          width="154px"
        />
      </Box>
    </Box>
    <Text
      aria-hidden="true"
      color="#7f8877"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontSize={{ base: '1.8rem', md: '2rem' }}
      pointerEvents="none"
      position="absolute"
      right={{ base: '18px', md: '56px', xl: '72px' }}
      top={{ base: '8px', md: '50%' }}
      transform={{ md: 'translateY(-50%)' }}
    >
      ♡
    </Text>
  </Flex>
);
