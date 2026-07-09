import { type CategoryDetailData } from './types';

const araceaeTraits = [
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
] as const;

const araceaeFacts = [
  'Семейство включает более 100 родов и тысячи видов, от миниатюрных растений до крупных лиан.',
  'Белое покрывало спатифиллума и красная пластина антуриума - это не лепестки, а видоизмененный лист.',
  'Монстеры в природе могут подниматься по деревьям и выращивать листья больше человеческой руки.',
  'У многих ароидных молодые и взрослые листья выглядят так по-разному, будто это разные растения.',
] as const;

const araceaePlants = [
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

export const araceaeCategoryData: CategoryDetailData = {
  title: 'Ароидные',
  latinName: 'Araceae',
  description:
    'Ароидные - одно из крупнейших семейств цветковых растений. Большинство представителей происходят из тропических и субтропических регионов и отличаются эффектными листьями, воздушными корнями и соцветиями-початками.',
  heroImage: '/plants/araceae-modal/hero-cutout-transparent.png',
  heroPosition: 'calc(100% + 70px) top',
  heroSize: { base: '540px auto', md: '650px auto', lg: '700px auto' },
  origin: {
    mapImage: '/plants/araceae-modal/origin-map-transparent.png',
    text: 'Тропические и субтропические регионы Азии, Центральной и Южной Америки, Африки, Австралии и островов Тихого океана.',
  },
  traits: araceaeTraits,
  facts: araceaeFacts,
  collectionTitle: 'Растения из моей коллекции (9)',
  collectionPlants: araceaePlants,
  closingNote: 'Ароидные - это не просто растения, это целый мир удивительных форм и адаптаций.',
};
