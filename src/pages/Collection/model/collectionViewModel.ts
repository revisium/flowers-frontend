import { useCallback, useState } from 'react';

import { copy, type PlantCategory } from './collectionModel';

export const useCollectionViewModel = () => {
  const [category, setCategory] = useState<PlantCategory>('all');
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

  return {
    activeCategory: category,
    selectedPlantId,
    text: copy,
    changeCategory,
    closePlantCard,
    selectPlant: setSelectedPlantId,
  };
};
