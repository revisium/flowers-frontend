import { Box, Flex, Grid, Image, Text } from '@chakra-ui/react';

import { InfoPanel } from './InfoPanel';
import { type CategoryDetailData } from './types';

interface CategoryInfoGridProps {
  readonly data: CategoryDetailData;
}

export const CategoryInfoGrid = ({ data }: CategoryInfoGridProps) => (
  <Grid
    alignItems="stretch"
    gap="8px"
    gridTemplateColumns={{
      base: '1fr',
      md: 'repeat(2, minmax(0, 1fr))',
      lg: 'repeat(3, minmax(0, 1fr))',
    }}
    padding={{ base: '0 18px 18px', md: '0 34px 26px' }}
    position="relative"
    zIndex={2}
  >
    <Box gridColumn={{ base: 'auto', md: '1 / -1', lg: 'auto' }} height="100%">
      <InfoPanel title="Происхождение">
        <Box
          alignItems="center"
          display="flex"
          height="150px"
          justifyContent="center"
          marginBottom="18px"
          overflow="visible"
        >
          <Image alt="" height="100%" objectFit="contain" src={data.origin.mapImage} width="100%" />
        </Box>
        <Text color="#5d675b" fontSize="0.9rem" lineHeight={1.55}>
          {data.origin.text}
        </Text>
      </InfoPanel>
    </Box>

    <InfoPanel title="Отличительные признаки">
      {data.traits.map((trait) => (
        <Flex alignItems="center" gap="12px" key={trait.body}>
          <Image
            alt=""
            borderRadius="8px"
            height="36px"
            objectFit="cover"
            src={trait.image}
            width="36px"
          />
          <Text color="#465247" fontSize="0.9rem" lineHeight={1.5}>
            {trait.body}
          </Text>
        </Flex>
      ))}
    </InfoPanel>

    <InfoPanel title="Интересные факты">
      {data.facts.map((fact) => (
        <Flex alignItems="flex-start" gap="13px" key={fact}>
          <Box
            background="#758f62"
            borderRadius="999px"
            flexShrink={0}
            height="4px"
            marginTop="10px"
            width="4px"
          />
          <Text color="#465247" fontSize="0.9rem" lineHeight={1.58}>
            {fact}
          </Text>
        </Flex>
      ))}
    </InfoPanel>
  </Grid>
);
