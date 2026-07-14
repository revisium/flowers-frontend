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
    readonly items: readonly { readonly label: string; readonly text: string }[];
    readonly title: string;
  };
  readonly season: {
    readonly eyebrow: string;
    readonly text: string;
    readonly title: string;
  };
}

export const careCopy: Record<Locale, CareCopy> = {
  ru: {
    backLabel: 'Вернуться в оранжерею',
    heroEyebrow: 'Бережный уход · без лишней суеты',
    heroTitle: 'Наблюдайте за растением — оно подскажет, что ему нужно',
    heroSummary:
      'Простые ориентиры для полива, света и пересадки, которые помогают выстроить спокойный ритм ухода.',
    guidesEyebrow: 'База ухода',
    guidesTitle: 'Три привычки для здорового роста',
    guidesIntro:
      'Не нужен строгий календарь. Проверяйте условия, замечайте изменения и действуйте по сигналам растения.',
    guides: [
      {
        accent: '#8a9b69',
        eyebrow: 'Полив · 2 минуты',
        id: 'watering',
        image: '/care/care-watering.jpg',
        summary: 'Сначала проверьте грунт, и только потом беритесь за лейку.',
        tips: [
          'Погрузите палец на 2–3 см',
          'Поливайте медленно по кругу',
          'Слейте воду из поддона',
        ],
        title: 'Полив без перелива',
      },
      {
        accent: '#c8a96a',
        eyebrow: 'Свет · каждый день',
        id: 'light',
        image: '/care/care-light.jpg',
        summary: 'Большинству комнатных растений подходит яркий рассеянный свет.',
        tips: [
          'Наблюдайте за тенью от листа',
          'Поворачивайте горшок раз в неделю',
          'Отодвиньте растение от жаркого стекла',
        ],
        title: 'Найдите мягкий свет',
      },
      {
        accent: '#ad7755',
        eyebrow: 'Пересадка · по сигналу',
        id: 'repotting',
        image: '/care/care-repotting.jpg',
        imagePosition: 'center 58%',
        summary: 'Новый горшок нужен, когда корням действительно стало тесно.',
        tips: [
          'Выберите горшок на 2–4 см шире',
          'Сохраните здоровый корневой ком',
          'После пересадки дайте растению покой',
        ],
        title: 'Пересаживайте бережно',
      },
    ],
    routine: {
      eyebrow: 'Ритуал на 10 минут',
      title: 'Воскресный обход оранжереи',
      items: [
        { label: '01', text: 'Потрогайте грунт и отметьте, кому нужен полив.' },
        { label: '02', text: 'Осмотрите обе стороны листьев и точки роста.' },
        { label: '03', text: 'Уберите сухие листья и мягкой тканью снимите пыль.' },
        { label: '04', text: 'Поверните горшки к свету другой стороной.' },
      ],
    },
    season: {
      eyebrow: 'Сезонная заметка',
      title: 'Летом влага уходит быстрее',
      text: 'Проверяйте грунт чаще, но не поливайте автоматически. В жару защищайте листья от полуденного солнца и проветривайте без холодного сквозняка.',
    },
  },
  en: {
    backLabel: 'Back to the greenhouse',
    heroEyebrow: 'Gentle care · no unnecessary fuss',
    heroTitle: 'Watch your plant — it will tell you what it needs',
    heroSummary:
      'Simple cues for watering, light and repotting that help you build a calm care rhythm.',
    guidesEyebrow: 'Care essentials',
    guidesTitle: 'Three habits for healthy growth',
    guidesIntro:
      'You do not need a rigid calendar. Check the conditions, notice changes and follow the plant’s signals.',
    guides: [
      {
        accent: '#8a9b69',
        eyebrow: 'Water · 2 minutes',
        id: 'watering',
        image: '/care/care-watering.jpg',
        summary: 'Check the potting mix first, and only then reach for the watering can.',
        tips: [
          'Feel the soil 2–3 cm deep',
          'Water slowly around the pot',
          'Empty any water from the saucer',
        ],
        title: 'Water without overwatering',
      },
      {
        accent: '#c8a96a',
        eyebrow: 'Light · every day',
        id: 'light',
        image: '/care/care-light.jpg',
        summary: 'Most houseplants thrive in plenty of bright, indirect light.',
        tips: [
          'Notice the shadow cast by a leaf',
          'Rotate the pot once a week',
          'Move the plant away from hot glass',
        ],
        title: 'Find gentle light',
      },
      {
        accent: '#ad7755',
        eyebrow: 'Repot · when needed',
        id: 'repotting',
        image: '/care/care-repotting.jpg',
        imagePosition: 'center 58%',
        summary: 'A new pot is useful when the roots have truly run out of room.',
        tips: [
          'Choose a pot 2–4 cm wider',
          'Keep the healthy root ball intact',
          'Let the plant rest afterwards',
        ],
        title: 'Repot with care',
      },
    ],
    routine: {
      eyebrow: 'A ten-minute ritual',
      title: 'The Sunday greenhouse round',
      items: [
        { label: '01', text: 'Feel the soil and note which plants need water.' },
        { label: '02', text: 'Inspect both sides of the leaves and growing points.' },
        { label: '03', text: 'Remove dry leaves and gently wipe away dust.' },
        { label: '04', text: 'Turn the pots so the other side faces the light.' },
      ],
    },
    season: {
      eyebrow: 'Seasonal note',
      title: 'Moisture disappears faster in summer',
      text: 'Check the soil more often, but do not water automatically. Shield leaves from midday sun and air the room without a cold draft.',
    },
  },
};
