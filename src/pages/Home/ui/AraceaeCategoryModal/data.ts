import type { Locale } from 'src/shared/config';
import { getCollectionPlantsByFamily, type CollectionFamilyId } from 'src/entities/collection';

import familySeedsJson from './familySeeds.json';
import { type CategoryDetailData, type CategoryPlant, type CategoryTrait } from './types';

type CategoryId = CollectionFamilyId;
interface LocalizedText {
  readonly en: string;
  readonly ru: string;
}
interface LocalizedTextList {
  readonly en: readonly string[];
  readonly ru: readonly string[];
}
interface LocalizedPlant extends LocalizedText {
  readonly image?: string;
}

const assets = {
  aglaonema: '/plants/araceae-modal/aglaonema.jpg',
  alocasia: '/plants/araceae-modal/alocasia.jpg',
  anthurium: '/plants/araceae-modal/anthurium.jpg',
  hero: '/plants/araceae-modal/hero-cutout-transparent.png',
  map: '/plants/araceae-modal/origin-map-transparent.png',
  monstera: '/plants/araceae-modal/monstera.jpg',
  philodendron: '/plants/araceae-modal/philodendron.jpg',
  spathiphyllum: '/plants/araceae-modal/spathiphyllum.jpg',
} as const;

const categoryImage = (id: CategoryId) => `/plants/categories/studio/${id}.jpg`;
const categoryCutout = (id: CategoryId) => `/plants/categories/generated/${id}.png`;

const createPlants = (locale: Locale): readonly CategoryPlant[] => getCollectionPlantsByFamily('araceae', locale);

const createTrait = (body: string, image: string): CategoryTrait => ({ body, image });

const araceaeSharedData = {
  heroImage: assets.hero,
  heroPosition: 'calc(100% + 70px) top',
  heroSize: { base: '540px auto', md: '650px auto', lg: '700px auto' },
  latinName: 'Araceae',
  originMapImage: assets.map,
} as const;

const ruText = {
  backLabel: 'Назад к категориям',
  closingNote: 'Ароидные - это не просто растения, это целый мир удивительных форм и адаптаций.',
  description:
    'Ароидные - одно из крупнейших семейств цветковых растений. Большинство представителей происходят из тропических и субтропических регионов и отличаются эффектными листьями, воздушными корнями и соцветиями-початками.',
  facts: [
    'Семейство включает более 100 родов и тысячи видов, от миниатюрных растений до крупных лиан.',
    'Белое покрывало спатифиллума и красная пластина антуриума - это не лепестки, а видоизмененный лист.',
    'Монстеры в природе могут подниматься по деревьям и выращивать листья больше человеческой руки.',
    'У многих ароидных молодые и взрослые листья выглядят так по-разному, будто это разные растения.',
  ],
  factsTitle: 'Интересные факты',
  originText:
    'Тропические и субтропические регионы Азии, Центральной и Южной Америки, Африки, Австралии и островов Тихого океана.',
  originTitle: 'Происхождение',
  title: 'Ароидные',
  traits: [
    createTrait('Соцветие-початок с покрывалом, которое часто выглядит как отдельный цветок.', assets.spathiphyllum),
    createTrait('Листья простые, часто крупные, с выразительными жилками и разными формами пластины.', assets.alocasia),
    createTrait('Многие представители образуют воздушные корни и цепляются за опору.', assets.monstera),
    createTrait('Часть видов содержит оксалаты кальция, поэтому их лучше держать вдали от животных.', assets.philodendron),
  ],
  traitsTitle: 'Отличительные признаки',
} as const;

const enText = {
  backLabel: 'Back to categories',
  closingNote: 'Aroids are more than houseplants: they are a world of remarkable forms and adaptations.',
  description:
    'Aroids are one of the largest families of flowering plants. Most members come from tropical and subtropical regions and are known for dramatic foliage, aerial roots, and spadix-and-spathe inflorescences.',
  facts: [
    'The family includes more than 100 genera and thousands of species, from compact plants to large climbing vines.',
    'The white spathe of Spathiphyllum and the red plate of Anthurium are modified leaves, not petals.',
    'In nature, Monsteras can climb trees and grow leaves larger than a human hand.',
    'Juvenile and mature leaves of many aroids can look so different that they seem like separate plants.',
  ],
  factsTitle: 'Interesting Facts',
  originText:
    'Tropical and subtropical regions of Asia, Central and South America, Africa, Australia, and Pacific islands.',
  originTitle: 'Origin',
  title: 'Aroids',
  traits: [
    createTrait('A spadix with a spathe, often perceived as a single flower.', assets.spathiphyllum),
    createTrait('Simple, often large leaves with expressive veins and varied blade shapes.', assets.alocasia),
    createTrait('Many members form aerial roots and use them to cling to support.', assets.monstera),
    createTrait('Some species contain calcium oxalate crystals, so they are best kept away from pets.', assets.philodendron),
  ],
  traitsTitle: 'Distinctive Traits',
} as const;

