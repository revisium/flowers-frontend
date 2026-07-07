import { Box } from '@chakra-ui/react';
import { useState } from 'react';

import { copy, type Locale, type PlantCategory } from '../../model/homeModel';
import { RoomScene } from '../RoomScene/RoomScene';

export function HomePage() {
  const [category, setCategory] = useState<PlantCategory>('all');
  const [query, setQuery] = useState('');
  const [locale, setLocale] = useState<Locale>('ru');
  const text = copy[locale];

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
        onCategoryChange={setCategory}
        onLocaleChange={setLocale}
        onQueryChange={setQuery}
        query={query}
        text={text}
      />
    </Box>
  );
}
