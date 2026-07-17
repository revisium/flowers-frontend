import { Box, Flex, Link, Text } from '@chakra-ui/react';
import type { Locale } from 'src/shared/config';
import type { BlogCopy } from '../../model/blogPageData';

interface BlogHeroProps {
  readonly locale: Locale;
  readonly text: BlogCopy;
}

export const BlogHero = ({ locale, text }: BlogHeroProps) => (
  <Box
    backgroundImage={{
      base: 'linear-gradient(180deg, rgba(251,249,243,.98) 0%, rgba(251,249,243,.91) 57%, rgba(251,249,243,.14) 78%), url(/blog/gloxinia-story/hero.webp)',
      lg: 'linear-gradient(90deg, rgba(251,249,243,.99) 0%, rgba(251,249,243,.94) 42%, rgba(251,249,243,.16) 70%), url(/blog/gloxinia-story/hero.webp)',
    }}
    backgroundPosition={{ base: '66% bottom', lg: 'center 58%' }}
    backgroundSize="cover"
    minHeight={{ base: '610px', lg: '390px' }}
    position="relative"
  >
    <Flex color="#66695f" fontSize="0.8rem" gap="10px" left={{ base: '20px', md: '42px' }} position="absolute" top="20px">
      <Link href="/">{locale === 'ru' ? 'Главная' : 'Home'}</Link>
      <Text aria-hidden="true">›</Text>
      <Text fontWeight={600}>{text.breadcrumb}</Text>
    </Flex>
    <Flex
      direction="column"
      justifyContent={{ base: 'flex-start', lg: 'center' }}
      maxWidth={{ lg: '50%' }}
      minHeight={{ base: '610px', lg: '390px' }}
      padding={{ base: '105px 22px 300px', md: '108px 42px 305px', lg: '72px 24px 42px 42px' }}
    >
      <Text
        as="h1"
        color="#2f3b2b"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize={{ base: '2.75rem', md: '3.5rem' }}
        fontWeight={400}
        letterSpacing="-0.045em"
        lineHeight={0.98}
        margin={0}
      >
        {text.title}
      </Text>
      <Text color="#4f544c" fontSize="0.92rem" lineHeight={1.6} marginTop="25px" maxWidth="460px">
        {text.lead}
      </Text>
    </Flex>
  </Box>
);
