import { Box, Flex, Grid, Image, Text } from '@chakra-ui/react';
import type { CollectionPlant } from 'src/entities/collection';
import type { Locale } from 'src/shared/config';

import type { ProfileCopy } from '../../content/profileContent';

interface ProfileFooterProps {
  readonly locale: Locale;
  readonly plant: CollectionPlant;
  readonly text: ProfileCopy;
}

const FooterCard = ({
  accent = false,
  children,
  icon,
  image,
  index,
  photo,
  title,
  unified = false,
}: {
  readonly accent?: boolean;
  readonly children: React.ReactNode;
  readonly icon?: string;
  readonly image?: string;
  readonly index?: number;
  readonly photo?: string;
  readonly title: string;
  readonly unified?: boolean;
}) => (
  <Flex
    _after={
      unified && index
        ? {
            background:
              'linear-gradient(90deg, transparent 0%, #e8dece 12%, #e8dece 88%, transparent 100%)',
            content: '""',
            display: { base: 'block', lg: 'none' },
            height: '1px',
            left: '16px',
            position: 'absolute',
            right: '16px',
            top: 0,
          }
        : undefined
    }
    _before={
      unified && index
        ? {
            background:
              'linear-gradient(180deg, transparent 0%, #e8dece 12%, #e8dece 88%, transparent 100%)',
            bottom: '16px',
            content: '""',
            display: { base: 'none', lg: 'block' },
            left: 0,
            position: 'absolute',
            top: '16px',
            width: '1px',
          }
        : undefined
    }
    background={accent ? '#fff3e9' : '#fffaf3'}
    border={unified ? undefined : '1px solid #e8dece'}
    direction="column"
    gap="9px"
    minHeight="138px"
    padding="16px"
    position="relative"
  >
    <Flex gap="12px" height="100%">
      <Flex direction="column" flex="1" gap="9px" minWidth={0}>
        <Flex alignItems="center" gap="8px">
          {image ? (
            <Image alt="" height="38px" objectFit="contain" src={image} width="38px" />
          ) : null}
          <Text
            color={accent ? '#b24132' : '#27502d'}
            fontSize="0.8rem"
            fontWeight={800}
            textTransform="uppercase"
          >
            {icon ? `${icon} ` : ''}
            {title}
          </Text>
        </Flex>
        <Flex justify="space-between" gap="8px">
          <Box color="#2d362d" fontSize="0.8rem" lineHeight={1.48}>
            {children}
          </Box>{' '}
          {photo ? (
            <Image
              alt=""
              borderRadius="8px"
              flexShrink={0}
              height="132px"
              objectFit="contain"
              src={photo}
              width={{ base: '104px', lg: '132px' }}
              h={{ base: '110px', lg: '128px' }}
            />
          ) : null}
        </Flex>
      </Flex>
    </Flex>
  </Flex>
);

const ImportantCard = ({
  children,
  image,
  title,
}: {
  readonly children: React.ReactNode;
  readonly image: string;
  readonly title: string;
}) => (
  <Flex
    background="#fff3ed"
    border="1px solid #e7cfc3"
    borderRadius="8px"
    marginTop="10px"
    minHeight="122px"
    padding={{ base: '16px 82px 16px 16px', md: '16px 128px 16px 18px' }}
    position="relative"
    width="100%"
  >
    <Flex alignItems="flex-start" gap="14px">
      <Flex
        alignItems="center"
        border="2px solid #c53932"
        borderRadius="50%"
        color="#bd352e"
        flexShrink={0}
        fontSize="1.35rem"
        fontWeight={700}
        height="34px"
        justifyContent="center"
        lineHeight={1}
        marginTop="2px"
        width="34px"
      >
        !
      </Flex>
      <Flex direction="column" gap="6px">
        <Text color="#b72f2b" fontSize="0.8rem" fontWeight={800} textTransform="uppercase">
          {title}
        </Text>
        <Box color="#3e3a35" fontSize="0.8rem" lineHeight={1.48}>
          {children}
        </Box>
      </Flex>
    </Flex>
    <Image
      alt=""
      bottom="7px"
      height={{ base: '76px', md: '96px' }}
      objectFit="contain"
      position="absolute"
      right="10px"
      src={image}
      width={{ base: '72px', md: '114px' }}
    />
  </Flex>
);

export const ProfileFooter = ({ locale, plant, text }: ProfileFooterProps) => {
  const footer = plant.profile.footer;

  return (
    <>
      <Grid
        background="#fffaf3"
        border="1px solid #e8dece"
        borderRadius="10px"
        gap="0"
        gridTemplateColumns={{ base: '1fr', lg: '1.1fr 0.9fr 1.2fr' }}
        marginTop="12px"
        overflow="hidden"
      >
        <FooterCard
          image={plant.profile.propagationIcon ?? '/plant-profile/footer-propagation.webp'}
          index={0}
          photo={plant.profile.propagationImage}
          title={text.propagation}
          unified
        >
          {footer.propagation[locale]}
        </FooterCard>
        <FooterCard
          image="/plant-profile/footer-problems.webp"
          index={1}
          title={text.problems}
          unified
        >
          {footer.problems[locale].map((item) => (
            <Text key={item}>❧ {item}</Text>
          ))}
        </FooterCard>
        <FooterCard image="/plant-profile/footer-facts.webp" index={2} title={text.facts} unified>
          {footer.facts[locale].map((item) => (
            <Text key={item}>› {item}</Text>
          ))}
        </FooterCard>
      </Grid>
      <ImportantCard
        image={plant.profile.importantImage ?? '/plant-profile/important-vine.webp'}
        title={text.important}
      >
        {footer.important[locale]}
      </ImportantCard>
    </>
  );
};
