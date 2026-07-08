import { Box } from '@chakra-ui/react';

export const BookIcon = () => {
  return (
    <Box aria-hidden="true" color="currentColor" height="22px" marginRight="8px" position="relative" width="22px">
      <Box border="2px solid currentColor" borderRadius="2px 5px 5px 2px" height="16px" left="2px" position="absolute" top="3px" width="18px" />
      <Box background="currentColor" height="14px" left="10px" position="absolute" top="4px" width="2px" />
    </Box>
  );
};
