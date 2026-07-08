import { Image, Link, Text } from '@chakra-ui/react';

import type { HomeCategory } from '../../model/homePageData';

interface HomeCategoryCardProps {
  readonly category: HomeCategory;
}

export const HomeCategoryCard = ({ category }: HomeCategoryCardProps) => {
  return (
    <Link
      alignItems="center"
      aspectRatio="1.05 / 1"
      background="rgba(255, 249, 239, 0.62)"
      border="1px solid rgba(126, 104, 69, 0.2)"
      borderRadius="8px"
      display="flex"
      flexDirection="column"
      href="/collection"
      justifyContent="center"
      minHeight="142px"
      padding="14px 12px"
      scrollSnapAlign={{ base: 'start', xl: 'none' }}
      textAlign="center"
      textDecoration="none"
      transition="border-color 180ms ease, transform 180ms ease"
      _active={{ textDecoration: 'none' }}
      _focus={{ textDecoration: 'none' }}
      _hover={{ borderColor: 'rgba(105, 145, 69, 0.52)', textDecoration: 'none', transform: 'translateY(-2px)' }}
    >
      <Image alt="" height="54px" objectFit="contain" src={category.image} width="78px" />
      <Text as="strong" color="#314034" fontSize="0.98rem" lineHeight={1.18} marginTop="10px" maxWidth="132px">
        {category.name}
      </Text>
      <Text as="span" color="#6b7064" fontSize="0.88rem" marginTop="8px">
        {category.count}
      </Text>
    </Link>
  );
};
