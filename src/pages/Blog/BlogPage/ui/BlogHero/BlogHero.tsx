import { Box, Flex, Image, Link, Text } from '@chakra-ui/react';
import type { Locale } from 'src/shared/config';
import type { BlogCopy } from '../../model/blogPageData';

interface BlogHeroProps {
  readonly locale: Locale;
  readonly text: BlogCopy;
}

export const BlogHero = ({ locale, text }: BlogHeroProps) => (
  <Box
    aspectRatio={{ base: 'auto', lg: '16 / 8.6' }}
    background="#fbf9f3"
    minHeight={{ base: '720px', md: '650px', lg: 'unset' }}
    overflow="hidden"
    position="relative"
  >
    <Image
      alt={
        locale === 'ru'
          ? 'Открытый дневник с ботаническими зарисовками, гербарием и черенками растений'
          : 'An open journal with botanical sketches, pressed leaves and plant cuttings'
      }
      height="100%"
      inset={0}
      objectFit="cover"
      objectPosition={{ base: '54% center', md: 'center', lg: 'center' }}
      position="absolute"
      src="/blog/blog-hero-journal-v2.webp"
      width="100%"
    />
    <Box
      background={{
        base: 'linear-gradient(180deg, rgba(251,249,243,.99) 0%, rgba(251,249,243,.96) 46%, rgba(251,249,243,.54) 64%, rgba(251,249,243,.08) 82%, rgba(251,249,243,0) 100%)',
        lg: 'linear-gradient(90deg, rgba(251,249,243,.98) 0%, rgba(251,249,243,.93) 38%, rgba(251,249,243,.48) 53%, rgba(251,249,243,.08) 68%, rgba(251,249,243,0) 78%)',
      }}
      inset={0}
      pointerEvents="none"
      position="absolute"
    />
    <Flex
      alignItems="center"
      aria-label={locale === 'ru' ? 'Хлебные крошки' : 'Breadcrumbs'}
      as="nav"
      color="#66695f"
      fontSize="0.8rem"
      gap="10px"
      left={{ base: '20px', md: '42px' }}
      position="absolute"
      top="20px"
      zIndex={2}
    >
      <Link href="/">{locale === 'ru' ? 'Главная' : 'Home'}</Link>
      <Text aria-hidden="true">›</Text>
      <Text fontWeight={600}>{text.breadcrumb}</Text>
    </Flex>
    <Flex
      alignItems="flex-start"
      direction="column"
      justifyContent={{ base: 'flex-start', lg: 'center' }}
      maxWidth={{ base: '100%', lg: '51%' }}
      minHeight={{ base: '720px', md: '650px', lg: '100%' }}
      padding={{ base: '112px 22px 350px', md: '118px 44px 310px', lg: '88px 30px 54px 42px' }}
      position="relative"
      zIndex={1}
    >
      <Text
        as="h1"
        color="#2f3b2b"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize={{ base: '2.75rem', md: '3.65rem', xl: '4.1rem' }}
        fontWeight={400}
        letterSpacing="-0.045em"
        lineHeight={0.97}
        margin={0}
        maxWidth="650px"
      >
        {text.title}
      </Text>
      <Text color="#4f544c" fontSize="0.92rem" lineHeight={1.6} marginTop="25px" maxWidth="460px">
        {text.lead}
      </Text>
      <Image
        alt={text.signatureAlt}
        flex="0 0 auto"
        height="auto"
        marginTop="24px"
        src="/about/anastasia-signature-v2.png"
        width={{ base: '150px', md: '160px' }}
      />
    </Flex>
  </Box>
);
