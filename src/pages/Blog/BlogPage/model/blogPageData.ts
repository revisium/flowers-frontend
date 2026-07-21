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

const blogEntry = (
  date: Translation,
  excerpt: Translation,
  image: readonly [src: string, alt: Translation, position?: string],
  link: readonly [href: string, title: Translation],
  stats: readonly LocalizedStat[],
): BlogSourceEntry => ({
  date,
  excerpt,
  href: link[0],
  image: image[0],
  imageAlt: image[1],
  imagePosition: image[2],
  stats,
  title: link[1],
});

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

const source = {
  breadcrumb: ['Блог', 'Blog'],
  entriesTitle: ['Эксперименты и наблюдения', 'Experiments and observations'],
  entries: [
    blogEntry(
      ['Июль 2026 · новый эксперимент', 'July 2026 · new experiment'],
      [
        'Листики и небольшие черенки разных суккулентов провели около недели в пути. Рассказываю, как они приехали, почему я сразу посадила их в грунт и чего жду теперь.',
        'Assorted succulent leaves and small cuttings spent about a week in transit. Here is how they arrived, why I planted them straight away and what I am waiting for now.',
      ],
      [
        '/blog/succulent-leaves-story/hero.webp',
        ['Разные листья суккулентов перед посадкой', 'Assorted succulent leaves before planting'],
        'center',
      ],
      [
        '/blog/succulent-leaves-story',
        ['Листики суккулентов: распаковка и посадка', 'Succulent leaves: unboxing and planting'],
      ],
      [
        localizedStat(['≈ 1 неделя', '≈ 1 week'], ['в пути', 'in transit']),
        localizedStat(['3 группы', '3 groups'], ['листьев и черенков', 'of leaves and cuttings']),
        localizedStat(['Сразу', 'Same day'], ['после распаковки', 'after unboxing']),
      ],
    ),
    blogEntry(
      ['Практическое руководство', 'Practical guide'],
      [
        'Шесть красивых способов справиться с длинными побегами хойи пубикаликс: оставить свободно свисать, направить по опоре, обрезать, укоренить, сформировать арку или аккуратно заплести.',
        'Six graceful ways to manage long Hoya pubicalyx vines: let them trail, train them on a support, prune, propagate, form an arch or braid them carefully.',
      ],
      [
        '/plants/hoya-pubicalyx-splash-home-photo.jpg',
        ['Хойя пубикаликс с длинными зелёными побегами', 'Hoya pubicalyx with long green vines'],
        'center 34%',
      ],
      [
        '/blog/hoya-pubicalyx-care',
        ['Хойя пубикаликс: что делать с длинными побегами', 'Hoya pubicalyx: managing long vines'],
      ],
      [
        localizedStat(['6', '6'], ['способов формировки', 'training ideas']),
        localizedStat(['18–28 °C', '18–28 °C'], ['комфортная температура', 'comfortable range']),
        localizedStat(['2–4 недели', '2–4 weeks'], ['между подкормками', 'between feedings']),
      ],
    ),
    blogEntry(
      ['Февраль — осень 2024', 'February — autumn 2024'],
      [
        'История о том, как из пакета с двадцатью семенами выросло почти двести глоксиний: первые всходы, пикировка, новые дома и долгожданное осеннее цветение.',
        'How a packet of twenty seeds became almost two hundred gloxinias: first sprouts, transplanting, new homes and the long-awaited autumn flowers.',
      ],
      [
        '/blog/gloxinia-seedlings-feature.webp',
        ['Молодые глоксинии, выращенные из семян', 'Young gloxinias grown from seed'],
      ],
      [
        '/blog/gloxinia-story',
        ['Глоксинии: от семян до первого цветения', 'Gloxinias: from seed to first bloom'],
      ],
      [
        localizedStat(['20', '20'], ['семян заявлено', 'seeds advertised']),
        localizedStat(['≈200', '≈200'], ['сеянцев взошло', 'seedlings emerged']),
        localizedStat(['Осень 2024', 'Autumn 2024'], ['первое цветение', 'first flowers']),
      ],
    ),
  ],
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
