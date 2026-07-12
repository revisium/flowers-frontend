import { Flex, Text } from '@chakra-ui/react';

import type { HomeCopy } from '../../model/homePageData';

interface HomeNoteProps {
  readonly text: HomeCopy;
}

export const HomeNote = ({ text }: HomeNoteProps) => {
  return (
    <Flex
      margin={{ base: ' 18px', md: '28px clamp(18px, 3vw, 38px)' }}
      padding="16px 18px 16px 26px"
      background="linear-gradient(90deg, rgba(204, 220, 174, 0.78), rgba(245, 238, 223, 0.82)), url('/plant-card-texture.jpg')"
      backgroundPosition="center"
      backgroundSize="cover"
      borderRadius="8px"
      justify="center"
    >
      <Text
        textAlign="center"
        textStyle={{ base: 'semibold-md', md: 'semibold-lg', xl: 'semibold-xl' }}
        color="#526246"
      >
        {text.noteText[0]}
        <br />
        {text.noteText[1]}
      </Text>
    </Flex>
  );
};
