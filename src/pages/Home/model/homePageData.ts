export type HomeStatIcon = 'leaf' | 'grid' | 'can' | 'heart';

export interface HomeStatCard {
  readonly icon: HomeStatIcon;
  readonly label: string;
  readonly value: string;
}

export interface HomeCategory {
  readonly count: string;
  readonly image: string;
  readonly name: string;
}

export const homeTotalPlantsCount = '39';

export const homeStatCards: readonly HomeStatCard[] = [
  { icon: 'leaf', label: 'всего растений', value: homeTotalPlantsCount },
  { icon: 'grid', label: 'категорий', value: '15' },

  { icon: 'heart', label: 'легких в уходе', value: '12' },
];

export const homeCategories: readonly HomeCategory[] = [
  { count: '9 растений', image: '/plants/categories/araceae.png', name: 'Ароидные' },
  { count: '5 растений', image: '/plants/categories/amaryllidaceae.png', name: 'Амариллисовые' },
  { count: '8 растений', image: '/plants/categories/gesneriaceae.png', name: 'Геснериевые' },
  { count: '3 растения', image: '/plants/categories/marantaceae.png', name: 'Марантовые' },
  { count: '3 растения', image: '/plants/categories/orchidaceae.png', name: 'Орхидные' },
  { count: '1 растение', image: '/plants/categories/asparagaceae.png', name: 'Спаржевые' },
  { count: '2 растения', image: '/plants/categories/apocynaceae.png', name: 'Кутровые' },
  { count: '1 растение', image: '/plants/categories/asphodelaceae.png', name: 'Асфоделовые' },
  { count: '1 растение', image: '/plants/categories/cactaceae.png', name: 'Кактусовые' },
  { count: '1 растение', image: '/plants/categories/commelinaceae.png', name: 'Коммелиновые' },
  { count: '1 растение', image: '/plants/categories/piperaceae.png', name: 'Перцевые' },
  { count: '1 растение', image: '/plants/categories/vitaceae.png', name: 'Виноградовые' },
  { count: '1 растение', image: '/plants/categories/nephrolepidaceae.png', name: 'Папоротники' },
  { count: '1 растение', image: '/plants/categories/arecaceae.png', name: 'Пальмовые' },
  { count: '1 растение', image: '/plants/categories/cycadaceae.png', name: 'Саговниковые' },
];
