import { Box } from '@chakra-ui/react';

import { DayReminderCard } from '../DayReminderCard/DayReminderCard';
import { HomeHeader } from '../HomeHeader/HomeHeader';
import { HomeHeroIntro } from '../HomeHeroIntro/HomeHeroIntro';

export const HomeHero = () => {
  return (
    <Box
      backgroundImage=" url('/greenhouse-home-hero.png')"
      backgroundPosition="top center"
      backgroundRepeat="no-repeat"
      backgroundSize="contain"
      aspectRatio={{ base: 'auto', md: '1535 / 1024' }}
      backgroundColor="#f2eadb"
      minHeight={{ base: 'min(70vh, 760px)', md: 'auto' }}
      position="relative"
    >
      <Box bottom={0} height="28%" left={0} pointerEvents="none" position="absolute" right={0} />

      <HomeHeader />
      <Box padding="clamp(22px, 4vw, 56px) clamp(16px, 3.2vw, 44px) clamp(28px, 4vw, 44px)">
        <HomeHeroIntro />
        <DayReminderCard />
      </Box>
    </Box>
  );
};
