import { Box, Button, Image, Text } from '@chakra-ui/react';

import { plants, type Locale, type Plant, type PlantCategory } from '../../model/homeModel';

interface RoomPlantLayerProps {
  readonly activeCategory: PlantCategory;
  readonly locale: Locale;
  readonly query: string;
}

function getPlantName(plant: Plant, locale: Locale) {
  return locale === 'ru' ? plant.name : plant.nameEn;
}

function matchesQuery(plant: Plant, locale: Locale, query: string) {
  const normalizedQuery = query.trim().toLocaleLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  return [plant.name, plant.nameEn, plant.latinName, getPlantName(plant, locale)].some((value) =>
    value.toLocaleLowerCase().includes(normalizedQuery),
  );
}

export function RoomPlantLayer({ activeCategory, locale, query }: RoomPlantLayerProps) {
  const visiblePlants = plants.filter((plant) => {
    const categoryMatches = activeCategory === 'all' || plant.category === activeCategory;

    return categoryMatches && matchesQuery(plant, locale, query);
  });

  return (
    <Box aria-live="polite">
      {visiblePlants.map((plant) => {
        const name = getPlantName(plant, locale);

        return (
          <Button
            aria-label={name}
            background="transparent"
            border={0}
            height="auto"
            key={plant.id}
            lineHeight={0}
            minHeight={0}
            padding={0}
            position="absolute"
            left={`${plant.x}px`}
            top={`${plant.y}px`}
            type="button"
            variant="plain"
            width={`${plant.width}px`}
            zIndex={4}
            _focusVisible={{
              outline: '2px solid rgba(241, 217, 143, 0.95)',
              outlineOffset: '6px',
            }}
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
              alt={name}
              className="room-plant__image"
              draggable={false}
              pointerEvents="none"
              src={plant.image}
              width="100%"
            />
            <Text
              as="span"
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
              {name}
            </Text>
          </Button>
        );
      })}
    </Box>
  );
}
