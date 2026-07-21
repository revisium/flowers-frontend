import { Box, Flex, Image, Text } from '@chakra-ui/react';

export const HoyaClosingBanner = () => {
  return (
    <Box
      marginTop={{ base: '34px', md: '42px' }}
      minHeight={{ base: '74px', md: '88px' }}
      position="relative"
    >
      <Flex
        alignItems="center"
        background="linear-gradient(90deg, #82905b 0%, #9da87a 100%)"
        borderTopRightRadius={{ base: '52px', md: '72px' }}
        color="white"
        direction="column"
        justifyContent="center"
        minHeight={{ base: '74px', md: '88px' }}
        padding={{ base: '10px 54px 10px 16px', md: '11px 118px 11px 36px' }}
        position="relative"
        width={{ base: 'calc(100% - 44px)', md: 'calc(100% - 92px)' }}
        zIndex={1}
      >
        <Flex alignItems="center" gap={{ base: '8px', md: '13px' }} justifyContent="center">
          <Image
            alt=""
            aria-hidden="true"
            filter="brightness(0) invert(1)"
            height={{ base: '27px', md: '38px' }}
            objectFit="contain"
            opacity={0.8}
            src="/about/quote-botanical-sketch.png"
            width={{ base: '24px', md: '34px' }}
          />
          <Text
            fontFamily="'Snell Roundhand', 'Brush Script MT', cursive"
            fontSize={{ base: '1rem', md: '1.45rem', lg: '1.75rem' }}
            lineHeight={1.1}
            textAlign="center"
          >
            Длинные побеги — это не проблема, а возможность!
          </Text>
        </Flex>

        <Flex alignItems="center" gap="13px" justifyContent="center" marginTop="4px">
          <Text
            fontSize={{ base: '0.76rem', md: '0.96rem', lg: '1.05rem' }}
            lineHeight={1.2}
            textAlign="center"
          >
            Творите и наслаждайтесь красотой вашей хойи
          </Text>
          <Text aria-hidden="true" fontSize={{ base: '1rem', md: '1.25rem' }} lineHeight={1}>
            ♥
          </Text>
        </Flex>
      </Flex>

      <Image
        alt=""
        aria-hidden="true"
        bottom={{ base: '-4px', md: '-6px' }}
        height={{ base: '118px', md: '176px' }}
        objectFit="contain"
        objectPosition="bottom right"
        opacity={0.56}
        pointerEvents="none"
        position="absolute"
        right={{ base: '-8px', md: '7px' }}
        src="/about/quote-botanical-sketch.png"
        transform="rotate(7deg)"
        transformOrigin="bottom right"
        zIndex={2}
      />
    </Box>
  );
};
