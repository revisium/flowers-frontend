import { Box } from '@chakra-ui/react';

import { CanGlyph } from '../CanGlyph/CanGlyph';

export const SmallCanIcon = () => {
  return (
    <Box aria-hidden="true" color="#c96f38" height="22px" marginRight="8px" position="relative" width="22px">
      <CanGlyph />
    </Box>
  );
};
