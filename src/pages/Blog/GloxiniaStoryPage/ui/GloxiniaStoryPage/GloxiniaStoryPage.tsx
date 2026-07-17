import { Flex } from '@chakra-ui/react';
import { useLayoutContext } from 'src/shared/config';
import { gloxiniaStoryCopy } from '../../model/gloxiniaStoryData';
import { GloxiniaClosing } from '../GloxiniaClosing/GloxiniaClosing';
import { GloxiniaFacts } from '../GloxiniaFacts/GloxiniaFacts';
import { GloxiniaJourney } from '../GloxiniaJourney/GloxiniaJourney';
import { GloxiniaSharing } from '../GloxiniaSharing/GloxiniaSharing';
import { GloxiniaStoryHero } from '../GloxiniaStoryHero/GloxiniaStoryHero';

export const GloxiniaStoryPage = () => {
  const { locale } = useLayoutContext();
  const text = gloxiniaStoryCopy[locale];

  return (
    <Flex
      as="main"
      background="#fbf9f3"
      color="#343a31"
      paddingTop={{ base: '66px', md: '80px' }}
      width="100%"
      direction="column"
      gap={{ base: '30px', md: '60px', xl: '80px' }}
    >
      <GloxiniaStoryHero locale={locale} text={text} />
      <GloxiniaJourney text={text} />
      <GloxiniaFacts text={text} />
      <GloxiniaSharing text={text} />
      <GloxiniaClosing locale={locale} text={text} />
    </Flex>
  );
};
