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
      <Link
        alignItems="center"
        backdropFilter="blur(14px)"
        background="rgba(255, 248, 233, 0.76)"
        border="1px solid rgba(255, 248, 233, 0.36)"
        borderRadius="999px"
        bottom="clamp(18px, 3vw, 44px)"
        color="#365e35"
        display="inline-flex"
        fontSize="0.92rem"
        fontWeight={760}
        gap="8px"
        left="clamp(18px, 3vw, 46px)"
        minHeight="40px"
        padding="0 14px"
        position="absolute"
        width="fit-content"
        zIndex={20}
        href="/"
      >
        <Box as="span" aria-hidden="true" fontSize="1.05rem" lineHeight={1}>
          ←
        </Box>
        {viewModel.text.backToHome}
      </Link>
    </Box>
  );
}
