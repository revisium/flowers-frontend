import { Box } from '@chakra-ui/react';

import type { PlantCategory } from '../../model/collectionModel';

interface RoomCategoryIconProps {
  readonly category: Exclude<PlantCategory, 'all'>;
}

export function RoomCategoryIcon({ category }: RoomCategoryIconProps) {
  const modifier = category === 'foliage' ? '' : ` room-category__dot--${category}`;

  return <Box as="span" className={`room-category__dot${modifier}`} />;
}
