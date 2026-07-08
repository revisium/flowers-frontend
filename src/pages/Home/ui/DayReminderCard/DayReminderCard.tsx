import { Button, Flex, Link, Text } from '@chakra-ui/react';

import type { HomeCopy } from '../../model/homePageData';
import { SmallCanIcon } from 'src/pages/Home/ui/SmallCanIcon/SmallCanIcon.tsx';

interface DayReminderCardProps {
  readonly text: HomeCopy;
}

export const DayReminderCard = ({ text }: DayReminderCardProps) => {
  return (
    <Flex
      display={{ base: 'none', md: 'flex' }}
      direction="column"
      gap="10px"
      background="rgba(255, 252, 246, 0.50)"
      border="1px solid rgba(126, 104, 69, 0.16)"
      p={{ base: '12px', md: '14px', xl: '12px' }}
      borderRadius="18px"
      boxShadow="0 18px 46px rgba(92, 77, 46, 0.18)"
    >
      <Text textStyle={{ md: 'semibold-sm', xl: 'semibold-md' }}>{text.reminderTitle}</Text>
      <Text color="#6f6b5d" textStyle={{ md: 'regular-xs', xl: 'regular-sm' }}>
        {text.reminderText}
      </Text>
      <Flex direction={{ base: 'column', sm: 'row' }} gap="10px">
        <Button
          variant="subtle"
          background="#5c8a54"
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
        <Link
          alignItems="center"
          border="1px solid rgba(126, 104, 69, 0.22)"
          borderRadius="8px"
          color="#242820"
          display="inline-flex"
          href="/collection"
          justifyContent="center"
          p="10px"
          textDecoration="none"
          textStyle={{ md: 'semibold-xs', xl: 'semibold-md' }}
          minHeight={{ md: '34px', xl: '44px' }}
          width={{ base: '100%', sm: 'auto' }}
          _active={{ textDecoration: 'none' }}
          _focus={{ textDecoration: 'none' }}
          _hover={{ background: 'rgba(255, 252, 246, 0.48)', textDecoration: 'none' }}
        >
          {text.reminderActionLabel} »
        </Link>
      </Flex>
    </Flex>
  );
};
