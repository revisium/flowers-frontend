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

export interface CollectionPlantProfile {
  readonly care: readonly PlantProfileCareCard[];
  readonly difficulty: number;
  readonly facts: readonly PlantProfileFact[];
  readonly idealImage: string;
  readonly latinName: string;
  readonly notes: Record<Locale, string>;
  readonly overview: Record<Locale, string>;
}

export const collectionPlants: readonly CollectionPlant[] = [
  {
    familyId: 'vitaceae',
    id: 'cissus-rhombifolia',
    image: '/plants/cissus-rhombifolia-home-photo.png',
    name: {
      en: 'Grape ivy',
      ru: 'Циссус ромболистный',
    },
    profile: {
      care: [
        {
          body: {
            en: 'Bright indirect light. The leaves lose colour and size in deep shade.',
            ru: 'Яркий рассеянный свет. В глубокой тени листья мельчают и теряют насыщенность.',
          },
          title: { en: 'Light', ru: 'Освещение' },
        },
        {
          body: {
            en: 'Water after the top 1–2 cm of soil has dried. Do not leave the pot in water.',
            ru: 'Поливайте после подсыхания верхних 1–2 см грунта. Не оставляйте горшок в воде.',
          },
          title: { en: 'Watering', ru: 'Полив' },
        },
        {
          body: {
            en: 'Average room humidity is enough; it appreciates a warm shower from time to time.',
            ru: 'Подходит обычная комнатная влажность; время от времени полезен тёплый душ.',
          },
          title: { en: 'Humidity', ru: 'Влажность' },
        },
        {
          body: {
            en: '18–25 °C. Keep it away from cold drafts and sudden temperature changes.',
            ru: '18–25 °C. Берегите от холодных сквозняков и резких перепадов температуры.',
          },
          title: { en: 'Temperature', ru: 'Температура' },
        },
      ],
      difficulty: 3,
      facts: [
        {
          label: { en: 'Family', ru: 'Семейство' },
          value: { en: 'Grape family (Vitaceae)', ru: 'Виноградовые (Vitaceae)' },
        },
        {
          label: { en: 'Origin', ru: 'Родина' },
          value: { en: 'Tropical Africa and Southwest Asia', ru: 'Тропическая Африка, Юго-Восточная Азия' },
        },
        {
          label: { en: 'Plant type', ru: 'Тип растения' },
          value: { en: 'Perennial climbing vine', ru: 'Лиана, многолетнее вечнозелёное растение' },
        },
      ],
      idealImage: '/plants/cissus-rhombifolia-ideal.png',
      latinName: 'Cissus rhombifolia',
      notes: {
        en: 'Pinch young shoots to encourage branching and a fuller silhouette.',
        ru: 'Прищипывайте молодые побеги, чтобы стимулировать ветвление и сделать крону пышнее.',
      },
      overview: {
        en: 'A fast-growing decorative vine with graceful compound leaves. It works beautifully on a support, high shelf, or in a hanging planter.',
        ru: 'Быстрорастущая декоративная лиана с изящными сложными листьями. Хорошо смотрится на опоре, высокой полке или в подвесном кашпо.',
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
    .map((plant) => ({ image: plant.image, name: plant.name[locale] }));
