import type { Locale } from 'src/shared/config';

import { type CategoryDetailData } from './types';

const araceaePlantsRu = [
  { image: '/plants/araceae-modal/alocasia.jpg', name: "Alocasia baginda 'Dragon Scale'" },
  { image: '/plants/araceae-modal/alocasia.jpg', name: "Alocasia x amazonica 'Bambino'" },
  { image: '/plants/araceae-modal/alocasia.jpg', name: "Alocasia reginula 'Black Velvet'" },
  { image: '/plants/araceae-modal/aglaonema.jpg', name: "Aglaonema 'Red Valentine'" },
  { image: '/plants/araceae-modal/aglaonema.jpg', name: "Aglaonema 'Silver Queen'" },
  { image: '/plants/araceae-modal/aglaonema.jpg', name: 'Aglaonema розовая' },
  {
    image: '/plants/araceae-modal/philodendron.jpg',
    name: "Philodendron erubescens 'Imperial Red'",
  },
  { image: '/plants/araceae-modal/monstera.jpg', name: 'Monstera adansonii' },
  { image: '/plants/araceae-modal/anthurium.jpg', name: 'Anthurium' },
  { image: '/plants/araceae-modal/spathiphyllum.jpg', name: 'Spathiphyllum' },
] as const;

const araceaePlantsEn = [
  { image: '/plants/araceae-modal/alocasia.jpg', name: "Alocasia baginda 'Dragon Scale'" },
  { image: '/plants/araceae-modal/alocasia.jpg', name: "Alocasia x amazonica 'Bambino'" },
  { image: '/plants/araceae-modal/alocasia.jpg', name: "Alocasia reginula 'Black Velvet'" },
  { image: '/plants/araceae-modal/aglaonema.jpg', name: "Aglaonema 'Red Valentine'" },
  { image: '/plants/araceae-modal/aglaonema.jpg', name: "Aglaonema 'Silver Queen'" },
  { image: '/plants/araceae-modal/aglaonema.jpg', name: 'Pink Aglaonema' },
  {
    image: '/plants/araceae-modal/philodendron.jpg',
    name: "Philodendron erubescens 'Imperial Red'",
  },
  { image: '/plants/araceae-modal/monstera.jpg', name: 'Monstera adansonii' },
  { image: '/plants/araceae-modal/anthurium.jpg', name: 'Anthurium' },
  { image: '/plants/araceae-modal/spathiphyllum.jpg', name: 'Spathiphyllum' },
] as const;

const sharedAraceaeAssets = {
  heroImage: '/plants/araceae-modal/hero-cutout-transparent.png',
  heroPosition: 'calc(100% + 70px) top',
  heroSize: { base: '540px auto', md: '650px auto', lg: '700px auto' },
  originMapImage: '/plants/araceae-modal/origin-map-transparent.png',
} as const;

export const araceaeCategoryDataByLocale: Record<Locale, CategoryDetailData> = {
  ru: {
    backLabel: 'Назад к категориям',
    closingNote: 'Ароидные - это не просто растения, это целый мир удивительных форм и адаптаций.',
    collectionPlants: araceaePlantsRu,
    collectionTitle: 'Растения из моей коллекции (9)',
    description:
      'Ароидные - одно из крупнейших семейств цветковых растений. Большинство представителей происходят из тропических и субтропических регионов и отличаются эффектными листьями, воздушными корнями и соцветиями-початками.',
    facts: [
      'Семейство включает более 100 родов и тысячи видов, от миниатюрных растений до крупных лиан.',
      'Белое покрывало спатифиллума и красная пластина антуриума - это не лепестки, а видоизмененный лист.',
      'Монстеры в природе могут подниматься по деревьям и выращивать листья больше человеческой руки.',
      'У многих ароидных молодые и взрослые листья выглядят так по-разному, будто это разные растения.',
    ],
    factsTitle: 'Интересные факты',
    heroImage: sharedAraceaeAssets.heroImage,
    heroPosition: sharedAraceaeAssets.heroPosition,
    heroSize: sharedAraceaeAssets.heroSize,
    latinName: 'Araceae',
    origin: {
      mapImage: sharedAraceaeAssets.originMapImage,
      text: 'Тропические и субтропические регионы Азии, Центральной и Южной Америки, Африки, Австралии и островов Тихого океана.',
    },
    originTitle: 'Происхождение',
    title: 'Ароидные',
    traits: [
      {
        body: 'Соцветие-початок с покрывалом, которое часто выглядит как отдельный цветок.',
        image: '/plants/araceae-modal/spathiphyllum.jpg',
      },
      {
        body: 'Листья простые, часто крупные, с выразительными жилками и разными формами пластины.',
        image: '/plants/araceae-modal/alocasia.jpg',
      },
      {
        body: 'Многие представители образуют воздушные корни и цепляются за опору.',
        image: '/plants/araceae-modal/monstera.jpg',
      },
      {
        body: 'Часть видов содержит оксалаты кальция, поэтому их лучше держать вдали от животных.',
        image: '/plants/araceae-modal/philodendron.jpg',
      },
    ],
    traitsTitle: 'Отличительные признаки',
  },
  en: {
    backLabel: 'Back to categories',
    closingNote: 'Aroids are more than houseplants: they are a world of remarkable forms and adaptations.',
    collectionPlants: araceaePlantsEn,
    collectionTitle: 'Plants in my collection (9)',
    description:
      'Aroids are one of the largest families of flowering plants. Most members come from tropical and subtropical regions and are known for dramatic foliage, aerial roots, and spadix-and-spathe inflorescences.',
    facts: [
      'The family includes more than 100 genera and thousands of species, from compact plants to large climbing vines.',
      'The white spathe of Spathiphyllum and the red plate of Anthurium are modified leaves, not petals.',
      'In nature, Monsteras can climb trees and grow leaves larger than a human hand.',
      'Juvenile and mature leaves of many aroids can look so different that they seem like separate plants.',
    ],
    factsTitle: 'Interesting Facts',
    heroImage: sharedAraceaeAssets.heroImage,
    heroPosition: sharedAraceaeAssets.heroPosition,
    heroSize: sharedAraceaeAssets.heroSize,
    latinName: 'Araceae',
    origin: {
      mapImage: sharedAraceaeAssets.originMapImage,
      text: 'Tropical and subtropical regions of Asia, Central and South America, Africa, Australia, and Pacific islands.',
    },
    originTitle: 'Origin',
    title: 'Aroids',
    traits: [
      {
        body: 'A spadix with a spathe, often perceived as a single flower.',
        image: '/plants/araceae-modal/spathiphyllum.jpg',
      },
      {
        body: 'Simple, often large leaves with expressive veins and varied blade shapes.',
        image: '/plants/araceae-modal/alocasia.jpg',
      },
      {
        body: 'Many members form aerial roots and use them to cling to support.',
        image: '/plants/araceae-modal/monstera.jpg',
      },
      {
        body: 'Some species contain calcium oxalate crystals, so they are best kept away from pets.',
        image: '/plants/araceae-modal/philodendron.jpg',
      },
    ],
    traitsTitle: 'Distinctive Traits',
  },
};
