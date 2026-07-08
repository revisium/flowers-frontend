import { Box } from '@chakra-ui/react';
import { Layout } from 'src/widgets/Layout';

import { useCollectionViewModel } from '../../model/collectionViewModel';
import { RoomScene } from '../RoomScene/RoomScene';

export const CollectionPage = () => {
  const viewModel = useCollectionViewModel();

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
          locale={viewModel.locale}
          onCategoryChange={viewModel.changeCategory}
          onLocaleChange={viewModel.changeLocale}
          onPlantClose={viewModel.closePlantCard}
          onPlantSelect={viewModel.selectPlant}
          onQueryChange={viewModel.changeQuery}
          query={viewModel.query}
          selectedPlantId={viewModel.selectedPlantId}
          text={viewModel.text}
        />
      </Box>
    </Layout>
  );
};
