import type { Locale } from 'src/shared/config';

import { type CategoryDetailData, type CategoryPlant, type CategoryTrait } from './types';

const assets = {
  aglaonema: '/plants/araceae-modal/aglaonema.jpg',
  alocasia: '/plants/araceae-modal/alocasia.jpg',
  anthurium: '/plants/araceae-modal/anthurium.jpg',
  hero: '/plants/araceae-modal/hero-cutout-transparent.png',
  map: '/plants/araceae-modal/origin-map-transparent.png',
  monstera: '/plants/araceae-modal/monstera.jpg',
  philodendron: '/plants/araceae-modal/philodendron.jpg',
  spathiphyllum: '/plants/araceae-modal/spathiphyllum.jpg',
} as const;

const collectionPlants = [
  { image: assets.alocasia, name: "Alocasia baginda 'Dragon Scale'" },
  { image: assets.alocasia, name: "Alocasia x amazonica 'Bambino'" },
  { image: assets.alocasia, name: "Alocasia reginula 'Black Velvet'" },
  { image: assets.aglaonema, name: "Aglaonema 'Red Valentine'" },
  { image: assets.aglaonema, name: "Aglaonema 'Silver Queen'" },
  { image: assets.aglaonema, name: { en: 'Pink Aglaonema', ru: 'Aglaonema розовая' } },
  { image: assets.philodendron, name: "Philodendron erubescens 'Imperial Red'" },
  { image: assets.monstera, name: 'Monstera adansonii' },
  { image: assets.anthurium, name: 'Anthurium' },
  { image: assets.spathiphyllum, name: 'Spathiphyllum' },
] as const;

const createPlants = (locale: Locale): readonly CategoryPlant[] =>
  collectionPlants.map((plant) => ({
    image: plant.image,
    name: typeof plant.name === 'string' ? plant.name : plant.name[locale],
  }));

const createTrait = (body: string, image: string): CategoryTrait => ({ body, image });

const sharedData = {
  heroImage: assets.hero,
  heroPosition: 'calc(100% + 70px) top',
  heroSize: { base: '540px auto', md: '650px auto', lg: '700px auto' },
  latinName: 'Araceae',
  originMapImage: assets.map,
} as const;

const ruText = {
  backLabel: 'Назад к категориям',
  closingNote: 'Ароидные - это не просто растения, это целый мир удивительных форм и адаптаций.',
  collectionTitle: 'Растения из моей коллекции (10)',
  description:
    'Ароидные - одно из крупнейших семейств цветковых растений. Большинство представителей происходят из тропических и субтропических регионов и отличаются эффектными листьями, воздушными корнями и соцветиями-початками.',
  facts: [
    'Семейство включает более 100 родов и тысячи видов, от миниатюрных растений до крупных лиан.',
    'Белое покрывало спатифиллума и красная пластина антуриума - это не лепестки, а видоизмененный лист.',
    'Монстеры в природе могут подниматься по деревьям и выращивать листья больше человеческой руки.',
    'У многих ароидных молодые и взрослые листья выглядят так по-разному, будто это разные растения.',
  ],
  factsTitle: 'Интересные факты',
  originText:
    'Тропические и субтропические регионы Азии, Центральной и Южной Америки, Африки, Австралии и островов Тихого океана.',
  originTitle: 'Происхождение',
  title: 'Ароидные',
  traits: [
    createTrait('Соцветие-початок с покрывалом, которое часто выглядит как отдельный цветок.', assets.spathiphyllum),
    createTrait('Листья простые, часто крупные, с выразительными жилками и разными формами пластины.', assets.alocasia),
    createTrait('Многие представители образуют воздушные корни и цепляются за опору.', assets.monstera),
    createTrait('Часть видов содержит оксалаты кальция, поэтому их лучше держать вдали от животных.', assets.philodendron),
  ],
  traitsTitle: 'Отличительные признаки',
} as const;

const enText = {
  backLabel: 'Back to categories',
  closingNote: 'Aroids are more than houseplants: they are a world of remarkable forms and adaptations.',
  collectionTitle: 'Plants in my collection (10)',
  description:
    'Aroids are one of the largest families of flowering plants. Most members come from tropical and subtropical regions and are known for dramatic foliage, aerial roots, and spadix-and-spathe inflorescences.',
  facts: [
    'The family includes more than 100 genera and thousands of species, from compact plants to large climbing vines.',
    'The white spathe of Spathiphyllum and the red plate of Anthurium are modified leaves, not petals.',
    'In nature, Monsteras can climb trees and grow leaves larger than a human hand.',
    'Juvenile and mature leaves of many aroids can look so different that they seem like separate plants.',
  ],
  factsTitle: 'Interesting Facts',
  originText:
    'Tropical and subtropical regions of Asia, Central and South America, Africa, Australia, and Pacific islands.',
  originTitle: 'Origin',
  title: 'Aroids',
  traits: [
    createTrait('A spadix with a spathe, often perceived as a single flower.', assets.spathiphyllum),
    createTrait('Simple, often large leaves with expressive veins and varied blade shapes.', assets.alocasia),
    createTrait('Many members form aerial roots and use them to cling to support.', assets.monstera),
    createTrait('Some species contain calcium oxalate crystals, so they are best kept away from pets.', assets.philodendron),
  ],
  traitsTitle: 'Distinctive Traits',
} as const;

const createCategoryData = (
  locale: Locale,
  text: typeof ruText | typeof enText,
): CategoryDetailData => ({
  ...sharedData,
  ...text,
  collectionPlants: createPlants(locale),
  origin: {
    mapImage: sharedData.originMapImage,
    text: text.originText,
  },
});

export const araceaeCategoryDataByLocale: Record<Locale, CategoryDetailData> = {
  en: createCategoryData('en', enText),
  ru: createCategoryData('ru', ruText),
};
