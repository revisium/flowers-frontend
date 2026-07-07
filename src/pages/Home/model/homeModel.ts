export type RoomZone = 'window' | 'shelf' | 'sunny' | 'table';
export type PlantCategory = 'all' | 'foliage' | 'aroid' | 'flowering' | 'succulent' | 'palm';
export type Locale = 'ru' | 'en';

export interface Plant {
  readonly id: string;
  readonly image: string;
  readonly name: string;
  readonly nameEn: string;
  readonly latinName: string;
  readonly category: Exclude<PlantCategory, 'all'>;
  readonly zone: RoomZone;
  readonly width: number;
  readonly x: number;
  readonly y: number;
}

export interface HomeCopy {
  readonly brandSubtitle: string;
  readonly brandHomeLabel: string;
  readonly cardAction: string;
  readonly cardCategoryLabel: string;
  readonly cardCloseLabel: string;
  readonly cardDifficultyLabel: string;
  readonly cardFactsTitle: string;
  readonly cardOpenLabel: string;
  readonly cardOriginLabel: string;
  readonly cardProblemColumn: string;
  readonly cardProblemsTitle: string;
  readonly cardReasonColumn: string;
  readonly cardSolutionColumn: string;
  readonly collection: string;
  readonly languageLabel: string;
  readonly sceneLabel: string;
  readonly searchLabel: string;
  readonly searchPlaceholder: string;
  readonly show: string;
  readonly sidebarLabel: string;
  readonly scrollLeftLabel: string;
  readonly scrollRightLabel: string;
  readonly quote: string;
  readonly weatherLabel: string;
  readonly sunny: string;
}

export const plants: readonly Plant[] = [
  {
    id: 'trd-zbr',
    image: '/plants/tradescantia.png',
    name: 'Традесканция',
    nameEn: 'Tradescantia',
    latinName: 'Tradescantia zebrina',
    category: 'foliage',
    zone: 'shelf',
    width: 187,
    x: 1207,
    y: 174,
  },
  {
    id: 'mon-del',
    image: '/plants/monstera-basket.png',
    name: 'Монстера',
    nameEn: 'Monstera',
    latinName: 'Monstera deliciosa',
    category: 'aroid',
    zone: 'shelf',
    width: 400,
    x: 1255,
    y: 350,
  },
  {
    id: 'chl-com',
    image: '/plants/chlorophytum.png',
    name: 'Хлорофитум',
    nameEn: 'Spider Plant',
    latinName: 'Chlorophytum comosum',
    category: 'foliage',
    zone: 'window',
    width: 280,
    x: 1014,
    y: 432,
  },
  {
    id: 'glo-vel',
    image: '/plants/gloxinia.png',
    name: 'Глоксиния',
    nameEn: 'Gloxinia',
    latinName: 'Sinningia speciosa',
    category: 'flowering',
    zone: 'window',
    width: 150,
    x: 800,
    y: 489,
  },
  {
    id: 'pha-whi',
    image: '/plants/phalaenopsis.png',
    name: 'Орхидея фаленопсис',
    nameEn: 'Phalaenopsis Orchid',
    latinName: 'Phalaenopsis',
    category: 'flowering',
    zone: 'window',
    width: 255,
    x: 535,
    y: 322,
  },
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

const copyKeys = [
  'brandSubtitle',
  'brandHomeLabel',
  'cardAction',
  'cardCategoryLabel',
  'cardCloseLabel',
  'cardDifficultyLabel',
  'cardFactsTitle',
  'cardOpenLabel',
  'cardOriginLabel',
  'cardProblemColumn',
  'cardProblemsTitle',
  'cardReasonColumn',
  'cardSolutionColumn',
  'collection',
  'languageLabel',
  'sceneLabel',
  'searchLabel',
  'searchPlaceholder',
  'show',
  'sidebarLabel',
  'scrollLeftLabel',
  'scrollRightLabel',
  'quote',
  'weatherLabel',
  'sunny',
] satisfies readonly (keyof HomeCopy)[];

type HomeCopyValues = readonly string[] & { readonly length: (typeof copyKeys)['length'] };

function createHomeCopy(values: HomeCopyValues): HomeCopy {
  return Object.fromEntries(copyKeys.map((key, index) => [key, values[index]!])) as unknown as HomeCopy;
}

export const copy: Record<Locale, HomeCopy> = {
  ru: createHomeCopy([
    'моя коллекция растений',
    'Оранжерея, главная',
    'Открыть карточку',
    'Категория',
    'Закрыть карточку растения',
    'Уровень сложности',
    'Интересные факты',
    'Карточка растения',
    'Происхождение',
    'Проблема',
    'Проблемы и решения',
    'Причина',
    'Решение',
    'Моя коллекция',
    'Язык интерфейса',
    'Домашняя оранжерея',
    'Поиск растения',
    'Найти растение...',
    'Показать',
    'Разделы оранжереи',
    'Прокрутить комнату влево',
    'Прокрутить комнату вправо',
    'Растения не просто украшают дом, они делают его живым',
    'Погода и время',
    'Солнечно',
  ] as const),
  en: createHomeCopy([
    'my plant collection',
    'Greenhouse, home',
    'Open card',
    'Category',
    'Close plant card',
    'Difficulty level',
    'Interesting facts',
    'Plant card',
    'Origin',
    'Problem',
    'Problems and solutions',
    'Reason',
    'Solution',
    'My collection',
    'Interface language',
    'Home greenhouse',
    'Search plants',
    'Search plants...',
    'Show',
    'Greenhouse sections',
    'Scroll room left',
    'Scroll room right',
    'Plants do not just decorate a home, they make it feel alive',
    'Weather and time',
    'Sunny',
  ] as const),
};

export function countPlantsByCategory(category: PlantCategory) {
  if (category === 'all') {
    return plants.length;
  }

  return plants.filter((plant) => plant.category === category).length;
}
