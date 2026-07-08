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
      p="12px"
      borderRadius="18px"
      boxShadow="0 18px 46px rgba(92, 77, 46, 0.18)"
    >
      <Text textStyle="semibold-md">{text.reminderTitle}</Text>
      <Text color="#6f6b5d">{text.reminderText}</Text>
      <Flex gap="10px">
        <Button
          variant="subtle"
          background="#5c8a54"
          borderRadius="8px"
          color="#fffaf1"
          fontSize={{ base: '0.85rem', sm: '1rem' }}
          fontWeight={760}
          p="10px"
        >
          <SmallCanIcon />
          Уход и советы
        </Button>
        <Button
          border="1px solid rgba(126, 104, 69, 0.22)"
          variant="outline"
          borderRadius="8px"
          p="10px"
          fontSize={{ base: '0.85rem', sm: '1rem' }}
        >
          Смотреть список »
        </Button>
      </Flex>
    </Flex>
  );
};
