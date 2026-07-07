import { Box } from '@chakra-ui/react';
import { useState } from 'react';

import { copy, type Locale, type PlantCategory } from '../../model/homeModel';
import { RoomScene } from '../RoomScene/RoomScene';

export function HomePage() {
  const [category, setCategory] = useState<PlantCategory>('all');
  const [query, setQuery] = useState('');
  const [locale, setLocale] = useState<Locale>('ru');
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);
  const text = copy[locale];

  const changeCategory = (nextCategory: PlantCategory) => {
    setCategory(nextCategory);
    setSelectedPlantId(null);
  };

  const changeQuery = (nextQuery: string) => {
    setQuery(nextQuery);
    setSelectedPlantId(null);
  };

  return (
    <Box
      as="main"
      height="100vh"
      minHeight="100vh"
      overflowX="hidden"
      padding={{ base: 0, md: 'clamp(10px, 1.8vw, 18px)' }}
    >
      <RoomScene
        activeCategory={category}
        locale={locale}
        onCategoryChange={changeCategory}
        onLocaleChange={setLocale}
        onPlantClose={() => {
          setSelectedPlantId(null);
        }}
        onPlantSelect={setSelectedPlantId}
        onQueryChange={changeQuery}
        query={query}
        selectedPlantId={selectedPlantId}
        text={text}
      />
    </Box>
  );
}
