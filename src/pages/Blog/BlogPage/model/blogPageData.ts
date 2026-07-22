import type { Locale } from 'src/shared/config';

type Translation = readonly [ru: string, en: string];
type LocalizedStat = readonly [value: Translation, label: Translation];

const localizedStat = (value: Translation, label: Translation): LocalizedStat => [value, label];

interface BlogSourceEntry {
  readonly date: Translation;
  readonly excerpt: Translation;
  readonly href: string;
  readonly image: string;
  readonly imageAlt: Translation;
  readonly imagePosition?: string;
  readonly stats: readonly LocalizedStat[];
  readonly title: Translation;
}

interface BlogSource {
  readonly breadcrumb: Translation;
  readonly entries: readonly BlogSourceEntry[];
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
  readonly href: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly imagePosition?: string;
  readonly stats: readonly (readonly [string, string])[];
  readonly title: string;
}

export interface BlogCopy {
  readonly breadcrumb: string;
  readonly entriesTitle: string;
  readonly entries: readonly BlogEntry[];
  readonly lead: string;
  readonly quote: string;
  readonly readLabel: string;
  readonly signatureAlt: string;
  readonly title: string;
}

const entryIndexes = [0, 1, 2] as const;
const entryDates = [
  ['Июль 2026 · новый эксперимент', 'July 2026 · new experiment'],
  ['Практическое руководство', 'Practical guide'],
  ['Февраль — осень 2024', 'February — autumn 2024'],
] as const satisfies readonly Translation[];
const entryExcerpts = [
  [
    'Листики и небольшие черенки разных суккулентов провели около недели в пути. Рассказываю, как они приехали, почему я сразу посадила их в грунт и чего жду теперь.',
    'Assorted succulent leaves and small cuttings spent about a week in transit. Here is how they arrived, why I planted them straight away and what I am waiting for now.',
  ],
  [
    'Шесть красивых способов справиться с длинными побегами хойи пубикаликс: оставить свободно свисать, направить по опоре, обрезать, укоренить, сформировать арку или аккуратно заплести.',
    'Six graceful ways to manage long Hoya pubicalyx vines: let them trail, train them on a support, prune, propagate, form an arch or braid them carefully.',
  ],
  [
    'История о том, как из пакета с двадцатью семенами выросло почти двести глоксиний: первые всходы, пикировка, новые дома и долгожданное осеннее цветение.',
    'How a packet of twenty seeds became almost two hundred gloxinias: first sprouts, transplanting, new homes and the long-awaited autumn flowers.',
  ],
] as const satisfies readonly Translation[];
const entryImages = [
  ['/blog/succulent-leaves-story/hero.webp', 'center'],
  ['/plants/hoya-pubicalyx-splash-home-photo.webp', 'center 34%'],
  ['/blog/gloxinia-seedlings-feature.webp', undefined],
] as const;
const entryImageAlts = [
  ['Разные листья суккулентов перед посадкой', 'Assorted succulent leaves before planting'],
  ['Хойя пубикаликс с длинными зелёными побегами', 'Hoya pubicalyx with long green vines'],
  ['Молодые глоксинии, выращенные из семян', 'Young gloxinias grown from seed'],
] as const satisfies readonly Translation[];
const entryLinks = [
  '/blog/succulent-leaves-story',
  '/blog/hoya-pubicalyx-care',
  '/blog/gloxinia-story',
] as const;
const entryStats = [
  [
    localizedStat(['≈ 1 неделя', '≈ 1 week'], ['в пути', 'in transit']),
    localizedStat(['3 группы', '3 groups'], ['листьев и черенков', 'of leaves and cuttings']),
    localizedStat(['Сразу', 'Same day'], ['после распаковки', 'after unboxing']),
  ],
  [
    localizedStat(['6', '6'], ['способов формировки', 'training ideas']),
    localizedStat(['18–28 °C', '18–28 °C'], ['комфортная температура', 'comfortable range']),
    localizedStat(['2–4 недели', '2–4 weeks'], ['между подкормками', 'between feedings']),
  ],
  [
    localizedStat(['20', '20'], ['семян заявлено', 'seeds advertised']),
    localizedStat(['≈200', '≈200'], ['сеянцев взошло', 'seedlings emerged']),
    localizedStat(['Осень 2024', 'Autumn 2024'], ['первое цветение', 'first flowers']),
  ],
] as const satisfies readonly (readonly LocalizedStat[])[];
const entryTitles = [
  ['Листики суккулентов: распаковка и посадка', 'Succulent leaves: unboxing and planting'],
  ['Хойя пубикаликс: что делать с длинными побегами', 'Hoya pubicalyx: managing long vines'],
  ['Глоксинии: от семян до первого цветения', 'Gloxinias: from seed to first bloom'],
] as const satisfies readonly Translation[];

const entries = entryIndexes.map((index): BlogSourceEntry => ({
  date: entryDates[index],
  excerpt: entryExcerpts[index],
  href: entryLinks[index],
  image: entryImages[index][0],
  imageAlt: entryImageAlts[index],
  imagePosition: entryImages[index][1],
  stats: entryStats[index],
  title: entryTitles[index],
}));

const source = {
  breadcrumb: ['Блог', 'Blog'],
  entriesTitle: ['Эксперименты и наблюдения', 'Experiments and observations'],
  entries,
  lead: [
    'Здесь я собираю настоящие истории выращивания: что получилось, что удивило и какие маленькие открытия хочется сохранить.',
    'This is where I collect real growing stories: what worked, what surprised me and which small discoveries deserve to be remembered.',
  ],
  quote: [
    '«Каждое растение рассказывает свою историю — о времени, внимании и маленьких открытиях, которые случаются благодаря заботе.»',
    '“Every plant tells its own story — one of time, attention and small discoveries made possible by care.”',
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
    entries: source.entries.map((entry) => ({
      date: translate(entry.date),
      excerpt: translate(entry.excerpt),
      href: entry.href,
      image: entry.image,
      imageAlt: translate(entry.imageAlt),
      imagePosition: entry.imagePosition,
      stats: entry.stats.map(([value, label]) => [translate(value), translate(label)]),
      title: translate(entry.title),
    })),
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
