import { Text, type TextProps } from '@chakra-ui/react';

export const EditorialHeroTitle = (props: TextProps) => (
  <Text
    as="h1"
    color="#2f3b2b"
    fontFamily="Georgia, 'Times New Roman', serif"
    fontWeight={400}
    margin={0}
    {...props}
  />
);
