import { Box } from '@chakra-ui/react';

import type { PlantCategory } from '../../model/collectionModel';

interface RoomCategoryIconProps {
  readonly category: Exclude<PlantCategory, 'all'>;
}

export const RoomCategoryIcon = ({ category }: RoomCategoryIconProps) => {
  if (category === 'aroid') {
    return (
      <Box aria-hidden="true" color="#cfe4b7" display="inline-block" height="20px" opacity={0.82} position="relative" width="20px">
        <Box background="currentColor" borderRadius="70% 70% 70% 12%" height="15px" left="2px" position="absolute" rotate="-45deg" top="2px" width="15px" />
        <Box background="rgba(52, 65, 46, 0.28)" height="11px" left="10px" position="absolute" rotate="28deg" top="4px" width="2px" />
      </Box>
    );
  }

  if (category === 'flowering') {
    return (
      <Box aria-hidden="true" color="#f4c09c" display="inline-block" height="20px" opacity={0.82} position="relative" width="20px">
        <Box
          background="#f4c09c"
          borderRadius="999px"
          boxShadow="0 -6px 0 #f4c09c, 6px 0 0 #f4c09c, 0 6px 0 #f4c09c, -6px 0 0 #f4c09c"
          height="7px"
          left="7px"
          position="absolute"
          top="7px"
          width="7px"
        />
        <Box background="#9b6b3f" borderRadius="999px" height="5px" left="8px" position="absolute" top="8px" width="5px" />
      </Box>
    );
  }

  if (category === 'succulent') {
    return (
      <Box aria-hidden="true" color="#bed09d" display="inline-block" height="20px" opacity={0.82} position="relative" width="20px">
        <Box
          borderBottom="8px solid currentColor"
          borderLeft="4px solid transparent"
          borderRight="4px solid transparent"
          height={0}
          left="6px"
          position="absolute"
          top="3px"
          width={0}
        />
        <Box
          borderBottom="8px solid currentColor"
          borderLeft="4px solid transparent"
          borderRight="4px solid transparent"
          height={0}
          left="6px"
          position="absolute"
          rotate="72deg"
          top="8px"
          width={0}
        />
      </Box>
    );
  }

  if (category === 'palm') {
    return (
      <Box aria-hidden="true" color="#d8d29a" display="inline-block" height="20px" opacity={0.82} position="relative" width="20px">
        <Box background="currentColor" height="15px" left="9px" position="absolute" top="4px" width="2px" />
        <Box
          borderBottom="10px solid currentColor"
          borderLeft="4px solid transparent"
          borderRight="4px solid transparent"
          height={0}
          left="6px"
          position="absolute"
          rotate="-32deg"
          top="1px"
          width={0}
        />
        <Box
          borderBottom="10px solid currentColor"
          borderLeft="4px solid transparent"
          borderRight="4px solid transparent"
          height={0}
          left="6px"
          position="absolute"
          rotate="32deg"
          top="1px"
          width={0}
        />
      </Box>
    );
  }

  return (
    <Box aria-hidden="true" color="#cfe0bb" display="inline-block" height="20px" opacity={0.82} position="relative" width="20px">
      <Box background="currentColor" borderRadius="999px 999px 999px 0" height="13px" left="4px" position="absolute" rotate="-45deg" top="3px" width="13px" />
      <Box background="rgba(255, 248, 233, 0.48)" borderRadius="999px" height="8px" left="11px" position="absolute" top="5px" width="2px" />
    </Box>
  );
};
