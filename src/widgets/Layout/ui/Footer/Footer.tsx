import { Button, Flex, Grid, Image, Link, Text } from '@chakra-ui/react';
import {
  formatCollectionPlantCount,
  getCollectionFamilyCount,
  getCollectionPlantCount,
} from 'src/entities/collection';
import type { Locale } from 'src/shared/config';

import { layoutNavigationLinks } from '../../model/layoutNavigation';

interface FooterProps {
  readonly locale: Locale;
  readonly onCollectionOpen: () => void;
}

const copy = {
  ru: {
    brandEyebrow: 'Личная оранжерея',
    brandTitle: 'Оранжерея',
    collectionButton: 'Смотреть коллекцию',
    collectionEyebrow: 'В коллекции',
    description:
      'Растения, наблюдения и маленькие ботанические истории, которые растут вместе со мной.',
    homeLabel: 'Оранжерея, главная',
    navLabel: 'Разделы сайта',
    signOff: 'Выращено с заботой',
  },
  en: {
    brandEyebrow: 'A personal greenhouse',
    brandTitle: 'Greenhouse',
    collectionButton: 'View collection',
    collectionEyebrow: 'In the collection',
    description:
      'Plants, observations, and small botanical stories that keep growing alongside me.',
    homeLabel: 'Greenhouse, home',
    navLabel: 'Site sections',
    signOff: 'Grown with care',
  },
} as const;

export const Footer = ({ locale, onCollectionOpen }: FooterProps) => {
  const text = copy[locale];
  const plantCount = getCollectionPlantCount();
  const familyCount = getCollectionFamilyCount();
  const familySummary =
    locale === 'ru'
      ? `представлено ${familyCount} семейств`
      : `${familyCount} families represented`;

  return (
    <Flex
      as="footer"
      background="#263729"
      color="#fff8e9"
      direction="column"
      flex="0 0 auto"
      overflow="hidden"
      padding={{ base: '40px 22px 22px', md: '46px 38px 24px', lg: '52px 48px 26px' }}
      position="relative"
    >
      <Image
        alt=""
        aria-hidden="true"
        bottom={{ base: '86px', md: '34px' }}
        height="auto"
        opacity={0.07}
        pointerEvents="none"
        position="absolute"
        right={{ base: '-54px', md: '26px' }}
        src="/greenhouse-logo-mark.png"
        width={{ base: '210px', md: '270px' }}
      />

      <Grid
        gap={{ base: '34px', md: '38px', lg: '64px' }}
        gridTemplateColumns={{
          base: '1fr',
          md: 'minmax(0, 1.2fr) minmax(190px, .8fr)',
          lg: 'minmax(280px, 1.25fr) minmax(180px, .65fr) minmax(270px, 1fr)',
        }}
        position="relative"
        zIndex={1}
      >
        <Flex direction="column" maxWidth="470px">
          <Text
            color="rgba(255, 248, 233, 0.58)"
            fontSize="0.68rem"
            fontWeight={700}
            letterSpacing="0.18em"
            textTransform="uppercase"
          >
            {text.brandEyebrow}
          </Text>
          <Link
            aria-label={text.homeLabel}
            color="#fff8e9"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize={{ base: '2.2rem', md: '2.65rem' }}
            fontWeight={400}
            href="/"
            lineHeight={1}
            marginTop="12px"
            textDecoration="none"
            width="fit-content"
            _hover={{ color: '#dce8cc', textDecoration: 'none' }}
          >
            {text.brandTitle}
          </Link>
          <Text
            color="rgba(255, 248, 233, 0.72)"
            fontSize={{ base: '0.9rem', md: '0.96rem' }}
            lineHeight={1.65}
            marginTop="18px"
            maxWidth="430px"
          >
            {text.description}
          </Text>
        </Flex>

        <Flex aria-label={text.navLabel} as="nav" direction="column" gap="13px">
          {layoutNavigationLinks[locale].map(([label, href]) => (
            <Link
              color="rgba(255, 248, 233, 0.82)"
              fontSize="0.88rem"
              fontWeight={500}
              href={href}
              key={href}
              textDecoration="none"
              width="fit-content"
              _hover={{ color: '#fff8e9', textDecoration: 'none' }}
            >
              {label}
            </Link>
          ))}
        </Flex>

        <Flex
          alignItems="flex-start"
          background="rgba(255, 248, 233, 0.055)"
          border="1px solid rgba(255, 248, 233, 0.12)"
          borderRadius="16px"
          direction="column"
          gridColumn={{ md: '1 / -1', lg: 'auto' }}
          maxWidth={{ md: '100%', lg: '360px' }}
          padding={{ base: '22px', md: '24px' }}
        >
          <Text
            color="rgba(255, 248, 233, 0.56)"
            fontSize="0.67rem"
            fontWeight={700}
            letterSpacing="0.16em"
            textTransform="uppercase"
          >
            {text.collectionEyebrow}
          </Text>
          <Text
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize={{ base: '1.45rem', md: '1.65rem' }}
            lineHeight={1.25}
            marginTop="11px"
          >
            {formatCollectionPlantCount(plantCount, locale)} · {familySummary}
          </Text>
          <Button
            background="#fff8e9"
            borderRadius="999px"
            color="#263729"
            fontSize="0.82rem"
            fontWeight={700}
            height="42px"
            marginTop="24px"
            onClick={onCollectionOpen}
            paddingX="20px"
            type="button"
            _hover={{ background: '#e4edda' }}
          >
            {text.collectionButton} →
          </Button>
        </Flex>
      </Grid>

      <Flex
        alignItems={{ base: 'flex-start', md: 'center' }}
        borderTop="1px solid rgba(255, 248, 233, 0.12)"
        color="rgba(255, 248, 233, 0.48)"
        direction={{ base: 'column', md: 'row' }}
        fontSize="0.72rem"
        gap={{ base: '7px', md: '16px' }}
        justifyContent="space-between"
        marginTop={{ base: '38px', md: '44px' }}
        paddingTop="18px"
        position="relative"
        zIndex={1}
      >
        <Text>{text.signOff}</Text>
        <Text>
          © {new Date().getFullYear()} {text.brandTitle}
        </Text>
      </Flex>
    </Flex>
  );
};
