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
    background="#e6e4d5"
    borderRadius={{ md: '10px' }}
    direction="column"
    justifyContent="center"
    margin={{ base: '0 18px 18px', md: '0 34px 34px' }}
    minHeight="112px"
    padding="16px"
    position="relative"
    textAlign="center"
    overflow="hidden"
  >
    <Box
      aria-hidden="true"
      backgroundImage="url('/about/about-hero.webp')"
      backgroundPosition="60% 31%"
      backgroundRepeat="no-repeat"
      backgroundSize="760px auto"
      bottom={0}
      filter="blur(1.2px) saturate(.72)"
      left={0}
      opacity={0.72}
      position="absolute"
      top={0}
      width={{ base: '45%', md: '34%' }}
    />
    <Box
      aria-hidden="true"
      backgroundImage="url('/about/about-hero.webp')"
      backgroundPosition="58% 31%"
      backgroundRepeat="no-repeat"
      backgroundSize="760px auto"
      bottom={0}
      filter="blur(1.2px) saturate(.72)"
      opacity={0.65}
      position="absolute"
      right={0}
      top={0}
      transform="scaleX(-1)"
      width={{ base: '45%', md: '34%' }}
    />
    <Box
      aria-hidden="true"
      background="linear-gradient(90deg, rgba(239,237,225,.18), rgba(244,241,230,.96) 31%, rgba(244,241,230,.96) 69%, rgba(239,237,225,.18))"
      inset={0}
      position="absolute"
    />
    <Text color="#46523f" fontFamily="Georgia, serif" fontSize="1.15rem" position="relative" zIndex={1}>{text.footerTitle}</Text>
    <Text color="#56604f" fontSize="0.9rem" marginTop="4px" position="relative" zIndex={1}>{text.footer}</Text>
    <Button
      background="#445a38"
      borderRadius="999px"
      color="#fffdf7"
      fontSize="0.78rem"
      height="34px"
      marginTop="10px"
      paddingX="20px"
      position="relative"
      zIndex={1}
      onClick={onCollectionOpen}
      _hover={{ background: '#34472b', transform: 'translateY(-1px)' }}
    >
      <AboutIcon name="leaves" size={16} />&nbsp;&nbsp;{text.cta}
    </Button>
  </Flex>
);
