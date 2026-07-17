import type { Locale } from 'src/shared/config';

type LocaleIndex = 0 | 1;
type Pair = readonly [string, string];
type Translation = readonly [ru: string, en: string];
type BilingualPair = readonly [Translation, Translation];
type BilingualGalleryText = readonly [alt: Translation, caption: Translation];
type BilingualJourneyText = readonly [alt: Translation, date: Translation, description: Translation, title: Translation];
type BilingualLabels = readonly [
  breadcrumb: Translation,
  factsTitle: Translation,
  heroTitle: Translation,
  journeyTitle: Translation,
  originImageAlt: Translation,
  originTitle: Translation,
  quote: Translation,
  sharingTitle: Translation,
];

interface GloxiniaBilingualSource {
  readonly gallery: readonly BilingualGalleryText[];
  readonly heroBody: BilingualPair;
  readonly journey: readonly BilingualJourneyText[];
  readonly labels: BilingualLabels;
  readonly originBody: BilingualPair;
  readonly sharingBody: BilingualPair;
  readonly stats: readonly BilingualPair[];
}

export interface GloxiniaJourneyEntry {
  readonly alt: string;
  readonly date: string;
  readonly description: string;
  readonly fillsFrame?: boolean;
  readonly image: string;
  readonly title: string;
}

export interface GloxiniaStoryCopy {
  readonly breadcrumb: string;
  readonly factsTitle: string;
  readonly gallery: readonly (readonly [string, string, string])[];
  readonly heroBody: Pair;
  readonly heroTitle: string;
  readonly journey: readonly GloxiniaJourneyEntry[];
  readonly journeyTitle: string;
  readonly originBody: Pair;
  readonly originImageAlt: string;
  readonly originTitle: string;
  readonly quote: string;
  readonly sharingBody: Pair;
  readonly sharingTitle: string;
  readonly stats: readonly Pair[];
}

const galleryImages = [
  '/gloxinia-story/07-speckled-bloom.webp',
  '/gloxinia-story/08-purple-bloom.webp',
  '/gloxinia-story/09-pink-bloom.webp',
] as const;

const journeyMedia = [
  ['/gloxinia-story/01-seeds.webp', false],
  ['/gloxinia-story/02-first-sprouts.webp', true],
  ['/gloxinia-story/03-young-seedlings.webp', false],
  ['/gloxinia-story/04-crowded-growth.webp', false],
  ['/gloxinia-story/05-individual-pots.webp', true],
  ['/gloxinia-story/06-first-bloom.webp', true],
] as const;

