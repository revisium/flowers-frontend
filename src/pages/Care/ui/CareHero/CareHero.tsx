import { Box, Flex, Image, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';

import type { CareCopy } from '../../model/carePageData';

interface CareHeroProps {
  readonly text: CareCopy;
}

export const CareHero = ({ text }: CareHeroProps) => {
  return (
    <Flex
      as="section"
      background="#e8e3d5"
      minHeight={{ base: '720px', md: '680px', lg: '700px' }}
      overflow="hidden"
      padding={{ base: '106px 18px 24px', md: '128px 36px 34px', lg: '132px 46px 38px' }}
      position="relative"
    >
      <Image
        alt=""
        height="100%"
        inset={0}
        objectFit="cover"
        objectPosition={{ base: '65% center', md: 'center' }}
        position="absolute"
        src="/care/care-hero.webp"
        width="100%"
      />
      <Box
        background={{
          base: 'linear-gradient(180deg, rgba(238,234,222,.93) 0%, rgba(238,234,222,.82) 54%, rgba(238,234,222,.16) 100%)',
          md: 'linear-gradient(90deg, rgba(238,234,222,.97) 0%, rgba(238,234,222,.88) 37%, rgba(238,234,222,.18) 63%, rgba(238,234,222,0) 78%)',
        }}
        inset={0}
        position="absolute"
      />

      <Flex
        align="flex-start"
        direction="column"
        maxWidth={{ base: '560px', md: '620px' }}
        position="relative"
        zIndex={1}
      >
        <Link
          asChild
          color="#526246"
          fontSize="0.9rem"
          fontWeight={700}
          marginBottom={{ base: '38px', md: '70px' }}
        >
          <RouterLink to="/">← {text.backLabel}</RouterLink>
        </Link>
        <Text
          color="#687258"
          fontSize="0.78rem"
          fontWeight={750}
          letterSpacing="0.13em"
          textTransform="uppercase"
        >
          {text.heroEyebrow}
        </Text>
        <Text
          as="h1"
          color="#2f3c2f"
          fontSize={{ base: '2.35rem', md: '3.45rem', lg: '4rem' }}
          fontWeight={650}
          letterSpacing="-0.045em"
          lineHeight={{ base: 1.02, md: 0.98 }}
          marginTop="14px"
          maxWidth="11.5em"
        >
          {text.heroTitle}
        </Text>
        <Text
          color="#596255"
          fontSize={{ base: '1rem', md: '1.12rem' }}
          lineHeight={1.55}
          marginTop="22px"
          maxWidth="510px"
        >
          {text.heroSummary}
        </Text>
      </Flex>
    </Flex>
  );
};
