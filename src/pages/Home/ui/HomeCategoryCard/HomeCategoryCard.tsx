import { Flex, Image, Text } from '@chakra-ui/react';

import type { HomeCategory } from '../../model/homePageData';

interface HomeCategoryCardProps {
  readonly category: HomeCategory;
}

export const HomeCategoryCard = ({ category }: HomeCategoryCardProps) => {
  return (
    <Flex
      width="100%"
      minHeight="118px"
      direction="column"
      align="center"
      aspectRatio="1 / 1"
      background="rgba(255, 249, 239, 0.62)"
      border="1px solid rgba(126, 104, 69, 0.2)"
      borderRadius="8px"
      padding="10px"
      scrollSnapAlign={{ base: 'start', xl: 'none' }}
      textAlign="center"
      textDecoration="none"
      transition="border-color 180ms ease, transform 180ms ease"

      _active={{ textDecoration: 'none' }}
      _focus={{ textDecoration: 'none' }}
      _hover={{
        borderColor: 'rgba(105, 145, 69, 0.52)',
        textDecoration: 'none',
        transform: 'translateY(-2px)',
      }}
    >
      <Image
        alt=""
        alignSelf="center"
        height="68px"
        objectFit="contain"
        src={category.image}
        width="78px"
      />
      <Text
        w="100%"
        as="strong"
        color="#314034"
        display="flex"
        fontSize="0.86rem"
        justifyContent="center"
        lineClamp={2}
        lineHeight={1.18}
        maxWidth="132px"
        minHeight="2.03rem"
      >
        {category.name}
      </Text>
      <Text w="100%" as="span" color="#6b7064" fontSize="0.78rem" lineHeight="20px">
        {category.count}
      </Text>
    </Flex>
  );
};
