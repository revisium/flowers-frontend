import { Flex, Text } from '@chakra-ui/react';

import type { HomeStatCard } from '../../model/homePageData';
import { StatIconBox } from '../StatIconBox/StatIconBox';

interface HomeStatsProps {
  readonly cards: readonly HomeStatCard[];
}

export const HomeStats = ({ cards }: HomeStatsProps) => {
  return (
    <Flex gap="12px" p="100px 40px 18px">
      {cards.map((card) => (
        <Flex
          key={card.label}
          w="100px"
          h="100px"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p="8px"
          background="rgba(255, 252, 246, 0.72)"
          border="1px solid rgba(131, 112, 82, 0.12)"
          borderRadius="8px"
          boxShadow="0 18px 46px rgba(92, 77, 46, 0.1)"
        >
          <StatIconBox icon={card.icon} />
          <Text color="#2d3c2d" textStyle="semibold-md">
            {card.value}
          </Text>
          <Text color="#4d5548" textStyle="regular-xxs">
            {card.label}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};
