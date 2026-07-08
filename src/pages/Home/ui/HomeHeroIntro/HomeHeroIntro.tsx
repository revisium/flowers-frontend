import { Box, Text } from '@chakra-ui/react';

import { homeStatCards } from '../../model/homePageData';
import { HomeActions } from '../HomeActions/HomeActions';
import { HomeStats } from '../HomeStats/HomeStats';

export const HomeHeroIntro = () => {
  return (
    <Box
      marginLeft={{ base: 0, md: 'clamp(8px, 4vw, 84px)' }}
      marginTop={{ base: '34px', md: 'clamp(52px, 8vw, 92px)' }}
      maxWidth={{ base: '358px', md: '600px' }}
      position="relative"
      zIndex={1}
    >
      <Text
        as="h1"
        color="#263a2c"
        letterSpacing={0}
        margin={0}
        maxWidth="500px"
        textStyle={{ base: 'regular-h1', md: 'regular-dp' }}
      >
        Доброе утро, Наташа!
      </Text>
      <Text color="#314235" marginTop="24px" textStyle={{ base: 'regular-md', md: 'regular-xl' }}>
        Ваша оранжерея цветет и растет
      </Text>

      <HomeStats cards={homeStatCards} />
      <HomeActions />
    </Box>
  );
};
