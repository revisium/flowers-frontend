import { Box } from '@chakra-ui/react';

export const HeaderSearchIcon = () => {
  return (
    <Box
      aria-hidden="true"
      border="2px solid currentColor"
      borderRadius="999px"
      flex="0 0 auto"
      height="12px"
      position="relative"
      width="12px"
      _after={{
        background: 'currentColor',
        content: '""',
        height: '7px',
        left: '9px',
        position: 'absolute',
        top: '8px',
        transform: 'rotate(45deg)',
        width: '2px',
      }}
    />
  );
};
