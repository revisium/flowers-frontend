import { Flex, Grid, Link, Text } from '@chakra-ui/react';
import type { Locale } from 'src/shared/config';

import { homeCategories, type HomeCopy } from '../../model/homePageData';
import { HomeCategoryCard } from '../HomeCategoryCard/HomeCategoryCard';
import { HomeNote } from '../HomeNote/HomeNote';

interface HomeCategoriesSectionProps {
  readonly locale: Locale;
  readonly text: HomeCopy;
}

export const HomeCategoriesSection = ({ locale, text }: HomeCategoriesSectionProps) => {
  return (
    <Flex direction="column" paddingBottom="18px">
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
        <Grid
          gap="14px"
          gridTemplateColumns="repeat(auto-fit, minmax(min(140px, 100%), 1fr))"
          width="100%"
        >
          {homeCategories[locale].map((category) => (
            <HomeCategoryCard category={category} key={category.name} />
          ))}
        </Grid>
      </Flex>

      <HomeNote text={text} />
    </Flex>
  );
};
