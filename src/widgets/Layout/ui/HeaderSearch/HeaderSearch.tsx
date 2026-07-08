import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { useState } from 'react';

interface HeaderSearchProps {
  readonly label: string;
  readonly placeholder: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
}

export const HeaderSearch = ({ label, onChange, placeholder, value }: HeaderSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box position="relative">
      <Button
        aria-expanded={isOpen}
        aria-label={label}
        background="rgba(255, 248, 233, 0.46)"
        border="1px solid rgba(255, 248, 233, 0.32)"
        borderRadius="999px"
        color="#46543b"
        display={{ base: 'inline-flex', md: 'none' }}
        height="40px"
        minWidth="40px"
        padding={0}
        type="button"
        variant="plain"
        onClick={() => {
          setIsOpen((current) => !current);
        }}
      >
        <SearchIcon />
      </Button>

      <SearchField
        label={label}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        display={{ base: isOpen ? 'flex' : 'none', md: 'none' }}
        position="absolute"
        right={0}
        top="calc(100% + 10px)"
        width={{ base: 'min(78vw, 360px)', sm: '360px' }}
      />

      <SearchField
        label={label}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        display={{ base: 'none', md: 'flex' }}
        position="static"
        width="300px"
      />
    </Box>
  );
};

interface SearchFieldProps {
  readonly display: Record<string, string>;
  readonly label: string;
  readonly placeholder: string;
  readonly position: 'absolute' | 'static';
  readonly value: string;
  readonly width: string | Record<string, string>;
  readonly right?: number;
  readonly top?: string;
  readonly onChange: (value: string) => void;
}

const SearchField = ({ display, label, onChange, placeholder, position, right, top, value, width }: SearchFieldProps) => {
  return (
    <Flex
      as="label"
      alignItems="center"
      background="rgba(255, 248, 233, 0.46)"
      border="1px solid rgba(255, 248, 233, 0.32)"
      borderRadius="999px"
      boxShadow="0 10px 24px rgba(21, 18, 10, 0.035)"
      color="#46543b"
      display={display}
      gap="10px"
      minHeight="40px"
      padding="0 15px"
      position={position}
      right={right}
      top={top}
      transition="box-shadow 160ms ease, border-color 160ms ease"
      width={width}
      zIndex={30}
      _focusWithin={{
        borderColor: 'rgba(94, 127, 57, 0.38)',
        boxShadow: '0 0 0 3px rgba(94, 127, 57, 0.24), 0 10px 24px rgba(21, 18, 10, 0.035)',
      }}
    >
      <SearchIcon />
      <Input
        aria-label={label}
        background="transparent"
        border={0}
        color="#46543b"
        height="38px"
        outline={0}
        padding={0}
        placeholder={placeholder}
        type="search"
        value={value}
        _focusVisible={{ outline: 'none' }}
        _placeholder={{ color: 'rgba(70, 84, 59, 0.58)' }}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      />
    </Flex>
  );
};

const SearchIcon = () => {
  return (
    <Box
      aria-hidden="true"
      border="2px solid currentColor"
      borderRadius="999px"
      flex="0 0 auto"
      height="12px"
      position="relative"
      width="12px"
      _after={{
        background: 'currentColor',
        content: '""',
        height: '7px',
        left: '9px',
        position: 'absolute',
        top: '8px',
        transform: 'rotate(45deg)',
        width: '2px',
      }}
    />
  );
};
