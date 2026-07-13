import { Flex } from '@chakra-ui/react';
import type { CollectionPlant } from 'src/entities/collection';
import type { Locale } from 'src/shared/config';

import { ProfileCare } from './components/ProfileCare/ProfileCare';
import { ProfileFacts } from './components/ProfileFacts/ProfileFacts';
import { ProfileFooter } from './components/ProfileFooter/ProfileFooter';
import { ProfileHeader } from './components/ProfileHeader/ProfileHeader';
import { ProfileSummary } from './components/ProfileSummary/ProfileSummary';
import { profileCopy } from './content/profileContent';

interface PlantProfileTemplateProps {
  readonly locale: Locale;
  readonly plant: CollectionPlant;
  readonly onBack: () => void;
  readonly onClose: () => void;
}

export const PlantProfileTemplate = ({ locale, onBack, onClose, plant }: PlantProfileTemplateProps) => {
  const text = profileCopy[locale];

  return (
    <Flex background="#fdfaf3" direction="column" margin="0 auto" maxWidth="1200px" padding={{ base: '16px', md: '22px 28px 28px' }} position="relative" width="100%">
      <ProfileHeader locale={locale} plant={plant} onBack={onBack} onClose={onClose} />
      <ProfileFacts locale={locale} plant={plant} text={text} />
      <ProfileSummary locale={locale} plant={plant} />
      <ProfileCare locale={locale} plant={plant} text={text} />
      <ProfileFooter locale={locale} text={text} />
    </Flex>
  );
};
