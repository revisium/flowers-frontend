import type { Locale } from 'src/shared/config';

type Translation = readonly [ru: string, en: string];

interface SucculentLeavesStorySource {
  readonly breadcrumb: Translation;
  readonly closing: Translation;
  readonly closingEyebrow: Translation;
  readonly heroLead: Translation;
  readonly heroTitle: Translation;
  readonly intro: readonly Translation[];
  readonly introTitle: Translation;
  readonly journal: readonly {
    readonly body: readonly Translation[];
    readonly image: string;
    readonly imageAlt: Translation;
    readonly label: Translation;
    readonly note?: Translation;
    readonly title: Translation;
  }[];
  readonly nextBody: readonly Translation[];
  readonly nextTitle: Translation;
  readonly quote: Translation;
  readonly stats: readonly (readonly [Translation, Translation])[];
}

export interface SucculentJournalEntry {
  readonly body: readonly string[];
  readonly image: string;
  readonly imageAlt: string;
  readonly label: string;
  readonly note?: string;
  readonly title: string;
}

export interface SucculentLeavesStoryCopy {
  readonly breadcrumb: string;
  readonly closing: string;
  readonly closingEyebrow: string;
  readonly heroLead: string;
  readonly heroTitle: string;
  readonly intro: readonly string[];
  readonly introTitle: string;
  readonly journal: readonly SucculentJournalEntry[];
  readonly nextBody: readonly string[];
  readonly nextTitle: string;
  readonly quote: string;
  readonly stats: readonly (readonly [string, string])[];
}

