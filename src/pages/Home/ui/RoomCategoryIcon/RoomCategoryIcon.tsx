import { Box } from '@chakra-ui/react';

import type { PlantCategory } from '../../model/homeModel';

interface RoomCategoryIconProps {
  readonly category: Exclude<PlantCategory, 'all'>;
}

export function RoomCategoryIcon({ category }: RoomCategoryIconProps) {
  return <Box as="span" className={`room-category__dot room-category__dot--${category}`} />;
}
