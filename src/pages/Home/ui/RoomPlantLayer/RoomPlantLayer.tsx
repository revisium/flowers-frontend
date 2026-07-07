import { Box, Image, Text } from '@chakra-ui/react';

import type { Locale, PlantCategory } from '../../model/homeModel';
import { createPlantItemViewModels } from '../../model/plantItemViewModel';

interface RoomPlantLayerProps {
  readonly activeCategory: PlantCategory;
  readonly locale: Locale;
  readonly query: string;
}

export function RoomPlantLayer({ activeCategory, locale, query }: RoomPlantLayerProps) {
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
          role="img"
          top={plant.position.top}
          width={plant.position.width}
          zIndex={4}
          _hover={{
            '& .room-plant__label': {
              opacity: 1,
              transform: 'translate(-50%, -10px)',
            },
            '& .room-plant__image': {
              filter: 'drop-shadow(0 18px 28px rgba(20, 18, 12, 0.26))',
            },
          }}
        >
          <Image
            alt=""
            className="room-plant__image"
            draggable={false}
            pointerEvents="none"
            src={plant.image}
            width="100%"
          />
          <Text
            as="figcaption"
            className="room-plant__label"
            background="rgba(255, 248, 233, 0.9)"
            borderRadius="999px"
            bottom="100%"
            boxShadow="0 12px 26px rgba(42, 34, 17, 0.18)"
            color="#32432d"
            fontSize="0.78rem"
            fontWeight={700}
            left="50%"
            opacity={0}
            padding="7px 10px"
            pointerEvents="none"
            position="absolute"
            transform="translate(-50%, 0)"
            transition="opacity 160ms ease, transform 160ms ease"
            whiteSpace="nowrap"
          >
            {plant.name}
          </Text>
        </Box>
      ))}
    </Box>
  );
}
