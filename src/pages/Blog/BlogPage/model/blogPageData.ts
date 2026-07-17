import type { Locale } from 'src/shared/config';

type Translation = readonly [ru: string, en: string];

interface BlogSource {
  readonly breadcrumb: Translation;
  readonly entry: {
    readonly date: Translation;
    readonly excerpt: Translation;
    readonly imageAlt: Translation;
    readonly stats: readonly (readonly [Translation, Translation])[];
    readonly title: Translation;
  };
  readonly entriesTitle: Translation;
  readonly lead: Translation;
  readonly quote: Translation;
  readonly readLabel: Translation;
  readonly signatureAlt: Translation;
  readonly title: Translation;
}

export interface BlogEntry {
  readonly date: string;
  readonly excerpt: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly stats: readonly (readonly [string, string])[];
  readonly title: string;
}

export interface BlogCopy {
  readonly breadcrumb: string;
  readonly entriesTitle: string;
  readonly entry: BlogEntry;
  readonly lead: string;
  readonly quote: string;
  readonly readLabel: string;
  readonly signatureAlt: string;
  readonly title: string;
}

const source = {
  breadcrumb: ['Блог', 'Blog'],
  entriesTitle: ['Эксперименты и наблюдения', 'Experiments and observations'],
  entry: {
    date: ['Февраль — осень 2024', 'February — autumn 2024'],
    excerpt: [
      'История о том, как из пакета с двадцатью семенами выросло почти двести глоксиний: первые всходы, пикировка, новые дома и долгожданное осеннее цветение.',
      'How a packet of twenty seeds became almost two hundred gloxinias: first sprouts, transplanting, new homes and the long-awaited autumn flowers.',
    ],
    imageAlt: ['Молодые глоксинии, выращенные из семян', 'Young gloxinias grown from seed'],
    stats: [
      [['20', '20'], ['семян заявлено', 'seeds advertised']],
      [['≈200', '≈200'], ['сеянцев взошло', 'seedlings emerged']],
      [['Осень 2024', 'Autumn 2024'], ['первое цветение', 'first flowers']],
    ],
    title: ['Глоксинии: от семян до первого цветения', 'Gloxinias: from seed to first bloom'],
  },
  lead: [
    'Здесь я собираю настоящие истории выращивания: что получилось, что удивило и какие маленькие открытия хочется сохранить.',
    'This is where I collect real growing stories: what worked, what surprised me and which small discoveries deserve to be remembered.',
  ],
  quote: [
    '«Самое красивое в этой истории — не десятки всходов, а то, сколько живой силы, тепла и внимания в них вложено.»',
    '“The most beautiful part of this story is not the dozens of seedlings, but how much life, warmth and care went into them.”',
  ],
  readLabel: ['Читать историю', 'Read the story'],
  signatureAlt: ['Подпись Анастасии', "Anastasia's signature"],
  title: ['Дневник экспериментов', 'Experiment journal'],
} satisfies BlogSource;

const localeIndex: Record<Locale, 0 | 1> = { en: 1, ru: 0 };

const buildCopy = (locale: Locale): BlogCopy => {
  const index = localeIndex[locale];
  const translate = (value: Translation) => value[index];

  return {
    breadcrumb: translate(source.breadcrumb),
    entriesTitle: translate(source.entriesTitle),
    entry: {
      date: translate(source.entry.date),
      excerpt: translate(source.entry.excerpt),
      image: '/blog/gloxinia-seedlings-feature.webp',
      imageAlt: translate(source.entry.imageAlt),
      stats: source.entry.stats.map(([value, label]) => [translate(value), translate(label)]),
      title: translate(source.entry.title),
    },
    lead: translate(source.lead),
    quote: translate(source.quote),
    readLabel: translate(source.readLabel),
    signatureAlt: translate(source.signatureAlt),
    title: translate(source.title),
  };
};

export const blogCopy: Record<Locale, BlogCopy> = {
  en: buildCopy('en'),
  ru: buildCopy('ru'),
};
