import type { Locale } from 'src/shared/config';

export type HomeStatIcon = 'leaf' | 'grid' | 'can' | 'heart';

export interface HomeStatCard {
  readonly icon: HomeStatIcon;
  readonly label: string;
  readonly value: string;
}

export interface HomeCategory {
  readonly count: string;
  readonly image: string;
  readonly key: string;
  readonly name: string;
}

export interface HomeCopy {
  readonly actionLabel: string;
  readonly categoriesTitle: string;
  readonly languageLabel: string;
  readonly noteActionLabel: string;
  readonly noteText: readonly string[];
  readonly reminderActionLabel: string;
  readonly reminderText: string;
  readonly reminderTitle: string;
  readonly scrollLeftLabel: string;
  readonly scrollRightLabel: string;
  readonly searchLabel: string;
  readonly searchPlaceholder: string;
  readonly showAllLabel: string;
  readonly tagline: string;
}

export const homeTotalPlantsCount = '39';

export const homeCopy: Record<Locale, HomeCopy> = {
  ru: {
    actionLabel: 'Уход и советы',
    categoriesTitle: 'Категории',
    languageLabel: 'Выбор языка',
    noteActionLabel: 'Мои заметки',
    noteText: [
      'Каждое растение - это маленькая история.',
      'Продолжайте заботиться, наблюдать и наслаждаться!',
    ],
    reminderActionLabel: 'Смотреть список',
    reminderText: 'Лучшее время подарить растениям свое внимание',
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
    reminderText: 'A good moment to give your plants a little attention',
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
    { icon: 'grid', label: 'категорий', value: '15' },
    { icon: 'heart', label: 'легких в уходе', value: '12' },
  ],
  en: [
    { icon: 'leaf', label: 'total plants', value: homeTotalPlantsCount },
    { icon: 'grid', label: 'categories', value: '15' },
    { icon: 'heart', label: 'easy-care picks', value: '12' },
  ],
};

export const homeCategories: Record<Locale, readonly HomeCategory[]> = {
  ru: [
    { count: '9 растений', image: '/plants/categories/studio/araceae.jpg', key: 'araceae', name: 'Ароидные' },
    { count: '5 растений', image: '/plants/categories/studio/amaryllidaceae.jpg', key: 'amaryllidaceae', name: 'Амариллисовые' },
    { count: '8 растений', image: '/plants/categories/studio/gesneriaceae.jpg', key: 'gesneriaceae', name: 'Геснериевые' },
    { count: '3 растения', image: '/plants/categories/studio/marantaceae.jpg', key: 'marantaceae', name: 'Марантовые' },
    { count: '3 растения', image: '/plants/categories/studio/orchidaceae.jpg', key: 'orchidaceae', name: 'Орхидные' },
    { count: '1 растение', image: '/plants/categories/studio/asparagaceae.jpg', key: 'asparagaceae', name: 'Спаржевые' },
    { count: '2 растения', image: '/plants/categories/studio/apocynaceae.jpg', key: 'apocynaceae', name: 'Кутровые' },
    { count: '1 растение', image: '/plants/categories/studio/asphodelaceae.jpg', key: 'asphodelaceae', name: 'Асфоделовые' },
    { count: '1 растение', image: '/plants/categories/studio/cactaceae.jpg', key: 'cactaceae', name: 'Кактусовые' },
    { count: '1 растение', image: '/plants/categories/studio/commelinaceae.jpg', key: 'commelinaceae', name: 'Коммелиновые' },
    { count: '1 растение', image: '/plants/categories/studio/piperaceae.jpg', key: 'piperaceae', name: 'Перцевые' },
    { count: '1 растение', image: '/plants/categories/studio/vitaceae.jpg', key: 'vitaceae', name: 'Виноградовые' },
    { count: '1 растение', image: '/plants/categories/studio/nephrolepidaceae.jpg', key: 'nephrolepidaceae', name: 'Папоротники' },
    { count: '1 растение', image: '/plants/categories/studio/arecaceae.jpg', key: 'arecaceae', name: 'Пальмовые' },
    { count: '1 растение', image: '/plants/categories/studio/cycadaceae.jpg', key: 'cycadaceae', name: 'Саговниковые' },
  ],
  en: [
    { count: '9 plants', image: '/plants/categories/studio/araceae.jpg', key: 'araceae', name: 'Aroids' },
    { count: '5 plants', image: '/plants/categories/studio/amaryllidaceae.jpg', key: 'amaryllidaceae', name: 'Amaryllis family' },
    { count: '8 plants', image: '/plants/categories/studio/gesneriaceae.jpg', key: 'gesneriaceae', name: 'Gesneriad family' },
    { count: '3 plants', image: '/plants/categories/studio/marantaceae.jpg', key: 'marantaceae', name: 'Prayer plant family' },
    { count: '3 plants', image: '/plants/categories/studio/orchidaceae.jpg', key: 'orchidaceae', name: 'Orchids' },
    { count: '1 plant', image: '/plants/categories/studio/asparagaceae.jpg', key: 'asparagaceae', name: 'Asparagus family' },
    { count: '2 plants', image: '/plants/categories/studio/apocynaceae.jpg', key: 'apocynaceae', name: 'Dogbane family' },
    { count: '1 plant', image: '/plants/categories/studio/asphodelaceae.jpg', key: 'asphodelaceae', name: 'Asphodel family' },
    { count: '1 plant', image: '/plants/categories/studio/cactaceae.jpg', key: 'cactaceae', name: 'Cacti' },
    { count: '1 plant', image: '/plants/categories/studio/commelinaceae.jpg', key: 'commelinaceae', name: 'Spiderwort family' },
    { count: '1 plant', image: '/plants/categories/studio/piperaceae.jpg', key: 'piperaceae', name: 'Pepper family' },
    { count: '1 plant', image: '/plants/categories/studio/vitaceae.jpg', key: 'vitaceae', name: 'Grape family' },
    { count: '1 plant', image: '/plants/categories/studio/nephrolepidaceae.jpg', key: 'nephrolepidaceae', name: 'Ferns' },
    { count: '1 plant', image: '/plants/categories/studio/arecaceae.jpg', key: 'arecaceae', name: 'Palms' },
    { count: '1 plant', image: '/plants/categories/studio/cycadaceae.jpg', key: 'cycadaceae', name: 'Cycads' },
  ],
};
