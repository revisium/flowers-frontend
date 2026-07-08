import { Box, Flex, Input } from '@chakra-ui/react';

interface GreenhouseMenuSearchProps {
  readonly label: string;
  readonly placeholder: string;
  readonly value?: string;
  readonly onChange?: (value: string) => void;
}

export function GreenhouseMenuSearch({ label, onChange, placeholder, value }: GreenhouseMenuSearchProps) {
  return (
    <Flex
      as="label"
      alignItems="center"
      background="rgba(255, 248, 233, 0.58)"
      border="1px solid rgba(255, 248, 233, 0.42)"
      borderRadius="999px"
      boxShadow="0 12px 30px rgba(21, 18, 10, 0.055)"
      color="#46543b"
      flex={{ base: '1 1 auto', md: '0 1 440px' }}
      gap="10px"
      minHeight="48px"
      padding="0 18px"
    >
      <Box
        aria-hidden="true"
        border="2px solid currentColor"
        borderRadius="999px"
        flex="0 0 auto"
        height="13px"
        position="relative"
        width="13px"
        _after={{
          background: 'currentColor',
          content: '""',
          height: '7px',
          left: '10px',
          position: 'absolute',
          top: '9px',
          transform: 'rotate(45deg)',
          width: '2px',
        }}
      />
      <Input
        aria-label={label}
        background="transparent"
        border={0}
        color="#46543b"
        height="46px"
        outline={0}
        padding={0}
        placeholder={placeholder}
        type="search"
        value={value}
        _focusVisible={{ boxShadow: 'none' }}
        _placeholder={{ color: 'rgba(70, 84, 59, 0.58)' }}
        onChange={(event) => {
          onChange?.(event.target.value);
        }}
      />
    </Flex>
  );
}
