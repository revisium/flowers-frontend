import { useCallback, useState } from 'react';

import { copy, type Locale, type PlantCategory } from './collectionModel';

export const useCollectionViewModel = () => {
  const [category, setCategory] = useState<PlantCategory>('all');
  const [locale, setLocale] = useState<Locale>('ru');
  const [query, setQuery] = useState('');
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);

  const closePlantCard = useCallback(() => {
    setSelectedPlantId(null);
  }, []);

  const changeCategory = useCallback(
    (nextCategory: PlantCategory) => {
      setCategory(nextCategory);
      closePlantCard();
    },
    [closePlantCard],
  );

  const changeQuery = useCallback(
    (nextQuery: string) => {
      setQuery(nextQuery);
      closePlantCard();
    },
    [closePlantCard],
  );

  return {
    activeCategory: category,
    locale,
    query,
    selectedPlantId,
    text: copy[locale],
    changeCategory,
    changeLocale: setLocale,
    changeQuery,
    closePlantCard,
    selectPlant: setSelectedPlantId,
  };
};
