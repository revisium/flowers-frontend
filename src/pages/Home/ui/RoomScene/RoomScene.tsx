import { Box } from '@chakra-ui/react';

import type { HomeCopy, Locale, PlantCategory } from '../../model/homeModel';
import { RoomAmbientInfo } from '../RoomAmbientInfo/RoomAmbientInfo';
import { RoomSidebar } from '../RoomSidebar/RoomSidebar';
import { RoomToolbar } from '../RoomToolbar/RoomToolbar';

interface RoomSceneProps {
  readonly activeCategory: PlantCategory;
  readonly locale: Locale;
  readonly query: string;
  readonly text: HomeCopy;
  readonly onCategoryChange: (category: PlantCategory) => void;
  readonly onLocaleChange: (locale: Locale) => void;
  readonly onQueryChange: (query: string) => void;
}

export function RoomScene({
  activeCategory,
  locale,
  onCategoryChange,
  onLocaleChange,
  onQueryChange,
  query,
  text,
}: RoomSceneProps) {
  return (
    <Box as="section" className="room-scene" aria-label="Домашняя оранжерея">
      <RoomSidebar
        activeCategory={activeCategory}
        locale={locale}
        onCategoryChange={onCategoryChange}
        text={text}
      />
      <RoomToolbar
        locale={locale}
        onLocaleChange={onLocaleChange}
        onQueryChange={onQueryChange}
        query={query}
        text={text}
      />
      <RoomAmbientInfo text={text} />
    </Box>
  );
}