const storySource = {
  gallery: [
    [['Две белые глоксинии с густым бордовым крапом', 'Two cream gloxinias densely speckled burgundy'], ['Крапчатые', 'Speckled']],
    [['Сиреневая и тёмно-фиолетовая глоксинии', 'Lavender and deep-purple gloxinia flowers'], ['Сиреневые', 'Lavender']],
    [['Три розовые глоксинии разных оттенков', 'Three gloxinia flowers in different pink shades'], ['Розовые', 'Pink']],
  ],
  heroBody: [
    ['Эта история началась в феврале 2024 года — с маленьких семян и большой веры в чудо.', 'This story began in February 2024, with tiny seeds and a great deal of faith in a small miracle.'],
    ['С тех пор прошло больше года, и теперь моя коллекция глоксиний — одна из самых любимых частей оранжереи.', 'More than a year later, my gloxinia collection has become one of the most beloved parts of the greenhouse.'],
  ],
  journey: [
    [['Мелкие семена глоксинии на светлой поверхности', 'Tiny gloxinia seeds scattered on a pale surface'], ['Февраль 2024', 'February 2024'], ['На упаковке было заявлено двадцать семян. На столе они казались почти пылью.', 'The packet promised twenty seeds. On the table they looked almost like dust.'], ['Семена', 'Seeds']],
    [['Первые массовые всходы глоксиний в контейнере', 'The first mass of gloxinia seedlings in a container'], ['Конец февраля', 'Late February'], ['Вместо нескольких зелёных точек появился целый ковёр маленьких бархатистых листьев.', 'Instead of a few green dots, a carpet of tiny velvety leaves appeared.'], ['Первые всходы', 'First sprouts']],
    [['Подросшие молодые сеянцы глоксиний', 'Young gloxinia seedlings growing larger'], ['Март 2024', 'March 2024'], ['Сеянцы росли так быстро, что стало ясно: их не двадцать, а примерно двести.', 'They grew so quickly that it became clear there were not twenty, but nearly two hundred.'], ['Лес из листьев', 'A forest of leaves']],
    [['Густо растущие молодые глоксинии перед пикировкой', 'Crowded young gloxinias before separating'], ['Апрель 2024', 'April 2024'], ['Растениям стало тесно. Самые крепкие пришлось осторожно отделять друг от друга.', 'The plants ran out of room. The strongest had to be separated with great care.'], ['Время пикировки', 'Time to separate']],
    [['Молодые глоксинии после пересадки в отдельные горшки', 'Young gloxinias transplanted into individual pots'], ['Май — август', 'May — August'], ['Свободные полки закончились. Глоксинии начали разъезжаться к знакомым и родным.', 'The empty shelves disappeared. Gloxinias began moving to friends and family.'], ['Новые дома', 'New homes']],
    [['Разноцветные глоксинии в первом осеннем цветении', 'Colourful gloxinias in their first autumn bloom'], ['Осень 2024', 'Autumn 2024'], ['Розовые, сиреневые, фиолетовые и крапчатые — ни один цветок не повторял другой.', 'Pink, lavender, purple and speckled — no two flowers looked alike.'], ['Первое цветение', 'First flowers']],
  ],
  labels: [
    ['История глоксиний', 'The gloxinia story'],
    ['Немного цифр', 'A few numbers'],
    ['История моих глоксиний', 'The story of my gloxinias'],
    ['Путь от семени до цветка', 'From seed to flower'],
    ['Разноцветные глоксинии в первом осеннем цветении', 'Colourful gloxinias in their first autumn bloom'],
    ['Как всё начиналось', 'How it began'],
    ['Самое красивое в этой истории — не двести всходов, а то, сколько домов они сделали немного ярче.', 'The loveliest part of this story is not two hundred seedlings, but how many homes became a little brighter.'],
    ['Дарить радость', 'Sharing the joy'],
  ],
  originBody: [
    ['На маркетплейсе это был самый обычный пакет с обещанием двадцати семян. Я посеяла их без больших ожиданий и каждый день заглядывала в контейнер. Через короткое время вместо редких ростков там появился настоящий зелёный ковёр.', 'On the marketplace it was an ordinary packet promising twenty seeds. I sowed them without great expectations and checked the container every day. Before long, a green carpet appeared instead of a few scattered sprouts.'],
    ['Сначала радовало каждое новое растение. Потом стало понятно: места на всех не хватит. Выбросить крепкие живые сеянцы я не могла, поэтому началась большая раздача — знакомым, друзьям и маме. Так одна маленькая покупка превратилась в десятки домашних историй.', 'At first every new plant was a delight. Then it became obvious there would never be enough room. I could not throw away strong living seedlings, so the great giveaway began — to friends, acquaintances and my mother. One small purchase became dozens of home stories.'],
  ],
  sharingBody: [
    ['Когда осенью раскрылись первые бутоны, стало понятно, зачем были нужны все эти пересадки, стаканчики и занятые подоконники. Из одинаковых крошечных семян выросли растения с совершенно разными характерами.', 'When the first buds opened in autumn, every transplant, cup and occupied windowsill suddenly made sense. Identical tiny seeds had grown into plants with completely different personalities.'],
    ['Глоксинии уехали к близким ещё до цветения, поэтому их первые бутоны стали маленькими сюрпризами уже в новых домах. Для меня это и есть настоящая коллекция: не только хранить красоту у себя, но и делиться ею.', 'Many gloxinias moved to loved ones before flowering, so their first buds became surprises in new homes. To me, that is what a collection should be: not only keeping beauty, but sharing it.'],
  ],
  stats: [
    [['20', '20'], ['семян было заявлено', 'seeds advertised']],
    [['~200', '~200'], ['сеянцев взошло', 'seedlings emerged']],
    [['150+', '150+'], ['растений я раздала', 'plants I gave away']],
    [['30+', '30+'], ['осталось в моей коллекции', 'remain in my collection']],
  ],
} satisfies GloxiniaBilingualSource;

const localeIndexes: Record<Locale, LocaleIndex> = { en: 1, ru: 0 };

const translate = (value: Translation, index: LocaleIndex) => value[index];

const translatePair = (value: BilingualPair, index: LocaleIndex): Pair => [
  translate(value[0], index),
  translate(value[1], index),
];

const buildGallery = (index: LocaleIndex) => storySource.gallery.map(([alt, caption], imageIndex) => {
  const image = galleryImages[imageIndex];

  if (!image) {
    throw new Error(`Missing gloxinia gallery image at index ${imageIndex}`);
  }

  return [image, translate(alt, index), translate(caption, index)] as const;
});

const buildJourney = (index: LocaleIndex): readonly GloxiniaJourneyEntry[] => storySource.journey.map((entry, imageIndex) => {
  const media = journeyMedia[imageIndex];

  if (!media) {
    throw new Error(`Missing gloxinia journey image at index ${imageIndex}`);
  }

  const [alt, date, description, title] = entry;
  const [image, fillsFrame] = media;

  return {
    alt: translate(alt, index),
    date: translate(date, index),
    description: translate(description, index),
    fillsFrame,
    image,
    title: translate(title, index),
  };
});

const buildCopy = (locale: Locale): GloxiniaStoryCopy => {
  const index = localeIndexes[locale];
  const [
    breadcrumb,
    factsTitle,
    heroTitle,
    journeyTitle,
    originImageAlt,
    originTitle,
    quote,
    sharingTitle,
  ] = storySource.labels;

  return {
    breadcrumb: translate(breadcrumb, index),
    factsTitle: translate(factsTitle, index),
    gallery: buildGallery(index),
    heroBody: translatePair(storySource.heroBody, index),
    heroTitle: translate(heroTitle, index),
    journey: buildJourney(index),
    journeyTitle: translate(journeyTitle, index),
    originBody: translatePair(storySource.originBody, index),
    originImageAlt: translate(originImageAlt, index),
    originTitle: translate(originTitle, index),
    quote: translate(quote, index),
    sharingBody: translatePair(storySource.sharingBody, index),
    sharingTitle: translate(sharingTitle, index),
    stats: storySource.stats.map((stat) => translatePair(stat, index)),
  };
};

export const gloxiniaStoryCopy: Record<Locale, GloxiniaStoryCopy> = {
  en: buildCopy('en'),
  ru: buildCopy('ru'),
};
