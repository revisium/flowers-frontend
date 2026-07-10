import type { Locale } from 'src/shared/config';

import { type CategoryDetailData, type CategoryPlant, type CategoryTrait } from './types';

type CategoryId =
  | 'amaryllidaceae'
  | 'apocynaceae'
  | 'araceae'
  | 'arecaceae'
  | 'asparagaceae'
  | 'asphodelaceae'
  | 'cactaceae'
  | 'commelinaceae'
  | 'cycadaceae'
  | 'gesneriaceae'
  | 'marantaceae'
  | 'nephrolepidaceae'
  | 'orchidaceae'
  | 'piperaceae'
  | 'vitaceae';
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

const amaryllidaceaeAssets = {
  cliviaMiniata: '/plants/amaryllidaceae-modal/clivia-miniata.jpg',
  crinumAsiaticum: '/plants/amaryllidaceae-modal/crinum-asiaticum.jpg',
  hippeastrumAlfresco: '/plants/amaryllidaceae-modal/hippeastrum-alfresco.jpg',
  hippeastrumAppleBlossom: '/plants/amaryllidaceae-modal/hippeastrum-apple-blossom.jpg',
  hippeastrumRedLion: '/plants/amaryllidaceae-modal/hippeastrum-red-lion.jpg',
  narcissusTeteATete: '/plants/amaryllidaceae-modal/narcissus-tete-a-tete.jpg',
  originMap: '/plants/amaryllidaceae-modal/origin-map.png',
  traitBulb: '/plants/amaryllidaceae-modal/trait-bulb.jpg',
  traitFlowers: '/plants/amaryllidaceae-modal/trait-flowers.jpg',
  traitFragrance: '/plants/amaryllidaceae-modal/trait-fragrance.jpg',
  traitLeaves: '/plants/amaryllidaceae-modal/trait-leaves.jpg',
  zephyranthesCitrina: '/plants/amaryllidaceae-modal/zephyranthes-citrina.jpg',
  zephyranthesRosea: '/plants/amaryllidaceae-modal/zephyranthes-rosea.jpg',
} as const;

const gesneriaceaeAssets = {
  achimenesLongiflora: '/plants/gesneriaceae-modal/achimenes-longiflora.jpg',
  aeschynanthusPulcher: '/plants/gesneriaceae-modal/aeschynanthus-pulcher.jpg',
  aeschynanthusRadicans: '/plants/gesneriaceae-modal/aeschynanthus-radicans.jpg',
  chiritaTamiana: '/plants/gesneriaceae-modal/chirita-tamiana.jpg',
  episciaCupreata: '/plants/gesneriaceae-modal/episcia-cupreata.jpg',
  hero: '/plants/gesneriaceae-modal/hero.png',
  kohleriaAmabilis: '/plants/gesneriaceae-modal/kohleria-amabilis.jpg',
  originMap: '/plants/gesneriaceae-modal/origin-map.png',
  saintpauliaIonantha: '/plants/gesneriaceae-modal/saintpaulia-ionantha.jpg',
  sinningiaLeucotricha: '/plants/gesneriaceae-modal/sinningia-leucotricha.jpg',
  sinningiaSpeciosa: '/plants/gesneriaceae-modal/sinningia-speciosa.jpg',
  streptocarpus: '/plants/gesneriaceae-modal/streptocarpus.jpg',
  traitFlowers: '/plants/gesneriaceae-modal/trait-flowers.jpg',
  traitLeaves: '/plants/gesneriaceae-modal/trait-leaves.jpg',
  traitRosette: '/plants/gesneriaceae-modal/trait-rosette.jpg',
  traitSeedCapsule: '/plants/gesneriaceae-modal/trait-seed-capsule.jpg',
} as const;

const marantaceaeAssets = {
  calatheaLancifolia: '/plants/marantaceae-modal/calathea-lancifolia.jpg',
  calatheaMakoyana: '/plants/marantaceae-modal/calathea-makoyana.jpg',
  calatheaOrnata: '/plants/marantaceae-modal/calathea-ornata.jpg',
  ctenantheBurleMarxii: '/plants/marantaceae-modal/ctenanthe-burle-marxii.jpg',
  goeppertiaInsignis: '/plants/marantaceae-modal/goeppertia-insignis.jpg',
  goeppertiaZebrina: '/plants/marantaceae-modal/goeppertia-zebrina.jpg',
  hero: '/plants/marantaceae-modal/hero.png',
  marantaKerchoveana: '/plants/marantaceae-modal/maranta-kerchoveana.jpg',
  marantaLeuconeura: '/plants/marantaceae-modal/maranta-leuconeura.jpg',
  originMap: '/plants/marantaceae-modal/origin-map.png',
  stromantheSanguinea: '/plants/marantaceae-modal/stromanthe-sanguinea.jpg',
  stromantheTriostar: '/plants/marantaceae-modal/stromanthe-triostar.jpg',
  traitFlowers: '/plants/marantaceae-modal/trait-flowers.jpg',
  traitHumidity: '/plants/marantaceae-modal/trait-humidity.jpg',
  traitNyctinasty: '/plants/marantaceae-modal/trait-nyctinasty.jpg',
  traitPattern: '/plants/marantaceae-modal/trait-pattern.jpg',
  traitUnderside: '/plants/marantaceae-modal/trait-underside.jpg',
} as const;

