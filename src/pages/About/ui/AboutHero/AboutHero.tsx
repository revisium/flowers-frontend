import { Box, Flex, Grid, Image, Link, Text } from '@chakra-ui/react';
import type { Locale } from 'src/shared/config';
import type { AboutCopy } from '../../model/aboutPageData';

interface AboutHeroProps {
  readonly locale: Locale;
  readonly text: AboutCopy;
}

export const AboutHero = ({ locale, text }: AboutHeroProps) => (
  <>
    <Flex
      alignItems="center"
      color="#66695f"
      fontSize="0.82rem"
      gap="10px"
      padding={{ base: '18px', md: '20px 52px 18px' }}
    >
      <Link href="/">{locale === 'ru' ? 'Главная' : 'Home'}</Link>
      <Text aria-hidden="true">›</Text>
      <Text>{text.breadcrumb}</Text>
    </Flex>
    <Grid
      gridTemplateColumns={{ base: '1fr', lg: 'minmax(350px, 43%) minmax(0, 57%)' }}
      minHeight={{ lg: '475px' }}
    >
      <Flex
        alignItems="flex-start"
        direction="column"
        justifyContent="center"
        padding={{ base: '34px 22px 44px', md: '44px', lg: '38px 30px 44px 52px' }}
        position="relative"
        zIndex={2}
      >
        <Text
          as="h1"
          color="#2f3b2b"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize={{ base: '2.7rem', md: '3.4rem', xl: '3.55rem' }}
          fontWeight={400}
          letterSpacing="-0.045em"
          lineHeight={0.99}
          margin={0}
          maxWidth="590px"
        >
          {text.title}
        </Text>
        <Flex
          direction="column"
          fontSize={{ base: '0.9rem', md: '0.91rem' }}
          gap="6px"
          lineHeight={1.5}
          marginTop={{ base: '24px', md: '26px' }}
          maxWidth="510px"
        >
          <Text>{text.lead[0]}</Text>
          <Text>{text.lead[1]}</Text>
        </Flex>
        <Flex
          alignItems="center"
          marginTop="18px"
          minHeight="34px"
        >
          <Image
            alt={text.name}
            flex="0 0 auto"
            height="auto"
            src="/about/anastasia-signature-v2.png"
            width={{ base: '150px', md: '160px' }}
          />
        </Flex>
      </Flex>
      <Box
        minHeight={{ base: '390px', md: '470px', lg: '475px' }}
        overflow="hidden"
        position="relative"
        _before={{
          background: {
            base: 'linear-gradient(180deg, #fbf9f3 0%, transparent 18%)',
            lg: 'linear-gradient(90deg, #fbf9f3 0%, rgba(251,249,243,.8) 7%, transparent 28%)',
          },
          content: '""',
          inset: 0,
          position: 'absolute',
          zIndex: 1,
        }}
      >
        <Image
          alt={locale === 'ru' ? 'Вариегатные монстеры у окна рядом с открытым блокнотом' : 'Variegated monsteras by a window beside an open notebook'}
          height="100%"
          objectFit="cover"
          objectPosition="62% center"
          src="/about/about-hero.webp"
          width="100%"
        />
      </Box>
    </Grid>
  </>
);
