import { Flex } from '@chakra-ui/react';

import type { HomeCopy } from '../../model/homePageData';
import { DayReminderCard } from '../DayReminderCard/DayReminderCard';

interface HomeHeroIntroProps {
  readonly text: HomeCopy;
}

export const HomeHeroIntro = ({ text }: HomeHeroIntroProps) => {
  return (
    <Flex
      direction="column"
      gap={{ base: '16px', md: '20px' }}
      justify="center"
      align="flex-start"
      p={{ base: '16px', md: '18px', xl: '18px' }}
      h={{ base: 'auto', md: '90%' }}
    >
      <DayReminderCard text={text} />
    </Flex>
  );
};
