import { Box, Button, Image, Text } from '@chakra-ui/react';

import type { CollectionCopy, Locale, PlantCategory } from '../../model/collectionModel';
import { createPlantItemViewModels } from '../../model/plantItemViewModel';

interface RoomPlantLayerProps {
  readonly activeCategory: PlantCategory;
  readonly locale: Locale;
  readonly query: string;
  readonly text: CollectionCopy;
  readonly onPlantSelect: (plantId: string) => void;
}

export function RoomPlantLayer({
  activeCategory,
  locale,
  onPlantSelect,
  query,
  text,
}: RoomPlantLayerProps) {
  const plantItems = createPlantItemViewModels({ activeCategory, locale, query });

  return (
    <Box aria-live="polite">
      {plantItems.map((plant) => (
        <Box
          aria-label={plant.name}
          as="figure"
          key={plant.id}
          lineHeight={0}
          margin={0}
          position="absolute"
          left={plant.position.left}
          top={plant.position.top}
          width={plant.position.width}
          zIndex={4}
          _hover={{
            '& [data-plant-image]': {
              filter: 'drop-shadow(0 18px 28px rgba(20, 18, 12, 0.26))',
            },
            '& [data-plant-plate]': {
              opacity: 0.82,
              pointerEvents: 'auto',
              transform: 'translate(-50%, -50%)',
            },
          }}
          _focusWithin={{
            '& [data-plant-plate]': {
              opacity: 0.82,
              pointerEvents: 'auto',
              transform: 'translate(-50%, -50%)',
            },
          }}
        >
          <Image
            alt=""
            data-plant-image=""
            draggable={false}
            pointerEvents="none"
            src={plant.image}
            transition="filter 160ms ease, transform 160ms ease"
            width="100%"
          />
          <Box
            as="figcaption"
            data-plant-plate=""
            background="rgba(255, 249, 236, 0.74)"
            border="1px solid rgba(235, 220, 190, 0.48)"
            borderRadius="14px"
            boxShadow="0 12px 26px rgba(42, 34, 17, 0.12)"
            color="#32432d"
            left="50%"
            lineHeight={1.3}
            minWidth="190px"
            opacity={0}
            padding="10px 12px"
            pointerEvents="none"
            position="absolute"
            top="42%"
            transform="translate(-50%, -42%)"
            transition="opacity 160ms ease, transform 160ms ease"
            width="max-content"
            zIndex={6}
          >
            <Text textStyle="bold-md">
              {plant.name}
            </Text>
            <Text color="#6f755f" fontSize="0.7rem" fontWeight={700} letterSpacing="0.08em" textTransform="uppercase">
              {plant.category}
            </Text>
            <Button
              alignSelf="flex-start"
              background="#496f3f"
              borderRadius="999px"
              color="#fff8ec"
              fontSize="0.72rem"
              height="26px"
              marginTop="8px"
              minWidth="auto"
              paddingInline="11px"
              type="button"
              variant="plain"
              _hover={{ background: '#365d32' }}
              onClick={() => {
                onPlantSelect(plant.id);
              }}
            >
              {text.cardAction}
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
