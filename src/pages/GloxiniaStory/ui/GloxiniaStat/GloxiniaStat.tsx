import { Flex, Text } from '@chakra-ui/react';

interface GloxiniaStatProps {
  readonly label: string;
  readonly value: string;
}

export const GloxiniaStat = ({ label, value }: GloxiniaStatProps) => (
  <Flex
    alignItems="center"
    borderLeft="1px solid #e2dccf"
    direction="column"
    minHeight="112px"
    padding="8px 12px"
    textAlign="center"
    _first={{ borderLeft: 'none' }}
  >
    <Text
      color="#384231"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontSize={{ base: '2rem', md: '2.2rem' }}
      lineHeight={1}
    >
      {value}
    </Text>
    <Text color="#62655d" fontSize="0.77rem" lineHeight={1.45} marginTop="13px" maxWidth="112px">{label}</Text>
  </Flex>
);
