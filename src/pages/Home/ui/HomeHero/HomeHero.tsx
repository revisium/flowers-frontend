import { Box } from '@chakra-ui/react';

import { DayReminderCard } from '../DayReminderCard/DayReminderCard';
import { HomeHeader } from '../HomeHeader/HomeHeader';
import { HomeHeroIntro } from '../HomeHeroIntro/HomeHeroIntro';

export function HomeHero() {
  return (
    <Box
      backgroundImage="linear-gradient(90deg, rgba(248, 241, 229, 0.92) 0%, rgba(248, 241, 229, 0.7) 37%, rgba(248, 241, 229, 0.08) 76%), url('/greenhouse-home-hero.png')"
      backgroundPosition="center"
      backgroundSize="cover"
      minHeight="min(70vh, 760px)"
      padding="clamp(14px, 2.2vw, 24px) clamp(16px, 3.2vw, 44px) clamp(28px, 4vw, 44px)"
      position="relative"
    >
      <Box
        background="linear-gradient(180deg, rgba(255, 252, 244, 0.16), rgba(255, 252, 244, 0.72))"
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
