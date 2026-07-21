import type { Locale } from 'src/shared/config';

type Translation = readonly [ru: string, en: string];

const progressEntry = (
  caption: Translation,
  image: string,
  imageAlt: Translation,
  title: Translation,
) => ({ caption, image, imageAlt, title });

interface SucculentLeavesStorySource {
  readonly breadcrumb: Translation;
  readonly closing: Translation;
  readonly closingEyebrow: Translation;
  readonly heroLead: Translation;
  readonly heroTitle: Translation;
  readonly intro: readonly Translation[];
  readonly introTitle: Translation;
  readonly update: {
    readonly compositions: readonly {
      readonly caption: Translation;
      readonly image: string;
      readonly imageAlt: Translation;
      readonly plantName: Translation;
    }[];
    readonly eyebrow: Translation;
    readonly lead: readonly Translation[];
    readonly progress: readonly {
      readonly caption: Translation;
      readonly image: string;
      readonly imageAlt: Translation;
      readonly title: Translation;
    }[];
    readonly progressTitle: Translation;
    readonly resultTitle: Translation;
    readonly title: Translation;
  };
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
  readonly update: {
    readonly compositions: readonly {
      readonly caption: string;
      readonly image: string;
      readonly imageAlt: string;
      readonly plantName: string;
    }[];
    readonly eyebrow: string;
    readonly lead: readonly string[];
    readonly progress: readonly {
      readonly caption: string;
      readonly image: string;
      readonly imageAlt: string;
      readonly title: string;
    }[];
    readonly progressTitle: string;
    readonly resultTitle: string;
    readonly title: string;
  };
}

