import type { Locale } from 'src/shared/config';

export type { Locale } from 'src/shared/config';

export type RoomZone = 'window' | 'shelf' | 'sunny' | 'table';
export type PlantCategory =
  | 'all'
  | 'amaryllidaceae'
  | 'apocynaceae'
  | 'araceae'
  | 'arecaceae'
  | 'asparagaceae'
  | 'asphodelaceae'
  | 'bromeliaceae'
  | 'cactaceae'
  | 'commelinaceae'
  | 'cycadaceae'
  | 'gesneriaceae'
  | 'marantaceae'
  | 'nephrolepidaceae'
  | 'orchidaceae'
  | 'piperaceae'
  | 'vitaceae';

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

export interface CollectionCopy {
  readonly backToHome: string;
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
    category: 'commelinaceae',
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
    category: 'araceae',
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
    category: 'asparagaceae',
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
    category: 'gesneriaceae',
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
    category: 'orchidaceae',
    zone: 'window',
    width: 255,
    x: 535,
    y: 322,
  },
];

export const plantCategories = [
  { key: 'araceae' },
  { key: 'amaryllidaceae' },
  { key: 'gesneriaceae' },
  { key: 'marantaceae' },
  { key: 'orchidaceae' },
  { key: 'asparagaceae' },
  { key: 'apocynaceae' },
  { key: 'asphodelaceae' },
  { key: 'bromeliaceae' },
  { key: 'cactaceae' },
  { key: 'commelinaceae' },
  { key: 'piperaceae' },
  { key: 'vitaceae' },
  { key: 'nephrolepidaceae' },
  { key: 'arecaceae' },
  { key: 'cycadaceae' },
] satisfies readonly { readonly key: Exclude<PlantCategory, 'all'> }[];

const categoryCounts: Record<Exclude<PlantCategory, 'all'>, number> = {
  amaryllidaceae: 5,
  apocynaceae: 2,
  araceae: 9,
  arecaceae: 1,
  asparagaceae: 10,
  asphodelaceae: 1,
  bromeliaceae: 5,
  cactaceae: 1,
  commelinaceae: 1,
  cycadaceae: 1,
  gesneriaceae: 8,
  marantaceae: 10,
  nephrolepidaceae: 1,
  orchidaceae: 3,
  piperaceae: 1,
  vitaceae: 1,
};

export const categoryLabels: Record<Locale, Record<PlantCategory, string>> = {
  ru: {
    all: 'Все растения',
    amaryllidaceae: 'Амариллисовые',
    apocynaceae: 'Кутровые',
    araceae: 'Ароидные',
    arecaceae: 'Пальмовые',
    asparagaceae: 'Спаржевые',
    asphodelaceae: 'Асфоделовые',
    bromeliaceae: 'Бромелиевые',
    cactaceae: 'Кактусовые',
    commelinaceae: 'Коммелиновые',
    cycadaceae: 'Саговниковые',
    gesneriaceae: 'Геснериевые',
    marantaceae: 'Марантовые',
    nephrolepidaceae: 'Папоротники',
    orchidaceae: 'Орхидные',
    piperaceae: 'Перцевые',
    vitaceae: 'Виноградовые',
  },
  en: {
    all: 'All plants',
    amaryllidaceae: 'Amaryllis family',
    apocynaceae: 'Dogbane family',
    araceae: 'Aroids',
    arecaceae: 'Palms',
    asparagaceae: 'Asparagus family',
    asphodelaceae: 'Asphodel family',
    bromeliaceae: 'Bromeliads',
    cactaceae: 'Cacti',
    commelinaceae: 'Spiderwort family',
    cycadaceae: 'Cycads',
    gesneriaceae: 'Gesneriad family',
    marantaceae: 'Prayer plant family',
    nephrolepidaceae: 'Ferns',
    orchidaceae: 'Orchids',
    piperaceae: 'Pepper family',
    vitaceae: 'Grape family',
  },
};

const copyKeys = [
  'backToHome',
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
] satisfies readonly (keyof CollectionCopy)[];

type CollectionCopyValues = readonly string[] & { readonly length: (typeof copyKeys)['length'] };

const createCollectionCopy = (values: CollectionCopyValues): CollectionCopy => {
  return Object.fromEntries(
    copyKeys.map((key, index) => [key, values[index]!]),
  ) as unknown as CollectionCopy;
};

export const copy: Record<Locale, CollectionCopy> = {
  ru: createCollectionCopy([
    'На главную',
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
  en: createCollectionCopy([
    'Back home',
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

export const countPlantsByCategory = (category: PlantCategory) => {
  if (category === 'all') {
    return Object.values(categoryCounts).reduce((total, count) => total + count, 0);
  }

  return categoryCounts[category];
};
