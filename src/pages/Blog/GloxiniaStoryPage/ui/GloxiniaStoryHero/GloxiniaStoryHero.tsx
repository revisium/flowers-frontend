import { Box, Flex, Image, Text } from '@chakra-ui/react';
import type { Locale } from 'src/shared/config';
import { EditorialBreadcrumbs } from 'src/shared/ui';
import type { GloxiniaStoryCopy } from '../../model/gloxiniaStoryData';

interface GloxiniaStoryHeroProps {
  readonly locale: Locale;
  readonly text: GloxiniaStoryCopy;
}

export const GloxiniaStoryHero = ({ locale, text }: GloxiniaStoryHeroProps) => (
  <Box
    aspectRatio={{ base: 'auto', lg: '1640 / 959' }}
    background="#fbf9f3"
    minHeight={{ base: '660px', md: '620px', lg: 'unset' }}
    overflow="hidden"
    position="relative"
  >
    <Image
      alt={text.originImageAlt}
      height="100%"
      inset={0}
      objectFit="contain"
      objectPosition={{ base: 'center bottom', lg: 'center' }}
      position="absolute"
      src="/blog/gloxinia-story/hero-centered.webp"
      width="100%"
    />
    <Box
      background={{
        base: 'linear-gradient(180deg, rgba(251,249,243,.99) 0%, rgba(251,249,243,.96) 48%, rgba(251,249,243,.42) 68%, rgba(251,249,243,0) 82%)',
        lg: 'linear-gradient(90deg, rgba(251,249,243,.99) 0%, rgba(251,249,243,.94) 37%, rgba(251,249,243,.28) 51%, rgba(251,249,243,0) 62%)',
      }}
      inset={0}
      pointerEvents="none"
      position="absolute"
    />
    <EditorialBreadcrumbs
      ariaLabel={locale === 'ru' ? 'Хлебные крошки' : 'Breadcrumbs'}
      currentLabel={text.breadcrumb}
      rootLabel={locale === 'ru' ? 'Главная' : 'Home'}
      sectionHref="/blog"
      sectionLabel={locale === 'ru' ? 'Блог' : 'Blog'}
    />
    <Flex
      alignItems="flex-start"
      direction="column"
      height={{ base: 'auto', lg: '100%' }}
      justifyContent={{ base: 'flex-start', lg: 'center' }}
      maxWidth={{ base: '100%', lg: '46%' }}
      minHeight={{ base: '660px', md: '620px', lg: 'unset' }}
      padding={{ base: '106px 22px 315px', md: '118px 46px 315px', lg: '76px 24px 42px 42px' }}
      position="relative"
      zIndex={1}
    >
      <Text
        as="h1"
        color="#2f3b2b"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize={{ base: '2.8rem', md: '3.55rem', xl: '3.9rem' }}
        fontWeight={400}
        letterSpacing="-0.05em"
        lineHeight={0.96}
        margin={0}
        maxWidth="500px"
      >
        {text.heroTitle}
      </Text>
      <Flex
        color="#343a31"
        direction="column"
        fontSize={{ base: '0.88rem', md: '0.91rem' }}
        gap="9px"
        lineHeight={1.55}
        marginTop={{ base: '25px', md: '27px' }}
        maxWidth="410px"
      >
        {text.heroBody.map((paragraph) => (
          <Text key={paragraph}>{paragraph}</Text>
        ))}
      </Flex>
      <Image
        alt={locale === 'ru' ? 'Подпись Анастасии' : "Anastasia's signature"}
        height="auto"
        marginTop="16px"
        src="/about/anastasia-signature-v2.png"
        width={{ base: '138px', md: '146px' }}
      />
    </Flex>
  </Box>
);
