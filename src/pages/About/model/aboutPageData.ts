import type { Locale } from 'src/shared/config';

export type AboutIconName =
  | 'camera'
  | 'care'
  | 'flower'
  | 'laptop'
  | 'leaves'
  | 'note'
  | 'plant-card'
  | 'pot'
  | 'pot-leaf'
  | 'sprout';

export type AboutFeatureArtworkName = 'camera' | 'care' | 'flower' | 'note' | 'plant-card';

export interface AboutCopy {
  readonly breadcrumb: string;
  readonly cta: string;
  readonly footer: string;
  readonly footerTitle: string;
  readonly history: string;
  readonly lead: readonly [string, string];
  readonly name: string;
  readonly quote: string;
  readonly reason: string;
  readonly reasonBody: readonly [string, string];
  readonly title: string;
  readonly what: string;
}

export const aboutFeatures: Record<
  Locale,
  readonly (readonly [AboutFeatureArtworkName, string, string])[]
> = {
  ru: [
    ['plant-card', 'Карточки растений', 'Подробные описания каждого растения моей коллекции.'],
    ['camera', 'Фотографии роста', 'История роста и развития в фотографиях.'],
    ['care', 'Рекомендации по уходу', 'Проверенные советы по уходу, которые работают у меня.'],
    ['note', 'Личные заметки', 'Мои наблюдения, опыт и маленькие открытия.'],
    ['flower', 'История цветения', 'Всё о цветении: периоды, условия и фотографии.'],
  ],
  en: [
    ['plant-card', 'Plant profiles', 'Detailed notes about every plant in my collection.'],
    ['camera', 'Growth photos', 'A visual history of growth and development.'],
    ['care', 'Care advice', 'Tried-and-tested care tips that work for me.'],
    ['note', 'Personal notes', 'My observations, experience and small discoveries.'],
    ['flower', 'Bloom history', 'Blooming periods, conditions and photographs.'],
  ],
};

export const aboutMilestones: Record<
  Locale,
  readonly (readonly [AboutIconName, string, string, string])[]
> = {
  ru: [
    [
      'sprout',
      '2022',
      'Первое растение',
      'Всё началось с маленького фикуса. Он до сих пор со мной.',
    ],
    [
      'pot',
      '2023',
      'Первые пересадки',
      'Появились первые черенки, первые эксперименты и первые успехи.',
    ],
    [
      'pot-leaf',
      '2024',
      'Коллекция растёт',
      'Растений стало больше, появились редкие экземпляры и новые любимцы.',
    ],
    [
      'camera',
      '2025',
      'История в фотографиях',
      'Я начала фиксировать каждый важный момент: новые листья, цветение, пересадки.',
    ],
    ['laptop', '2026', 'Появился этот сайт', 'Чтобы все истории были в одном месте и не терялись.'],
  ],
  en: [
    [
      'sprout',
      '2022',
      'The first plant',
      'It began with a small ficus, which is still with me today.',
    ],
    ['pot', '2023', 'First repotting', 'The first cuttings, experiments and successes appeared.'],
    [
      'pot-leaf',
      '2024',
      'The collection grows',
      'More plants arrived, including rare finds and new favourites.',
    ],
    [
      'camera',
      '2025',
      'A story in photos',
      'I began recording new leaves, blooms and every important moment.',
    ],
    [
      'laptop',
      '2026',
      'This site appeared',
      'A home for all the stories, so none of them get lost.',
    ],
  ],
};

export const aboutCopy: Record<Locale, AboutCopy> = {
  ru: {
    breadcrumb: 'О проекте',
    cta: 'Перейти к коллекции растений',
    footer: 'Надеюсь, вам здесь будет так же уютно, как и мне.',
    footerTitle: 'Добро пожаловать в мою оранжерею!',
    history: 'Как появлялась оранжерея',
    lead: [
      'Эта оранжерея появилась не за один день.',
      'Моя коллекция складывалась постепенно. Одни растения я вырастила из семян, другие — укоренила из маленьких черенков. Некоторые подарили близкие люди, а за другими пришлось долго охотиться. Со временем мне захотелось сохранить не только названия растений, но и воспоминания, связанные с каждым из них.',
    ],
    name: 'Анастасия',
    quote: 'Коллекция — это не количество. Это внимание, забота и время, проведённое вместе.',
    reason: 'Почему именно история?',
    reasonBody: [
      'Растения живут своей жизнью. Листья появляются и опадают, цветы распускаются и увядают. Растения меняются, и мы меняемся вместе с ними.',
      'Я решила сохранять эти моменты, чтобы не забыть, как всё начиналось, как росло и как радовало.',
    ],
    title: 'Каждое растение — это маленькая история',
    what: 'Что вы найдёте здесь',
  },
  en: {
    breadcrumb: 'About',
    cta: 'View the plant collection',
    footer: 'I hope it feels as warm and welcoming to you as it does to me.',
    footerTitle: 'Welcome to my greenhouse!',
    history: 'How the greenhouse grew',
    lead: [
      'This greenhouse did not appear overnight.',
      'My collection developed gradually. I grew some plants from seeds, while others were rooted from small cuttings. Some were given by close people, while others had to be hunted for a long time. Over time, I wanted to preserve not only the names of the plants, but also the memories associated with each of them.',
    ],
    name: 'Anastasia',
    quote: 'A collection is not a number. It is attention, care and time spent together.',
    reason: 'Why stories?',
    reasonBody: [
      'Plants live lives of their own. Leaves emerge and fall, flowers open and fade. Plants change, and we change with them.',
      'I began preserving these moments so I would remember how everything started, grew and brought joy.',
    ],
    title: 'Every plant is a small story',
    what: 'What you will find here',
  },
};
