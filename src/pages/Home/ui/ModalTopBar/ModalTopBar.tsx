import { Box, Button, Flex } from '@chakra-ui/react';
import type { ReactNode, RefObject } from 'react';

interface ModalTopBarProps {
  readonly backLabel?: string;
  readonly closeButtonRef?: RefObject<HTMLButtonElement | null>;
  readonly closeLabel: string;
  readonly leading?: ReactNode;
  readonly onBack?: () => void;
  readonly onClose: () => void;
}

export const ModalTopBar = ({
  backLabel,
  closeButtonRef,
  closeLabel,
  leading,
  onBack,
  onClose,
}: ModalTopBarProps) => (
  <Flex
    alignItems="center"
    backdropFilter="blur(14px)"
    background="rgba(253, 250, 243, 0.94)"
    borderBottom="1px solid rgba(218, 204, 178, 0.72)"
    flexShrink={0}
    justifyContent="space-between"
    minHeight={{ base: '58px', md: '66px' }}
    padding={{ base: '8px 18px', md: '10px 28px' }}
    position="sticky"
    top={0}
    width="100%"
    zIndex={12}
  >
    {leading ?? (
      <Button
        color="#526246"
        fontSize={{ base: '0.88rem', md: '0.95rem' }}
        fontWeight={720}
        padding="0 4px"
        type="button"
        variant="plain"
        onClick={onBack}
        _focusVisible={{ boxShadow: '0 0 0 3px rgba(94, 127, 57, 0.26)', outline: 'none' }}
        _hover={{ color: '#314034' }}
      >
        ← {backLabel}
      </Button>
    )}
    <Button
      ref={closeButtonRef}
      aria-label={closeLabel}
      border="1px solid rgba(82, 98, 70, 0.35)"
      borderRadius="999px"
      color="#3e513d"
      fontSize="24px"
      height={{ base: '40px', md: '42px' }}
      minWidth={{ base: '40px', md: '42px' }}
      padding={0}
      type="button"
      variant="plain"
      onClick={onClose}
      _focusVisible={{ boxShadow: '0 0 0 3px rgba(94, 127, 57, 0.26)', outline: 'none' }}
      _hover={{ background: 'rgba(218, 204, 178, 0.3)' }}
    >
      <Box as="span" lineHeight={1} transform="translateY(-1px)">
        ×
      </Box>
    </Button>
  </Flex>
);
