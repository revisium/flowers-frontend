import { Flex, Text } from '@chakra-ui/react';

interface GloxiniaStatProps {
  readonly index: number;
  readonly label: string;
  readonly value: string;
}

export const GloxiniaStat = ({ index, label, value }: GloxiniaStatProps) => (
  <Flex
    alignItems="center"
    borderLeft={{
      base: index % 2 === 0 ? 'none' : '1px solid #e2dccf',
      md: index === 0 ? 'none' : '1px solid #e2dccf',
    }}
    borderTop={{ base: index >= 2 ? '1px solid #e2dccf' : 'none', md: 'none' }}
    direction="column"
    justifyContent="flex-start"
    minHeight={{ base: '112px', md: '124px' }}
    padding={{ base: '9px 8px', md: '9px 12px' }}
    textAlign="center"
  >
    <Text
      color="#384231"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontSize={{ base: '2rem', md: '2.3rem' }}
      fontWeight={400}
      lineHeight={1}
    >
      {value}
    </Text>
    <Text color="#485046" fontSize="0.88rem" fontWeight={500} lineHeight={1.48} marginTop="15px" maxWidth="132px">{label}</Text>
  </Flex>
);
