import { Flex, Grid, Image, Text } from '@chakra-ui/react';
import type { CollectionPlant } from 'src/entities/collection';
import type { Locale } from 'src/shared/config';

import type { ProfileCopy } from '../../content/profileContent';

interface ProfileCareProps {
  readonly locale: Locale;
  readonly plant: CollectionPlant;
}

interface GrowthFactsProps {
  readonly locale: Locale;
  readonly plant: CollectionPlant;
  readonly text: ProfileCopy;
}

const QuickFact = ({
  icon,
  label,
  showDivider = false,
  value,
}: {
  readonly icon: string;
  readonly label: string;
  readonly showDivider?: boolean;
  readonly value: string;
}) => (
  <Flex
    _before={
      showDivider
        ? {
            background:
              'linear-gradient(180deg, transparent 0%, #e8dece 16%, #e8dece 84%, transparent 100%)',
            bottom: '12px',
            content: '""',
            left: 0,
            position: 'absolute',
            top: '12px',
            width: '1px',
          }
        : undefined
    }
    alignItems="center"
    direction="row"
    gap="9px"
    minHeight="94px"
    padding="12px"
    position="relative"
    textAlign="left"
  >
    <Image alt="" flexShrink={0} height="54px" objectFit="contain" src={icon} width="42px" />
    <Flex direction="column" gap="3px">
      <Text color="#344434" fontSize="0.7rem" fontWeight={800} textTransform="uppercase">
        {label}
      </Text>
      <Text color="#4d574a" fontSize="0.75rem" lineHeight={1.25}>
        {value}
      </Text>
    </Flex>
  </Flex>
);

const CareCard = ({
  body,
  icon,
  index,
  title,
}: {
  readonly body: string;
  readonly icon: string;
  readonly index: number;
  readonly title: string;
}) => (
  <Flex
    _after={{
      background:
        'linear-gradient(90deg, transparent 0%, #e8dece 12%, #e8dece 88%, transparent 100%)',
      content: '""',
      display: { base: index >= 2 ? 'block' : 'none', lg: index >= 4 ? 'block' : 'none' },
      height: '1px',
      left: '16px',
      position: 'absolute',
      right: '16px',
      top: 0,
    }}
    _before={{
      background:
        'linear-gradient(180deg, transparent 0%, #e8dece 12%, #e8dece 88%, transparent 100%)',
      bottom: '16px',
      content: '""',
      display: { base: index % 2 === 1 ? 'block' : 'none', lg: index % 4 === 0 ? 'none' : 'block' },
      left: 0,
      position: 'absolute',
      top: '16px',
      width: '1px',
    }}
    direction="column"
    gap="10px"
    padding="16px"
    position="relative"
  >
    <Flex align="flex-end" gap="5px">
      <Image alt="" height="42px" objectFit="contain" src={icon} width="42px" />
      <Text color="#27502d" fontSize="0.78rem" fontWeight={800} textTransform="uppercase">
        {title}
      </Text>
    </Flex>
    <Text color="#2e372e" fontSize="0.78rem" lineHeight={1.42}>
      {body}
    </Text>
  </Flex>
);

export const GrowthFacts = ({ locale, plant, text }: GrowthFactsProps) => (
  <Grid
    background="#fffaf3"
    border="1px solid #e8dece"
    borderRadius="10px"
    gap="0"
    gridTemplateColumns="repeat(2, 1fr)"
  >
    <QuickFact
      icon="/plant-profile/growth-icon.png"
      label={text.fastGrowth}
      value={plant.profile.quickFacts.growth[locale]}
    />
    <QuickFact
      icon="/plant-profile/shoots-icon.png"
      label={locale === 'ru' ? 'Побеги' : 'Shoots'}
      showDivider
      value={plant.profile.quickFacts.height[locale]}
    />
  </Grid>
);

export const ProfileCare = ({ locale, plant }: ProfileCareProps) => (
  <Grid
    background="#fffaf3"
    border="1px solid #e8dece"
    borderRadius="10px"
    gap="0"
    gridTemplateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
    marginTop="12px"
    overflow="hidden"
  >
    {plant.profile.care.map((care, index) => (
      <CareCard
        body={care.body[locale]}
        icon={
          [
            '/plant-profile/care-lighting.png',
            '/plant-profile/care-watering.png',
            '/plant-profile/care-humidity.png',
            '/plant-profile/care-temperature.png',
          ][index]!
        }
        index={index}
        key={care.title[locale]}
        title={care.title[locale]}
      />
    ))}
    {plant.profile.secondaryCare.map((care, index) => (
      <CareCard
        body={care.body[locale]}
        icon={
          [
            '/plant-profile/care-soil.png',
            '/plant-profile/care-repotting.png',
            '/plant-profile/care-feeding.png',
            '/plant-profile/care-support.png',
          ][index]!
        }
        index={index + plant.profile.care.length}
        key={care.title[locale]}
        title={care.title[locale]}
      />
    ))}
  </Grid>
);
