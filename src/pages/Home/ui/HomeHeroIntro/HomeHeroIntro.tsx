import { Flex } from '@chakra-ui/react';

import type { HomeCopy, HomeHeroStat } from '../../model/homePageData';
import { HomeHeroContent } from '../HomeHeroContent/HomeHeroContent';

interface HomeHeroIntroProps {
  readonly onCollectionOpen: () => void;
  readonly stats: readonly HomeHeroStat[];
  readonly text: HomeCopy;
}

export const HomeHeroIntro = ({ onCollectionOpen, stats, text }: HomeHeroIntroProps) => {
  return (
    <Flex
      align="flex-start"
      direction="column"
      justify="center"
      maxWidth={{ base: '580px', md: '610px', lg: '680px' }}
      padding={{ base: '42px 22px', md: '28px 34px', lg: '54px 58px' }}
      width="100%"
    >
      <HomeHeroContent onCollectionOpen={onCollectionOpen} stats={stats} text={text} />
    </Flex>
  );
};
