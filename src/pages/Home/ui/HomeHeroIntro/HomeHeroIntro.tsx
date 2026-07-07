import { Box, Text } from '@chakra-ui/react';

import { homeStatCards } from '../../model/homePageData';
import { HomeActions } from '../HomeActions/HomeActions';
import { HomeStats } from '../HomeStats/HomeStats';

export function HomeHeroIntro() {
  return (
    <Box marginLeft={{ base: 0, md: 'clamp(8px, 4vw, 84px)' }} marginTop={{ base: '34px', md: 'clamp(52px, 8vw, 92px)' }} maxWidth={{ base: '358px', md: '600px' }} position="relative" zIndex={1}>
      <Text
        as="h1"
        color="#263a2c"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize={{ base: 'clamp(2.8rem, 14vw, 4rem)', md: 'clamp(3rem, 5.4vw, 5rem)' }}
        fontWeight={400}
        letterSpacing={0}
        lineHeight={1.15}
        margin={0}
        maxWidth="500px"
      >
        Доброе утро, Наташа!
      </Text>
      <Text color="#314235" fontSize="clamp(1.1rem, 1.7vw, 1.45rem)" marginTop="24px">
        Ваша оранжерея цветет и растет
      </Text>

      <HomeStats cards={homeStatCards} />
      <HomeActions />
    </Box>
  );
}
