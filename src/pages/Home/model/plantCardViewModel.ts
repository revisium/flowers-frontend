import {
  categoryLabels,
  plants,
  type Locale,
  type Plant,
  type PlantCategory,
} from './homeModel';

interface LocalizedText {
  readonly ru: string;
  readonly en: string;
}

interface CareSection {
  readonly title: LocalizedText;
  readonly body: LocalizedText;
}

interface ProblemRow {
  readonly problem: LocalizedText;
  readonly reason: LocalizedText;
  readonly solution: LocalizedText;
}

interface PlantCardContent {
  readonly origin: LocalizedText;
  readonly family: LocalizedText;
  readonly description: LocalizedText;
  readonly difficulty: number;
  readonly care: readonly CareSection[];
  readonly problems: readonly ProblemRow[];
  readonly facts: readonly LocalizedText[];
}

export interface PlantCardViewModel {
  readonly id: string;
  readonly name: string;
  readonly latinName: string;
  readonly image: string;
  readonly category: string;
  readonly family: string;
  readonly origin: string;
  readonly description: string;
  readonly difficulty: number;
  readonly care: readonly {
    readonly title: string;
    readonly body: string;
  }[];
  readonly problems: readonly {
    readonly problem: string;
    readonly reason: string;
    readonly solution: string;
  }[];
  readonly facts: readonly string[];
}

const fallbackContent: PlantCardContent = {
  origin: {
    ru: 'Домашняя коллекция',
    en: 'Home collection',
  },
  family: {
    ru: 'Комнатные растения',
    en: 'Houseplants',
  },
  description: {
    ru: 'Любит стабильный уход, рассеянный свет и спокойное место без резких перепадов.',
    en: 'Enjoys steady care, soft light, and a calm place without sharp changes.',
  },
  difficulty: 3,
  care: [
    {
      title: { ru: 'Освещение', en: 'Light' },
      body: { ru: 'Яркий рассеянный свет без прямого полуденного солнца.', en: 'Bright filtered light without harsh midday sun.' },
    },
    {
      title: { ru: 'Полив', en: 'Watering' },
      body: { ru: 'Поливать после подсыхания верхнего слоя грунта.', en: 'Water after the top soil layer dries.' },
    },
    {
      title: { ru: 'Грунт и пересадка', en: 'Soil and repotting' },
      body: { ru: 'Легкий воздухопроницаемый грунт и дренажный слой в горшке.', en: 'Light breathable soil with a drainage layer in the pot.' },
    },
    {
      title: { ru: 'Подкормки', en: 'Feeding' },
      body: { ru: 'С весны до осени раз в 2-4 недели слабым раствором удобрения.', en: 'Feed lightly every 2-4 weeks from spring to autumn.' },
    },
  ],
  problems: [
    {
      problem: { ru: 'Листья теряют тонус', en: 'Leaves lose firmness' },
      reason: { ru: 'Нерегулярный полив', en: 'Irregular watering' },
      solution: { ru: 'Проверить грунт и выровнять режим ухода.', en: 'Check the soil and steady the care rhythm.' },
    },
  ],
  facts: [
    {
      ru: 'Растение лучше раскрывается, когда его место в комнате не меняют слишком часто.',
      en: 'The plant settles better when its place in the room is not changed too often.',
    },
  ],
};

