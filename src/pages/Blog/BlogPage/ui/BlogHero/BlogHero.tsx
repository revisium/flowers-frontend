import { Box, Flex, Image, Link, Text } from '@chakra-ui/react';
import type { Locale } from 'src/shared/config';
import type { BlogCopy } from '../../model/blogPageData';

interface BlogHeroProps {
  readonly locale: Locale;
  readonly text: BlogCopy;
}

export const BlogHero = ({ locale, text }: BlogHeroProps) => (
  <Box
    backgroundImage={{
      base: 'linear-gradient(180deg, rgba(251,249,243,.98) 0%, rgba(251,249,243,.93) 50%, rgba(251,249,243,.08) 73%), url(/blog/blog-hero-journal.webp)',
      lg: 'url(/blog/blog-hero-journal.webp)',
    }}
    backgroundPosition={{ base: '72% bottom', lg: 'center' }}
    backgroundSize="cover"
    minHeight={{ base: '640px', lg: '480px' }}
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
      maxWidth={{ lg: '47%' }}
      minHeight={{ base: '640px', lg: '480px' }}
      padding={{ base: '110px 22px 320px', md: '112px 42px 320px', lg: '82px 24px 40px 42px' }}
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
      <Flex alignItems="center" gap="8px" marginTop="24px">
        <Text aria-hidden="true" color="#86907f" fontFamily="Georgia, 'Times New Roman', serif" fontSize="1.4rem">
          ♡
        </Text>
        <Box height="26px" overflow="hidden" width="116px">
          <Image
            alt={text.signatureAlt}
            height="26px"
            maxWidth="none"
            objectFit="contain"
            opacity={0.55}
            src="/about/anastasia-signature-v2.png"
            transform="translateX(-20px)"
            width="132px"
          />
        </Box>
      </Flex>
    </Flex>
  </Box>
);
