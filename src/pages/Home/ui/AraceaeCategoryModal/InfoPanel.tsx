import { Flex, Text } from '@chakra-ui/react';
import { type ReactNode } from 'react';

interface InfoPanelProps {
  readonly children: ReactNode;
  readonly title: string;
}

export const InfoPanel = ({ children, title }: InfoPanelProps) => (
  <Flex
    background="rgba(255, 253, 247, 0.88)"
    border="1px solid rgba(218, 204, 178, 0.72)"
    borderRadius="12px"
    boxShadow="0 14px 34px rgba(76, 64, 42, 0.06)"
    direction="column"
    gap="16px"
    height="100%"
    padding={{ base: '18px', md: '24px 24px 22px' }}
  >
    <Text
      as="h3"
      color="#25382b"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontSize="1.24rem"
      lineHeight={1.1}
    >
      {title}
    </Text>
    {children}
  </Flex>
);
