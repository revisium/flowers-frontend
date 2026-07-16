import { Box, Flex, Image, Link, Text } from '@chakra-ui/react';
import type { Locale } from 'src/shared/config';
import type { GloxiniaStoryCopy } from '../../model/gloxiniaStoryData';

interface GloxiniaStoryHeroProps {
  readonly locale: Locale;
  readonly text: GloxiniaStoryCopy;
}

export const GloxiniaStoryHero = ({ locale, text }: GloxiniaStoryHeroProps) => (
  <Box
    backgroundImage={{
      base: 'linear-gradient(180deg, rgba(251,249,243,.98) 0%, rgba(251,249,243,.92) 51%, rgba(251,249,243,.12) 74%), url(/gloxinia-story/hero.webp)',
      lg: 'linear-gradient(90deg, rgba(251,249,243,.99) 0%, rgba(251,249,243,.96) 34%, rgba(251,249,243,.48) 53%, rgba(251,249,243,0) 72%), url(/gloxinia-story/hero.webp)',
    }}
    backgroundPosition={{ base: '65% bottom', lg: 'center' }}
    backgroundRepeat="no-repeat"
    backgroundSize="cover"
    minHeight={{ base: '720px', md: '760px', lg: '560px' }}
    position="relative"
  >
    <Flex
      alignItems="center"
      color="#66695f"
      fontSize="0.82rem"
      gap="10px"
      left={{ base: '20px', md: '52px' }}
      position="absolute"
      top={{ base: '18px', md: '21px' }}
    >
      <Link href="/">{locale === 'ru' ? 'Главная' : 'Home'}</Link>
      <Text aria-hidden="true">›</Text>
      <Text fontWeight={600}>{text.breadcrumb}</Text>
    </Flex>
    <Flex
      alignItems="flex-start"
      direction="column"
      justifyContent={{ base: 'flex-start', lg: 'center' }}
      maxWidth={{ base: '100%', lg: '47%' }}
      minHeight={{ base: '720px', md: '760px', lg: '560px' }}
      padding={{ base: '112px 22px 340px', md: '128px 52px 390px', lg: '86px 26px 56px 52px' }}
      position="relative"
      zIndex={1}
    >
      <Text
        as="h1"
        color="#2f3b2b"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize={{ base: '3rem', md: '4rem', xl: '4.45rem' }}
        fontWeight={400}
        letterSpacing="-0.05em"
        lineHeight={0.96}
        margin={0}
        maxWidth="620px"
      >
        {text.heroTitle}
      </Text>
      <Flex
        color="#343a31"
        direction="column"
        fontSize={{ base: '0.91rem', md: '0.97rem' }}
        gap="9px"
        lineHeight={1.55}
        marginTop={{ base: '27px', md: '30px' }}
        maxWidth="500px"
      >
        {text.heroBody.map((paragraph) => <Text key={paragraph}>{paragraph}</Text>)}
      </Flex>
      <Image
        alt={locale === 'ru' ? 'Подпись Анастасии' : "Anastasia's signature"}
        height="auto"
        marginTop="19px"
        src="/about/anastasia-signature-v2.png"
        width={{ base: '142px', md: '154px' }}
      />
    </Flex>
  </Box>
);
