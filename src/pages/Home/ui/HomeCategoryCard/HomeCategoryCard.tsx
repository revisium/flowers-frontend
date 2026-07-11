import { Box, Flex, Image, Link, Text } from '@chakra-ui/react';
import type { MouseEvent } from 'react';

import type { HomeCategory } from '../../model/homePageData';

interface HomeCategoryCardProps {
  readonly category: HomeCategory;
  readonly onOpen?: (category: HomeCategory) => void;
}

const imagePanelMask =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath fill='black' d='M0 0H78C88 0 86 15 84 25C81 38 88 44 89 54C90 66 81 72 83 84C85 93 80 100 74 100H0Z'/%3E%3C/svg%3E\")";

export const HomeCategoryCard = ({ category, onOpen }: HomeCategoryCardProps) => {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!onOpen) {
      return;
    }

    event.preventDefault();
    onOpen(category);
  };

  return (
    <Link
      href="/collection"
      width="100%"
      height={{ base: '126px', md: '142px', xl: '156px' }}
      display="grid"
      gridTemplateColumns={{
        base: '86px minmax(0, 1fr)',
        md: '102px minmax(0, 1fr)',
        xl: '112px minmax(0, 1fr)',
      }}
      gap={{ base: '2px', md: '3px', xl: '3px' }}
      alignItems="center"
      background="linear-gradient(135deg, rgba(255, 252, 245, 0.94), rgba(250, 244, 234, 0.82))"
      border="1px solid rgba(126, 104, 69, 0.14)"
      borderRadius="8px"
      boxShadow="0 10px 28px rgba(91, 76, 54, 0.055)"
      overflow="hidden"
      padding={{ base: '8px 10px 8px 8px', md: '8px 14px 8px 8px', xl: '8px 12px 8px 8px' }}
      position="relative"
      scrollSnapAlign={{ base: 'start', xl: 'none' }}
      textDecoration="none"
      transition="border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease"
      onClick={handleClick}

      _active={{ textDecoration: 'none' }}
      _focus={{ textDecoration: 'none' }}
      _hover={{
        borderColor: 'rgba(105, 145, 69, 0.52)',
        boxShadow: '0 14px 34px rgba(91, 76, 54, 0.085)',
        textDecoration: 'none',
        transform: 'translateY(-2px)',
      }}
    >
      <Box
        alignSelf="stretch"
        background="rgba(225, 215, 196, 0.6)"
        borderRadius="7px"
        display="grid"
        minHeight="100%"
        overflow="hidden"
        placeItems="center"
        css={{
          maskImage: imagePanelMask,
          maskRepeat: 'no-repeat',
          maskSize: '100% 100%',
          WebkitMaskImage: imagePanelMask,
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskSize: '100% 100%',
        }}
      >
        <Image
          alt=""
          height="100%"
          objectFit="cover"
          objectPosition="left center"
          src={category.image}
          transform="scale(1.3)"
          transformOrigin="left center"
          width="100%"
        />
      </Box>

      <Box minWidth={0} transform={{ base: 'translateY(-6px)', md: 'translateY(-8px)' }}>
        <Text
          as="strong"
          color="#314034"
          display="block"
          fontSize={{ base: '0.96rem', md: '1rem' }}
          fontWeight={720}
          lineClamp={2}
          lineHeight={1.16}
          marginBottom="6px"
          overflowWrap="normal"
          wordBreak="normal"
        >
          {category.name}
        </Text>
        <Text
          as="span"
          color="#5b655a"
          fontSize={{ base: '0.88rem', md: '0.9rem' }}
          lineHeight="20px"
        >
          {category.count}
        </Text>
      </Box>

      <Flex
        alignItems="center"
        border="1px solid rgba(86, 93, 76, 0.32)"
        borderRadius="999px"
        color="#3c4b38"
        fontSize="20px"
        height={{ base: '32px', md: '36px' }}
        justify="center"
        lineHeight={1}
        bottom={{ base: '14px', md: '18px' }}
        position="absolute"
        right={{ base: '14px', md: '16px' }}
        width={{ base: '32px', md: '36px' }}
      >
        <Box as="span" marginTop="-2px">
          →
        </Box>
      </Flex>
    </Link>
  );
};
