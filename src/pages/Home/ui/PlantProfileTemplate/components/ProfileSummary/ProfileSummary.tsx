import { Box, Flex, Grid, Image, Text } from '@chakra-ui/react';
import type { CollectionPlant } from 'src/entities/collection';
import type { Locale } from 'src/shared/config';

interface ProfileSummaryProps {
  readonly locale: Locale;
  readonly plant: CollectionPlant;
}

export const ProfileSummary = ({ locale, plant }: ProfileSummaryProps) => (
  <>
    <Grid gap="18px">
      <Box background="#f9f4eb" border="1px solid #e8dece" borderRadius="10px" overflow="hidden" position="relative">
        <Text background="#526c2d" borderRadius="0 0 8px 0" color="#fffaf0" fontSize="0.72rem" fontWeight={800} left={0} padding="8px 12px" position="absolute" textTransform="uppercase" top={0} zIndex={1}>
          {locale === 'ru' ? 'Моё растение' : 'My plant'}
        </Text>
        <Image alt="" background="#f9f4eb" height={{ base: '520px', md: '680px' }} objectFit="contain" src={plant.image} width="100%" />
      </Box>
    </Grid>
    <Flex background="#f9f4eb" border="1px solid #e8dece" borderRadius="10px" direction="column" gap="12px" marginTop="12px" padding="20px 22px">
      <Text color="#202820" fontSize="0.93rem" lineHeight={1.52}>{plant.profile.overview[locale]}</Text>
      <Text color="#495b3f" fontSize="0.9rem" lineHeight={1.48}>❧ {plant.profile.notes[locale]}</Text>
    </Flex>
  </>
);
