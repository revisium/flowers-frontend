import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import type { CollectionPlant } from 'src/entities/collection';
import type { Locale } from 'src/shared/config';

import { ProfileCare } from './components/ProfileCare/ProfileCare';
import { ProfileFacts } from './components/ProfileFacts/ProfileFacts';
import { ProfileFooter } from './components/ProfileFooter/ProfileFooter';
import { ProfileHeader } from './components/ProfileHeader/ProfileHeader';
import { ProfileImageLightbox } from './components/ProfileImageLightbox/ProfileImageLightbox';
import { ProfileSummary } from './components/ProfileSummary/ProfileSummary';
import { ProfileVariants } from './components/ProfileVariants/ProfileVariants';
import { profileCopy } from './content/profileContent';

interface PlantProfileTemplateProps {
  readonly locale: Locale;
  readonly plant: CollectionPlant;
  readonly onBack: () => void;
  readonly onClose: () => void;
}

export const PlantProfileTemplate = ({
  locale,
  onBack,
  onClose,
  plant,
}: PlantProfileTemplateProps) => {
  const text = profileCopy[locale];
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const variantImages =
    plant.profile.variants?.items.map((variant) => ({
      alt: variant.name[locale],
      src: variant.image,
    })) ?? [];
  const requestedMainImageVariantIndex = plant.profile.mainImageVariantIndex;
  const mainImageVariantIndex =
    requestedMainImageVariantIndex !== undefined &&
    variantImages[requestedMainImageVariantIndex] !== undefined
      ? requestedMainImageVariantIndex
      : null;
  const galleryImages =
    mainImageVariantIndex === null
      ? [{ alt: plant.name[locale], src: plant.image }, ...variantImages]
      : variantImages;

  return (
    <>
      <Flex
        background="#fdfaf3"
        direction="column"
        margin="0 auto"
        maxWidth="1200px"
        padding={{ base: '16px', md: '22px 28px 28px' }}
        position="relative"
        width="100%"
      >
        <ProfileHeader locale={locale} plant={plant} onBack={onBack} onClose={onClose} />
        <ProfileFacts locale={locale} plant={plant} text={text} />
        <ProfileSummary
          locale={locale}
          plant={plant}
          text={text}
          onImageOpen={() => setActiveImageIndex(mainImageVariantIndex ?? 0)}
        />
        <ProfileVariants
          locale={locale}
          plant={plant}
          onImageOpen={(variantIndex) =>
            setActiveImageIndex(variantIndex + (mainImageVariantIndex === null ? 1 : 0))
          }
        />
        <ProfileCare locale={locale} plant={plant} />
        <ProfileFooter locale={locale} plant={plant} text={text} />
      </Flex>

      {activeImageIndex === null ? null : (
        <ProfileImageLightbox
          activeIndex={activeImageIndex}
          closeLabel={locale === 'ru' ? 'Закрыть просмотр фотографии' : 'Close photo viewer'}
          images={galleryImages}
          nextLabel={locale === 'ru' ? 'Следующая фотография' : 'Next photo'}
          previousLabel={locale === 'ru' ? 'Предыдущая фотография' : 'Previous photo'}
          onClose={() => setActiveImageIndex(null)}
          onSelect={setActiveImageIndex}
        />
      )}
    </>
  );
};
