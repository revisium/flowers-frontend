import { Box, Flex, Image, Link, Text } from '@chakra-ui/react';
import type { Locale } from 'src/shared/config';
import type { BlogCopy } from '../../model/blogPageData';

interface BlogHeroProps {
  readonly locale: Locale;
  readonly text: BlogCopy;
}

export const BlogHero = ({ locale, text }: BlogHeroProps) => (
  <Box
    aspectRatio={{ lg: 1774 / 887 }}
    background="#fbf9f3"
    overflow="hidden"
    position="relative"
  >
    <Flex
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
      direction="column"
      justifyContent="center"
      maxWidth={{ lg: '47%' }}
      minHeight={{ lg: '100%' }}
      padding={{ base: '92px 22px 40px', md: '96px 42px 48px', lg: '82px 24px 40px 42px' }}
      position="relative"
      zIndex={1}
    >
      <Text
        as="h1"
        color="#2f3b2b"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize={{ base: '2.9rem', md: '3.75rem' }}
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
      <Image
        alt={text.signatureAlt}
        flex="0 0 auto"
        height="auto"
        marginTop="24px"
        src="/about/anastasia-signature-v2.png"
        width={{ base: '150px', md: '160px' }}
      />
    </Flex>
    <Image
      alt={locale === 'ru' ? 'Дневник с ботаническим рисунком рядом с комнатным растением' : 'A journal with a botanical drawing beside a houseplant'}
      height={{ base: 'auto', lg: '100%' }}
      inset={{ lg: 0 }}
      objectFit="contain"
      position={{ base: 'relative', lg: 'absolute' }}
      src="/blog/blog-hero-journal.webp"
      width="100%"
    />
  </Box>
);
