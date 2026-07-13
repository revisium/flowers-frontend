import type { Locale } from 'src/shared/config';

export type CollectionFamilyId =
  | 'amaryllidaceae'
  | 'apocynaceae'
  | 'araceae'
  | 'arecaceae'
  | 'asparagaceae'
  | 'asphodelaceae'
  | 'bromeliaceae'
  | 'cactaceae'
  | 'commelinaceae'
  | 'crassulaceae'
  | 'cycadaceae'
  | 'gesneriaceae'
  | 'marantaceae'
  | 'nephrolepidaceae'
  | 'orchidaceae'
  | 'piperaceae'
  | 'vitaceae';

export interface CollectionPlant {
  readonly familyId: CollectionFamilyId;
  readonly id: string;
  readonly image: string;
  readonly name: Record<Locale, string>;
  readonly profile: CollectionPlantProfile;
}

interface PlantProfileFact {
  readonly label: Record<Locale, string>;
  readonly value: Record<Locale, string>;
}

interface PlantProfileCareCard {
  readonly body: Record<Locale, string>;
  readonly title: Record<Locale, string>;
}

interface PlantProfileQuickFacts {
  readonly growth: Record<Locale, string>;
  readonly height: Record<Locale, string>;
}

export interface CollectionPlantProfile {
  readonly care: readonly PlantProfileCareCard[];
  readonly difficulty: number;
  readonly facts: readonly PlantProfileFact[];
  readonly latinName: string;
  readonly notes: Record<Locale, string>;
  readonly overview: Record<Locale, string>;
  readonly quickFacts: PlantProfileQuickFacts;
}

export const collectionPlants: readonly CollectionPlant[] = [
  {
    familyId: 'vitaceae',
    id: 'cissus-antarctica',
    image: '/plants/cissus-antarctica-home-photo.jpg',
    name: {
      en: 'Kangaroo vine',
      ru: 'Циссус антарктический',
    },
    profile: {
      care: [
        {
          body: {
            en: 'Bright indirect light or light shade. Protect the foliage from harsh direct sun.',
            ru: 'Яркий рассеянный свет или лёгкая полутень. Берегите листву от жёсткого прямого солнца.',
          },
          title: { en: 'Light', ru: 'Освещение' },
        },
        {
          body: {
            en: 'Keep the substrate lightly and evenly moist while the plant is growing. Avoid waterlogging.',
            ru: 'В период роста поддерживайте грунт слегка и равномерно влажным. Не допускайте застоя воды.',
          },
          title: { en: 'Watering', ru: 'Полив' },
        },
        {
          body: {
            en: 'Average to higher room humidity suits this rainforest vine; dry air can mark the foliage.',
            ru: 'Эта лиана из влажных лесов любит среднюю и повышенную влажность; сухой воздух отражается на листве.',
          },
          title: { en: 'Humidity', ru: 'Влажность' },
        },
        {
          body: {
            en: 'A warm, stable room suits it best. Keep it away from cold glass and drafts.',
            ru: 'Лучше всего подходит тёплое, стабильное помещение. Берегите от холодного стекла и сквозняков.',
          },
          title: { en: 'Temperature', ru: 'Температура' },
        },
      ],
      difficulty: 2,
      facts: [
        {
          label: { en: 'Family', ru: 'Семейство' },
          value: { en: 'Grape family (Vitaceae)', ru: 'Виноградовые (Vitaceae)' },
        },
        {
          label: { en: 'Origin', ru: 'Родина' },
          value: { en: 'Eastern Australia', ru: 'Восточное побережье Австралии' },
        },
        {
          label: { en: 'Plant type', ru: 'Тип растения' },
          value: { en: 'Woody climbing vine with tendrils', ru: 'Древеснеющая лиана с усиками' },
        },
      ],
      latinName: 'Cissus antarctica',
      notes: {
        en: 'Guide the young shoots onto a support and prune them after active growth to keep the vine tidy.',
        ru: 'Направляйте молодые побеги на опору и подрезайте их после активного роста, чтобы лиана сохраняла аккуратную форму.',
      },
      overview: {
        en: 'Kangaroo vine is an Australian evergreen climber with simple toothed leaves and tendrils. In nature it grows in warm coastal rainforests and their margins.',
        ru: 'Кенгуровая лиана — австралийская вечнозелёная лиана с простыми зубчатыми листьями и усиками. В природе растёт во влажных лесах и на их опушках восточного побережья.',
      },
      quickFacts: {
        growth: { en: 'Fast-growing', ru: 'Быстрый' },
        height: { en: 'Long climbing shoots', ru: 'Длинные побеги' },
      },
    },
  },
];

export const getCollectionPlantCount = () => collectionPlants.length;

export const getCollectionPlantCountByFamily = (familyId: CollectionFamilyId) =>
  collectionPlants.filter((plant) => plant.familyId === familyId).length;

export const getCollectionPlantsByFamily = (familyId: CollectionFamilyId, locale: Locale) =>
  collectionPlants
    .filter((plant) => plant.familyId === familyId)
    .map((plant) => ({ id: plant.id, image: plant.image, name: plant.name[locale] }));
