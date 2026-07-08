import { Box, Button, Flex, Input } from '@chakra-ui/react';

import { HeaderSearchIcon } from '../HeaderSearchIcon/HeaderSearchIcon';

interface HeaderSearchFieldProps {
  readonly clearLabel: string;
  readonly display: Record<string, string>;
  readonly label: string;
  readonly placeholder: string;
  readonly position: 'absolute' | 'static';
  readonly value: string;
  readonly width: string | Record<string, string>;
  readonly right?: number;
  readonly top?: string;
  readonly onBlur: () => void;
  readonly onChange: (value: string) => void;
  readonly onClear: () => void;
  readonly onFocus: () => void;
}

export const HeaderSearchField = ({
  clearLabel,
  display,
  label,
  onBlur,
  onChange,
  onClear,
  onFocus,
  placeholder,
  position,
  right,
  top,
  value,
  width,
}: HeaderSearchFieldProps) => {
  const hasValue = value.trim().length > 0;

  return (
    <Flex
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
      <HeaderSearchIcon />
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
        onBlur={onBlur}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        onFocus={onFocus}
      />
      {hasValue ? (
        <Button
          aria-label={clearLabel}
          border="1px solid currentColor"
          borderRadius="999px"
          color="rgba(70, 84, 59, 0.62)"
          flex="0 0 auto"
          height="20px"
          minWidth="20px"
          padding={0}
          type="button"
          variant="plain"
          width="20px"
          onClick={onClear}
        >
          <Box as="span" fontSize="15px" lineHeight="18px">
            ×
          </Box>
        </Button>
      ) : null}
    </Flex>
  );
};
