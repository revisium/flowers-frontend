import { Box } from '@chakra-ui/react';

import { useHomeViewModel } from '../../model/homeViewModel';
import { RoomScene } from '../RoomScene/RoomScene';

export function HomePage() {
  const viewModel = useHomeViewModel();

  return (
    <Box
      as="main"
      height="100vh"
      minHeight="100vh"
      overflowX="hidden"
      padding={{ base: 0, md: 'clamp(10px, 1.8vw, 18px)' }}
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
  );
}