const collectionPlants = [
  { image: assets.alocasia, name: "Alocasia baginda 'Dragon Scale'" },
  { image: assets.alocasia, name: "Alocasia x amazonica 'Bambino'" },
  { image: assets.alocasia, name: "Alocasia reginula 'Black Velvet'" },
  { image: assets.aglaonema, name: "Aglaonema 'Red Valentine'" },
  { image: assets.aglaonema, name: "Aglaonema 'Silver Queen'" },
  { image: assets.aglaonema, name: { en: 'Pink Aglaonema', ru: 'Aglaonema розовая' } },
  { image: assets.philodendron, name: "Philodendron erubescens 'Imperial Red'" },
  { image: assets.monstera, name: 'Monstera adansonii' },
  { image: assets.anthurium, name: 'Anthurium' },
  { image: assets.spathiphyllum, name: 'Spathiphyllum' },
] as const;

const createPlants = (locale: Locale): readonly CategoryPlant[] =>
  collectionPlants.map((plant) => ({
    image: plant.image,
    name: typeof plant.name === 'string' ? plant.name : plant.name[locale],
  }));

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
  collectionTitle: 'Растения из моей коллекции (10)',
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
  collectionTitle: 'Plants in my collection (10)',
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
): CategoryDetailData => ({
  ...araceaeSharedData,
  ...text,
  collectionPlants: createPlants(locale),
  origin: {
    mapImage: araceaeSharedData.originMapImage,
    text: text.originText,
  },
});

export const araceaeCategoryDataByLocale: Record<Locale, CategoryDetailData> = {
  en: createCategoryData('en', enText),
  ru: createCategoryData('ru', ruText),
};

interface FamilyDetailSeed {
  readonly closingNote?: LocalizedText;
  readonly description: LocalizedText;
  readonly facts: LocalizedTextList;
  readonly heroImage?: string;
  readonly heroPosition?: NonNullable<CategoryDetailData['heroPosition']>;
  readonly heroSize?: NonNullable<CategoryDetailData['heroSize']>;
  readonly latinName: string;
  readonly origin: LocalizedText;
  readonly originMapImage?: string;
  readonly plants: readonly LocalizedPlant[];
  readonly traits: LocalizedTextList;
  readonly traitImages?: readonly string[];
}

