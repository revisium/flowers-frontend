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
  readonly futureBody: Translation;
  readonly futureTitle: Translation;
  readonly lead: Translation;
  readonly readLabel: Translation;
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
  readonly futureBody: string;
  readonly futureTitle: string;
  readonly lead: string;
  readonly readLabel: string;
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
    imageAlt: ['Разноцветные глоксинии первого цветения', 'Colourful gloxinias in their first bloom'],
    stats: [
      [['20', '20'], ['семян заявлено', 'seeds advertised']],
      [['≈200', '≈200'], ['сеянцев взошло', 'seedlings emerged']],
      [['Осень 2024', 'Autumn 2024'], ['первое цветение', 'first flowers']],
    ],
    title: ['Глоксинии: от семян до первого цветения', 'Gloxinias: from seed to first bloom'],
  },
  futureBody: [
    'Здесь будут появляться новые посевы, черенкования, пересадки и другие наблюдения за растениями — с фотографиями, выводами и честными результатами.',
    'New sowing, propagation, repotting and other plant observations will appear here, with photographs, conclusions and honest results.',
  ],
  futureTitle: ['Продолжение следует', 'More experiments to come'],
  lead: [
    'Здесь я собираю настоящие истории выращивания: что получилось, что удивило и какие маленькие открытия хочется сохранить.',
    'This is where I collect real growing stories: what worked, what surprised me and which small discoveries deserve to be remembered.',
  ],
  readLabel: ['Читать историю', 'Read the story'],
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
      image: '/gloxinia-story/06-first-bloom.webp',
      imageAlt: translate(source.entry.imageAlt),
      stats: source.entry.stats.map(([value, label]) => [translate(value), translate(label)]),
      title: translate(source.entry.title),
    },
    futureBody: translate(source.futureBody),
    futureTitle: translate(source.futureTitle),
    lead: translate(source.lead),
    readLabel: translate(source.readLabel),
    title: translate(source.title),
  };
};

export const blogCopy: Record<Locale, BlogCopy> = {
  en: buildCopy('en'),
  ru: buildCopy('ru'),
};
