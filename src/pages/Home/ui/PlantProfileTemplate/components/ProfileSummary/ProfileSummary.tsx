import { Box, Button, Flex, Grid, Image, Text } from '@chakra-ui/react';
import type { CollectionPlant } from 'src/entities/collection';
import type { Locale } from 'src/shared/config';

import type { ProfileCopy } from '../../content/profileContent';
import { GrowthFacts } from '../ProfileCare/ProfileCare';

interface ProfileSummaryProps {
  readonly locale: Locale;
  readonly onImageOpen: () => void;
  readonly plant: CollectionPlant;
  readonly text: ProfileCopy;
}

export const ProfileSummary = ({ locale, onImageOpen, plant, text }: ProfileSummaryProps) => (
  <Grid gap="12px" gridTemplateColumns={{ base: '1fr', md: '0.64fr 1.36fr' }}>
    <Box
      aspectRatio="3 / 4"
      border={0}
      borderRadius="10px"
      overflow="hidden"
      position="relative"
      _after={{
        border: '1px solid #e8dece',
        borderRadius: 'inherit',
        content: '""',
        inset: 0,
        pointerEvents: 'none',
        position: 'absolute',
        zIndex: 2,
      }}
    >
      <Text
        background="#526c2d"
        borderRadius="0 0 8px 0"
        color="#fffaf0"
        fontSize="0.72rem"
        fontWeight={800}
        left={0}
        padding="8px 12px"
        position="absolute"
        textTransform="uppercase"
        top={0}
        zIndex={1}
      >
        {locale === 'ru' ? 'Моё растение' : 'My plant'}
      </Text>
      <Button
        aria-label={
          locale === 'ru'
            ? `Открыть фотографию: ${plant.name[locale]}`
            : `Open photo: ${plant.name[locale]}`
        }
        borderRadius={0}
        cursor="zoom-in"
        display="block"
        height="100%"
        lineHeight={0}
        minWidth={0}
        overflow="hidden"
        padding={0}
        type="button"
        variant="plain"
        width="100%"
        onClick={onImageOpen}
        _focusVisible={{ outline: '3px solid #718d4f', outlineOffset: '-3px' }}
        _hover={{ '& img': { transform: 'scale(1.04)' } }}
      >
        <Image
          alt={plant.name[locale]}
          display="block"
          height="100%"
          objectFit="cover"
          src={plant.image}
          transform="scale(1.02)"
          transition="transform 180ms ease"
          width="100%"
        />
      </Button>
    </Box>
    <Flex direction="column" gap="12px">
      <GrowthFacts locale={locale} plant={plant} text={text} />
      <Flex
        background="#f9f4eb"
        border="1px solid #e8dece"
        borderRadius="10px"
        direction="column"
        gap="12px"
        padding="20px 22px"
      >
        <Text color="#202820" fontSize="0.93rem" lineHeight={1.52}>
          {plant.profile.overview[locale]}
        </Text>
        <Text color="#495b3f" fontSize="0.9rem" lineHeight={1.48}>
          ❧ {plant.profile.notes[locale]}
        </Text>
      </Flex>
    </Flex>
  </Grid>
);
