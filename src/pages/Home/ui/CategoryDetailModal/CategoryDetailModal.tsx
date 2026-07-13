import { Box, Flex } from '@chakra-ui/react';
import { useLayoutEffect, useRef, useState, type MouseEvent } from 'react';
import { collectionPlants, type CollectionPlant } from 'src/entities/collection';
import type { Locale } from 'src/shared/config';

import { type CategoryDetailData } from './types';
import { CategoryCollectionSection } from '../CategoryCollectionSection/CategoryCollectionSection';
import { CategoryHero } from '../CategoryHero/CategoryHero';
import { CategoryInfoGrid } from '../CategoryInfoGrid/CategoryInfoGrid';
import { PlantProfileTemplate } from '../PlantProfileTemplate/PlantProfileTemplate';
import { useModalFocusTrap } from './useModalFocusTrap';

interface CategoryDetailModalProps {
  readonly data: CategoryDetailData;
  readonly locale: Locale;
  readonly onClose: () => void;
}

export const CategoryDetailModal = ({ data, locale, onClose }: CategoryDetailModalProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const [selectedPlant, setSelectedPlant] = useState<CollectionPlant | null>(null);
  const titleId = `${data.latinName.toLowerCase()}-modal-title`;
  const { handleKeyDown, isOpen } = useModalFocusTrap({ cardRef, closeButtonRef, onClose });

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useLayoutEffect(() => {
    if (selectedPlant) {
      dialogRef.current?.scrollTo({ behavior: 'auto', top: 0 });
    }
  }, [selectedPlant]);

  return (
    <Flex
      ref={dialogRef}
      alignItems="center"
      aria-label={selectedPlant ? selectedPlant.name[locale] : undefined}
      aria-labelledby={selectedPlant ? undefined : titleId}
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
        {selectedPlant ? (
          <PlantProfileTemplate locale={locale} plant={selectedPlant} onBack={() => setSelectedPlant(null)} onClose={onClose} />
        ) : (
          <>
            <CategoryHero
              closeButtonRef={closeButtonRef}
              data={data}
              titleId={titleId}
              onClose={onClose}
            />
            <CategoryInfoGrid data={data} />
            <CategoryCollectionSection
              data={data}
              onPlantOpen={(plantId) => setSelectedPlant(collectionPlants.find((plant) => plant.id === plantId) ?? null)}
            />
          </>
        )}
      </Box>
    </Flex>
  );
};
