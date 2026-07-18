import { Flex, Link, Text } from '@chakra-ui/react';

import type { HomeCopy } from '../../model/homePageData';

interface HomeNoteProps {
  readonly text: HomeCopy;
}

export const HomeNote = ({ text }: HomeNoteProps) => {
  return (
    <Flex
      margin={{
        base: ' 18px',
        md: '28px clamp(18px, 3vw, 38px)',
        xl: '90px clamp(18px, 3vw, 38px)',
      }}
      padding={{ base: '30px 24px', md: '34px 42px' }}
      alignItems="flex-start"
      background="linear-gradient(90deg, rgba(43, 55, 39, .88) 0%, rgba(55, 67, 51, .72) 38%, rgba(55, 67, 51, .08) 70%), url('/about/about-hero.webp')"
      backgroundPosition="66% 33%"
      backgroundSize="cover"
      borderRadius="12px"
      direction="column"
      justify="center"
      minHeight={{ base: '210px', md: '190px' }}
      overflow="hidden"
    >
      <Text
        color="#fffdf7"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize={{ base: '1.55rem', md: '2rem' }}
        fontWeight={400}
        lineHeight={1.08}
        maxWidth={{ base: '260px', md: '390px' }}
        textShadow="0 2px 12px rgba(23, 30, 20, .25)"
      >
        {text.noteText[0]}
      </Text>
      <Link
        alignItems="center"
        background="#fffdf8"
        borderRadius="8px"
        color="#3f4d3c"
        display="inline-flex"
        fontSize="0.82rem"
        fontWeight={600}
        height="42px"
        href="/about"
        marginTop="20px"
        paddingX="22px"
        _hover={{ background: '#f0ebdd', transform: 'translateY(-1px)' }}
      >
        {text.noteActionLabel}
      </Link>
    </Flex>
  );
};
