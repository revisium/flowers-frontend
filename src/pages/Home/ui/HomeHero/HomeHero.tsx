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
      minHeight={{ base: 'min(70vh, 760px)', md: 'auto' }}
    >
      <Flex width="100%" h="100%" justify="space-between" gap="20px">
        <HomeHeroIntro text={text} />
        <HomeStats cards={homeStatCards[locale]} />
      </Flex>
    </Flex>
  );
};
