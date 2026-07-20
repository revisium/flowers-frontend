import { Box, Button, Flex, Text } from '@chakra-ui/react';
import type { AboutCopy } from '../../model/aboutPageData';
import { AboutIcon } from '../AboutIcon/AboutIcon';

interface AboutClosingProps {
  readonly onCollectionOpen: () => void;
  readonly text: AboutCopy;
}

export const AboutClosing = ({ onCollectionOpen, text }: AboutClosingProps) => (
  <Flex
    alignItems="center"
    backgroundImage="url('/about/about-closing-monstera.webp')"
    backgroundPosition="center"
    backgroundSize="cover"
    borderRadius={{ base: '12px', md: '16px' }}
    direction="column"
    justifyContent="center"
    margin={{ base: '0 18px 18px', md: '0 34px 34px' }}
    minHeight={{ base: '300px', md: '280px', lg: '310px' }}
    padding={{ base: '42px 26px', md: '52px 40px' }}
    position="relative"
    textAlign="center"
    overflow="hidden"
  >
    <Box
      aria-hidden="true"
      background="linear-gradient(90deg, rgba(248,245,235,.2) 0%, rgba(249,246,237,.88) 30%, rgba(249,246,237,.94) 50%, rgba(249,246,237,.88) 70%, rgba(248,245,235,.2) 100%)"
      inset={0}
      position="absolute"
    />
    <Text
      color="#354430"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontSize={{ base: '1.8rem', md: '2.35rem' }}
      fontWeight={400}
      lineHeight={1.12}
      maxWidth="720px"
      position="relative"
      textShadow="0 1px 12px rgba(255,255,255,.5)"
      zIndex={1}
    >
      {text.footerTitle}
    </Text>
    <Text
      color="#4f5b4b"
      fontSize={{ base: '0.96rem', md: '1.1rem' }}
      lineHeight={1.55}
      marginTop={{ base: '12px', md: '14px' }}
      maxWidth="650px"
      position="relative"
      zIndex={1}
    >
      {text.footer}
    </Text>
    <Button
      background="#445a38"
      borderRadius="999px"
      color="#fffdf7"
      fontSize={{ base: '0.86rem', md: '0.94rem' }}
      fontWeight={650}
      height={{ base: '46px', md: '50px' }}
      marginTop={{ base: '26px', md: '30px' }}
      paddingX={{ base: '24px', md: '30px' }}
      position="relative"
      zIndex={1}
      onClick={onCollectionOpen}
      _hover={{
        background: '#34472b',
        boxShadow: '0 10px 26px rgba(51,70,43,.2)',
        transform: 'translateY(-2px)',
      }}
    >
      <AboutIcon name="leaves" size={18} />
      &nbsp;&nbsp;{text.cta}
    </Button>
  </Flex>
);
