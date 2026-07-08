import { Box, Button } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { GreenhouseMenu, type GreenhouseMenuLocale } from 'src/widgets/GreenhouseMenu';

import type { CollectionCopy, Locale, PlantCategory } from '../../model/collectionModel';
import { createPlantCardViewModel } from '../../model/plantCardViewModel';
import { PlantFolioCard } from '../PlantFolioCard/PlantFolioCard';
import { RoomAmbientInfo } from '../RoomAmbientInfo/RoomAmbientInfo';
import { RoomPlantLayer } from '../RoomPlantLayer/RoomPlantLayer';
import { RoomSidebar } from '../RoomSidebar/RoomSidebar';

interface RoomSceneProps {
  readonly activeCategory: PlantCategory;
  readonly locale: Locale;
  readonly query: string;
  readonly selectedPlantId: string | null;
  readonly text: CollectionCopy;
  readonly onCategoryChange: (category: PlantCategory) => void;
  readonly onLocaleChange: (locale: Locale) => void;
  readonly onPlantClose: () => void;
  readonly onPlantSelect: (plantId: string) => void;
  readonly onQueryChange: (query: string) => void;
}

export const RoomScene = ({
  activeCategory,
  locale,
  onCategoryChange,
  onLocaleChange,
  onPlantClose,
  onPlantSelect,
  onQueryChange,
  query,
  selectedPlantId,
  text,
}: RoomSceneProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const selectedPlant = createPlantCardViewModel(selectedPlantId, locale);

  const updateScrollHints = useCallback(() => {
    const element = scrollRef.current;

    if (!element) {
      return;
    }

    setCanScrollLeft(element.scrollLeft > 8);
    setCanScrollRight(element.scrollLeft + element.clientWidth < element.scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateScrollHints();
    const animationFrame = window.requestAnimationFrame(updateScrollHints);
    window.addEventListener('resize', updateScrollHints);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', updateScrollHints);
    };
  }, [updateScrollHints]);

  const scrollRoom = (direction: 'left' | 'right') => {
    scrollRef.current?.scrollBy({
      behavior: 'smooth',
      left: direction === 'left' ? -420 : 420,
    });
  };

  return (
    <Box
      as="section"
      aria-label={text.sceneLabel}
      background="#211b0f"
      height="100%"
      overflow="hidden"
      position="relative"
    >
      <Box
        ref={scrollRef}
        height="100%"
        overflow="auto"
        overscrollBehavior="contain"
        onScroll={updateScrollHints}
      >
        <Box
          backgroundImage="linear-gradient(90deg, rgba(30, 26, 13, 0.82), rgba(30, 26, 13, 0.3) 24%, rgba(30, 26, 13, 0) 58%), linear-gradient(180deg, rgba(20, 26, 13, 0.02), rgba(20, 26, 13, 0.34)), url('/greenhouse-room-empty.png')"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="100% 100%"
          height="941px"
          overflow="hidden"
          position="relative"
          width="1672px"
        >
          <RoomPlantLayer
            activeCategory={activeCategory}
            locale={locale}
            onPlantSelect={onPlantSelect}
            query={query}
            text={text}
          />
        </Box>
      </Box>

      <RoomSidebar
        activeCategory={activeCategory}
        locale={locale}
        onCategoryChange={onCategoryChange}
        text={text}
      />
      <Box left={0} position="absolute" right={0} top={0} zIndex={7}>
        <GreenhouseMenu
          languageLabel={text.languageLabel}
          locale={locale}
          logoTone="light"
          query={query}
          searchLabel={text.searchLabel}
          searchPlaceholder={text.searchPlaceholder}
          onLocaleChange={(nextLocale: GreenhouseMenuLocale) => {
            onLocaleChange(nextLocale);
          }}
          onQueryChange={onQueryChange}
        />
      </Box>
      <RoomAmbientInfo text={text} />

      {selectedPlant ? (
        <PlantFolioCard onClose={onPlantClose} plant={selectedPlant} text={text} />
      ) : null}

      <Button
        aria-hidden={!canScrollLeft}
        aria-label={text.scrollLeftLabel}
        background="rgba(255, 248, 233, 0.7)"
        border="1px solid rgba(255, 248, 233, 0.65)"
        borderRadius="999px"
        height="44px"
        left="16px"
        opacity={canScrollLeft ? 1 : 0}
        pointerEvents={canScrollLeft ? 'auto' : 'none'}
        position="absolute"
        tabIndex={canScrollLeft ? 0 : -1}
        top="50%"
        transform="translateY(-50%)"
        transition="opacity 120ms ease"
        type="button"
        variant="plain"
        width="44px"
        zIndex={10}
        onClick={() => {
          scrollRoom('left');
        }}
      >
        <Box
          borderBottom="7px solid transparent"
          borderRight="10px solid #416d3c"
          borderTop="7px solid transparent"
          height={0}
          margin="0 auto"
          width={0}
        />
      </Button>

      <Button
        aria-hidden={!canScrollRight}
        aria-label={text.scrollRightLabel}
        background="rgba(255, 248, 233, 0.7)"
        border="1px solid rgba(255, 248, 233, 0.65)"
        borderRadius="999px"
        height="44px"
        opacity={canScrollRight ? 1 : 0}
        pointerEvents={canScrollRight ? 'auto' : 'none'}
        position="absolute"
        right="16px"
        tabIndex={canScrollRight ? 0 : -1}
        top="50%"
        transform="translateY(-50%)"
        transition="opacity 120ms ease"
        type="button"
        variant="plain"
        width="44px"
        zIndex={10}
        onClick={() => {
          scrollRoom('right');
        }}
      >
        <Box
          borderBottom="7px solid transparent"
          borderLeft="10px solid #416d3c"
          borderTop="7px solid transparent"
          height={0}
          margin="0 auto"
          width={0}
        />
      </Button>
    </Box>
  );
};
