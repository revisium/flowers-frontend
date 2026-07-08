import { Button, Grid } from '@chakra-ui/react';

import { BookIcon } from '../BookIcon/BookIcon';
import { SmallCanIcon } from '../SmallCanIcon/SmallCanIcon';

export const HomeActions = () => {
  return (
    <Grid gap="12px" gridTemplateColumns={{ base: 'repeat(2, minmax(0, 1fr))', sm: 'repeat(2, max-content)' }} marginTop="28px">
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
        Полить растения
      </Button>
      <Button
        background="rgba(255, 252, 246, 0.72)"
        border="1px solid rgba(126, 104, 69, 0.22)"
        borderRadius="8px"
        color="#7a6648"
        fontSize={{ base: '0.85rem', sm: '1rem' }}
        fontWeight={760}
        minHeight={{ base: '48px', sm: '54px' }}
        paddingInline={{ base: '10px', sm: '22px' }}
        type="button"
        variant="outline"
      >
        <BookIcon />
        Уход и советы
      </Button>
    </Grid>
  );
};
