import { Box } from '@chakra-ui/react';

export function LeafMark() {
  return (
    <Box
      aria-hidden="true"
      background="#6c923e"
      borderRadius="999px 999px 999px 0"
      height="28px"
      position="relative"
      rotate="-45deg"
      width="28px"
      _after={{
        background: 'rgba(255, 255, 255, 0.72)',
        content: '""',
        height: '15px',
        left: '13px',
        position: 'absolute',
        top: '6px',
        width: '2px',
      }}
    />
  );
}
