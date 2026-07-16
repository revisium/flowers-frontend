import type { Locale } from 'src/shared/config';

export interface GloxiniaJourneyEntry {
  readonly alt: string;
  readonly date: string;
  readonly description: string;
  readonly fillsFrame?: boolean;
  readonly image: string;
  readonly title: string;
}

export interface GloxiniaStoryCopy {
  readonly backToAbout: string;
  readonly breadcrumb: string;
  readonly factsTitle: string;
  readonly gallery: readonly (readonly [string, string, string])[];
  readonly heroBody: readonly [string, string];
  readonly heroTitle: string;
  readonly journey: readonly GloxiniaJourneyEntry[];
  readonly journeyTitle: string;
  readonly originBody: readonly [string, string];
  readonly originImageAlt: string;
  readonly originTitle: string;
  readonly quote: string;
  readonly sharingBody: readonly [string, string];
  readonly sharingTitle: string;
  readonly stats: readonly (readonly [string, string])[];
}

export const gloxiniaStoryCopy: Record<Locale, GloxiniaStoryCopy> = {
  ru: {
    backToAbout: 'Вернуться к истории оранжереи',
    breadcrumb: 'История глоксиний',
    factsTitle: 'Немного цифр',
    gallery: [
      ['/gloxinia-story/07-speckled-bloom.webp', 'Две белые глоксинии с густым бордовым крапом', 'Крапчатые'],
      ['/gloxinia-story/08-purple-bloom.webp', 'Сиреневая и тёмно-фиолетовая глоксинии', 'Сиреневые'],
      ['/gloxinia-story/09-pink-bloom.webp', 'Три розовые глоксинии разных оттенков', 'Розовые'],
    ],
    heroBody: [
      'В феврале 2024 года я заказала на маркетплейсе пакет семян. В карточке обещали двадцать — взошло почти двести.',
      'То, что начиналось как маленький эксперимент, быстро заняло подоконники и стеллажи. Осенью появились первые бутоны — и каждый цветок оказался совершенно непохожим на соседний.',
    ],
    heroTitle: 'История моих глоксиний',
    journey: [
      {
        alt: 'Мелкие семена глоксинии на светлой поверхности',
        date: 'Февраль 2024',
        description: 'На упаковке было заявлено двадцать семян. На столе они казались почти пылью.',
        image: '/gloxinia-story/01-seeds.webp',
        title: 'Семена',
      },
      {
        alt: 'Первые массовые всходы глоксиний в контейнере',
        date: 'Конец февраля',
        description: 'Вместо нескольких зелёных точек появился целый ковёр маленьких бархатистых листьев.',
        fillsFrame: true,
        image: '/gloxinia-story/02-first-sprouts.webp',
        title: 'Первые всходы',
      },
      {
        alt: 'Подросшие молодые сеянцы глоксиний',
        date: 'Март 2024',
        description: 'Сеянцы росли так быстро, что стало ясно: их не двадцать, а примерно двести.',
        image: '/gloxinia-story/03-young-seedlings.webp',
        title: 'Лес из листьев',
      },
      {
        alt: 'Густо растущие молодые глоксинии перед пикировкой',
        date: 'Апрель 2024',
        description: 'Растениям стало тесно. Самые крепкие пришлось осторожно отделять друг от друга.',
        image: '/gloxinia-story/04-crowded-growth.webp',
        title: 'Время пикировки',
      },
      {
        alt: 'Молодые глоксинии после пересадки в отдельные горшки',
        date: 'Май — август',
        description: 'Свободные полки закончились. Глоксинии начали разъезжаться к знакомым и родным.',
        fillsFrame: true,
        image: '/gloxinia-story/05-individual-pots.webp',
        title: 'Новые дома',
      },
      {
        alt: 'Разноцветные глоксинии в первом осеннем цветении',
        date: 'Осень 2024',
        description: 'Розовые, сиреневые, фиолетовые и крапчатые — ни один цветок не повторял другой.',
        fillsFrame: true,
        image: '/gloxinia-story/06-first-bloom.webp',
        title: 'Первое цветение',
      },
    ],
    journeyTitle: 'Путь от семени до цветка',
    originBody: [
      'На маркетплейсе это был самый обычный пакет с обещанием двадцати семян. Я посеяла их без больших ожиданий и каждый день заглядывала в контейнер. Через короткое время вместо редких ростков там появился настоящий зелёный ковёр.',
      'Сначала радовало каждое новое растение. Потом стало понятно: места на всех не хватит. Выбросить крепкие живые сеянцы я не могла, поэтому началась большая раздача — знакомым, друзьям и маме. Так одна маленькая покупка превратилась в десятки домашних историй.',
    ],
    originImageAlt: 'Разноцветные глоксинии в первом осеннем цветении',
    originTitle: 'Как всё начиналось',
    quote: 'Самое красивое в этой истории — не двести всходов, а то, сколько домов они сделали немного зеленее.',
    sharingBody: [
      'Когда осенью раскрылись первые бутоны, стало понятно, зачем были нужны все эти пересадки, стаканчики и занятые подоконники. Из одинаковых крошечных семян выросли растения с совершенно разными характерами.',
      'Глоксинии уехали к близким ещё до цветения, поэтому их первые бутоны стали маленькими сюрпризами уже в новых домах. Для меня это и есть настоящая коллекция: не только хранить красоту у себя, но и делиться ею.',
    ],
    sharingTitle: 'Цветы, которыми хотелось делиться',
    stats: [
      ['20', 'семян было заявлено'],
      ['≈200', 'сеянцев взошло'],
      ['3 сезона', 'от посева до цветов'],
      ['Десятки', 'обрели новые дома'],
    ],
  },
  en: {
    backToAbout: 'Back to the greenhouse story',
    breadcrumb: 'The gloxinia story',
    factsTitle: 'A few numbers',
    gallery: [
      ['/gloxinia-story/07-speckled-bloom.webp', 'Two cream gloxinias densely speckled burgundy', 'Speckled'],
      ['/gloxinia-story/08-purple-bloom.webp', 'Lavender and deep-purple gloxinia flowers', 'Lavender'],
      ['/gloxinia-story/09-pink-bloom.webp', 'Three gloxinia flowers in different pink shades', 'Pink'],
    ],
    heroBody: [
      'In February 2024 I ordered a packet of seeds from an online marketplace. The listing promised twenty; almost two hundred sprouted.',
      'What began as a small experiment quickly occupied every windowsill and shelf. The first buds opened in autumn, and every flower looked completely different from the next.',
    ],
    heroTitle: 'The story of my gloxinias',
    journey: [
      {
        alt: 'Tiny gloxinia seeds scattered on a pale surface',
        date: 'February 2024',
        description: 'The packet promised twenty seeds. On the table they looked almost like dust.',
        image: '/gloxinia-story/01-seeds.webp',
        title: 'Seeds',
      },
      {
        alt: 'The first mass of gloxinia seedlings in a container',
        date: 'Late February',
        description: 'Instead of a few green dots, a carpet of tiny velvety leaves appeared.',
        fillsFrame: true,
        image: '/gloxinia-story/02-first-sprouts.webp',
        title: 'First sprouts',
      },
      {
        alt: 'Young gloxinia seedlings growing larger',
        date: 'March 2024',
        description: 'They grew so quickly that it became clear there were not twenty, but nearly two hundred.',
        image: '/gloxinia-story/03-young-seedlings.webp',
        title: 'A forest of leaves',
      },
      {
        alt: 'Crowded young gloxinias before separating',
        date: 'April 2024',
        description: 'The plants ran out of room. The strongest had to be separated with great care.',
        image: '/gloxinia-story/04-crowded-growth.webp',
        title: 'Time to separate',
      },
      {
        alt: 'Young gloxinias transplanted into individual pots',
        date: 'May — August',
        description: 'The empty shelves disappeared. Gloxinias began moving to friends and family.',
        fillsFrame: true,
        image: '/gloxinia-story/05-individual-pots.webp',
        title: 'New homes',
      },
      {
        alt: 'Colourful gloxinias in their first autumn bloom',
        date: 'Autumn 2024',
        description: 'Pink, lavender, purple and speckled — no two flowers looked alike.',
        fillsFrame: true,
        image: '/gloxinia-story/06-first-bloom.webp',
        title: 'First flowers',
      },
    ],
    journeyTitle: 'From seed to flower',
    originBody: [
      'On the marketplace it was an ordinary packet promising twenty seeds. I sowed them without great expectations and checked the container every day. Before long, a green carpet appeared instead of a few scattered sprouts.',
      'At first every new plant was a delight. Then it became obvious there would never be enough room. I could not throw away strong living seedlings, so the great giveaway began — to friends, acquaintances and my mother. One small purchase became dozens of home stories.',
    ],
    originImageAlt: 'Colourful gloxinias in their first autumn bloom',
    originTitle: 'How it began',
    quote: 'The loveliest part of this story is not two hundred seedlings, but how many homes became a little greener.',
    sharingBody: [
      'When the first buds opened in autumn, every transplant, cup and occupied windowsill suddenly made sense. Identical tiny seeds had grown into plants with completely different personalities.',
      'Many gloxinias moved to loved ones before flowering, so their first buds became surprises in new homes. To me, that is what a collection should be: not only keeping beauty, but sharing it.',
    ],
    sharingTitle: 'Flowers made for sharing',
    stats: [
      ['20', 'seeds advertised'],
      ['≈200', 'seedlings emerged'],
      ['3 seasons', 'from sowing to bloom'],
      ['Dozens', 'found new homes'],
    ],
  },
};