const plantCardContent: Record<Plant['id'], PlantCardContent> = {
  'trd-zbr': {
    ...fallbackContent,
    origin: { ru: 'Центральная Америка', en: 'Central America' },
    family: { ru: 'Коммелиновые', en: 'Commelinaceae' },
    description: {
      ru: 'Быстрорастущая ампельная традесканция с полосатыми листьями и длинными свисающими побегами.',
      en: 'A fast-growing trailing tradescantia with striped leaves and long cascading stems.',
    },
    difficulty: 2,
    care: [
      {
        title: { ru: 'Освещение', en: 'Light' },
        body: { ru: 'Яркий рассеянный свет сохраняет контрастную окраску листьев.', en: 'Bright filtered light keeps the leaf color vivid.' },
      },
      {
        title: { ru: 'Полив', en: 'Watering' },
        body: { ru: 'Умеренный, после подсыхания верхних 2 см грунта.', en: 'Moderate, after the top 2 cm of soil dries.' },
      },
      {
        title: { ru: 'Уход и развитие', en: 'Care and growth' },
        body: { ru: 'Побеги можно прищипывать, чтобы куст оставался пышным.', en: 'Pinch stems to keep the plant full and lush.' },
      },
      {
        title: { ru: 'Пересадка', en: 'Repotting' },
        body: { ru: 'Легкий универсальный грунт, обновление горшка по мере разрастания.', en: 'Light all-purpose soil, repot as the plant fills the pot.' },
      },
    ],
    problems: [
      {
        problem: { ru: 'Побеги вытягиваются', en: 'Stems stretch' },
        reason: { ru: 'Мало света', en: 'Too little light' },
        solution: { ru: 'Переставить ближе к яркому окну.', en: 'Move closer to a brighter window.' },
      },
      {
        problem: { ru: 'Бледнеет окраска', en: 'Color fades' },
        reason: { ru: 'Недостаток света или питания', en: 'Low light or nutrition' },
        solution: { ru: 'Добавить света и мягкую подкормку в сезон роста.', en: 'Add light and gentle feeding in the growing season.' },
      },
    ],
    facts: [
      {
        ru: 'Традесканция легко укореняется черенками прямо в воде.',
        en: 'Tradescantia roots easily from cuttings in water.',
      },
      {
        ru: 'На полке она особенно красиво работает как живой каскад.',
        en: 'On a shelf it reads especially well as a living cascade.',
      },
    ],
  },
  'mon-del': {
    ...fallbackContent,
    origin: { ru: 'Центральная и Южная Америка', en: 'Central and South America' },
    family: { ru: 'Ароидные', en: 'Araceae' },
    description: {
      ru: 'Крупная лиана с резными листьями. Хорошо чувствует себя рядом с опорой и влажным воздухом.',
      en: 'A large climbing aroid with split leaves. It thrives with support and humid air.',
    },
    difficulty: 3,
    care: [
      {
        title: { ru: 'Освещение', en: 'Light' },
        body: { ru: 'Яркий рассеянный свет; в полутени растет медленнее.', en: 'Bright filtered light; slower growth in partial shade.' },
      },
      {
        title: { ru: 'Влажность воздуха', en: 'Humidity' },
        body: { ru: 'Любит повышенную влажность и протирание листьев.', en: 'Enjoys higher humidity and clean leaves.' },
      },
      {
        title: { ru: 'Грунт', en: 'Soil' },
        body: { ru: 'Воздушная смесь с корой, перлитом и дренажом.', en: 'Chunky mix with bark, perlite, and drainage.' },
      },
      {
        title: { ru: 'Опора', en: 'Support' },
        body: { ru: 'Для крупных листьев нужна опора или моховая палка.', en: 'Large leaves need a support or moss pole.' },
      },
    ],
    problems: [
      {
        problem: { ru: 'Мало отверстий на листьях', en: 'Few leaf splits' },
        reason: { ru: 'Недостаток света или молодое растение', en: 'Low light or young plant' },
        solution: { ru: 'Дать больше рассеянного света и время на рост.', en: 'Give it brighter filtered light and time.' },
      },
      {
        problem: { ru: 'Коричневые кончики', en: 'Brown tips' },
        reason: { ru: 'Сухой воздух или пересушка', en: 'Dry air or underwatering' },
        solution: { ru: 'Повысить влажность и проверить режим полива.', en: 'Raise humidity and check watering rhythm.' },
      },
    ],
    facts: [
      {
        ru: 'Отверстия в листьях помогают монстере выдерживать сильный дождь и ветер в природе.',
        en: 'Leaf splits help monstera handle heavy rain and wind in nature.',
      },
      {
        ru: 'Чем старше растение и лучше условия, тем выразительнее листовая пластина.',
        en: 'The older the plant and the better the conditions, the more dramatic the leaves.',
      },
    ],
  },
  'chl-com': {
    ...fallbackContent,
    origin: { ru: 'Южная Африка', en: 'South Africa' },
    family: { ru: 'Спаржевые', en: 'Asparagaceae' },
    description: {
      ru: 'Неприхотливый хлорофитум с фонтаном узких листьев. Хорошо подходит для подоконника.',
      en: 'An easy spider plant with fountain-like leaves, well suited to a windowsill.',
    },
    difficulty: 1,
    care: [
      {
        title: { ru: 'Освещение', en: 'Light' },
        body: { ru: 'Яркий рассеянный свет, легкая полутень допустима.', en: 'Bright filtered light; light shade is acceptable.' },
      },
      {
        title: { ru: 'Полив', en: 'Watering' },
        body: { ru: 'Умеренный, летом чаще, зимой после подсыхания грунта.', en: 'Moderate, more often in summer and after drying in winter.' },
      },
      {
        title: { ru: 'Рост', en: 'Growth' },
        body: { ru: 'Быстро наращивает розетку и детки на длинных усах.', en: 'Quickly grows a rosette and baby plants on long runners.' },
      },
      {
        title: { ru: 'Подкормки', en: 'Feeding' },
        body: { ru: 'Весной и летом раз в 2-3 недели слабым удобрением.', en: 'Feed lightly every 2-3 weeks in spring and summer.' },
      },
    ],
    problems: [
      {
        problem: { ru: 'Кончики сохнут', en: 'Dry tips' },
        reason: { ru: 'Сухой воздух или соли в воде', en: 'Dry air or mineral-heavy water' },
        solution: { ru: 'Поливать мягкой водой и не пересушивать.', en: 'Use softer water and avoid full drying.' },
      },
      {
        problem: { ru: 'Листья бледнеют', en: 'Leaves pale' },
        reason: { ru: 'Мало света', en: 'Low light' },
        solution: { ru: 'Поставить ближе к рассеянному свету.', en: 'Move closer to filtered light.' },
      },
    ],
    facts: [
      {
        ru: 'Хлорофитум легко прощает ошибки и быстро восстанавливается.',
        en: 'Spider plant forgives mistakes and recovers quickly.',
      },
    ],
  },
  'glo-vel': {
    ...fallbackContent,
    origin: { ru: 'Бразилия', en: 'Brazil' },
    family: { ru: 'Геснериевые', en: 'Gesneriaceae' },
    description: {
      ru: 'Компактная цветущая глоксиния с бархатными листьями и крупными колокольчатыми цветами.',
      en: 'A compact flowering gloxinia with velvety leaves and large bell-shaped blooms.',
    },
    difficulty: 3,
    care: [
      {
        title: { ru: 'Освещение', en: 'Light' },
        body: { ru: 'Много мягкого света без прямого солнца на листья.', en: 'Plenty of soft light without direct sun on leaves.' },
      },
      {
        title: { ru: 'Полив', en: 'Watering' },
        body: { ru: 'Аккуратно по краю горшка, не мочить листья и цветы.', en: 'Water carefully at the pot edge, avoiding leaves and flowers.' },
      },
      {
        title: { ru: 'Покой', en: 'Dormancy' },
        body: { ru: 'После цветения клубень может уходить на период отдыха.', en: 'After flowering the tuber may enter a rest period.' },
      },
      {
        title: { ru: 'Температура', en: 'Temperature' },
        body: { ru: 'Тепло без сквозняков и резких перепадов.', en: 'Warmth without drafts or sharp changes.' },
      },
    ],
    problems: [
      {
        problem: { ru: 'Пятна на листьях', en: 'Leaf spots' },
        reason: { ru: 'Вода на бархатных листьях', en: 'Water on velvety leaves' },
        solution: { ru: 'Поливать снизу или по краю горшка.', en: 'Bottom-water or water at the pot edge.' },
      },
    ],
    facts: [
      {
        ru: 'Глоксинии часто выращивают как сезонное цветущее украшение подоконника.',
        en: 'Gloxinias are often grown as seasonal blooming windowsill accents.',
      },
    ],
  },
  'pha-whi': {
    ...fallbackContent,
    origin: { ru: 'Юго-Восточная Азия', en: 'Southeast Asia' },
    family: { ru: 'Орхидные', en: 'Orchidaceae' },
    description: {
      ru: 'Фаленопсис с воздушными корнями и длинной дугой цветов. Любит свет и аккуратный полив.',
      en: 'A phalaenopsis with aerial roots and an arching spray of blooms. It likes light and careful watering.',
    },
    difficulty: 3,
    care: [
      {
        title: { ru: 'Освещение', en: 'Light' },
        body: { ru: 'Яркий рассеянный свет, восточное или западное окно.', en: 'Bright filtered light, east or west window.' },
      },
      {
        title: { ru: 'Полив', en: 'Watering' },
        body: { ru: 'После посветления корней, без застоя воды в кашпо.', en: 'Water when roots turn silvery, never leaving water in the cachepot.' },
      },
      {
        title: { ru: 'Субстрат', en: 'Substrate' },
        body: { ru: 'Кора для орхидей, прозрачный горшок и свободный воздух у корней.', en: 'Orchid bark, a clear pot, and airflow around roots.' },
      },
      {
        title: { ru: 'Цветение', en: 'Blooming' },
        body: { ru: 'После цветения цветонос можно оставить, если он зеленый.', en: 'After blooming, keep the spike if it remains green.' },
      },
    ],
    problems: [
      {
        problem: { ru: 'Корни темнеют', en: 'Roots darken' },
        reason: { ru: 'Застой воды', en: 'Standing water' },
        solution: { ru: 'Просушить субстрат и проверить дренаж.', en: 'Dry the substrate and check drainage.' },
      },
    ],
    facts: [
      {
        ru: 'Фаленопсисы в природе растут не в земле, а закрепляются корнями на деревьях.',
        en: 'In nature phalaenopsis orchids attach to trees rather than growing in soil.',
      },
    ],
  },
};

