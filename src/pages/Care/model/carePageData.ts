import type { Locale } from 'src/shared/config';

export interface CareGuide {
  readonly accent: string;
  readonly eyebrow: string;
  readonly id: string;
  readonly image: string;
  readonly imagePosition?: string;
  readonly summary: string;
  readonly tips: readonly string[];
  readonly title: string;
}

interface CareRoutineItem {
  readonly label: string;
  readonly text: string;
}

export interface CareCopy {
  readonly backLabel: string;
  readonly guides: readonly CareGuide[];
  readonly guidesEyebrow: string;
  readonly guidesIntro: string;
  readonly guidesTitle: string;
  readonly heroEyebrow: string;
  readonly heroSummary: string;
  readonly heroTitle: string;
  readonly routine: {
    readonly eyebrow: string;
    readonly items: readonly CareRoutineItem[];
    readonly title: string;
  };
  readonly season: {
    readonly eyebrow: string;
    readonly text: string;
    readonly title: string;
  };
}

type Localized<T> = Readonly<Record<Locale, T>>;

interface CareGuideDefinition extends Omit<CareGuide, 'eyebrow' | 'summary' | 'tips' | 'title'> {
  readonly eyebrow: Localized<string>;
  readonly summary: Localized<string>;
  readonly tips: Localized<readonly string[]>;
  readonly title: Localized<string>;
}

interface CareRoutineItemDefinition extends Omit<CareRoutineItem, 'text'> {
  readonly text: Localized<string>;
}

const localized = <T>(en: T, ru: T): Localized<T> => ({ en, ru });

const guideDefinitions: readonly CareGuideDefinition[] = [
  {
    accent: '#8a9b69',
    eyebrow: localized('Water · 2 minutes', 'Полив · 2 минуты'),
    id: 'watering',
    image: '/care/care-watering.jpg',
    summary: localized(
      'Check the potting mix first, and only then reach for the watering can.',
      'Сначала проверьте грунт, и только потом беритесь за лейку.',
    ),
    tips: localized(
      [
        'Feel the soil 2–3 cm deep',
        'Water slowly around the pot',
        'Empty any water from the saucer',
      ],
      ['Погрузите палец на 2–3 см', 'Поливайте медленно по кругу', 'Слейте воду из поддона'],
    ),
    title: localized('Water without overwatering', 'Полив без перелива'),
  },
  {
    accent: '#c8a96a',
    eyebrow: localized('Light · every day', 'Свет · каждый день'),
    id: 'light',
    image: '/care/care-light.jpg',
    summary: localized(
      'Most houseplants thrive in plenty of bright, indirect light.',
      'Большинству комнатных растений подходит яркий рассеянный свет.',
    ),
    tips: localized(
      [
        'Notice the shadow cast by a leaf',
        'Rotate the pot once a week',
        'Move the plant away from hot glass',
      ],
      [
        'Наблюдайте за тенью от листа',
        'Поворачивайте горшок раз в неделю',
        'Отодвиньте растение от жаркого стекла',
      ],
    ),
    title: localized('Find gentle light', 'Найдите мягкий свет'),
  },
  {
    accent: '#ad7755',
    eyebrow: localized('Repot · when needed', 'Пересадка · по сигналу'),
    id: 'repotting',
    image: '/care/care-repotting.jpg',
    imagePosition: 'center 58%',
    summary: localized(
      'A new pot is useful when the roots have truly run out of room.',
      'Новый горшок нужен, когда корням действительно стало тесно.',
    ),
    tips: localized(
      [
        'Choose a pot 2–4 cm wider',
        'Keep the healthy root ball intact',
        'Let the plant rest afterwards',
      ],
      [
        'Выберите горшок на 2–4 см шире',
        'Сохраните здоровый корневой ком',
        'После пересадки дайте растению покой',
      ],
    ),
    title: localized('Repot with care', 'Пересаживайте бережно'),
  },
];

