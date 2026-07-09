import { Box, Flex } from '@chakra-ui/react';
import { type KeyboardEvent, useEffect, useRef, useState } from 'react';

import { CategoryCollectionSection } from './CategoryCollectionSection';
import { CategoryHero } from './CategoryHero';
import { CategoryInfoGrid } from './CategoryInfoGrid';
import { type CategoryDetailData } from './types';

interface CategoryDetailModalProps {
  readonly data: CategoryDetailData;
  readonly onClose: () => void;
}

export const CategoryDetailModal = ({ data, onClose }: CategoryDetailModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const titleId = `${data.latinName.toLowerCase()}-modal-title`;

  useEffect(() => {
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const frame = window.requestAnimationFrame(() => {
      setIsOpen(true);
      closeButtonRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(frame);
      previousFocusRef.current?.focus();
    };
  }, []);

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      onClose();
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    const focusableElements = cardRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const focusable = Array.from(focusableElements ?? []).filter((element) => element.offsetParent);
    const firstElement = focusable.at(0);
    const lastElement = focusable.at(-1);

    if (!firstElement || !lastElement) {
      event.preventDefault();
      return;
    }

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  return (
    <Flex
      alignItems="flex-start"
      aria-labelledby={titleId}
      aria-modal="true"
      background="rgba(34, 29, 18, 0.28)"
      inset={0}
      justifyContent="center"
      overflowY="auto"
      padding={{ base: '14px', md: '28px' }}
      position="fixed"
      role="dialog"
      tabIndex={-1}
      zIndex={80}
      onKeyDown={handleDialogKeyDown}
    >
      <Box
        ref={cardRef}
        background="linear-gradient(135deg, rgba(255, 253, 247, 0.99), rgba(248, 242, 230, 0.98))"
        border="1px solid rgba(218, 204, 178, 0.9)"
        borderRadius={{ base: '12px', md: '14px' }}
        boxShadow="0 24px 90px rgba(46, 38, 24, 0.28)"
        maxWidth="1180px"
        opacity={isOpen ? 1 : 0}
        overflow="hidden"
        position="relative"
        transform={isOpen ? 'translateY(0) scale(1)' : 'translateY(18px) scale(0.985)'}
        transition="opacity 220ms ease, transform 260ms ease"
        width="100%"
      >
        <CategoryHero
          closeButtonRef={closeButtonRef}
          data={data}
          titleId={titleId}
          onClose={onClose}
        />
        <CategoryInfoGrid data={data} />
        <CategoryCollectionSection data={data} />
      </Box>
    </Flex>
  );
};
