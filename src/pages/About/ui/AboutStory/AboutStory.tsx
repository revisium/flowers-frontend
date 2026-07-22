import { Box, Flex, Grid, Image, Text } from '@chakra-ui/react';
import type { Locale } from 'src/shared/config';
import type { AboutCopy } from '../../model/aboutPageData';
import { BotanicalHeading } from '../BotanicalHeading/BotanicalHeading';

interface AboutStoryProps {
  readonly locale: Locale;
  readonly text: AboutCopy;
}

export const AboutStory = ({ locale, text }: AboutStoryProps) => (
  <Grid
    borderRadius={{ md: '10px' }}
    gridTemplateColumns={{ base: '1fr', lg: '46% 54%' }}
    margin={{ base: '0 18px', md: '26px 34px 0' }}
    overflow="hidden"
  >
    <Flex
      background="#f6f3ea"
      direction="column"
      justifyContent="center"
      padding={{ base: '36px 22px', md: '30px 36px' }}
    >
      <BotanicalHeading>{text.reason}</BotanicalHeading>
      <Flex
        color="#686a62"
        direction="column"
        fontSize="0.84rem"
        gap="12px"
        lineHeight={1.52}
        marginTop="20px"
      >
        <Text>{text.reasonBody[0]}</Text>
        <Text>{text.reasonBody[1]}</Text>
      </Flex>
      <Box
        background="linear-gradient(100deg, #e8e6d5 0%, #f1eee3 100%)"
        borderRadius="8px"
        marginTop="18px"
        minHeight="108px"
        overflow="hidden"
        padding="18px 20px"
        position="relative"
      >
        <Text color="#778265" fontFamily="Georgia, serif" fontSize="1.8rem" lineHeight={0.7}>
          “
        </Text>
        <Text
          color="#5e6258"
          fontFamily="Georgia, serif"
          fontSize="1rem"
          lineHeight={1.28}
          marginTop="7px"
          maxWidth="385px"
          position="relative"
          zIndex={1}
        >
          {text.quote}
        </Text>
        <Image
          alt=""
          aria-hidden="true"
          bottom="-16px"
          opacity={0.48}
          position="absolute"
          right="14px"
          src="/about/quote-botanical-sketch.webp"
          width="92px"
        />
      </Box>
    </Flex>
    <Image
      alt={
        locale === 'ru'
          ? 'Вариегатное растение в светлом кашпо'
          : 'A variegated plant in a pale pot'
      }
      height={{ base: '390px', lg: '100%' }}
      minHeight={{ lg: '315px' }}
      objectFit="cover"
      objectPosition="center 52%"
      src="/about/about-story.webp"
      width="100%"
    />
  </Grid>
);
