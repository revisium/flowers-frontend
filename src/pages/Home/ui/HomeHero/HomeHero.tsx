import { Flex } from '@chakra-ui/react';
import type { Locale } from 'src/shared/config';

import { type HomeCopy } from '../../model/homePageData';
import { HomeHeroIntro } from '../HomeHeroIntro/HomeHeroIntro';

interface HomeHeroProps {
  readonly locale: Locale;
  readonly text: HomeCopy;
}

export const HomeHero = ({ text }: HomeHeroProps) => {
  return (
    <Flex
      backgroundImage=" url('/greenhouse-home-hero.png')"
      backgroundPosition="top center"
      backgroundRepeat="no-repeat"
      backgroundSize="contain"
      aspectRatio="1535 / 924"
      backgroundColor="#f2eadb"
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        gap={{ base: '18px', md: '20px' }}
        h="100%"
        justify={{ base: 'flex-start', md: 'space-between' }}
        paddingTop={{ base: '94px', md: 0 }}
        width="100%"
      >
        <HomeHeroIntro text={text} />
      </Flex>
    </Flex>
  );
};
