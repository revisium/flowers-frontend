import { Flex } from '@chakra-ui/react';

import { type HomeCopy } from '../../model/homePageData';
import { HomeHeroIntro } from '../HomeHeroIntro/HomeHeroIntro';

interface HomeHeroProps {
  readonly text: HomeCopy;
}

export const HomeHero = ({ text }: HomeHeroProps) => {
  return (
    <Flex
      backgroundImage=" url('/greenhouse-home-hero.png')"
      backgroundPosition="top center"
      backgroundRepeat="no-repeat"
      backgroundSize={{ base: 'cover', md: 'contain' }}
      aspectRatio={{ base: 'auto', md: '1535 / 924' }}
      backgroundColor="#f2eadb"
      minHeight={{ base: '560px', md: 'auto' }}
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        gap={{ base: '18px', md: '20px' }}
        h="100%"
        justify={{ base: 'flex-start', md: 'space-between' }}
        paddingTop={{ base: '126px', md: 0 }}
        width="100%"
      >
        <HomeHeroIntro text={text} />
      </Flex>
    </Flex>
  );
};