const routineItemDefinitions: readonly CareRoutineItemDefinition[] = [
  {
    label: '01',
    text: localized(
      'Feel the soil and note which plants need water.',
      'Потрогайте грунт и отметьте, кому нужен полив.',
    ),
  },
  {
    label: '02',
    text: localized(
      'Inspect both sides of the leaves and growing points.',
      'Осмотрите обе стороны листьев и точки роста.',
    ),
  },
  {
    label: '03',
    text: localized(
      'Remove dry leaves and gently wipe away dust.',
      'Уберите сухие листья и мягкой тканью снимите пыль.',
    ),
  },
  {
    label: '04',
    text: localized(
      'Turn the pots so the other side faces the light.',
      'Поверните горшки к свету другой стороной.',
    ),
  },
];

const pageDefinition = {
  backLabel: localized('Back to the greenhouse', 'Вернуться в оранжерею'),
  guidesEyebrow: localized('Care essentials', 'База ухода'),
  guidesIntro: localized(
    'You do not need a rigid calendar. Check the conditions, notice changes and follow the plant’s signals.',
    'Не нужен строгий календарь. Проверяйте условия, замечайте изменения и действуйте по сигналам растения.',
  ),
  guidesTitle: localized('Three habits for healthy growth', 'Три привычки для здорового роста'),
  heroEyebrow: localized('Gentle care · no unnecessary fuss', 'Бережный уход · без лишней суеты'),
  heroSummary: localized(
    'Simple cues for watering, light and repotting that help you build a calm care rhythm.',
    'Простые ориентиры для полива, света и пересадки, которые помогают выстроить спокойный ритм ухода.',
  ),
  heroTitle: localized(
    'Watch your plant — it will tell you what it needs',
    'Наблюдайте за растением — оно подскажет, что ему нужно',
  ),
  routineEyebrow: localized('A ten-minute ritual', 'Ритуал на 10 минут'),
  routineTitle: localized('The Sunday greenhouse round', 'Воскресный обход оранжереи'),
  seasonEyebrow: localized('Seasonal note', 'Сезонная заметка'),
  seasonText: localized(
    'Check the soil more often, but do not water automatically. Shield leaves from midday sun and air the room without a cold draft.',
    'Проверяйте грунт чаще, но не поливайте автоматически. В жару защищайте листья от полуденного солнца и проветривайте без холодного сквозняка.',
  ),
  seasonTitle: localized('Moisture disappears faster in summer', 'Летом влага уходит быстрее'),
};

const createCareGuide = (definition: CareGuideDefinition, locale: Locale): CareGuide => ({
  accent: definition.accent,
  eyebrow: definition.eyebrow[locale],
  id: definition.id,
  image: definition.image,
  imagePosition: definition.imagePosition,
  summary: definition.summary[locale],
  tips: definition.tips[locale],
  title: definition.title[locale],
});

const createCareCopy = (locale: Locale): CareCopy => ({
  backLabel: pageDefinition.backLabel[locale],
  guides: guideDefinitions.map((definition) => createCareGuide(definition, locale)),
  guidesEyebrow: pageDefinition.guidesEyebrow[locale],
  guidesIntro: pageDefinition.guidesIntro[locale],
  guidesTitle: pageDefinition.guidesTitle[locale],
  heroEyebrow: pageDefinition.heroEyebrow[locale],
  heroSummary: pageDefinition.heroSummary[locale],
  heroTitle: pageDefinition.heroTitle[locale],
  routine: {
    eyebrow: pageDefinition.routineEyebrow[locale],
    items: routineItemDefinitions.map(({ label, text }) => ({ label, text: text[locale] })),
    title: pageDefinition.routineTitle[locale],
  },
  season: {
    eyebrow: pageDefinition.seasonEyebrow[locale],
    text: pageDefinition.seasonText[locale],
    title: pageDefinition.seasonTitle[locale],
  },
});

export const careCopy: Record<Locale, CareCopy> = {
  en: createCareCopy('en'),
  ru: createCareCopy('ru'),
};
