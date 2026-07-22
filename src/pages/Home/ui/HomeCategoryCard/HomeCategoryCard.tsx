import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';

import type { HomeCategory } from '../../model/homePageData';
import type { CategoryDetailData } from '../CategoryDetailModal/types';

interface HomeCategoryCardProps {
  readonly category: HomeCategory;
  readonly detail: Pick<CategoryDetailData, 'description' | 'latinName'>;
  readonly onOpen: (category: HomeCategory) => void;
}

export const HomeCategoryCard = ({ category, detail, onOpen }: HomeCategoryCardProps) => {
  const hasLongName = category.name.length > 12;

  const handleClick = () => {
    onOpen(category);
  };

  return (
    <Button
      aria-label={category.name}
      width="100%"
      aspectRatio={{ md: '1.25' }}
      height={{ base: '370px', md: 'auto' }}
      display="grid"
      gridTemplateColumns="50% minmax(0, 1fr)"
      alignItems="stretch"
      background="linear-gradient(135deg, #fffdf8 0%, #fbf7ee 100%)"
      border="1px solid rgba(151, 175, 126, 0.7)"
      borderRadius={{ base: '18px', md: '22px' }}
      boxShadow="0 12px 34px rgba(91, 76, 54, 0.045)"
      overflow="hidden"
      padding={0}
      position="relative"
      scrollSnapAlign={{ base: 'start', xl: 'none' }}
      textDecoration="none"
      transition="border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease"
      type="button"
      variant="plain"
      onClick={handleClick}

      _active={{ textDecoration: 'none' }}
      _focus={{ textDecoration: 'none' }}
      _hover={{
        borderColor: 'rgba(105, 145, 69, 0.72)',
        boxShadow: '0 18px 42px rgba(91, 76, 54, 0.11)',
        textDecoration: 'none',
        transform: 'translateY(-2px)',
      }}
    >
      <Box
        background="rgba(225, 215, 196, 0.6)"
        borderRadius={{ base: '0 28px 28px 0', md: '0 34px 34px 0' }}
        overflow="hidden"
        position="relative"
      >
        <Image
          alt=""
          decoding="async"
          inset={0}
          height="100%"
          loading="lazy"
          objectFit="cover"
          objectPosition={category.imageObjectPosition ?? 'left center'}
          position="absolute"
          src={category.image}
          transform={`scale(${category.imageScale ?? '1.04'})`}
          transformOrigin="center"
          transition="transform 300ms ease"
          width="100%"
        />
      </Box>

      <Flex
        alignItems="flex-start"
        direction="column"
        minWidth={0}
        padding={{ base: '20px 16px 18px', md: '22px 18px 20px', xl: '24px 20px 22px' }}
        textAlign="left"
      >
        <Image
          alt=""
          aria-hidden="true"
          decoding="async"
          height={{ base: '20px', md: '22px', xl: '24px' }}
          loading="lazy"
          objectFit="contain"
          opacity={0.72}
          src="/about/botanical-heading-sprig-v2.webp"
          width="auto"
        />
        <Text
          as="strong"
          color="#314034"
          display="block"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize={
            hasLongName
              ? { base: '0.95rem', md: '1.05rem', xl: '1.15rem' }
              : { base: '1.18rem', md: '1.28rem', xl: '1.4rem' }
          }
          fontWeight={400}
          lineClamp={2}
          lineHeight={1.08}
          marginTop={{ base: '11px', md: '13px' }}
          overflowWrap="normal"
          wordBreak="normal"
        >
          {category.name}
        </Text>
        <Text
          as="span"
          color="#687066"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize={{ base: '0.82rem', md: '0.9rem', xl: '1rem' }}
          fontWeight={400}
          lineHeight={1.2}
          marginTop="5px"
        >
          {detail.latinName}
        </Text>
        <Box
          background="rgba(107, 116, 96, 0.22)"
          height="1px"
          marginTop={{ base: '15px', md: '18px' }}
          width="100%"
        />
        <Text
          as="span"
          color="#5d7355"
          fontSize={{ base: '0.82rem', md: '0.9rem', xl: '0.96rem' }}
          fontWeight={700}
          lineHeight={1.2}
          marginTop={{ base: '14px', md: '16px' }}
        >
          {category.count}
        </Text>
        <Text
          as="span"
          color="#5f625b"
          fontSize={{ base: '0.68rem', md: '0.72rem', xl: '0.76rem' }}
          lineClamp={{ base: 4, md: 3, '2xl': 4 }}
          lineHeight={1.45}
          marginTop={{ base: '9px', md: '11px' }}
          maxWidth="95%"
        >
          {detail.description}
        </Text>
      </Flex>

      <Flex
        alignItems="center"
        background="#486042"
        borderRadius="999px"
        color="#fffdf7"
        fontSize={{ base: '19px', md: '21px', xl: '23px' }}
        height={{ base: '38px', md: '42px', xl: '46px' }}
        justify="center"
        lineHeight={1}
        bottom={{ base: '16px', md: '18px', xl: '20px' }}
        position="absolute"
        right={{ base: '16px', md: '18px', xl: '20px' }}
        width={{ base: '38px', md: '42px', xl: '46px' }}
      >
        <Box as="span" marginTop="-2px">
          →
        </Box>
      </Flex>
    </Button>
  );
};
