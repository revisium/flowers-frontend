import { Button, Flex, Grid, Text } from '@chakra-ui/react';

import {
  categoryLabels,
  countPlantsByCategory,
  plantCategories,
  type CollectionCopy,
  type Locale,
  type PlantCategory,
} from '../../model/collectionModel';
import { RoomCategoryIcon } from '../RoomCategoryIcon/RoomCategoryIcon';

interface RoomSidebarProps {
  readonly activeCategory: PlantCategory;
  readonly locale: Locale;
  readonly text: CollectionCopy;
  readonly onCategoryChange: (category: PlantCategory) => void;
}

export const RoomSidebar = ({ activeCategory, locale, onCategoryChange, text }: RoomSidebarProps) => {
  return (
    <Flex
      as="aside"
      aria-label={text.sidebarLabel}
      flexDirection={{ base: 'row', md: 'column' }}
      gap="12px"
      left={{ base: '12px', md: '28px' }}
      maxHeight={{ base: 'none', md: 'calc(100% - 176px)' }}
      overflowX={{ base: 'auto', md: 'hidden' }}
      overflowY={{ base: 'hidden', md: 'auto' }}
      paddingRight={{ base: 0, md: '8px' }}
      position="absolute"
      right={{ base: '12px', md: 'auto' }}
      top={{ base: '148px', md: '154px' }}
      width={{ base: 'auto', md: '260px' }}
      zIndex={6}
      css={{
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Flex as="nav" aria-label={text.collection} flexDirection={{ base: 'row', md: 'column' }} gap="12px">
        <Button
          aria-pressed={activeCategory === 'all'}
          alignItems="center"
          background={activeCategory === 'all' ? 'rgba(255, 248, 233, 0.1)' : 'transparent'}
          border={0}
          borderRadius="14px"
          color={activeCategory === 'all' ? '#f1d98f' : 'rgba(205, 221, 188, 0.78)'}
          display="grid"
          fontSize="0.95rem"
          fontWeight={700}
          gap="10px"
          gridTemplateColumns="32px minmax(154px, 1fr) 34px"
          minHeight="46px"
          padding="9px 12px"
          textAlign="left"
          textShadow="0 1px 8px rgba(28, 23, 12, 0.3)"
          transition="background 180ms ease, color 180ms ease"
          width={{ base: 'max-content', md: '100%' }}
          _hover={{ background: 'rgba(255, 248, 233, 0.08)', color: '#f1d98f' }}
          onClick={() => {
            onCategoryChange('all');
          }}
          type="button"
          variant="plain"
        >
          <RoomCategoryIcon category="all" />
          {text.collection}
          <Text as="b" alignItems="center" borderRadius="999px" color="currentColor" display="inline-flex" fontSize="0.7rem" height="19px" justifyContent="center" marginLeft="4px" minWidth="19px">
            {countPlantsByCategory('all')}
          </Text>
        </Button>

        <Grid aria-label={text.show} gap="8px" paddingTop={{ base: 0, md: '4px' }}>
          {plantCategories.map((option) => {
            const category = option.key;
            const isActive = activeCategory === category;

            return (
              <Button
                aria-pressed={activeCategory === category}
                alignItems="center"
                background={isActive ? 'rgba(255, 248, 233, 0.1)' : 'transparent'}
                border={0}
                borderRadius="12px"
                color={isActive ? '#f1d98f' : 'rgba(205, 221, 188, 0.74)'}
                display="grid"
                fontSize="0.95rem"
                fontWeight={650}
                gap="11px"
                gridTemplateColumns="32px minmax(140px, 1fr) 34px"
                minHeight="36px"
                padding="6px 10px"
                textAlign="left"
                textShadow="0 1px 8px rgba(28, 23, 12, 0.3)"
                transition="background 180ms ease, color 180ms ease"
                width={{ base: 'max-content', md: '100%' }}
                _hover={{ background: 'rgba(255, 248, 233, 0.08)', color: '#f1d98f' }}
                key={category}
                onClick={() => {
                  onCategoryChange(category);
                }}
                type="button"
                variant="plain"
              >
                <RoomCategoryIcon category={category} />
                {categoryLabels[locale][category]}
                <Text as="b" alignItems="center" borderRadius="999px" color="currentColor" display="inline-flex" fontSize="0.68rem" height="18px" justifyContent="center" marginLeft="-2px" minWidth="18px" paddingInline="5px" textShadow="none">
                  {countPlantsByCategory(category)}
                </Text>
              </Button>
            );
          })}
        </Grid>
      </Flex>
    </Flex>
  );
};
