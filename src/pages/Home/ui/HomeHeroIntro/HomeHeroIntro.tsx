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
      padding={{ base: '120px 22px 42px', md: '96px 34px 28px', lg: '116px 58px 54px' }}
      width="100%"
    >
      <HomeHeroContent onCollectionOpen={onCollectionOpen} stats={stats} text={text} />
    </Flex>
  );
};
