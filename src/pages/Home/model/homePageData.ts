import type { Locale } from 'src/shared/config';
import { getCollectionPlantCount } from 'src/entities/collection';

export type HomeStatIcon = 'leaf' | 'grid' | 'can' | 'heart';

export interface HomeStatCard {
  readonly icon: HomeStatIcon;
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
  readonly categoriesTitle: string;
  readonly languageLabel: string;
  readonly noteActionLabel: string;
  readonly noteText: readonly string[];
  readonly reminderActionLabel: string;
  readonly reminderText: readonly [string, string];
  readonly reminderTitle: string;
  readonly scrollLeftLabel: string;
  readonly scrollRightLabel: string;
  readonly searchLabel: string;
  readonly searchPlaceholder: string;
  readonly showAllLabel: string;
  readonly tagline: string;
}

export const homeTotalPlantsCount = String(getCollectionPlantCount());

export const homeCopy: Record<Locale, HomeCopy> = {
  ru: {
    actionLabel: 'Уход и советы',
    categoriesTitle: 'Семейства',
    languageLabel: 'Выбор языка',
    noteActionLabel: 'Мои заметки',
    noteText: [
      'Каждое растение - это маленькая история.',
      'Продолжайте заботиться, наблюдать и наслаждаться!',
    ],
    reminderActionLabel: 'Смотреть список',
    reminderText: ['Лучшее время подарить растениям', 'своё внимание и заботу'],
    reminderTitle: 'Сегодня особенный день',
    scrollLeftLabel: 'Предыдущие категории',
    scrollRightLabel: 'Следующие категории',
    searchLabel: 'Поиск по названию растения',
    searchPlaceholder: 'Найти растение...',
    showAllLabel: 'Показать все',
    tagline: 'Дом, где каждое растение часть истории.',
  },
  en: {
    actionLabel: 'Care and tips',
    categoriesTitle: 'Categories',
    languageLabel: 'Language selector',
    noteActionLabel: 'My notes',
    noteText: ['Every plant is a small story.', 'Keep caring, watching, and enjoying the growth.'],
    reminderActionLabel: 'View list',
    reminderText: ['A good moment to give your plants', 'some attention and care'],
    reminderTitle: 'A special day',
    scrollLeftLabel: 'Previous categories',
    scrollRightLabel: 'Next categories',
    searchLabel: 'Search plants by name',
    searchPlaceholder: 'Find a plant...',
    showAllLabel: 'Show all',
    tagline: 'My greenhouse is blooming and growing',
  },
};

export const homeStatCards: Record<Locale, readonly HomeStatCard[]> = {
  ru: [
    { icon: 'leaf', label: 'всего растений', value: homeTotalPlantsCount },
    { icon: 'grid', label: 'категорий', value: '17' },
    { icon: 'heart', label: 'легких в уходе', value: '12' },
  ],
  en: [
    { icon: 'leaf', label: 'total plants', value: homeTotalPlantsCount },
    { icon: 'grid', label: 'categories', value: '17' },
    { icon: 'heart', label: 'easy-care picks', value: '12' },
  ],
};

const homeCategoryDefinitions: readonly HomeCategoryDefinition[] = [
  { count: { en: '0 plants', ru: '0 растений' }, id: 'aizoaceae', image: '/plants/categories/studio/aizoaceae.jpg', imageObjectPosition: 'right center', imageScale: '1', name: { en: 'Ice plant family', ru: 'Аизовые' } },
  { count: { en: '9 plants', ru: '9 растений' }, id: 'araceae', image: '/plants/categories/studio/araceae.jpg', name: { en: 'Aroids', ru: 'Ароидные' } },
  { count: { en: '5 plants', ru: '5 растений' }, id: 'amaryllidaceae', image: '/plants/categories/studio/amaryllidaceae.jpg', name: { en: 'Amaryllis family', ru: 'Амариллисовые' } },
  { count: { en: '9 plants', ru: '9 растений' }, id: 'gesneriaceae', image: '/plants/categories/studio/gesneriaceae.jpg', name: { en: 'Gesneriad family', ru: 'Геснериевые' } },
  { count: { en: '10 plants', ru: '10 растений' }, id: 'marantaceae', image: '/plants/categories/studio/marantaceae.jpg', name: { en: 'Prayer plant family', ru: 'Марантовые' } },
  { count: { en: '3 plants', ru: '3 растения' }, id: 'orchidaceae', image: '/plants/categories/studio/orchidaceae.jpg', name: { en: 'Orchids', ru: 'Орхидные' } },
  { count: { en: '9 plants', ru: '9 растений' }, id: 'asparagaceae', image: '/plants/categories/studio/asparagaceae.jpg', name: { en: 'Asparagus family', ru: 'Спаржевые' } },
  { count: { en: '2 plants', ru: '2 растения' }, id: 'apocynaceae', image: '/plants/categories/studio/apocynaceae.jpg', name: { en: 'Dogbane family', ru: 'Кутровые' } },
  { count: { en: '1 plant', ru: '1 растение' }, id: 'asphodelaceae', image: '/plants/categories/studio/asphodelaceae.jpg', name: { en: 'Asphodel family', ru: 'Асфоделовые' } },
  { count: { en: '5 plants', ru: '5 растений' }, id: 'bromeliaceae', image: '/plants/categories/studio/bromeliaceae.jpg', imageObjectPosition: 'center', imageScale: '1', name: { en: 'Bromeliads', ru: 'Бромелиевые' } },
  { count: { en: '1 plant', ru: '1 растение' }, id: 'cactaceae', image: '/plants/categories/studio/cactaceae.jpg', name: { en: 'Cacti', ru: 'Кактусовые' } },
  { count: { en: '1 plant', ru: '1 растение' }, id: 'commelinaceae', image: '/plants/categories/studio/commelinaceae.jpg', name: { en: 'Spiderwort family', ru: 'Коммелиновые' } },
  { count: { en: '10 plants', ru: '10 растений' }, id: 'piperaceae', image: '/plants/categories/studio/piperaceae.jpg', name: { en: 'Pepper family', ru: 'Перцевые' } },
  { count: { en: '1 plant', ru: '1 растение' }, id: 'vitaceae', image: '/plants/categories/studio/vitaceae.jpg', name: { en: 'Grape family', ru: 'Виноградовые' } },
  { count: { en: '1 plant', ru: '1 растение' }, id: 'arecaceae', image: '/plants/categories/studio/arecaceae.jpg', name: { en: 'Palms', ru: 'Пальмовые' } },
  { count: { en: '1 plant', ru: '1 растение' }, id: 'cycadaceae', image: '/plants/categories/studio/cycadaceae.jpg', name: { en: 'Cycads', ru: 'Саговниковые' } },
  { count: { en: '0 plants', ru: '0 растений' }, id: 'crassulaceae', image: '/plants/categories/studio/crassulaceae.jpg', name: { en: 'Stonecrop family', ru: 'Толстянковые' } },
];

export const homeCategories: Record<Locale, readonly HomeCategory[]> = {
  en: homeCategoryDefinitions.map(({ count, name, ...category }) => ({ ...category, count: count.en, name: name.en })),
  ru: homeCategoryDefinitions.map(({ count, name, ...category }) => ({ ...category, count: count.ru, name: name.ru })),
};
