import { Flex, Grid, Text } from '@chakra-ui/react';

import type { HomeHeroStat } from '../../model/homePageData';

interface HomeStatsProps {
  readonly stats: readonly HomeHeroStat[];
}

export const HomeStats = ({ stats }: HomeStatsProps) => {
  return (
    <Grid
      gap={{ base: '14px 20px', sm: '18px' }}
      marginTop={{ base: '24px', md: '20px', lg: '28px' }}
      maxWidth="500px"
      templateColumns={{ base: 'repeat(2, minmax(0, 1fr))', sm: 'repeat(4, minmax(0, 1fr))' }}
      width="100%"
    >
      {stats.map((stat) => (
        <Flex key={stat.label} align="flex-start" direction="column" minWidth={0}>
          <Text
            color="#2f3c2f"
            fontSize={{ base: '1.35rem', md: '1.55rem' }}
            fontWeight={650}
            lineHeight={1}
          >
            {stat.value}
          </Text>
          <Text color="#66705f" fontSize="0.72rem" lineHeight={1.25} marginTop="7px">
            {stat.label}
          </Text>
        </Flex>
      ))}
    </Grid>
  );
};
