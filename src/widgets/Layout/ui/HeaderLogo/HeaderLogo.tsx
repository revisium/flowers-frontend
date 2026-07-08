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
    <Flex alignItems="center" flex={{ base: '0 0 220px', md: '0 0 304px' }} minWidth={0} width={{ base: '220px', md: '304px' }}>
      <Link
        alignItems="center"
        aria-label={homeLabel}
        color={titleColor}
        display="inline-flex"
        gap="12px"
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
        <Image alt="" aria-hidden="true" flex="0 0 auto" height={{ base: '44px', md: '52px' }} objectFit="contain" src="/greenhouse-leaf-logo.png" width={{ base: '30px', md: '36px' }} />
        <Flex direction="column" flex="0 0 auto" minWidth={0} overflow="hidden" width={{ base: '166px', md: '232px' }}>
          <Text as="strong" display="block" letterSpacing={0} overflow="hidden" textDecoration="none" textOverflow="ellipsis" textStyle={{ base: 'bold-md', md: 'bold-xl' }} whiteSpace="nowrap">
            {title}
          </Text>
          <Text as="small" color={subtitleColor} overflow="hidden" textDecoration="none" textOverflow="ellipsis" textStyle="medium-xs" whiteSpace="nowrap">
            {subtitle}
          </Text>
        </Flex>
      </Link>
    </Flex>
  );
};
