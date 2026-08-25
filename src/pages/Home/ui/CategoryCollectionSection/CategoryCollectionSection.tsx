import { Box, Button, Flex, Grid, Image, Text } from '@chakra-ui/react';

import { type CategoryDetailData } from '../CategoryDetailModal/types';

interface CategoryCollectionSectionProps {
  readonly data: CategoryDetailData;
  readonly onPlantOpen: (plantId: string) => void;
}

export const CategoryCollectionSection = ({
  data,
  onPlantOpen,
}: CategoryCollectionSectionProps) => (
  <Box padding={{ base: '0 18px 22px', md: '0 34px 34px' }} position="relative" zIndex={1}>
    <Box
      background="rgba(255, 253, 247, 0.78)"
      border="1px solid rgba(218, 204, 178, 0.72)"
      borderRadius="13px"
      padding={{ base: '18px', md: '24px' }}
    >
      <Text as="h3" color="#25382b" fontSize="1.45rem" marginBottom="20px" textStyle="serif">
        {data.collectionTitle}
      </Text>
      <Grid
        gap="16px"
        gridTemplateColumns={{
          base: 'repeat(2, minmax(0, 1fr))',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(5, 1fr)',
        }}
      >
        {data.collectionPlants.map((plant) => (
          <Button
            alignItems="stretch"
            background="#fffdf7"
            border="1px solid rgba(218, 204, 178, 0.72)"
            borderRadius="9px"
            boxShadow="0 10px 22px rgba(76, 64, 42, 0.06)"
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="flex-start"
            key={plant.name}
            minHeight={0}
            overflow="hidden"
            padding={0}
            textAlign="left"
            type="button"
            variant="plain"
            whiteSpace="normal"
            width="100%"
            onClick={() => onPlantOpen(plant.id)}
            _focusVisible={{ boxShadow: '0 0 0 3px rgba(94, 127, 57, 0.28)', outline: 'none' }}
            _hover={{
              borderColor: 'rgba(105, 145, 69, 0.62)',
              boxShadow: '0 12px 24px rgba(91, 76, 54, 0.13)',
              transform: 'translateY(-2px)',
            }}
          >
            <Flex
              aspectRatio="4 / 5"
              background="#f4ede0"
              borderRadius="9px"
              flex="0 0 auto"
              margin="10px 10px 0"
              overflow="hidden"
            >
              <Image
                alt=""
                decoding="async"
                height="100%"
                loading="lazy"
                objectFit="cover"
                src={plant.image.replace(/\.webp$/, '-catalog.webp')}
                width="100%"
              />
            </Flex>
            <Text
              color="#344334"
              fontSize="0.86rem"
              fontWeight={760}
              lineClamp={2}
              lineHeight={1.22}
              minHeight="42px"
              padding="10px 10px 12px"
            >
              {plant.name}
            </Text>
          </Button>
        ))}
      </Grid>
    </Box>
  </Box>
);
