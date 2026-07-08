import { Box } from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Layout, useLayoutContext } from 'src/widgets/Layout';

import { useCollectionViewModel } from '../../model/collectionViewModel';
import { RoomScene } from '../RoomScene/RoomScene';

export const CollectionPage = () => {
  const { locale, onSearchPlantClear, onSearchPlantSelect, query, selectedSearchPlantId, selectedSearchPlantRequest } = useLayoutContext();
  const location = useLocation();
  const navigate = useNavigate();
  const viewModel = useCollectionViewModel();
  const { closePlantCard, selectPlant } = viewModel;
  const routeSearchPlantId = isSearchPlantLocationState(location.state) ? location.state.searchPlantId : null;

  const closeSelectedPlantCard = useCallback(() => {
    onSearchPlantClear();
    closePlantCard();
  }, [closePlantCard, onSearchPlantClear]);

  useEffect(() => {
    if (!selectedSearchPlantId && !routeSearchPlantId) {
      closePlantCard();
    }
  }, [closePlantCard, query, routeSearchPlantId, selectedSearchPlantId]);

  useEffect(() => {
    const plantId = selectedSearchPlantId ?? routeSearchPlantId;

    if (plantId) {
      selectPlant(plantId);
    }
  }, [routeSearchPlantId, selectPlant, selectedSearchPlantId, selectedSearchPlantRequest]);

  useEffect(() => {
    if (!routeSearchPlantId) {
      return;
    }

    onSearchPlantSelect(routeSearchPlantId);
    void navigate(location.pathname, { replace: true, state: null });
  }, [location.pathname, navigate, onSearchPlantSelect, routeSearchPlantId]);

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

const isSearchPlantLocationState = (state: unknown): state is { readonly searchPlantId: string } => {
  return typeof state === 'object'
    && state !== null
    && 'searchPlantId' in state
    && typeof state.searchPlantId === 'string';
};
