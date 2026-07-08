import { Box } from '@chakra-ui/react';

interface CanGlyphProps {
  readonly responsive?: boolean;
}

export const CanGlyph = ({ responsive = false }: CanGlyphProps) => {
  return (
    <Box aria-hidden="true" height="100%" inset={0} position="absolute" width="100%">
      <Box
        border="2px solid currentColor"
        borderRadius="4px 4px 9px 9px"
        height={responsive ? { base: '14px', sm: '18px' } : '13px'}
        left={responsive ? { base: '8px', sm: '13px' } : '1px'}
        position="absolute"
        top={responsive ? { base: '11px', sm: '16px' } : '6px'}
        transform="rotate(-8deg)"
        width={responsive ? { base: '18px', sm: '22px' } : '16px'}
      />
      <Box
        borderRight="2px solid currentColor"
        borderTop="2px solid currentColor"
        height={responsive ? { base: '9px', sm: '11px' } : '8px'}
        left={responsive ? { base: '22px', sm: '28px' } : '14px'}
        position="absolute"
        top={responsive ? { base: '7px', sm: '11px' } : '2px'}
        transform="rotate(16deg)"
        width={responsive ? { base: '10px', sm: '13px' } : '9px'}
      />
    </Box>
  );
};
