import { Box } from '@chakra-ui/react';

import type { PlantCategory } from '../../model/collectionModel';

interface RoomCategoryIconProps {
  readonly category: PlantCategory;
}

const categoryIconImages: Partial<Record<PlantCategory, string>> = {
  all: '/greenhouse-leaf-logo.png',
  amaryllidaceae: '/plants/categories/amaryllidaceae.png',
  apocynaceae: '/plants/categories/apocynaceae.png',
  araceae: '/plants/categories/araceae.png',
  arecaceae: '/plants/categories/arecaceae.png',
  asparagaceae: '/plants/categories/asparagaceae.png',
  asphodelaceae: '/plants/categories/asphodelaceae.png',
  bromeliaceae: '/plants/categories/bromeliaceae.png',
  cactaceae: '/plants/categories/cactaceae.png',
  commelinaceae: '/plants/categories/commelinaceae.png',
  cycadaceae: '/plants/categories/cycadaceae.png',
  gesneriaceae: '/plants/categories/gesneriaceae.png',
  marantaceae: '/plants/categories/marantaceae.png',
  nephrolepidaceae: '/plants/categories/nephrolepidaceae.png',
  orchidaceae: '/plants/categories/orchidaceae.png',
  piperaceae: '/plants/categories/piperaceae.png',
  vitaceae: '/plants/categories/vitaceae.png',
};

export const RoomCategoryIcon = ({ category }: RoomCategoryIconProps) => {
  const image = categoryIconImages[category];

  return (
    <Box
      aria-hidden="true"
      backgroundImage={image ? `url('${image}')` : undefined}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="contain"
      flex="0 0 auto"
      height="28px"
      width="28px"
    />
  );
};
