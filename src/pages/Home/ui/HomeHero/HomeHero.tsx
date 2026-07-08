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
      border="3px solid green"
      backgroundImage=" url('/greenhouse-home-hero.png')"
      backgroundPosition="top center"
      backgroundRepeat="no-repeat"
      backgroundSize="contain"
      aspectRatio={{ base: 'auto', md: '1535 / 924' }}
      backgroundColor="#f2eadb"
      minHeight={{ base: 'min(70vh, 760px)', md: 'auto' }}
      position="relative"
    >
      {/*<Flex*/}
      {/*  border="3px solid green"*/}
      {/*  bottom={0}*/}
      {/*  height="28%"*/}
      {/*  left={0}*/}
      {/*  pointerEvents="none"*/}
      {/*  position="absolute"*/}
      {/*  right={0}*/}
      {/*/>*/}

      <Flex
        border="3px solid blue"
        width="100%"
        h="100%"
        // padding="clamp(22px, 4vw, 56px) clamp(16px, 3.2vw, 44px) clamp(28px, 4vw, 44px)"
      >
        <HomeHeroIntro text={text} />
        <HomeStats cards={homeStatCards[locale]} />
      </Flex>
    </Flex>
  );
};
