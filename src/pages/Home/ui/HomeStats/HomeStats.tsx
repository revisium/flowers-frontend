import { Flex, Grid, Text } from '@chakra-ui/react';

import type { HomeStatCard } from '../../model/homePageData';
import { StatIconBox } from '../StatIconBox/StatIconBox';

interface HomeStatsProps {
  readonly cards: readonly HomeStatCard[];
}

export const HomeStats = ({ cards }: HomeStatsProps) => {
  return (
    <Grid
      gap={{ base: '10px', sm: '12px' }}
      gridTemplateColumns="repeat(4, minmax(118px, 1fr))"
      marginTop="28px"
      overflowX={{ base: 'auto', md: 'visible' }}
    >
      {cards.map((card) => (
        <Flex
          alignItems="center"
          aspectRatio={{ base: 'auto', sm: '1 / 1' }}
          background="rgba(255, 252, 246, 0.72)"
          border="1px solid rgba(131, 112, 82, 0.12)"
          borderRadius="8px"
          boxShadow="0 18px 46px rgba(92, 77, 46, 0.1)"
          flexDirection="column"
          justifyContent="center"
          key={card.label}
          minHeight={{ base: '94px', sm: '112px' }}
          minWidth={{ base: '132px', md: 'auto' }}
          padding={{ base: '12px', sm: '16px' }}
          textAlign="center"
        >
          <StatIconBox icon={card.icon} />
          <Text
            as="strong"
            color="#2d3c2d"
            fontSize={{ base: '1.55rem', sm: '2rem' }}
            lineHeight={1}
          >
            {card.value}
          </Text>
          <Text
            as="span"
            color="#4d5548"
            fontSize={{ base: '0.78rem', sm: '0.9rem' }}
            marginTop={{ base: '5px', sm: '8px' }}
          >
            {card.label}
          </Text>
        </Flex>
      ))}
    </Grid>
  );
};
