import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Layout, useLayoutContext } from 'src/widgets/Layout';

import { useCollectionViewModel } from '../../model/collectionViewModel';
import { RoomScene } from '../RoomScene/RoomScene';

export const CollectionPage = () => {
  const { locale, query } = useLayoutContext();
  const viewModel = useCollectionViewModel();
  const { closePlantCard } = viewModel;

  useEffect(() => {
    closePlantCard();
  }, [closePlantCard, query]);

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
          onPlantClose={viewModel.closePlantCard}
          onPlantSelect={viewModel.selectPlant}
          query={query}
          selectedPlantId={viewModel.selectedPlantId}
          text={viewModel.text[locale]}
        />
      </Box>
    </Layout>
  );
};
