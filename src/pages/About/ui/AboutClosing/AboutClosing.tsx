import { Box, Button, Flex, Image, Link, Text } from '@chakra-ui/react';
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
    <Flex
      alignItems="center"
      flexWrap="wrap"
      gap="10px"
      justifyContent="center"
      marginTop={{ base: '26px', md: '30px' }}
      position="relative"
      zIndex={1}
    >
      <Link
        _hover={{
          background: '#34472b',
          boxShadow: '0 10px 26px rgba(51,70,43,.2)',
          textDecoration: 'none',
          transform: 'translateY(-2px)',
        }}
        alignItems="center"
        background="#445a38"
        borderRadius="999px"
        color="#fffdf7"
        display="inline-flex"
        fontSize={{ base: '0.86rem', md: '0.94rem' }}
        fontWeight={650}
        gap="9px"
        height={{ base: '46px', md: '50px' }}
        href="https://t.me/nastya009"
        paddingX={{ base: '20px', md: '24px' }}
        rel="noreferrer"
        target="_blank"
        textDecoration="none"
        transition="all 0.2s ease"
      >
        <Image
          alt=""
          borderRadius="50%"
          height="24px"
          src="/about/contact-telegram.webp"
          width="24px"
        />
        {text.contactTelegram}
      </Link>
      <Link
        _hover={{
          background: '#34472b',
          boxShadow: '0 10px 26px rgba(51,70,43,.2)',
          textDecoration: 'none',
          transform: 'translateY(-2px)',
        }}
        alignItems="center"
        background="#445a38"
        borderRadius="999px"
        color="#fffdf7"
        display="inline-flex"
        fontSize={{ base: '0.86rem', md: '0.94rem' }}
        fontWeight={650}
        gap="9px"
        height={{ base: '46px', md: '50px' }}
        href="https://max.ru/u/f9LHodD0cOJOX6XSSkA_yvYvLrD9YIgDikqDcUZQoIz_pn-RTN2FtysHrSY"
        paddingX={{ base: '20px', md: '24px' }}
        rel="noreferrer"
        target="_blank"
        textDecoration="none"
        transition="all 0.2s ease"
      >
        <Image alt="" height="24px" src="/about/contact-max.svg" width="24px" />
        {text.contactMax}
      </Link>
      <Button
        _hover={{
          background: 'rgba(255,255,255,.75)',
          boxShadow: '0 10px 26px rgba(51,70,43,.2)',
          transform: 'translateY(-2px)',
        }}
        background="rgba(255,255,255,.5)"
        border="1px solid rgba(68,90,56,.35)"
        borderRadius="999px"
        color="#445a38"
        fontSize={{ base: '0.86rem', md: '0.94rem' }}
        fontWeight={650}
        height={{ base: '46px', md: '50px' }}
        paddingX={{ base: '20px', md: '24px' }}
        transition="all 0.2s ease"
        onClick={onCollectionOpen}
      >
        <AboutIcon name="leaves" size={18} />
        &nbsp;&nbsp;{text.cta}
      </Button>
    </Flex>
  </Flex>
);
