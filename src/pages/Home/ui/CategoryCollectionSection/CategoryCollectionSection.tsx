import { Box, Flex, Grid, Image, Text } from '@chakra-ui/react';

import { type CategoryDetailData } from '../AraceaeCategoryModal/types';
import { SproutIcon } from '../SproutIcon/SproutIcon';

interface CategoryCollectionSectionProps {
  readonly data: CategoryDetailData;
}

export const CategoryCollectionSection = ({ data }: CategoryCollectionSectionProps) => (
  <Box padding={{ base: '0 18px 22px', md: '0 34px 34px' }}>
    <Box
      background="rgba(255, 253, 247, 0.78)"
      border="1px solid rgba(218, 204, 178, 0.72)"
      borderRadius="13px"
      padding={{ base: '18px', md: '24px' }}
    >
      <Text
        as="h3"
        color="#25382b"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="1.45rem"
        marginBottom="20px"
      >
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
          <Box
            background="#fffdf7"
            border="1px solid rgba(218, 204, 178, 0.72)"
            borderRadius="9px"
            boxShadow="0 10px 22px rgba(76, 64, 42, 0.06)"
            key={plant.name}
            overflow="hidden"
          >
            <Image alt="" aspectRatio="1.25 / 1" objectFit="cover" src={plant.image} width="100%" />
            <Text
              color="#344334"
              fontSize="0.86rem"
              fontWeight={760}
              lineHeight={1.22}
              minHeight="42px"
              padding="10px"
            >
              {plant.name}
            </Text>
          </Box>
        ))}
      </Grid>
      <Flex
        alignItems="center"
        background="linear-gradient(90deg, rgba(235, 242, 218, 0.86), rgba(246, 248, 235, 0.94))"
        borderRadius="10px"
        color="#465247"
        fontSize={{ base: '0.86rem', md: '0.95rem' }}
        fontWeight={720}
        gap="12px"
        justifyContent="center"
        lineHeight={1.35}
        marginTop="18px"
        minHeight="48px"
        padding={{ base: '12px 14px', md: '12px 22px' }}
        textAlign="center"
      >
        <SproutIcon />
        {data.closingNote}
      </Flex>
    </Box>
  </Box>
);
