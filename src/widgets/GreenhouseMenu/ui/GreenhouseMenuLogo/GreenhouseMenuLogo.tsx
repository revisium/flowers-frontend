import { Flex, Image, Link, Text } from '@chakra-ui/react';

interface GreenhouseMenuLogoProps {
  readonly tone: 'dark' | 'light';
}

export function GreenhouseMenuLogo({ tone }: GreenhouseMenuLogoProps) {
  const titleColor = tone === 'dark' ? '#263729' : '#fff8e9';
  const subtitleColor = tone === 'dark' ? 'rgba(91, 76, 54, 0.78)' : 'rgba(255, 248, 233, 0.78)';

  return (
    <Flex alignItems="center" flex="0 0 auto" minWidth={0}>
      <Link
        alignItems="center"
        aria-label="Оранжерея, главная"
        color={titleColor}
        display="inline-flex"
        gap="12px"
        href="/"
        lineHeight={1}
        maxWidth="100%"
        minHeight={{ base: '50px', md: '62px' }}
        textDecoration="none"
        width="fit-content"
        _active={{ textDecoration: 'none' }}
        _focus={{ textDecoration: 'none' }}
        _focusVisible={{ boxShadow: 'none', textDecoration: 'none' }}
        _hover={{ textDecoration: 'none' }}
      >
        <Image
          alt=""
          aria-hidden="true"
          flex="0 0 auto"
          height={{ base: '50px', md: '62px' }}
          objectFit="contain"
          src="/greenhouse-leaf-logo.png"
          width={{ base: '34px', md: '42px' }}
        />
        <Flex direction="column" minWidth={0}>
          <Text
            as="strong"
            display="block"
            letterSpacing={0}
            textDecoration="none"
            textStyle={{ base: 'bold-lg', md: 'bold-xxl' }}
            whiteSpace="nowrap"
          >
            Оранжерея
          </Text>
          <Text as="small" color={subtitleColor} textDecoration="none" textStyle="medium-xs" whiteSpace="nowrap">
            моя коллекция растений
          </Text>
        </Flex>
      </Link>
    </Flex>
  );
}
