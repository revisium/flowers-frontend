import { Box, Link } from '@chakra-ui/react';
import { useLayoutContext } from 'src/shared/config';
import { gloxiniaStoryCopy } from '../../model/gloxiniaStoryData';
import { GloxiniaFacts } from '../GloxiniaFacts/GloxiniaFacts';
import { GloxiniaJourney } from '../GloxiniaJourney/GloxiniaJourney';
import { GloxiniaSharing } from '../GloxiniaSharing/GloxiniaSharing';
import { GloxiniaStoryHero } from '../GloxiniaStoryHero/GloxiniaStoryHero';

export const GloxiniaStoryPage = () => {
  const { locale } = useLayoutContext();
  const text = gloxiniaStoryCopy[locale];

  return (
    <Box as="main" background="#fbf9f3" color="#343a31" paddingTop={{ base: '66px', md: '80px' }} width="100%">
      <GloxiniaStoryHero locale={locale} text={text} />
      <GloxiniaJourney text={text} />
      <GloxiniaFacts text={text} />
      <GloxiniaSharing text={text} />
      <Box padding={{ base: '4px 18px 44px', md: '4px 34px 54px' }} textAlign="center">
        <Link color="#4d6242" fontSize="0.86rem" fontWeight={600} href="/about" textDecoration="underline" textUnderlineOffset="4px">
          {text.backToAbout}
        </Link>
      </Box>
    </Box>
  );
};
