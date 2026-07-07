import { Box, Link } from '@chakra-ui/react';

import { useCollectionViewModel } from '../../model/collectionViewModel';
import { RoomScene } from '../RoomScene/RoomScene';

export function CollectionPage() {
  const viewModel = useCollectionViewModel();

  return (
    <Box
      as="main"
      height="100vh"
      minHeight="100vh"
      overflowX="hidden"
      padding={{ base: 0, md: 'clamp(10px, 1.8vw, 18px)' }}
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
      <Link className="room-back-link" href="/">
        <Box as="span" aria-hidden="true">
          ←
        </Box>
        {viewModel.text.backToHome}
      </Link>
    </Box>
  );
}
