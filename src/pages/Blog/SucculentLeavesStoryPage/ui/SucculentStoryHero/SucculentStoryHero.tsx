import { Box, Flex, Image, Text } from '@chakra-ui/react';
import type { Locale } from 'src/shared/config';
import { EditorialBreadcrumbs, EditorialHeroTitle } from 'src/shared/ui';
import type { SucculentLeavesStoryCopy } from '../../model/succulentLeavesStoryData';

interface SucculentStoryHeroProps {
  readonly locale: Locale;
  readonly text: SucculentLeavesStoryCopy;
}

export const SucculentStoryHero = ({ locale, text }: SucculentStoryHeroProps) => (
  <Box
    aspectRatio={{ base: 'auto', lg: '16 / 8.7' }}
    minHeight={{ base: '720px', md: '650px', lg: 'unset' }}
    overflow="hidden"
    position="relative"
  >
    <Image
      alt={
        locale === 'ru'
          ? 'Разные листья суккулентов на светлом столе перед посадкой'
          : 'Assorted succulent leaves on a pale table before planting'
      }
      height="100%"
      inset={0}
      objectFit="cover"
      objectPosition={{ base: '64% center', lg: 'center' }}
      position="absolute"
      src="/blog/succulent-leaves-story/hero.webp"
      width="100%"
    />
    <Box
      background={{
        base: 'linear-gradient(180deg, rgba(250,248,241,.99) 0%, rgba(250,248,241,.96) 44%, rgba(250,248,241,.38) 68%, rgba(250,248,241,0) 82%)',
        lg: 'linear-gradient(90deg, rgba(250,248,241,.98) 0%, rgba(250,248,241,.94) 37%, rgba(250,248,241,.32) 51%, rgba(250,248,241,0) 66%)',
      }}
      inset={0}
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
      justifyContent={{ base: 'flex-start', lg: 'center' }}
      maxWidth={{ base: '100%', lg: '49%' }}
      minHeight={{ base: '720px', md: '650px', lg: '100%' }}
      padding={{ base: '104px 22px 360px', md: '120px 44px 330px', lg: '82px 28px 54px 42px' }}
      position="relative"
      zIndex={1}
    >
      <Text
        color="#7c725f"
        fontSize="0.74rem"
        fontWeight={700}
        letterSpacing="0.1em"
        textTransform="uppercase"
      >
        {locale === 'ru' ? 'Новый эксперимент' : 'A new experiment'}
      </Text>
      <EditorialHeroTitle
        fontSize={{ base: '2.65rem', md: '3.7rem', xl: '4.25rem' }}
        letterSpacing="-0.052em"
        lineHeight={0.97}
        marginTop="15px"
        maxWidth="620px"
      >
        {text.heroTitle}
      </EditorialHeroTitle>
      <Text
        color="#4f554c"
        fontSize={{ base: '0.9rem', md: '0.98rem' }}
        lineHeight={1.62}
        marginTop="25px"
        maxWidth="500px"
      >
        {text.heroLead}
      </Text>
      <Image
        alt={locale === 'ru' ? 'Подпись Анастасии' : "Anastasia's signature"}
        height="auto"
        marginTop="18px"
        src="/about/anastasia-signature-v2.webp"
        width={{ base: '140px', md: '150px' }}
      />
    </Flex>
  </Box>
);
