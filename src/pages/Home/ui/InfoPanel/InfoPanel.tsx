import { Flex, Text } from '@chakra-ui/react';
import { type ReactNode } from 'react';

interface InfoPanelProps {
  readonly children: ReactNode;
  readonly title: string;
}

export const InfoPanel = ({ children, title }: InfoPanelProps) => (
  <Flex
    backdropFilter="blur(9px)"
    background="rgba(255, 253, 247, 0.92)"
    border="1px solid rgba(218, 204, 178, 0.78)"
    borderRadius={{ base: '14px', md: '16px' }}
    boxShadow="0 20px 46px rgba(76, 64, 42, 0.1)"
    direction="column"
    gap="16px"
    height="100%"
    padding={{ base: '20px', md: '26px 26px 24px' }}
  >
    <Text as="h3" color="#25382b" fontSize="1.24rem" lineHeight={1.1} textStyle="serif">
      {title}
    </Text>
    {children}
  </Flex>
);
