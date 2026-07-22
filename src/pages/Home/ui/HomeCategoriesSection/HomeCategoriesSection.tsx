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
        alignItems="flex-start"
        direction="column"
        gap={{ base: '4px', md: '6px' }}
        padding={{ base: '22px 18px 18px', md: '30px clamp(18px, 3vw, 38px) 22px' }}
      >
        <Text
          color="#718064"
          fontSize={{ base: '0.68rem', md: '0.76rem' }}
          fontWeight={700}
          letterSpacing="0.02em"
          lineHeight={1.3}
          margin={0}
        >
          Исследуйте коллекцию
        </Text>
        <Text
          as="h2"
          color="#263b2d"
          fontSize={{ base: '1.55rem', md: '1.9rem' }}
          fontWeight={780}
          id="greenhouse-categories-title"
          lineHeight={1.08}
          margin={0}
          scrollMarginTop={{ base: '138px', md: '126px' }}
        >
          {text.categoriesTitle}
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
          gap={{ base: '16px', md: '20px' }}
          gridAutoColumns={{ base: '326px', md: 'auto' }}
          gridAutoFlow={{ base: 'column', md: 'row' }}
          gridTemplateColumns={{
            base: 'none',
            md: 'repeat(2, minmax(0, 1fr))',
            lg: 'repeat(3, minmax(0, 1fr))',
          }}
          gridTemplateRows={{ base: '1fr', md: 'none' }}
          width={{ base: 'max-content', md: '100%' }}
        >
          {homeCategories[locale].map((category) => {
            const detail =
              categoryDetailDataById[category.id as keyof typeof categoryDetailDataById][locale];

            return (
              <HomeCategoryCard
                category={{
                  ...category,
                  count: formatPlantCount(
                    getCollectionPlantCountByFamily(category.id as CollectionFamilyId),
                  ),
                }}
                detail={detail}
                key={category.id}
                onOpen={handleCategoryOpen}
              />
            );
          })}
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
