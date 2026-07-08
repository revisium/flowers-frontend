import { Box } from '@chakra-ui/react';

import { DayReminderCard } from '../DayReminderCard/DayReminderCard';
import { HomeHeader } from '../HomeHeader/HomeHeader';
import { HomeHeroIntro } from '../HomeHeroIntro/HomeHeroIntro';

export function HomeHero() {
  return (
    <Box
      backgroundImage=" url('/greenhouse-home-hero.png')"
      backgroundPosition="top center"
      backgroundRepeat="no-repeat"
      backgroundSize="contain"
      aspectRatio={{ base: 'auto', md: '1535 / 1024' }}
      backgroundColor="#f2eadb"
      minHeight={{ base: '760px', md: 'auto' }}
      padding="clamp(14px, 2.2vw, 24px) clamp(16px, 3.2vw, 44px) clamp(28px, 4vw, 44px)"
      position="relative"
    >
      <Box
        // background="linear-gradient(180deg, rgba(255, 252, 244, 0.16), rgba(255, 252, 244, 0.72))"
        bottom={0}
        height="28%"
        left={0}
        pointerEvents="none"
        position="absolute"
        right={0}
      />

      <HomeHeader />
      <HomeHeroIntro />
      <DayReminderCard />
    </Box>
  );
}
