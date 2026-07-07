export type RoomZone = 'window' | 'shelf' | 'sunny' | 'table';
export type PlantCategory = 'all' | 'foliage' | 'aroid' | 'flowering' | 'succulent' | 'palm';
export type Locale = 'ru' | 'en';

export interface Plant {
  readonly id: string;
  readonly name: string;
  readonly nameEn: string;
  readonly latinName: string;
  readonly category: Exclude<PlantCategory, 'all'>;
  readonly zone: RoomZone;
  readonly x: number;
  readonly y: number;
  readonly size: 'sm' | 'md' | 'lg';
}

export interface CategoryOption {
  readonly key: PlantCategory;
}

export interface HomeCopy {
  readonly brandSubtitle: string;
  readonly collection: string;
  readonly searchLabel: string;
  readonly searchPlaceholder: string;
  readonly show: string;
  readonly quote: string;
  readonly weatherLabel: string;
  readonly sunny: string;
}

export const plants: readonly Plant[] = [
  {
    id: '8a9m6r',
    name: 'Монстера Адансона',
    nameEn: 'Adanson’s Monstera',
    latinName: 'Monstera adansonii',
    category: 'aroid',
    zone: 'window',
    x: 43,
    y: 55,
    size: 'lg',
  },
  {
    id: 'cth-orn',
    name: 'Калатея Орната',
    nameEn: 'Pinstripe Calathea',
    latinName: 'Calathea ornata',
    category: 'foliage',
    zone: 'window',
    x: 54,
    y: 60,
    size: 'md',
  },
  {
    id: 'epi-gld',
    name: 'Эпипремнум Золотистый',
    nameEn: 'Golden Pothos',
    latinName: 'Epipremnum aureum',
    category: 'foliage',
    zone: 'shelf',
    x: 55,
    y: 25,
    size: 'sm',
  },
  {
    id: 'chl-bon',
    name: "Хлорофитум 'Bonnie'",
    nameEn: "Spider Plant 'Bonnie'",
    latinName: 'Chlorophytum comosum',
    category: 'foliage',
    zone: 'shelf',
    x: 78,
    y: 30,
    size: 'md',
  },
  {
    id: 'spa-wal',
    name: 'Спатифиллум',
    nameEn: 'Peace Lily',
    latinName: 'Spathiphyllum wallisii',
    category: 'flowering',
    zone: 'window',
    x: 62,
    y: 62,
    size: 'md',
  },
  {
    id: 'agl-val',
    name: 'Аглаонема Red Valentine',
    nameEn: 'Aglaonema Red Valentine',
    latinName: 'Aglaonema commutatum',
    category: 'aroid',
    zone: 'shelf',
    x: 86,
    y: 62,
    size: 'lg',
  },
  {
    id: 'ech-elg',
    name: 'Эхеверия Элеганс',
    nameEn: 'Echeveria Elegans',
    latinName: 'Echeveria elegans',
    category: 'succulent',
    zone: 'sunny',
    x: 69,
    y: 57,
    size: 'sm',
  },
  {
    id: 'ham-elg',
    name: 'Хамедорея',
    nameEn: 'Parlor Palm',
    latinName: 'Chamaedorea elegans',
    category: 'palm',
    zone: 'table',
    x: 30,
    y: 70,
    size: 'md',
  },
];

export const categories: readonly CategoryOption[] = [
  { key: 'all' },
  { key: 'foliage' },
  { key: 'aroid' },
  { key: 'flowering' },
  { key: 'succulent' },
  { key: 'palm' },
];

export const plantCategories = [
  { key: 'foliage' },
  { key: 'aroid' },
  { key: 'flowering' },
  { key: 'succulent' },
  { key: 'palm' },
] satisfies readonly { readonly key: Exclude<PlantCategory, 'all'> }[];

export const categoryLabels: Record<Locale, Record<PlantCategory, string>> = {
  ru: {
    all: 'Все растения',
    foliage: 'Лиственные',
    aroid: 'Ароидные',
    flowering: 'Цветущие',
    succulent: 'Суккуленты',
    palm: 'Пальмы',
  },
  en: {
    all: 'All plants',
    foliage: 'Foliage',
    aroid: 'Aroids',
    flowering: 'Blooming',
    succulent: 'Succulents',
    palm: 'Palms',
  },
};

export const copy: Record<Locale, HomeCopy> = {
  ru: {
    brandSubtitle: 'моя коллекция растений',
    collection: 'Моя коллекция',
    searchLabel: 'Поиск растения',
    searchPlaceholder: 'Найти растение...',
    show: 'Показать',
    quote: 'Растения не просто украшают дом, они делают его живым',
    weatherLabel: 'Погода и время',
    sunny: 'Солнечно',
  },
  en: {
    brandSubtitle: 'my plant collection',
    collection: 'My collection',
    searchLabel: 'Search plants',
    searchPlaceholder: 'Search plants...',
    show: 'Show',
    quote: 'Plants do not just decorate a home, they make it feel alive',
    weatherLabel: 'Weather and time',
    sunny: 'Sunny',
  },
};

export function countPlantsByCategory(category: PlantCategory) {
  if (category === 'all') {
    return plants.length;
  }

  return plants.filter((plant) => plant.category === category).length;
}