const source = {
  breadcrumb: ['Листики суккулентов', 'Succulent leaves'],
  closing: [
    'Самые быстрые уже стали частью новых композиций, а самые медленные всё ещё учат меня терпению. Теперь хочется увидеть, как все эти разные характеры будут расти вместе.',
    'The fastest growers are already part of new arrangements, while the slowest are still teaching me patience. Now I want to see how all these different characters will grow together.',
  ],
  closingEyebrow: ['История продолжается', 'The story continues'],
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
  update: {
    compositions: [
      {
        caption: [
          'В одной большой композиции встретились растения с совсем разной фактурой: гладкие, бархатистые, зубчатые и вариегатные. Пока между ними много воздуха, но я надеюсь, что со временем они красиво заполнят поверхность.',
          'One large arrangement now brings together very different textures: smooth, velvety, toothed and variegated. There is plenty of space between them for now, but I hope they will gradually fill the surface.',
        ],
        image: '/blog/succulent-leaves-story/composition-overview.webp',
        imageAlt: [
          'Большая композиция из укоренившихся суккулентов в белом кашпо',
          'A large arrangement of rooted succulents in a white planter',
        ],
        plantName: ['Первая общая композиция', 'The first shared arrangement'],
      },
      {
        caption: [
          'Самые узнаваемые здесь — бархатистое каланхоэ войлочное и фаукария с характерными зубчатыми листьями. Тонкий зелёный побег рядом похож на крассулу плауновидную, но это определение пока оставляю предварительным.',
          'The easiest to recognise here are the velvety panda plant and a Faucaria with its characteristic toothed leaves. The fine green shoot beside them resembles a watch-chain crassula, though I am keeping that identification tentative.',
        ],
        image: '/blog/succulent-leaves-story/composition-kalanchoe-faucaria.webp',
        imageAlt: [
          'Каланхоэ войлочное, фаукария и другие суккуленты в общей композиции',
          'Panda plant, Faucaria and other succulents in a shared arrangement',
        ],
        plantName: [
          'Kalanchoe tomentosa · Faucaria sp. · Crassula cf. muscosa',
          'Kalanchoe tomentosa · Faucaria sp. · Crassula cf. muscosa',
        ],
      },
      {
        caption: [
          'В меньшей композиции хорошо заметен очиток с длинными мясистыми листьями. Рядом — несколько ещё совсем молодых розеток и вариегатный черенок: им оставлено место на будущий рост.',
          'A stonecrop with long fleshy leaves stands out in the smaller arrangement. Beside it are several very young rosettes and a variegated cutting, all with room left for future growth.',
        ],
        image: '/blog/succulent-leaves-story/composition-sedum.webp',
        imageAlt: [
          'Молодые суккуленты и очиток в небольшой белой композиции',
          'Young succulents and stonecrop in a small white arrangement',
        ],
        plantName: ['Очиток · Sedum sp.', 'Stonecrop · Sedum sp.'],
      },
    ],
    eyebrow: ['Продолжение эксперимента', 'Experiment update'],
    lead: [
      [
        'Через некоторое время стало видно, насколько разным оказался темп у растений из одной коробки. Некоторые листики по-прежнему сидят в ячейках и только начинают новую жизнь. Другие быстро дали корни, окрепли и уже переехали в общие композиции.',
        'After a while, it became clear how different the pace could be among plants from the same box. Some leaves are still sitting in their cells and only just beginning a new life. Others rooted quickly, grew stronger and have already moved into shared arrangements.',
      ],
      [
        'Я не стала торопить медленных и не выбрасывала материнские листья, пока они остаются плотными. А тех, кто уверенно пошёл в рост, собрала вместе, оставив между растениями место для будущего объёма.',
        'I did not rush the slower leaves or remove their parent leaves while they remained firm. The confident growers were planted together with space left between them for future volume.',
      ],
    ],
    progress: [
      progressEntry(
        [
          'У основания одного листа уже раскрылась маленькая розетка. Соседний пока выглядит почти без изменений, но у самой точки роста появилась новая зелёная почка.',
          'A tiny rosette has already opened at the base of one leaf. Its neighbour still looks almost unchanged, but a new green bud has appeared at the growth point.',
        ],
        '/blog/succulent-leaves-story/progress-rosette.webp',
        [
          'Молодая розетка у основания листа суккулента в посадочной ячейке',
          'A young rosette at the base of a succulent leaf in a propagation cell',
        ],
        ['Первая настоящая розетка', 'The first true rosette'],
      ),
      progressEntry(
        [
          'В соседней ячейке перемены пока почти микроскопические. Эти зелёные точки я оставляю под наблюдением: по такому раннему росту ещё рано уверенно определять растение.',
          'Changes in the neighbouring cell are still almost microscopic. I am keeping these green points under observation: it is too early to identify the plant confidently from growth this young.',
        ],
        '/blog/succulent-leaves-story/progress-sprouts.webp',
        [
          'Крошечные зелёные точки роста между листьями суккулентов в ячейке',
          'Tiny green growth points between succulent leaves in a propagation cell',
        ],
        ['Самые неторопливые', 'The unhurried ones'],
      ),
    ],
    progressTitle: ['Не все спешат покидать ячейки', 'Not everyone is ready to leave the cells'],
    resultTitle: ['Те, кто уже переехал', 'Those that have already moved'],
    title: ['Несколько недель спустя', 'Several weeks later'],
  },
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
      'Теперь я буду наблюдать уже за двумя историями одновременно: за листиками, которые только собираются стать растениями, и за композициями, где молодым суккулентам предстоит найти собственную форму.',
      'Now I will be following two stories at once: the leaves that are only beginning to become plants, and the arrangements in which the young succulents must find their own shape.',
    ],
    [
      'Когда посадки разрастутся, можно будет оценить их соседство и, если понадобится, дать самым активным больше места.',
      'Once the plantings fill out, I will be able to judge how well they share the space and give the fastest growers more room if needed.',
    ],
  ],
  nextTitle: ['Теперь — расти', 'Now, to grow'],
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
    update: {
      compositions: source.update.compositions.map((entry) => ({
        caption: translate(entry.caption),
        image: entry.image,
        imageAlt: translate(entry.imageAlt),
        plantName: translate(entry.plantName),
      })),
      eyebrow: translate(source.update.eyebrow),
      lead: source.update.lead.map(translate),
      progress: source.update.progress.map((entry) => ({
        caption: translate(entry.caption),
        image: entry.image,
        imageAlt: translate(entry.imageAlt),
        title: translate(entry.title),
      })),
      progressTitle: translate(source.update.progressTitle),
      resultTitle: translate(source.update.resultTitle),
      title: translate(source.update.title),
    },
  };
};

export const succulentLeavesStoryCopy: Record<Locale, SucculentLeavesStoryCopy> = {
  en: buildCopy('en'),
  ru: buildCopy('ru'),
};
