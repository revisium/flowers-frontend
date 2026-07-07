import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import type { HomeStatIcon } from '../../model/homePageData';
import { CanGlyph } from '../CanGlyph/CanGlyph';

export function StatIconBox({ icon }: { readonly icon: HomeStatIcon }) {
  const color = icon === 'can' ? '#c96f38' : '#6b9147';

  if (icon === 'grid') {
    return (
      <IconShell color={color}>
        <Box
          border="2px solid currentColor"
          borderRadius="3px"
          boxShadow={{
            base: '10px 0 0 -2px rgba(121, 150, 72, 0.1), 10px 0 0 0 currentColor, 0 10px 0 -2px rgba(121, 150, 72, 0.1), 0 10px 0 0 currentColor, 10px 10px 0 -2px rgba(121, 150, 72, 0.1), 10px 10px 0 0 currentColor',
            sm: '13px 0 0 -2px rgba(121, 150, 72, 0.1), 13px 0 0 0 currentColor, 0 13px 0 -2px rgba(121, 150, 72, 0.1), 0 13px 0 0 currentColor, 13px 13px 0 -2px rgba(121, 150, 72, 0.1), 13px 13px 0 0 currentColor',
          }}
          height={{ base: '7px', sm: '8px' }}
          left={{ base: '10px', sm: '13px' }}
          position="absolute"
          top={{ base: '10px', sm: '13px' }}
          width={{ base: '7px', sm: '8px' }}
        />
      </IconShell>
    );
  }

  if (icon === 'can') {
    return (
      <IconShell color={color}>
        <CanGlyph responsive />
      </IconShell>
    );
  }

  if (icon === 'heart') {
    return (
      <IconShell color={color}>
        <Box
          border="2px solid currentColor"
          borderLeft={0}
          borderTop={0}
          height={{ base: '14px', sm: '18px' }}
          left={{ base: '10px', sm: '14px' }}
          position="absolute"
          top={{ base: '10px', sm: '13px' }}
          transform="rotate(45deg)"
          width={{ base: '14px', sm: '18px' }}
        />
        <Box
          background="radial-gradient(circle at 34% 40%, transparent 0 6px, currentColor 7px 8px, transparent 9px), radial-gradient(circle at 65% 40%, transparent 0 6px, currentColor 7px 8px, transparent 9px)"
          height={{ base: '18px', sm: '24px' }}
          left={{ base: '8px', sm: '11px' }}
          position="absolute"
          top={{ base: '6px', sm: '8px' }}
          width={{ base: '18px', sm: '24px' }}
        />
      </IconShell>
    );
  }

  return (
    <IconShell color={color}>
      <Box
        background="currentColor"
        borderRadius="999px 999px 999px 0"
        height={{ base: '17px', sm: '22px' }}
        left={{ base: '9px', sm: '12px' }}
        position="absolute"
        rotate="-45deg"
        top={{ base: '7px', sm: '10px' }}
        width={{ base: '17px', sm: '22px' }}
      />
      <Box
        background="rgba(255, 255, 255, 0.72)"
        height={{ base: '11px', sm: '15px' }}
        left={{ base: '16px', sm: '22px' }}
        position="absolute"
        top={{ base: '10px', sm: '16px' }}
        width="2px"
      />
    </IconShell>
  );
}

function IconShell({ children, color }: { readonly children: ReactNode; readonly color: string }) {
  return (
    <Box
      aria-hidden="true"
      background="rgba(121, 150, 72, 0.1)"
      borderRadius="999px"
      color={color}
      height={{ base: '34px', sm: '46px' }}
      marginBottom={{ base: '8px', sm: '12px' }}
      position="relative"
      width={{ base: '34px', sm: '46px' }}
    >
      {children}
    </Box>
  );
}
