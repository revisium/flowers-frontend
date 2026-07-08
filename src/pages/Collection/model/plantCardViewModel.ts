import rawPlantCardContent from './plantCardContent.json';
import {
  categoryLabels,
  plants,
  type Locale,
  type Plant,
  type PlantCategory,
} from './collectionModel';
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

interface RawPlantCardContent {
  readonly origin?: readonly string[];
  readonly family?: readonly string[];
  readonly description?: readonly string[];
  readonly difficulty?: number;
  readonly care?: readonly (readonly string[])[];
  readonly problems?: readonly (readonly string[])[];
  readonly facts?: readonly (readonly string[])[];
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

const createLocalizedPair = (
  value: readonly string[] | undefined,
  fallback = localized('', ''),
): LocalizedText => {
  return localized(value?.[0] ?? fallback.ru, value?.[1] ?? fallback.en);
};

const createCareSection = (value: readonly string[]): CareSection => {
  return {
    body: createLocalizedPair([value[2] ?? '', value[3] ?? '']),
    title: createLocalizedPair(value),
  };
};

const createProblemRow = (value: readonly string[]): ProblemRow => {
  return {
    problem: createLocalizedPair(value),
    reason: createLocalizedPair([value[2] ?? '', value[3] ?? '']),
    solution: createLocalizedPair([value[4] ?? '', value[5] ?? '']),
  };
};

const createPlantCardContent = (content: RawPlantCardContent): PlantCardContent => {
  return {
    care: content.care?.map(createCareSection) ?? fallbackContent.care,
    description: createLocalizedPair(content.description, fallbackContent.description),
    difficulty: content.difficulty ?? fallbackContent.difficulty,
    facts: content.facts?.map((fact) => createLocalizedPair(fact)) ?? fallbackContent.facts,
    family: createLocalizedPair(content.family, fallbackContent.family),
    origin: createLocalizedPair(content.origin, fallbackContent.origin),
    problems: content.problems?.map(createProblemRow) ?? fallbackContent.problems,
  };
};

const localize = (text: LocalizedText, locale: Locale) => {
  return text[locale];
};

const fallbackContent: PlantCardContent = {
  origin: localized('Домашняя коллекция', 'Home collection'),
  family: localized('Комнатные растения', 'Houseplants'),
  description: localized(
    'Любит стабильный уход, рассеянный свет и спокойное место без резких перепадов.',
    'Enjoys steady care, soft light, and a calm place without sharp changes.',
  ),
  difficulty: 3,
  care: [
    createCareSection([
      'Освещение',
      'Light',
      'Яркий рассеянный свет без прямого полуденного солнца.',
      'Bright filtered light without harsh midday sun.',
    ]),
    createCareSection([
      'Полив',
      'Watering',
      'Поливать после подсыхания верхнего слоя грунта.',
      'Water after the top soil layer dries.',
    ]),
    createCareSection([
      'Грунт и пересадка',
      'Soil and repotting',
      'Легкий воздухопроницаемый грунт и дренажный слой в горшке.',
      'Light breathable soil with a drainage layer in the pot.',
    ]),
    createCareSection([
      'Подкормки',
      'Feeding',
      'С весны до осени раз в 2-4 недели слабым раствором удобрения.',
      'Feed lightly every 2-4 weeks from spring to autumn.',
    ]),
  ],
  problems: [
    createProblemRow([
      'Листья теряют тонус',
      'Leaves lose firmness',
      'Нерегулярный полив',
      'Irregular watering',
      'Проверить грунт и выровнять режим ухода.',
      'Check the soil and steady the care rhythm.',
    ]),
  ],
  facts: [
    createLocalizedPair([
      'Растение лучше раскрывается, когда его место в комнате не меняют слишком часто.',
      'The plant settles better when its place in the room is not changed too often.',
    ]),
  ],
};

const plantCardContent = Object.fromEntries(
  Object.entries(rawPlantCardContent as Record<string, RawPlantCardContent>).map(
    ([plantId, content]) => [plantId, createPlantCardContent(content)],
  ),
) as Record<Plant['id'], PlantCardContent>;

export const getPlantById = (plantId: string) => {
  return plants.find((plant) => plant.id === plantId);
};

export const createPlantCardViewModel = (
  plantId: string | null,
  locale: Locale,
): PlantCardViewModel | null => {
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
};