const source = {
  breadcrumb: ['Листики суккулентов', 'Succulent leaves'],
  closing: [
    'Теперь остаётся самое сложное — не торопить их. Буду наблюдать, какие листики дадут корни и у кого первой появится крошечная розетка.',
    'Now comes the hardest part: not rushing them. I will watch to see which leaves grow roots and which one produces the first tiny rosette.',
  ],
  closingEyebrow: ['Продолжение следует', 'To be continued'],
  heroLead: [
    'Как ко мне приехала коробка разных суккулентов, почему подсохшие кончики оказались кстати и как я устроила каждому листику собственное место для нового старта.',
    'How a box of assorted succulents arrived, why the dry ends were useful, and how I gave every leaf its own place for a new start.',
  ],
  heroTitle: ['Коробка листиков — и много новых надежд', 'A box of leaves — and many new hopes'],
  intro: [
    [
      'На маркетплейсе я увидела набор листиков и небольших черенков разных суккулентов. Названия были не самым важным: мне хотелось получить маленькую ботаническую лотерею и посмотреть, кто из них решит расти.',
      'I found a set of leaves and small cuttings from assorted succulents on a marketplace. The names mattered less than the idea of a small botanical lottery: I wanted to see which of them would choose to grow.',
    ],
    [
      'Посылка шла примерно неделю. Всё это время я представляла, что открою коробку, а внутри меня будет ждать горсть будущих растений — пока ещё совсем непохожих на коллекцию.',
      'The parcel travelled for about a week. All that time I imagined opening the box to find a handful of future plants, not yet looking anything like a collection.',
    ],
  ],
  introTitle: ['Маленькая ботаническая лотерея', 'A small botanical lottery'],
  journal: [
    {
      body: [
        [
          'Листики приехали в коробке, аккуратно переложенные салфетками. Я сразу разложила всё на светлом столе: отдельно крупные мясистые листья, отдельно миниатюрные фрагменты и веточки.',
          'The leaves arrived in a box, carefully layered with tissues. I spread everything out on a pale table straight away: large fleshy leaves in one group, tiny fragments and stems in another.',
        ],
        [
          'После дороги часть листьев выглядела уставшей, но большинство сохранило плотность. Больше всего меня порадовали сухие, чистые кончики — за неделю срезы успели естественно затянуться.',
          'Some leaves looked tired after the journey, but most were still firm. I was especially pleased by the clean, dry ends: during the week, the cuts had naturally callused.',
        ],
      ],
      image: '/blog/succulent-leaves-story/arrival.webp',
      imageAlt: [
        'Полученные листья и черенки суккулентов, разложенные на салфетках',
        'Delivered succulent leaves and cuttings arranged on tissues',
      ],
      label: ['Моя фотография · распаковка', 'My photograph · unboxing'],
      note: [
        'Я убрала только явно повреждённые части. Плотные листья с чистым сухим основанием решила оставить — даже самые неприметные получили шанс.',
        'I removed only clearly damaged pieces. Firm leaves with a clean, dry base stayed — even the least impressive ones got a chance.',
      ],
      title: ['После недели в дороге', 'After a week on the road'],
    },
    {
      body: [
        [
          'Так как кончики уже подсохли, я не стала откладывать посадку. Подготовила ячейки с рыхлым грунтом и распределила растения так, чтобы потом было понятно, кто и как меняется.',
          'Because the ends were already dry, I did not postpone planting. I prepared cells with loose mix and separated the plants so I could later see how each one changed.',
        ],
        [
          'Крупные листья положила на поверхность, касаясь грунта основанием. Небольшие черенки со стеблем закрепила чуть глубже. Мне хотелось дать им опору, но не спрятать точку, откуда могут появиться корни и новая розетка.',
          'I laid the large leaves on the surface with their bases touching the mix. Small stem cuttings were anchored a little deeper. I wanted to support them without hiding the point where roots and a new rosette might appear.',
        ],
      ],
      image: '/blog/succulent-leaves-story/planting.webp',
      imageAlt: [
        'Листья и черенки суккулентов, распределённые по ячейкам с грунтом',
        'Succulent leaves and cuttings arranged in cells filled with potting mix',
      ],
      label: ['Моя фотография · посадка', 'My photograph · planting'],
      note: [
        'Это мой эксперимент, а не универсальная схема: листовые и стеблевые черенки разных суккулентов могут укореняться по-разному.',
        'This is my experiment rather than a universal method: leaf and stem cuttings from different succulents may root in different ways.',
      ],
      title: ['Сразу в грунт', 'Straight into the mix'],
    },
    {
      body: [
        [
          'Дальше начинается этап, в котором почти ничего нельзя ускорить. Я поставила контейнеры в светлое место без жёсткого полуденного солнца и решила наблюдать, а не проверять каждый листик руками.',
          'Next comes the stage that can hardly be hurried. I placed the trays in bright light away from harsh midday sun and decided to observe rather than pick up every leaf to check it.',
        ],
        [
          'Первые перемены могут быть очень тихими: тонкий корешок, крошечная розетка у основания или, наоборот, медленно сморщившийся лист. Не каждый участник этой коробки обязательно станет растением — и в этом тоже часть эксперимента.',
          'The first changes may be very quiet: a fine root, a tiny rosette at the base, or a leaf slowly shrivelling instead. Not every traveller in this box will necessarily become a plant, and that is part of the experiment too.',
        ],
      ],
      image: '/blog/succulent-leaves-story/first-roots.webp',
      imageAlt: [
        'Молодые розетки и первые корни у листьев суккулентов на рыхлом субстрате',
        'Tiny rosettes and first roots on succulent leaves resting on gritty mix',
      ],
      label: ['Иллюстрация · чего я жду', 'Illustration · what I hope to see'],
      title: ['Тихое ожидание', 'The quiet wait'],
    },
  ],
  nextBody: [
    [
      'Я буду отмечать первые корни, новые розетки и потери, чтобы позже сравнить, какие формы пережили пересылку лучше всего.',
      'I will record the first roots, new rosettes and losses so I can later compare which forms handled shipping best.',
    ],
    [
      'А пока на подоконнике стоит несколько маленьких зелёных лотков. В каждом — не готовое растение, а возможность.',
      'For now, several little green trays sit on the windowsill. Each one holds not a finished plant, but a possibility.',
    ],
  ],
  nextTitle: ['Что будет дальше', 'What happens next'],
  quote: [
    'Иногда коллекция начинается не с растения, а с одного листика и терпения.',
    'Sometimes a collection begins not with a plant, but with a single leaf and patience.',
  ],
  stats: [
    [
      ['≈ 1 неделя', '≈ 1 week'],
      ['в пути', 'in transit'],
    ],
    [
      ['3 группы', '3 groups'],
      ['листья и черенки', 'of leaves and cuttings'],
    ],
    [
      ['1 эксперимент', '1 experiment'],
      ['с открытым финалом', 'with an open ending'],
    ],
  ],
} satisfies SucculentLeavesStorySource;

const localeIndex: Record<Locale, 0 | 1> = { en: 1, ru: 0 };

const buildCopy = (locale: Locale): SucculentLeavesStoryCopy => {
  const index = localeIndex[locale];
  const translate = (value: Translation) => value[index];

  return {
    breadcrumb: translate(source.breadcrumb),
    closing: translate(source.closing),
    closingEyebrow: translate(source.closingEyebrow),
    heroLead: translate(source.heroLead),
    heroTitle: translate(source.heroTitle),
    intro: source.intro.map(translate),
    introTitle: translate(source.introTitle),
    journal: source.journal.map((entry) => ({
      body: entry.body.map(translate),
      image: entry.image,
      imageAlt: translate(entry.imageAlt),
      label: translate(entry.label),
      note: entry.note ? translate(entry.note) : undefined,
      title: translate(entry.title),
    })),
    nextBody: source.nextBody.map(translate),
    nextTitle: translate(source.nextTitle),
    quote: translate(source.quote),
    stats: source.stats.map(([value, label]) => [translate(value), translate(label)]),
  };
};

export const succulentLeavesStoryCopy: Record<Locale, SucculentLeavesStoryCopy> = {
  en: buildCopy('en'),
  ru: buildCopy('ru'),
};