const createCategoryData = (
  locale: Locale,
  text: typeof ruText | typeof enText,
): CategoryDetailData => {
  const plants = createPlants(locale);

  return {
    ...araceaeSharedData,
    ...text,
    collectionPlants: plants,
    collectionTitle:
      locale === 'ru'
        ? `Растения из моей коллекции (${plants.length})`
        : `Plants in my collection (${plants.length})`,
    origin: {
      mapImage: araceaeSharedData.originMapImage,
      text: text.originText,
    },
  };
};

export const araceaeCategoryDataByLocale: Record<Locale, CategoryDetailData> = {
  en: createCategoryData('en', enText),
  ru: createCategoryData('ru', ruText),
};

interface FamilyDetailSeed {
  readonly closingNote?: LocalizedText;
  readonly description: LocalizedText;
  readonly facts: LocalizedTextList;
  readonly heroImage?: string;
  readonly heroBlendMode?: 'multiply';
  readonly heroFilter?: string;
  readonly heroPosition?: NonNullable<CategoryDetailData['heroPosition']>;
  readonly heroSize?: NonNullable<CategoryDetailData['heroSize']>;
  readonly latinName: string;
  readonly origin: LocalizedText;
  readonly originMapImage?: string;
  readonly plants: readonly LocalizedPlant[];
  readonly traits: LocalizedTextList;
  readonly traitImages?: readonly string[];
}

const familySeeds = familySeedsJson as Record<Exclude<CategoryId, 'araceae'>, FamilyDetailSeed>;

const modalCopy = {
  en: {
    backLabel: 'Back to categories',
    closingNote: 'Each family has its own rhythm; matching light, water, and soil to that rhythm keeps the collection calmer.',
    factsTitle: 'Interesting Facts',
    originTitle: 'Origin',
    traitsTitle: 'Distinctive Traits',
  },
  ru: {
    backLabel: 'Назад к категориям',
    closingNote: 'У каждого семейства свой ритм; когда свет, вода и грунт совпадают с ним, коллекция чувствует себя спокойнее.',
    factsTitle: 'Интересные факты',
    originTitle: 'Происхождение',
    traitsTitle: 'Отличительные признаки',
  },
} as const;

const createFamilyCategoryData = (
  id: Exclude<CategoryId, 'araceae'>,
  locale: Locale,
  title: string,
  seed: FamilyDetailSeed,
): CategoryDetailData => {
  const image = categoryImage(id);
  const plants = getCollectionPlantsByFamily(id, locale);

  return {
    backLabel: modalCopy[locale].backLabel,
    closingNote: seed.closingNote?.[locale] ?? modalCopy[locale].closingNote,
    collectionPlants: plants,
    collectionTitle:
      locale === 'ru'
        ? `Растения из моей коллекции (${plants.length})`
        : `Plants in my collection (${plants.length})`,
    description: seed.description[locale],
    facts: seed.facts[locale],
    factsTitle: modalCopy[locale].factsTitle,
    heroImage: seed.heroImage ?? categoryCutout(id),
    heroBlendMode: seed.heroBlendMode,
    heroFilter: seed.heroFilter,
    heroPosition: seed.heroPosition ?? { base: 'calc(100% + 132px) top', md: 'calc(100% + 80px) top' },
    heroSize: seed.heroSize ?? { base: '430px auto', md: '560px auto', lg: '640px auto' },
    latinName: seed.latinName,
    origin: {
      mapImage: seed.originMapImage ?? assets.map,
      text: seed.origin[locale],
    },
    originTitle: modalCopy[locale].originTitle,
    title,
    traits: seed.traits[locale].map((body, index) =>
      createTrait(body, seed.traitImages?.[index] ?? image),
    ),
    traitsTitle: modalCopy[locale].traitsTitle,
  };
};

