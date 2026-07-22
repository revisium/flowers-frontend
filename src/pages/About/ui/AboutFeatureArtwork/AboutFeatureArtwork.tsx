import { Image } from '@chakra-ui/react';
import type { AboutFeatureArtworkName } from '../../model/aboutPageData';

interface AboutFeatureArtworkProps {
  readonly name: AboutFeatureArtworkName;
}

const artworkByName: Record<AboutFeatureArtworkName, string> = {
  camera: '/about/feature-growth-photos.webp',
  care: '/about/feature-care.webp',
  flower: '/about/feature-flowering.webp',
  note: '/about/feature-notes.webp',
  'plant-card': '/about/feature-plant-card.webp',
};

export const AboutFeatureArtwork = ({ name }: AboutFeatureArtworkProps) => (
  <Image
    alt=""
    aria-hidden="true"
    boxSize="38px"
    objectFit="contain"
    src={artworkByName[name]}
  />
);
