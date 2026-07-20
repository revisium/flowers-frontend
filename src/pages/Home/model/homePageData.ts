import type { Locale } from 'src/shared/config';
import { getCollectionFamilyCount, getCollectionPlantCount } from 'src/entities/collection';

export interface HomeHeroStat {
  readonly label: string;
  readonly value: string;
}

export interface HomeCategory {
  readonly count: string;
  readonly image: string;
  readonly imageObjectPosition?: string;
  readonly imageScale?: string;
  readonly id: string;
  readonly name: string;
}

interface HomeCategoryDefinition extends Omit<HomeCategory, 'count' | 'name'> {
  readonly count: Record<Locale, string>;
  readonly name: Record<Locale, string>;
}

export interface HomeCopy {
  readonly actionLabel: string;
  readonly categoriesEyebrow: string;
  readonly categoriesTitle: string;
  readonly collectionActionLabel: string;
  readonly heroEyebrow: string;
  readonly heroSummary: string;
  readonly heroTitle: string;
  readonly languageLabel: string;
  readonly noteActionLabel: string;
  readonly noteText: readonly string[];
  readonly scrollLeftLabel: string;
  readonly scrollRightLabel: string;
  readonly searchLabel: string;
  readonly searchPlaceholder: string;
  readonly showAllLabel: string;
}

export const homeTotalPlantsCount = String(getCollectionPlantCount());

export const homeCopy: Record<Locale, HomeCopy> = {
  ru: {
    actionLabel: 'Уход и советы',
    categoriesEyebrow: 'Исследуйте коллекцию',
    categoriesTitle: 'Растения по семействам',
    collectionActionLabel: 'Смотреть коллекцию',
    heroEyebrow: `Личная оранжерея · ${homeTotalPlantsCount} растений`,
    heroSummary:
      'Здесь собраны растения, которые наполняют мой дом жизнью. У каждого из них свой характер, своя история и свой путь, который я бережно сохраняю.',
    heroTitle: 'Дом, где у каждого растения своя история',
    languageLabel: 'Выбор языка',
    noteActionLabel: 'Узнать больше',
    noteText: [
      'Каждое растение — это маленькая история.',
      'Продолжайте заботиться, наблюдать и наслаждаться!',
    ],
    scrollLeftLabel: 'Предыдущие категории',
    scrollRightLabel: 'Следующие категории',
    searchLabel: 'Поиск по названию растения',
    searchPlaceholder: 'Найти растение...',
    showAllLabel: 'Показать все',
  },
  en: {
    actionLabel: 'Care and tips',
    categoriesEyebrow: 'Explore the collection',
    categoriesTitle: 'Plants by family',
    collectionActionLabel: 'View collection',
    heroEyebrow: `A personal greenhouse · ${homeTotalPlantsCount} plants`,
    heroSummary:
      'A living collection of characterful plants, thoughtful care notes and stories that continue to grow alongside them.',
    heroTitle: 'A home where every plant has a story',
    languageLabel: 'Language selector',
    noteActionLabel: 'Learn more',
    noteText: ['Every plant is a small story.', 'Keep caring, watching, and enjoying the growth.'],
    scrollLeftLabel: 'Previous categories',
    scrollRightLabel: 'Next categories',
    searchLabel: 'Search plants by name',
    searchPlaceholder: 'Find a plant...',
    showAllLabel: 'Show all',
  },
};

