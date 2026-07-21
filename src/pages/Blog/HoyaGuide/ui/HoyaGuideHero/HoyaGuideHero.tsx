import { Box, Flex, Link, Text } from '@chakra-ui/react';
import type { Locale } from 'src/shared/config';

import { ReferenceCrop } from '../ReferenceCrop/ReferenceCrop';

interface HoyaGuideHeroProps {
  readonly locale: Locale;
}

export const HoyaGuideHero = ({ locale }: HoyaGuideHeroProps) => {
  return (
    <Box minHeight={{ base: 'auto', md: '566px' }} position="relative">
      <Box
        aria-label="Пышная хойя пубикаликс с длинными побегами"
        backgroundImage="url('/plants/hoya-pubicalyx-splash-home-photo.jpg')"
        backgroundPosition="center 34%"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        borderBottomLeftRadius="52% 26%"
        display={{ base: 'none', md: 'block' }}
        inset="0 0 0 43%"
        position="absolute"
        role="img"
      />

      <Flex
        alignItems="center"
        aria-label={locale === 'ru' ? 'Хлебные крошки' : 'Breadcrumbs'}
        as="nav"
        color="#66695f"
        fontSize={{ base: '0.74rem', md: '0.82rem' }}
        gap={{ base: '7px', md: '10px' }}
        left={{ base: '20px', md: '52px' }}
        position="absolute"
        top={{ base: '18px', md: '21px' }}
        zIndex={3}
      >
        <Link href="/" _hover={{ color: '#34402d', textDecoration: 'underline' }}>
          {locale === 'ru' ? 'Главная' : 'Home'}
        </Link>
        <Text aria-hidden="true">›</Text>
        <Link href="/blog" _hover={{ color: '#34402d', textDecoration: 'underline' }}>
          {locale === 'ru' ? 'Блог' : 'Blog'}
        </Link>
        <Text aria-hidden="true">›</Text>
        <Text aria-current="page" fontWeight={600}>
          {locale === 'ru' ? 'Хойя пубикаликс' : 'Hoya pubicalyx'}
        </Text>
      </Flex>

      <Flex
        direction="column"
        minHeight={{ md: '566px' }}
        padding={{ base: '70px 24px 30px', md: '78px 36px 30px', lg: '72px 0 0 36px' }}
        position="relative"
        width={{ base: '100%', md: '58%', lg: '55%' }}
        zIndex={1}
      >
        <Box
          backdropFilter={{ base: 'none', md: 'blur(12px)', lg: 'none' }}
          background={{ base: 'transparent', md: 'rgba(248,246,239,.9)', lg: 'transparent' }}
          borderRadius={{ base: '0', md: '24px', lg: '0' }}
          boxShadow={{ base: 'none', md: '0 16px 36px rgba(76, 79, 57, .09)', lg: 'none' }}
          margin={{ base: '0', md: '-18px 0 0 -18px', lg: '0' }}
          maxWidth="500px"
          padding={{ base: '0', md: '18px', lg: '0' }}
        >
          <Text
            as="h1"
            color="#35462a"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize={{ base: '2.45rem', md: '3.2rem', lg: '3.15rem' }}
            fontWeight={400}
            letterSpacing="-0.015em"
            lineHeight={0.98}
            textTransform="uppercase"
          >
            Хойя пубикаликс
          </Text>
          <Text
            color="#637441"
            fontSize={{ base: '1.08rem', md: '1.42rem' }}
            fontWeight={500}
            marginTop="8px"
            textTransform="uppercase"
          >
            Что делать с длинными побегами?
          </Text>
          <Box marginTop="17px" maxWidth="347px" width="78%">
            <ReferenceCrop alt="Ботанический разделитель" crop={[37, 129, 347, 32]} rounded="0" />
          </Box>
          <Text
            color="#31352f"
            fontSize="0.92rem"
            lineHeight={1.42}
            marginTop="18px"
            maxWidth="405px"
          >
            Хойя пубикаликс — ампельное растение с длинными гибкими побегами. С ними можно поступить
            по-разному в зависимости от того, какой вид и форму растения вы хотите получить.
          </Text>
        </Box>

        <Box marginTop="22px" width={{ base: '100%', md: '266px' }}>
          <ReferenceCrop
            alt="Пара слов об уходе: яркий рассеянный свет, полив после просыхания верхнего слоя грунта, температура 18–28 °C, стабильное место"
            crop={[37, 275, 266, 239]}
            rounded="20px"
          />
        </Box>
      </Flex>
    </Box>
  );
};
