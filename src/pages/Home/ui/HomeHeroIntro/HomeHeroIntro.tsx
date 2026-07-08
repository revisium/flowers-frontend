import { Flex, Text } from '@chakra-ui/react';

import type { HomeCopy } from '../../model/homePageData';
import { DayReminderCard } from '../DayReminderCard/DayReminderCard';

interface HomeHeroIntroProps {
  readonly text: HomeCopy;
}

export const HomeHeroIntro = ({ text }: HomeHeroIntroProps) => {
  return (
    <Flex
      border="3px solid green"
      direction="column"
      justify="center"
      align="start"
      gap="20px"
      p="18px"
    >
      <Text
        border="3px solid green"
        w={{ base: '290px', md: '370px', lg: '470px' }}
        color="#5b4c36"
        textStyle={{ base: 'bold-lg', md: 'bold-xl', lg: 'bold-xxl' }}
      >
        {text.tagline}
      </Text>

      <DayReminderCard text={text} />
    </Flex>
  );
};
