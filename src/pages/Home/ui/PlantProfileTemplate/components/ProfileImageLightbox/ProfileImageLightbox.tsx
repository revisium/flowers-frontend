import { Box, Button, Flex, Image, Portal, Text } from '@chakra-ui/react';
import { useEffect, useRef, type KeyboardEvent, type MouseEvent } from 'react';

export interface ProfileImageLightboxItem {
  readonly alt: string;
  readonly src: string;
}

interface ProfileImageLightboxProps {
  readonly activeIndex: number;
  readonly closeLabel: string;
  readonly images: readonly ProfileImageLightboxItem[];
  readonly nextLabel: string;
  readonly previousLabel: string;
  readonly onClose: () => void;
  readonly onSelect: (index: number) => void;
}

const CarouselChevron = ({ direction }: { readonly direction: 'left' | 'right' }) => (
  <Box
    aria-hidden="true"
    borderColor="currentColor"
    borderStyle="solid"
    borderWidth="3px 0 0 3px"
    height={{ base: '10px', md: '13px' }}
    left={direction === 'right' ? { base: '-1px', md: '-2px' } : undefined}
    position="relative"
    transform={direction === 'left' ? 'rotate(-45deg)' : 'rotate(135deg)'}
    width={{ base: '10px', md: '13px' }}
  />
);

export const ProfileImageLightbox = ({
  activeIndex,
  closeLabel,
  images,
  nextLabel,
  onClose,
  onSelect,
  previousLabel,
}: ProfileImageLightboxProps) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const activeImage = images[activeIndex];
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    return () => returnFocusRef.current?.focus();
  }, []);

  if (!activeImage) {
    return null;
  }

  const selectPrevious = () => onSelect((activeIndex - 1 + images.length) % images.length);
  const selectNext = () => onSelect((activeIndex + 1) % images.length);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    event.stopPropagation();

    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key === 'ArrowLeft' && hasMultipleImages) {
      event.preventDefault();
      selectPrevious();
      return;
    }

    if (event.key === 'ArrowRight' && hasMultipleImages) {
      event.preventDefault();
      selectNext();
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    const buttons = Array.from(
      dialogRef.current?.querySelectorAll<HTMLButtonElement>('button:not([disabled])') ?? [],
    );
    const firstButton = buttons[0];
    const lastButton = buttons.at(-1);

    if (event.shiftKey && firstButton?.matches(':focus')) {
      event.preventDefault();
      lastButton?.focus();
    } else if (!event.shiftKey && lastButton?.matches(':focus')) {
      event.preventDefault();
      firstButton?.focus();
    }
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <Portal>
      <Flex
        ref={dialogRef}
        alignItems="center"
        aria-label={activeImage.alt}
        aria-modal="true"
        background="rgba(19, 24, 18, 0.9)"
        backdropFilter="blur(9px)"
        inset={0}
        justifyContent="center"
        padding={{ base: '12px', md: '28px' }}
        position="fixed"
        role="dialog"
        zIndex={200}
        onClick={handleBackdropClick}
        onKeyDown={handleKeyDown}
      >
        <Flex
          alignItems="center"
          background="rgba(253, 250, 243, 0.98)"
          border="1px solid rgba(231, 220, 199, 0.72)"
          borderRadius={{ base: '12px', md: '16px' }}
          boxShadow="0 28px 100px rgba(0, 0, 0, 0.46)"
          direction="column"
          height="min(94dvh, 980px)"
          maxWidth="1440px"
          overflow="hidden"
          position="relative"
          width="100%"
        >
          <Flex
            alignItems="center"
            background="#e9e5da"
            flex={1}
            justifyContent="center"
            minHeight={0}
            overflow="hidden"
            position="relative"
            width="100%"
          >
            <Flex alignItems="center" gap="8px" position="absolute" right="12px" top="12px" zIndex={1}>
              {hasMultipleImages ? (
                <Text
                  background="rgba(253, 250, 243, 0.92)"
                  borderRadius="999px"
                  color="#4b5b48"
                  fontSize="0.85rem"
                  padding="7px 11px"
                  whiteSpace="nowrap"
                >
                  {activeIndex + 1} / {images.length}
                </Text>
              ) : null}
              <Button
                ref={closeButtonRef}
                aria-label={closeLabel}
                background="rgba(253, 250, 243, 0.92)"
                border="1px solid rgba(75, 94, 67, 0.38)"
                borderRadius="999px"
                boxShadow="0 5px 18px rgba(24, 34, 22, 0.2)"
                color="#334632"
                fontSize="24px"
                height={{ base: '40px', md: '44px' }}
                minWidth={{ base: '40px', md: '44px' }}
                padding={0}
                type="button"
                variant="plain"
                onClick={onClose}
                _hover={{ background: '#fffaf3' }}
              >
                ×
              </Button>
            </Flex>

            <Image
              alt={activeImage.alt}
              height="100%"
              objectFit="contain"
              src={activeImage.src}
              width="100%"
            />

            {hasMultipleImages ? (
              <>
                <Button
                  aria-label={previousLabel}
                  background="rgba(253, 250, 243, 0.9)"
                  border="1px solid rgba(75, 94, 67, 0.32)"
                  borderRadius="999px"
                  boxShadow="0 6px 22px rgba(24, 34, 22, 0.2)"
                  color="#263c29"
                  display="inline-flex"
                  height={{ base: '44px', md: '56px' }}
                  left={{ base: '8px', md: '28px' }}
                  minWidth={{ base: '44px', md: '56px' }}
                  padding={0}
                  position="absolute"
                  type="button"
                  variant="plain"
                  onClick={selectPrevious}
                  _hover={{ background: '#fffaf3', transform: 'scale(1.04)' }}
                >
                  <CarouselChevron direction="left" />
                </Button>
                <Button
                  aria-label={nextLabel}
                  background="rgba(253, 250, 243, 0.9)"
                  border="1px solid rgba(75, 94, 67, 0.32)"
                  borderRadius="999px"
                  boxShadow="0 6px 22px rgba(24, 34, 22, 0.2)"
                  color="#263c29"
                  display="inline-flex"
                  height={{ base: '44px', md: '56px' }}
                  minWidth={{ base: '44px', md: '56px' }}
                  padding={0}
                  position="absolute"
                  right={{ base: '8px', md: '20px' }}
                  type="button"
                  variant="plain"
                  onClick={selectNext}
                  _hover={{ background: '#fffaf3', transform: 'scale(1.04)' }}
                >
                  <CarouselChevron direction="right" />
                </Button>
              </>
            ) : null}
          </Flex>

          <Box
            background="#fdfaf3"
            minHeight={{ base: '54px', md: '62px' }}
            padding={{ base: '12px 18px', md: '15px 24px' }}
            textAlign="center"
            width="100%"
          >
            <Text color="#4b5b48" fontSize={{ base: '0.86rem', md: '0.96rem' }} lineHeight={1.4}>
              {activeImage.alt}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Portal>
  );
};
