import { Box, Button, Flex, Link, Text } from '@chakra-ui/react';

import {
  categoryLabels,
  countPlantsByCategory,
  plantCategories,
  plants,
  type HomeCopy,
  type Locale,
  type PlantCategory,
} from '../../model/homeModel';
import { RoomCategoryIcon } from '../RoomCategoryIcon/RoomCategoryIcon';

interface RoomSidebarProps {
  readonly activeCategory: PlantCategory;
  readonly locale: Locale;
  readonly text: HomeCopy;
  readonly onCategoryChange: (category: PlantCategory) => void;
}

export function RoomSidebar({ activeCategory, locale, onCategoryChange, text }: RoomSidebarProps) {
  return (
    <Flex as="aside" aria-label="Разделы оранжереи" className="room-nav">
      <Link aria-label="Оранжерея, главная" className="room-brand" href="/">
        <Box as="span" className="room-brand__leaf" />
        <Box as="span">
          <Text as="strong">Оранжерея</Text>
          <Text as="small">{text.brandSubtitle}</Text>
        </Box>
      </Link>

      <Flex as="nav" aria-label={text.collection} className="room-menu">
        <Button
          aria-pressed={activeCategory === 'all'}
          className={
            activeCategory === 'all' ? 'room-menu__item room-menu__item--active' : 'room-menu__item'
          }
          onClick={() => {
            onCategoryChange('all');
          }}
          type="button"
          variant="plain"
        >
          <Box as="span" className="room-icon room-icon--plant" />
          {text.collection}
          <Text as="b">{plants.length}</Text>
        </Button>

        <Box className="room-category-list" aria-label={text.show}>
          {plantCategories.map((option) => {
            const category = option.key;

            return (
              <Button
                aria-pressed={activeCategory === category}
                className={
                  activeCategory === category
                    ? 'room-category room-category--active'
                    : 'room-category'
                }
                key={category}
                onClick={() => {
                  onCategoryChange(category);
                }}
                type="button"
                variant="plain"
              >
                <RoomCategoryIcon category={category} />
                {categoryLabels[locale][category]}
                <Text as="b">{countPlantsByCategory(category)}</Text>
              </Button>
            );
          })}
        </Box>
      </Flex>
    </Flex>
  );
}
