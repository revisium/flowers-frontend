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
  readonly id: string;
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

export const homeTotalPlantsCount = '60';

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
    { icon: 'grid', label: 'категорий', value: '16' },
    { icon: 'heart', label: 'легких в уходе', value: '12' },
  ],
  en: [
    { icon: 'leaf', label: 'total plants', value: homeTotalPlantsCount },
    { icon: 'grid', label: 'categories', value: '16' },
    { icon: 'heart', label: 'easy-care picks', value: '12' },
  ],
};

export const homeCategories: Record<Locale, readonly HomeCategory[]> = {
  ru: [
    { count: '9 растений', image: '/plants/categories/studio/araceae.jpg', id: 'araceae', name: 'Ароидные' },
    { count: '5 растений', image: '/plants/categories/studio/amaryllidaceae.jpg', id: 'amaryllidaceae', name: 'Амариллисовые' },
    { count: '8 растений', image: '/plants/categories/studio/gesneriaceae.jpg', id: 'gesneriaceae', name: 'Геснериевые' },
    { count: '10 растений', image: '/plants/categories/studio/marantaceae.jpg', id: 'marantaceae', name: 'Марантовые' },
    { count: '3 растения', image: '/plants/categories/studio/orchidaceae.jpg', id: 'orchidaceae', name: 'Орхидные' },
    { count: '9 растений', image: '/plants/categories/studio/asparagaceae.jpg', id: 'asparagaceae', name: 'Спаржевые' },
    { count: '2 растения', image: '/plants/categories/studio/apocynaceae.jpg', id: 'apocynaceae', name: 'Кутровые' },
    { count: '1 растение', image: '/plants/categories/studio/asphodelaceae.jpg', id: 'asphodelaceae', name: 'Асфоделовые' },
    { count: '5 растений', image: '/plants/categories/studio/bromeliaceae.jpg', id: 'bromeliaceae', name: 'Бромелиевые' },
    { count: '1 растение', image: '/plants/categories/studio/cactaceae.jpg', id: 'cactaceae', name: 'Кактусовые' },
    { count: '1 растение', image: '/plants/categories/studio/commelinaceae.jpg', id: 'commelinaceae', name: 'Коммелиновые' },
    { count: '10 растений', image: '/plants/categories/studio/piperaceae.jpg', id: 'piperaceae', name: 'Перцевые' },
    { count: '1 растение', image: '/plants/categories/studio/vitaceae.jpg', id: 'vitaceae', name: 'Виноградовые' },
    { count: '1 растение', image: '/plants/categories/studio/arecaceae.jpg', id: 'arecaceae', name: 'Пальмовые' },
    { count: '1 растение', image: '/plants/categories/studio/cycadaceae.jpg', id: 'cycadaceae', name: 'Саговниковые' },
  ],
  en: [
    { count: '9 plants', image: '/plants/categories/studio/araceae.jpg', id: 'araceae', name: 'Aroids' },
    { count: '5 plants', image: '/plants/categories/studio/amaryllidaceae.jpg', id: 'amaryllidaceae', name: 'Amaryllis family' },
    { count: '8 plants', image: '/plants/categories/studio/gesneriaceae.jpg', id: 'gesneriaceae', name: 'Gesneriad family' },
    { count: '10 plants', image: '/plants/categories/studio/marantaceae.jpg', id: 'marantaceae', name: 'Prayer plant family' },
    { count: '3 plants', image: '/plants/categories/studio/orchidaceae.jpg', id: 'orchidaceae', name: 'Orchids' },
    { count: '9 plants', image: '/plants/categories/studio/asparagaceae.jpg', id: 'asparagaceae', name: 'Asparagus family' },
    { count: '2 plants', image: '/plants/categories/studio/apocynaceae.jpg', id: 'apocynaceae', name: 'Dogbane family' },
    { count: '1 plant', image: '/plants/categories/studio/asphodelaceae.jpg', id: 'asphodelaceae', name: 'Asphodel family' },
    { count: '5 plants', image: '/plants/categories/studio/bromeliaceae.jpg', id: 'bromeliaceae', name: 'Bromeliads' },
    { count: '1 plant', image: '/plants/categories/studio/cactaceae.jpg', id: 'cactaceae', name: 'Cacti' },
    { count: '1 plant', image: '/plants/categories/studio/commelinaceae.jpg', id: 'commelinaceae', name: 'Spiderwort family' },
    { count: '10 plants', image: '/plants/categories/studio/piperaceae.jpg', id: 'piperaceae', name: 'Pepper family' },
    { count: '1 plant', image: '/plants/categories/studio/vitaceae.jpg', id: 'vitaceae', name: 'Grape family' },
    { count: '1 plant', image: '/plants/categories/studio/arecaceae.jpg', id: 'arecaceae', name: 'Palms' },
    { count: '1 plant', image: '/plants/categories/studio/cycadaceae.jpg', id: 'cycadaceae', name: 'Cycads' },
  ],
};
