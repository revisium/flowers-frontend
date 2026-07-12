import { Box, Flex } from '@chakra-ui/react';
import { useRef, type MouseEvent } from 'react';

import { type CategoryDetailData } from '../AraceaeCategoryModal/types';
import { CategoryCollectionSection } from '../CategoryCollectionSection/CategoryCollectionSection';
import { CategoryHero } from '../CategoryHero/CategoryHero';
import { CategoryInfoGrid } from '../CategoryInfoGrid/CategoryInfoGrid';
import { useModalFocusTrap } from './useModalFocusTrap';

interface CategoryDetailModalProps {
  readonly data: CategoryDetailData;
  readonly onClose: () => void;
}

export const CategoryDetailModal = ({ data, onClose }: CategoryDetailModalProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const titleId = `${data.latinName.toLowerCase()}-modal-title`;
  const { handleKeyDown, isOpen } = useModalFocusTrap({ cardRef, closeButtonRef, onClose });

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <Flex
      alignItems="center"
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
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
    >
      <Box
        ref={cardRef}
        background="linear-gradient(135deg, rgba(255, 253, 247, 0.99), rgba(248, 242, 230, 0.98))"
        border="1px solid rgba(218, 204, 178, 0.9)"
        borderRadius={{ base: '12px', md: '14px' }}
        boxShadow="0 24px 90px rgba(46, 38, 24, 0.28)"
        maxWidth="1180px"
        marginY="auto"
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
