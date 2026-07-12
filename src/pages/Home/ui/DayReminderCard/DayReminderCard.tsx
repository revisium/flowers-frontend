import { Button, Flex, Text } from '@chakra-ui/react';

import type { HomeCopy } from '../../model/homePageData';
import { SmallCanIcon } from 'src/pages/Home/ui/SmallCanIcon/SmallCanIcon.tsx';

interface DayReminderCardProps {
  readonly text: HomeCopy;
}

export const DayReminderCard = ({ text }: DayReminderCardProps) => {
  return (
    <Flex
      direction="column"
      gap="10px"
      background="rgba(255, 252, 246, 0.50)"
      border="1px solid rgba(126, 104, 69, 0.16)"
      p={{ base: '12px', md: '14px', xl: '12px' }}
      borderRadius="18px"
      boxShadow="0 18px 46px rgba(92, 77, 46, 0.18)"
    >
      <Text color="#5b4c36" textStyle={{ base: 'bold-md', md: 'bold-xl', xl: 'bold-xxl' }}>
        {text.reminderTitle}
      </Text>
      <Text color="#6f6b5d" textStyle={{ base: 'regular-md', md: 'regular-lп', xl: 'regular-xl' }}>
        Лучшее время подарить растениям <br /> свое внимание и заботу
      </Text>
      <Flex direction={{ base: 'column', sm: 'row' }} gap="10px">
        <Button
          variant="subtle"
          background="#526246"
          borderRadius="8px"
          color="#fffaf1"
          textStyle={{ md: 'semibold-xs', xl: 'semibold-md' }}
          minHeight={{ md: '34px', xl: '44px' }}
          p="10px"
          width={{ base: '100%', sm: 'auto' }}
        >
          <SmallCanIcon />
          {text.actionLabel}
        </Button>
      </Flex>
    </Flex>
  );
};
