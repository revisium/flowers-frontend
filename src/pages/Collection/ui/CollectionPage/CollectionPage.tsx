import { Box } from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';
import { Layout, useLayoutContext } from 'src/widgets/Layout';

import { useCollectionViewModel } from '../../model/collectionViewModel';
import { RoomScene } from '../RoomScene/RoomScene';

export const CollectionPage = () => {
  const { locale, onSearchPlantClear, query, selectedSearchPlantId, selectedSearchPlantRequest } = useLayoutContext();
  const viewModel = useCollectionViewModel();
  const { closePlantCard, selectPlant } = viewModel;

  const closeSelectedPlantCard = useCallback(() => {
    onSearchPlantClear();
    closePlantCard();
  }, [closePlantCard, onSearchPlantClear]);

  useEffect(() => {
    if (!selectedSearchPlantId) {
      closePlantCard();
    }
  }, [closePlantCard, query, selectedSearchPlantId]);

  useEffect(() => {
    if (selectedSearchPlantId) {
      selectPlant(selectedSearchPlantId);
    }
  }, [selectPlant, selectedSearchPlantId, selectedSearchPlantRequest]);

  return (
    <Layout>
      <Box
        as="main"
        height="100%"
        minHeight="100%"
        overflowX="hidden"
        position="relative"
      >
        <RoomScene
          activeCategory={viewModel.activeCategory}
          locale={locale}
          onCategoryChange={viewModel.changeCategory}
          onPlantClose={closeSelectedPlantCard}
          onPlantSelect={viewModel.selectPlant}
          query={query}
          selectedPlantId={viewModel.selectedPlantId}
          text={viewModel.text[locale]}
        />
      </Box>
    </Layout>
  );
};