const homeCategoryDefinitions: readonly HomeCategoryDefinition[] = [
  {
    count: { en: '0 plants', ru: '0 растений' },
    id: 'aizoaceae',
    image: '/plants/categories/studio/aizoaceae.jpg',
    imageObjectPosition: 'right center',
    imageScale: '1',
    name: { en: 'Ice plant family', ru: 'Аизовые' },
  },
  {
    count: { en: '10 plants', ru: '10 растений' },
    id: 'araceae',
    image: '/plants/categories/studio/araceae.jpg',
    name: { en: 'Aroids', ru: 'Ароидные' },
  },
  {
    count: { en: '5 plants', ru: '5 растений' },
    id: 'amaryllidaceae',
    image: '/plants/categories/studio/amaryllidaceae.jpg',
    name: { en: 'Amaryllis family', ru: 'Амариллисовые' },
  },
  {
    count: { en: '9 plants', ru: '9 растений' },
    id: 'gesneriaceae',
    image: '/plants/categories/studio/gesneriaceae.jpg',
    name: { en: 'Gesneriad family', ru: 'Геснериевые' },
  },
  {
    count: { en: '10 plants', ru: '10 растений' },
    id: 'marantaceae',
    image: '/plants/categories/studio/marantaceae.jpg',
    name: { en: 'Prayer plant family', ru: 'Марантовые' },
  },
  {
    count: { en: '3 plants', ru: '3 растения' },
    id: 'orchidaceae',
    image: '/plants/categories/studio/orchidaceae.jpg',
    name: { en: 'Orchids', ru: 'Орхидные' },
  },
  {
    count: { en: '9 plants', ru: '9 растений' },
    id: 'asparagaceae',
    image: '/plants/categories/studio/asparagaceae.jpg',
    name: { en: 'Asparagus family', ru: 'Спаржевые' },
  },
  {
    count: { en: '2 plants', ru: '2 растения' },
    id: 'apocynaceae',
    image: '/plants/categories/studio/apocynaceae.jpg',
    name: { en: 'Dogbane family', ru: 'Кутровые' },
  },
  {
    count: { en: '1 plant', ru: '1 растение' },
    id: 'asphodelaceae',
    image: '/plants/categories/studio/asphodelaceae.jpg',
    name: { en: 'Asphodel family', ru: 'Асфоделовые' },
  },
  {
    count: { en: '5 plants', ru: '5 растений' },
    id: 'bromeliaceae',
    image: '/plants/categories/studio/bromeliaceae.jpg',
    imageObjectPosition: 'center',
    imageScale: '1',
    name: { en: 'Bromeliads', ru: 'Бромелиевые' },
  },
  {
    count: { en: '1 plant', ru: '1 растение' },
    id: 'cactaceae',
    image: '/plants/categories/studio/cactaceae.jpg',
    name: { en: 'Cacti', ru: 'Кактусовые' },
  },
  {
    count: { en: '2 plants', ru: '2 растения' },
    id: 'commelinaceae',
    image: '/plants/categories/studio/commelinaceae.jpg',
    name: { en: 'Spiderwort family', ru: 'Коммелиновые' },
  },
  {
    count: { en: '10 plants', ru: '10 растений' },
    id: 'piperaceae',
    image: '/plants/categories/studio/piperaceae.jpg',
    name: { en: 'Pepper family', ru: 'Перцевые' },
  },
  {
    count: { en: '1 plant', ru: '1 растение' },
    id: 'vitaceae',
    image: '/plants/categories/studio/vitaceae.jpg',
    name: { en: 'Grape family', ru: 'Виноградовые' },
  },
  {
    count: { en: '1 plant', ru: '1 растение' },
    id: 'arecaceae',
    image: '/plants/categories/studio/arecaceae.jpg',
    name: { en: 'Palms', ru: 'Пальмовые' },
  },
  {
    count: { en: '1 plant', ru: '1 растение' },
    id: 'cycadaceae',
    image: '/plants/categories/studio/cycadaceae.jpg',
    name: { en: 'Cycads', ru: 'Саговниковые' },
  },
  {
    count: { en: '1 plant', ru: '1 растение' },
    id: 'moraceae',
    image: '/plants/categories/studio/moraceae.jpg',
    imageObjectPosition: 'center',
    imageScale: '1',
    name: { en: 'Mulberry family', ru: 'Тутовые' },
  },
  {
    count: { en: '0 plants', ru: '0 растений' },
    id: 'crassulaceae',
    image: '/plants/categories/studio/crassulaceae.jpg',
    name: { en: 'Stonecrop family', ru: 'Толстянковые' },
  },
];

export const homeCategories: Record<Locale, readonly HomeCategory[]> = {
  en: homeCategoryDefinitions.map(({ count, name, ...category }) => ({
    ...category,
    count: count.en,
    name: name.en,
  })),
  ru: homeCategoryDefinitions.map(({ count, name, ...category }) => ({
    ...category,
    count: count.ru,
    name: name.ru,
  })),
};

const homeFamilyCount = String(getCollectionFamilyCount());

export const homeHeroStats: Record<Locale, readonly HomeHeroStat[]> = {
  ru: [
    { label: 'растений', value: homeTotalPlantsCount },
    { label: 'семейств', value: homeFamilyCount },
  ],
  en: [
    { label: 'plants', value: homeTotalPlantsCount },
    { label: 'families', value: homeFamilyCount },
  ],
};
