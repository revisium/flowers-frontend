import { Flex, Text } from '@chakra-ui/react';

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
    >
      <Text
        color="#5b4c36"
        maxWidth={{ base: '310px', sm: '430px', md: '560px', xl: 'none' }}
        textStyle={{ base: 'bold-md', md: 'bold-xl', xl: 'bold-xxl' }}
        w={{ base: '43%', md: '70%', xl: '470px' }}
      >
        {text.tagline}
      </Text>

      <DayReminderCard text={text} />
    </Flex>
  );
};
