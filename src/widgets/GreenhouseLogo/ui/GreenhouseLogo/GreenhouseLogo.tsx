import { Flex, Image, Link, Text } from '@chakra-ui/react';

interface GreenhouseLogoProps {
  readonly href?: string;
  readonly tone?: 'dark' | 'light';
}

export function GreenhouseLogo({ href = '/', tone = 'light' }: GreenhouseLogoProps) {
  const titleColor = tone === 'dark' ? '#263729' : '#fff8e9';
  const subtitleColor = tone === 'dark' ? 'rgba(91, 76, 54, 0.78)' : 'rgba(255, 248, 233, 0.78)';

  return (
    <Link
      alignItems="center"
      aria-label="Оранжерея, главная"
      color={titleColor}
      display="inline-flex"
      gap="12px"
      href={href}
      lineHeight={1}
      maxWidth="100%"
      minHeight={{ base: '50px', md: '62px' }}
      width="fit-content"
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
          textStyle={{ base: 'bold-lg', md: 'bold-xxl' }}
          whiteSpace="nowrap"
        >
          Оранжерея
        </Text>
        <Text as="small" color={subtitleColor} textStyle="medium-xs" whiteSpace="nowrap">
          моя коллекция растений
        </Text>
      </Flex>
    </Link>
  );
}
