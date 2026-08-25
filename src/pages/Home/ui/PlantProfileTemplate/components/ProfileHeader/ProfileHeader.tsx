import { Flex, Text } from '@chakra-ui/react';
import type { CollectionPlant } from 'src/entities/collection';
import type { Locale } from 'src/shared/config';

import { ModalTopBar } from '../../../ModalTopBar/ModalTopBar';

interface ProfileHeaderProps {
  readonly locale: Locale;
  readonly onBack: () => void;
  readonly onClose: () => void;
  readonly plant: CollectionPlant;
}

export const ProfileHeader = ({ locale, onBack, onClose, plant }: ProfileHeaderProps) => (
  <>
    <ModalTopBar
      backLabel={locale === 'ru' ? 'Мои растения' : 'My plants'}
      closeLabel={locale === 'ru' ? 'Закрыть карточку растения' : 'Close plant profile'}
      onBack={onBack}
      onClose={onClose}
    />
    <Flex
      alignItems="center"
      direction="column"
      marginTop={{ base: '24px', md: '30px' }}
      paddingInline={{ base: '16px', md: '28px' }}
      textAlign="center"
    >
      <Text
        as="h2"
        color="#104820"
        fontSize={{ base: '2.2rem', md: 'clamp(3.1rem, 5vw, 4.8rem)' }}
        fontWeight={520}
        lineHeight={0.95}
        margin={0}
        textStyle="serif"
      >
        {plant.name[locale]}
      </Text>
      <Text
        color="#627c4b"
        fontSize={{ base: '1.45rem', md: '2.05rem' }}
        fontStyle="italic"
        marginTop="6px"
        textStyle="serif"
      >
        {plant.profile.latinName}
      </Text>
    </Flex>
  </>
);