const createFamilyDataByLocale = (
  id: Exclude<CategoryId, 'araceae'>,
  title: LocalizedText,
  seed: FamilyDetailSeed,
): Record<Locale, CategoryDetailData> => ({
  en: createFamilyCategoryData(id, 'en', title.en, seed),
  ru: createFamilyCategoryData(id, 'ru', title.ru, seed),
});

const familyTitles: Record<Exclude<CategoryId, 'araceae'>, LocalizedText> = {
  amaryllidaceae: { en: 'Amaryllis family', ru: 'Амариллисовые' },
  apocynaceae: { en: 'Dogbane family', ru: 'Кутровые' },
  arecaceae: { en: 'Palms', ru: 'Пальмовые' },
  asparagaceae: { en: 'Asparagus family', ru: 'Спаржевые' },
  asphodelaceae: { en: 'Asphodel family', ru: 'Асфоделовые' },
  bromeliaceae: { en: 'Bromeliads', ru: 'Бромелиевые' },
  cactaceae: { en: 'Cacti', ru: 'Кактусовые' },
  commelinaceae: { en: 'Spiderwort family', ru: 'Коммелиновые' },
  crassulaceae: { en: 'Stonecrop family', ru: 'Толстянковые' },
  cycadaceae: { en: 'Cycads', ru: 'Саговниковые' },
  gesneriaceae: { en: 'Gesneriad family', ru: 'Геснериевые' },
  marantaceae: { en: 'Prayer plant family', ru: 'Марантовые' },
  nephrolepidaceae: { en: 'Ferns', ru: 'Папоротники' },
  orchidaceae: { en: 'Orchids', ru: 'Орхидные' },
  piperaceae: { en: 'Pepper family', ru: 'Перцевые' },
  vitaceae: { en: 'Grape family', ru: 'Виноградовые' },
};

export const categoryDetailDataById: Record<CategoryId, Record<Locale, CategoryDetailData>> = {
  araceae: araceaeCategoryDataByLocale,
  amaryllidaceae: createFamilyDataByLocale(
    'amaryllidaceae',
    familyTitles.amaryllidaceae,
    familySeeds.amaryllidaceae,
  ),
  apocynaceae: createFamilyDataByLocale('apocynaceae', familyTitles.apocynaceae, familySeeds.apocynaceae),
  arecaceae: createFamilyDataByLocale('arecaceae', familyTitles.arecaceae, familySeeds.arecaceae),
  asparagaceae: createFamilyDataByLocale(
    'asparagaceae',
    familyTitles.asparagaceae,
    familySeeds.asparagaceae,
  ),
  asphodelaceae: createFamilyDataByLocale(
    'asphodelaceae',
    familyTitles.asphodelaceae,
    familySeeds.asphodelaceae,
  ),
  bromeliaceae: createFamilyDataByLocale(
    'bromeliaceae',
    familyTitles.bromeliaceae,
    familySeeds.bromeliaceae,
  ),
  cactaceae: createFamilyDataByLocale('cactaceae', familyTitles.cactaceae, familySeeds.cactaceae),
  commelinaceae: createFamilyDataByLocale(
    'commelinaceae',
    familyTitles.commelinaceae,
    familySeeds.commelinaceae,
  ),
  crassulaceae: createFamilyDataByLocale(
    'crassulaceae',
    familyTitles.crassulaceae,
    familySeeds.crassulaceae,
  ),
  cycadaceae: createFamilyDataByLocale('cycadaceae', familyTitles.cycadaceae, familySeeds.cycadaceae),
  gesneriaceae: createFamilyDataByLocale(
    'gesneriaceae',
    familyTitles.gesneriaceae,
    familySeeds.gesneriaceae,
  ),
  marantaceae: createFamilyDataByLocale('marantaceae', familyTitles.marantaceae, familySeeds.marantaceae),
  nephrolepidaceae: createFamilyDataByLocale(
    'nephrolepidaceae',
    familyTitles.nephrolepidaceae,
    familySeeds.nephrolepidaceae,
  ),
  orchidaceae: createFamilyDataByLocale('orchidaceae', familyTitles.orchidaceae, familySeeds.orchidaceae),
  piperaceae: createFamilyDataByLocale('piperaceae', familyTitles.piperaceae, familySeeds.piperaceae),
  vitaceae: createFamilyDataByLocale('vitaceae', familyTitles.vitaceae, familySeeds.vitaceae),
};
