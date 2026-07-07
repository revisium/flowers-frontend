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
    <Box
      as="section"
      aria-label={text.sceneLabel}
      backgroundImage="linear-gradient(90deg, rgba(30, 26, 13, 0.82), rgba(30, 26, 13, 0.3) 24%, rgba(30, 26, 13, 0) 58%), linear-gradient(180deg, rgba(20, 26, 13, 0.02), rgba(20, 26, 13, 0.34)), url('/greenhouse-room-empty.png')"
      backgroundPosition="center"
      backgroundSize="cover"
      borderRadius={{ base: '0 0 22px 22px', md: '18px' }}
      boxShadow="0 24px 80px rgba(52, 43, 28, 0.2)"
      minHeight={{ base: '100vh', md: 'calc(100vh - clamp(20px, 3.6vw, 36px))' }}
      overflow="hidden"
      position="relative"
    >
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
