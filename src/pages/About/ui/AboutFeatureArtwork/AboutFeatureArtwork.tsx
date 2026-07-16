import { Image } from '@chakra-ui/react';
import type { AboutFeatureArtworkName } from '../../model/aboutPageData';

interface AboutFeatureArtworkProps {
  readonly name: AboutFeatureArtworkName;
}

const artworkByName: Record<AboutFeatureArtworkName, string> = {
  camera: '/about/feature-growth-photos.png',
  care: '/about/feature-care.png',
  flower: '/about/feature-flowering.png',
  note: '/about/feature-notes.png',
  'plant-card': '/about/feature-plant-card.png',
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
