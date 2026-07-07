import {
  categoryLabels,
  plants,
  type Locale,
  type Plant,
  type PlantCategory,
} from './homeModel';
import { getPlantName } from './plantName';

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

interface PlantCardContentOptions {
  readonly origin?: LocalizedText;
  readonly family?: LocalizedText;
  readonly description?: LocalizedText;
  readonly difficulty?: number;
  readonly care?: readonly CareSection[];
  readonly problems?: readonly ProblemRow[];
  readonly facts?: readonly LocalizedText[];
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

const localized = (ru: string, en: string): LocalizedText => ({ en, ru });

const careSection = (
  titleRu: string,
  titleEn: string,
  bodyRu: string,
  bodyEn: string,
): CareSection => ({
  body: localized(bodyRu, bodyEn),
  title: localized(titleRu, titleEn),
});

const problemRow = (
  problemRu: string,
  problemEn: string,
  reasonRu: string,
  reasonEn: string,
  solutionRu: string,
  solutionEn: string,
): ProblemRow => ({
  problem: localized(problemRu, problemEn),
  reason: localized(reasonRu, reasonEn),
  solution: localized(solutionRu, solutionEn),
});

const factList = (...facts: readonly (readonly [string, string])[]) =>
  facts.map(([ru, en]) => localized(ru, en));

const fallbackContent: PlantCardContent = {
  origin: localized('Домашняя коллекция', 'Home collection'),
  family: localized('Комнатные растения', 'Houseplants'),
  description: localized(
    'Любит стабильный уход, рассеянный свет и спокойное место без резких перепадов.',
    'Enjoys steady care, soft light, and a calm place without sharp changes.',
  ),
  difficulty: 3,
  care: [
    careSection(
      'Освещение',
      'Light',
      'Яркий рассеянный свет без прямого полуденного солнца.',
      'Bright filtered light without harsh midday sun.',
    ),
    careSection(
      'Полив',
      'Watering',
      'Поливать после подсыхания верхнего слоя грунта.',
      'Water after the top soil layer dries.',
    ),
    careSection(
      'Грунт и пересадка',
      'Soil and repotting',
      'Легкий воздухопроницаемый грунт и дренажный слой в горшке.',
      'Light breathable soil with a drainage layer in the pot.',
    ),
    careSection(
      'Подкормки',
      'Feeding',
      'С весны до осени раз в 2-4 недели слабым раствором удобрения.',
      'Feed lightly every 2-4 weeks from spring to autumn.',
    ),
  ],
  problems: [
    problemRow(
      'Листья теряют тонус',
      'Leaves lose firmness',
      'Нерегулярный полив',
      'Irregular watering',
      'Проверить грунт и выровнять режим ухода.',
      'Check the soil and steady the care rhythm.',
    ),
  ],
  facts: factList([
    'Растение лучше раскрывается, когда его место в комнате не меняют слишком часто.',
    'The plant settles better when its place in the room is not changed too often.',
  ]),
};

const plantContent = (options: PlantCardContentOptions): PlantCardContent => ({
  care: options.care ?? fallbackContent.care,
  description: options.description ?? fallbackContent.description,
  difficulty: options.difficulty ?? fallbackContent.difficulty,
  facts: options.facts ?? fallbackContent.facts,
  family: options.family ?? fallbackContent.family,
  origin: options.origin ?? fallbackContent.origin,
  problems: options.problems ?? fallbackContent.problems,
});

const plantContentEntry = (
  id: Plant['id'],
  options: PlantCardContentOptions,
): readonly [Plant['id'], PlantCardContent] => [id, plantContent(options)];

const plantCardContent = Object.fromEntries([
  plantContentEntry('trd-zbr', {
    origin: localized('Центральная Америка', 'Central America'),
    family: localized('Коммелиновые', 'Commelinaceae'),
    description: localized(
      'Быстрорастущая ампельная традесканция с полосатыми листьями и длинными свисающими побегами.',
      'A fast-growing trailing tradescantia with striped leaves and long cascading stems.',
    ),
    difficulty: 2,
    care: [
      careSection(
        'Освещение',
        'Light',
        'Яркий рассеянный свет сохраняет контрастную окраску листьев.',
        'Bright filtered light keeps the leaf color vivid.',
      ),
      careSection(
        'Полив',
        'Watering',
        'Умеренный, после подсыхания верхних 2 см грунта.',
        'Moderate, after the top 2 cm of soil dries.',
      ),
      careSection(
        'Уход и развитие',
        'Care and growth',
        'Побеги можно прищипывать, чтобы куст оставался пышным.',
        'Pinch stems to keep the plant full and lush.',
      ),
      careSection(
        'Пересадка',
        'Repotting',
        'Легкий универсальный грунт, обновление горшка по мере разрастания.',
        'Light all-purpose soil, repot as the plant fills the pot.',
      ),
    ],
    problems: [
      problemRow(
        'Побеги вытягиваются',
        'Stems stretch',
        'Мало света',
        'Too little light',
        'Переставить ближе к яркому окну.',
        'Move closer to a brighter window.',
      ),
      problemRow(
        'Бледнеет окраска',
        'Color fades',
        'Недостаток света или питания',
        'Low light or nutrition',
        'Добавить света и мягкую подкормку в сезон роста.',
        'Add light and gentle feeding in the growing season.',
      ),
    ],
    facts: factList(
      ['Традесканция легко укореняется черенками прямо в воде.', 'Tradescantia roots easily from cuttings in water.'],
      ['На полке она особенно красиво работает как живой каскад.', 'On a shelf it reads especially well as a living cascade.'],
    ),
  }),
  plantContentEntry('mon-del', {
    origin: localized('Центральная и Южная Америка', 'Central and South America'),
    family: localized('Ароидные', 'Araceae'),
    description: localized(
      'Крупная лиана с резными листьями. Хорошо чувствует себя рядом с опорой и влажным воздухом.',
      'A large climbing aroid with split leaves. It thrives with support and humid air.',
    ),
    difficulty: 3,
    care: [
      careSection('Освещение', 'Light', 'Яркий рассеянный свет; в полутени растет медленнее.', 'Bright filtered light; slower growth in partial shade.'),
      careSection('Влажность воздуха', 'Humidity', 'Любит повышенную влажность и протирание листьев.', 'Enjoys higher humidity and clean leaves.'),
      careSection('Грунт', 'Soil', 'Воздушная смесь с корой, перлитом и дренажом.', 'Chunky mix with bark, perlite, and drainage.'),
      careSection('Опора', 'Support', 'Для крупных листьев нужна опора или моховая палка.', 'Large leaves need a support or moss pole.'),
    ],
    problems: [
      problemRow('Мало отверстий на листьях', 'Few leaf splits', 'Недостаток света или молодое растение', 'Low light or young plant', 'Дать больше рассеянного света и время на рост.', 'Give it brighter filtered light and time.'),
      problemRow('Коричневые кончики', 'Brown tips', 'Сухой воздух или пересушка', 'Dry air or underwatering', 'Повысить влажность и проверить режим полива.', 'Raise humidity and check watering rhythm.'),
    ],
    facts: factList(
      ['Отверстия в листьях помогают монстере выдерживать сильный дождь и ветер в природе.', 'Leaf splits help monstera handle heavy rain and wind in nature.'],
      ['Чем старше растение и лучше условия, тем выразительнее листовая пластина.', 'The older the plant and the better the conditions, the more dramatic the leaves.'],
    ),
  }),
  plantContentEntry('chl-com', {
    origin: localized('Южная Африка', 'South Africa'),
    family: localized('Спаржевые', 'Asparagaceae'),
    description: localized(
      'Неприхотливый хлорофитум с фонтаном узких листьев. Хорошо подходит для подоконника.',
      'An easy spider plant with fountain-like leaves, well suited to a windowsill.',
    ),
    difficulty: 1,
    care: [
      careSection('Освещение', 'Light', 'Яркий рассеянный свет, легкая полутень допустима.', 'Bright filtered light; light shade is acceptable.'),
      careSection('Полив', 'Watering', 'Умеренный, летом чаще, зимой после подсыхания грунта.', 'Moderate, more often in summer and after drying in winter.'),
      careSection('Рост', 'Growth', 'Быстро наращивает розетку и детки на длинных усах.', 'Quickly grows a rosette and baby plants on long runners.'),
      careSection('Подкормки', 'Feeding', 'Весной и летом раз в 2-3 недели слабым удобрением.', 'Feed lightly every 2-3 weeks in spring and summer.'),
    ],
    problems: [
      problemRow('Кончики сохнут', 'Dry tips', 'Сухой воздух или соли в воде', 'Dry air or mineral-heavy water', 'Поливать мягкой водой и не пересушивать.', 'Use softer water and avoid full drying.'),
      problemRow('Листья бледнеют', 'Leaves pale', 'Мало света', 'Low light', 'Поставить ближе к рассеянному свету.', 'Move closer to filtered light.'),
    ],
    facts: factList(['Хлорофитум легко прощает ошибки и быстро восстанавливается.', 'Spider plant forgives mistakes and recovers quickly.']),
  }),
  plantContentEntry('glo-vel', {
    origin: localized('Бразилия', 'Brazil'),
    family: localized('Геснериевые', 'Gesneriaceae'),
    description: localized(
      'Компактная цветущая глоксиния с бархатными листьями и крупными колокольчатыми цветами.',
      'A compact flowering gloxinia with velvety leaves and large bell-shaped blooms.',
    ),
    difficulty: 3,
    care: [
      careSection('Освещение', 'Light', 'Много мягкого света без прямого солнца на листья.', 'Plenty of soft light without direct sun on leaves.'),
      careSection('Полив', 'Watering', 'Аккуратно по краю горшка, не мочить листья и цветы.', 'Water carefully at the pot edge, avoiding leaves and flowers.'),
      careSection('Покой', 'Dormancy', 'После цветения клубень может уходить на период отдыха.', 'After flowering the tuber may enter a rest period.'),
      careSection('Температура', 'Temperature', 'Тепло без сквозняков и резких перепадов.', 'Warmth without drafts or sharp changes.'),
    ],
    problems: [
      problemRow('Пятна на листьях', 'Leaf spots', 'Вода на бархатных листьях', 'Water on velvety leaves', 'Поливать снизу или по краю горшка.', 'Bottom-water or water at the pot edge.'),
    ],
    facts: factList(['Глоксинии часто выращивают как сезонное цветущее украшение подоконника.', 'Gloxinias are often grown as seasonal blooming windowsill accents.']),
  }),
  plantContentEntry('pha-whi', {
    origin: localized('Юго-Восточная Азия', 'Southeast Asia'),
    family: localized('Орхидные', 'Orchidaceae'),
    description: localized(
      'Фаленопсис с воздушными корнями и длинной дугой цветов. Любит свет и аккуратный полив.',
      'A phalaenopsis with aerial roots and an arching spray of blooms. It likes light and careful watering.',
    ),
    difficulty: 3,
    care: [
      careSection('Освещение', 'Light', 'Яркий рассеянный свет, восточное или западное окно.', 'Bright filtered light, east or west window.'),
      careSection('Полив', 'Watering', 'После посветления корней, без застоя воды в кашпо.', 'Water when roots turn silvery, never leaving water in the cachepot.'),
      careSection('Субстрат', 'Substrate', 'Кора для орхидей, прозрачный горшок и свободный воздух у корней.', 'Orchid bark, a clear pot, and airflow around roots.'),
      careSection('Цветение', 'Blooming', 'После цветения цветонос можно оставить, если он зеленый.', 'After blooming, keep the spike if it remains green.'),
    ],
    problems: [
      problemRow('Корни темнеют', 'Roots darken', 'Застой воды', 'Standing water', 'Просушить субстрат и проверить дренаж.', 'Dry the substrate and check drainage.'),
    ],
    facts: factList(['Фаленопсисы в природе растут не в земле, а закрепляются корнями на деревьях.', 'In nature phalaenopsis orchids attach to trees rather than growing in soil.']),
  }),
]) as Record<Plant['id'], PlantCardContent>;

function localize(text: LocalizedText, locale: Locale) {
  return text[locale];
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
