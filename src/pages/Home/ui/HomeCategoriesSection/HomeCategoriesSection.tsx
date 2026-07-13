import { Flex, Grid, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { getCollectionPlantCountByFamily, type CollectionFamilyId } from 'src/entities/collection';
import type { Locale } from 'src/shared/config';

import { homeCategories, type HomeCategory, type HomeCopy } from '../../model/homePageData';
import { categoryDetailDataById } from '../CategoryDetailModal/data';
import { HomeCategoryCard } from '../HomeCategoryCard/HomeCategoryCard';
import { HomeNote } from '../HomeNote/HomeNote';
import { CategoryDetailModal } from '../CategoryDetailModal/CategoryDetailModal';

interface HomeCategoriesSectionProps {
  readonly locale: Locale;
  readonly text: HomeCopy;
}

export const HomeCategoriesSection = ({ locale, text }: HomeCategoriesSectionProps) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<HomeCategory['id'] | null>(null);

  const handleCategoryOpen = (category: HomeCategory) => {
    setSelectedCategoryId(category.id);
  };
  const selectedCategoryData =
    selectedCategoryId && selectedCategoryId in categoryDetailDataById
      ? categoryDetailDataById[selectedCategoryId as keyof typeof categoryDetailDataById][locale]
      : null;

  const formatPlantCount = (count: number) => {
    if (locale === 'en') {
      return `${count} ${count === 1 ? 'plant' : 'plants'}`;
    }

    const lastTwoDigits = count % 100;
    const lastDigit = count % 10;
    let word = 'растений';

    if (lastTwoDigits < 11 || lastTwoDigits > 14) {
      if (lastDigit === 1) {
        word = 'растение';
      } else if (lastDigit >= 2 && lastDigit <= 4) {
        word = 'растения';
      }
    }

    return `${count} ${word}`;
  };

  return (
    <Flex as="section" aria-labelledby="greenhouse-categories-title" direction="column">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        padding={{ base: '18px', md: '22px clamp(18px, 3vw, 38px) 16px' }}
      >
        <Text
          as="h2"
          color="#526246"
          id="greenhouse-categories-title"
          margin={0}
          textStyle="bold-xl"
        >
          ❧ {text.categoriesTitle}
        </Text>
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
          gridAutoColumns={{ base: '262px', md: 'auto' }}
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
              category={{
                ...category,
                count: formatPlantCount(getCollectionPlantCountByFamily(category.id as CollectionFamilyId)),
              }}
              key={category.id}
              onOpen={handleCategoryOpen}
            />
          ))}
        </Grid>
      </Flex>

      <HomeNote text={text} />
      {selectedCategoryData ? (
        <CategoryDetailModal
          data={selectedCategoryData}
          locale={locale}
          onClose={() => setSelectedCategoryId(null)}
        />
      ) : null}
    </Flex>
  );
};
