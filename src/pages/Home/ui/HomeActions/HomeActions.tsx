import { Button, Flex } from '@chakra-ui/react';
import { SmallCanIcon } from '../SmallCanIcon/SmallCanIcon';

interface HomeActionsProps {
  readonly label: string;
}

export const HomeActions = ({ label }: HomeActionsProps) => {
  return (
    <Flex marginTop="28px">
      <Button
        background="#5c8a54"
        borderRadius="8px"
        color="#fffaf1"
        fontSize={{ base: '0.85rem', sm: '1rem' }}
        fontWeight={760}
        minHeight={{ base: '48px', sm: '54px' }}
        paddingInline={{ base: '10px', sm: '22px' }}
        type="button"
      >
        <SmallCanIcon />
        {label}
      </Button>
    </Flex>
  );
};
