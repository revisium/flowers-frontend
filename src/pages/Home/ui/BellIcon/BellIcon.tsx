import { Box } from '@chakra-ui/react';

export const BellIcon = () => {
  return (
    <Box
      as="span"
      aria-hidden="true"
      border="2px solid #91866d"
      borderBottom={0}
      borderRadius="12px 12px 6px 6px"
      display="block"
      height="17px"
      margin="0 auto"
      position="relative"
      width="15px"
      _before={{
        background: '#91866d',
        borderRadius: '999px',
        content: '""',
        height: '4px',
        left: '4px',
        position: 'absolute',
        top: '-5px',
        width: '4px',
      }}
      _after={{
        background: '#91866d',
        borderRadius: '999px',
        bottom: '-5px',
        content: '""',
        height: '2px',
        left: '3px',
        position: 'absolute',
        width: '7px',
      }}
    />
  );
};
