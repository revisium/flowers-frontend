import type { Locale } from 'src/shared/config';

export const layoutNavigationLinks = {
  ru: [
    ['Главная', '/'],
    ['Семейства', '/#greenhouse-categories-title'],
    ['Уход', '/care'],
    ['Обо мне', '/about'],
    ['Блог', '/blog'],
  ],
  en: [
    ['Home', '/'],
    ['Families', '/#greenhouse-categories-title'],
    ['Care', '/care'],
    ['About me', '/about'],
    ['Blog', '/blog'],
  ],
} satisfies Record<Locale, readonly (readonly [label: string, href: string])[]>;
