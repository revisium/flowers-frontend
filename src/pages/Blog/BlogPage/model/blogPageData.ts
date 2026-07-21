import type { Locale } from 'src/shared/config';

type Translation = readonly [ru: string, en: string];

interface BlogSource {
  readonly breadcrumb: Translation;
  readonly entries: readonly {
    readonly date: Translation;
    readonly excerpt: Translation;
    readonly href: string;
    readonly image: string;
    readonly imageAlt: Translation;
    readonly imagePosition?: string;
    readonly stats: readonly (readonly [Translation, Translation])[];
    readonly title: Translation;
  }[];
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

const source = {
  breadcrumb: ['Блог', 'Blog'],
  entriesTitle: ['Эксперименты и наблюдения', 'Experiments and observations'],
  entries: [
    {
      date: ['Июль 2026 · новый эксперимент', 'July 2026 · new experiment'],
      excerpt: [
        'Листики и небольшие черенки разных суккулентов провели около недели в пути. Рассказываю, как они приехали, почему я сразу посадила их в грунт и чего жду теперь.',
        'Assorted succulent leaves and small cuttings spent about a week in transit. Here is how they arrived, why I planted them straight away and what I am waiting for now.',
      ],
      href: '/blog/succulent-leaves-story',
      image: '/blog/succulent-leaves-story/hero.webp',
      imageAlt: [
        'Разные листья суккулентов перед посадкой',
        'Assorted succulent leaves before planting',
      ],
      imagePosition: 'center',
      stats: [
        [
          ['≈ 1 неделя', '≈ 1 week'],
          ['в пути', 'in transit'],
        ],
        [
          ['3 группы', '3 groups'],
          ['листьев и черенков', 'of leaves and cuttings'],
        ],
        [
          ['Сразу', 'Same day'],
          ['после распаковки', 'after unboxing'],
        ],
      ],
      title: [
        'Листики суккулентов: распаковка и посадка',
        'Succulent leaves: unboxing and planting',
      ],
    },
    {
      date: ['Практическое руководство', 'Practical guide'],
      excerpt: [
        'Шесть красивых способов справиться с длинными побегами хойи пубикаликс: оставить свободно свисать, направить по опоре, обрезать, укоренить, сформировать арку или аккуратно заплести.',
        'Six graceful ways to manage long Hoya pubicalyx vines: let them trail, train them on a support, prune, propagate, form an arch or braid them carefully.',
      ],
      href: '/blog/hoya-pubicalyx-care',
      image: '/plants/hoya-pubicalyx-splash-home-photo.jpg',
      imageAlt: [
        'Хойя пубикаликс с длинными зелёными побегами',
        'Hoya pubicalyx with long green vines',
      ],
      imagePosition: 'center 34%',
      stats: [
        [
          ['6', '6'],
          ['способов формировки', 'training ideas'],
        ],
        [
          ['18–28 °C', '18–28 °C'],
          ['комфортная температура', 'comfortable range'],
        ],
        [
          ['2–4 недели', '2–4 weeks'],
          ['между подкормками', 'between feedings'],
        ],
      ],
      title: [
        'Хойя пубикаликс: что делать с длинными побегами',
        'Hoya pubicalyx: managing long vines',
      ],
    },
    {
      date: ['Февраль — осень 2024', 'February — autumn 2024'],
      excerpt: [
        'История о том, как из пакета с двадцатью семенами выросло почти двести глоксиний: первые всходы, пикировка, новые дома и долгожданное осеннее цветение.',
        'How a packet of twenty seeds became almost two hundred gloxinias: first sprouts, transplanting, new homes and the long-awaited autumn flowers.',
      ],
      href: '/blog/gloxinia-story',
      image: '/blog/gloxinia-seedlings-feature.webp',
      imageAlt: ['Молодые глоксинии, выращенные из семян', 'Young gloxinias grown from seed'],
      stats: [
        [
          ['20', '20'],
          ['семян заявлено', 'seeds advertised'],
        ],
        [
          ['≈200', '≈200'],
          ['сеянцев взошло', 'seedlings emerged'],
        ],
        [
          ['Осень 2024', 'Autumn 2024'],
          ['первое цветение', 'first flowers'],
        ],
      ],
      title: ['Глоксинии: от семян до первого цветения', 'Gloxinias: from seed to first bloom'],
    },
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
