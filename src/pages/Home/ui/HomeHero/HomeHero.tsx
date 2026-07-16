import { Box, Flex } from '@chakra-ui/react';

import { type HomeCopy, type HomeHeroStat } from '../../model/homePageData';
import { HomeHeroIntro } from '../HomeHeroIntro/HomeHeroIntro';

interface HomeHeroProps {
  readonly onCollectionOpen: () => void;
  readonly stats: readonly HomeHeroStat[];
  readonly text: HomeCopy;
}

export const HomeHero = ({ onCollectionOpen, stats, text }: HomeHeroProps) => {
  return (
    <Flex
      as="section"
      aspectRatio={{ base: 'auto', md: '1535 / 924' }}
      backgroundColor="#f2eadb"
      backgroundImage="url('/greenhouse-home-hero.png')"
      backgroundPosition="top center"
      backgroundRepeat="no-repeat"
      backgroundSize={{ base: 'cover', md: 'contain' }}
      flexShrink={0}
      minHeight={{ base: '560px', md: '540px', lg: 'auto' }}
      overflow="hidden"
      position="relative"
    >
      <Box
        background={{
          base: 'linear-gradient(180deg, rgba(241,235,221,.92) 0%, rgba(241,235,221,.78) 52%, rgba(241,235,221,.08) 100%)',
          md: 'linear-gradient(90deg, rgba(241,235,221,.96) 0%, rgba(241,235,221,.88) 48%, rgba(241,235,221,.58) 72%, rgba(241,235,221,.2) 100%)',
          lg: 'linear-gradient(90deg, rgba(241,235,221,.94) 0%, rgba(241,235,221,.82) 38%, rgba(241,235,221,.38) 65%, rgba(241,235,221,0) 88%)',
          xl: 'linear-gradient(90deg, rgba(241,235,221,.92) 0%, rgba(241,235,221,.72) 25%, rgba(241,235,221,.16) 43%, rgba(241,235,221,0) 56%)',
        }}
        inset={0}
        position="absolute"
      />
      <Flex h="100%" position="relative" width="100%" zIndex={1}>
        <HomeHeroIntro onCollectionOpen={onCollectionOpen} stats={stats} text={text} />
      </Flex>
    </Flex>
  );
};
