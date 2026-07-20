import { Flex } from '@chakra-ui/react';
import { useLayoutContext } from 'src/shared/config';
import { aboutCopy } from '../../model/aboutPageData';
import { AboutClosing } from '../AboutClosing/AboutClosing';
import { AboutFeatures } from '../AboutFeatures/AboutFeatures';
import { AboutHero } from '../AboutHero/AboutHero';
import { AboutStory } from '../AboutStory/AboutStory';
import { AboutTimeline } from '../AboutTimeline/AboutTimeline';

export const AboutPage = () => {
  const { locale, onCollectionOpen } = useLayoutContext();
  const text = aboutCopy[locale];

  return (
    <Flex
      as="main"
      background="#fbf9f3"
      color="#343a31"
      paddingTop={{ base: '99px', md: '80px' }}
      width="100%"
      direction="column"
      gap="40px"
    >
      <AboutHero locale={locale} text={text} />
      <AboutFeatures locale={locale} text={text} />
      <AboutStory locale={locale} text={text} />
      <AboutTimeline locale={locale} text={text} />
      <AboutClosing onCollectionOpen={onCollectionOpen} text={text} />
    </Flex>
  );
};
