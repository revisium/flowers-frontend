import { Flex, Grid, Image, Text } from '@chakra-ui/react';
import type { Locale } from 'src/shared/config';
import { aboutFeatures, type AboutCopy } from '../../model/aboutPageData';
import { AboutFeatureArtwork } from '../AboutFeatureArtwork/AboutFeatureArtwork';
import { BotanicalHeading } from '../BotanicalHeading/BotanicalHeading';

interface AboutFeaturesProps {
  readonly locale: Locale;
  readonly text: AboutCopy;
}

export const AboutFeatures = ({ locale, text }: AboutFeaturesProps) => (
  <Grid
    borderRadius={{ md: '8px' }}
    gridTemplateColumns={{ base: '1fr', lg: '34% 66%' }}
    margin={{ base: '18px', md: '26px 34px 0' }}
    overflow="hidden"
  >
    <Image
      alt={locale === 'ru' ? 'Домашняя коллекция растений' : 'A home plant collection'}
      height={{ base: '360px', lg: '100%' }}
      minHeight={{ lg: '294px' }}
      objectFit="cover"
      objectPosition="center"
      src="/about/about-collection.webp"
      width="100%"
    />
    <Flex direction="column" justifyContent="center" padding={{ base: '38px 20px 44px', md: '32px 28px' }}>
      <BotanicalHeading id="about-features">{text.what}</BotanicalHeading>
      <Grid
        aria-labelledby="about-features"
        gap={{ base: '30px 18px', md: '30px 24px' }}
        gridTemplateColumns={{ base: 'repeat(2, minmax(0, 1fr))', md: 'repeat(5, minmax(0, 1fr))' }}
        marginTop="34px"
      >
        {aboutFeatures[locale].map(([icon, title, description]) => (
          <Flex alignItems="center" direction="column" key={title} textAlign="center">
            <Flex
              alignItems="center"
              border="1px solid #d9d4c6"
              borderRadius="50%"
              height="52px"
              justifyContent="center"
              width="52px"
            >
              <AboutFeatureArtwork name={icon} />
            </Flex>
            <Text color="#343a31" fontSize="0.82rem" fontWeight={600} lineHeight={1.25} marginTop="15px">{title}</Text>
            <Text color="#737268" fontSize="0.78rem" lineHeight={1.55} marginTop="9px">{description}</Text>
          </Flex>
        ))}
      </Grid>
    </Flex>
  </Grid>
);
