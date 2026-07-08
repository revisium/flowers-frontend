import { Box, Text } from '@chakra-ui/react';
import type { Locale } from 'src/shared/config';

import { homeStatCards, type HomeCopy } from '../../model/homePageData';
import { HomeActions } from '../HomeActions/HomeActions';
import { HomeStats } from '../HomeStats/HomeStats';

interface HomeHeroIntroProps {
  readonly locale: Locale;
  readonly text: HomeCopy;
}

export const HomeHeroIntro = ({ locale, text }: HomeHeroIntroProps) => {
  return (
    <Box
      marginLeft={{ base: 0, md: 'clamp(8px, 4vw, 84px)' }}
      marginTop={{ base: '34px', md: 'clamp(52px, 8vw, 92px)' }}
      maxWidth={{ base: '358px', md: '600px' }}
      position="relative"
      zIndex={1}
    >
      <Text color="#314235" marginTop="24px" textStyle={{ base: 'regular-md', md: 'regular-xl' }}>
        {text.tagline}
      </Text>

      <HomeStats cards={homeStatCards[locale]} />
      <HomeActions label={text.actionLabel} />
    </Box>
  );
};
