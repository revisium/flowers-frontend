import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import type { CollectionPlant } from 'src/entities/collection';
import type { Locale } from 'src/shared/config';

import type { ProfileCopy } from '../../content/profileContent';
import { LeafMeter } from '../LeafMeter/LeafMeter';

interface ProfileFactsProps {
  readonly locale: Locale;
  readonly plant: CollectionPlant;
  readonly text: ProfileCopy;
}

const getDividerStyles = (index: number) => ({
  _after: {
    background:
      'linear-gradient(180deg, transparent 0%, #eadfce 18%, #eadfce 82%, transparent 100%)',
    bottom: { md: '12px', lg: '10px' },
    content: '""',
    display: {
      base: 'none',
      md: index % 2 === 1 ? 'block' : 'none',
      lg: index === 0 ? 'none' : 'block',
    },
    left: 0,
    position: 'absolute',
    top: { md: '12px', lg: '10px' },
    width: '1px',
  },
  _before: {
    background:
      'linear-gradient(90deg, transparent 0%, #eadfce 18%, #eadfce 82%, transparent 100%)',
    content: '""',
    display: {
      base: index === 0 ? 'none' : 'block',
      md: index >= 2 ? 'block' : 'none',
      lg: 'none',
    },
    height: '1px',
    left: { base: '18px', md: '20px' },
    position: 'absolute',
    right: { base: '18px', md: '20px' },
    top: 0,
  },
  position: 'relative',
});

export const ProfileFacts = ({ locale, plant, text }: ProfileFactsProps) => (
  <Grid
    alignContent="start"
    alignItems="start"
    background="#fffaf3"
    border="1px solid #e8dece"
    borderRadius="10px"
    boxShadow="0 10px 24px rgba(91, 76, 54, 0.06)"
    gap={0}
    gridAutoRows="max-content"
    gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
    margin={{ base: '20px 0 16px', md: '18px auto 16px' }}
    padding={{ base: '8px', md: '10px 12px', lg: '6px 10px' }}
    width="100%"
  >
    {plant.profile.facts.map((fact, index) => (
      <Box
        {...getDividerStyles(index)}
        key={fact.label[locale]}
        minHeight="64px"
        padding={{ base: '14px 8px', md: '14px 16px', lg: '8px 20px' }}
        textAlign={{ base: 'center', md: 'left' }}
      >
        <Text color="#364b32" fontSize="0.68rem" fontWeight={800} textTransform="uppercase">
          ❧ {fact.label[locale]}
        </Text>
        <Text color="#242c24" fontSize="0.85rem" fontWeight={700} lineHeight={1.35} marginTop="4px">
          {fact.value[locale]}
        </Text>
      </Box>
    ))}
    <Flex
      {...getDividerStyles(3)}
      alignItems={{ base: 'center', md: 'flex-start' }}
      direction="column"
      gap="8px"
      justifyContent="flex-start"
      minHeight="64px"
      padding={{ base: '14px 8px', md: '14px 16px', lg: '8px 20px' }}
    >
      <Text color="#364b32" fontSize="0.68rem" fontWeight={800} textTransform="uppercase">
        ❧ {text.difficulty}
      </Text>
      <LeafMeter level={plant.profile.difficulty} />
    </Flex>
  </Grid>
);
