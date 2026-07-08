import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

interface CollectionSearchRouteSyncParams {
  readonly selectedSearchPlantId: string | null;
  readonly selectedSearchPlantRequest: number;
  readonly closePlantCard: () => void;
  readonly onSearchPlantSelect: (plantId: string) => void;
  readonly selectPlant: (plantId: string) => void;
}

export const useCollectionSearchRouteSync = ({
  closePlantCard,
  onSearchPlantSelect,
  selectPlant,
  selectedSearchPlantId,
  selectedSearchPlantRequest,
}: CollectionSearchRouteSyncParams) => {
  const location = useLocation();
  const navigate = useNavigate();
  const routeSearchPlantId = isSearchPlantLocationState(location.state) ? location.state.searchPlantId : null;

  useEffect(() => {
    if (routeSearchPlantId) {
      onSearchPlantSelect(routeSearchPlantId);
      void navigate(location.pathname, { replace: true, state: null });
      return;
    }

    if (!selectedSearchPlantId) {
      closePlantCard();
    }
  }, [closePlantCard, location.pathname, navigate, onSearchPlantSelect, routeSearchPlantId, selectedSearchPlantId]);

  useEffect(() => {
    if (selectedSearchPlantId) {
      selectPlant(selectedSearchPlantId);
    }
  }, [selectPlant, selectedSearchPlantId, selectedSearchPlantRequest]);
};

const isSearchPlantLocationState = (state: unknown): state is { readonly searchPlantId: string } => {
  return typeof state === 'object'
    && state !== null
    && 'searchPlantId' in state
    && typeof state.searchPlantId === 'string';
};
