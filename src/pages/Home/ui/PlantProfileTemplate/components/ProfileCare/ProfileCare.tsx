import { Flex, Grid, Text } from '@chakra-ui/react';
import type { CollectionPlant } from 'src/entities/collection';
import type { Locale } from 'src/shared/config';

import { secondaryCare, type ProfileCopy } from '../../content/profileContent';

interface ProfileCareProps {
  readonly locale: Locale;
  readonly plant: CollectionPlant;
  readonly text: ProfileCopy;
}

const QuickFact = ({ icon, label, value }: { readonly icon: string; readonly label: string; readonly value: string }) => (
  <Flex alignItems="center" borderLeft="1px solid #e8dece" direction="column" gap="3px" minHeight="94px" padding="12px" textAlign="center">
    <Text color="#788d52" fontSize="1.3rem">{icon}</Text>
    <Text color="#344434" fontSize="0.7rem" fontWeight={800} textTransform="uppercase">{label}</Text>
    <Text color="#4d574a" fontSize="0.75rem" lineHeight={1.25}>{value}</Text>
  </Flex>
);

const CareCard = ({ body, icon, title }: { readonly body: string; readonly icon: string; readonly title: string }) => (
  <Flex background="#fffaf3" border="1px solid #e8dece" direction="column" gap="7px" minHeight="160px" padding="16px">
    <Text color="#728b50" fontSize="1.35rem">{icon}</Text>
    <Text color="#27502d" fontSize="0.78rem" fontWeight={800} textTransform="uppercase">{title}</Text>
    <Text color="#2e372e" fontSize="0.78rem" lineHeight={1.42}>{body}</Text>
  </Flex>
);

export const ProfileCare = ({ locale, plant, text }: ProfileCareProps) => (
  <>
    <Grid background="#fffaf3" border="1px solid #e8dece" borderRadius="10px" gap="0" gridTemplateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' }} marginTop="12px">
      <QuickFact icon="↗" label={text.fastGrowth} value={plant.profile.quickFacts.growth[locale]} />
      <QuickFact icon="↕" label={locale === 'ru' ? 'Побеги' : 'Shoots'} value={plant.profile.quickFacts.height[locale]} />
      <QuickFact icon="◌" label={text.humidity} value={plant.profile.quickFacts.humidity[locale]} />
      <QuickFact icon="☀" label={text.light} value={plant.profile.quickFacts.light[locale]} />
      <QuickFact icon="♨" label={text.temperature} value={plant.profile.quickFacts.temperature[locale]} />
    </Grid>
    <Grid gap="0" gridTemplateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} marginTop="12px">
      {plant.profile.care.map((care, index) => <CareCard body={care.body[locale]} icon={['☀', '◌', '◒', '♨'][index]!} key={care.title[locale]} title={care.title[locale]} />)}
    </Grid>
    <Grid gap="0" gridTemplateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} marginTop="1px">
      {secondaryCare[locale].map(([title, body], index) => <CareCard body={body} icon={['♧', '▣', '▤', '▦'][index]!} key={title} title={title} />)}
    </Grid>
  </>
);