const familySeeds: Record<Exclude<CategoryId, 'araceae'>, FamilyDetailSeed> = {
  amaryllidaceae: {
    closingNote: {
      en: 'Amaryllis relatives combine elegance, scent, and vivid seasonal blooms. Add a little tropical charm to your home.',
      ru: 'Амариллисовые - это сочетание изящества, аромата и яркого цветения. Добавьте немного тропического очарования в ваш дом!',
    },
    description: {
      en: 'Amaryllis relatives are monocot flowering plants that include many decorative bulbous species. They are known for expressive flowers, varied forms, and easy-going seasonal care.',
      ru: 'Амариллисовые - семейство однодольных цветковых растений, включающее множество декоративных луковичных видов. Они известны своими эффектными цветами, разнообразием форм и неприхотливостью в уходе.',
    },
    facts: {
      en: [
        'The family includes more than 1,600 species in roughly 75 genera.',
        'Hippeastrum is a beloved houseplant, though in nature it comes from South America.',
        'Narcissus and Hippeastrum are also members of this family.',
        'Some species, such as Clivia, bloom in winter and brighten the home during colder months.',
      ],
      ru: [
        'В семейство входит более 1600 видов в 75 родах.',
        'Амариллис (Hippeastrum) - популярное комнатное растение, хотя в природе он произрастает только в Южной Америке.',
        'Нарцисс и гиппеаструм - тоже представители этого семейства.',
        'Некоторые виды, например, кливия, цветут зимой, украшая дом в холодное время года.',
      ],
    },
    latinName: 'Amaryllidaceae',
    origin: {
      en: 'The genera occur mainly in tropical and subtropical regions of the Americas, South Africa, and the Mediterranean.',
      ru: 'Роды в основном из тропических и субтропических регионов Америки, Южной Африки и Средиземноморья.',
    },
    originMapImage: amaryllidaceaeAssets.originMap,
    plants: [
      {
        en: "Hippeastrum 'Red Lion'",
        image: amaryllidaceaeAssets.hippeastrumRedLion,
        ru: "Hippeastrum 'Red Lion'",
      },
      {
        en: "Hippeastrum 'Apple Blossom'",
        image: amaryllidaceaeAssets.hippeastrumAppleBlossom,
        ru: "Hippeastrum 'Apple Blossom'",
      },
      {
        en: "Hippeastrum 'Alfresco'",
        image: amaryllidaceaeAssets.hippeastrumAlfresco,
        ru: "Hippeastrum 'Alfresco'",
      },
      { en: 'Clivia miniata', image: amaryllidaceaeAssets.cliviaMiniata, ru: 'Clivia miniata' },
      {
        en: 'Zephyranthes citrina',
        image: amaryllidaceaeAssets.zephyranthesCitrina,
        ru: 'Zephyranthes citrina',
      },
      {
        en: 'Zephyranthes rosea',
        image: amaryllidaceaeAssets.zephyranthesRosea,
        ru: 'Zephyranthes rosea',
      },
      {
        en: "Narcissus 'Tete-a-Tete'",
        image: amaryllidaceaeAssets.narcissusTeteATete,
        ru: "Narcissus 'Tete-a-Tete'",
      },
      { en: 'Crinum asiaticum', image: amaryllidaceaeAssets.crinumAsiaticum, ru: 'Crinum asiaticum' },
    ],
    traits: {
      en: [
        'Bulbous plants with an underground bulb.',
        'Leaves are usually basal, linear, and strap-shaped.',
        'Flowers are large, often funnel-shaped or tubular, gathered in umbels or brush-like clusters.',
        'Many species have a pleasant fragrance.',
      ],
      ru: [
        'Луковичные растения с подземной луковицей.',
        'Листья чаще всего прикорневые, линейные, ремневидные.',
        'Цветки крупные, часто воронковидные или трубчатые, собраны в зонтичные или кистевидные соцветия.',
        'Многие виды обладают приятным ароматом.',
      ],
    },
    traitImages: [
      amaryllidaceaeAssets.traitBulb,
      amaryllidaceaeAssets.traitLeaves,
      amaryllidaceaeAssets.traitFlowers,
      amaryllidaceaeAssets.traitFragrance,
    ],
  },
  apocynaceae: {
    description: {
      en: 'Dogbane family plants bring sculptural stems, glossy leaves, and fragrant starry flowers. Indoors they are loved for hoyas, desert roses, and other resilient bloomers.',
      ru: 'Кутровые объединяют скульптурные стебли, глянцевые листья и ароматные звездчатые цветы. В доме их любят за хойи, адениумы и другие стойкие цветущие формы.',
    },
    facts: {
      en: [
        'Many members have milky sap, so pruning is best done with care.',
        'Hoyas can flower repeatedly from the same spurs if old peduncles are left intact.',
        'Succulent relatives store water in thick stems and prefer airy mineral soil.',
      ],
      ru: [
        'У многих представителей есть млечный сок, поэтому обрезку лучше делать аккуратно.',
        'Хойи могут цвести повторно с одних и тех же цветоносов, если их не удалять.',
        'Суккулентные виды запасают воду в толстых стеблях и любят воздушный минеральный грунт.',
      ],
    },
    latinName: 'Apocynaceae',
    origin: {
      en: 'Tropics and subtropics of Asia, Africa, Australia, and the Americas.',
      ru: 'Тропики и субтропики Азии, Африки, Австралии и Америки.',
    },
    plants: [
      { en: 'Hoya carnosa', ru: 'Хойя мясистая' },
      { en: 'Adenium obesum', ru: 'Адениум тучный' },
    ],
    traits: {
      en: [
        'Milky sap is common in stems and leaves.',
        'Flowers are often star-shaped, waxy, or strongly fragrant.',
        'Some species trail and climb, while others form swollen caudex stems.',
        'Most prefer bright light and careful watering.',
      ],
      ru: [
        'В стеблях и листьях часто есть млечный сок.',
        'Цветы нередко звездчатые, восковые или заметно ароматные.',
        'Одни виды свисают и цепляются, другие формируют утолщенный каудекс.',
        'Большинству нужен яркий свет и аккуратный полив.',
      ],
    },
  },
  arecaceae: {
    description: {
      en: 'Palms add a calm vertical rhythm to a room with feathered or fan-shaped fronds. They grow from a single crown and appreciate steady warmth, light, and room to unfold.',
      ru: 'Пальмовые дают комнате спокойный вертикальный ритм перистыми или веерными листьями. Они растут из одной верхушки и ценят стабильное тепло, свет и место для раскрытия вай.',
    },
    facts: {
      en: [
        'Most palms do not branch from the trunk, so the growing point is especially important.',
        'Young indoor palms often prefer softer light than mature outdoor specimens.',
        'Leaf tips react quickly to dry air, salts in water, and irregular watering.',
      ],
      ru: [
        'Большинство пальм не ветвится от ствола, поэтому точка роста особенно важна.',
        'Молодые комнатные пальмы часто любят более мягкий свет, чем взрослые растения на улице.',
        'Кончики листьев быстро реагируют на сухой воздух, соли в воде и нерегулярный полив.',
      ],
    },
    latinName: 'Arecaceae',
    origin: {
      en: 'Mainly tropical and subtropical forests, coastlines, and islands around the world.',
      ru: 'Преимущественно тропические и субтропические леса, побережья и острова по всему миру.',
    },
    plants: [{ en: 'Chamaedorea elegans', ru: 'Хамедорея изящная' }],
    traits: {
      en: [
        'Leaves are feather-like or fan-shaped and unfold from the crown.',
        'The stem is usually upright and rarely branches indoors.',
        'Roots like consistent moisture without stagnant water.',
        'A warm stable place helps new fronds open cleanly.',
      ],
      ru: [
        'Листья перистые или веерные и разворачиваются из центральной верхушки.',
        'Стебель обычно прямой и в комнате почти не ветвится.',
        'Корни любят равномерную влажность без застоя воды.',
        'Теплое стабильное место помогает новым листьям раскрываться ровно.',
      ],
    },
  },
  asparagaceae: {
    description: {
      en: 'The asparagus family includes easy indoor classics with rosettes, canes, and resilient root systems. These plants usually forgive small care mistakes and grow steadily in bright filtered light.',
      ru: 'Спаржевые включают комнатную классику с розетками, стволиками и выносливыми корнями. Такие растения часто прощают небольшие ошибки ухода и стабильно растут на ярком рассеянном свету.',
    },
    facts: {
      en: [
        'The family includes familiar indoor genera such as Chlorophytum, Dracaena, Sansevieria, and Yucca.',
        'Many species store water in thick roots, rhizomes, or firm leaves.',
        'Spider plants make baby rosettes on long runners, which makes propagation simple.',
      ],
      ru: [
        'К семейству относятся знакомые комнатные роды: хлорофитум, драцена, сансевиерия и юкка.',
        'Многие виды запасают воду в толстых корнях, корневищах или плотных листьях.',
        'Хлорофитум образует детки на длинных усах, поэтому его легко размножать.',
      ],
    },
    latinName: 'Asparagaceae',
    origin: {
      en: 'Africa, Eurasia, and the Americas, from dry habitats to forest understories.',
      ru: 'Африка, Евразия и Америка: от сухих местообитаний до лесного подлеска.',
    },
    plants: [{ en: 'Chlorophytum comosum', ru: 'Хлорофитум хохлатый' }],
    traits: {
      en: [
        'Leaves are often narrow, leathery, or arranged in rosettes.',
        'Thick roots and rhizomes help tolerate short dry spells.',
        'Many species grow slowly but hold their shape for years.',
        'Bright filtered light keeps variegation cleaner.',
      ],
      ru: [
        'Листья часто узкие, кожистые или собраны в розетки.',
        'Толстые корни и корневища помогают переживать короткую пересушку.',
        'Многие виды растут неспешно, но годами держат форму.',
        'Яркий рассеянный свет сохраняет вариегатность чище.',
      ],
    },
  },
  asphodelaceae: {
    description: {
      en: 'Asphodel relatives are built for light, drainage, and patience. Aloes and haworthias keep water in firm leaves and reward restraint more than constant attention.',
      ru: 'Асфоделовые созданы для света, дренажа и терпения. Алоэ и хавортии держат воду в плотных листьях и лучше отвечают на сдержанный уход, чем на постоянное внимание.',
    },
    facts: {
      en: [
        'Leaf succulence lets these plants survive long dry pauses.',
        'Rosettes can burn in harsh direct sun if moved too quickly from shade.',
        'Offsets around the mother plant are an easy way to renew the pot.',
      ],
      ru: [
        'Сочные листья помогают переживать длинные сухие паузы.',
        'Розетки могут обгореть на прямом солнце, если резко переставить их из тени.',
        'Детки вокруг материнского растения легко используют для обновления горшка.',
      ],
    },
    latinName: 'Asphodelaceae',
    origin: {
      en: 'Dry and sunny regions of Africa, Madagascar, and nearby islands.',
      ru: 'Сухие и солнечные регионы Африки, Мадагаскара и соседних островов.',
    },
    plants: [{ en: 'Aloe vera', ru: 'Алоэ вера' }],
    traits: {
      en: [
        'Leaves are thick, pointed, and arranged in compact rosettes.',
        'Roots need mineral, fast-draining soil.',
        'Watering is sparse, especially in cool seasons.',
        'Soft color changes often show how much light the plant receives.',
      ],
      ru: [
        'Листья толстые, заостренные и собраны в компактные розетки.',
        'Корням нужен минеральный, быстро просыхающий грунт.',
        'Полив редкий, особенно в прохладный сезон.',
        'Мягкая смена оттенка часто показывает, сколько света получает растение.',
      ],
    },
  },
  cactaceae: {
    description: {
      en: 'Cacti are specialists in storing water and protecting it. Their stems do the work of leaves, while spines and ribs help them handle bright dry conditions.',
      ru: 'Кактусовые специализируются на запасе и защите воды. Их стебли выполняют работу листьев, а колючки и ребра помогают жить в ярких сухих условиях.',
    },
    facts: {
      en: [
        'Cactus spines are modified leaves that shade the stem and protect stored water.',
        'Ribbed stems expand after rain and shrink during dry spells.',
        'Most indoor cacti need a cool bright rest to bloom reliably.',
      ],
      ru: [
        'Колючки кактусов - видоизмененные листья, которые притеняют стебель и защищают запас воды.',
        'Ребристые стебли расширяются после дождя и сжимаются в сухой период.',
        'Большинству комнатных кактусов для цветения нужен прохладный светлый отдых.',
      ],
    },
    latinName: 'Cactaceae',
    origin: {
      en: 'Mostly the Americas, especially arid and seasonally dry landscapes.',
      ru: 'Преимущественно Америка, особенно засушливые и сезонно сухие ландшафты.',
    },
    plants: [{ en: 'Mammillaria', ru: 'Маммиллярия' }],
    traits: {
      en: [
        'Leaves are reduced to spines, while green stems photosynthesize.',
        'Areoles produce spines, flowers, and new growth.',
        'The potting mix should dry quickly and contain mineral particles.',
        'More light means denser growth and stronger shape.',
      ],
      ru: [
        'Листья редуцированы до колючек, а зеленые стебли фотосинтезируют.',
        'Ареолы дают колючки, цветы и новый рост.',
        'Смесь должна быстро просыхать и содержать минеральные частицы.',
        'Чем больше света, тем плотнее рост и крепче форма.',
      ],
    },
  },
  commelinaceae: {
    description: {
      en: 'Spiderwort relatives are fast, colorful, and generous with cuttings. Their trailing stems and striped leaves make shelves and hanging pots feel instantly alive.',
      ru: 'Коммелиновые быстрые, цветные и щедрые на черенки. Их свисающие побеги и полосатые листья мгновенно оживляют полки и подвесные кашпо.',
    },
    facts: {
      en: [
        'Tradescantias root so easily that a tired pot can be refreshed from cuttings.',
        'Brighter light usually makes purple and silver markings more expressive.',
        'Older stems may bare at the base, so regular pruning keeps the plant full.',
      ],
      ru: [
        'Традесканции так легко укореняются, что уставший горшок можно быстро обновить черенками.',
        'На ярком свету фиолетовые и серебристые полосы обычно становятся выразительнее.',
        'Старые побеги могут оголяться у основания, поэтому прищипка сохраняет пышность.',
      ],
    },
    latinName: 'Commelinaceae',
    origin: {
      en: 'Warm regions of the Americas, Africa, and Asia, often in bright forest edges.',
      ru: 'Теплые регионы Америки, Африки и Азии, часто светлые лесные опушки.',
    },
    plants: [{ en: 'Tradescantia zebrina', ru: 'Традесканция зебрина' }],
    traits: {
      en: [
        'Jointed stems root from nodes and trail easily.',
        'Leaves are often striped, metallic, purple, or softly hairy.',
        'Growth is quick, so pruning is part of normal care.',
        'Soft stems prefer moderate watering without long drought.',
      ],
      ru: [
        'Членистые стебли укореняются в узлах и легко свисают.',
        'Листья часто полосатые, металлические, фиолетовые или мягко опушенные.',
        'Рост быстрый, поэтому обрезка - обычная часть ухода.',
        'Мягкие стебли любят умеренный полив без долгой засухи.',
      ],
    },
  },
  cycadaceae: {
    description: {
      en: 'Cycads look ancient because they are ancient in form: a sturdy trunk, a crown of stiff fronds, and very slow deliberate growth.',
      ru: 'Саговниковые выглядят древними, потому что их форма действительно древняя: крепкий стволик, корона жестких листьев и очень медленный уверенный рост.',
    },
    facts: {
      en: [
        'Cycads are not palms, even though many indoor forms look palm-like.',
        'New leaves often emerge together as a soft flush, then harden and darken.',
        'They dislike frequent repotting and recover slowly from root damage.',
      ],
      ru: [
        'Саговники не пальмы, хотя многие комнатные формы похожи на маленькие пальмы.',
        'Новые листья часто выходят сразу волной, затем твердеют и темнеют.',
        'Они не любят частую пересадку и медленно восстанавливаются после повреждения корней.',
      ],
    },
    latinName: 'Cycadaceae',
    origin: {
      en: 'Subtropical parts of Asia, Africa, Australia, and islands of the Pacific.',
      ru: 'Субтропические области Азии, Африки, Австралии и островов Тихого океана.',
    },
    plants: [{ en: 'Cycas revoluta', ru: 'Саговник поникающий' }],
    traits: {
      en: [
        'A stout trunk or caudex carries a crown of stiff fronds.',
        'Growth is slow and usually comes in seasonal flushes.',
        'Bright light keeps the crown compact.',
        'All parts are best kept away from pets and small children.',
      ],
      ru: [
        'Толстый стволик или каудекс несет корону жестких листьев.',
        'Рост медленный и обычно идет сезонными волнами.',
        'Яркий свет сохраняет крону компактной.',
        'Все части лучше держать вдали от животных и маленьких детей.',
      ],
    },
  },
  gesneriaceae: {
    closingNote: {
      en: 'Gesneriads win with variety of form, color, and texture. They fill a home with comfort, flowers, and a tropical mood.',
      ru: 'Геснериевые покоряют разнообразием форм, окраски и текстур. Они наполняют дом уютом, цветением и тропическим настроением!',
    },
    description: {
      en: 'Gesneriads are a large and diverse family of flowering plants, most of which come from tropical and subtropical regions. Many species are valued for decorative foliage and expressive blooming, which makes them popular houseplants.',
      ru: 'Геснериевые - крупное и разнообразное семейство цветковых растений, большинство представителей которого произрастают в тропических и субтропических регионах. Многие виды ценятся за свои декоративные листья и эффектное цветение, что делает их популярными комнатными растениями.',
    },
    facts: {
      en: [
        'Saintpaulias, or African violets, are among the most popular houseplants in the world.',
        'Gloxinias are famous for large velvety flowers and bright seasonal blooming.',
        'Streptocarpus are often called cape primroses for their graceful bell-shaped flowers.',
        'Many gesneriads like bright filtered light and do not tolerate waterlogged soil.',
      ],
      ru: [
        'Сенполии (узамбарские фиалки) - одни из самых популярных комнатных растений в мире.',
        'Глоксинии славятся крупными бархатистыми цветками и ярким цветением.',
        'Стрептокарпусы часто называют «капскими фиалками» за их изящные колокольчатые цветы.',
        'Многие геснериевые любят яркий рассеянный свет и не переносят переувлажнения.',
      ],
    },
    heroImage: gesneriaceaeAssets.hero,
    heroPosition: { base: 'calc(100% + 208px) top', md: 'calc(100% + 158px) top', lg: 'calc(100% + 128px) top' },
    heroSize: { base: '590px auto', md: '730px auto', lg: '830px auto' },
    latinName: 'Gesneriaceae',
    origin: {
      en: 'Tropical and subtropical regions of Asia, Africa, Madagascar, Central America, and South America.',
      ru: 'Тропические и субтропические регионы Азии, Африки, Мадагаскара, Центральной и Южной Америки.',
    },
    originMapImage: gesneriaceaeAssets.originMap,
    plants: [
      {
        en: 'Saintpaulia ionantha',
        image: gesneriaceaeAssets.saintpauliaIonantha,
        ru: 'Saintpaulia ionantha (Узамбарская фиалка)',
      },
      {
        en: 'Sinningia speciosa',
        image: gesneriaceaeAssets.sinningiaSpeciosa,
        ru: 'Sinningia speciosa (Глоксиния)',
      },
      {
        en: 'Streptocarpus',
        image: gesneriaceaeAssets.streptocarpus,
        ru: 'Streptocarpus (Стрептокарпус)',
      },
      {
        en: 'Aeschynanthus radicans',
        image: gesneriaceaeAssets.aeschynanthusRadicans,
        ru: 'Aeschynanthus radicans (Эсхинантус)',
      },
      {
        en: 'Aeschynanthus pulcher',
        image: gesneriaceaeAssets.aeschynanthusPulcher,
        ru: 'Aeschynanthus pulcher (Эсхинантус прекрасный)',
      },
      {
        en: 'Kohleria amabilis',
        image: gesneriaceaeAssets.kohleriaAmabilis,
        ru: 'Kohleria amabilis (Колерия)',
      },
      {
        en: 'Chirita tamiana',
        image: gesneriaceaeAssets.chiritaTamiana,
        ru: 'Chirita tamiana (Хирита)',
      },
      {
        en: 'Achimenes longiflora',
        image: gesneriaceaeAssets.achimenesLongiflora,
        ru: 'Achimenes longiflora (Ахименес)',
      },
      {
        en: 'Episcia cupreata',
        image: gesneriaceaeAssets.episciaCupreata,
        ru: 'Episcia cupreata (Эписция)',
      },
      {
        en: 'Sinningia leucotricha',
        image: gesneriaceaeAssets.sinningiaLeucotricha,
        ru: 'Sinningia leucotricha (Синнингия)',
      },
    ],
    traits: {
      en: [
        'Leaves are often soft, fuzzy, and beautifully textured or patterned.',
        'Flowers vary widely in shape and color: tubular, bell-shaped, funnel-shaped, or irregular.',
        'Many species form leaf rosettes and bloom for a long time and abundantly.',
        'Fruits are capsules with tiny seeds; many species also root easily from leaf cuttings.',
      ],
      ru: [
        'Листья часто мягкие, опушённые, с красивой текстурой и окраской.',
        'Цветки разнообразной формы и окраски: трубчатые, колокольчатые, воронковидные или неправильные.',
        'Многие виды образуют розетки листьев и цветут продолжительно и обильно.',
        'Плоды - коробочки с мелкими семенами. Размножаются семенами и черенками листьев.',
      ],
    },
    traitImages: [
      gesneriaceaeAssets.traitLeaves,
      gesneriaceaeAssets.traitFlowers,
      gesneriaceaeAssets.traitRosette,
      gesneriaceaeAssets.traitSeedCapsule,
    ],
  },
  marantaceae: {
    closingNote: {
      en: 'Marantaceae are perfect for those who love beauty in details. Their leaves move with their own rhythm and make every day at home feel special.',
      ru: 'Марантовые - идеальный выбор для тех, кто любит красоту в деталях. Их листья живут своей жизнью и делают каждый день в вашем доме особенным!',
    },
    description: {
      en: 'Marantaceae are tropical plants known for spectacular patterned leaves and unique behavior: many fold their leaves at night and open them again in the morning. They are valued for decorative foliage, calm care habits, and the ability to make a home feel cozy.',
      ru: 'Марантовые - семейство тропических растений, известных своими эффектными узорчатыми листьями и уникальным поведением: многие из них складывают листья на ночь и открывают их утром. Эти растения ценятся за декоративность, неприхотливость в уходе и способность создавать уютную атмосферу в доме.',
    },
    facts: {
      en: [
        'Marantaceae are often called prayer plants because their leaves move upward in the evening.',
        'Calathea, Maranta, and Ctenanthe are the most popular genera of this family in indoor plant collections.',
        'The plants are sensitive to water quality and prefer soft, settled water.',
        'Marantaceae help humidify the air thanks to their large leaf surface.',
      ],
      ru: [
        'Марантовые часто называют «молящимися растениями» за движение листьев вверх вечером.',
        'Калатея, маранта и ктенанта - самые популярные роды этого семейства в комнатном цветоводстве.',
        'Растения чувствительны к качеству воды: предпочитают мягкую, отстоянную воду.',
        'Марантовые отлично увлажняют воздух благодаря крупной площади листьев.',
      ],
    },
    heroImage: marantaceaeAssets.hero,
    heroPosition: { base: 'calc(100% + 210px) top', md: 'calc(100% + 150px) top', lg: 'calc(100% + 105px) top' },
    heroSize: { base: '600px auto', md: '740px auto', lg: '850px auto' },
    latinName: 'Marantaceae',
    origin: {
      en: 'Tropical regions of Central and South America, especially the humid forests of Brazil.',
      ru: 'Тропические регионы Центральной и Южной Америки, особенно влажные леса Бразилии.',
    },
    originMapImage: marantaceaeAssets.originMap,
    plants: [
      {
        en: 'Maranta leuconeura',
        image: marantaceaeAssets.marantaLeuconeura,
        ru: 'Maranta leuconeura (Маранта беложильчатая)',
      },
      {
        en: "Maranta leuconeura 'Kerchoveana'",
        image: marantaceaeAssets.marantaKerchoveana,
        ru: "Maranta leuconeura 'Kerchoveana'",
      },
      {
        en: 'Calathea makoyana',
        image: marantaceaeAssets.calatheaMakoyana,
        ru: 'Calathea makoyana (Калатея Макояна)',
      },
      {
        en: 'Calathea ornata',
        image: marantaceaeAssets.calatheaOrnata,
        ru: 'Calathea ornata (Калатея орната)',
      },
      {
        en: 'Calathea lancifolia',
        image: marantaceaeAssets.calatheaLancifolia,
        ru: 'Calathea lancifolia (Калатея лансифолия)',
      },
      {
        en: 'Ctenanthe burle-marxii',
        image: marantaceaeAssets.ctenantheBurleMarxii,
        ru: 'Ctenanthe burle-marxii (Ктенанта Бурле-Маркса)',
      },
      {
        en: 'Stromanthe sanguinea',
        image: marantaceaeAssets.stromantheSanguinea,
        ru: 'Stromanthe sanguinea (Строманта кроваво-красная)',
      },
      {
        en: "Stromanthe 'Triostar'",
        image: marantaceaeAssets.stromantheTriostar,
        ru: "Stromanthe 'Triostar' (Строманта Триостар)",
      },
      {
        en: 'Goeppertia insignis',
        image: marantaceaeAssets.goeppertiaInsignis,
        ru: 'Goeppertia insignis (Геппертия инсигнис)',
      },
      {
        en: 'Goeppertia zebrina',
        image: marantaceaeAssets.goeppertiaZebrina,
        ru: 'Goeppertia zebrina (Геппертия зебрина)',
      },
    ],
    traits: {
      en: [
        'Leaves have bright patterns: stripes, spots, herringbone shapes, and feathered markings.',
        'Many species fold their leaves at night in a movement called nyctinasty.',
        'The underside of the leaves is often purple or red, with contrasting shades.',
        'They prefer humid air and a stable temperature.',
        'Flowers are small and modest, gathered in spike-like inflorescences.',
      ],
      ru: [
        'Листья с ярким рисунком: полосы, пятна, «ёлочка», перышки.',
        'Многие виды складывают листья на ночь (никтинастия).',
        'Нижняя сторона листьев часто окрашена в фиолетовые или красноватые оттенки.',
        'Предпочитают влажный воздух и стабильную температуру.',
        'Цветки мелкие, невзрачные, собраны в колосовидные соцветия.',
      ],
    },
    traitImages: [
      marantaceaeAssets.traitPattern,
      marantaceaeAssets.traitNyctinasty,
      marantaceaeAssets.traitUnderside,
      marantaceaeAssets.traitHumidity,
      marantaceaeAssets.traitFlowers,
    ],
  },
  nephrolepidaceae: {
    description: {
      en: 'Nephrolepis ferns bring fine green texture and a fresh forest mood. They do not flower; their beauty is in arching fronds, steady moisture, and soft shade.',
      ru: 'Нефролеписовые папоротники дают тонкую зеленую фактуру и свежий лесной характер. Они не цветут: их красота в дуговидных вайях, стабильной влажности и мягкой тени.',
    },
    facts: {
      en: [
        'Ferns reproduce by spores rather than flowers and seeds.',
        'Dry air quickly shows as brittle tips and shedding leaflets.',
        'A hanging pot lets the fronds fall naturally on all sides.',
      ],
      ru: [
        'Папоротники размножаются спорами, а не цветами и семенами.',
        'Сухой воздух быстро проявляется ломкими кончиками и осыпанием сегментов.',
        'В подвесном горшке вайи естественно расходятся во все стороны.',
      ],
    },
    latinName: 'Nephrolepidaceae',
    origin: {
      en: 'Humid tropical and subtropical forests across many regions.',
      ru: 'Влажные тропические и субтропические леса разных регионов.',
    },
    plants: [{ en: 'Nephrolepis exaltata', ru: 'Нефролепис возвышенный' }],
    traits: {
      en: [
        'Arching fronds are divided into many small leaflets.',
        'The plant prefers constant light moisture.',
        'Soft filtered light prevents scorching.',
        'Spores form on the underside of mature fronds.',
      ],
      ru: [
        'Дуговидные вайи разделены на множество мелких сегментов.',
        'Растение любит постоянную легкую влажность.',
        'Мягкий рассеянный свет защищает от ожогов.',
        'Споры формируются на нижней стороне зрелых вай.',
      ],
    },
  },
  orchidaceae: {
    description: {
      en: 'Orchids are masters of refined flowers and aerial roots. Indoor favorites like phalaenopsis grow on bark, breathe through their roots, and bloom for weeks.',
      ru: 'Орхидные - мастера утонченных цветов и воздушных корней. Комнатные фаленопсисы растут в коре, дышат корнями и могут цвести неделями.',
    },
    facts: {
      en: [
        'Many orchids are epiphytes: they attach to trees without taking food from them.',
        'Green or silvery roots help show when watering is needed.',
        'One flower spike can hold blooms for several months in good conditions.',
      ],
      ru: [
        'Многие орхидеи эпифиты: они крепятся к деревьям, не забирая у них питание.',
        'Зеленые или серебристые корни помогают понять, когда нужен полив.',
        'Один цветонос при хороших условиях может держать цветы несколько месяцев.',
      ],
    },
    latinName: 'Orchidaceae',
    origin: {
      en: 'Nearly worldwide, with indoor species mostly from tropical forests of Asia and the Americas.',
      ru: 'Почти по всему миру, а комнатные виды чаще из тропических лесов Азии и Америки.',
    },
    plants: [
      { en: 'Phalaenopsis', ru: 'Фаленопсис' },
      { en: 'Dendrobium', ru: 'Дендробиум' },
      { en: 'Oncidium', ru: 'Онцидиум' },
    ],
    traits: {
      en: [
        'Flowers are bilaterally symmetrical and often long-lasting.',
        'Aerial roots need air as much as moisture.',
        'Many species grow in bark rather than dense soil.',
        'Bright filtered light supports repeat blooming.',
      ],
      ru: [
        'Цветы двусторонне симметричные и часто долго держатся.',
        'Воздушным корням нужен воздух не меньше, чем влага.',
        'Многие виды растут в коре, а не в плотной земле.',
        'Яркий рассеянный свет помогает повторному цветению.',
      ],
    },
  },
  piperaceae: {
    description: {
      en: 'Pepper family houseplants are compact, tactile, and expressive in leaf shape. Peperomias especially suit small shelves because they stay neat and tolerate modest care.',
      ru: 'Перцевые в доме компактные, фактурные и выразительные по форме листа. Особенно пеперомии хороши для небольших полок: они аккуратные и терпят умеренный уход.',
    },
    facts: {
      en: [
        'Peperomia flowers are tiny and carried on slender spikes.',
        'Many species have succulent leaves that dislike constant wet soil.',
        'Leaf cuttings can produce new plants in several popular peperomias.',
      ],
      ru: [
        'Цветы пеперомий крошечные и собраны на тонких початках.',
        'У многих видов сочные листья, которые не любят постоянно мокрый грунт.',
        'У популярных пеперомий новое растение можно получить даже из листового черенка.',
      ],
    },
    latinName: 'Piperaceae',
    origin: {
      en: 'Tropical regions of Central and South America, Africa, and Asia.',
      ru: 'Тропические регионы Центральной и Южной Америки, Африки и Азии.',
    },
    plants: [{ en: 'Peperomia obtusifolia', ru: 'Пеперомия туполистная' }],
    traits: {
      en: [
        'Leaves may be round, corrugated, glossy, or softly succulent.',
        'Flower spikes are narrow and understated.',
        'Small root systems prefer compact pots.',
        'Moderate light keeps growth dense.',
      ],
      ru: [
        'Листья бывают круглыми, морщинистыми, глянцевыми или слегка суккулентными.',
        'Соцветия узкие и очень сдержанные.',
        'Небольшая корневая система любит компактные горшки.',
        'Умеренный свет сохраняет рост плотным.',
      ],
    },
  },
  vitaceae: {
    description: {
      en: 'Grape family climbers bring tendrils, fast growth, and a true vine silhouette. Indoors they are useful when a plant should climb, trail, or fill a support quickly.',
      ru: 'Виноградовые дают усики, быстрый рост и настоящий силуэт лианы. В доме они хороши там, где растение должно быстро оплести опору, свисать или заполнить угол.',
    },
    facts: {
      en: [
        'Tendrils help vines grip supports without heavy stems.',
        'Cissus is a classic indoor member that tolerates pruning well.',
        'Fast growth means regular shaping keeps the plant decorative.',
      ],
      ru: [
        'Усики помогают лианам цепляться за опору без тяжелых стеблей.',
        'Циссус - классический комнатный представитель, который хорошо переносит обрезку.',
        'Быстрый рост требует регулярной формировки, чтобы растение оставалось декоративным.',
      ],
    },
    latinName: 'Vitaceae',
    origin: {
      en: 'Temperate and tropical regions worldwide, especially forest edges and climbing habitats.',
      ru: 'Умеренные и тропические регионы мира, особенно лесные опушки и места для лазания.',
    },
    plants: [{ en: 'Cissus rhombifolia', ru: 'Циссус ромболистный' }],
    traits: {
      en: [
        'Flexible stems climb or trail from supports.',
        'Tendrils appear opposite leaves in many species.',
        'Leaves are often lobed, compound, or grape-like.',
        'Pruning encourages branching and a fuller silhouette.',
      ],
      ru: [
        'Гибкие стебли карабкаются по опоре или свисают.',
        'У многих видов усики появляются напротив листьев.',
        'Листья часто лопастные, сложные или похожие на виноградные.',
        'Обрезка стимулирует ветвление и более пышный силуэт.',
      ],
    },
  },
};

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

  return {
    backLabel: modalCopy[locale].backLabel,
    closingNote: seed.closingNote?.[locale] ?? modalCopy[locale].closingNote,
    collectionPlants: seed.plants.map((plant) => ({ image: plant.image ?? image, name: plant[locale] })),
    collectionTitle:
      locale === 'ru'
        ? `Растения из моей коллекции (${seed.plants.length})`
        : `Plants in my collection (${seed.plants.length})`,
    description: seed.description[locale],
    facts: seed.facts[locale],
    factsTitle: modalCopy[locale].factsTitle,
    heroImage: seed.heroImage ?? categoryCutout(id),
    heroPosition: seed.heroPosition ?? { base: 'calc(100% + 132px) top', md: 'calc(100% + 80px) top' },
    heroSize: seed.heroSize ?? { base: '430px auto', md: '560px auto', lg: '640px auto' },
    latinName: seed.latinName,
    origin: {
      mapImage: seed.originMapImage ?? image,
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
  cactaceae: { en: 'Cacti', ru: 'Кактусовые' },
  commelinaceae: { en: 'Spiderwort family', ru: 'Коммелиновые' },
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
  cactaceae: createFamilyDataByLocale('cactaceae', familyTitles.cactaceae, familySeeds.cactaceae),
  commelinaceae: createFamilyDataByLocale(
    'commelinaceae',
    familyTitles.commelinaceae,
    familySeeds.commelinaceae,
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
