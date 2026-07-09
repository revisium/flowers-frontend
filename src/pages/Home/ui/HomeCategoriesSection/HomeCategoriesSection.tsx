import { Flex, Grid, Link, Text } from '@chakra-ui/react';
import { useState } from 'react';
import type { Locale } from 'src/shared/config';

import { homeCategories, type HomeCopy } from '../../model/homePageData';
import { AraceaeCategoryModal } from '../AraceaeCategoryModal/AraceaeCategoryModal';
import { HomeCategoryCard } from '../HomeCategoryCard/HomeCategoryCard';
import { HomeNote } from '../HomeNote/HomeNote';

interface HomeCategoriesSectionProps {
  readonly locale: Locale;
  readonly text: HomeCopy;
}

export const HomeCategoriesSection = ({ locale, text }: HomeCategoriesSectionProps) => {
  const [isAraceaeOpen, setIsAraceaeOpen] = useState(false);

  return (
    <Flex
      as="section"
      aria-labelledby="greenhouse-categories-title"
      direction="column"
      paddingBottom="18px"
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        padding={{ base: '18px', md: '22px clamp(18px, 3vw, 38px) 16px' }}
      >
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
          alignItems="center"
          color="#526246"
          display="inline-flex"
          gap="6px"
          fontWeight={720}
          href="/collection"
          textDecoration="none"
          _active={{ textDecoration: 'none' }}
          _focus={{ textDecoration: 'none' }}
          _hover={{ textDecoration: 'none' }}
        >
          {text.showAllLabel}
          <Text as="span" aria-hidden="true" fontSize="17px" lineHeight={1}>
            ❧
          </Text>
        </Link>
      </Flex>

      <Flex
        overflowX={{ base: 'auto', md: 'visible' }}
        padding={{ base: '0 18px 4px', md: '0 clamp(18px, 3vw, 38px)' }}
        scrollPaddingX="18px"
        scrollSnapType={{ base: 'x mandatory', md: 'none' }}
        css={{
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Grid
          pt="2px"
          gap={{ base: '12px', md: '16px' }}
          gridAutoColumns={{ base: 'minmax(282px, calc(100vw - 72px))', md: 'auto' }}
          gridAutoFlow={{ base: 'column', md: 'row' }}
          gridTemplateColumns={{
            base: 'none',
            md: 'repeat(2, minmax(0, 1fr))',
            lg: 'repeat(3, minmax(0, 1fr))',
            xl: 'repeat(4, minmax(0, 1fr))',
          }}
          gridTemplateRows={{ base: 'repeat(2, auto)', md: 'none' }}
          width={{ base: 'max-content', md: '100%' }}
        >
          {homeCategories[locale].map((category) => (
            <HomeCategoryCard
              category={category}
              key={category.key}
              onOpen={category.key === 'araceae' ? () => setIsAraceaeOpen(true) : undefined}
            />
          ))}
        </Grid>
      </Flex>

      <HomeNote text={text} />
      {isAraceaeOpen ? <AraceaeCategoryModal onClose={() => setIsAraceaeOpen(false)} /> : null}
    </Flex>
  );
};
