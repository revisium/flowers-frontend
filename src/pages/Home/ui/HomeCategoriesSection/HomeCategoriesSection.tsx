import { Box, Button, Grid, HStack, Link, Text } from '@chakra-ui/react';
import { useRef } from 'react';

import { homeCategories } from '../../model/homePageData';
import { HomeCategoryCard } from '../HomeCategoryCard/HomeCategoryCard';
import { HomeNote } from '../HomeNote/HomeNote';

export function HomeCategoriesSection() {
  const categoryListRef = useRef<HTMLDivElement | null>(null);

  const scrollCategories = (direction: 'left' | 'right') => {
    const listElement = categoryListRef.current;

    if (!listElement) {
      return;
    }

    const scrollDistance = Math.max(180, Math.round(listElement.clientWidth * 0.72));

    listElement.scrollBy({
      behavior: 'smooth',
      left: direction === 'left' ? -scrollDistance : scrollDistance,
    });
  };

  return (
    <Box as="section" aria-labelledby="greenhouse-categories-title" margin="-28px auto 0" maxWidth="1600px" padding="0 clamp(16px, 3.2vw, 44px) 28px" position="relative" zIndex={4}>
      <HStack alignItems="center" justifyContent="space-between" marginBottom="18px" paddingInline={{ base: 0, md: 'clamp(0px, 4vw, 76px)' }}>
        <Text as="h2" color="#263729" fontFamily="Georgia, 'Times New Roman', serif" fontSize="1.45rem" id="greenhouse-categories-title" margin={0}>
          Категории
        </Text>
        <Link color="#526246" fontWeight={720} href="/collection">
          Показать все
        </Link>
      </HStack>

      <Grid alignItems="center" gap="18px" gridTemplateColumns={{ base: 'minmax(0, 1fr)', md: '54px minmax(0, 1fr) 54px' }}>
        <Button
          aria-label="Предыдущие категории"
          background="rgba(255, 252, 246, 0.78)"
          borderRadius="999px"
          color="#7b7b62"
          display={{ base: 'none', md: 'inline-flex' }}
          fontSize="2rem"
          height="48px"
          minWidth="48px"
          type="button"
          variant="plain"
          width="48px"
          onClick={() => {
            scrollCategories('left');
          }}
        >
          ‹
        </Button>
        <Grid ref={categoryListRef} gap="14px" gridAutoColumns={{ base: 'minmax(152px, 176px)', xl: 'auto' }} gridAutoFlow={{ base: 'column', xl: 'row' }} gridTemplateColumns={{ base: 'none', xl: 'repeat(8, minmax(132px, 1fr))' }} minWidth={0} overflowX="auto" paddingBottom={{ base: '8px', xl: 0 }} scrollSnapType={{ base: 'x mandatory', xl: 'none' }}>
          {homeCategories.map((category) => (
            <HomeCategoryCard category={category} key={category.name} />
          ))}
        </Grid>
        <Button
          aria-label="Следующие категории"
          background="rgba(169, 207, 139, 0.78)"
          borderRadius="999px"
          color="#49733b"
          display={{ base: 'none', md: 'inline-flex' }}
          fontSize="2rem"
          height="48px"
          minWidth="48px"
          type="button"
          variant="plain"
          width="48px"
          onClick={() => {
            scrollCategories('right');
          }}
        >
          ›
        </Button>
      </Grid>

      <HomeNote />
    </Box>
  );
}
