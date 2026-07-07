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

export const homeStatCards: readonly HomeStatCard[] = [
  { icon: 'leaf', label: 'всего растений', value: '16' },
  { icon: 'grid', label: 'категорий', value: '8' },
  { icon: 'can', label: 'полить сегодня', value: '4' },
  { icon: 'heart', label: 'легких в уходе', value: '12' },
];

export const homeCategories: readonly HomeCategory[] = [
  { count: '4 растения', image: '/plants/monstera-basket.png', name: 'Декоративно-лиственные' },
  { count: '2 растения', image: '/plants/chlorophytum.png', name: 'Ароидные' },
  { count: '2 растения', image: '/plants/gloxinia.png', name: 'Цветущие' },
  { count: '2 растения', image: '/plants/tradescantia.png', name: 'Лианы и ампельные' },
  { count: '3 растения', image: '/plants/phalaenopsis.png', name: 'Суккуленты' },
  { count: '1 растение', image: '/plants/monstera-basket.png', name: 'Пальмы' },
  { count: '1 растение', image: '/plants/chlorophytum.png', name: 'Папоротники' },
  { count: '1 растение', image: '/plants/gloxinia.png', name: 'Кактусы' },
];
