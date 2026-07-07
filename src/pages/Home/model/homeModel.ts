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

export const copy: Record<Locale, HomeCopy> = {
  ru: {
    brandSubtitle: 'моя коллекция растений',
    brandHomeLabel: 'Оранжерея, главная',
    cardAction: 'Открыть карточку',
    cardCategoryLabel: 'Категория',
    cardCloseLabel: 'Закрыть карточку растения',
    cardDifficultyLabel: 'Уровень сложности',
    cardFactsTitle: 'Интересные факты',
    cardOpenLabel: 'Карточка растения',
    cardOriginLabel: 'Происхождение',
    cardProblemColumn: 'Проблема',
    cardProblemsTitle: 'Проблемы и решения',
    cardReasonColumn: 'Причина',
    cardSolutionColumn: 'Решение',
    collection: 'Моя коллекция',
    languageLabel: 'Язык интерфейса',
    sceneLabel: 'Домашняя оранжерея',
    searchLabel: 'Поиск растения',
    searchPlaceholder: 'Найти растение...',
    show: 'Показать',
    sidebarLabel: 'Разделы оранжереи',
    scrollLeftLabel: 'Прокрутить комнату влево',
    scrollRightLabel: 'Прокрутить комнату вправо',
    quote: 'Растения не просто украшают дом, они делают его живым',
    weatherLabel: 'Погода и время',
    sunny: 'Солнечно',
  },
  en: {
    brandSubtitle: 'my plant collection',
    brandHomeLabel: 'Greenhouse, home',
    cardAction: 'Open card',
    cardCategoryLabel: 'Category',
    cardCloseLabel: 'Close plant card',
    cardDifficultyLabel: 'Difficulty level',
    cardFactsTitle: 'Interesting facts',
    cardOpenLabel: 'Plant card',
    cardOriginLabel: 'Origin',
    cardProblemColumn: 'Problem',
    cardProblemsTitle: 'Problems and solutions',
    cardReasonColumn: 'Reason',
    cardSolutionColumn: 'Solution',
    collection: 'My collection',
    languageLabel: 'Interface language',
    sceneLabel: 'Home greenhouse',
    searchLabel: 'Search plants',
    searchPlaceholder: 'Search plants...',
    show: 'Show',
    sidebarLabel: 'Greenhouse sections',
    scrollLeftLabel: 'Scroll room left',
    scrollRightLabel: 'Scroll room right',
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
