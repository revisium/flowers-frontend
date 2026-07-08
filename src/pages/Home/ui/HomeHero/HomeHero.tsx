import { Flex } from '@chakra-ui/react';
import type { Locale } from 'src/shared/config';

import { homeStatCards, type HomeCopy } from '../../model/homePageData';
import { HomeHeroIntro } from '../HomeHeroIntro/HomeHeroIntro';
import { HomeStats } from '../HomeStats/HomeStats';

interface HomeHeroProps {
  readonly locale: Locale;
  readonly text: HomeCopy;
}

export const HomeHero = ({ locale, text }: HomeHeroProps) => {
  return (
    <Flex
      backgroundImage=" url('/greenhouse-home-hero.png')"
      backgroundPosition="top center"
      backgroundRepeat="no-repeat"
      backgroundSize="contain"
      aspectRatio={{ base: 'auto', md: '1535 / 924' }}
      backgroundColor="#f2eadb"
      // minHeight={{ base: 'min(70vh, 760px)', md: 'auto' }}
    >
      <Flex
        // border="1px solid red"
        // alignItems={{ base: 'stretch', xl: 'stretch' }}
        direction={{ base: 'column', md: 'row' }}
        gap={{ base: '18px', md: '20px' }}
        h="100%"
        justify={{ base: 'flex-start', md: 'space-between' }}
        paddingTop={{ base: '94px', md: 0 }}
        width="100%"
      >
        <HomeHeroIntro text={text} />
        <HomeStats cards={homeStatCards[locale]} />
      </Flex>
    </Flex>
  );
};
