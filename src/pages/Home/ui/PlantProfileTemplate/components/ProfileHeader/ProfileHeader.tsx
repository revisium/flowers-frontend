import { Button, Flex, Text } from '@chakra-ui/react';
import type { CollectionPlant } from 'src/entities/collection';
import type { Locale } from 'src/shared/config';

interface ProfileHeaderProps {
  readonly locale: Locale;
  readonly onBack: () => void;
  readonly onClose: () => void;
  readonly plant: CollectionPlant;
}

export const ProfileHeader = ({ locale, onBack, onClose, plant }: ProfileHeaderProps) => (
  <>
    <Flex alignItems="center" justifyContent="space-between" marginTop="8px" width="100%">
      <Button
        color="#526246"
        fontWeight={720}
        padding={0}
        type="button"
        variant="plain"
        onClick={onBack}
      >
        ← {locale === 'ru' ? 'Мои растения' : 'My plants'}
      </Button>
      <Button
        aria-label={locale === 'ru' ? 'Закрыть карточку растения' : 'Close plant profile'}
        border="1px solid rgba(82, 98, 70, 0.35)"
        borderRadius="999px"
        color="#3e513d"
        fontSize="24px"
        height="42px"
        minWidth="42px"
        padding={0}
        type="button"
        variant="plain"
        onClick={onClose}
      >
        ×
      </Button>
    </Flex>
    <Flex
      alignItems="center"
      direction="column"
      marginTop={{ base: '18px', md: '8px' }}
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
