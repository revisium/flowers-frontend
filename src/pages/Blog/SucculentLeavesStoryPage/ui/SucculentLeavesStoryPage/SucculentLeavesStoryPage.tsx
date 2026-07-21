import { Flex } from '@chakra-ui/react';
import { useLayoutContext } from 'src/shared/config';
import { succulentLeavesStoryCopy } from '../../model/succulentLeavesStoryData';
import { SucculentStoryClosing } from '../SucculentStoryClosing/SucculentStoryClosing';
import { SucculentStoryHero } from '../SucculentStoryHero/SucculentStoryHero';
import { SucculentStoryJournal } from '../SucculentStoryJournal/SucculentStoryJournal';

export const SucculentLeavesStoryPage = () => {
  const { locale } = useLayoutContext();
  const text = succulentLeavesStoryCopy[locale];

  return (
    <Flex
      as="main"
      background="#fbf9f3"
      color="#343a31"
      direction="column"
      gap={{ base: '72px', md: '96px', xl: '120px' }}
      paddingTop={{ base: '99px', md: '80px' }}
      width="100%"
    >
      <SucculentStoryHero locale={locale} text={text} />
      <SucculentStoryJournal locale={locale} text={text} />
      <SucculentStoryClosing text={text} />
    </Flex>
  );
};
