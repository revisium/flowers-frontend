import { Box, Link, Text } from '@chakra-ui/react';

import type { HomeCopy } from '../../model/homePageData';

interface DayReminderCardProps {
  readonly text: HomeCopy;
}

export const DayReminderCard = ({ text }: DayReminderCardProps) => {
  return (
    <Box
      background="rgba(255, 252, 246, 0.78)"
      border="1px solid rgba(126, 104, 69, 0.16)"
      borderRadius="8px"
      boxShadow="0 18px 46px rgba(92, 77, 46, 0.18)"
      color="#344134"
      display={{ base: 'none', md: 'block' }}
      marginLeft={{ md: 'clamp(8px, 4vw, 84px)', xl: 0 }}
      marginTop={{ md: '38px', xl: 0 }}
      maxWidth="390px"
      padding="28px"
      position={{ md: 'relative', xl: 'absolute' }}
      right={{ xl: 'clamp(18px, 4vw, 58px)' }}
      top={{ xl: 'clamp(122px, 13vw, 166px)' }}
      zIndex={2}
    >
      <Text as="strong" display="block" fontSize="1.05rem" marginBottom="14px">
        {text.reminderTitle}
      </Text>
      <Text color="#6f6b5d" lineHeight={1.55} margin="0 0 18px">
        {text.reminderText}
      </Text>
      <Link
        alignItems="center"
        border="1px solid rgba(126, 104, 69, 0.22)"
        borderRadius="8px"
        display="inline-flex"
        fontWeight={760}
        gap="12px"
        href="/collection"
        minHeight="44px"
        padding="0 18px"
        textDecoration="none"
        _active={{ textDecoration: 'none' }}
        _focus={{ textDecoration: 'none' }}
        _hover={{ textDecoration: 'none' }}
      >
        {text.reminderActionLabel}
        <Text as="span" aria-hidden="true">
          »
        </Text>
      </Link>
    </Box>
  );
};
