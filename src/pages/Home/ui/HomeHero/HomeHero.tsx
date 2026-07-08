import { Box } from '@chakra-ui/react';
import type { Locale } from 'src/shared/config';

import type { HomeCopy } from '../../model/homePageData';
// import { DayReminderCard } from '../DayReminderCard/DayReminderCard';
import { HomeHeroIntro } from '../HomeHeroIntro/HomeHeroIntro';

interface HomeHeroProps {
  readonly locale: Locale;
  readonly text: HomeCopy;
}

export const HomeHero = ({ locale, text }: HomeHeroProps) => {
  return (
    <Box
      backgroundImage=" url('/greenhouse-home-hero.png')"
      backgroundPosition="top center"
      backgroundRepeat="no-repeat"
      backgroundSize="contain"
      aspectRatio={{ base: 'auto', md: '1535 / 924' }}
      backgroundColor="#f2eadb"
      minHeight={{ base: 'min(70vh, 760px)', md: 'auto' }}
      position="relative"
    >
      <Box bottom={0} height="28%" left={0} pointerEvents="none" position="absolute" right={0} />

      <Box padding="clamp(22px, 4vw, 56px) clamp(16px, 3.2vw, 44px) clamp(28px, 4vw, 44px)">
        <HomeHeroIntro locale={locale} text={text} />
        {/*<DayReminderCard text={text} />*/}
      </Box>
    </Box>
  );
};