function localize(text: LocalizedText, locale: Locale) {
  return text[locale];
}

function getPlantName(plant: Plant, locale: Locale) {
  return locale === 'ru' ? plant.name : plant.nameEn;
}

export function getPlantById(plantId: string) {
  return plants.find((plant) => plant.id === plantId);
}

export function createPlantCardViewModel(
  plantId: string | null,
  locale: Locale,
): PlantCardViewModel | null {
  if (!plantId) {
    return null;
  }

  const plant = getPlantById(plantId);

  if (!plant) {
    return null;
  }

  const content = plantCardContent[plant.id] ?? fallbackContent;

  return {
    id: plant.id,
    category: categoryLabels[locale][plant.category as PlantCategory],
    care: content.care.map((section) => ({
      body: localize(section.body, locale),
      title: localize(section.title, locale),
    })),
    description: localize(content.description, locale),
    difficulty: content.difficulty,
    facts: content.facts.map((fact) => localize(fact, locale)),
    family: localize(content.family, locale),
    image: plant.image,
    latinName: plant.latinName,
    name: getPlantName(plant, locale),
    origin: localize(content.origin, locale),
    problems: content.problems.map((row) => ({
      problem: localize(row.problem, locale),
      reason: localize(row.reason, locale),
      solution: localize(row.solution, locale),
    })),
  };
}
