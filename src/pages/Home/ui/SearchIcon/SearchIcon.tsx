import { Box } from '@chakra-ui/react';

export function SearchIcon() {
  return (
    <Box
      aria-hidden="true"
      border="2px solid #8d856f"
      borderRadius="999px"
      height="13px"
      position="relative"
      width="13px"
      _after={{
        background: '#8d856f',
        content: '""',
        height: '7px',
        left: '10px',
        position: 'absolute',
        top: '9px',
        transform: 'rotate(45deg)',
        width: '2px',
      }}
    />
  );
}
