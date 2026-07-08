import { Flex, Link, Text } from '@chakra-ui/react';
import { useRef } from 'react';
import type { Locale } from 'src/shared/config';

import { homeCategories, type HomeCopy } from '../../model/homePageData';
import { HomeCategoryCard } from '../HomeCategoryCard/HomeCategoryCard';
import { HomeNote } from '../HomeNote/HomeNote';

interface HomeCategoriesSectionProps {
  readonly locale: Locale;
  readonly text: HomeCopy;
}

export const HomeCategoriesSection = ({ locale, text }: HomeCategoriesSectionProps) => {
  const categoryListRef = useRef<HTMLDivElement | null>(null);

  return (
    <Flex direction="column">
      <Flex alignItems="center" justifyContent="space-between" p="18px">
        <Text
          as="h2"
          color="#263729"
          id="greenhouse-categories-title"
          margin={0}
          textStyle="bold-xl"
        >
          {text.categoriesTitle}
        </Text>
        <Link
          color="#526246"
          fontWeight={720}
          href="/collection"
          textDecoration="none"
          _active={{ textDecoration: 'none' }}
          _focus={{ textDecoration: 'none' }}
          _hover={{ textDecoration: 'none' }}
        >
          {text.showAllLabel}
        </Link>
      </Flex>

      <Flex p="18px">
        <Flex
          ref={categoryListRef}
          wrap="wrap"
          gap="14px"
          pt="2px"
          overflowX="auto"
          css={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {homeCategories[locale].map((category) => (
            <HomeCategoryCard category={category} key={category.name} />
          ))}
        </Flex>
      </Flex>

      <HomeNote text={text} />
    </Flex>
  );
};
