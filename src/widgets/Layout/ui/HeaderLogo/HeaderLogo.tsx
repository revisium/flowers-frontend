import { Flex, Image, Link, Text } from '@chakra-ui/react';

interface HeaderLogoProps {
  readonly homeLabel: string;
  readonly subtitle: string;
  readonly title: string;
  readonly tone: 'dark' | 'light';
}

export const HeaderLogo = ({ homeLabel, subtitle, title, tone }: HeaderLogoProps) => {
  const titleColor = tone === 'dark' ? '#263729' : '#fff8e9';
  const subtitleColor = tone === 'dark' ? 'rgba(91, 76, 54, 0.78)' : 'rgba(255, 248, 233, 0.78)';
  const focusColor = tone === 'dark' ? 'rgba(94, 127, 57, 0.62)' : 'rgba(255, 248, 233, 0.72)';

  return (
    <Flex
      alignItems="center"
      flex={{ base: '1 1 auto', md: '0 0 304px' }}
      minWidth={0}
      width={{ base: 'auto', md: '304px' }}
    >
      <Link
        alignItems="center"
        aria-label={homeLabel}
        color={titleColor}
        display="inline-flex"
        gap={{ base: '7px', md: '10px' }}
        href="/"
        lineHeight={1}
        maxWidth="100%"
        minHeight={{ base: '44px', md: '52px' }}
        textDecoration="none"
        width="100%"
        _active={{ textDecoration: 'none' }}
        _focus={{ textDecoration: 'none' }}
        _focusVisible={{
          borderRadius: '12px',
          boxShadow: `0 0 0 3px ${focusColor}`,
          outline: 'none',
          textDecoration: 'none',
        }}
        _hover={{ textDecoration: 'none' }}
      >
        <Image
          alt=""
          aria-hidden="true"
          flex="0 0 auto"
          height={{ base: '38px', md: '54px' }}
          objectFit="contain"
          opacity={0.78}
          src="/greenhouse-logo-mark.png"
          width={{ base: '30px', md: '43px' }}
        />
        <Flex
          direction="column"
          flex="1 1 auto"
          minWidth={0}
          overflow="hidden"
          width={{ base: 'auto', md: '232px' }}
        >
          <Text
            as="strong"
            display="block"
            fontSize={{ base: '0.95rem', md: '1.45rem' }}
            fontWeight={500}
            letterSpacing="0.015em"
            lineHeight={1.05}
            overflow="hidden"
            textDecoration="none"
            textOverflow="ellipsis"
            textTransform="uppercase"
            whiteSpace="nowrap"
          >
            {title}
          </Text>
          <Text
            as="small"
            color={subtitleColor}
            fontSize={{ base: '0.55rem', md: '0.68rem' }}
            fontWeight={600}
            letterSpacing="0.045em"
            lineHeight={1.25}
            marginTop={{ base: '3px', md: '5px' }}
            overflow="hidden"
            textDecoration="none"
            textOverflow="ellipsis"
            textTransform="uppercase"
            whiteSpace="nowrap"
          >
            {subtitle}
          </Text>
        </Flex>
      </Link>
    </Flex>
  );
};
