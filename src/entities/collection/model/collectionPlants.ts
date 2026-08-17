import type { Locale } from 'src/shared/config';

export type CollectionFamilyId =
  | 'acanthaceae'
  | 'aizoaceae'
  | 'amaryllidaceae'
  | 'apocynaceae'
  | 'araceae'
  | 'arecaceae'
  | 'asparagaceae'
  | 'aspleniaceae'
  | 'asphodelaceae'
  | 'asteraceae'
  | 'balsaminaceae'
  | 'bromeliaceae'
  | 'cactaceae'
  | 'commelinaceae'
  | 'crassulaceae'
  | 'cycadaceae'
  | 'gesneriaceae'
  | 'lamiaceae'
  | 'marantaceae'
  | 'moraceae'
  | 'nephrolepidaceae'
  | 'orchidaceae'
  | 'piperaceae'
  | 'polypodiaceae'
  | 'podocarpaceae'
  | 'vitaceae';

export interface CollectionPlant {
  readonly familyId: CollectionFamilyId;
  readonly id: string;
  readonly image: string;
  readonly name: Record<Locale, string>;
  readonly plantCount: number;
  readonly profile: CollectionPlantProfile;
  readonly profileMainImageInteractive: boolean;
  readonly showProfileImageBadge: boolean;
}

interface PlantProfileFact {
  readonly label: Record<Locale, string>;
  readonly value: Record<Locale, string>;
}

interface PlantProfileCareCard {
  readonly body: Record<Locale, string>;
  readonly title: Record<Locale, string>;
}

interface PlantProfileFooter {
  readonly facts: Record<Locale, readonly string[]>;
  readonly important: Record<Locale, string>;
  readonly problems: Record<Locale, readonly string[]>;
  readonly propagation: Record<Locale, string>;
}

interface PlantProfileQuickFacts {
  readonly growth: Record<Locale, string>;
  readonly height: Record<Locale, string>;
}

interface PlantProfileVariant {
  readonly image: string;
  readonly name: Record<Locale, string>;
}

interface PlantProfileVariants {
  readonly captionsEmbedded?: boolean;
  readonly description: Record<Locale, string>;
  readonly items: readonly PlantProfileVariant[];
  readonly title: Record<Locale, string>;
}

type LocalizedPair = readonly [en: string, ru: string];
type CareDefinition = readonly [title: LocalizedPair, body: LocalizedPair];
type FactDefinition = readonly [label: LocalizedPair, value: LocalizedPair];
type LocalizedListPair = readonly [en: readonly string[], ru: readonly string[]];
type VariantDefinition = readonly [image: string, name: LocalizedPair];

interface ProfileAssets {
  readonly importantImage?: string;
  readonly mainImageVariantIndex?: number;
  readonly propagationIcon?: string;
  readonly propagationImage?: string;
  readonly variants?: PlantProfileVariants;
}

interface CollectionPlantOptions {
  readonly countCover?: boolean;
  readonly plantCount?: number;
  readonly profileMainImageInteractive?: boolean;
  readonly showProfileImageBadge?: boolean;
}

const localized = ([en, ru]: LocalizedPair): Record<Locale, string> => ({ en, ru });

const careCards = (...cards: readonly CareDefinition[]): readonly PlantProfileCareCard[] =>
  cards.map(([title, body]) => ({ body: localized(body), title: localized(title) }));

const profileFacts = (...facts: readonly FactDefinition[]): readonly PlantProfileFact[] =>
  facts.map(([label, value]) => ({ label: localized(label), value: localized(value) }));

const quickFacts = (growth: LocalizedPair, height: LocalizedPair): PlantProfileQuickFacts => ({
  growth: localized(growth),
  height: localized(height),
});

const profileVariants = (
  title: LocalizedPair,
  description: LocalizedPair,
  ...items: readonly VariantDefinition[]
): PlantProfileVariants => ({
  description: localized(description),
  items: items.map(([image, name]) => ({ image, name: localized(name) })),
  title: localized(title),
});

const profileFooter = (
  facts: LocalizedListPair,
  important: LocalizedPair,
  problems: LocalizedListPair,
  propagation: LocalizedPair,
): PlantProfileFooter => ({
  facts: { en: facts[0], ru: facts[1] },
  important: localized(important),
  problems: { en: problems[0], ru: problems[1] },
  propagation: localized(propagation),
});

const collectionPlant = (
  familyId: CollectionFamilyId,
  id: string,
  image: string,
  name: LocalizedPair,
  profile: CollectionPlantProfile,
  countOrOptions: number | CollectionPlantOptions = {},
): CollectionPlant => {
  const options =
    typeof countOrOptions === 'number' ? { plantCount: countOrOptions } : countOrOptions;
  const plantCount =
    options.plantCount ??
    (options.countCover === false ? 0 : 1) + (profile.variants?.items.length ?? 0);

  return {
    familyId,
    id,
    image,
    name: localized(name),
    plantCount,
    profile,
    profileMainImageInteractive: options.profileMainImageInteractive ?? true,
    showProfileImageBadge: options.showProfileImageBadge ?? true,
  };
};

const plantProfile = (
  care: readonly PlantProfileCareCard[],
  difficulty: number,
  facts: readonly PlantProfileFact[],
  footer: PlantProfileFooter,
  latinName: string,
  notes: LocalizedPair,
  overview: LocalizedPair,
  quickFactsValue: PlantProfileQuickFacts,
  secondaryCare: readonly PlantProfileCareCard[],
  assets: ProfileAssets,
): CollectionPlantProfile => ({
  care,
  difficulty,
  facts,
  footer,
  latinName,
  notes: localized(notes),
  overview: localized(overview),
  quickFacts: quickFactsValue,
  secondaryCare,
  ...assets,
});

export interface CollectionPlantProfile {
  readonly care: readonly PlantProfileCareCard[];
  readonly difficulty: number;
  readonly facts: readonly PlantProfileFact[];
  readonly footer: PlantProfileFooter;
  readonly latinName: string;
  readonly notes: Record<Locale, string>;
  readonly overview: Record<Locale, string>;
  readonly importantImage?: string;
  readonly mainImageVariantIndex?: number;
  readonly propagationIcon?: string;
  readonly propagationImage?: string;
  readonly quickFacts: PlantProfileQuickFacts;
  readonly secondaryCare: readonly PlantProfileCareCard[];
  readonly variants?: PlantProfileVariants;
}

const aglaonemaProfile = (
  cultivarName: string,
  coloring: LocalizedPair,
  facts: LocalizedListPair,
  notes: LocalizedPair,
  overview: LocalizedPair,
  height: LocalizedPair,
  assets: ProfileAssets,
): CollectionPlantProfile =>
  plantProfile(
    careCards(
      [
        ['Light', 'Свет'],
        [
          `Bright diffused light without direct midday sun. Brighter filtered light helps preserve ${coloring[0]}.`,
          `Яркий рассеянный свет без прямого полуденного солнца. Более светлое место помогает сохранить ${coloring[1]}.`,
        ],
      ],
      [
        ['Watering', 'Полив'],
        [
          'Water after the top 2–4 cm of soil dries. Drain excess water and do not leave the roots standing in moisture.',
          'Поливайте после просыхания верхних 2–4 см грунта. Сливайте лишнюю воду и не оставляйте корни в сырости.',
        ],
      ],
      [
        ['Humidity', 'Влажность'],
        [
          'Average room humidity is suitable, but keep the plant away from heaters and dry drafts.',
          'Подходит обычная комнатная влажность, но растение лучше держать подальше от батарей и сухих сквозняков.',
        ],
      ],
      [
        ['Temperature', 'Температура'],
        [
          'Keep at 18–27 °C and protect from cold windows, drafts, and temperatures below 15 °C.',
          'Содержите при 18–27 °C, защищая от холодного стекла, сквозняков и температуры ниже 15 °C.',
        ],
      ],
    ),
    2,
    profileFacts(
      [
        ['Family', 'Семейство'],
        ['Araceae', 'Ароидные'],
      ],
      [
        ['Origin', 'Происхождение'],
        [
          'Cultivated hybrid; the genus comes from tropical Asia',
          'Культурный гибрид; род происходит из тропической Азии',
        ],
      ],
      [
        ['Type', 'Тип'],
        [
          'Evergreen ornamental foliage perennial',
          'Вечнозелёный декоративно-лиственный многолетник',
        ],
      ],
    ),
    profileFooter(
      facts,
      [
        'The sap contains calcium oxalate crystals. Keep away from children and pets and wash hands after pruning.',
        'Сок содержит кристаллы оксалата кальция. Держите растение подальше от детей и животных, после обрезки мойте руки.',
      ],
      [
        [
          'Yellow, soft leaves usually indicate excess moisture or cold roots.',
          'Brown tips can appear from very dry air or salt buildup in the soil.',
          `If ${coloring[0]} fades, the plant usually needs more diffused light.`,
        ],
        [
          'Жёлтые мягкие листья обычно говорят о переувлажнении или переохлаждении корней.',
          'Коричневые кончики могут появляться из-за сухого воздуха или накопления солей в грунте.',
          'Характерная окраска бледнеет — растению обычно не хватает рассеянного света.',
        ],
      ],
      [
        'Propagate by dividing a mature bush or by rooting stem cuttings during the warm growing season.',
        'Размножайте делением взрослого куста или укоренением стеблевых черенков в тёплый период роста.',
      ],
    ),
    `Aglaonema '${cultivarName}'`,
    notes,
    overview,
    quickFacts(['Moderate', 'Умеренная'], height),
    careCards(
      [
        ['Soil', 'Грунт'],
        [
          'Use a loose, well-drained mix: 75% peat-free houseplant compost and 25% perlite or fine pumice.',
          'Используйте рыхлую, хорошо дренированную смесь: 75% безторфяного грунта для комнатных растений и 25% перлита или мелкой пемзы.',
        ],
      ],
      [
        ['Repotting', 'Пересадка'],
        [
          'Repot in spring when roots fill the pot, choosing a container only slightly larger than the previous one.',
          'Пересаживайте весной, когда корни заполнят горшок, выбирая ёмкость лишь немного больше предыдущей.',
        ],
      ],
      [
        ['Feeding', 'Подкормка'],
        [
          'Feed monthly in spring and summer with a balanced foliage fertilizer at half strength.',
          'Весной и летом подкармливайте раз в месяц половинной дозой сбалансированного удобрения для декоративно-лиственных.',
        ],
      ],
      [
        ['Grooming', 'Уход за листьями'],
        [
          'Remove yellow leaves at the base and wipe healthy leaves with a soft damp cloth.',
          'Удаляйте пожелтевшие листья у основания, а здоровые протирайте мягкой влажной тканью.',
        ],
      ],
    ),
    assets,
  );

interface TillandsiaProfileDefinition {
  readonly assets: ProfileAssets;
  readonly facts: LocalizedListPair;
  readonly height: LocalizedPair;
  readonly latinName: string;
  readonly notes: LocalizedPair;
  readonly origin: LocalizedPair;
  readonly overview: LocalizedPair;
}

const tillandsiaProfile = ({
  assets,
  facts,
  height,
  latinName,
  notes,
  origin,
  overview,
}: TillandsiaProfileDefinition): CollectionPlantProfile =>
  plantProfile(
    careCards(
      [
        ['Light', 'Освещение'],
        [
          'Give bright diffused light with gentle morning or evening sun. Introduce direct light gradually: harsh midday rays can scorch the leaves, while deep shade weakens the rosette.',
          'Нужен яркий рассеянный свет с мягким утренним или вечерним солнцем. К прямому свету приучайте постепенно: жёсткие полуденные лучи обжигают листья, а глубокая тень ослабляет розетку.',
        ],
      ],
      [
        ['Watering', 'Полив'],
        [
          'Wet the whole plant thoroughly with soft rain, filtered or settled water about once or twice a week, adjusting to heat and airflow. A short soak or a generous rinse is more reliable than light misting alone.',
          'Один-два раза в неделю полностью смачивайте растение мягкой дождевой, фильтрованной или отстоянной водой, корректируя частоту по жаре и движению воздуха. Короткое замачивание или обильное промывание надёжнее одних лёгких опрыскиваний.',
        ],
      ],
      [
        ['Drying and airflow', 'Просушка и воздух'],
        [
          'Shake off excess water after every rinse and dry the plant upside down until no water remains at the base of the leaves. Good air movement and complete drying within a few hours are essential.',
          'После каждого промывания стряхивайте лишнюю воду и сушите растение вверх дном, пока у основания листьев не останется воды. Необходимы хорошее движение воздуха и полная просушка за несколько часов.',
        ],
      ],
      [
        ['Temperature', 'Температура'],
        [
          'Keep at about 18–30 °C and protect from cold draughts or icy glass. In a cooler, darker season, wet less often and make sure the plant is dry before night.',
          'Содержите примерно при 18–30 °C, защищая от холодных сквозняков и ледяного стекла. В прохладный тёмный сезон смачивайте реже и обязательно просушивайте растение до ночи.',
        ],
      ],
    ),
    2,
    profileFacts(
      [
        ['Family', 'Семейство'],
        ['Bromeliad family (Bromeliaceae)', 'Бромелиевые (Bromeliaceae)'],
      ],
      [['Origin', 'Происхождение'], origin],
      [
        ['Plant type', 'Тип растения'],
        ['Soil-free evergreen epiphyte', 'Вечнозелёный эпифит без грунта'],
      ],
    ),
    profileFooter(
      facts,
      [
        'Never leave water trapped inside the leaf bases. After soaking, shake the plant carefully and dry it upside down before returning it to a holder.',
        'Не оставляйте воду между основаниями листьев. После замачивания аккуратно стряхните растение и высушите вверх дном, прежде чем возвращать в держатель.',
      ],
      [
        [
          'Dry curled tips — increase watering frequency and check for hot direct sun.',
          'A dark soft base or musty smell — improve airflow, dry immediately and inspect for rot.',
          'Pale stretched growth — move gradually to brighter diffused light.',
          'White cottony clusters or scale-like bumps — isolate and inspect for pests.',
        ],
        [
          'Сухие скрученные кончики — увеличьте частоту полива и проверьте, нет ли жаркого прямого солнца.',
          'Тёмное мягкое основание или затхлый запах — улучшите движение воздуха, сразу просушите и проверьте на гниль.',
          'Бледный вытянутый рост — постепенно переставьте на более яркий рассеянный свет.',
          'Белые ватные комочки или бугорки, похожие на щитки, — изолируйте растение и проверьте на вредителей.',
        ],
      ],
      [
        'Leave pups with the mother plant for a fuller cluster, or separate one when it reaches about one-third to one-half of the mother rosette and releases with a gentle twist.',
        'Оставляйте деток с материнским растением для пышной группы или отделяйте, когда они достигнут примерно трети–половины размера материнской розетки и легко отделятся аккуратным поворотом.',
      ],
    ),
    latinName,
    notes,
    overview,
    quickFacts(['Slow to moderate', 'Медленный или умеренный'], height),
    careCards(
      [
        ['Mounting', 'Размещение'],
        [
          'Place on cork, a dry branch or an open holder that does not trap water. Avoid bare copper, tight wire and glue over the living base; the plant should remain easy to remove for watering and drying.',
          'Разместите на пробке, сухой ветке или в открытом держателе, не задерживающем воду. Избегайте необработанной меди, тугой проволоки и клея на живом основании; растение должно легко сниматься для полива и просушки.',
        ],
      ],
      [
        ['Feeding', 'Подкормки'],
        [
          'During active growth, add a quarter-strength bromeliad or orchid fertiliser to the water about once a month. Occasionally rinse the foliage with clean soft water to prevent salt buildup.',
          'В период активного роста примерно раз в месяц добавляйте в воду четверть дозы удобрения для бромелиевых или орхидей. Иногда промывайте листву чистой мягкой водой, чтобы не накапливались соли.',
        ],
      ],
      [
        ['Cleaning', 'Очищение'],
        [
          'Rinse away dust instead of wiping the leaves, because rubbing damages their moisture-absorbing trichomes. Remove only loose, completely dry leaf fragments and never use leaf shine.',
          'Смывайте пыль водой вместо протирания: трение повреждает поглощающие влагу трихомы. Удаляйте только свободные, полностью высохшие фрагменты листьев и не используйте полироль.',
        ],
      ],
      [
        ['Seasonal rhythm', 'Сезонный ритм'],
        [
          'In warm bright months, check the plant often and water more regularly. In winter, use the brightest suitable position, wet less often and prioritise complete drying.',
          'В тёплые светлые месяцы чаще проверяйте растение и регулярно увлажняйте. Зимой держите в самом светлом подходящем месте, мочите реже и особое внимание уделяйте полной просушке.',
        ],
      ],
    ),
    assets,
  );

interface SimplePlantProfileDefinition {
  readonly assets: ProfileAssets;
  readonly difficulty: number;
  readonly facts: LocalizedListPair;
  readonly family: LocalizedPair;
  readonly feeding: LocalizedPair;
  readonly growth: LocalizedPair;
  readonly height: LocalizedPair;
  readonly humidity: LocalizedPair;
  readonly important: LocalizedPair;
  readonly latinName: string;
  readonly light: LocalizedPair;
  readonly notes: LocalizedPair;
  readonly origin: LocalizedPair;
  readonly overview: LocalizedPair;
  readonly plantType: LocalizedPair;
  readonly problems: LocalizedListPair;
  readonly propagation: LocalizedPair;
  readonly repotting: LocalizedPair;
  readonly secondaryCare: CareDefinition;
  readonly soil: LocalizedPair;
  readonly temperature: LocalizedPair;
  readonly watering: LocalizedPair;
}

const simplePlantProfile = ({
  assets,
  difficulty,
  facts,
  family,
  feeding,
  growth,
  height,
  humidity,
  important,
  latinName,
  light,
  notes,
  origin,
  overview,
  plantType,
  problems,
  propagation,
  repotting,
  secondaryCare,
  soil,
  temperature,
  watering,
}: SimplePlantProfileDefinition): CollectionPlantProfile =>
  plantProfile(
    careCards(
      [['Light', 'Освещение'], light],
      [['Watering', 'Полив'], watering],
      [['Humidity', 'Влажность'], humidity],
      [['Temperature', 'Температура'], temperature],
    ),
    difficulty,
    profileFacts(
      [['Family', 'Семейство'], family],
      [['Origin', 'Происхождение'], origin],
      [['Plant type', 'Тип растения'], plantType],
    ),
    profileFooter(facts, important, problems, propagation),
    latinName,
    notes,
    overview,
    quickFacts(growth, height),
    careCards(
      [['Soil', 'Грунт'], soil],
      [['Repotting', 'Пересадка'], repotting],
      [['Feeding', 'Подкормки'], feeding],
      secondaryCare,
    ),
    assets,
  );

const chlorophytumCollectionProfile = (
  latinName: string,
  leafDescription: LocalizedPair,
  notes: LocalizedPair,
  overview: LocalizedPair,
  assets: ProfileAssets,
): CollectionPlantProfile =>
  simplePlantProfile({
    assets,
    difficulty: 1,
    facts: [
      [
        `${leafDescription[0]} form a fountain-shaped rosette.`,
        'Long runners carry small white flowers and ready-made plantlets.',
        'Slightly fleshy roots store water, so short dry spells are safer than stagnant moisture.',
      ],
      [
        `${leafDescription[1]} образуют фонтанообразную розетку.`,
        'На длинных цветоносах появляются белые цветки и готовые детки.',
        'Слегка мясистые корни запасают воду, поэтому короткая пересушка безопаснее застоя влаги.',
      ],
    ],
    family: ['Asparagus family (Asparagaceae)', 'Спаржевые (Asparagaceae)'],
    feeding: [
      'Feed every three to four weeks from spring to early autumn with a balanced foliage fertiliser at half strength.',
      'С весны до начала осени подкармливайте раз в три-четыре недели половинной дозой удобрения для декоративно-лиственных.',
    ],
    growth: ['Fast', 'Быстрый'],
    height: ['30–60 cm, runners longer', '30–60 см, цветоносы длиннее'],
    humidity: [
      'Average room humidity is sufficient. Dry air may brown the tips, but constant misting is unnecessary.',
      'Обычной комнатной влажности достаточно. В сухом воздухе кончики могут коричневеть, но постоянные опрыскивания не нужны.',
    ],
    important: [
      'Brown tips are often a response to hard water, accumulated salts or irregular watering. Use soft settled water and occasionally flush the substrate.',
      'Коричневые кончики часто появляются из-за жёсткой воды, накопления солей или нерегулярного полива. Используйте мягкую отстоянную воду и иногда промывайте грунт.',
    ],
    latinName,
    light: [
      'Give bright diffused light with gentle morning or evening sun. It tolerates a little shade, but grows denser and sends out more runners in a brighter position.',
      'Нужен яркий рассеянный свет с мягким утренним или вечерним солнцем. Растение переносит полутень, но на более светлом месте становится гуще и активнее выпускает цветоносы.',
    ],
    notes,
    origin: [
      'West tropical Africa and Ethiopia to South Africa',
      'От Западной тропической Африки и Эфиопии до Южной Африки',
    ],
    overview,
    plantType: ['Evergreen rosette-forming perennial', 'Вечнозелёный розеточный многолетник'],
    problems: [
      [
        'Brown dry tips — improve water quality and check for salt buildup.',
        'Pale weak leaves — move gradually to brighter diffused light.',
        'Soft yellow centre — stop watering and inspect the crown and roots for rot.',
      ],
      [
        'Сухие коричневые кончики — улучшите качество воды и проверьте накопление солей.',
        'Бледные слабые листья — постепенно переставьте на более яркий рассеянный свет.',
        'Мягкая желтеющая середина — прекратите полив и проверьте розетку и корни на гниль.',
      ],
    ],
    propagation: [
      'Wait until a plantlet on a runner has several leaves and small root bumps. Pin it onto moist airy soil while still attached, or cut it off and root it directly in a small pot.',
      'Дождитесь, пока у детки на цветоносе появятся несколько листьев и зачатки корней. Прижмите её к влажному воздушному грунту, не отделяя, или срежьте и укорените сразу в маленьком горшке.',
    ],
    repotting: [
      'Repot in spring when thick roots crowd the pot. Choose a container only one size larger and keep the crown above the soil line.',
      'Пересаживайте весной, когда толстые корни заполнят горшок. Берите ёмкость лишь на размер больше и не заглубляйте центр розетки.',
    ],
    secondaryCare: [
      ['Grooming', 'Уход за листьями'],
      [
        'Trim only the dry brown portion of a leaf tip, following its natural shape. Remove spent runners only after the desired plantlets have been rooted.',
        'Срезайте только сухую коричневую часть кончика, повторяя естественную форму листа. Отцветшие цветоносы удаляйте после укоренения нужных деток.',
      ],
    ],
    soil: [
      'Use a loose mix of about 70% houseplant compost and 30% perlite, fine bark or pumice, always in a pot with drainage holes.',
      'Используйте рыхлую смесь примерно из 70% грунта для комнатных растений и 30% перлита, мелкой коры или пемзы, обязательно в горшке с дренажными отверстиями.',
    ],
    temperature: [
      'Keep at 16–27 °C and protect from cold glass and draughts. Growth slows noticeably in a cool, dark winter.',
      'Содержите при 16–27 °C и защищайте от холодного стекла и сквозняков. В прохладную тёмную зиму рост заметно замедляется.',
    ],
    watering: [
      'Water thoroughly after the top 2–3 cm of soil dries, then drain the saucer. Reduce frequency in winter and never keep the root ball constantly wet.',
      'Обильно поливайте после просыхания верхних 2–3 см грунта и сливайте воду из поддона. Зимой сокращайте частоту и не держите земляной ком постоянно мокрым.',
    ],
  });

const epipremnumCollectionProfile = (
  latinName: string,
  colorDescription: LocalizedPair,
  notes: LocalizedPair,
  overview: LocalizedPair,
  assets: ProfileAssets,
): CollectionPlantProfile =>
  simplePlantProfile({
    assets,
    difficulty: 1,
    facts: [
      [
        `Each leaf develops its own ${colorDescription[0]}.`,
        'The vine climbs with aerial roots or trails freely from a shelf.',
        'Larger leaves develop when stems receive bright light and a support.',
      ],
      [
        `${colorDescription[1]} на каждом листе складывается по-своему.`,
        'Лиана цепляется воздушными корнями за опору или свободно свисает с полки.',
        'При ярком свете и опоре новые листья становятся крупнее.',
      ],
    ],
    family: ['Arum family (Araceae)', 'Ароидные (Araceae)'],
    feeding: [
      'Feed every three to four weeks in spring and summer with a balanced foliage fertiliser at half strength.',
      'Весной и летом подкармливайте раз в три-четыре недели половинной дозой удобрения для декоративно-лиственных.',
    ],
    growth: ['Fast', 'Быстрый'],
    height: ['Trails 1–2 m indoors', 'Побеги 1–2 м в комнате'],
    humidity: [
      'Average room humidity is suitable. Keep the plant away from a hot radiator and wipe dust from the leaves instead of misting constantly.',
      'Подходит обычная комнатная влажность. Держите растение подальше от горячей батареи и протирайте листья от пыли вместо постоянных опрыскиваний.',
    ],
    important: [
      'The sap contains calcium oxalate crystals and irritates skin and mucous membranes. Wear gloves when pruning and keep cuttings away from children and pets.',
      'Сок содержит кристаллы оксалата кальция и раздражает кожу и слизистые. При обрезке надевайте перчатки и держите черенки подальше от детей и животных.',
    ],
    latinName,
    light: [
      'Give bright diffused light without harsh midday sun. Better light produces denser growth and preserves the characteristic variegation.',
      'Нужен яркий рассеянный свет без жёсткого полуденного солнца. Хорошее освещение делает куст гуще и сохраняет характерную пестролистность.',
    ],
    notes,
    origin: [
      "Cultivated form of a species native to Mo'orea in the Society Islands",
      'Культурная форма вида с острова Муреа в архипелаге Общества',
    ],
    overview,
    plantType: ['Evergreen tropical climber', 'Вечнозелёная тропическая лиана'],
    problems: [
      [
        'Yellow soft leaves — let the substrate dry and inspect the roots.',
        'Long bare internodes — increase light and prune above a node.',
        'Faded variegation — move gradually to a brighter diffused position.',
      ],
      [
        'Мягкие жёлтые листья — просушите грунт и проверьте корни.',
        'Длинные голые междоузлия — добавьте света и обрежьте побег над узлом.',
        'Пестролистность бледнеет — постепенно переставьте на более яркий рассеянный свет.',
      ],
    ],
    propagation: [
      'Cut the vine into sections with one leaf and one healthy node. Root the node in water or an airy moist mix, then pot several rooted cuttings together for a fuller plant.',
      'Разрежьте побег на фрагменты с одним листом и здоровым узлом. Укореняйте узел в воде или воздушном влажном грунте, а затем посадите несколько черенков вместе для более пышного куста.',
    ],
    repotting: [
      'Repot in spring when roots circle the pot, choosing a container only slightly larger. Refresh the top layer yearly if a full repot is unnecessary.',
      'Пересаживайте весной, когда корни оплетут горшок, выбирая ёмкость лишь немного больше. Если полная пересадка не нужна, ежегодно обновляйте верхний слой грунта.',
    ],
    secondaryCare: [
      ['Training and pruning', 'Опора и обрезка'],
      [
        'Pin vines to a moss pole for larger leaves, or trim long stems above a node to keep the plant compact and encourage branching.',
        'Закрепляйте побеги на моховой опоре для более крупных листьев или обрезайте длинные стебли над узлом, чтобы сохранить компактность и стимулировать ветвление.',
      ],
    ],
    soil: [
      'Use an airy mix of about 60% houseplant compost, 20% fine bark and 20% perlite or pumice.',
      'Используйте воздушную смесь примерно из 60% грунта для комнатных растений, 20% мелкой коры и 20% перлита или пемзы.',
    ],
    temperature: [
      'Keep at 18–28 °C and protect from cold draughts and temperatures below 15 °C.',
      'Содержите при 18–28 °C, защищая от холодных сквозняков и температуры ниже 15 °C.',
    ],
    watering: [
      'Water after the top 3–5 cm of soil dries. Moisten the mix fully, drain excess water and avoid watering again while the pot still feels heavy.',
      'Поливайте после просыхания верхних 3–5 см грунта. Полностью промочите смесь, слейте лишнюю воду и не поливайте снова, пока горшок остаётся тяжёлым.',
    ],
  });

const syngoniumCollectionProfile = (
  latinName: string,
  leafDescription: LocalizedPair,
  notes: LocalizedPair,
  overview: LocalizedPair,
  assets: ProfileAssets,
): CollectionPlantProfile =>
  simplePlantProfile({
    assets,
    difficulty: 2,
    facts: [
      [
        `Every leaf develops its own ${leafDescription[0]}.`,
        'Juvenile arrowhead leaves may become more divided as the vine matures.',
        'Several rooted cuttings in one pot create a fuller, naturally irregular plant.',
      ],
      [
        `${leafDescription[1]} на каждом листе складывается по-своему.`,
        'Ювенильные стреловидные листья по мере взросления лианы могут становиться более рассечёнными.',
        'Несколько укоренённых черенков в одном горшке образуют более пышный и естественно неровный куст.',
      ],
    ],
    family: ['Arum family (Araceae)', 'Ароидные (Araceae)'],
    feeding: [
      'Feed every three to four weeks in spring and summer with a balanced foliage fertiliser at half strength.',
      'Весной и летом подкармливайте раз в три-четыре недели половинной дозой удобрения для декоративно-лиственных.',
    ],
    growth: ['Fast', 'Быстрый'],
    height: ['Vines 60–150 cm indoors', 'Побеги 60–150 см в комнате'],
    humidity: [
      'Average room humidity is suitable. Keep the plant away from hot radiators and very dry draughts.',
      'Подходит обычная комнатная влажность. Держите растение подальше от горячих батарей и очень сухих сквозняков.',
    ],
    important: [
      'The sap contains irritating calcium oxalate crystals. Wear gloves when pruning and keep the plant and cuttings away from children and pets.',
      'Сок содержит раздражающие кристаллы оксалата кальция. При обрезке надевайте перчатки и держите растение и черенки подальше от детей и животных.',
    ],
    latinName,
    light: [
      'Give bright diffused light without harsh midday sun. Variegated leaves keep their characteristic colour best in steady filtered light.',
      'Нужен яркий рассеянный свет без жёсткого полуденного солнца. Пестролистные сорта лучше сохраняют характерную окраску при стабильном фильтрованном освещении.',
    ],
    notes,
    origin: [
      'Cultivated form; the genus is native to tropical Central and South America',
      'Культурная форма; род происходит из тропиков Центральной и Южной Америки',
    ],
    overview,
    plantType: ['Evergreen tropical climber', 'Вечнозелёная тропическая лиана'],
    problems: [
      [
        'Yellow soft leaves — let the substrate dry and inspect the roots.',
        'Long bare internodes — increase diffused light and prune above a node.',
        'Brown dry edges — check watering regularity, hot air and salt buildup.',
      ],
      [
        'Мягкие жёлтые листья — просушите грунт и проверьте корни.',
        'Длинные голые междоузлия — добавьте рассеянного света и обрежьте побег над узлом.',
        'Сухие коричневые края — проверьте регулярность полива, горячий воздух и накопление солей.',
      ],
    ],
    propagation: [
      'Take a stem section with at least one healthy node. Root the node in water or a lightly moist airy mix, then plant several rooted cuttings together for a fuller pot.',
      'Возьмите часть стебля хотя бы с одним здоровым узлом. Укорените узел в воде или слегка влажном воздушном грунте, затем посадите несколько черенков вместе для пышного куста.',
    ],
    repotting: [
      'Repot in spring when roots fill the pot, choosing a container only slightly larger and keeping the stem bases at their previous depth.',
      'Пересаживайте весной после заполнения горшка корнями, выбирая ёмкость лишь немного больше и сохраняя прежнюю глубину основания побегов.',
    ],
    secondaryCare: [
      ['Shaping a full plant', 'Формирование пышного куста'],
      [
        'Trim stretched stems above a node, root the tops and return them to the same pot. Leave a few stems at different lengths so the plant keeps a natural silhouette.',
        'Обрезайте вытянувшиеся побеги над узлом, укореняйте верхушки и подсаживайте их в тот же горшок. Оставляйте стебли разной длины, чтобы куст сохранял естественный силуэт.',
      ],
    ],
    soil: [
      'Use an airy mix of about 55% houseplant compost, 25% fine bark and 20% perlite or pumice.',
      'Используйте воздушную смесь примерно из 55% грунта для комнатных растений, 25% мелкой коры и 20% перлита или пемзы.',
    ],
    temperature: [
      'Keep at 18–28 °C and protect from cold glass, draughts and temperatures below 15 °C.',
      'Содержите при 18–28 °C, защищая от холодного стекла, сквозняков и температуры ниже 15 °C.',
    ],
    watering: [
      'Water after the top 3–4 cm of substrate dries. Moisten evenly, drain completely and do not water again while the pot still feels heavy.',
      'Поливайте после просыхания верхних 3–4 см грунта. Равномерно промочите смесь, полностью слейте лишнюю воду и не поливайте снова, пока горшок остаётся тяжёлым.',
    ],
  });

const allCollectionPlants: readonly CollectionPlant[] = [
  collectionPlant(
    'araceae',
    'syngonium-iron-brown',
    '/plant-profile/syngonium-iron-brown.webp',
    ["Syngonium 'Iron Brown'", 'Сингониум Айрон Браун'],
    syngoniumCollectionProfile(
      "Syngonium podophyllum 'Iron Brown'",
      [
        'smoky olive-brown colour with muted bronze undertones',
        'дымчато-оливковая окраска с приглушённым бронзовым оттенком',
      ],
      [
        'My plant began as one modest dark shoot. I am gradually rooting its tops back into the pot so it can become an informal layered bush without losing its deep colour.',
        'Моё растение начиналось с одного скромного тёмного побега. Я постепенно укореняю его верхушки обратно в горшок, чтобы получить свободный многоярусный куст и сохранить глубокую окраску.',
      ],
      [
        'Iron Brown is a dark-leaved arrowhead vine whose mature foliage combines olive, cocoa and bronze tones. Its restrained colour and softly quilted leaves make it quieter than bright variegated syngoniums.',
        'Айрон Браун — темнолистная лиана со стреловидными листьями, в окраске которых сочетаются оливковые, шоколадные и бронзовые тона. Сдержанный цвет и мягко фактурные листья отличают её от ярких пестролистных сингониумов.',
      ],
      {
        importantImage: '/plant-profile/syngonium-iron-brown-important.webp',
        propagationImage: '/plant-profile/syngonium-iron-brown-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'syngonium-mottled',
    '/plant-profile/syngonium-mottled.webp',
    ["Syngonium 'Mottled'", 'Сингониум Мотлед'],
    syngoniumCollectionProfile(
      "Syngonium podophyllum 'Mottled'",
      [
        'dense, non-repeating lime-and-green marbling',
        'густой неповторяющийся лаймово-зелёный мраморный рисунок',
      ],
      [
        'The young plant already shows a different pattern on every leaf. I want to build its future crown from several cuttings while keeping a few longer, freer stems.',
        'У молодого растения уже нет двух одинаковых листьев. Будущую крону я хочу собрать из нескольких черенков, сохранив пару более длинных свободных побегов.',
      ],
      [
        'Mottled is valued for arrowhead leaves covered with irregular lime speckles, strokes and green islands. Light and leaf age change the balance of the pattern, so the whole plant looks lively rather than uniform.',
        'Мотлед ценят за стреловидные листья с хаотичными лаймовыми крапинами, штрихами и зелёными островками. Свет и возраст листа меняют рисунок, поэтому весь куст выглядит живым и неоднородным.',
      ],
      {
        importantImage: '/plant-profile/syngonium-mottled-important.webp',
        propagationImage: '/plant-profile/syngonium-mottled-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'syngonium-lime-soda',
    '/plant-profile/syngonium-lime-soda.webp',
    ["Syngonium 'Lime Soda'", 'Сингониум Лайм Сода'],
    syngoniumCollectionProfile(
      "Syngonium podophyllum 'Lime Soda'",
      [
        'fresh lime colour and delicate rosy veins on pale young leaves',
        'свежая лаймовая окраска и нежные розоватые жилки на светлых молодых листьях',
      ],
      [
        'I am letting this light little plant gain strength before its first shaping. Later, rooted tops will return to the same pot and form an airy lime crown.',
        'Я даю этому светлому малышу набраться сил до первой формировки. Позже укоренённые верхушки вернутся в тот же горшок и соберут воздушную лаймовую крону.',
      ],
      [
        'Lime Soda has luminous yellow-green foliage: young leaves can show a soft pink flush along the veins while older leaves settle into deeper green. The changing tones give the plant depth even without strong variegation.',
        'У Лайм Соды светящаяся жёлто-зелёная листва: на молодых листьях вдоль жилок может появляться нежный розовый оттенок, а старые становятся глубже зелёными. Смена тонов придаёт кусту объём даже без контрастной вариегатности.',
      ],
      {
        importantImage: '/plant-profile/syngonium-lime-soda-important.webp',
        propagationImage: '/plant-profile/syngonium-lime-soda-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'syngonium-auritum',
    '/plant-profile/syngonium-auritum.webp',
    ['Eared syngonium', 'Сингониум Ауритум'],
    syngoniumCollectionProfile(
      'Syngonium auritum',
      [
        'compound leaves formed by one large central and two smaller lateral leaflets',
        'сложные листья из одной крупной центральной и двух меньших боковых пластинок',
      ],
      [
        'Each petiole carries one distinctive three-part leaf: all three separate leaflets meet at a shared junction. I will root several tops together while keeping these junctions visible in the loose crown.',
        'Каждый черешок несёт один характерный тройчатый лист: три отдельные листовые пластинки сходятся в общей точке. Я укореню несколько верхушек вместе, сохранив эти соединения хорошо заметными в свободной кроне.',
      ],
      [
        'My Syngonium auritum is recognisable by its compound trifoliate foliage. A single petiole ends in three separate glossy green leaflets: one large upright central leaflet and two smaller lateral ones, each with a softer lime zone along its midrib.',
        'Мой Сингониум Ауритум узнаваем по сложным тройчатым листьям. Один черешок заканчивается тремя отдельными глянцевыми зелёными пластинками: крупной вертикальной центральной и двумя меньшими боковыми, у каждой из которых вдоль жилки проходит мягкая лаймовая зона.',
      ],
      {
        importantImage: '/plant-profile/syngonium-auritum-important.webp',
        propagationImage: '/plant-profile/syngonium-auritum-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'syngonium-pink-splash',
    '/plant-profile/syngonium-pink-splash.webp',
    ["Syngonium 'Pink Splash'", 'Сингониум Пинк Сплэш'],
    syngoniumCollectionProfile(
      "Syngonium podophyllum 'Pink Splash'",
      [
        'scattered pink splashes and freckles over a green base',
        'разбросанные розовые мазки и крапины по зелёному фону',
      ],
      [
        'The original vine is still rather loose, but its leaves already vary beautifully. I will root selected nodes together instead of forcing a perfectly round crown.',
        'Исходная лиана пока довольно свободная, но листья уже красиво отличаются друг от друга. Я укореню выбранные узлы вместе, не пытаясь сделать крону идеально круглой.',
      ],
      [
        'Pink Splash produces an unpredictable pink pattern: one leaf may carry only a few freckles while the next opens with a broad blush. Good light supports the colour, but every new leaf remains a surprise.',
        'Пинк Сплэш даёт непредсказуемый розовый рисунок: на одном листе бывает лишь несколько крапин, а следующий раскрывается с широким румянцем. Хороший свет поддерживает окраску, но каждый новый лист остаётся сюрпризом.',
      ],
      {
        importantImage: '/plant-profile/syngonium-pink-splash-important.webp',
        propagationImage: '/plant-profile/syngonium-pink-splash-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'syngonium-silver-pearl',
    '/plant-profile/syngonium-silver-pearl.webp',
    ["Syngonium 'Silver Pearl'", 'Сингониум Сильвер Перл'],
    syngoniumCollectionProfile(
      "Syngonium podophyllum 'Silver Pearl'",
      [
        'soft pearl-silver surface with narrow green margins',
        'мягкая жемчужно-серебристая поверхность с узкой зелёной каймой',
      ],
      [
        'This plant arrived as a few pale leaves on long petioles. A group of rooted tops should make it fuller while leaving enough space for the silver blades to remain readable.',
        'Растение досталось мне с несколькими светлыми листьями на длинных черешках. Группа укоренённых верхушек сделает его пышнее, но оставит достаточно воздуха, чтобы серебристые пластины не терялись.',
      ],
      [
        'Silver Pearl is a calm, luminous cultivar with matte silvery leaves, fine green edging and greener young growth. Its beauty is in subtle texture rather than dramatic patches.',
        'Сильвер Перл — спокойный светящийся сорт с матовыми серебристыми листьями, тонкой зелёной каймой и более зелёным молодым приростом. Его красота строится на тонкой фактуре, а не на резких пятнах.',
      ],
      {
        importantImage: '/plant-profile/syngonium-silver-pearl-important.webp',
        propagationImage: '/plant-profile/syngonium-silver-pearl-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'syngonium-white-panda',
    '/plant-profile/syngonium-white-panda.webp',
    ["Syngonium 'White Panda'", 'Сингониум Панда белая'],
    syngoniumCollectionProfile(
      "Syngonium podophyllum 'White Panda'",
      [
        'large irregular dark-green sectors over milky mint foliage',
        'крупные хаотичные тёмно-зелёные секторы по молочно-мятной листве',
      ],
      [
        'The pale plant is still compact, so I am especially careful not to rush it with water. I will keep greener shoots in the future bush to support steady growth.',
        'Светлое растение пока компактное, поэтому я особенно не тороплю его лишним поливом. В будущем кусте я сохраню более зелёные побеги, чтобы поддерживать стабильный рост.',
      ],
      [
        'White Panda combines very pale mint leaves with strong green sectors and speckling. Because highly pale leaves contain less chlorophyll, a balanced mix of light and greener foliage is important.',
        'Панда белая сочетает очень светлые мятные листья с контрастными зелёными секторами и крапом. Поскольку в сильно осветлённых участках меньше хлорофилла, важны баланс света и наличие более зелёной листвы.',
      ],
      {
        importantImage: '/plant-profile/syngonium-white-panda-important.webp',
        propagationImage: '/plant-profile/syngonium-white-panda-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'syngonium-confetti-milk',
    '/plant-profile/syngonium-confetti-milk.webp',
    ["Syngonium 'Confetti Milk'", 'Сингониум Конфетти Милк'],
    syngoniumCollectionProfile(
      "Syngonium podophyllum 'Confetti Milk'",
      [
        'milky mint base scattered with fine dusty-pink confetti',
        'молочно-мятный фон с мелким пыльно-розовым конфетти',
      ],
      [
        'The young leaves are already softly speckled rather than loudly variegated. I plan to preserve that delicate look in a loose bush made from several cuttings.',
        'Молодые листья уже покрыты мягким крапом без слишком резкой пестроты. Я хочу сохранить эту деликатность в свободном кусте из нескольких черенков.',
      ],
      [
        'Confetti Milk has pale creamy-mint foliage dusted with fine pink marks and occasional larger splashes. Greener and paler leaves together create its characteristic milky depth.',
        'У Конфетти Милк светлая кремово-мятная листва с мелкими розовыми отметинами и редкими крупными мазками. Сочетание более зелёных и более светлых листьев создаёт характерную молочную глубину.',
      ],
      {
        importantImage: '/plant-profile/syngonium-confetti-milk-important.webp',
        propagationImage: '/plant-profile/syngonium-confetti-milk-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'syngonium-flexid',
    '/plant-profile/syngonium-flexid.webp',
    ["Syngonium 'Flexid'", 'Сингониум Флексид'],
    syngoniumCollectionProfile(
      "Syngonium podophyllum 'Flexid'",
      [
        'muted salmon, beige-green and olive marbling',
        'приглушённая лососёвая, бежево-зелёная и оливковая мраморность',
      ],
      [
        'This plant changes noticeably from leaf to leaf: some blades are warm and pink, others remain olive. I will let that uneven rhythm guide the shape of the future bush.',
        'Это растение заметно меняется от листа к листу: одни пластины тёплые и розоватые, другие остаются оливковыми. Этому неровному ритму я позволю определить форму будущего куста.',
      ],
      [
        'Flexid is a warm-toned syngonium with dusty salmon, beige and olive-green areas flowing into one another. Its subdued palette looks especially natural when leaves of different ages are kept together.',
        'Флексид — сингониум тёплых тонов, в котором пыльно-лососёвые, бежевые и оливково-зелёные участки переходят друг в друга. Сдержанная палитра особенно естественно выглядит, когда в кусте остаются листья разного возраста.',
      ],
      {
        importantImage: '/plant-profile/syngonium-flexid-important.webp',
        propagationImage: '/plant-profile/syngonium-flexid-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'syngonium-panda',
    '/plant-profile/syngonium-panda.webp',
    ["Syngonium 'Panda'", 'Сингониум Панда'],
    syngoniumCollectionProfile(
      "Syngonium podophyllum 'Panda'",
      [
        'irregular silver-mint brush strokes over deep green',
        'хаотичные серебристо-мятные мазки по глубокому зелёному фону',
      ],
      [
        'The current plant has only a few broad leaves, each marked differently. I will return rooted tops to its pot and keep the crown slightly sprawling rather than overly tidy.',
        'Сейчас у растения всего несколько широких листьев, и каждый размечен по-своему. Я верну укоренённые верхушки в его горшок и сохраню крону немного раскидистой, а не чрезмерно аккуратной.',
      ],
      [
        'Panda has deep green arrowhead leaves crossed by irregular silver-mint strokes near the veins. Unlike White Panda, the green field remains dominant and gives the plant a darker, more graphic character.',
        'У Панды глубокие зелёные стреловидные листья с хаотичными серебристо-мятными мазками возле жилок. В отличие от Панды белой, зелёный фон остаётся главным и придаёт растению более тёмный графичный характер.',
      ],
      {
        importantImage: '/plant-profile/syngonium-panda-important.webp',
        propagationImage: '/plant-profile/syngonium-panda-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'amaryllidaceae',
    'clivia-miniata-rescued',
    '/plants/clivia-miniata-home-photo.webp',
    ['Clivia', 'Кливия'],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Bright diffused light is ideal, with gentle morning or evening sun. Clivia tolerates partial shade, but a recovering young division needs steady light to rebuild a strong fan and eventually flower.',
            'Идеален яркий рассеянный свет с мягким утренним или вечерним солнцем. Кливия переносит полутень, но восстанавливающейся молодой делёнке нужен стабильный свет, чтобы нарастить крепкий веер и со временем зацвести.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Water only after the top 3–4 cm of soil dries. Moisten the mix evenly, drain all excess water and keep water out of the leaf fan and basal crown.',
            'Поливайте только после просыхания верхних 3–4 см грунта. Равномерно увлажните смесь, полностью слейте лишнюю воду и не допускайте её попадания внутрь веера и на основание розетки.',
          ],
        ],
        [
          ['Humidity', 'Влажность'],
          [
            'Average room humidity is sufficient. Good air movement around the base is more important than misting, especially after a history of rot.',
            'Обычной комнатной влажности достаточно. После перенесённого загнивания хорошее движение воздуха вокруг основания важнее опрыскиваний.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Keep a recovering plant at 18–24 °C without cold draughts. Once mature and healthy, a bright cool rest at about 10–15 °C can help initiate flower buds.',
            'Восстанавливающееся растение содержите при 18–24 °C без холодных сквозняков. Когда кливия станет взрослой и крепкой, светлый прохладный период покоя при 10–15 °C поможет заложить цветочные почки.',
          ],
        ],
      ),
      2,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Amaryllis family (Amaryllidaceae)', 'Амариллисовые (Amaryllidaceae)'],
        ],
        [
          ['Origin', 'Происхождение'],
          ['Woodland understory of South Africa', 'Лесной подлесок Южной Африки'],
        ],
        [
          ['Plant type', 'Тип растения'],
          [
            'Evergreen rhizomatous flowering perennial',
            'Вечнозелёный корневищный цветущий многолетник',
          ],
        ],
      ),
      profileFooter(
        [
          [
            'Broad dark-green leaves grow in a neat two-sided fan.',
            'Clivia stores moisture in thick, fleshy cream-coloured roots rather than in a true bulb.',
            'Young offsets and recovering divisions can take several years to reach flowering size.',
            'A mature healthy plant usually blooms after a bright, cool and relatively dry rest period.',
          ],
          [
            'Широкие тёмно-зелёные листья растут аккуратным двусторонним веером.',
            'Кливия запасает влагу в толстых мясистых светлых корнях, а не в настоящей луковице.',
            'Молодым деткам и восстанавливающимся делёнкам может понадобиться несколько лет до первого цветения.',
            'Взрослая здоровая кливия обычно зацветает после светлого, прохладного и относительно сухого периода покоя.',
          ],
        ],
        [
          'The fleshy roots and basal crown rot easily in constantly wet soil. If the base softens or darkens, remove damaged tissue, let the cuts dry and restart the healthy fan in a small pot with an airy mix. All parts are toxic if eaten, so keep the plant away from children and pets.',
          'Мясистые корни и основание розетки легко загнивают в постоянно сыром грунте. Если основание размягчилось или потемнело, удалите повреждённые ткани, подсушите срезы и заново укорените здоровый веер в небольшом горшке с воздушной смесью. Все части растения ядовиты при попадании внутрь, поэтому держите его подальше от детей и животных.',
        ],
        [
          [
            'A soft dark base or sour-smelling soil — stop watering and inspect the roots for rot.',
            'Yellow lower leaves with wet soil — improve drainage and allow the mix to dry.',
            'No flowers — the plant may still be young or recovering; later provide brighter light and a cool rest period.',
          ],
          [
            'Мягкое потемневшее основание или кислый запах грунта — прекратите полив и проверьте корни на гниль.',
            'Нижние листья желтеют при влажном грунте — улучшите дренаж и дайте смеси просохнуть.',
            'Нет цветения — растение может быть ещё молодым или восстанавливаться; позже обеспечьте более яркий свет и прохладный период покоя.',
          ],
        ],
        [
          'Separate an offset only when it has at least four or five leaves and several roots of its own. Cut the connecting rhizome with a sterile blade, let the wounds dry briefly and plant the division into a small snug pot with an airy substrate.',
          'Отделяйте детку, когда у неё появятся хотя бы четыре-пять листьев и несколько собственных корней. Перережьте соединяющее корневище стерильным лезвием, немного подсушите срезы и посадите делёнку в небольшой тесный горшок с воздушным субстратом.',
        ],
      ),
      'Clivia miniata',
      [
        'This clivia was given to me as a large bush, but then it became ill and began to rot. I spent a long time saving it, removing everything damaged and trying to preserve the living part. The small fan in the photograph is what finally took root. It has never flowered yet, but for me its new leaves already feel like a victory.',
        'Эту кливию мне подарили большим кустиком, но потом она заболела и начала подгнивать. Я долго её спасала, убирала всё повреждённое и старалась сохранить живую часть. Маленький веер на фотографии — то, что наконец прижилось. Она ещё ни разу не цвела, но для меня её новые листья уже выглядят как победа.',
      ],
      [
        'This is a young rescued division of Clivia miniata with a compact fan of broad dark-green leaves. Right now its main task is not flowering but rebuilding healthy roots and steady new growth after rot.',
        'Это молодая спасённая делёнка кливии киноварной с компактным веером широких тёмно-зелёных листьев. Сейчас её главная задача — не цветение, а восстановление здоровых корней и стабильного нового роста после загнивания.',
      ],
      quickFacts(['Slow-growing', 'Медленный'], ['Usually 30–60 cm', 'Обычно 30–60 см']),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use a very airy, well-drained mix: about 55% houseplant compost, 25% fine bark and 20% perlite or pumice. A drainage hole is essential.',
            'Используйте очень воздушную, хорошо дренированную смесь: примерно 55% грунта для комнатных растений, 25% мелкой коры и 20% перлита или пемзы. Дренажное отверстие обязательно.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Clivia prefers a snug pot and dislikes frequent root disturbance. Repot only when roots crowd the container or the substrate has deteriorated, handling the fleshy roots gently.',
            'Кливия предпочитает тесный горшок и не любит частого беспокойства корней. Пересаживайте только тогда, когда корни заполнят ёмкость или грунт испортится, осторожно обращаясь с мясистыми корнями.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'Feed a rooted, actively growing plant every 3–4 weeks from spring to early autumn with half-strength balanced fertiliser. Do not feed while roots are damaged or growth has stopped.',
            'Укоренившееся активно растущее растение с весны до начала осени подкармливайте раз в 3–4 недели половинной дозой сбалансированного удобрения. Не подкармливайте при повреждённых корнях или остановке роста.',
          ],
        ],
        [
          ['Flowering and rest', 'Цветение и покой'],
          [
            'Do not force a young recovering division to bloom. Once it forms a mature fan and a strong root system, give it six to eight weeks of cooler, drier rest before gradually resuming watering.',
            'Не стимулируйте цветение у молодой восстанавливающейся делёнки. Когда она сформирует взрослый веер и крепкую корневую систему, устройте ей шесть-восемь недель более прохладного и сухого покоя, а затем постепенно возобновите полив.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/clivia-important.webp',
        propagationImage: '/plant-profile/clivia-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'amaryllidaceae',
    'hippeastrum-red-white',
    '/plants/hippeastrum-red-white-home-photo.webp',
    ['Red-and-white hippeastrum', 'Гиппеаструм красно-белый'],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Give the plant bright diffused light and a little gentle morning or evening sun. During active leaf growth, good light helps the bulb restore its strength for the next bloom.',
            'Обеспечьте яркий рассеянный свет и немного мягкого утреннего или вечернего солнца. В период роста листьев хорошее освещение помогает луковице восстановить силы для следующего цветения.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Water moderately after the top layer of soil dries, directing water around the edge of the pot rather than onto the bulb neck. Reduce watering as the leaves naturally fade before dormancy.',
            'Поливайте умеренно после просыхания верхнего слоя грунта, направляя воду по краю горшка, а не на шейку луковицы. Когда перед периодом покоя листья начнут естественно увядать, постепенно сократите полив.',
          ],
        ],
        [
          ['Humidity', 'Влажность'],
          [
            'Average room humidity is sufficient. Do not mist the flowers or keep the bulb neck constantly damp, as stagnant moisture encourages spotting and rot.',
            'Обычной комнатной влажности достаточно. Не опрыскивайте цветки и не оставляйте шейку луковицы постоянно влажной: застойная сырость способствует пятнам и гнили.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Keep an actively growing plant at 18–24 °C. During dormancy, a cooler 12–16 °C position helps prepare the bulb for a new growth cycle.',
            'В период активного роста содержите растение при 18–24 °C. Во время покоя более прохладное место с температурой 12–16 °C помогает луковице подготовиться к новому циклу роста.',
          ],
        ],
      ),
      2,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Amaryllis family (Amaryllidaceae)', 'Амариллисовые (Amaryllidaceae)'],
        ],
        [
          ['Origin', 'Происхождение'],
          [
            'Garden hybrid descended from South American species',
            'Садовый гибрид видов из Южной Америки',
          ],
        ],
        [
          ['Plant type', 'Тип растения'],
          ['Bulbous flowering perennial', 'Луковичный цветущий многолетник'],
        ],
      ),
      profileFooter(
        [
          [
            'A strong flower stalk can carry several large funnel-shaped blooms.',
            'The red petals are marked by a white star and fine contrasting veins.',
            'After flowering, healthy green leaves feed the bulb and should not be cut too early.',
            'With a distinct rest period, the same bulb can bloom again for many years.',
          ],
          [
            'На крепком цветоносе может раскрыться сразу несколько крупных воронковидных цветков.',
            'Красные лепестки украшены белой звездой и тонкими контрастными прожилками.',
            'После цветения здоровые зелёные листья питают луковицу, поэтому их нельзя срезать слишком рано.',
            'При выраженном периоде покоя одна и та же луковица способна цвести много лет подряд.',
          ],
        ],
        [
          'Leave the upper third of the bulb above the soil and keep water away from its neck to reduce the risk of rot. All parts, especially the bulb, are toxic if eaten, so keep the plant away from children and pets.',
          'Оставляйте верхнюю треть луковицы над грунтом и не допускайте попадания воды на её шейку, чтобы снизить риск гнили. Все части растения, особенно луковица, ядовиты при попадании внутрь, поэтому держите его подальше от детей и животных.',
        ],
        [
          [
            'The bulb is soft or dark at the base — stop watering and inspect it for rot.',
            'Leaves grow but the plant does not bloom — provide brighter light, regular feeding and a clear rest period.',
            'Silvery streaks or distorted buds — inspect the plant for thrips.',
          ],
          [
            'Луковица размягчилась или потемнела у основания — прекратите полив и проверьте её на гниль.',
            'Листья растут, но цветения нет — обеспечьте более яркий свет, регулярные подкормки и выраженный период покоя.',
            'Серебристые штрихи или деформированные бутоны — осмотрите растение на трипсов.',
          ],
        ],
        [
          'During repotting, gently separate daughter bulbs that have their own roots. Plant each offset into a small pot, leaving its upper third above the substrate, and expect the first bloom after the young bulb matures.',
          'Во время пересадки аккуратно отделите дочерние луковицы с собственными корнями. Посадите каждую детку в небольшой горшок, оставив верхнюю треть над грунтом, и дождитесь цветения после того, как молодая луковица подрастёт.',
        ],
      ),
      'Hippeastrum hybrid',
      [
        'The first open flower immediately became the centre of the room: the scarlet petals, white star and fine veins look as though they were painted by hand.',
        'Первый раскрывшийся цветок сразу стал центром комнаты: алые лепестки, белая звезда и тонкие прожилки выглядят так, будто их расписали вручную.',
      ],
      [
        'This red-and-white Hippeastrum is a bulbous hybrid with broad green leaves and spectacular star-shaped flowers on a tall leafless stalk. Its seasonal rhythm alternates active growth, flowering and a restorative rest period.',
        'Этот красно-белый гиппеаструм — луковичный гибрид с широкими зелёными листьями и эффектными звёздчатыми цветками на высоком безлистном цветоносе. В его сезонном ритме чередуются активный рост, цветение и восстановительный период покоя.',
      ],
      quickFacts(
        ['Moderate', 'Умеренный'],
        ['Usually 40–70 cm in bloom', 'Обычно 40–70 см во время цветения'],
      ),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use a nutritious, airy and well-drained mix: about 60% houseplant compost, 25% perlite or pumice and 15% fine bark. A drainage hole is essential.',
            'Используйте питательную, воздушную и хорошо дренированную смесь: примерно 60% грунта для комнатных растений, 25% перлита или пемзы и 15% мелкой коры. Дренажное отверстие обязательно.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Repot every 2–3 years after dormancy or before new growth begins. Choose a stable pot only 3–5 cm wider than the bulb.',
            'Пересаживайте раз в 2–3 года после периода покоя или перед началом нового роста. Выбирайте устойчивый горшок всего на 3–5 см шире луковицы.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'Feed every two weeks from the appearance of leaves until they begin to yellow, using a balanced fertiliser for flowering plants at half strength. Do not feed a dormant bulb.',
            'С появления листьев и до начала их пожелтения подкармливайте раз в две недели половинной дозой сбалансированного удобрения для цветущих растений. Спящую луковицу не подкармливайте.',
          ],
        ],
        [
          ['After flowering', 'После цветения'],
          [
            'Cut the spent flower stalk above the bulb, but keep healthy leaves. Continue normal care so the foliage can replenish the bulb before its next rest period.',
            'Срежьте отцветший цветонос над луковицей, но сохраните здоровые листья. Продолжайте обычный уход, чтобы листва успела наполнить луковицу перед следующим периодом покоя.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/hippeastrum-important.webp',
        propagationImage: '/plant-profile/hippeastrum-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'arecaceae',
    'chamaedorea-elegans',
    '/plants/chamaedorea-elegans-home-photo.webp',
    ['Parlor palm', 'Хамедорея изящная'],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Bright diffused light or light partial shade is ideal. The palm tolerates lower light, but direct midday sun can scorch its delicate leaflets.',
            'Идеален яркий рассеянный свет или лёгкая полутень. Пальма переносит менее освещённые места, но прямое полуденное солнце может обжечь нежные листочки.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Water when the top 2–3 cm of soil has dried. Moisten the root ball evenly, drain excess water and never leave the pot standing in water.',
            'Поливайте после просыхания верхних 2–3 см грунта. Равномерно промочите корневой ком, слейте лишнюю воду и не оставляйте горшок в поддоне с водой.',
          ],
        ],
        [
          ['Humidity', 'Влажность'],
          [
            'Average room humidity is acceptable, but 50–60% helps keep the fine leaflet tips green. Keep the palm away from hot radiators.',
            'Обычная комнатная влажность подходит, но при 50–60% тонкие кончики листьев дольше остаются зелёными. Держите пальму подальше от горячих батарей.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Keep at 18–27 °C and protect from cold draughts, sudden temperature changes and prolonged temperatures below 12–15 °C.',
            'Содержите при 18–27 °C, защищая от холодных сквозняков, резких перепадов и длительного понижения температуры ниже 12–15 °C.',
          ],
        ],
      ),
      2,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Palm family (Arecaceae)', 'Пальмовые (Arecaceae)'],
        ],
        [
          ['Origin', 'Происхождение'],
          ['Rainforests of Mexico and Guatemala', 'Влажные леса Мексики и Гватемалы'],
        ],
        [
          ['Plant type', 'Тип растения'],
          ['Evergreen compact indoor palm', 'Вечнозелёная компактная комнатная пальма'],
        ],
      ),
      profileFooter(
        [
          [
            'The graceful pinnate fronds are made of many narrow, soft green leaflets.',
            'Several young palms are often planted together to create a dense clump.',
            'It grows slowly and adapts well to ordinary indoor light.',
            'Parlor palm is considered non-toxic to cats and dogs, although chewing foliage may still upset digestion.',
          ],
          [
            'Изящные перистые вайи состоят из множества узких мягко-зелёных листочков.',
            'Для пышности в один горшок часто высаживают сразу несколько молодых пальм.',
            'Она растёт медленно и хорошо приспосабливается к обычному комнатному освещению.',
            'Хамедорея считается нетоксичной для кошек и собак, хотя поедание листвы может вызвать расстройство пищеварения.',
          ],
        ],
        [
          'Dry brown tips usually point to very dry air, irregular watering or salt buildup. Trim only the damaged edge and correct the cause instead of removing the whole healthy frond.',
          'Сухие коричневые кончики обычно говорят о слишком сухом воздухе, нерегулярном поливе или накоплении солей. Подрежьте только повреждённый край и устраните причину, не удаляя всю здоровую вайю.',
        ],
        [
          [
            'Brown leaflet tips — check air humidity, water quality and watering regularity.',
            'Pale scorched patches — move the palm away from direct sun.',
            'Fine webbing and speckled leaves — inspect the underside for spider mites.',
          ],
          [
            'Коричневые кончики — проверьте влажность воздуха, качество воды и регулярность полива.',
            'Бледные выгоревшие пятна — переставьте пальму подальше от прямого солнца.',
            'Тонкая паутинка и мелкие светлые точки — осмотрите изнанку листьев на паутинного клеща.',
          ],
        ],
        [
          'A pot containing several seedlings can be divided during spring repotting. Separate only sections with their own roots, pot them into a light moist mix and keep them warm in diffused light while they establish. Individual stem cuttings do not root.',
          'Куртину из нескольких сеянцев можно разделить во время весенней пересадки. Отделяйте только части с собственными корнями, высаживайте их в лёгкий влажный грунт и держите в тепле при рассеянном свете до укоренения. Отдельные стеблевые черенки не укореняются.',
        ],
      ),
      'Chamaedorea elegans',
      [
        'This palm has grown into a light green fountain of delicate fronds. I like how it brings a tropical rhythm to the room without taking over the space.',
        'Эта пальма выросла в лёгкий зелёный фонтан из тонких вай. Мне нравится, как она добавляет комнате тропический ритм, но не перегружает пространство.',
      ],
      [
        'Parlor palm is a compact understory palm with slender stems and elegant pinnate fronds. It is valued for its calm silhouette, tolerance of indoor conditions and unhurried growth.',
        'Хамедорея изящная — компактная пальма нижнего яруса леса с тонкими стеблями и элегантными перистыми вайями. Её ценят за спокойный силуэт, терпимость к комнатным условиям и неторопливый рост.',
      ],
      quickFacts(
        ['Slow-growing', 'Медленный'],
        ['Usually 60–150 cm indoors', 'Обычно 60–150 см в комнате'],
      ),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use a loose, moisture-retentive but well-drained mix: about 65% houseplant compost, 25% perlite or fine pumice and 10% fine bark.',
            'Используйте рыхлую, влагоёмкую, но хорошо дренированную смесь: примерно 65% грунта для комнатных растений, 25% перлита или мелкой пемзы и 10% мелкой коры.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Repot carefully every 2–3 years in spring. The roots dislike disturbance, so keep the root ball intact whenever division is not required.',
            'Пересаживайте осторожно раз в 2–3 года весной. Корни не любят беспокойства, поэтому сохраняйте ком целым, если деление не требуется.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'Feed once a month from spring to early autumn with half-strength palm or balanced foliage fertiliser. Do not feed in cold, dark conditions.',
            'С весны до начала осени подкармливайте раз в месяц половинной дозой удобрения для пальм или декоративно-лиственных. В холоде и при недостатке света не подкармливайте.',
          ],
        ],
        [
          ['Grooming', 'Уход за листьями'],
          [
            'Remove only fully yellow or dry fronds at the base. Wipe dust gently or rinse the foliage with a lukewarm shower.',
            'Удаляйте у основания только полностью пожелтевшие или сухие вайи. Аккуратно протирайте пыль или промывайте листву тёплым душем.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/chamaedorea-important.webp',
        propagationImage: '/plant-profile/chamaedorea-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'asparagaceae',
    'chlorophytum-comosum-bonnie',
    '/plants/chlorophytum-curly-home-photo.webp',
    ['Curly spider plant', 'Хлорофитум кудрявый'],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Bright indirect light keeps the white stripe clear and the leaves compact and curly. It tolerates medium light, but protect it from harsh midday sun.',
            'Яркий рассеянный свет сохраняет белую полосу контрастной, а листья — компактными и кудрявыми. Растение переносит среднее освещение, но его нужно беречь от жёсткого полуденного солнца.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Water after the top 2–3 cm of soil dries. Soak the root ball evenly, drain excess water and let the mix dry slightly before watering again.',
            'Поливайте после просыхания верхних 2–3 см грунта. Равномерно промочите корневой ком, слейте лишнюю воду и дайте смеси немного подсохнуть перед следующим поливом.',
          ],
        ],
        [
          ['Humidity', 'Влажность'],
          [
            'Average room humidity is enough. Keep the arching leaves away from hot radiators and very dry air to reduce brown tips.',
            'Обычной комнатной влажности достаточно. Держите изогнутые листья подальше от горячих батарей и очень сухого воздуха, чтобы кончики меньше подсыхали.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'A stable 16–27 °C is ideal. Protect the plant and its hanging plantlets from cold glass, draughts and temperatures below 10–12 °C.',
            'Оптимальна стабильная температура 16–27 °C. Берегите растение и свисающие детки от холодного стекла, сквозняков и температуры ниже 10–12 °C.',
          ],
        ],
      ),
      1,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Asparagus family (Asparagaceae)', 'Спаржевые (Asparagaceae)'],
        ],
        [
          ['Origin', 'Происхождение'],
          [
            'Cultivated form of a species native to southern Africa',
            'Культурная форма вида из южной Африки',
          ],
        ],
        [
          ['Plant type', 'Тип растения'],
          [
            'Evergreen rosette perennial with stolons',
            'Вечнозелёный розеточный многолетник со столонами',
          ],
        ],
      ),
      profileFooter(
        [
          [
            "'Bonnie' has arching green-and-cream leaves that twist into loose curls.",
            'Long stolons carry small white flowers and miniature daughter rosettes.',
            'A mature plant forms a full cascading fountain of leaves and plantlets.',
            'Spider plants are considered non-toxic to cats and dogs, although chewing may still upset digestion.',
          ],
          [
            "У сорта 'Bonnie' зелёно-кремовые листья изгибаются и закручиваются в свободные локоны.",
            'На длинных столонах появляются маленькие белые цветки и дочерние розетки.',
            'Взрослое растение образует пышный каскад листьев и многочисленных деток.',
            'Хлорофитум считается нетоксичным для кошек и собак, хотя поедание листьев может вызвать расстройство пищеварения.',
          ],
        ],
        [
          'Brown tips often come from salt buildup, hard water or irregular watering. Flush the soil periodically and use soft water when possible.',
          'Сухие коричневые кончики часто появляются из-за накопления солей, жёсткой воды или нерегулярного полива. Периодически промывайте грунт и по возможности используйте мягкую воду.',
        ],
        [
          [
            'Brown tips — check water quality, dry air and watering regularity.',
            'Pale or less curly growth — move the plant to brighter indirect light.',
            'Soft yellow leaves at the base — let the substrate dry and check the roots for waterlogging.',
          ],
          [
            'Сохнут кончики — проверьте качество воды, влажность воздуха и регулярность полива.',
            'Новые листья бледнеют и меньше закручиваются — переставьте растение на более яркий рассеянный свет.',
            'Нижние листья желтеют и размягчаются — просушите грунт и проверьте, не переувлажнены ли корни.',
          ],
        ],
        [
          'Separate a daughter rosette when it has small roots and plant it in a light, slightly moist mix. It can also be rooted in water or left attached to the mother plant until established.',
          'Отделите дочернюю розетку, когда у неё появятся небольшие корни, и посадите в лёгкий слегка влажный грунт. Детку также можно укоренить в воде или оставить на столоне до укоренения рядом с материнским растением.',
        ],
      ),
      "Chlorophytum comosum 'Bonnie'",
      [
        'This curly spider plant has grown into a generous green cascade and produces so many plantlets that each new rosette feels like a tiny ready-made plant.',
        'Этот кудрявый хлорофитум превратился в пышный зелёный каскад и выпускает столько деток, что каждая новая розетка выглядит как маленькое самостоятельное растение.',
      ],
      [
        "Curly spider plant 'Bonnie' is a compact cultivar of Chlorophytum comosum. Its striped leaves curl as they grow, while long flexible stolons carry flowers and young rosettes below the mother plant.",
        "Хлорофитум кудрявый 'Bonnie' — компактный сорт Chlorophytum comosum. Полосатые листья закручиваются по мере роста, а на длинных гибких столонах ниже материнской розетки появляются цветки и многочисленные детки.",
      ],
      quickFacts(['Fast-growing', 'Быстрый'], ['Rosette 20–40 cm', 'Розетка 20–40 см']),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use a loose, nutritious mix: about 70% peat-free houseplant compost, 20% perlite and 10% fine bark or coconut chips.',
            'Используйте рыхлую питательную смесь: примерно 70% безторфяного грунта для комнатных растений, 20% перлита и 10% мелкой коры или кокосовых чипсов.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Repot in spring when thick pale roots tightly fill the pot. Choose the next container only 2–3 cm wider.',
            'Пересаживайте весной, когда толстые светлые корни плотно заполнят горшок. Следующая ёмкость должна быть шире всего на 2–3 см.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'Feed once every 3–4 weeks from spring to early autumn with a balanced foliage fertiliser at half strength. Do not overfeed.',
            'С весны до начала осени подкармливайте раз в 3–4 недели половинной дозой сбалансированного удобрения для декоративно-лиственных. Не перекармливайте.',
          ],
        ],
        [
          ['Grooming', 'Формировка'],
          [
            'Trim only dry tips and spent stolons. Leave healthy plantlets for a cascading look or remove them to keep the mother rosette compact.',
            'Подрезайте только сухие кончики и отцветшие столоны. Оставляйте здоровые детки для каскадного вида или удаляйте их, чтобы материнская розетка оставалась компактной.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/chlorophytum-important.webp',
        propagationImage: '/plant-profile/chlorophytum-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'asparagaceae',
    'beaucarnea-recurvata',
    '/plants/beaucarnea-recurvata-home-photo.webp',
    ['Ponytail palm', 'Нолина отогнутая'],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Give very bright light with several hours of gentle direct sun. Acclimatise gradually after a darker winter and rotate the pot between growth periods for an even crown.',
            'Обеспечьте очень яркий свет и несколько часов мягкого прямого солнца. После тёмной зимы приучайте к нему постепенно, а между периодами роста поворачивайте горшок для ровной кроны.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Let at least half of the substrate, preferably nearly all of it, dry before watering thoroughly. Drain every drop of excess water; the swollen base stores moisture and tolerates drought far better than wet roots.',
            'Перед обильным поливом давайте просохнуть как минимум половине, а лучше почти всему объёму грунта. Полностью сливайте лишнюю воду: утолщённое основание запасает влагу и переносит засуху гораздо лучше мокрых корней.',
          ],
        ],
        [
          ['Humidity', 'Влажность'],
          [
            'Average dry room air is suitable. Do not mist the crown routinely; good ventilation and occasional gentle cleaning of the long leaves are enough.',
            'Подходит обычный сухой комнатный воздух. Не опрыскивайте центр розетки без необходимости: достаточно хорошего проветривания и редкой аккуратной очистки длинных листьев.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Keep at 18–28 °C during active growth. In winter it can rest brighter and cooler at about 10–15 °C with very sparse watering; protect from frost and cold wet soil.',
            'В период активного роста содержите при 18–28 °C. Зимой растение может отдыхать в светлом прохладном месте при 10–15 °C и очень редком поливе; берегите от мороза и холодного мокрого грунта.',
          ],
        ],
      ),
      1,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Asparagus family (Asparagaceae)', 'Спаржевые (Asparagaceae)'],
        ],
        [
          ['Origin', 'Родина'],
          ['Dry regions of eastern Mexico', 'Засушливые районы восточной Мексики'],
        ],
        [
          ['Plant type', 'Тип растения'],
          ['Evergreen caudex tree', 'Вечнозелёное каудексное дерево'],
        ],
      ),
      profileFooter(
        [
          [
            'Despite its common name, the ponytail palm is not a true palm.',
            'Its bottle-shaped caudex stores water for long dry periods.',
            'Narrow recurved leaves form a loose fountain above the trunk.',
            'Indoor growth is slow, but a well-kept plant can live for decades.',
          ],
          [
            'Несмотря на распространённое название, нолина не является настоящей пальмой.',
            'Бутылкообразный каудекс запасает воду на длительные засушливые периоды.',
            'Узкие отогнутые листья образуют свободный фонтан над стволом.',
            'В помещении нолина растёт медленно, но при хорошем уходе может жить десятилетиями.',
          ],
        ],
        [
          'Never bury the swollen caudex or leave the pot standing in water. Keep the base above the substrate in a container with a drainage hole: persistent moisture around the trunk can cause irreversible rot.',
          'Никогда не заглубляйте утолщённый каудекс и не оставляйте горшок в воде. Основание должно находиться над грунтом, а в ёмкости обязательно нужно дренажное отверстие: постоянная влага вокруг ствола вызывает необратимую гниль.',
        ],
        [
          [
            'A soft or darkening caudex — stop watering and inspect the base and roots for rot.',
            'Brown leaf tips — check for salt buildup, very dry hot air or irregular watering rather than increasing water automatically.',
            'Pale weak new leaves — move gradually to a brighter position and rotate the plant less often while the new growth develops.',
          ],
          [
            'Каудекс размягчается или темнеет — прекратите полив и проверьте основание и корни на гниль.',
            'Кончики листьев коричневеют — проверьте накопление солей, горячий сухой воздух и нерегулярный полив, а не увеличивайте количество воды автоматически.',
            'Новые листья бледные и слабые — постепенно переставьте растение на более яркий свет и реже поворачивайте его во время развития нового прироста.',
          ],
        ],
        [
          'Propagation is usually by seed or a rare side shoot. Separate a well-developed shoot with a sterile blade, let the cut dry for several days, then root it in warm, barely moist, very gritty substrate. Rooting can be slow and is not guaranteed.',
          'Нолину обычно размножают семенами или редкими боковыми побегами. Хорошо развитый побег отделите стерильным лезвием, подсушите срез несколько дней и укореняйте в тепле в едва влажном очень минеральном субстрате. Корни образуются медленно и не всегда успешно.',
        ],
      ),
      'Beaucarnea recurvata',
      [
        'This young nolina already has its characteristic fountain of long curved leaves, while the caudex is only beginning to gain volume. Watching that base slowly become stronger is part of the charm of such an unhurried plant.',
        'У этой молодой нолины уже сформировался характерный фонтан длинных изогнутых листьев, а каудекс только начинает набирать объём. Наблюдать, как основание постепенно становится мощнее, — особое удовольствие у такого неторопливого растения.',
      ],
      [
        'Ponytail palm is a drought-adapted Mexican tree with a swollen water-storing base and a crown of long, narrow, recurved leaves. Indoors it remains compact for many years and develops its sculptural silhouette very gradually.',
        'Нолина отогнутая — приспособленное к засухе мексиканское дерево с утолщённым запасающим воду основанием и кроной из длинных узких отогнутых листьев. В комнате она долгие годы остаётся компактной и формирует скульптурный силуэт очень постепенно.',
      ],
      quickFacts(
        ['Very slow', 'Очень медленный'],
        ['Usually 60–180 cm indoors', 'Обычно 60–180 см в комнате'],
      ),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use a very free-draining mix: about 40% cactus or light houseplant compost and 60% pumice, perlite, lava grit or coarse sand.',
            'Используйте очень быстро просыхающую смесь: примерно 40% грунта для кактусов или лёгкого грунта для комнатных растений и 60% пемзы, перлита, лавовой крошки или крупного песка.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Repot every 3–4 years in spring into a stable, fairly shallow pot only slightly wider than the caudex. Keep the swollen base at the same level and wait several days before watering.',
            'Пересаживайте весной раз в 3–4 года в устойчивый достаточно неглубокий горшок лишь немного шире каудекса. Сохраняйте прежний уровень посадки и подождите несколько дней до полива.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'From late spring to August, feed every 4–6 weeks with half-strength cactus or balanced fertiliser. Do not feed in winter or immediately after repotting.',
            'С конца весны до августа подкармливайте раз в 4–6 недель половинной дозой удобрения для кактусов или сбалансированного состава. Не удобряйте зимой и сразу после пересадки.',
          ],
        ],
        [
          ['Grooming', 'Уход за листьями'],
          [
            'Trim only dry brown tips, following the natural leaf shape, and remove fully dead leaves gently. Do not cut healthy green leaves from the centre of the crown.',
            'Подрезайте только сухие коричневые кончики по естественной форме листа и аккуратно удаляйте полностью отмершие листья. Не срезайте здоровую зелёную листву из центра розетки.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/beaucarnea-important.webp',
        propagationImage: '/plant-profile/beaucarnea-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'asparagaceae',
    'dracaena-sanderiana',
    '/plants/dracaena-sanderiana-home-photo.webp',
    ['Lucky bamboo', 'Бамбук счастья'],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Give bright diffused light without harsh midday sun. It tolerates a shadier position, but growth becomes slower and new shoots can stretch toward the window.',
            'Обеспечьте яркий рассеянный свет без жёсткого полуденного солнца. Растение переносит более тенистое место, но растёт медленнее, а новые побеги могут вытягиваться к окну.',
          ],
        ],
        [
          ['Water and moisture', 'Полив и вода'],
          [
            'In mineral substrate, keep clean filtered or settled water around the roots but not high around the cane. Refresh the water and rinse the vessel every 7–14 days; in soil, keep the mix lightly moist rather than saturated.',
            'В минеральном субстрате держите чистую фильтрованную или отстоянную воду у корней, не поднимая уровень высоко по стволу. Раз в 7–14 дней обновляйте воду и промывайте ёмкость; в грунте поддерживайте лёгкую влажность без заболачивания.',
          ],
        ],
        [
          ['Humidity and air', 'Влажность и воздух'],
          [
            'Average to moderately high room humidity suits the leaves. Keep the plant away from a hot radiator or air-conditioner and provide gentle air movement without a cold draught.',
            'Листьям подходит средняя или умеренно высокая комнатная влажность. Не ставьте растение у горячей батареи или кондиционера и обеспечьте лёгкое движение воздуха без холодного сквозняка.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Keep at about 18–28 °C and preferably above 15 °C in winter. Protect the roots and canes from cold water, icy glass and sudden temperature changes.',
            'Содержите примерно при 18–28 °C, а зимой желательно не ниже 15 °C. Берегите корни и стебли от холодной воды, ледяного стекла и резких перепадов температуры.',
          ],
        ],
      ),
      2,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Asparagus family (Asparagaceae)', 'Спаржевые (Asparagaceae)'],
        ],
        [
          ['Origin', 'Родина'],
          [
            'West-central tropical Africa to north-eastern Angola',
            'Запад Центральной Африки — северо-восток Анголы',
          ],
        ],
        [
          ['Plant type', 'Тип растения'],
          ['Evergreen tropical shrub', 'Вечнозелёный тропический кустарник'],
        ],
      ),
      profileFooter(
        [
          [
            'Lucky bamboo is a Dracaena and is not closely related to true bamboo.',
            'Distinct rings are nodes from which roots and leafy side shoots can develop.',
            'Cut canes are often trained into straight, spiral or braided decorative forms.',
            'A mature plant can flower, but this is very rare indoors.',
          ],
          [
            '«Счастливый бамбук» — это драцена, не являющаяся близким родственником настоящего бамбука.',
            'Хорошо заметные кольца — это узлы, из которых могут развиваться корни и боковые облиственные побеги.',
            'Обрезанные стебли часто формируют прямыми, спиральными или переплетёнными композициями.',
            'Взрослое растение способно зацвести, но в помещении это происходит крайне редко.',
          ],
        ],
        [
          'Do not keep the whole cane deeply submerged: stale water around the stem can cause yellowing and rot. Dracaena sap and foliage can also cause digestive upset if chewed, so keep the plant away from pets and small children.',
          'Не погружайте весь стебель глубоко в воду: застойная вода вокруг ствола вызывает пожелтение и гниль. Сок и листва драцены могут вызвать расстройство пищеварения при жевании, поэтому держите растение подальше от животных и маленьких детей.',
        ],
        [
          [
            'The cane turns yellow or soft from the base — remove it from water, cut back to firm green tissue and inspect the roots for rot.',
            'Brown leaf tips — use filtered or rain water and check dry hot air and fertiliser concentration.',
            'Pale or bleached leaves — move away from hard direct sun.',
            'Sticky leaves or fine webbing — inspect the nodes and leaf bases for scale insects, mealybugs or mites.',
          ],
          [
            'Стебель желтеет или размягчается снизу — достаньте его из воды, обрежьте до плотной зелёной ткани и проверьте корни на гниль.',
            'Кончики листьев коричневеют — используйте фильтрованную или дождевую воду и проверьте сухой горячий воздух и концентрацию удобрения.',
            'Листья бледнеют или выгорают — уберите растение от жёсткого прямого солнца.',
            'Листья липкие или появилась тонкая паутинка — проверьте узлы и основания листьев на щитовку, мучнистого червеца и клеща.',
          ],
        ],
        [
          'Cut a healthy cane section with at least one or two nodes, seal or dry the upper cut and place the lower node in clean filtered water. When several pale roots reach about 3–5 cm, keep the cutting in water or move it into a lightly moist airy mix.',
          'Срежьте здоровый участок стебля минимум с одним-двумя узлами, подсушите или запечатайте верхний срез и поместите нижний узел в чистую фильтрованную воду. Когда несколько светлых корней достигнут примерно 3–5 см, оставьте черенок в воде или пересадите в слегка влажный воздушный субстрат.',
        ],
      ),
      'Dracaena sanderiana',
      [
        'The main cane was cut back, but a dormant node woke up and produced a fresh leafy shoot. I like this visible moment of renewal: the simple green stem is gradually becoming a living branched plant again.',
        'Основной ствол был обрезан, но спящая почка в узле проснулась и дала свежий облиственный побег. Мне нравится этот заметный момент обновления: простой зелёный стебель постепенно снова превращается в живое ветвящееся растение.',
      ],
      [
        'Dracaena sanderiana is a slow-growing tropical shrub with slim ringed canes and narrow glossy leaves. It adapts well to bright indoor conditions and can live for years in soil, clean water or a stable mineral semi-hydro system.',
        'Бамбук счастья — медленно растущий тропический кустарник с тонкими кольчатыми стеблями и узкими глянцевыми листьями. Он хорошо приспосабливается к комнатному освещению и может годами расти в грунте, чистой воде или стабильной минеральной полугидропонике.',
      ],
      quickFacts(
        ['Slow', 'Медленный'],
        ['Usually 30–100 cm indoors', 'Обычно 30–100 см в комнате'],
      ),
      careCards(
        [
          ['Substrate', 'Субстрат'],
          [
            'For semi-hydro, use rinsed inert mineral granules and a small clean-water reservoir that reaches the root zone, not the upper cane. For soil culture, choose an airy mix with bark and perlite.',
            'Для полугидропоники используйте промытые инертные минеральные гранулы и небольшой резервуар чистой воды, доходящий до корней, но не до верхней части стебля. Для выращивания в грунте выбирайте воздушную смесь с корой и перлитом.',
          ],
        ],
        [
          ['Repotting and cleaning', 'Пересадка и промывка'],
          [
            'In water or mineral substrate, remove the plant every few months, rinse the roots and vessel and trim only soft dead roots. In soil, repot every 2–3 years into a pot with drainage.',
            'В воде или минеральном субстрате раз в несколько месяцев доставайте растение, промывайте корни и ёмкость и удаляйте только мягкие отмершие корни. В грунте пересаживайте раз в 2–3 года в горшок с дренажом.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'From spring to early autumn, use a complete hydroponic or foliage fertiliser at about one-quarter strength every 4–6 weeks. Flush the mineral substrate between feeds and pause in winter.',
            'С весны до начала осени раз в 4–6 недель используйте полное гидропонное удобрение или состав для декоративно-лиственных примерно в четверти дозы. Между подкормками промывайте минеральный субстрат, а зимой сделайте паузу.',
          ],
        ],
        [
          ['Pruning', 'Формировка'],
          [
            'Trim an overlong leafy shoot just above a node with a sterile blade to encourage branching. Remove yellow leaves and wipe healthy foliage gently with a damp cloth.',
            'Слишком длинный облиственный побег обрезайте стерильным лезвием чуть выше узла, чтобы стимулировать ветвление. Удаляйте жёлтые листья и аккуратно протирайте здоровую листву влажной тканью.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/dracaena-sanderiana-important.webp',
        propagationImage: '/plant-profile/dracaena-sanderiana-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'asparagaceae',
    'sansevieria-blue-star',
    '/plants/sansevieria-blue-star-home-photo.webp',
    ['Blue Star snake plant', 'Сансевиерия Блю Стар'],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Bright diffused light keeps the compact rosette and silvery-blue pattern at their best. The plant tolerates lower light, but protect it from sudden harsh midday sun.',
            'Яркий рассеянный свет лучше всего сохраняет компактную розетку и серебристо-голубой рисунок. Растение переносит менее яркое освещение, но его нужно беречь от резкого полуденного солнца.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Let the substrate dry completely or almost completely, then water thoroughly and drain every drop of excess water. Water much less often in cool, dark winter conditions.',
            'Давайте грунту просохнуть полностью или почти полностью, затем обильно поливайте и сливайте всю лишнюю воду. В прохладе и при слабом зимнем освещении поливайте значительно реже.',
          ],
        ],
        [
          ['Humidity', 'Влажность'],
          [
            'Normal dry room air is suitable. Do not leave water in the centre of the rosette and avoid routine misting, especially when the room is cool.',
            'Подходит обычный сухой комнатный воздух. Не оставляйте воду в центре розетки и не опрыскивайте растение без необходимости, особенно в прохладном помещении.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Keep at 18–28 °C during active growth and preferably above 15 °C in winter. Protect the fleshy leaves and roots from cold glass, draughts and chilled wet soil.',
            'В период роста содержите при 18–28 °C, а зимой желательно не ниже 15 °C. Берегите мясистые листья и корни от холодного стекла, сквозняков и переохлаждённого мокрого грунта.',
          ],
        ],
      ),
      1,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Asparagus family (Asparagaceae)', 'Спаржевые (Asparagaceae)'],
        ],
        [
          ['Origin', 'Происхождение'],
          [
            'Cultivated sansevieria; the group originates from tropical Africa',
            'Культурная сансевиерия; группа происходит из тропической Африки',
          ],
        ],
        [
          ['Plant type', 'Тип растения'],
          ['Evergreen rhizomatous leaf succulent', 'Вечнозелёный корневищный листовой суккулент'],
        ],
      ),
      profileFooter(
        [
          [
            "'Blue Star' forms a low sculptural rosette of broad, firm leaves.",
            'The blue-green surface is marked with darker horizontal mottling and pale margins.',
            'Thick leaves and rhizomes store water, so the plant copes with short dry periods well.',
            'An established plant can gradually produce daughter rosettes from underground rhizomes.',
          ],
          [
            "'Blue Star' образует невысокую скульптурную розетку из широких плотных листьев.",
            'На голубовато-зелёной поверхности заметны более тёмные поперечные пятна и светлая кайма.',
            'Толстые листья и корневища запасают воду, поэтому растение хорошо переносит короткие периоды засухи.',
            'Взрослое растение постепенно выпускает дочерние розетки из подземных корневищ.',
          ],
        ],
        [
          'Overwatering is the main danger: soft leaves, a loose rosette or a dark base require an immediate root and rhizome check. The foliage can cause digestive upset if chewed, so keep it away from pets and small children.',
          'Главная опасность — перелив: мягкие листья, шаткая розетка или потемневшее основание требуют немедленной проверки корней и корневища. Листья могут вызвать расстройство пищеварения при жевании, поэтому держите растение подальше от животных и маленьких детей.',
        ],
        [
          [
            'Leaves soften or yellow from the base — stop watering and inspect the roots and rhizome for rot.',
            'Dry brown patches — check for harsh direct sun, cold contact or physical damage.',
            'New growth becomes narrow and dark — move the plant gradually to brighter diffused light.',
            'Cottony clusters or sticky marks — inspect leaf bases for mealybugs or scale insects.',
          ],
          [
            'Листья размягчаются или желтеют от основания — прекратите полив и проверьте корни и корневище на гниль.',
            'Сухие коричневые пятна — проверьте, нет ли жёсткого прямого солнца, контакта с холодом или механических повреждений.',
            'Новый прирост становится узким и тёмным — постепенно переставьте растение на более яркий рассеянный свет.',
            'Ватные скопления или липкие следы — осмотрите основания листьев на мучнистого червеца и щитовку.',
          ],
        ],
        [
          'Divide a daughter rosette when it has its own roots. Cut the connecting rhizome with a sterile blade, let the cuts dry for a day or two and pot both sections into a dry, airy mix before watering sparingly.',
          'Отделяйте дочернюю розетку, когда у неё появятся собственные корни. Разрежьте соединяющее корневище стерильным лезвием, подсушите срезы один-два дня и посадите обе части в сухую воздушную смесь, после чего поливайте умеренно.',
        ],
      ),
      "Sansevieria 'Blue Star'",
      [
        'This young Blue Star already has a strong architectural shape: the broad mottled leaves unfold from the centre like a compact silver-green sculpture.',
        'У этой молодой «Блю Стар» уже выразительная архитектурная форма: широкие пятнистые листья раскрываются из центра, словно компактная серебристо-зелёная скульптура.',
      ],
      [
        "Sansevieria 'Blue Star' is a compact snake plant with broad, sturdy blue-green leaves gathered into a spreading rosette. Its restrained colour, pale edging and slow growth make it an easy sculptural accent for a bright room.",
        'Сансевиерия «Блю Стар» — компактное растение с широкими плотными голубовато-зелёными листьями, собранными в раскидистую розетку. Сдержанная окраска, светлая кайма и медленный рост делают её выразительным и неприхотливым акцентом для светлой комнаты.',
      ],
      quickFacts(['Slow', 'Медленный'], ['Usually 20–40 cm indoors', 'Обычно 20–40 см в комнате']),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use a very loose, fast-draining mix: about 40% cactus or light houseplant compost and 60% pumice, perlite, lava grit or coarse sand.',
            'Используйте очень рыхлую быстро просыхающую смесь: примерно 40% грунта для кактусов или лёгкого грунта для комнатных растений и 60% пемзы, перлита, лавовой крошки или крупного песка.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Repot in spring only when the rhizomes crowd the container or distort it. Choose a sturdy pot with a drainage hole only 2–3 cm wider than the root ball and keep the rosette base above the soil line.',
            'Пересаживайте весной, только когда корневища заполнят или начнут деформировать горшок. Выбирайте устойчивую ёмкость с дренажным отверстием всего на 2–3 см шире корневого кома и не заглубляйте основание розетки.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'Feed every 6–8 weeks from late spring to August with cactus fertiliser at half strength. Do not feed in winter or while the substrate stays wet for a long time.',
            'С конца весны до августа подкармливайте раз в 6–8 недель половинной дозой удобрения для кактусов. Не удобряйте зимой и пока грунт долго остаётся влажным.',
          ],
        ],
        [
          ['Leaf care', 'Уход за листьями'],
          [
            'Wipe dust from both sides of the leaves with a soft damp cloth. Remove a badly damaged leaf at the base with a sterile blade; cut edges do not regrow.',
            'Протирайте пыль с обеих сторон листьев мягкой влажной тканью. Сильно повреждённый лист удаляйте у основания стерильным лезвием: срезанный край не восстанавливается.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/sansevieria-blue-star-important.webp',
        propagationImage: '/plant-profile/sansevieria-blue-star-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'asparagaceae',
    'dracaena-angolensis-boncel',
    '/plants/dracaena-angolensis-boncel-home-photo.webp',
    ['Starfish snake plant', 'Сансевиерия Старфиш'],
    simplePlantProfile({
      assets: {
        importantImage: '/plant-profile/sansevieria-blue-star-important.webp',
        propagationImage: '/plant-profile/sansevieria-blue-star-propagation.webp',
      },
      difficulty: 1,
      facts: [
        [
          'Thick cylindrical leaves radiate from the base like the arms of a starfish.',
          'Dark transverse bands circle each spear-shaped leaf.',
          'The compact fan develops slowly and spreads by underground rhizomes.',
        ],
        [
          'Толстые цилиндрические листья расходятся от основания, словно лучи морской звезды.',
          'Каждый копьевидный лист покрыт тёмными поперечными полосами.',
          'Компактный веер растёт медленно и разрастается подземными корневищами.',
        ],
      ],
      family: ['Asparagus family (Asparagaceae)', 'Спаржевые (Asparagaceae)'],
      feeding: [
        'Feed every six to eight weeks from late spring to August with cactus fertiliser at half strength. Do not feed in winter or while the substrate remains damp.',
        'С конца весны до августа подкармливайте раз в шесть-восемь недель половинной дозой удобрения для кактусов. Не удобряйте зимой и пока грунт остаётся влажным.',
      ],
      growth: ['Slow', 'Медленный'],
      height: ['Usually 20–45 cm indoors', 'Обычно 20–45 см в комнате'],
      humidity: [
        'Normal dry room air is suitable. Do not mist routinely or leave water between the tightly grouped leaf bases.',
        'Подходит обычный сухой комнатный воздух. Не опрыскивайте без необходимости и не оставляйте воду между плотно собранными основаниями листьев.',
      ],
      important: [
        'Overwatering is the main danger. Let the mineral-rich substrate dry completely, keep the leaf bases above the soil and never leave water in the cachepot.',
        'Главная опасность — перелив. Полностью просушивайте минеральный грунт, не заглубляйте основания листьев и никогда не оставляйте воду в кашпо.',
      ],
      latinName: "Dracaena angolensis 'Boncel'",
      light: [
        'Give bright diffused light with gentle morning or evening sun. It tolerates lower light, but the fan stays denser and the banding clearer in a bright position.',
        'Нужен яркий рассеянный свет с мягким утренним или вечерним солнцем. Растение переносит менее яркое освещение, но на светлом месте веер остаётся плотнее, а полосы — заметнее.',
      ],
      notes: [
        'This is one plant photographed from two sides. Its leaves do not make a perfectly even fan: several lean outward at different angles, giving the rosette a lively star-like silhouette.',
        'Это одно растение, сфотографированное с двух сторон. Его листья не образуют идеально ровный веер: несколько расходятся под разными углами и создают живой звёздный силуэт.',
      ],
      origin: [
        'Cultivated form of a species native to Angola, Zambia and Zimbabwe',
        'Культурная форма вида из Анголы, Замбии и Зимбабве',
      ],
      overview: [
        "'Boncel', often sold as Starfish, is a compact form of Dracaena angolensis with rigid cylindrical leaves arranged in a spreading fan. The older familiar botanical name is Sansevieria cylindrica 'Boncel'.",
        '«Бонсел», часто продаваемая как Старфиш, — компактная форма Dracaena angolensis с жёсткими цилиндрическими листьями, собранными в раскидистый веер. Прежнее привычное ботаническое название — Sansevieria cylindrica «Boncel».',
      ],
      plantType: [
        'Evergreen rhizomatous leaf succulent',
        'Вечнозелёный корневищный листовой суккулент',
      ],
      problems: [
        [
          'Soft yellow leaf bases — stop watering and inspect the rhizome for rot.',
          'Wrinkled leaves — check whether the mix has stayed dry for too long or the roots are damaged.',
          'Leaning pale new growth — move gradually to brighter diffused light.',
        ],
        [
          'Основания листьев желтеют и размягчаются — прекратите полив и проверьте корневище на гниль.',
          'Листья сморщиваются — проверьте, не пересушен ли грунт слишком долго и не повреждены ли корни.',
          'Новый прирост бледнеет и наклоняется — постепенно переставьте на более яркий рассеянный свет.',
        ],
      ],
      propagation: [
        'Separate a daughter fan only after it has its own roots. Cut the connecting rhizome with a sterile blade, let both cuts dry for one or two days and pot the divisions into dry gritty substrate.',
        'Отделяйте дочерний веер только после появления собственных корней. Разрежьте соединяющее корневище стерильным лезвием, подсушите оба среза один-два дня и посадите делёнки в сухой минеральный грунт.',
      ],
      repotting: [
        'Repot in spring only when rhizomes crowd or distort the container. Choose a sturdy pot with drainage just two or three centimetres wider than the root ball.',
        'Пересаживайте весной, только когда корневища заполнят или начнут деформировать горшок. Выбирайте устойчивую ёмкость с дренажом всего на два-три сантиметра шире корневого кома.',
      ],
      secondaryCare: [
        ['Leaf care', 'Уход за листьями'],
        [
          'Wipe each cylindrical leaf with a soft damp cloth while supporting it at the base. Remove a badly damaged spear completely; a cut tip will not regrow.',
          'Протирайте каждый цилиндрический лист мягкой влажной тканью, придерживая у основания. Сильно повреждённый лист удаляйте целиком: срезанная верхушка не восстановится.',
        ],
      ],
      soil: [
        'Use a very fast-draining mix of about 35% cactus compost and 65% pumice, lava grit, perlite or coarse mineral material.',
        'Используйте быстро просыхающую смесь примерно из 35% грунта для кактусов и 65% пемзы, лавовой крошки, перлита или другого крупного минерального материала.',
      ],
      temperature: [
        'Keep at 18–30 °C during active growth and preferably above 15 °C in winter. Protect the roots from cold, wet windowsills.',
        'В период роста содержите при 18–30 °C, а зимой желательно не ниже 15 °C. Защищайте корни от холодного мокрого подоконника.',
      ],
      watering: [
        'Soak the substrate thoroughly only after it has dried completely, then drain every drop. Water much less often during cool, dark winter months.',
        'Полностью промачивайте грунт только после полной просушки и сливайте всю лишнюю воду. В прохладные тёмные зимние месяцы поливайте значительно реже.',
      ],
    }),
  ),
  collectionPlant(
    'asparagaceae',
    'dracaena-trifasciata-moonshine',
    '/plants/dracaena-trifasciata-moonshine-home-photo.webp',
    ['Moonshine snake plant', 'Сансевиерия Муншайн'],
    simplePlantProfile({
      assets: {
        importantImage: '/plant-profile/sansevieria-blue-star-important.webp',
        propagationImage: '/plant-profile/sansevieria-blue-star-propagation.webp',
      },
      difficulty: 1,
      facts: [
        [
          'New leaves open almost silvery-white and deepen to muted sage green with age.',
          'A fine dark green margin outlines each broad sword-shaped leaf.',
          'Daughter rosettes emerge slowly from underground rhizomes.',
        ],
        [
          'Новые листья раскрываются почти серебристо-белыми и с возрастом становятся приглушённо-шалфейными.',
          'Каждый широкий мечевидный лист очерчен тонкой тёмно-зелёной каймой.',
          'Дочерние розетки медленно появляются из подземных корневищ.',
        ],
      ],
      family: ['Asparagus family (Asparagaceae)', 'Спаржевые (Asparagaceae)'],
      feeding: [
        'Feed every six to eight weeks from late spring to August with cactus fertiliser at half strength. Skip feeding in winter and after repotting.',
        'С конца весны до августа подкармливайте раз в шесть-восемь недель половинной дозой удобрения для кактусов. Зимой и после пересадки подкормки не нужны.',
      ],
      growth: ['Slow', 'Медленный'],
      height: ['Usually 40–70 cm indoors', 'Обычно 40–70 см в комнате'],
      humidity: [
        'Normal dry room air is suitable. Do not mist routinely and never leave water standing between the upright leaf bases.',
        'Подходит обычный сухой комнатный воздух. Не опрыскивайте без необходимости и не оставляйте воду между вертикальными основаниями листьев.',
      ],
      important: [
        'The silver colour does not mean the plant needs more water. Let the substrate dry completely and judge watering by the pot weight, not by the pale foliage.',
        'Серебристая окраска не означает, что растению не хватает воды. Полностью просушивайте грунт и ориентируйтесь на вес горшка, а не на светлый цвет листвы.',
      ],
      latinName: "Dracaena trifasciata 'Moonshine'",
      light: [
        'Give bright diffused light with gentle morning or evening sun to preserve the pale silver colour. In deep shade the foliage gradually becomes darker green.',
        'Нужен яркий рассеянный свет с мягким утренним или вечерним солнцем, чтобы сохранить светлую серебристую окраску. В глубокой тени листва постепенно становится темнее и зеленее.',
      ],
      notes: [
        'My young Moonshine began with only a few tall leaves beside other plants on the windowsill. I am giving the rosette room to add new shoots naturally rather than forcing a perfectly even fan.',
        'Мой молодой Муншайн начинался всего с нескольких высоких листьев среди других растений на подоконнике. Я оставляю розетке пространство для естественного роста и не пытаюсь сформировать идеально ровный веер.',
      ],
      origin: [
        'Cultivated form of a species native to West-Central tropical Africa',
        'Культурная форма вида из западной части Центральной тропической Африки',
      ],
      overview: [
        "'Moonshine' is a silver-leaved cultivar of Dracaena trifasciata with broad upright blades in muted mint, sage and pale grey-green tones. It was formerly known as Sansevieria trifasciata 'Moonshine'.",
        '«Муншайн» — серебристолистный сорт Dracaena trifasciata с широкими вертикальными листьями приглушённых мятных, шалфейных и светло-серо-зелёных оттенков. Прежнее название — Sansevieria trifasciata «Moonshine».',
      ],
      plantType: [
        'Evergreen rhizomatous leaf succulent',
        'Вечнозелёный корневищный листовой суккулент',
      ],
      problems: [
        [
          'Soft yellow leaf bases — stop watering and inspect the roots and rhizome for rot.',
          'Leaves turn dark green — move gradually to brighter diffused light.',
          'Dry bleached patches — protect the foliage from harsh midday sun.',
        ],
        [
          'Основания листьев желтеют и размягчаются — прекратите полив и проверьте корни и корневище на гниль.',
          'Листья становятся тёмно-зелёными — постепенно переставьте на более яркий рассеянный свет.',
          'Появляются сухие выбеленные пятна — защитите листву от жёсткого полуденного солнца.',
        ],
      ],
      propagation: [
        'Divide a daughter rosette with its own roots to preserve the silver cultivar colour. Cut the connecting rhizome with a sterile blade, dry the cuts for one or two days and pot into dry gritty mix.',
        'Чтобы сохранить серебристую окраску сорта, отделяйте дочернюю розетку с собственными корнями. Разрежьте корневище стерильным лезвием, подсушите срезы один-два дня и посадите в сухую минеральную смесь.',
      ],
      repotting: [
        'Repot in spring when rhizomes fill or distort the container. Use a sturdy pot with drainage only two or three centimetres wider than the root ball.',
        'Пересаживайте весной, когда корневища заполнят или начнут деформировать горшок. Берите устойчивую ёмкость с дренажом всего на два-три сантиметра шире корневого кома.',
      ],
      secondaryCare: [
        ['Leaf care', 'Уход за листьями'],
        [
          'Wipe dust gently with a soft damp cloth, supporting each leaf at the base. Remove a severely damaged leaf entirely because a trimmed tip will not regrow.',
          'Аккуратно протирайте пыль мягкой влажной тканью, придерживая каждый лист у основания. Сильно повреждённый лист удаляйте целиком: срезанная верхушка не восстановится.',
        ],
      ],
      soil: [
        'Use a very fast-draining mix of about 35% cactus compost and 65% pumice, lava grit, perlite or another coarse mineral component.',
        'Используйте быстро просыхающую смесь примерно из 35% грунта для кактусов и 65% пемзы, лавовой крошки, перлита или другого крупного минерального компонента.',
      ],
      temperature: [
        'Keep at 18–30 °C during active growth and preferably above 15 °C in winter. Protect the roots from cold, wet windowsills.',
        'В период роста содержите при 18–30 °C, а зимой желательно не ниже 15 °C. Защищайте корни от холодного мокрого подоконника.',
      ],
      watering: [
        'Water thoroughly only after the substrate has dried completely, then drain every drop. Reduce watering sharply in cool, dark winter conditions.',
        'Обильно поливайте только после полной просушки грунта и сливайте всю лишнюю воду. В прохладных тёмных зимних условиях резко сокращайте полив.',
      ],
    }),
  ),
  collectionPlant(
    'moraceae',
    'ficus-benjamina',
    '/plants/ficus-benjamina-home-photo.webp',
    ['Weeping fig', 'Фикус Бенджамина'],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Give bright indirect light and protect the foliage from harsh midday sun. Avoid frequent moves: a sudden change in light often triggers leaf drop while the plant adapts.',
            'Обеспечьте яркий рассеянный свет и защищайте листву от жёсткого полуденного солнца. Не переставляйте растение без необходимости: резкая смена освещения часто вызывает листопад во время адаптации.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Water thoroughly when the upper 3–5 cm of substrate has dried, then drain the saucer. Do not let the root ball dry completely, but never keep it continuously wet.',
            'Поливайте обильно, когда верхние 3–5 см субстрата просохнут, и сливайте воду из поддона. Не пересушивайте земляной ком полностью, но и не держите его постоянно мокрым.',
          ],
        ],
        [
          ['Humidity and air', 'Влажность и воздух'],
          [
            'Average room humidity is acceptable, though 45–60% keeps the crown fresher. Keep the tree away from hot radiators, air-conditioners and cold draughts.',
            'Обычная комнатная влажность подходит, но при 45–60% крона выглядит свежее. Держите дерево подальше от горячих батарей, кондиционеров и холодных сквозняков.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Maintain about 18–27 °C and preferably no lower than 15 °C in winter. Protect the roots from a cold windowsill and abrupt temperature changes.',
            'Поддерживайте примерно 18–27 °C, а зимой желательно не ниже 15 °C. Берегите корни от холодного подоконника и резких перепадов температуры.',
          ],
        ],
      ),
      3,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Mulberry family (Moraceae)', 'Тутовые (Moraceae)'],
        ],
        [
          ['Origin', 'Родина'],
          [
            'Tropical and subtropical Asia to northern Australia',
            'Тропическая и субтропическая Азия — север Австралии',
          ],
        ],
        [
          ['Plant type', 'Тип растения'],
          ['Evergreen tropical tree', 'Вечнозелёное тропическое дерево'],
        ],
      ),
      profileFooter(
        [
          [
            'The common name “weeping fig” refers to its gracefully arching twigs and drooping leaves.',
            'In the wild it becomes a large tree, while regular pruning keeps an indoor specimen compact and branched.',
            'Like other figs, it can form aerial roots in warm, humid conditions.',
            'Its tiny enclosed flowers develop inside fig-like syconia, although indoor plants rarely fruit.',
          ],
          [
            'Название «плакучий фикус» связано с изящно поникающими веточками и листьями.',
            'В природе это крупное дерево, а в помещении регулярная обрезка помогает сохранять компактную ветвистую форму.',
            'Как и другие фикусы, в тёплом влажном воздухе он способен образовывать воздушные корни.',
            'Его крошечные цветки скрыты внутри похожих на инжир сикониев, но в комнате растение плодоносит редко.',
          ],
        ],
        [
          'The milky latex can irritate skin and eyes, and chewed foliage may cause digestive upset. Wear gloves when pruning and keep cuttings away from children and pets.',
          'Млечный сок может раздражать кожу и глаза, а при жевании листьев вызвать расстройство пищеварения. Работайте в перчатках и держите обрезанные части подальше от детей и животных.',
        ],
        [
          [
            'Sudden leaf drop — check recent moves, draughts, cold roots or a sharp change in watering.',
            'Yellow soft leaves — allow the upper substrate to dry and inspect drainage and roots.',
            'Dry brown edges — check hot dry air, irregular watering and salt buildup.',
            'Sticky leaves, bumps or fine webbing — inspect for scale, mealybugs and spider mites.',
          ],
          [
            'Резко опадают листья — вспомните о недавней перестановке, сквозняке, охлаждении корней или изменении полива.',
            'Листья желтеют и размягчаются — дайте верхнему слою просохнуть и проверьте дренаж и корни.',
            'Края сохнут и коричневеют — проверьте горячий сухой воздух, нерегулярный полив и накопление солей.',
            'Листья липкие, появились бугорки или паутинка — осмотрите растение на щитовку, мучнистого червеца и клеща.',
          ],
        ],
        [
          'Take a healthy 10–15 cm tip cutting with two or three leaves just below a node. Rinse the latex, root it in water or a warm airy mix, and pot it when several pale roots are 3–5 cm long.',
          'Срежьте здоровый верхушечный черенок длиной 10–15 см с двумя-тремя листьями чуть ниже узла. Смойте млечный сок, укореняйте в воде или тёплом воздушном субстрате и посадите, когда несколько светлых корней достигнут 3–5 см.',
        ],
      ),
      'Ficus benjamina',
      [
        'This is one of the largest plants in my collection: a full indoor tree with several trunks and a loose, living crown. Its scale makes the room feel like a real greenhouse.',
        'Это одно из самых крупных растений в моей коллекции: настоящее комнатное дерево с несколькими стволами и свободной живой кроной. Благодаря его масштабу комната становится похожа на настоящую оранжерею.',
      ],
      [
        'Ficus benjamina is an evergreen tree with slender woody stems and a crown of small, pointed, glossy leaves. It grows steadily in stable bright conditions but reacts noticeably to abrupt changes in place, temperature and watering.',
        'Фикус Бенджамина — вечнозелёное дерево с тонкими древеснеющими стволами и кроной из небольших заострённых глянцевых листьев. В стабильных светлых условиях он растёт уверенно, но заметно реагирует на резкую смену места, температуры и полива.',
      ],
      quickFacts(
        ['Moderate to fast', 'Умеренный или быстрый'],
        ['Usually 1.5–3 m indoors', 'Обычно 1,5–3 м в комнате'],
      ),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use a fertile airy mix: about 60% quality houseplant substrate, 20% fine bark and 20% perlite or pumice, always in a pot with drainage.',
            'Используйте питательную воздушную смесь: примерно 60% качественного грунта для комнатных растений, 20% мелкой коры и 20% перлита или пемзы, обязательно в горшке с дренажом.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Repot a young tree every 1–2 years in spring; for a large mature specimen, replace the upper substrate annually and move up only one pot size when roots fill the container.',
            'Молодое дерево пересаживайте весной раз в 1–2 года; у крупного взрослого экземпляра ежегодно обновляйте верхний слой и увеличивайте горшок только на один размер, когда корни освоят объём.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'From March to September, feed every 3–4 weeks with a balanced foliage fertiliser at half strength. Pause in winter unless the plant is actively growing under additional light.',
            'С марта по сентябрь подкармливайте раз в 3–4 недели половинной дозой сбалансированного удобрения для декоративно-лиственных. Зимой сделайте паузу, если растение не растёт под досветкой.',
          ],
        ],
        [
          ['Pruning and support', 'Формировка'],
          [
            'Shorten long shoots above an outward-facing node in spring and rotate the pot gradually for an even crown. Support heavy trunks if needed and wipe dust from the leaves.',
            'Весной укорачивайте длинные побеги над направленным наружу узлом и понемногу поворачивайте горшок для ровной кроны. При необходимости поддерживайте тяжёлые стволы и протирайте листья от пыли.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/ficus-benjamina-important.webp',
        propagationImage: '/plant-profile/ficus-benjamina-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'moraceae',
    'ficus-elastica-tineke',
    '/plants/ficus-elastica-tineke-home-photo.webp',
    ["Rubber plant 'Tineke'", 'Фикус каучуконосный «Тинеке»'],
    simplePlantProfile({
      assets: {
        importantImage: '/plant-profile/ficus-elastica-tineke-important.webp',
        propagationImage: '/plant-profile/ficus-elastica-tineke-propagation.webp',
      },
      difficulty: 2,
      facts: [
        [
          "'Tineke' has broad leathery leaves with irregular cream margins and several shades of green.",
          'Fresh leaves emerge with a bronze or burgundy flush that gradually softens as they mature.',
          'The white latex once made rubber figs commercially interesting, although modern natural rubber comes mainly from Hevea brasiliensis.',
          'Like other figs, its tiny flowers are hidden inside specialised hollow inflorescences called syconia.',
        ],
        [
          'У сорта «Тинеке» широкие кожистые листья с неровной кремовой каймой и несколькими оттенками зелёного.',
          'Новые листья разворачиваются с бронзовым или бордовым оттенком, который постепенно смягчается.',
          'Белый латекс когда-то делал каучуконосный фикус промышленно интересным, хотя современный натуральный каучук получают преимущественно из гевеи бразильской.',
          'Как и у других фикусов, его крошечные цветки скрыты внутри особых полых соцветий — сикониев.',
        ],
      ],
      family: ['Mulberry family (Moraceae)', 'Тутовые (Moraceae)'],
      feeding: [
        'Feed every four weeks from spring to early autumn with a balanced foliage fertiliser at half strength. Pause during slow winter growth.',
        'С весны до начала осени подкармливайте раз в четыре недели половинной дозой сбалансированного удобрения для декоративно-лиственных. На время медленного зимнего роста сделайте паузу.',
      ],
      growth: ['Moderate', 'Умеренный'],
      height: ['Usually 1.5–3 m indoors', 'Обычно 1,5–3 м в комнате'],
      humidity: [
        'Average room humidity is acceptable, though 45–60% helps new leaves unfurl cleanly. Keep away from radiators and cold draughts.',
        'Подходит обычная комнатная влажность, но при 45–60% новые листья разворачиваются аккуратнее. Держите растение подальше от батарей и холодных сквозняков.',
      ],
      important: [
        'Milky latex from a cut stem can irritate skin and eyes, and chewed leaves may cause digestive upset. Wear gloves when pruning and keep cut pieces away from children and pets.',
        'Млечный сок из срезанного стебля может раздражать кожу и глаза, а разжёванные листья — вызвать расстройство пищеварения. Работайте в перчатках и держите срезанные части подальше от детей и животных.',
      ],
      latinName: "Ficus elastica 'Tineke'",
      light: [
        'Give bright filtered light and a little gentle morning or evening sun. Good light preserves the cream pattern; harsh midday sun can scorch the pale margins.',
        'Обеспечьте яркий рассеянный свет и немного мягкого утреннего или вечернего солнца. Хорошее освещение сохраняет кремовый рисунок, а жёсткое полуденное солнце может обжечь светлую кайму.',
      ],
      notes: [
        'A compact young tree with a strong cream-and-green pattern and a warm bronze growing point. As the stem matures, each new leaf will enlarge the upright layered crown.',
        'Компактное молодое деревце с выразительным кремово-зелёным рисунком и тёплой бронзовой точкой роста. По мере взросления стебля каждый новый лист будет дополнять вертикальную ярусную крону.',
      ],
      origin: [
        'Cultivar of a tropical Asian species native from Nepal and southern China to western Malesia',
        'Сорт тропического азиатского вида, происходящего от Непала и юга Китая до западной Малезии',
      ],
      overview: [
        "Ficus elastica 'Tineke' is a variegated evergreen tree with large glossy leaves patterned in deep green, sage and cream. Its broad foliage and upright habit create a calm architectural silhouette, while bronze-red new growth adds a changing colour accent.",
        'Фикус каучуконосный «Тинеке» — пестролистное вечнозелёное дерево с крупными глянцевыми листьями глубокого зелёного, шалфейного и кремового оттенков. Широкая листва и вертикальный рост создают спокойный архитектурный силуэт, а бронзово-красный молодой прирост добавляет меняющийся цветовой акцент.',
      ],
      plantType: ['Evergreen tropical tree', 'Вечнозелёное тропическое дерево'],
      problems: [
        [
          'Yellow soft lower leaves — let the upper substrate dry and check drainage and roots.',
          'Dry brown margins — check for hot direct sun, irregular watering or salt buildup.',
          'Sudden leaf drop — protect from cold draughts, abrupt moves and temperature changes.',
          'Sticky leaves, raised bumps or fine webbing — isolate and inspect for scale, mealybugs or mites.',
        ],
        [
          'Нижние листья желтеют и размягчаются — дайте верхнему слою грунта просохнуть и проверьте дренаж и корни.',
          'Края сохнут и коричневеют — проверьте прямое жаркое солнце, нерегулярный полив и накопление солей.',
          'Листья внезапно опадают — защитите от холодного сквозняка, резкой перестановки и перепадов температуры.',
          'Листья стали липкими, появились бугорки или тонкая паутинка — изолируйте и проверьте на щитовку, мучнистого червеца или клеща.',
        ],
      ],
      propagation: [
        'Take a healthy 10–15 cm tip cutting just below a node, leaving two leaves. Rinse away the latex, root in water or a warm airy mix, and pot when several pale roots reach 3–5 cm. Air layering is another reliable method for a thicker stem.',
        'Срежьте здоровый верхушечный черенок длиной 10–15 см чуть ниже узла и оставьте два листа. Смойте млечный сок, укореняйте в воде или тёплом воздушном субстрате и посадите, когда несколько светлых корней достигнут 3–5 см. Для толстого стебля также надёжно воздушное отводкование.',
      ],
      repotting: [
        'Repot a young plant every one to two years in spring, moving up only one pot size. Keep the stem at its previous depth and use a container with a drainage hole.',
        'Молодое растение пересаживайте весной раз в один-два года, увеличивая горшок только на один размер. Сохраняйте прежнюю глубину стебля и используйте ёмкость с дренажным отверстием.',
      ],
      secondaryCare: [
        ['Leaf care and shaping', 'Уход за листьями и формировка'],
        [
          'Wipe each leaf with a soft damp cloth while supporting it from below. Rotate the pot gradually for even growth and prune above a node in spring when branching is desired.',
          'Протирайте каждый лист мягкой влажной тканью, поддерживая его снизу. Понемногу поворачивайте горшок для ровного роста и при необходимости ветвления обрезайте весной над узлом.',
        ],
      ],
      soil: [
        'Use an airy fertile mix such as 60% quality houseplant substrate, 20% fine bark and 20% perlite or pumice, always with reliable drainage.',
        'Используйте питательную воздушную смесь: например, 60% качественного грунта для комнатных растений, 20% мелкой коры и 20% перлита или пемзы, обязательно с надёжным дренажом.',
      ],
      temperature: [
        'Keep at 18–27 °C and preferably above 15 °C in winter. Protect the roots from cold windowsills and avoid sudden temperature changes.',
        'Содержите при 18–27 °C и желательно не ниже 15 °C зимой. Защищайте корни от холодного подоконника и избегайте резких перепадов температуры.',
      ],
      watering: [
        'Water thoroughly when the upper 3–5 cm of substrate has dried, then empty the saucer. Do not let the root ball stay wet or dry out completely for long.',
        'Поливайте обильно, когда верхние 3–5 см грунта просохнут, затем сливайте воду из поддона. Не держите корневой ком постоянно мокрым и не оставляйте его полностью сухим надолго.',
      ],
    }),
  ),
  collectionPlant(
    'asphodelaceae',
    'haworthiopsis-attenuata',
    '/plants/haworthiopsis-attenuata-home-photo.webp',
    ['Zebra haworthiopsis', 'Хавортиопсис оттянутый'],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Give bright diffused light with a little gentle morning or evening sun. Protect the rosette from intense midday rays behind glass, which can bleach or scorch the leaf tips.',
            'Обеспечьте яркий рассеянный свет и немного мягкого утреннего или вечернего солнца. Защищайте розетку от жёстких полуденных лучей за стеклом: они могут обесцветить листья и обжечь кончики.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Water thoroughly only after the gritty mix has dried completely. Drain all excess and keep the centre of the rosette dry; in cool, dark winter conditions water much less often.',
            'Обильно поливайте только после полного просыхания минерального субстрата. Полностью сливайте лишнюю воду и не оставляйте её в центре розетки; прохладной тёмной зимой поливайте значительно реже.',
          ],
        ],
        [
          ['Humidity and airflow', 'Влажность и воздух'],
          [
            'Normal dry room air suits this succulent. Do not mist routinely: low humidity and steady ventilation are safer than a damp, stagnant position.',
            'Этому суккуленту подходит обычный сухой комнатный воздух. Не опрыскивайте без необходимости: низкая влажность и стабильное проветривание безопаснее сырого застойного места.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Keep at about 16–27 °C during active growth and preferably above 10 °C in winter. Protect the roots from cold wet soil and the leaves from contact with icy glass.',
            'В период роста содержите примерно при 16–27 °C, а зимой желательно не ниже 10 °C. Берегите корни от холодного мокрого грунта, а листья — от контакта с ледяным стеклом.',
          ],
        ],
      ),
      1,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Asphodel family (Asphodelaceae)', 'Асфоделовые (Asphodelaceae)'],
        ],
        [
          ['Origin', 'Родина'],
          ['Cape Provinces of South Africa', 'Капская область Южной Африки'],
        ],
        [
          ['Plant type', 'Тип растения'],
          ['Stemless rosette succulent', 'Бесстебельный розеточный суккулент'],
        ],
      ),
      profileFooter(
        [
          [
            'The accepted botanical name is Haworthiopsis attenuata; Haworthia attenuata is an older synonym still common in shops.',
            'Raised white tubercles form the striped pattern that gives the plant its common name, zebra plant.',
            'A mature rosette gradually produces offsets and can develop into a dense clump.',
            'Small pale tubular flowers appear on a very thin stalk that may reach about 40 cm.',
          ],
          [
            'Принятое ботаническое название — Haworthiopsis attenuata; старый синоним Haworthia attenuata до сих пор часто встречается в магазинах.',
            'Рельефные белые бугорки образуют полосатый рисунок, из-за которого растение называют «зеброй».',
            'Взрослая розетка постепенно образует деток и со временем превращается в плотный кустик.',
            'Небольшие светлые трубчатые цветки появляются на очень тонком цветоносе высотой примерно до 40 см.',
          ],
        ],
        [
          'The main danger is water trapped in dense soil, an outer cachepot or the centre of the rosette. Use a pot with a drainage hole, empty the saucer after watering and let the mix dry completely before watering again.',
          'Главная опасность — вода, застоявшаяся в плотном грунте, внешнем кашпо или центре розетки. Используйте горшок с дренажным отверстием, сливайте воду из поддона и давайте субстрату полностью просохнуть перед следующим поливом.',
        ],
        [
          [
            'Soft translucent lower leaves or a loose dark base — stop watering and inspect the roots for rot.',
            'Brown dry tips — check for hot direct sun, prolonged drought or salt buildup.',
            'An elongated loose rosette with pale new growth — move gradually to brighter diffused light.',
            'White cottony deposits between leaves — isolate the plant and inspect closely for mealybugs.',
          ],
          [
            'Нижние листья размягчаются и становятся полупрозрачными, а основание темнеет — прекратите полив и проверьте корни на гниль.',
            'Кончики высыхают и коричневеют — проверьте жаркое прямое солнце, слишком долгую засуху и накопление солей.',
            'Розетка вытягивается и становится рыхлой, а новые листья бледнеют — постепенно добавьте яркого рассеянного света.',
            'Между листьями появляются белые ватные комочки — изолируйте растение и внимательно проверьте на мучнистого червеца.',
          ],
        ],
        [
          'Separate an offset when it has reached about one third of the mother rosette and has begun to form its own roots. Let any damaged tissue dry for one or two days, then plant the pup in a small pot of dry gritty mix and wait several days before the first light watering.',
          'Отделяйте детку, когда она достигнет примерно трети размера материнской розетки и начнёт формировать собственные корни. Подсушите повреждённое место один-два дня, посадите детку в маленький горшок с сухим минеральным субстратом и подождите несколько дней до первого лёгкого полива.',
        ],
      ),
      'Haworthiopsis attenuata',
      [
        'This compact zebra plant has already formed a dense group of patterned rosettes. The white raised stripes make every leaf look carefully drawn, even though the plant asks for very little attention.',
        'Этот компактный хавортиопсис уже сформировал плотный кустик из узорчатых розеток. Рельефные белые полоски делают каждый лист словно нарисованным, хотя само растение требует совсем немного внимания.',
      ],
      [
        'Haworthiopsis attenuata is a compact South African succulent with firm triangular leaves covered in raised white tubercles. It grows slowly, stays small indoors and gradually surrounds the main rosette with young offsets.',
        'Хавортиопсис оттянутый — компактный южноафриканский суккулент с плотными треугольными листьями, покрытыми рельефными белыми бугорками. Он растёт медленно, остаётся небольшим в комнате и постепенно окружает основную розетку молодыми детками.',
      ],
      quickFacts(['Slow', 'Медленный'], ['Rosette 8–15 cm', 'Розетка 8–15 см']),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use a very free-draining mix with about 60–75% pumice, perlite, lava grit or coarse sand and 25–40% light cactus compost.',
            'Используйте быстро просыхающий субстрат: примерно 60–75% пемзы, перлита, лавовой крошки или крупного песка и 25–40% лёгкого грунта для кактусов.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Repot in spring every 2–3 years or when offsets fill the pot. Choose a small shallow container with a drainage hole and keep the base of the rosette above the substrate.',
            'Пересаживайте весной раз в 2–3 года или когда детки заполнят горшок. Выбирайте небольшую неглубокую ёмкость с дренажным отверстием и не заглубляйте основание розетки.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'Feed once or twice from late spring to summer with a quarter- or half-strength low-nitrogen cactus fertiliser. Do not feed in winter or in completely dry soil.',
            'С конца весны до лета подкормите один-два раза четвертью или половиной дозы низкоазотного удобрения для кактусов. Не удобряйте зимой и по полностью сухому грунту.',
          ],
        ],
        [
          ['Grooming', 'Уход за розеткой'],
          [
            'Remove only fully dry lower leaves and spent flower stalks with clean tools. Brush dust from the grooves gently and never polish the textured leaves.',
            'Удаляйте чистым инструментом только полностью высохшие нижние листья и отцветшие цветоносы. Осторожно вычищайте пыль из углублений и не используйте полироль на фактурной листве.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/haworthiopsis-attenuata-important.webp',
        propagationImage: '/plant-profile/haworthiopsis-attenuata-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'asphodelaceae',
    'haworthia-cymbiformis-rescue',
    '/plants/haworthia-cymbiformis-rescue-home-photo-clean.webp',
    ['Boat-formed haworthia', 'Хавортия ладьевидная'],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Place in bright diffused light with a little gentle morning or evening sun. The translucent leaf windows look clearest in good light, but harsh midday rays behind glass can leave dry pale burns.',
            'Поставьте на яркий рассеянный свет с небольшим количеством мягкого утреннего или вечернего солнца. При хорошем освещении полупрозрачные «окошки» на листьях особенно выразительны, а жёсткие полуденные лучи за стеклом могут оставить сухие светлые ожоги.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Water thoroughly when the substrate is almost completely dry, then drain every drop of excess water. During recovery, do not try to compensate for wrinkled leaves with frequent watering: healthy roots and a steady wet-dry rhythm matter more.',
            'Поливайте обильно, когда субстрат почти полностью просохнет, и обязательно сливайте всю лишнюю воду. Во время восстановления не пытайтесь компенсировать сморщенные листья частыми поливами: здоровые корни и спокойный ритм «намокло — просохло» важнее.',
          ],
        ],
        [
          ['Humidity and airflow', 'Влажность и воздух'],
          [
            'Normal room humidity and regular airflow are ideal. Do not mist the rosette and do not leave water between the leaves, especially in cool weather.',
            'Подходят обычная комнатная влажность и регулярное движение воздуха. Не опрыскивайте розетку и не оставляйте воду между листьями, особенно в прохладную погоду.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Keep at about 16–26 °C during active growth. A brighter, cooler winter at roughly 10–16 °C is suitable if the substrate is kept much drier; protect the plant from frost and cold wet roots.',
            'В период роста содержите примерно при 16–26 °C. Зимой подойдёт более светлое и прохладное место около 10–16 °C при значительно более сухом содержании; защищайте растение от заморозков и холодных мокрых корней.',
          ],
        ],
      ),
      1,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Asphodel family (Asphodelaceae)', 'Асфоделовые (Asphodelaceae)'],
        ],
        [
          ['Origin', 'Родина'],
          [
            'Southern and south-eastern Cape Provinces of South Africa',
            'Юг и юго-восток Капской области Южной Африки',
          ],
        ],
        [
          ['Plant type', 'Тип растения'],
          ['Compact rosette succulent', 'Компактный розеточный суккулент'],
        ],
      ),
      profileFooter(
        [
          [
            'The identification is provisional: the broad boat-shaped leaves with translucent windowed tips most closely match Haworthia cymbiformis.',
            'The species name cymbiformis means “boat-shaped” and refers to the leaf form.',
            'The clear areas at the leaf tips transmit light deeper into the leaf when the plant grows partly sheltered in its native habitat.',
            'A healthy mature rosette readily produces offsets and slowly forms a compact group.',
          ],
          [
            'Определение предварительное: широкие ладьевидные листья с полупрозрачными «окошками» на концах больше всего соответствуют Haworthia cymbiformis.',
            'Видовое название cymbiformis означает «ладьевидная» и описывает форму листьев.',
            'Прозрачные участки на концах листьев проводят свет вглубь тканей, когда растение частично укрыто в естественной среде.',
            'Здоровая взрослая розетка охотно образует деток и постепенно превращается в компактную группу.',
          ],
        ],
        [
          'For a recently rescued, dehydrated plant, inspect the roots before increasing watering. Remove only dead tissue, use a small pot with a drainage hole and wait for firm new growth rather than expecting damaged leaves to become perfect again.',
          'У недавно спасённого и обезвоженного растения сначала проверьте корни и только потом увеличивайте полив. Удалите лишь отмершие ткани, используйте небольшой горшок с дренажным отверстием и ориентируйтесь на крепкий новый рост: повреждённые листья уже не станут идеальными.',
        ],
        [
          [
            'Soft translucent leaves and a dark loose base — stop watering and inspect the roots for rot.',
            'Deep wrinkles with a dry, firm base — check whether the roots are alive and adjust watering gradually.',
            'A stretched pale rosette — move the plant gradually into brighter diffused light.',
            'Dry bleached patches — protect from abrupt exposure to strong direct sun.',
          ],
          [
            'Листья размягчаются и становятся водянисто-прозрачными, основание темнеет — прекратите полив и проверьте корни на гниль.',
            'Листья сильно сморщены, но основание сухое и плотное — проверьте состояние корней и корректируйте полив постепенно.',
            'Розетка вытягивается и бледнеет — постепенно переставьте растение на более яркий рассеянный свет.',
            'Появились сухие выбеленные пятна — защитите от резкого попадания сильного прямого солнца.',
          ],
        ],
        [
          'Separate a well-rooted offset in the warm growing season. Let any damaged surface dry for one or two days, then place the offset in a small pot of dry gritty mix and begin light watering only after several days.',
          'Отделяйте детку с собственными корнями в тёплый период роста. Подсушите повреждённое место один-два дня, посадите детку в маленький горшок с сухим минеральным субстратом и начинайте осторожно поливать лишь через несколько дней.',
        ],
      ),
      'Haworthia cf. cymbiformis',
      [
        'I found this haworthia at Lemana PRO in a half-dried state. It looked as though it had been waiting quietly for someone to notice it; I felt sorry for the little rosette and brought it home. Now it has a calm place to recover, and every firm new leaf feels like a small sign that the rescue was worthwhile.',
        'Эту хавортию я увидела в «Лемана ПРО» уже полузасохшей. Казалось, она тихо ждала, пока кто-нибудь наконец её заметит; мне стало жалко маленькую розетку, и я забрала её домой. Теперь у неё есть спокойное место для восстановления, а каждый новый крепкий лист становится маленьким подтверждением того, что спасение было не напрасным.',
      ],
      [
        'Haworthia cymbiformis is a compact South African succulent that forms soft green rosettes. Its broad, slightly concave leaves end in translucent patterned windows that catch the light, while young offsets gradually gather around the mother plant.',
        'Хавортия ладьевидная — компактный южноафриканский суккулент с мягкой зелёной розеткой. Её широкие, слегка вогнутые листья заканчиваются узорчатыми полупрозрачными «окошками», которые красиво ловят свет, а вокруг материнского растения со временем появляются молодые детки.',
      ],
      quickFacts(['Slow', 'Медленный'], ['Rosette 5–10 cm', 'Розетка 5–10 см']),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use a loose fast-drying mix with about 60–75% pumice, perlite, lava grit or coarse sand and 25–40% light cactus compost.',
            'Используйте рыхлый быстро просыхающий субстрат: примерно 60–75% пемзы, перлита, лавовой крошки или крупного песка и 25–40% лёгкого грунта для кактусов.',
          ],
        ],
        [
          ['Repotting and recovery', 'Пересадка и восстановление'],
          [
            'After purchase, inspect the root system and repot only if the nursery mix is exhausted, compacted or stays wet too long. Choose a small shallow pot with drainage and keep the base of the rosette above the substrate.',
            'После покупки осмотрите корни и пересаживайте, только если магазинный субстрат истощён, слежался или слишком долго остаётся мокрым. Выберите небольшой неглубокий горшок с дренажом и не заглубляйте основание розетки.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'Wait for visible healthy growth before feeding a recovering plant. Then feed once or twice from late spring to summer with a quarter-strength low-nitrogen cactus fertiliser.',
            'Не подкармливайте восстанавливающееся растение, пока не появится заметный здоровый рост. Затем с конца весны до лета внесите один-два раза четверть дозы низкоазотного удобрения для кактусов.',
          ],
        ],
        [
          ['Seasonal rhythm', 'Сезонный ритм'],
          [
            'In brighter warm months, check the dry substrate more often and watch for new offsets. In winter, maximise gentle light, stop feeding and extend the dry interval between waterings.',
            'В тёплые светлые месяцы чаще проверяйте просохший субстрат и наблюдайте за появлением деток. Зимой обеспечьте максимум мягкого света, отмените подкормки и увеличьте сухой интервал между поливами.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/haworthia-cymbiformis-important.webp',
        propagationImage: '/plant-profile/haworthia-cymbiformis-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'bromeliaceae',
    'tillandsia-usneoides-thai-composition',
    '/plant-profile/tillandsia-composition-gallery/03-spanish-moss-tail.webp',
    ['Spanish moss', 'Тилландсия уснеевидная'],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Give bright diffused light with a little gentle morning or evening sun. Strong midday rays can scorch the fine silver strands, while deep shade causes weak, sparse growth.',
            'Обеспечьте яркий рассеянный свет и немного мягкого утреннего или вечернего солнца. Жёсткие полуденные лучи могут обжечь тонкие серебристые пряди, а глубокая тень приводит к слабому и редкому росту.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Thoroughly wet the entire strand with soft rain, filtered or settled water once or twice a week, and more often in hot, dry air. A generous rinse or short soak should reach the inner stems, not only the outer surface.',
            'Один-два раза в неделю полностью смачивайте всю прядь мягкой дождевой, фильтрованной или отстоянной водой, а в жарком сухом воздухе — чаще. Обильное промывание или короткое замачивание должно увлажнить внутренние стебли, а не только наружный слой.',
          ],
        ],
        [
          ['Drying and airflow', 'Просушка и воздух'],
          [
            'After watering, shake the strand gently, spread it out and hang it loosely so air reaches the centre. Constant air movement matters more than very high humidity; never leave the plant compressed into a dense wet bundle.',
            'После полива аккуратно встряхните прядь, расправьте и свободно развесьте, чтобы воздух проходил к центру. Постоянное движение воздуха важнее очень высокой влажности; не оставляйте растение сжатым в плотный мокрый пучок.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Keep at about 15–30 °C with no cold draughts or contact with icy glass. In a cooler, darker season reduce wetting frequency, but do not let the fine strands remain dry and brittle for many weeks.',
            'Содержите примерно при 15–30 °C без холодных сквозняков и контакта с ледяным стеклом. В прохладный тёмный сезон сокращайте частоту намокания, но не оставляйте тонкие пряди сухими и ломкими на много недель.',
          ],
        ],
      ),
      2,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Bromeliad family (Bromeliaceae)', 'Бромелиевые (Bromeliaceae)'],
        ],
        [
          ['Origin', 'Происхождение'],
          ['Tropical and subtropical America', 'Тропическая и субтропическая Америка'],
        ],
        [
          ['Plant type', 'Тип растения'],
          ['Trailing rootless epiphyte', 'Свисающий эпифит без взрослых корней'],
        ],
      ),
      profileFooter(
        [
          [
            'Spanish moss is a flowering bromeliad rather than a true moss, and it comes from the Americas rather than Spain.',
            'Its surface scales, or trichomes, take up moisture and dissolved nutrients directly from air and water.',
            'Mature plants have no functional roots and simply tangle around branches or other open supports.',
            'A long curtain is formed by many short overlapping shoots rather than one continuous stem.',
          ],
          [
            '«Испанский мох» — цветковое растение из семейства бромелиевых, а не настоящий мох; родом оно из Америки, а не из Испании.',
            'Поверхностные чешуйки — трихомы — поглощают влагу и растворённые питательные вещества прямо из воздуха и воды.',
            'У взрослого растения нет функционирующих корней: оно просто цепляется перепутанными побегами за ветви или открытые опоры.',
            'Длинная завеса состоит из множества коротких перекрывающихся побегов, а не из одного непрерывного стебля.',
          ],
        ],
        [
          'The greatest risk is a dense wet bundle with no air in its centre. After every soak, shake the strand carefully and spread it loosely. At the same time, do not let the fine living tips remain completely dry until they become brittle.',
          'Главный риск — плотный мокрый пучок без воздуха в центре. После каждого замачивания аккуратно встряхивайте и свободно расправляйте прядь. При этом не оставляйте тонкие живые кончики полностью сухими до состояния ломкости.',
        ],
        [
          [
            'Dry tightly curled tips and brittle Spanish moss — increase watering frequency and check hot direct sun.',
            'Dark soft stems or a musty smell — separate the bundle, dry it quickly and remove decaying sections.',
            'Sparse pale new growth — move gradually to brighter diffused light.',
            'White cottony clusters or sticky patches — isolate the strand and inspect for mealybugs or scale.',
          ],
          [
            'Сухие сильно скрученные кончики и ломкий испанский мох — поливайте чаще и проверьте, нет ли жаркого прямого солнца.',
            'Тёмные мягкие стебли или затхлый запах — разделите пучок, быстро просушите и удалите загнивающие участки.',
            'Редкий бледный новый рост — постепенно переставьте на более яркий рассеянный свет.',
            'Белые ватные комочки или липкие участки — изолируйте прядь и проверьте её на мучнистого червеца или щитовку.',
          ],
        ],
        [
          'Divide a healthy strand into generous sections rather than tiny fragments. Hang each section where it receives bright light, regular wetting and moving air; the overlapping shoots will continue branching and tangling together.',
          'Разделите здоровую прядь на достаточно крупные части, а не на мелкие обрывки. Развесьте каждую там, где есть яркий свет, регулярное увлажнение и движение воздуха: перекрывающиеся побеги продолжат ветвиться и переплетаться.',
        ],
      ),
      'Tillandsia usneoides',
      [
        'I brought this Spanish moss home from Thailand as the long silver tail of a finished hanging composition. Above it, a group of rosette Tillandsias was fixed to a coconut base. I could not take the coconut onto the plane, so I carefully dismantled the arrangement and carried both plants separately. At home, this Tillandsia kept its cascading shape in a new soil-free display.',
        'Эту уснеевидную тилландсию я привезла из Таиланда как длинный серебристый хвост готовой подвесной композиции. Над ней на кокосовой основе была закреплена группа розеточных тилландсий. Взять кокос в самолёт было нельзя, поэтому перед дорогой я аккуратно разобрала композицию и везла оба растения отдельно. Дома тилландсия сохранила свою каскадную форму уже в новом оформлении без грунта.',
      ],
      [
        'Tillandsia usneoides is a rootless trailing epiphyte that forms long silver-grey curtains of branching, overlapping shoots. Specialised scales cover its narrow leaves and stems, collecting water directly from rain, mist and humid air.',
        'Тилландсия уснеевидная — свисающий эпифит без взрослых корней, образующий длинные серебристо-серые завесы из ветвящихся перекрывающихся побегов. Узкие листья и стебли покрыты особыми чешуйками, собирающими воду прямо из дождя, тумана и влажного воздуха.',
      ],
      quickFacts(
        ['Moderate', 'Умеренный'],
        ['Trailing strands can exceed 1 m', 'Свисающие пряди могут быть длиннее 1 м'],
      ),
      careCards(
        [
          ['Mounting', 'Размещение'],
          [
            'Hang the strand from a dry branch, hook or other open support that does not trap water. Spread it over several contact points rather than compressing it under a tight tie, and avoid direct contact with bare copper.',
            'Развесьте прядь на сухой ветке, крючке или другой открытой опоре, не задерживающей воду. Распределите её по нескольким точкам опоры вместо сжатия тугой завязкой и избегайте прямого контакта с необработанной медью.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'During active growth, add a quarter-strength bromeliad or orchid fertiliser to the water about once a month. Use very little fertiliser and regularly rinse the strand with clean soft water.',
            'В период активного роста примерно раз в месяц добавляйте в воду четверть дозы удобрения для бромелиевых или орхидей. Используйте минимум удобрения и регулярно промывайте прядь чистой мягкой водой.',
          ],
        ],
        [
          ['Cleaning', 'Очищение'],
          [
            'Remove dust with a gentle rinse rather than rubbing the fine shoots. Tease apart compacted sections, remove only fully dead brown fragments and never coat the plant with leaf shine.',
            'Удаляйте пыль лёгким промыванием, не растирая тонкие побеги. Осторожно распутывайте уплотнившиеся участки, убирайте только полностью отмершие коричневые фрагменты и никогда не покрывайте растение полиролью.',
          ],
        ],
        [
          ['Seasonal rhythm', 'Сезонный ритм'],
          [
            'In warm bright months, check the strand often and wet it more regularly. In winter, keep it in the brightest suitable position, water less often and prioritise complete drying before night.',
            'В тёплые светлые месяцы чаще проверяйте прядь и регулярно увлажняйте. Зимой держите её в самом светлом подходящем месте, мочите реже и обязательно полностью просушивайте до ночи.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/tillandsia-usneoides-important.webp',
        mainImageVariantIndex: 1,
        propagationImage: '/plant-profile/tillandsia-usneoides-propagation.webp',
        variants: profileVariants(
          ['The Thai composition', 'Композиция из Таиланда'],
          [
            'The gallery shows how this Spanish moss formed the long silver tail of the original coconut-mounted composition and how the two Tillandsias were displayed after the journey home.',
            'Галерея показывает, как уснеевидная тилландсия образовывала длинный серебристый хвост первоначальной композиции на кокосе и как обе тилландсии были оформлены после возвращения домой.',
          ],
          [
            '/plant-profile/tillandsia-composition-gallery/02-full-composition.webp',
            ['Original hanging composition', 'Первоначальная подвесная композиция'],
          ],
          [
            '/plant-profile/tillandsia-composition-gallery/03-spanish-moss-tail.webp',
            ['Spanish moss in the composition', 'Уснеевидная тилландсия в композиции'],
          ],
          [
            '/plant-profile/tillandsia-composition-gallery/04-current-display.webp',
            ['The new display at home', 'Новое оформление дома'],
          ],
        ),
      },
    ),
    1,
  ),
  collectionPlant(
    'bromeliaceae',
    'tillandsia-ionantha-thai-composition',
    '/plant-profile/tillandsia-composition-gallery/01-at-purchase.webp',
    ['Tillandsia ionantha', 'Тилландсия ионанта'],
    tillandsiaProfile({
      assets: {
        importantImage: '/plant-profile/tillandsia-ionantha-important.webp',
        propagationImage: '/plant-profile/tillandsia-ionantha-propagation.webp',
      },
      facts: [
        [
          'The identification as Tillandsia ionantha is based on the compact silvery rosettes and the red blush of the central leaves; the original Thai composition had no surviving species label.',
          'The accepted species is native from Mexico through Central America.',
          'The narrow green leaves are densely packed and covered with silvery moisture-absorbing scales, especially near the base.',
          'Before flowering, mature rosettes can blush red and produce tubular violet flowers, then form pups around the base.',
        ],
        [
          'Определение как Tillandsia ionantha сделано по компактным серебристым розеткам и краснеющим центральным листьям; исходная тайская композиция не сохранила бирку с видом.',
          'Признанный вид в природе распространён от Мексики до Центральной Америки.',
          'Узкие зелёные листья плотно собраны и покрыты серебристыми поглощающими влагу чешуйками, особенно у основания.',
          'Перед цветением взрослые розетки могут краснеть и выпускать трубчатые фиолетовые цветки, а затем образуют деток у основания.',
        ],
      ],
      height: ['Rosettes usually up to 10 cm', 'Розетки обычно до 10 см'],
      latinName: 'Tillandsia cf. ionantha',
      notes: [
        'I brought this group home from Thailand as the upper crest of a finished hanging composition. The rosettes were fixed above a long curtain of Tillandsia usneoides on a coconut base. I could not take the coconut onto the plane, so I carefully dismantled the arrangement and carried both plants separately. At home, the rosettes became their own collection plant while keeping the story of that composition.',
        'Эту группу розеток я привезла из Таиланда как верхний хохолок готовой подвесной композиции. Розетки были закреплены на кокосовой основе над длинной завесой Tillandsia usneoides. Взять кокос в самолёт было нельзя, поэтому перед дорогой я аккуратно разобрала композицию и везла оба растения отдельно. Дома розетки стали самостоятельным растением коллекции, сохранив историю того тайского подвеса.',
      ],
      origin: ['Mexico to Central America', 'Мексика и Центральная Америка'],
      overview: [
        'A compact air plant that grows as dense silver-green rosettes and readily forms a cluster of offsets. The red blush visible on the central leaves is characteristic of Tillandsia ionantha approaching bloom, which makes this the most likely identification from the surviving photographs.',
        'Компактная атмосферная тилландсия, образующая плотные серебристо-зелёные розетки и группу деток. Красный румянец на центральных листьях характерен для Tillandsia ionantha перед цветением, поэтому по сохранившимся фотографиям это наиболее вероятное определение.',
      ],
    }),
    1,
  ),
  collectionPlant(
    'bromeliaceae',
    'tillandsia-andreana',
    '/plants/tillandsia-andreana-home-photo.webp',
    ['Tillandsia andreana', 'Тилландсия Андреана'],
    tillandsiaProfile({
      assets: {
        importantImage: '/plant-profile/tillandsia-andreana-important.webp',
        propagationImage: '/plant-profile/tillandsia-andreana-propagation.webp',
      },
      facts: [
        [
          'Tillandsia andreana is an accepted species rather than a horticultural hybrid.',
          'Its many thread-thin leaves form a light, almost spherical tuft.',
          'Silvery trichomes over the leaves collect water and dissolved nutrients.',
          'A mature plant can produce a vivid red tubular flower from the centre of the tuft.',
        ],
        [
          'Тилландсия Андреана — самостоятельный природный вид, а не садовый гибрид.',
          'Множество тонких, как нити, листьев образуют лёгкий, почти шаровидный пучок.',
          'Серебристые трихомы на листьях собирают воду и растворённые в ней питательные вещества.',
          'Взрослое растение может выпустить из центра пучка ярко-красный трубчатый цветок.',
        ],
      ],
      height: ['Usually about 10–15 cm', 'Обычно около 10–15 см'],
      latinName: 'Tillandsia andreana',
      notes: [
        'Its airy silhouette is unlike the denser rosettes in my collection: the fine leaves turn the whole plant into a soft silver-green cloud.',
        'Её воздушный силуэт не похож на более плотные розетки в моей коллекции: тонкие листья превращают всё растение в мягкое серебристо-зелёное облако.',
      ],
      origin: ['Colombia to north-western Venezuela', 'Колумбия и северо-запад Венесуэлы'],
      overview: [
        'A compact air plant with exceptionally fine, flexible leaves radiating into a loose rounded tuft. The pale surface is densely covered with moisture-absorbing trichomes, so the plant lives without potting soil and needs careful wetting followed by fast drying.',
        'Компактная атмосферная тилландсия с необычайно тонкими гибкими листьями, расходящимися в рыхлый округлый пучок. Светлая поверхность густо покрыта поглощающими влагу трихомами, поэтому растение живёт без грунта и нуждается в обильном смачивании с быстрой последующей просушкой.',
      ],
    }),
  ),
  collectionPlant(
    'bromeliaceae',
    'tillandsia-melanocrater',
    '/plants/tillandsia-melanocrater-home-photo.webp',
    ["Tillandsia 'Melanocrater'", 'Тилландсия Меланократер'],
    tillandsiaProfile({
      assets: {
        importantImage: '/plant-profile/tillandsia-melanocrater-important.webp',
        propagationImage: '/plant-profile/tillandsia-melanocrater-propagation.webp',
      },
      facts: [
        [
          'Plants of the World Online treats Tillandsia melanocrater as a synonym of the accepted Tillandsia tricolor.',
          'The trade name Melanocrater is retained here because it identifies this particular plant in the collection.',
          'Its upright, narrow leaves form a taller and more architectural rosette than Tillandsia andreana.',
          'After flowering, a mature rosette can form pups around its base and gradually become a cluster.',
        ],
        [
          'Plants of the World Online считает Tillandsia melanocrater синонимом признанного вида Tillandsia tricolor.',
          'Торговое название «Меланократер» сохранено здесь, потому что именно так это растение обозначено в коллекции.',
          'Прямые узкие листья образуют более высокую и архитектурную розетку, чем у тилландсии Андреана.',
          'После цветения взрослая розетка может образовать деток у основания и постепенно превратиться в группу.',
        ],
      ],
      height: ['Usually about 20–40 cm', 'Обычно около 20–40 см'],
      latinName: 'Tillandsia tricolor (syn. Tillandsia melanocrater)',
      notes: [
        'I keep its familiar Melanocrater name in the collection, while the profile also records the currently accepted botanical name Tillandsia tricolor.',
        'В коллекции я сохраняю знакомое название «Меланократер», а в профиле одновременно указано современное признанное ботаническое имя Tillandsia tricolor.',
      ],
      origin: ['Southern Mexico to Central America', 'Юг Мексики и Центральная Америка'],
      overview: [
        'A strong upright air plant with a vase-shaped rosette of narrow green leaves and darker overlapping bases. It is commonly sold as Tillandsia melanocrater, a name now treated as a synonym of Tillandsia tricolor.',
        'Крепкая вертикальная атмосферная тилландсия с вазообразной розеткой из узких зелёных листьев с более тёмными налегающими основаниями. Её часто продают как Tillandsia melanocrater, но сейчас это название считается синонимом Tillandsia tricolor.',
      ],
    }),
  ),
  collectionPlant(
    'araceae',
    'dieffenbachia-snow',
    '/plants/dieffenbachia-snow-home-photo.webp',
    ["Dieffenbachia 'Snow'", "Диффенбахия 'Snow'"],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Give bright diffused light without harsh midday sun. The plant tolerates medium light, but brighter filtered light keeps the cream-white speckling strong and the growth compact.',
            'Обеспечьте яркий рассеянный свет без жёсткого полуденного солнца. Растение переносит среднее освещение, но на более ярком фильтрованном свету кремово-белый крап остаётся контрастным, а рост — компактным.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Water thoroughly when the upper 3–5 cm of substrate has dried, then drain all excess. Keep the root ball lightly moist during active growth but never waterlogged.',
            'Хорошо проливайте после просыхания верхних 3–5 см грунта, затем полностью сливайте лишнюю воду. В период активного роста поддерживайте корневой ком слегка влажным, но не заболоченным.',
          ],
        ],
        [
          ['Humidity and airflow', 'Влажность и воздух'],
          [
            'Average to moderately high room humidity, around 50–70%, suits the broad leaves. Provide gentle airflow and wipe dust away rather than leaving the foliage constantly wet.',
            'Широким листьям подходит средняя или умеренно высокая комнатная влажность около 50–70%. Обеспечьте лёгкое движение воздуха и протирайте пыль, не оставляя листву постоянно мокрой.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Keep at about 18–29 °C and preferably above 16 °C in winter. Protect the leaves and roots from cold draughts, icy glass and abrupt temperature changes.',
            'Содержите примерно при 18–29 °C, а зимой желательно не ниже 16 °C. Берегите листья и корни от холодных сквозняков, ледяного стекла и резких перепадов температуры.',
          ],
        ],
      ),
      2,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Aroid family (Araceae)', 'Ароидные (Araceae)'],
        ],
        [
          ['Origin', 'Происхождение'],
          [
            'Cultivar of tropical American Dieffenbachia',
            'Сорт тропической американской диффенбахии',
          ],
        ],
        [
          ['Plant type', 'Тип растения'],
          [
            'Evergreen cane-forming tropical subshrub',
            'Вечнозелёный тропический полукустарник с тростниковыми стеблями',
          ],
        ],
      ),
      profileFooter(
        [
          [
            "'Snow' is a large-growing Dieffenbachia cultivar with dark green leaves densely marked by silvery-green and cream-white speckles.",
            'The upright stems gradually become cane-like and carry large arching leaf blades.',
            'A bare healthy cane can produce new shoots from dormant nodes after pruning.',
            'Like other aroids, a mature plant may occasionally form a spadix surrounded by a pale spathe, although flowering indoors is uncommon.',
          ],
          [
            "'Snow' — крупный сорт диффенбахии с тёмно-зелёными листьями, густо покрытыми серебристо-зелёными и кремово-белыми крапинками.",
            'Вертикальные стебли постепенно становятся тростниковыми и несут крупные дугообразно расположенные листовые пластины.',
            'Здоровый оголившийся стебель после обрезки способен дать новые побеги из спящих узлов.',
            'Как и другие ароидные, взрослое растение иногда образует початок со светлым покрывалом, хотя в комнате цветёт редко.',
          ],
        ],
        [
          'Dieffenbachia sap contains irritating calcium oxalate crystals. Wear gloves when pruning or propagating, keep the sap away from eyes and mouth, wash tools and hands afterwards, and place the plant where children and pets cannot chew it.',
          'Сок диффенбахии содержит раздражающие кристаллы оксалата кальция. При обрезке и размножении надевайте перчатки, не допускайте попадания сока в глаза и рот, мойте инструменты и руки после работы и размещайте растение там, где его не смогут жевать дети и животные.',
        ],
        [
          [
            'Yellow soft lower leaves and wet substrate — reduce watering and inspect the roots and cane bases for rot.',
            'Brown dry patches — check harsh direct sun, cold contact with glass and prolonged drought.',
            'New leaves become smaller and greener — move gradually to brighter diffused light and review feeding.',
            'Fine webbing, sticky residue or white cottony clusters — isolate and inspect for spider mites, scale or mealybugs.',
          ],
          [
            'Нижние листья желтеют и размягчаются при мокром грунте — сократите полив и проверьте корни и основания стеблей на гниль.',
            'Появляются сухие коричневые участки — проверьте жёсткое прямое солнце, контакт с холодным стеклом и длительную пересушку.',
            'Новые листья становятся мельче и зеленее — постепенно добавьте яркого рассеянного света и проверьте режим подкормок.',
            'Появились тонкая паутинка, липкий налёт или белые ватные комочки — изолируйте растение и проверьте на клеща, щитовку и мучнистого червеца.',
          ],
        ],
        [
          'Wear gloves and cut a healthy top section below a node, or divide a bare cane into pieces with at least one node each. Root top cuttings upright and lay cane sections horizontally on warm, lightly moist, airy substrate until new shoots and roots develop.',
          'Наденьте перчатки и срежьте здоровую верхушку ниже узла либо разделите оголённый стебель на части минимум с одним узлом. Верхушечные черенки укореняйте вертикально, а отрезки стебля уложите горизонтально на тёплый слегка влажный воздушный субстрат до появления побегов и корней.',
        ],
      ),
      "Dieffenbachia 'Snow'",
      [
        'This is one of the largest and most spectacular foliage plants in my collection. Every broad leaf has its own scattering of pale marks, and in sunlight the dense crown looks as though it has been dusted with snow.',
        'Это одно из самых крупных и эффектных декоративно-лиственных растений в моей коллекции. На каждом широком листе свой рисунок из светлых крапинок, а на солнце густая крона выглядит так, словно её припорошило снегом.',
      ],
      [
        "Dieffenbachia 'Snow' is a large upright cultivar with broad glossy dark green leaves scattered with silvery-green and cream-white markings. With warmth, filtered light and steady but careful watering, it develops into a dense architectural plant with strong cane-like stems.",
        "Диффенбахия 'Snow' — крупный вертикально растущий сорт с широкими глянцевыми тёмно-зелёными листьями, покрытыми серебристо-зелёными и кремово-белыми отметинами. В тепле, на фильтрованном свету и при регулярном аккуратном поливе она превращается в густое архитектурное растение с крепкими тростниковыми стеблями.",
      ],
      quickFacts(
        ['Moderate to fast', 'Умеренный или быстрый'],
        ['Usually 1–1.8 m indoors', 'Обычно 1–1,8 м в комнате'],
      ),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use an airy, moisture-retentive mix such as 50% light houseplant compost, 25% perlite or pumice and 25% fine orchid bark or coco chips.',
            'Используйте воздушный, но влагоёмкий субстрат: например, 50% лёгкого грунта для комнатных растений, 25% перлита или пемзы и 25% мелкой орхидейной коры или кокосовых чипсов.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Repot in spring every 1–2 years or when roots fill the container. Choose a stable pot with drainage only 3–5 cm wider and keep the cane bases at their previous level.',
            'Пересаживайте весной раз в 1–2 года или когда корни заполнят ёмкость. Выбирайте устойчивый горшок с дренажом лишь на 3–5 см шире и сохраняйте прежний уровень посадки стеблей.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'From spring to early autumn, feed every 3–4 weeks with a half-strength balanced fertiliser. Pause in winter and do not fertilise dry soil or a stressed plant.',
            'С весны до начала осени подкармливайте раз в 3–4 недели половинной дозой сбалансированного удобрения. Зимой сделайте паузу и не удобряйте сухой грунт или ослабленное растение.',
          ],
        ],
        [
          ['Cleaning and pruning', 'Очищение и обрезка'],
          [
            'Wipe the broad leaves with a soft damp cloth, rotate the pot for even growth and remove yellow foliage with clean tools. Wear gloves whenever cutting stems or leaves.',
            'Протирайте широкие листья мягкой влажной тканью, поворачивайте горшок для ровного роста и удаляйте пожелтевшую листву чистым инструментом. При любой обрезке стеблей и листьев надевайте перчатки.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/dieffenbachia-snow-important.webp',
        propagationImage: '/plant-profile/dieffenbachia-snow-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'apocynaceae',
    'hoya-pubicalyx-splash',
    '/plants/hoya-pubicalyx-splash-home-photo.webp',
    ["Hoya pubicalyx 'Splash'", "Хойя пубикаликс 'Splash'"],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Give bright filtered light and a little gentle morning or evening sun. Good light supports compact leaves, stronger silver flecking and future flowering, but harsh midday sun can scorch the foliage.',
            'Обеспечьте яркий фильтрованный свет и немного мягкого утреннего или вечернего солнца. Хорошее освещение помогает сохранять компактные листья, заметный серебристый крап и стимулирует будущее цветение, но жёсткое полуденное солнце может обжечь листву.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Water thoroughly after at least the upper third of the mix has dried, then empty the saucer or cachepot. Reduce watering in cooler, darker months and never keep the roots constantly wet.',
            'Хорошо проливайте после просыхания как минимум верхней трети субстрата, затем сливайте воду из поддона или кашпо. В прохладные тёмные месяцы поливайте реже и никогда не держите корни постоянно мокрыми.',
          ],
        ],
        [
          ['Humidity and airflow', 'Влажность и воздух'],
          [
            'Moderate room humidity is suitable, while 50–70% encourages active growth. Steady airflow is more important than routine misting; keep wet leaves away from cold glass.',
            'Подходит умеренная комнатная влажность, а уровень 50–70% поддерживает активный рост. Стабильное движение воздуха важнее регулярных опрыскиваний; не оставляйте мокрые листья у холодного стекла.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Keep at about 18–29 °C and preferably above 15 °C in winter. Protect the tropical vine from cold draughts and sudden temperature changes.',
            'Содержите примерно при 18–29 °C, а зимой желательно не ниже 15 °C. Берегите тропическую лиану от холодных сквозняков и резких перепадов температуры.',
          ],
        ],
      ),
      2,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Dogbane family (Apocynaceae)', 'Кутровые (Apocynaceae)'],
        ],
        [
          ['Origin', 'Родина'],
          ['Luzon, Philippines', 'Остров Лусон, Филиппины'],
        ],
        [
          ['Plant type', 'Тип растения'],
          ['Evergreen epiphytic climbing vine', 'Вечнозелёная эпифитная лиана'],
        ],
      ),
      profileFooter(
        [
          [
            'Hoya pubicalyx is an accepted species native to the Philippine island of Luzon.',
            "The silver 'splash' is natural colouring in the leaf tissue rather than damage or residue.",
            'Long leafless searching vines are normal: they twine around a support before producing new leaves.',
            'Mature plants form rounded umbels of waxy star-shaped flowers, often with a light fragrance.',
          ],
          [
            'Hoya pubicalyx — признанный вид, происходящий с филиппинского острова Лусон.',
            'Серебристый «сплэш» — естественная окраска тканей листа, а не повреждение или налёт.',
            'Длинные ищущие плети без листьев нормальны: сначала они обвивают опору, а затем наращивают листву.',
            'Взрослые растения образуют округлые зонтики восковых звёздчатых цветков, нередко с лёгким ароматом.',
          ],
        ],
        [
          'Do not leave the pot standing in water and do not cut old flower spurs after blooming. Hoyas can flower repeatedly from the same short peduncle, while persistently wet substrate quickly damages their epiphytic roots.',
          'Не оставляйте горшок в воде и не срезайте старые цветоносы после цветения. Хойя способна цвести повторно на одном и том же коротком цветоносе, а постоянно мокрый грунт быстро повреждает её эпифитные корни.',
        ],
        [
          [
            'Soft yellowing leaves and wet substrate — stop watering and inspect the roots and stem base for rot.',
            'Wrinkled flexible leaves — check whether the mix is too dry or the roots have stopped absorbing water.',
            'Long weak growth with small pale leaves — move gradually to brighter filtered light.',
            'Sticky residue, brown shields or white cottony clusters — isolate and inspect for scale or mealybugs.',
          ],
          [
            'Листья желтеют и размягчаются при мокром грунте — прекратите полив и проверьте корни и основание стеблей на гниль.',
            'Листья становятся гибкими и морщинистыми — проверьте, не пересушен ли субстрат и способны ли корни впитывать воду.',
            'Плети слабые, а новые листья мелкие и бледные — постепенно добавьте яркого фильтрованного света.',
            'Появились липкий налёт, коричневые щитки или белые ватные комочки — изолируйте растение и проверьте на щитовку и мучнистого червеца.',
          ],
        ],
        [
          'Take a healthy stem section with two or three nodes, remove the lowest leaf and root at least one node in water, moist sphagnum, perlite or an airy bark-based mix. Keep the cutting warm and bright, then pot it once several roots have formed.',
          'Возьмите здоровый участок стебля с двумя-тремя узлами, удалите нижний лист и укореняйте как минимум один узел в воде, влажном сфагнуме, перлите или воздушной смеси с корой. Держите черенок в тепле и на свету, а после появления нескольких корней посадите в небольшой горшок.',
        ],
      ),
      "Hoya pubicalyx 'Splash'",
      [
        'This mature hoya has grown into a dense cascade of long vines. I especially like the uneven silver speckles on its firm leaves and the curious bare tendrils that reach beyond the crown in search of a new support.',
        'Эта взрослая хойя превратилась в густой каскад длинных плетей. Особенно мне нравятся неровные серебристые крапинки на плотных листьях и любопытные голые побеги, которые тянутся за пределы куста в поисках новой опоры.',
      ],
      [
        "Hoya pubicalyx 'Splash' is a vigorous Philippine climber with firm pointed leaves scattered with silver flecks. Its flexible shoots can trail freely or wrap around a support, and a mature well-lit plant may produce rounded clusters of waxy star-shaped flowers.",
        "Хойя пубикаликс 'Splash' — энергичная филиппинская лиана с плотными заострёнными листьями, покрытыми серебристым крапом. Гибкие побеги могут свободно свисать или обвивать опору, а взрослое растение при хорошем освещении способно образовывать округлые соцветия из восковых звёздчатых цветков.",
      ],
      quickFacts(
        ['Moderate to fast', 'Умеренный или быстрый'],
        ['Vines commonly 2–3 m indoors', 'Плети обычно 2–3 м в комнате'],
      ),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use a loose epiphytic mix: about 40% fine orchid bark, 30% coco or light peat-free compost and 30% perlite, pumice or other coarse mineral material.',
            'Используйте рыхлую эпифитную смесь: примерно 40% мелкой орхидейной коры, 30% кокосового или лёгкого безторфяного грунта и 30% перлита, пемзы или другого крупного минерального компонента.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Repot in spring every 2–3 years or when the mix has broken down. Hoyas flower well when slightly root-bound, so choose a stable pot only 2–3 cm wider and always provide drainage.',
            'Пересаживайте весной раз в 2–3 года или когда субстрат начинает разрушаться. Хойи хорошо цветут в слегка тесном горшке, поэтому выбирайте устойчивую ёмкость лишь на 2–3 см шире и обязательно с дренажным отверстием.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'During active growth, feed every 3–4 weeks with a half-strength balanced fertiliser. Pause in winter and never fertilise a completely dry or recently repotted plant.',
            'В период активного роста подкармливайте раз в 3–4 недели половинной дозой сбалансированного удобрения. Зимой сделайте паузу и не удобряйте полностью сухое или недавно пересаженное растение.',
          ],
        ],
        [
          ['Training and pruning', 'Опора и обрезка'],
          [
            'Guide young flexible shoots around a hoop or trellis without forcing sharp bends. Shorten an overgrown vine above a node if needed, but preserve every old flower peduncle.',
            'Направляйте молодые гибкие плети по кольцу или шпалере без резких перегибов. При необходимости укорачивайте разросшийся побег над узлом, но сохраняйте каждый старый цветонос.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/hoya-pubicalyx-splash-important.webp',
        propagationImage: '/plant-profile/hoya-pubicalyx-splash-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'apocynaceae',
    'dischidia-oiantha',
    '/plants/dischidia-oiantha-home-photo.webp',
    ['Dischidia oiantha', 'Дисхидия оианта'],
    simplePlantProfile({
      assets: {
        importantImage: '/plant-profile/dischidia-oiantha-important.webp',
        propagationImage: '/plant-profile/dischidia-oiantha-propagation.webp',
      },
      difficulty: 2,
      facts: [
        [
          'Dischidia oiantha is an accepted species native to the Philippines.',
          'In nature it grows as an epiphyte, using tree trunks and branches for support rather than feeding on them.',
          'The small waxy leaves grow in opposite pairs and store some water.',
          'Mature plants can produce tiny pale flowers at the nodes, although flowering indoors is not guaranteed.',
        ],
        [
          'Дисхидия оианта — признанный вид, происходящий с Филиппин.',
          'В природе она растёт как эпифит, используя стволы и ветви деревьев только в качестве опоры.',
          'Мелкие восковые листья расположены супротивными парами и запасают немного воды.',
          'Взрослое растение может образовывать в узлах маленькие светлые цветки, хотя в комнате цветение не гарантировано.',
        ],
      ],
      family: ['Dogbane family (Apocynaceae)', 'Кутровые (Apocynaceae)'],
      feeding: [
        'From spring to early autumn, feed every 4 weeks with a balanced fertiliser diluted to quarter or half strength. Do not feed a dry, stressed or freshly repotted plant.',
        'С весны до начала осени подкармливайте раз в четыре недели сбалансированным удобрением в четвертной или половинной дозировке. Не удобряйте сухое, ослабленное или недавно пересаженное растение.',
      ],
      growth: ['Moderate', 'Умеренный'],
      height: [
        'Trailing stems can reach about 50–100 cm',
        'Свисающие побеги могут достигать примерно 50–100 см',
      ],
      humidity: [
        'Average room humidity is tolerated, while 50–70% supports steadier growth. Gentle airflow is essential; routine misting is unnecessary.',
        'Растение переносит обычную комнатную влажность, а уровень 50–70% поддерживает более стабильный рост. Важно лёгкое движение воздуха; регулярные опрыскивания не нужны.',
      ],
      important: [
        'Epiphytic roots need both moisture and air. Use a small pot with a drainage hole and a coarse airy mix, let it dry well between waterings and never leave water in the saucer.',
        'Эпифитным корням нужны и влага, и воздух. Используйте небольшой горшок с дренажным отверстием и крупный воздушный субстрат, хорошо просушивайте его между поливами и не оставляйте воду в поддоне.',
      ],
      latinName: 'Dischidia oiantha Schltr.',
      light: [
        'Give bright diffused light with a little gentle morning or evening sun. Protect the small leaves from hot midday rays behind glass.',
        'Обеспечьте яркий рассеянный свет и немного мягкого утреннего или вечернего солнца. Берегите мелкие листья от жарких полуденных лучей через стекло.',
      ],
      notes: [
        'I bought this dischidia as a small rooted starter in a clear cup. It already has several flexible shoots with fresh growth at the tips. The main photograph shows a believable moderately mature form after the plant has filled out.',
        'Я купила эту дисхидию небольшим укоренённым растением в прозрачном стаканчике. У неё уже несколько гибких побегов со свежим приростом на концах. Главная фотография показывает реалистичную умеренно взрослую форму после разрастания.',
      ],
      origin: ['Philippines', 'Филиппины'],
      overview: [
        'Dischidia oiantha is a tropical epiphytic vine with slender trailing or twining stems and pairs of small fleshy oval leaves. In a pot it forms a light, uneven cascade rather than a rigid compact crown.',
        'Дисхидия оианта — тропическая эпифитная лиана с тонкими свисающими или вьющимися побегами и парами мелких мясистых овальных листьев. В горшке она образует лёгкий неровный каскад, а не плотную жёсткую крону.',
      ],
      plantType: ['Evergreen epiphytic vine', 'Вечнозелёная эпифитная лиана'],
      problems: [
        [
          'Yellow soft leaves or a dark stem base — stop watering and inspect the roots for rot.',
          'Wrinkled leaves in a dry mix — water thoroughly and let all excess drain.',
          'Long bare sections and very small new leaves — move gradually to brighter diffused light.',
          'White cottony clusters at the nodes — isolate and inspect for mealybugs.',
        ],
        [
          'Листья желтеют и размягчаются, а основание темнеет — прекратите полив и проверьте корни на гниль.',
          'Листья сморщились при сухом субстрате — хорошо полейте и дайте всей лишней воде стечь.',
          'Появились длинные голые участки и очень мелкие новые листья — постепенно добавьте яркого рассеянного света.',
          'В узлах заметны белые ватные комочки — изолируйте растение и проверьте на мучнистого червеца.',
        ],
      ],
      propagation: [
        'Cut healthy stem sections with two to four nodes. Remove the lowest pair of leaves, lay or pin one or two nodes onto a lightly moist airy mix and keep warm in bright diffused light until rooted.',
        'Нарежьте здоровые части побега с двумя-четырьмя узлами. Удалите нижнюю пару листьев, уложите или закрепите один-два узла на слегка влажном воздушном субстрате и держите в тепле на ярком рассеянном свету до укоренения.',
      ],
      repotting: [
        'Repot in spring only when roots fill the container or the mix breaks down. Move to a shallow pot just 2–3 cm wider and keep the stems at their previous level.',
        'Пересаживайте весной, только когда корни заполнят ёмкость или субстрат разрушится. Выбирайте неглубокий горшок лишь на 2–3 см шире и сохраняйте прежний уровень посадки побегов.',
      ],
      secondaryCare: [
        ['Shaping', 'Формирование'],
        [
          'Pinch an overlong shoot above a node and root several cuttings back into the same pot for a fuller but naturally uneven cascade.',
          'Прищипывайте слишком длинный побег над узлом и подсаживайте несколько укоренённых черенков обратно, чтобы получить более пышный, но естественно неровный каскад.',
        ],
      ],
      soil: [
        'Use a loose epiphytic mix, for example 40% fine orchid bark, 30% coco chips or light compost and 30% perlite or pumice.',
        'Используйте рыхлую эпифитную смесь: например, 40% мелкой орхидейной коры, 30% кокосовых чипсов или лёгкого грунта и 30% перлита или пемзы.',
      ],
      temperature: [
        'Keep at 18–28 °C and preferably above 15 °C in winter. Protect from cold draughts and a chilled wet windowsill.',
        'Содержите при 18–28 °C, зимой желательно не ниже 15 °C. Защищайте от холодных сквозняков и сырого переохлаждённого подоконника.',
      ],
      watering: [
        'Water thoroughly after most of the mix has dried, then drain completely. Water less often in cool or cloudy weather, but do not keep the fine roots bone-dry for long.',
        'Хорошо поливайте после просыхания большей части субстрата, затем полностью сливайте лишнюю воду. В прохладе и пасмурную погоду поливайте реже, но не держите тонкие корни полностью сухими слишком долго.',
      ],
    }),
  ),
  collectionPlant(
    'piperaceae',
    'peperomia-caperata-santorini',
    '/plants/peperomia-caperata-santorini-home-photo.webp',
    ["Peperomia 'Santorini'", "Пеперомия каперата 'Santorini'"],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Give bright diffused light with a little gentle morning or evening sun. Protect the dark textured leaves from strong midday rays, which can bleach or scorch them.',
            'Обеспечьте яркий рассеянный свет и немного мягкого утреннего или вечернего солнца. Берегите тёмные фактурные листья от жёстких полуденных лучей: они могут выцветать и получать ожоги.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Let the top 2–3 cm of substrate dry, then water thoroughly and drain all excess. The fine roots tolerate a short dry spell better than constantly wet soil.',
            'Давайте верхним 2–3 см грунта просохнуть, затем хорошо проливайте и полностью сливайте лишнюю воду. Тонкие корни легче переносят короткую просушку, чем постоянно мокрый грунт.',
          ],
        ],
        [
          ['Humidity and airflow', 'Влажность и воздух'],
          [
            'Average room humidity is usually enough. Avoid routine misting and water trapped in the crown; gentle airflow helps the deeply ribbed foliage stay healthy.',
            'Обычной комнатной влажности обычно достаточно. Не опрыскивайте без необходимости и не оставляйте воду в центре куста; лёгкое движение воздуха помогает глубоко рельефной листве оставаться здоровой.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Keep at about 18–27 °C and preferably above 15 °C in winter. Protect the plant from cold draughts, icy glass and sudden temperature changes.',
            'Содержите примерно при 18–27 °C, а зимой желательно не ниже 15 °C. Берегите растение от холодных сквозняков, ледяного стекла и резких перепадов температуры.',
          ],
        ],
      ),
      2,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Pepper family (Piperaceae)', 'Перцевые (Piperaceae)'],
        ],
        [
          ['Origin', 'Происхождение'],
          ['Cultivar of a species native to Brazil', 'Сорт вида родом из Бразилии'],
        ],
        [
          ['Plant type', 'Тип растения'],
          [
            'Compact evergreen semi-succulent perennial',
            'Компактный вечнозелёный полусуккулентный многолетник',
          ],
        ],
      ),
      profileFooter(
        [
          [
            "'Santorini' is a named cultivar of Peperomia caperata, also listed under the cultivar code 'EC-PEPE-2007'.",
            'The elongated dark leaves are deeply corrugated and contrast with muted pink to reddish petioles.',
            'The slender pale flower spikes are inflorescences made of many tiny flowers rather than separate decorative blooms.',
            'Its compact habit makes it well suited to a small bright shelf or windowsill away from harsh sun.',
          ],
          [
            "'Santorini' — именной сорт Peperomia caperata, который также встречается под кодом 'EC-PEPE-2007'.",
            'Удлинённые тёмные листья глубоко гофрированы и контрастируют с приглушённо-розовыми или красноватыми черешками.',
            'Тонкие светлые «колоски» — это соцветия из множества крошечных цветков, а не отдельные декоративные бутоны.',
            'Компактный куст хорошо подходит для небольшой светлой полки или подоконника без жёсткого солнца.',
          ],
        ],
        [
          'The fine root system is easily damaged by dense, persistently wet substrate. Use a small pot with a drainage hole, an airy mix and never leave water inside the outer cachepot.',
          'Тонкая корневая система легко страдает в плотном постоянно мокром грунте. Используйте небольшой горшок с дренажным отверстием, воздушный субстрат и никогда не оставляйте воду во внешнем кашпо.',
        ],
        [
          [
            'Soft yellowing lower leaves and wet soil — stop watering and inspect the roots and crown for rot.',
            'Curling leaves or crisp edges — check prolonged drought, hot direct sun and very dry air.',
            'Pale stretched new growth — move gradually to brighter diffused light.',
            'White cottony clusters between petioles — isolate the plant and inspect for mealybugs.',
          ],
          [
            'Нижние листья желтеют и размягчаются при мокром грунте — прекратите полив и проверьте корни и основание на гниль.',
            'Листья скручиваются или края становятся сухими — проверьте длительную пересушку, жаркое прямое солнце и слишком сухой воздух.',
            'Новый прирост бледный и вытянутый — постепенно переставьте растение на более яркий рассеянный свет.',
            'Между черешками появились белые ватные комочки — изолируйте растение и проверьте на мучнистого червеца.',
          ],
        ],
        [
          'Root a healthy leaf with its petiole or a short stem cutting with at least one node in a warm, airy, barely moist mix. A mature clump can also be divided during repotting; keep every section supplied with its own roots.',
          'Укореняйте здоровый лист с черешком или короткий стеблевой черенок хотя бы с одним узлом в тёплом воздушном едва влажном субстрате. Взрослый куст также можно разделить при пересадке, сохранив у каждой части собственные корни.',
        ],
      ),
      "Peperomia caperata 'Santorini'",
      [
        'The long, almost black-green ribbed leaves make this peperomia especially graphic, while its pink petioles soften the dark colour. In the white textured cachepot, the compact bush looks even more expressive.',
        'Длинные почти чёрно-зелёные рельефные листья делают эту пеперомию особенно графичной, а розовые черешки смягчают тёмную окраску. В белом фактурном кашпо компактный куст выглядит ещё выразительнее.',
      ],
      [
        "Peperomia caperata 'Santorini' is a compact cultivar distinguished by elongated, strongly corrugated dark leaves on pinkish petioles. Its semi-succulent foliage stores some moisture, so steady warmth, diffused light and careful watering suit it better than a constantly damp position.",
        "Пеперомия каперата 'Santorini' — компактный сорт с удлинёнными сильно гофрированными тёмными листьями на розоватых черешках. Полусуккулентная листва запасает немного влаги, поэтому растению лучше подходят стабильное тепло, рассеянный свет и аккуратный полив, чем постоянно сырой грунт.",
      ],
      quickFacts(
        ['Slow to moderate', 'Медленный или умеренный'],
        ['Usually 20–35 cm', 'Обычно 20–35 см'],
      ),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use an airy mix such as 50% light houseplant or coco-based compost, 30% perlite or pumice and 20% fine orchid bark.',
            'Используйте воздушную смесь: например, 50% лёгкого грунта для комнатных растений или кокосового субстрата, 30% перлита или пемзы и 20% мелкой коры.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Repot in spring every 2–3 years or when the roots fill the pot. Choose a shallow container only 2–3 cm wider and keep the crown at its previous level.',
            'Пересаживайте весной раз в 2–3 года или когда корни заполнят горшок. Выбирайте неглубокую ёмкость лишь на 2–3 см шире и сохраняйте прежний уровень посадки.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'From spring to early autumn, feed every 4–6 weeks with a half-strength balanced fertiliser. Do not feed dry soil, newly repotted plants or in winter.',
            'С весны до начала осени подкармливайте раз в 4–6 недель половинной дозой сбалансированного удобрения. Не удобряйте по сухому грунту, сразу после пересадки и зимой.',
          ],
        ],
        [
          ['Grooming', 'Уход за листьями'],
          [
            'Remove yellow leaves and spent flower spikes with clean scissors, rotate the pot for even growth and brush dust gently from the grooves. Do not use leaf shine.',
            'Удаляйте жёлтые листья и отцветшие колоски чистыми ножницами, поворачивайте горшок для ровного роста и осторожно вычищайте пыль из бороздок. Не используйте полироль.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/peperomia-santorini-important.webp',
        propagationImage: '/plant-profile/peperomia-santorini-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'vitaceae',
    'cissus-antarctica',
    '/plants/cissus-antarctica-home-photo.webp',
    ['Kangaroo vine', 'Циссус антарктический'],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Bright indirect light or light shade. Protect the foliage from harsh direct sun.',
            'Яркий рассеянный свет или лёгкая полутень. Берегите листву от жёсткого прямого солнца.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Keep the substrate lightly and evenly moist while the plant is growing. Avoid waterlogging.',
            'В период роста поддерживайте грунт слегка и равномерно влажным. Не допускайте застоя воды.',
          ],
        ],
        [
          ['Humidity', 'Влажность'],
          [
            'Average to higher room humidity suits this rainforest vine; dry air can mark the foliage.',
            'Эта лиана из влажных лесов любит среднюю и повышенную влажность; сухой воздух отражается на листве.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'A warm, stable room suits it best. Keep it away from cold glass and drafts.',
            'Лучше всего подходит тёплое, стабильное помещение. Берегите от холодного стекла и сквозняков.',
          ],
        ],
      ),
      2,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Grape family (Vitaceae)', 'Виноградовые (Vitaceae)'],
        ],
        [
          ['Origin', 'Родина'],
          ['Eastern Australia', 'Восточное побережье Австралии'],
        ],
        [
          ['Plant type', 'Тип растения'],
          ['Woody climbing vine with tendrils', 'Древеснеющая лиана с усиками'],
        ],
      ),
      profileFooter(
        [
          [
            'An evergreen woody climber native to eastern Australia.',
            'Simple toothed leaves are usually ovate to oblong.',
            'The vine climbs with simple or two-branched tendrils.',
          ],
          [
            'Вечнозелёная древеснеющая лиана, родом с восточного побережья Австралии.',
            'Простые зубчатые листья обычно имеют яйцевидную или продолговатую форму.',
            'Лиана цепляется за опору простыми или двураздельными усиками.',
          ],
        ],
        [
          'Do not let the root ball dry out completely during active growth, but never leave it standing in water.',
          'В период активного роста не пересушивайте корневой ком полностью, но и не оставляйте растение стоять в воде.',
        ],
        [
          [
            'Yellowing leaves — check for waterlogging.',
            'Brown edges — air may be too dry or the soil has dried too far.',
            'Sparse growth — move to brighter indirect light.',
          ],
          [
            'Желтеют листья — проверьте, нет ли застоя воды.',
            'Края листьев буреют — воздух может быть слишком сухим или грунт сильно пересох.',
            'Побеги вытягиваются — переставьте растение в более яркий рассеянный свет.',
          ],
        ],
        [
          'Propagate from stem cuttings during active growth in a lightly moist, airy substrate.',
          'Размножайте стеблевыми черенками в период активного роста в слегка влажном, воздухопроницаемом субстрате.',
        ],
      ),
      'Cissus antarctica',
      [
        'Guide the young shoots onto a support and prune them after active growth to keep the vine tidy.',
        'Направляйте молодые побеги на опору и подрезайте их после активного роста, чтобы лиана сохраняла аккуратную форму.',
      ],
      [
        'Kangaroo vine is an Australian evergreen climber with simple toothed leaves and tendrils. In nature it grows in warm coastal rainforests and their margins.',
        'Кенгуровая лиана — австралийская вечнозелёная лиана с простыми зубчатыми листьями и усиками. В природе растёт во влажных лесах и на их опушках восточного побережья.',
      ],
      quickFacts(['Fast-growing', 'Быстрый'], ['Long climbing shoots', 'Длинные побеги']),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use 80% peat-free loam-based houseplant compost with 20% perlite or fine potting grit. The mix should drain well but still hold moderate moisture.',
            'Используйте 80% безторфяного грунта для комнатных растений на суглинистой основе и 20% перлита или мелкого посадочного гравия. Смесь должна хорошо отводить воду, но удерживать умеренную влагу.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Repot in spring when the roots have filled the pot.',
            'Пересаживайте весной, когда корни полностью освоят горшок.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'From spring to early autumn, use a balanced liquid fertiliser with near-equal N-P-K (for example 10-10-10), plus Mg, Fe, Mn, Zn and B. Apply monthly at half the label rate; do not feed in winter.',
            'С весны до начала осени — жидкое удобрение с примерно равным N-P-K (например, 10-10-10) и Mg, Fe, Mn, Zn, B. Вносите раз в месяц в половинной дозировке; зимой не подкармливайте.',
          ],
        ],
        [
          ['Support & shaping', 'Опоры и формировка'],
          [
            'Offer a support for the tendrils and prune long shoots to keep the vine neat.',
            'Дайте усикам опору и подрезайте длинные побеги, чтобы лиана оставалась аккуратной.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/important-vine.webp',
        propagationIcon: '/plant-profile/footer-propagation.webp',
        propagationImage: '/plant-profile/propagation-cuttings.webp',
      },
    ),
  ),
  collectionPlant(
    'acanthaceae',
    'hypoestes-phyllostachya-three-forms',
    '/plants/hypoestes-phyllostachya-three-forms-home-photo.webp',
    ['Polka dot plant: three colour forms', 'Гипоэстес: три цветовые формы'],
    simplePlantProfile({
      assets: {
        importantImage: '/plant-profile/hypoestes-important.webp',
        propagationImage: '/plant-profile/hypoestes-propagation.webp',
      },
      difficulty: 2,
      facts: [
        [
          'The coloured spots are part of the leaf tissue rather than damage or residue.',
          'All three colour forms belong to the same species, Hypoestes phyllostachya.',
          'Regular pinching encourages side shoots and keeps the plants compact.',
          'Small lilac flowers may appear, but the patterned foliage is the main feature.',
        ],
        [
          'Цветные пятна — естественная часть ткани листа, а не повреждение или налёт.',
          'Все три цветовые формы относятся к одному виду — Hypoestes phyllostachya.',
          'Регулярная прищипка стимулирует боковые побеги и сохраняет кустики компактными.',
          'Могут появляться мелкие сиреневые цветки, но главная ценность растения — узорчатая листва.',
        ],
      ],
      family: ['Acanthus family (Acanthaceae)', 'Акантовые (Acanthaceae)'],
      feeding: [
        'Feed every 3–4 weeks from spring to early autumn with a balanced liquid fertiliser at half strength. Do not feed dry roots.',
        'С весны до начала осени подкармливайте раз в 3–4 недели сбалансированным жидким удобрением в половинной дозе. Не вносите удобрение по сухим корням.',
      ],
      growth: ['Fast', 'Быстрый'],
      height: ['20–40 cm indoors', '20–40 см в помещении'],
      humidity: [
        'Average to moderately humid room air suits it. Keep it away from hot radiators and drying draughts.',
        'Подходит обычная или умеренно повышенная влажность воздуха. Держите растение подальше от горячих батарей и иссушающих сквозняков.',
      ],
      important: [
        'Do not let the root ball dry out completely: leaves wilt quickly. Pinch all three forms regularly, especially the most vigorous shoots, so one plant does not shade the others.',
        'Не допускайте полного пересыхания земляного кома: листья быстро теряют тургор. Регулярно прищипывайте все три формы, особенно самые сильные побеги, чтобы один куст не затенял остальные.',
      ],
      latinName: 'Hypoestes phyllostachya',
      light: [
        'Provide bright diffused light. A little gentle morning or evening sun strengthens the pattern, while harsh midday sun can scorch the leaves.',
        'Обеспечьте яркий рассеянный свет. Немного мягкого утреннего или вечернего солнца делает рисунок выразительнее, а жёсткое полуденное солнце может обжечь листья.',
      ],
      notes: [
        'The collection contains three plants: a large white-green form, a pink-speckled green form and a raspberry-pink form with dark green markings.',
        'В коллекции три растения: крупная бело-зелёная форма, розово-зелёная с ярким крапом и малиново-розовая с тёмно-зелёным рисунком.',
      ],
      origin: ['Madagascar', 'Мадагаскар'],
      overview: [
        'Polka dot plant is a soft-stemmed Madagascan subshrub grown for leaves covered in contrasting spots and splashes. These three forms differ in how much white, pink and green remains on the blade.',
        'Гипоэстес листоколосниковый — мягкостебельный полукустарник с Мадагаскара, который выращивают ради листьев с контрастными пятнами и крапом. Три формы различаются соотношением белого, розового и зелёного на листовой пластинке.',
      ],
      plantType: ['Evergreen tropical subshrub', 'Вечнозелёный тропический полукустарник'],
      problems: [
        [
          'Drooping leaves — check the mix immediately and water if it is dry.',
          'Faded colour and long internodes — move to brighter diffused light.',
          'Crisp brown edges — check for dry air, irregular watering or sun scorch.',
        ],
        [
          'Поникшие листья — сразу проверьте грунт и полейте, если он сухой.',
          'Бледная окраска и длинные междоузлия — переставьте на более яркий рассеянный свет.',
          'Сухие коричневые края — проверьте влажность воздуха, регулярность полива и защиту от ожогов.',
        ],
      ],
      propagation: [
        'Cut a healthy 7–10 cm shoot just below a node, remove the lowest leaf pair and place the bare node in water or a light moist mix. Keep warm in bright diffused light and plant several rooted cuttings together for a fuller bush.',
        'Срежьте здоровый побег длиной 7–10 см сразу под узлом, удалите нижнюю пару листьев и поместите оголённый узел в воду или лёгкий влажный грунт. Держите в тепле на ярком рассеянном свету; для пышного куста посадите вместе несколько укоренённых черенков.',
      ],
      repotting: [
        'Repot in spring when roots fill the pot. A modest pot encourages even moisture without leaving a large volume of wet soil.',
        'Пересаживайте весной, когда корни освоят горшок. Умеренный объём помогает поддерживать равномерную влажность без лишней сырой земли.',
      ],
      secondaryCare: [
        ['Pinching and flowering', 'Прищипка и цветение'],
        [
          'Pinch the tips after every few leaf pairs. Flower spikes can be removed if compact foliage is more important than bloom.',
          'Прищипывайте верхушки после каждых нескольких пар листьев. Цветоносы можно удалить, если компактная листва важнее цветения.',
        ],
      ],
      soil: [
        'Use an airy moisture-retentive mix: about 60% houseplant compost, 20% fine bark or coco chips and 20% perlite. The pot needs a drainage hole.',
        'Используйте воздушную влагоёмкую смесь: около 60% грунта для комнатных растений, 20% мелкой коры или кокосовых чипсов и 20% перлита. В горшке нужно дренажное отверстие.',
      ],
      temperature: [
        'Keep at 18–26°C and protect from temperatures below 15°C, cold glass and sudden draughts.',
        'Держите при 18–26 °C и защищайте от температуры ниже 15 °C, холодного стекла и резких сквозняков.',
      ],
      watering: [
        'Water when the top 1–2 cm of mix has dried, keeping the root ball lightly and evenly moist but never waterlogged. Drain the saucer after watering.',
        'Поливайте после просыхания верхних 1–2 см грунта, поддерживая ком слегка и равномерно влажным, но не заболоченным. После полива сливайте воду из поддона.',
      ],
    }),
    3,
  ),
  collectionPlant(
    'aizoaceae',
    'mesembryanthemum-cordifolium-forms',
    '/plants/mesembryanthemum-cordifolium-forms-home-photo.webp',
    ['Heartleaf ice plant: green and variegated', 'Аптения: зелёная и вариегатная'],
    simplePlantProfile({
      assets: {
        importantImage: '/plant-profile/aptenia-important.webp',
        propagationImage: '/plant-profile/aptenia-propagation.webp',
      },
      difficulty: 1,
      facts: [
        [
          'Its current accepted botanical name is Mesembryanthemum cordifolium; Aptenia cordifolia remains common in cultivation.',
          'The green and variegated forms are the same species. Both have fleshy opposite leaves and a creeping habit.',
          'With enough light, mature shoots may produce small magenta, daisy-like flowers.',
          'Long shoots root readily at the nodes and can be pinched to keep the planting compact.',
        ],
        [
          'Современное принятое ботаническое название — Mesembryanthemum cordifolium; в цветоводстве по-прежнему часто используют имя Aptenia cordifolia.',
          'Зелёная и вариегатная формы относятся к одному виду. У обеих мясистые супротивные листья и стелющиеся побеги.',
          'При хорошем освещении взрослые побеги могут цвести небольшими пурпурными цветками, похожими на маргаритки.',
          'Длинные побеги легко укореняются в узлах; прищипка помогает сохранить композицию компактной.',
        ],
      ],
      family: ['Ice plant family (Aizoaceae)', 'Аизовые (Aizoaceae)'],
      feeding: [
        'Feed once every 4–6 weeks in spring and summer with a half-strength fertiliser for succulents. Do not feed in winter.',
        'Весной и летом подкармливайте раз в 4–6 недель половинной дозой удобрения для суккулентов. Зимой не подкармливайте.',
      ],
      growth: ['Fast', 'Быстрый'],
      height: ['Trailing shoots 30–60 cm', 'Стелющиеся побеги 30–60 см'],
      humidity: [
        'Normal dry room air is suitable. Good airflow is more important than extra humidity.',
        'Подходит обычный сухой комнатный воздух. Хорошая циркуляция воздуха важнее повышенной влажности.',
      ],
      important: [
        'The solid-green form usually grows faster and can shade or crowd the variegated one. Pinch it back so both forms remain visible, and never leave water in the saucer.',
        'Однотонно-зелёная форма обычно растёт быстрее и может затенить вариегатную. Прищипывайте её, чтобы сохранить обе формы в композиции, и не оставляйте воду в поддоне.',
      ],
      latinName: 'Mesembryanthemum cordifolium',
      light: [
        'Give very bright light with several hours of gentle direct sun after gradual acclimatisation. The variegated form needs especially good light to stay compact.',
        'Нужен очень яркий свет и несколько часов мягкого прямого солнца после постепенного привыкания. Вариегатной форме особенно важно хорошее освещение, чтобы не вытягиваться.',
      ],
      notes: [
        'These two forms began as tiny cuttings from a mixed succulent set and now grow together in one pot.',
        'Эти две формы начинались с маленьких черенков из набора суккулентов и теперь растут вместе в одном горшке.',
      ],
      origin: ['South Africa', 'Южная Африка'],
      overview: [
        'Heartleaf ice plant is a creeping succulent with glossy, water-storing leaves. This pot combines the vigorous green form and the cream-edged variegated form.',
        'Мезембриантемум сердцелистный, или аптения, — стелющийся суккулент с глянцевыми листьями, запасающими воду. В одном горшке растут сильная зелёная и кремово-окаймлённая вариегатная формы.',
      ],
      plantType: ['Creeping succulent herb', 'Стелющийся травянистый суккулент'],
      problems: [
        [
          'Soft, translucent stems — stop watering and inspect the roots for rot.',
          'Long gaps between leaves — move the plant to brighter light gradually.',
          'Dry brown patches — protect it from sudden harsh midday sun.',
        ],
        [
          'Мягкие полупрозрачные стебли — прекратите полив и проверьте корни на гниль.',
          'Большие промежутки между листьями — постепенно переставьте растение на более яркий свет.',
          'Сухие коричневые пятна — защищайте от резкого полуденного солнца без адаптации.',
        ],
      ],
      propagation: [
        'Take a healthy 6–10 cm stem cutting, remove the lowest leaf pair and let the cut dry briefly. Insert one or two nodes into a lightly moist gritty mix; keep it warm and bright without harsh sun until rooted.',
        'Срежьте здоровый побег длиной 6–10 см, удалите нижнюю пару листьев и немного подсушите срез. Заглубите один-два узла в слегка влажную минеральную смесь и держите в тепле на ярком рассеянном свету до укоренения.',
      ],
      repotting: [
        'Repot in spring when roots fill the pot. A shallow, wide container with a drainage hole suits the creeping shoots.',
        'Пересаживайте весной, когда корни освоят горшок. Стелющимся побегам подходит неглубокая широкая ёмкость с дренажным отверстием.',
      ],
      secondaryCare: [
        ['Pinching', 'Прищипка'],
        [
          'Pinch long green shoots more often than variegated ones to encourage branching and keep the two forms balanced.',
          'Прищипывайте длинные зелёные побеги чаще вариегатных: это усилит ветвление и сохранит баланс двух форм.',
        ],
      ],
      soil: [
        'Use a fast-draining succulent mix with plenty of pumice, perlite or fine gravel. The pot must have a drainage hole.',
        'Используйте быстро просыхающую смесь для суккулентов с большим количеством пемзы, перлита или мелкого гравия. В горшке обязательно дренажное отверстие.',
      ],
      temperature: [
        'Keep at 18–27°C in active growth. In winter, a bright and drier position around 12–18°C helps maintain compact growth; protect from frost.',
        'В период роста держите при 18–27 °C. Зимой светлое и более сухое содержание при 12–18 °C помогает сохранить компактность; берегите от заморозков.',
      ],
      watering: [
        'Water thoroughly after most of the mix has dried, then drain excess water. Reduce watering sharply in cool, low-light conditions.',
        'Поливайте обильно после просыхания большей части смеси и сливайте лишнюю воду. В прохладе и при слабом освещении полив резко сокращайте.',
      ],
    }),
    1,
  ),
  collectionPlant(
    'aizoaceae',
    'glottiphyllum-longum',
    '/plants/glottiphyllum-longum-home-photo.webp',
    ['Long-leaf tongue plant', 'Глоттифиллум длиннолистный'],
    simplePlantProfile({
      assets: {
        importantImage: '/plant-profile/glottiphyllum-longum-important.webp',
        propagationImage: '/plant-profile/glottiphyllum-longum-propagation.webp',
      },
      difficulty: 2,
      facts: [
        [
          'The accepted species name is Glottiphyllum longum.',
          'Its smooth strap-shaped leaves grow in opposite pairs and form a low clump.',
          'Mature plants open solitary yellow flowers, usually in the cooler growing season.',
          'The species is native to the Cape Provinces of South Africa.',
        ],
        [
          'Принятое видовое название — Glottiphyllum longum.',
          'Гладкие ремневидные листья растут супротивными парами и образуют низкую куртину.',
          'Взрослые растения раскрывают одиночные жёлтые цветки, обычно в прохладный период роста.',
          'Вид происходит из Капских провинций Южной Африки.',
        ],
      ],
      family: ['Ice plant family (Aizoaceae)', 'Аизовые (Aizoaceae)'],
      feeding: [
        'Feed once every 4–6 weeks during active cool-season growth with a quarter-strength succulent fertiliser. Do not feed during the hot summer rest.',
        'В период активного роста в прохладное время подкармливайте раз в 4–6 недель четвертью дозы удобрения для суккулентов. Во время летнего покоя не подкармливайте.',
      ],
      growth: ['Moderate', 'Умеренный'],
      height: ['Clump 8–15 cm', 'Куртина 8–15 см'],
      humidity: [
        'Normal dry room air with good ventilation is ideal. Do not mist or allow water to remain between the paired leaves.',
        'Подходит обычный сухой комнатный воздух с хорошей вентиляцией. Не опрыскивайте и не оставляйте воду между парными листьями.',
      ],
      important: [
        'Overwatering is the main danger. Soft, translucent or yellowing lower leaves mean the mix is staying wet too long: stop watering, inspect the base and roots, and keep the crown dry.',
        'Главная опасность — перелив. Мягкие, полупрозрачные или желтеющие нижние листья означают, что смесь слишком долго остаётся влажной: прекратите полив, проверьте основание и корни и держите центр розетки сухим.',
      ],
      latinName: 'Glottiphyllum longum',
      light: [
        'Give very bright light with gentle direct sun after gradual acclimatisation. Insufficient light makes new leaves longer, thinner and weaker.',
        'Обеспечьте очень яркий свет и мягкое прямое солнце после постепенного привыкания. При недостатке света новые листья становятся длиннее, тоньше и слабее.',
      ],
      notes: [
        'A rooted top is already producing a fresh central pair of leaves. Once the base is established, side shoots will gradually turn it into a low, irregular clump.',
        'Укоренившаяся макушка уже выпускает свежую центральную пару листьев. После укрепления основания боковые побеги постепенно превратят её в низкую, неровную куртину.',
      ],
      origin: ['Cape Provinces, South Africa', 'Капские провинции, Южная Африка'],
      overview: [
        'Glottiphyllum longum is a compact succulent subshrub with smooth fleshy tongue-shaped leaves arranged in opposite pairs. With age it branches into a low clump and can produce vivid yellow flowers.',
        'Глоттифиллум длиннолистный — компактный суккулентный полукустарник с гладкими мясистыми языковидными листьями, расположенными супротивными парами. С возрастом он ветвится в низкую куртину и может цвести ярко-жёлтыми цветками.',
      ],
      plantType: ['Clumping succulent subshrub', 'Кустящийся суккулентный полукустарник'],
      problems: [
        [
          'Soft translucent leaves — stop watering and inspect the base and roots for rot.',
          'Long, narrow and weak leaves — gradually increase light.',
          'Deep wrinkling in completely dry mix — water once thoroughly, then let the mix dry again.',
        ],
        [
          'Мягкие полупрозрачные листья — прекратите полив и проверьте основание и корни на гниль.',
          'Длинные узкие слабые листья — постепенно увеличьте освещение.',
          'Сильные морщины в полностью сухой смеси — один раз хорошо полейте и снова дайте грунту просохнуть.',
        ],
      ],
      propagation: [
        'Separate a healthy side shoot or take a top cutting, let the cut dry for 2–4 days, then set it shallowly in a dry gritty mix. Begin light watering only after the cutting anchors and shows new growth.',
        'Отделите здоровый боковой побег или срежьте макушку, подсушите срез 2–4 дня и неглубоко закрепите в сухой минеральной смеси. Начинайте понемногу поливать только после закрепления черенка и появления нового роста.',
      ],
      repotting: [
        'Repot at the beginning of active growth when the clump fills its container. Use a wide, shallow pot with an unobstructed drainage hole.',
        'Пересаживайте в начале активного роста, когда куртина заполнит ёмкость. Используйте широкий неглубокий горшок со свободным дренажным отверстием.',
      ],
      secondaryCare: [
        ['Seasonal rest', 'Сезонный покой'],
        [
          'Growth is most active in cooler months. In summer heat, reduce watering and do not force new growth with fertiliser.',
          'Активнее всего растение растёт в прохладные месяцы. В летнюю жару сократите полив и не стимулируйте новый рост удобрениями.',
        ],
      ],
      soil: [
        'Use a very fast-draining mix with about 70–80% pumice, perlite, lava or fine gravel and 20–30% fine succulent compost.',
        'Используйте очень быстро просыхающую смесь: около 70–80% пемзы, перлита, лавы или мелкого гравия и 20–30% мелкого грунта для суккулентов.',
      ],
      temperature: [
        'Keep at about 12–26°C during active growth with bright light and airflow. Protect from frost; in summer heat provide a much drier rest.',
        'В период активного роста держите примерно при 12–26 °C на ярком свету и с хорошей вентиляцией. Берегите от заморозков; в летнюю жару устройте значительно более сухой покой.',
      ],
      watering: [
        'During active cool-season growth, water thoroughly only after the mix has dried completely. Water much less in summer heat and never leave water in the saucer.',
        'В прохладный период активного роста обильно поливайте только после полного просыхания смеси. В летнюю жару поливайте значительно реже и никогда не оставляйте воду в поддоне.',
      ],
    }),
    1,
  ),
  collectionPlant(
    'crassulaceae',
    'sedum-burrito',
    '/plants/sedum-burrito-home-photo.webp',
    ['Burro’s tail “Burrito”', 'Очиток Буррито'],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Give very bright light with several hours of gentle morning or evening sun. Acclimatise gradually: harsh midday rays can scorch the leaves, while low light makes the tails sparse and stretched.',
            'Обеспечьте очень яркий свет и несколько часов мягкого утреннего или вечернего солнца. Приучайте постепенно: жёсткие полуденные лучи могут обжечь листья, а в тени побеги становятся редкими и вытянутыми.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Soak the mix thoroughly only after it has dried almost completely, then drain every drop of excess water. Water much less often in a cool, darker winter.',
            'Обильно проливайте грунт только после почти полного просыхания, затем полностью сливайте лишнюю воду. В прохладную и тёмную зиму поливайте значительно реже.',
          ],
        ],
        [
          ['Humidity', 'Влажность'],
          [
            'Normal dry room air and steady ventilation suit this succulent. Do not mist or leave water between the tightly packed leaves.',
            'Этому суккуленту подходит обычный сухой комнатный воздух и регулярное проветривание. Не опрыскивайте и не оставляйте воду между плотно расположенными листьями.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Keep at about 16–28 °C during growth. A bright, drier winter can be cooler, but preferably above 10 °C; protect the fleshy leaves from cold glass and draughts.',
            'В период роста держите примерно при 16–28 °C. Светлая и сухая зимовка может быть прохладнее, но желательно выше 10 °C; берегите мясистые листья от холодного стекла и сквозняков.',
          ],
        ],
      ),
      2,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Stonecrop family (Crassulaceae)', 'Толстянковые (Crassulaceae)'],
        ],
        [
          ['Origin', 'Происхождение'],
          [
            'Horticultural form related to the Mexican Sedum morganianum',
            'Садовая форма, родственная мексиканскому Sedum morganianum',
          ],
        ],
        [
          ['Plant type', 'Тип растения'],
          ['Evergreen trailing succulent', 'Вечнозелёный ампельный суккулент'],
        ],
      ),
      profileFooter(
        [
          [
            'The compact cultivar has shorter, rounder leaves than the classic Sedum morganianum.',
            'Closely overlapping leaves turn every hanging stem into a thick beaded tail.',
            'A pale waxy bloom protects the foliage and should not be rubbed away.',
            'Mature plants can produce small star-shaped pink flowers at the ends of their stems.',
          ],
          [
            'У компактной формы листья короче и округлее, чем у классического Sedum morganianum.',
            'Плотно налегающие друг на друга листья превращают каждый свисающий побег в толстую нитку бусин.',
            'Светлый восковой налёт защищает листву, поэтому его не следует стирать.',
            'Взрослое растение может выпустить на концах побегов небольшие розовые звёздчатые цветки.',
          ],
        ],
        [
          'The leaves detach at the slightest touch. Choose the final place before the stems grow long, handle the pot rather than the foliage, and never keep the roots in wet soil.',
          'Листья осыпаются от малейшего прикосновения. Выберите постоянное место до того, как плети станут длинными, беритесь за горшок, а не за листву, и никогда не держите корни в мокром грунте.',
        ],
        [
          [
            'Soft translucent leaves or a dark stem base — stop watering and check immediately for rot.',
            'Long bare gaps between leaves — move gradually to brighter light.',
            'Wrinkled leaves after the mix is fully dry — water thoroughly and let the pot drain.',
            'Many fresh leaves suddenly fall — check for rough handling, cold stress or excess moisture.',
          ],
          [
            'Мягкие прозрачные листья или потемневшее основание побега — прекратите полив и сразу проверьте растение на гниль.',
            'Длинные оголённые промежутки между листьями — постепенно добавьте света.',
            'Листья сморщились после полного просыхания грунта — хорошо пролейте и дайте воде стечь.',
            'Внезапно осыпалось много свежих листьев — проверьте, не было ли грубого касания, холода или лишней влаги.',
          ],
        ],
        [
          'Let an intact fallen leaf rest on dry gritty mix until roots and a tiny rosette appear, then water very sparingly. For a fuller plant, dry a healthy stem cutting for 3–7 days and place its bare end into a lightly moist mineral mix.',
          'Положите целый опавший лист на сухой минеральный грунт и дождитесь корней и маленькой розетки, после чего поливайте очень умеренно. Для более пышного растения подсушите здоровый стеблевой черенок 3–7 дней и посадите оголённый конец в слегка влажную минеральную смесь.',
        ],
      ),
      'Sedum burrito',
      [
        'Its long dense stems form a soft green waterfall on the shelf. I especially like how every shoot looks as if it has been woven from tiny succulent beads.',
        'Его длинные густые плети образуют на полке настоящий зелёный водопад. Особенно нравится, что каждый побег выглядит так, словно сплетён из маленьких сочных бусин.',
      ],
      [
        'Sedum burrito, also sold as Sedum morganianum “Burrito”, is a compact trailing succulent with tightly packed rounded blue-green leaves. In a bright position its stems gradually lengthen into a dense curtain and remain decorative throughout the year.',
        'Sedum burrito, который также продают как Sedum morganianum «Burrito», — компактный ампельный суккулент с плотно расположенными округлыми сизо-зелёными листьями. На ярком месте его побеги постепенно вытягиваются в густой каскад и остаются декоративными круглый год.',
      ],
      quickFacts(
        ['Moderate', 'Умеренный'],
        ['Trailing stems 30–60 cm+', 'Свисающие побеги 30–60 см и более'],
      ),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use a very fast-draining mix with about 70–80% mineral material: pumice, fine lava grit, perlite or coarse sand, plus 20–30% light cactus compost.',
            'Используйте очень быстро просыхающий субстрат с 70–80% минеральных компонентов: пемзы, мелкой лавовой крошки, перлита или крупного песка и 20–30% лёгкого грунта для кактусов.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Repot only when necessary, preferably in spring. Use a shallow, stable hanging pot with a drainage hole and support the stems from below while moving the root ball.',
            'Пересаживайте только при необходимости, лучше весной. Используйте неглубокий устойчивый подвесной горшок с дренажным отверстием и поддерживайте плети снизу при переносе корневого кома.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'Feed once or twice from late spring to summer with quarter- or half-strength low-nitrogen cactus fertiliser. Do not feed in winter or on completely dry roots.',
            'С конца весны до лета подкормите один-два раза четвертью или половиной дозы низкоазотного удобрения для кактусов. Не удобряйте зимой и по полностью сухим корням.',
          ],
        ],
        [
          ['Grooming', 'Уход за побегами'],
          [
            'Do not wipe or comb the stems. Remove only dry debris with tweezers, turn the pot infrequently, and use fallen healthy leaves for propagation.',
            'Не протирайте и не расчёсывайте побеги. Удаляйте сухой мусор пинцетом, поворачивайте горшок как можно реже, а здоровые опавшие листья используйте для размножения.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/sedum-burrito-important.webp',
        propagationImage: '/plant-profile/sedum-burrito-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'crassulaceae',
    'succulent-groundcover-mix',
    '/plants/succulent-mix-home-photo-portrait.webp',
    ['Succulent groundcover mix', 'Микс почвопокровных суккулентов'],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Give the composition as much light as possible, including several hours of direct morning or evening sun. Acclimatise it gradually after shade so the rosettes colour up without scorching.',
            'Дайте композиции максимум света, включая несколько часов прямого утреннего или вечернего солнца. После тени приучайте постепенно, чтобы розетки набрали окраску без ожогов.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Water thoroughly only after the gritty substrate has dried completely. Drain every drop of excess water; Sempervivum and both stonecrops tolerate a short dry spell far better than constantly wet roots.',
            'Обильно поливайте только после полного просыхания минерального субстрата. Полностью сливайте лишнюю воду: молодило и оба очитка гораздо легче переносят короткую засуху, чем постоянную сырость у корней.',
          ],
        ],
        [
          ['Air & humidity', 'Воздух и влажность'],
          [
            'Dry room air and steady ventilation suit the mix. Do not mist the rosettes or let water remain in their centres, especially in cool weather.',
            'Композиции подходит сухой комнатный воздух и регулярное проветривание. Не опрыскивайте розетки и не оставляйте воду в их центре, особенно в прохладную погоду.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'During active growth, 15–27 °C is comfortable. A bright, cool and nearly dry winter helps the plants stay compact; protect a container-grown mix from prolonged severe frost and winter waterlogging.',
            'В период роста комфортны 15–27 °C. Светлая, прохладная и почти сухая зимовка помогает сохранить компактность; композицию в контейнере защищайте от длительного сильного мороза и зимнего переувлажнения.',
          ],
        ],
      ),
      2,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Stonecrop family (Crassulaceae)', 'Толстянковые (Crassulaceae)'],
        ],
        [
          ['Plants in the mix', 'Растения в миксе'],
          [
            'Sedum, Phedimus (Sedum spurium), and Sempervivum',
            'Очиток, очиток ложный (Phedimus/Sedum spurium) и молодило',
          ],
        ],
        [
          ['Plant type', 'Тип растения'],
          [
            'Low-growing rosette and mat-forming succulents',
            'Розеточные и стелющиеся почвопокровные суккуленты',
          ],
        ],
      ),
      profileFooter(
        [
          [
            'Sedum forms the fine green carpet and fills gaps with rapidly rooting stems.',
            'Phedimus spurium has broader leaves and can take on reddish tones in bright light or cool weather.',
            'Sempervivum produces firm rosettes whose lime, green and burgundy colouring changes with light and season.',
            'All three components store water in their leaves and prefer a lean, mineral and fast-drying substrate.',
          ],
          [
            'Очиток образует тонкий зелёный коврик и быстро заполняет промежутки укореняющимися побегами.',
            'Очиток ложный отличается более широкими листьями и на ярком свету или в прохладе приобретает красноватые оттенки.',
            'Молодило формирует плотные розетки, чья лаймовая, зелёная и бордовая окраска меняется в зависимости от света и сезона.',
            'Все три компонента запасают воду в листьях и предпочитают бедный, минеральный и быстро просыхающий субстрат.',
          ],
        ],
        [
          'The greatest risk is stagnant moisture around the roots and inside the Sempervivum rosettes. Use a drainage hole, keep the crown above the substrate and never leave the tray full of water.',
          'Главный риск — застой влаги у корней и внутри розеток молодила. Используйте ёмкость с дренажным отверстием, не заглубляйте центр розеток и никогда не оставляйте поддон наполненным водой.',
        ],
        [
          [
            'Soft translucent leaves or blackened rosette bases — stop watering and remove rotting tissue.',
            'Long pale stems and loose rosettes — move the composition gradually to brighter light.',
            'Dry lower leaves on Sempervivum — remove only those that detach easily; a small amount is natural.',
            'Bare patches — pin healthy Sedum or Phedimus cuttings onto the substrate and let them root.',
          ],
          [
            'Мягкие прозрачные листья или почерневшие основания розеток — прекратите полив и удалите гниющие ткани.',
            'Длинные бледные побеги и рыхлые розетки — постепенно переставьте композицию на более яркий свет.',
            'Сухие нижние листья у молодила — убирайте только те, что легко отделяются; небольшое их количество естественно.',
            'Появились пустые участки — прижмите к грунту здоровые черенки очитка или очитка ложного и дайте им укорениться.',
          ],
        ],
        [
          'Separate a rooted Sempervivum daughter rosette, or take short Sedum and Phedimus stem cuttings. Let damaged ends dry briefly, place them on dry gritty substrate and begin light watering only after they have started to root.',
          'Отделите укоренённую дочернюю розетку молодила или возьмите короткие черенки очитка и очитка ложного. Немного подсушите повреждённые места, разложите растения по сухому минеральному грунту и начинайте понемногу поливать только после начала укоренения.',
        ],
      ),
      'Sedum spp. · Phedimus spurius · Sempervivum spp.',
      [
        'In this shared container I am growing three different groundcover succulents. The Sempervivum rosettes repeat in several colours, but they remain one of the three plant types rather than separate varieties in the collection count.',
        'В одной ёмкости у меня растут три разных почвопокровных суккулента. Розетки молодила повторяются в нескольких оттенках.',
      ],
      [
        'This living succulent carpet combines three members of the stonecrop family with different growth habits: fine creeping Sedum, broader-leaved Phedimus spurium and compact multicoloured Sempervivum rosettes. Together they gradually close the soil into a textured mosaic.',
        'Этот живой ковёр объединяет три представителя семейства Толстянковые с разным характером роста: тонкий стелющийся очиток, более широколистный очиток ложный и компактные разноцветные розетки молодила. Вместе они постепенно закрывают грунт фактурной мозаикой.',
      ],
      quickFacts(
        ['Fast groundcover', 'Быстрый почвопокровный'],
        ['5–20 cm, spreading', '5–20 см, разрастается вширь'],
      ),
      careCards(
        [
          ['Sedum', 'Очиток (Sedum)'],
          [
            'The fine needle-like shoots are the quickest component of the mix. They creep across the surface, root at touching nodes and create a bright green filler between larger rosettes.',
            'Тонкие игольчатые побеги — самый быстрый компонент микса. Они стелются по поверхности, укореняются в местах соприкосновения с грунтом и образуют ярко-зелёное заполнение между крупными розетками.',
          ],
        ],
        [
          ['Caucasian stonecrop', 'Очиток ложный (Phedimus/Sedum spurium)'],
          [
            'This stonecrop grows on creeping stems with broader, flatter leaves. In strong light and cooler weather, its green foliage develops pink, red or bronze edging and becomes a contrasting middle layer.',
            'Этот очиток растёт ползучими побегами с более широкими и плоскими листьями. На ярком свету и в прохладе зелень приобретает розовую, красную или бронзовую кайму и создаёт контрастный средний ярус.',
          ],
        ],
        [
          ['Houseleek', 'Молодило (Sempervivum)'],
          [
            'The firm geometric rosettes are the focal points of the composition. Lime, green and burgundy plants are colour forms of the same component; mature rosettes gradually produce daughter offsets around themselves.',
            'Плотные геометричные розетки служат главными акцентами композиции. Лаймовые, зелёные и бордовые растения — цветовые формы одного компонента; взрослые розетки постепенно образуют вокруг себя дочерние розетки.',
          ],
        ],
        [
          ['Substrate & renewal', 'Грунт и обновление'],
          [
            'Use a shallow wide container with a drainage hole and a mix containing about 70–80% pumice, lava grit, perlite or coarse sand. Thin overly dense Sedum stems and remove spent Sempervivum rosettes after flowering.',
            'Используйте широкую неглубокую ёмкость с дренажным отверстием и смесь с 70–80% пемзы, лавовой крошки, перлита или крупного песка. Прореживайте слишком густые побеги очитка и удаляйте отцветшие розетки молодила.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/succulent-mix-important.webp',
        propagationImage: '/plant-profile/succulent-mix-propagation.webp',
      },
    ),
    3,
  ),
  collectionPlant(
    'lamiaceae',
    'glechoma-hederacea-variegata',
    '/plants/glechoma-hederacea-variegata-home-photo.webp',
    ['Variegated ground ivy', 'Будра плющевидная пестролистная'],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Give bright diffused light or gentle morning sun. A brighter position keeps the cream edging clear, while harsh midday sun can scorch young leaves and deep shade gradually reduces the variegation.',
            'Нужен яркий рассеянный свет или мягкое утреннее солнце. На светлом месте кремовая кайма остаётся заметной, жёсткие полуденные лучи могут обжечь молодые листья, а в глубокой тени пестрота постепенно ослабевает.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Water when the upper 1–2 cm of substrate has dried. Moisten the root ball evenly, drain all excess and do not leave the young plant standing in water.',
            'Поливайте после просыхания верхних 1–2 см грунта. Равномерно промачивайте корневой ком, полностью сливайте лишнюю воду и не оставляйте молодое растение стоять в поддоне с водой.',
          ],
        ],
        [
          ['Humidity', 'Влажность'],
          [
            'Average room humidity is suitable. Good airflow matters more than misting; wet leaves crowded together can develop spots or rot.',
            'Подходит обычная комнатная влажность. Хорошая циркуляция воздуха важнее опрыскивания: мокрые листья в густой кроне могут покрыться пятнами или подгнить.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'A cool to moderately warm position around 12–24 °C keeps growth compact. Protect a newly moved young plant from sudden heat, cold drafts and abrupt changes while it adapts indoors.',
            'Прохладное или умеренно тёплое место около 12–24 °C помогает сохранить компактность. Пока молодое растение привыкает к дому, защищайте его от жары, холодных сквозняков и резких перепадов.',
          ],
        ],
      ),
      2,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Mint family (Lamiaceae)', 'Яснотковые (Lamiaceae)'],
        ],
        [
          ['Origin', 'Происхождение'],
          ['Europe to Siberia and Xinjiang', 'От Европы до Сибири и Синьцзяна'],
        ],
        [
          ['Plant type', 'Тип растения'],
          [
            'Creeping perennial rooting at the nodes',
            'Стелющийся многолетник, укореняющийся в узлах',
          ],
        ],
      ),
      profileFooter(
        [
          [
            'Ground ivy is not a true ivy; it belongs to the mint family.',
            'Its creeping stems readily form roots wherever a node touches moist substrate.',
            'Rounded kidney-shaped leaves have scalloped edges and grow in opposite pairs.',
            'The variegated form combines green leaf centres with irregular cream-white margins.',
          ],
          [
            'Будра не является настоящим плющом: она относится к семейству Яснотковые.',
            'Её стелющиеся побеги легко образуют корни там, где узел касается влажного грунта.',
            'Округлые почковидные листья имеют волнистый край и располагаются супротивными парами.',
            'У пестролистной формы зелёная середина листа сочетается с неровной кремово-белой каймой.',
          ],
        ],
        [
          'The plant spreads quickly after rooting. Keep it in its own pot, pinch the tips to encourage branching and do not let the outer cachepot collect water.',
          'После укоренения будра быстро разрастается. Держите её в отдельном горшке, прищипывайте верхушки для ветвления и не допускайте скопления воды во внешнем кашпо.',
        ],
        [
          [
            'Long bare gaps between leaves — move gradually to brighter diffused light and pinch the tips.',
            'Cream margins turn brown — protect from harsh sun and check that the root ball is not drying completely.',
            'Soft dark stems at soil level — reduce watering and inspect the roots for rot.',
            'Green shoots without cream markings — remove them so they do not outgrow the variegated stems.',
          ],
          [
            'Между листьями появились длинные пустые участки — постепенно добавьте рассеянного света и прищипните верхушки.',
            'Кремовая кайма буреет — защитите от жёсткого солнца и не пересушивайте корневой ком полностью.',
            'Стебли у грунта стали мягкими и тёмными — сократите полив и проверьте корни на гниль.',
            'Появились полностью зелёные побеги — удаляйте их, чтобы они не вытеснили пестролистные.',
          ],
        ],
        [
          'Cut a healthy 7–10 cm shoot just below a node, remove the lowest leaves and place at least one node in water or a light, slightly moist substrate. Pot several rooted cuttings together for a fuller plant.',
          'Срежьте здоровый побег длиной 7–10 см сразу под узлом, удалите нижние листья и поместите хотя бы один узел в воду или лёгкий слегка влажный грунт. Для более пышного кустика посадите вместе несколько укоренённых черенков.',
        ],
      ),
      "Glechoma hederacea 'Variegata'",
      [
        'This is still a very young plant that I brought home from the dacha. For now it is only settling into its pot and beginning its indoor life, so I am giving it time to root, branch and turn into a fuller trailing cushion.',
        'Это совсем молодое растение, которое я привезла с дачи. Пока оно только осваивается в горшке и начинает свою домашнюю жизнь, поэтому я даю ему время укорениться, разветвиться и превратиться в более пышную свисающую подушку.',
      ],
      [
        'Variegated ground ivy is a fast-rooting creeping perennial with rounded scalloped leaves marked by irregular cream-white edges. Its thin stems spill over a pot beautifully and branch readily after pinching.',
        'Пестролистная будра плющевидная — быстро укореняющийся стелющийся многолетник с округлыми волнистыми листьями и неровной кремово-белой каймой. Тонкие побеги красиво свисают из горшка и охотно ветвятся после прищипки.',
      ],
      quickFacts(
        ['Fast after rooting', 'Быстрый после укоренения'],
        ['10–20 cm tall, long trailing stems', '10–20 см высотой, длинные свисающие побеги'],
      ),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use a light moisture-retentive but airy mix: about 60% houseplant substrate, 25% perlite or fine pumice and 15% fine bark or coarse sand. A drainage hole is essential.',
            'Используйте лёгкую влагоёмкую, но воздухопроницаемую смесь: около 60% грунта для комнатных растений, 25% перлита или мелкой пемзы и 15% мелкой коры либо крупного песка. Дренажное отверстие обязательно.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Let the young roots fill the current pot before moving up. Repot in spring into a shallow container only 2–3 cm wider, keeping the rooted nodes at the same depth.',
            'Дайте молодым корням освоить нынешний горшок. Весной пересаживайте в неглубокую ёмкость лишь на 2–3 см шире, сохраняя прежнюю глубину укоренённых узлов.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'From spring to early autumn, feed every 4–6 weeks with a balanced foliage fertiliser at half strength. Do not feed immediately after the move from the dacha or while roots are still adapting.',
            'С весны до начала осени подкармливайте раз в 4–6 недель половинной дозой сбалансированного удобрения для декоративно-лиственных растений. Не удобряйте сразу после переезда с дачи и пока корни адаптируются.',
          ],
        ],
        [
          ['Shaping', 'Формировка'],
          [
            'Pinch long tips above a leaf pair and lay a few stems back onto the substrate so their nodes can root. This quickly turns a sparse young plant into a dense rounded cascade.',
            'Прищипывайте длинные верхушки над парой листьев и укладывайте несколько побегов обратно на грунт, чтобы их узлы укоренились. Так редкое молодое растение быстрее превратится в густой округлый каскад.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/glechoma-variegata-important.webp',
        propagationImage: '/plant-profile/glechoma-variegata-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'marantaceae',
    'goeppertia-insignis',
    '/plants/calathea-lancifolia-home-photo.webp',
    ['Rattlesnake plant', 'Калатея лансифолия'],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Give bright filtered or indirect light. Direct sun can scorch the patterned leaves.',
            'Нужен яркий фильтрованный или рассеянный свет. Прямое солнце может обжечь узорчатые листья.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Keep the compost evenly moist during active growth, but never soggy. Water less in winter.',
            'В период роста поддерживайте грунт равномерно влажным, но не мокрым. Зимой поливайте реже.',
          ],
        ],
        [
          ['Humidity', 'Влажность'],
          [
            'High humidity helps prevent leaf edges from browning and curling.',
            'Высокая влажность помогает избежать подсыхания и скручивания краёв листьев.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Keep warm and draught-free, ideally above 16°C with no sudden temperature changes.',
            'Держите в тепле и без сквозняков, желательно выше 16 °C и без резких перепадов температуры.',
          ],
        ],
      ),
      4,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Prayer plant family (Marantaceae)', 'Марантовые (Marantaceae)'],
        ],
        [
          ['Origin', 'Родина'],
          ['Brazil, Rio de Janeiro', 'Бразилия, штат Рио-де-Жанейро'],
        ],
        [
          ['Plant type', 'Тип растения'],
          ['Rhizomatous evergreen perennial', 'Корневищный вечнозелёный многолетник'],
        ],
      ),
      profileFooter(
        [
          [
            'The wavy, lance-shaped leaves are marked with dark oval blotches.',
            'The underside of each leaf is deep purple to maroon.',
            'In the evening the leaves lift and fold, then open again in the morning.',
            'Small yellow flowers are uncommon on indoor plants.',
          ],
          [
            'Волнистые ланцетные листья украшены тёмными овальными пятнами.',
            'Изнанка листьев окрашена в глубокий пурпурно-бордовый цвет.',
            'Вечером листья поднимаются и складываются, а утром снова раскрываются.',
            'Небольшие жёлтые цветки в комнатных условиях появляются редко.',
          ],
        ],
        [
          'Do not let the compost dry out completely and keep the plant away from direct sun, cold glass and draughts.',
          'Не пересушивайте грунт полностью и берегите растение от прямого солнца, холодного стекла и сквозняков.',
        ],
        [
          [
            'Brown, curling edges — humidity may be too low.',
            'Faded patches — move away from direct sun.',
            'Yellowing leaves — check that the compost is not waterlogged.',
          ],
          [
            'Края листьев буреют и скручиваются — вероятно, слишком сухой воздух.',
            'Узор бледнеет или появляются ожоги — уберите от прямого солнца.',
            'Листья желтеют — проверьте, не переувлажнён ли грунт.',
          ],
        ],
        [
          'Divide a mature clump in late spring, keeping several healthy shoots and roots in each section.',
          'Делите взрослый куст поздней весной: у каждой делёнки должны остаться здоровые побеги и корни.',
        ],
      ),
      'Goeppertia insignis',
      [
        'Also sold as Calathea lancifolia. Its patterned leaves look their best in stable, humid conditions.',
        'Также встречается под названием Calathea lancifolia. Узорчатые листья лучше всего выглядят в стабильных влажных условиях.',
      ],
      [
        'Rattlesnake plant is a tropical Brazilian perennial grown for its long, wavy leaves with dark oval markings and purple undersides.',
        'Калатея лансифолия — тропический многолетник из Бразилии, который ценят за длинные волнистые листья с тёмным овальным узором и пурпурной изнанкой.',
      ],
      quickFacts(['Moderate', 'Умеренный'], ['Clump to 60 cm', 'Куст до 60 см']),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use a moisture-retentive but free-draining mix: 90% peat-free houseplant compost and 10% fine potting grit or perlite.',
            'Используйте влагоёмкую, но хорошо дренированную смесь: 90% безторфяного грунта для комнатных растений и 10% мелкого посадочного гравия или перлита.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Repot or divide in late spring when the clump has filled its pot.',
            'Пересаживайте или делите куст поздней весной, когда он освоит горшок.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'Use a low-salt liquid fertiliser with N-P₂O₅-K₂O close to 3-1-2 (for example 18-6-12), including Ca, Mg, chelated Fe, Mn, Zn, Cu and B. Feed monthly at quarter to half strength from spring to summer; avoid fluoride-containing products.',
            'Выбирайте малосолевое жидкое удобрение с N-P₂O₅-K₂O около 3-1-2 (например, 18-6-12), с Ca, Mg, хелатным Fe, Mn, Zn, Cu и B. Подкармливайте с весны до конца лета раз в месяц в ¼–½ дозы; избегайте средств с фтором.',
          ],
        ],
        [
          ['Grooming', 'Уход за листвой'],
          [
            'No support is needed. Remove only yellowed or damaged leaves at the base.',
            'Опора не нужна. Удаляйте только пожелтевшие или повреждённые листья у основания.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/calathea-important-leaves.webp',
        propagationIcon: '/plant-profile/calathea-propagation-icon.webp',
        propagationImage: '/plant-profile/calathea-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'aizoaceae',
    'faucaria-tigrina',
    '/plants/faucaria-tigrina-home-photo.webp',
    ['Tiger jaws', 'Фаукария тигровая'],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Give the brightest available position, ideally with several hours of direct sun after gradual acclimatisation.',
            'Поставьте на самое светлое место; после постепенного привыкания полезны несколько часов прямого солнца.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Water thoroughly only after the gritty mix has dried. Never leave water in the saucer.',
            'Поливайте обильно только после просыхания минеральной смеси. Не оставляйте воду в поддоне.',
          ],
        ],
        [
          ['Humidity', 'Влажность'],
          [
            'Normal dry room air suits it well; high humidity is unnecessary.',
            'Обычный сухой комнатный воздух подходит хорошо; повышенная влажность не нужна.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Keep warm in growth, then give a bright, cool and dry winter rest above 8°C.',
            'В период роста держите в тепле, а зимой обеспечьте светлый, прохладный и сухой отдых выше 8 °C.',
          ],
        ],
      ),
      2,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Ice plant family (Aizoaceae)', 'Аизовые (Aizoaceae)'],
        ],
        [
          ['Origin', 'Родина'],
          ['Eastern Cape, South Africa', 'Восточная Капская провинция, ЮАР'],
        ],
        [
          ['Plant type', 'Тип растения'],
          ['Clumping succulent subshrub', 'Кустящийся суккулентный полукустарник'],
        ],
      ),
      profileFooter(
        [
          [
            'The paired triangular leaves have soft white marginal teeth that give the plant its tiger-jaw name.',
            'Leaf surfaces are dotted with pale translucent spots.',
            'Mature plants can open large yellow flowers in bright sunshine.',
            'It forms new rosettes at the base and gradually becomes a small clump.',
          ],
          [
            'Парные треугольные листья с мягкими белыми зубчиками по краю дали растению «тигровое» название.',
            'Поверхность листьев усеяна светлыми полупрозрачными точками.',
            'Взрослые растения могут раскрывать крупные жёлтые цветки на ярком солнце.',
            'У основания появляются новые розетки, и со временем образуется компактная куртинка.',
          ],
        ],
        [
          'The main risk is prolonged dampness. Protect the roots from waterlogging and do not water a cold plant.',
          'Главный риск — длительная сырость. Берегите корни от застоя воды и не поливайте холодное растение.',
        ],
        [
          [
            'Soft, translucent leaves — stop watering and inspect the roots.',
            'Stretched, pale growth — move to brighter light gradually.',
            'Shrivelled leaves in dry soil — water once, then let the mix drain fully.',
          ],
          [
            'Мягкие полупрозрачные листья — прекратите полив и проверьте корни.',
            'Вытянутый бледный прирост — постепенно переставьте на более яркий свет.',
            'Сморщенные листья при сухом грунте — один раз полейте и дайте смеси полностью стечь.',
          ],
        ],
        [
          'Separate a rooted offset in late spring or summer. Let the cut dry for a day, then plant into a dry gritty mix and wait before the first light watering.',
          'Отделяйте укоренённую дочернюю розетку поздней весной или летом. Подсушите срез сутки, посадите в сухую минеральную смесь и лишь затем осторожно полейте.',
        ],
      ),
      'Faucaria tigrina',
      [
        'Tiger jaws is a compact South African succulent prized for its patterned leaves with tooth-like margins.',
        'Фаукарию тигровую ценят за компактные узорчатые листья с зубчиками по краям.',
      ],
      [
        'Tiger jaws is a small clumping succulent from South Africa. Its thick paired leaves are edged with soft, pale teeth and store water for dry periods.',
        'Фаукария тигровая — небольшой кустящийся суккулент из Южной Африки. Толстые парные листья с мягкими светлыми зубчиками запасают воду на засушливый период.',
      ],
      quickFacts(['Slow', 'Медленный'], ['Rosette to 15 cm', 'Розетка до 15 см']),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Mix by volume: 30% cactus compost, 35% pumice or fine gravel, 25% perlite and 10% coarse sand. Use a pot with a drainage hole.',
            'Смешайте по объёму: 30% грунта для кактусов, 35% пемзы или мелкого гравия, 25% перлита и 10% крупного песка. Горшок нужен с дренажным отверстием.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Repot in spring only when the clump has filled its pot. Keep the neck of the plant above the mix.',
            'Пересаживайте весной, только когда куртинка освоила горшок. Шейку растения оставляйте над уровнем смеси.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'Use a low-nitrogen cactus fertiliser with micronutrients once a month in active growth at half strength. Do not feed a dormant or stressed plant.',
            'Раз в месяц в период роста давайте удобрение для кактусов с пониженным азотом и микроэлементами в половинной дозе. Не подкармливайте спящее или ослабленное растение.',
          ],
        ],
        [
          ['Grooming', 'Уход за розеткой'],
          [
            'No support is needed. Remove only fully dry old leaves; the pale marginal teeth are natural and soft.',
            'Опора не нужна. Удаляйте только полностью сухие старые листья; светлые зубчики по краю — естественная мягкая особенность.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/faucaria-important-leaves.webp',
        propagationIcon: '/plant-profile/faucaria-propagation-icon.webp',
        propagationImage: '/plant-profile/faucaria-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'crassulaceae',
    'kalanchoe-tomentosa',
    '/plants/kalanchoe-tomentosa-home-photo.webp',
    ['Panda plant', 'Каланхоэ войлочное'],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Give bright light and several hours of gentle direct sun after acclimatisation.',
            'Нужен яркий свет и несколько часов мягкого прямого солнца после постепенного привыкания.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Water only when the gritty mix has dried almost completely. Drain excess water.',
            'Поливайте только после почти полного просыхания минеральной смеси. Излишки воды всегда сливайте.',
          ],
        ],
        [
          ['Humidity', 'Влажность'],
          [
            'Normal dry room air is ideal; do not mist the velvety leaves.',
            'Обычный сухой комнатный воздух подходит идеально; бархатистые листья не опрыскивайте.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Keep warm in growth and brighter, drier and cooler in winter, above 10°C.',
            'В период роста держите в тепле, а зимой — светлее, суше и прохладнее, выше 10 °C.',
          ],
        ],
      ),
      2,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Stonecrop family (Crassulaceae)', 'Толстянковые (Crassulaceae)'],
        ],
        [
          ['Origin', 'Родина'],
          ['Central-eastern Madagascar', 'Центрально-восточный Мадагаскар'],
        ],
        [
          ['Plant type', 'Тип растения'],
          ['Velvety succulent subshrub', 'Бархатистый суккулентный полукустарник'],
        ],
      ),
      profileFooter(
        [
          [
            'The dense felt-like hairs protect the leaves from intense sun and reduce water loss.',
            'Brown markings along the leaf margins give the plant a distinctive outline.',
            'Indoor plants rarely flower, but mature plants can produce tubular blooms.',
            'It is often called panda plant for its soft, fuzzy foliage.',
          ],
          [
            'Густое войлочное опушение защищает листья от яркого солнца и уменьшает потерю влаги.',
            'Коричневые отметины по краям листьев создают узнаваемый рисунок.',
            'В помещении растение цветёт редко, но взрослые экземпляры могут дать трубчатые цветки.',
            'Из-за мягкой пушистой листвы его часто называют панда-плант.',
          ],
        ],
        [
          'Never keep the roots wet for long and avoid getting water trapped in the leaf fuzz.',
          'Не держите корни во влажном грунте долго и не оставляйте воду в опушении листьев.',
        ],
        [
          [
            'Soft dark leaves — likely excess moisture.',
            'Long pale growth — move gradually to brighter light.',
            'Leaf marks rub off easily — handle the velvet foliage gently.',
          ],
          [
            'Мягкие тёмные листья — вероятно, избыток влаги.',
            'Вытянутый бледный прирост — постепенно добавьте света.',
            'Налёт на листьях легко стирается — обращайтесь с бархатистой листвой бережно.',
          ],
        ],
        [
          'Take a healthy stem cutting in spring or summer. Let the cut dry for several days, then root it in a dry gritty mix.',
          'Весной или летом возьмите здоровый стеблевой черенок. Подсушите срез несколько дней, затем укореняйте в сухой минеральной смеси.',
        ],
      ),
      'Kalanchoe tomentosa',
      [
        'Velvety foliage and chocolate-brown leaf markings make this a quietly sculptural succulent.',
        'Бархатистая листва и шоколадно-коричневые отметины делают этот суккулент особенно графичным.',
      ],
      [
        'Kalanchoe tomentosa is a Madagascan succulent subshrub with soft silver-green felted leaves and brown margins.',
        'Каланхоэ войлочное — мадагаскарский суккулентный полукустарник с мягкими серебристо-зелёными войлочными листьями и коричневыми краями.',
      ],
      quickFacts(
        ['Slow to moderate', 'Медленный'],
        ['Up to 45 cm indoors', 'До 45 см в помещении'],
      ),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Mix by volume: 35% cactus compost, 30% pumice or fine gravel, 25% perlite and 10% coarse sand. Use a drainage hole.',
            'Смешайте по объёму: 35% грунта для кактусов, 30% пемзы или мелкого гравия, 25% перлита и 10% крупного песка. Горшок нужен с дренажным отверстием.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Repot in spring only when the roots have filled the pot.',
            'Пересаживайте весной, только когда корни полностью освоят горшок.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'Use a low-nitrogen cactus fertiliser with micronutrients once a month in active growth at half strength.',
            'Раз в месяц в период роста используйте удобрение для кактусов с пониженным азотом и микроэлементами в половинной дозе.',
          ],
        ],
        [
          ['Grooming', 'Уход за листвой'],
          [
            'No support is needed. Do not rub or wash the leaves: their felted coating is natural protection.',
            'Опора не нужна. Не трите и не мойте листья: войлочное покрытие — естественная защита.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/kalanchoe-important-leaves.webp',
        propagationIcon: '/plant-profile/kalanchoe-propagation-icon.webp',
        propagationImage: '/plant-profile/kalanchoe-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'marantaceae',
    'goeppertia-rufibarba',
    '/plants/goeppertia-rufibarba-home-photo.webp',
    ['Velvet calathea', 'Калатея руфибарба'],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Give bright, filtered or indirect light. Direct sun can fade and scorch the velvety leaves.',
            'Нужен яркий фильтрованный или рассеянный свет. Прямое солнце может обесцветить и обжечь бархатистые листья.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Keep the mix lightly and evenly moist while it grows, then water less in winter. Never leave the roots standing in water.',
            'В период роста поддерживайте смесь слегка и равномерно влажной, а зимой поливайте реже. Не оставляйте корни в воде.',
          ],
        ],
        [
          ['Humidity', 'Влажность'],
          [
            'A humid room helps the leaf edges remain smooth; keep it away from dry hot airflow.',
            'Влажный воздух помогает краям листьев оставаться ровными; не ставьте растение на пути сухого горячего воздуха.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Keep warm and draught-free, ideally 18–27°C and never close to cold glass.',
            'Держите в тепле и без сквозняков, лучше при 18–27 °C и не вплотную к холодному стеклу.',
          ],
        ],
      ),
      4,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Prayer plant family (Marantaceae)', 'Марантовые (Marantaceae)'],
        ],
        [
          ['Origin', 'Родина'],
          ['Bahia, north-eastern Brazil', 'Баия, северо-восток Бразилии'],
        ],
        [
          ['Plant type', 'Тип растения'],
          ['Rhizomatous evergreen perennial', 'Корневищный вечнозелёный многолетник'],
        ],
      ),
      profileFooter(
        [
          [
            'The long, narrow leaves have strongly wavy edges and a velvety surface.',
            'The leaf undersides and petioles show a rich burgundy tone.',
            'Its name rufibarba refers to the fine reddish hairs around the leaf stems.',
            'Like other prayer plants, it can raise and fold its leaves as light changes.',
          ],
          [
            'Длинные узкие листья имеют заметно волнистый край и бархатистую поверхность.',
            'Изнанка листьев и черешки окрашены в насыщенный бордовый тон.',
            'Название rufibarba связано с тонкими рыжеватыми волосками у черешков.',
            'Как и другие марантовые, растение может поднимать и складывать листья при смене освещения.',
          ],
        ],
        [
          'Do not allow the root ball to dry out fully, and keep the plant away from hard direct sun, cold glass and draughts.',
          'Не пересушивайте корневой ком полностью и берегите растение от жёсткого прямого солнца, холодного стекла и сквозняков.',
        ],
        [
          [
            'Crisp brown edges — humidity may be too low or watering uneven.',
            'Faded patches — move away from direct sunlight.',
            'Yellowing leaves — let the mix drain and check that the roots are not waterlogged.',
          ],
          [
            'Сухие коричневые края — вероятно, слишком сухой воздух или неравномерный полив.',
            'Бледные пятна — уберите от прямого солнца.',
            'Листья желтеют — дайте смеси просохнуть и проверьте, нет ли застоя у корней.',
          ],
        ],
        [
          'Divide a mature clump in late spring, keeping several healthy shoots and roots with each division.',
          'Делите взрослый куст поздней весной: у каждой делёнки должны остаться несколько здоровых побегов и корней.',
        ],
      ),
      'Goeppertia rufibarba',
      [
        'Often sold as Calathea rufibarba. It is especially valued for its narrow, softly velvety leaves and wine-coloured undersides.',
        'Часто продаётся под названием Calathea rufibarba. Её ценят за узкие мягко-бархатистые листья и винную изнанку.',
      ],
      [
        'Velvet calathea is a tropical Brazilian prayer plant with long wavy leaves, reddish petioles and deep burgundy undersides.',
        'Калатея руфибарба — тропическое бразильское растение из марантовых с длинными волнистыми листьями, красноватыми черешками и глубокой бордовой изнанкой.',
      ],
      quickFacts(['Moderate', 'Умеренный'], ['Clump to 90 cm', 'Куст до 90 см']),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use a moisture-retentive but free-draining mix: 90% peat-free houseplant compost and 10% fine potting grit or perlite.',
            'Используйте влагоёмкую, но хорошо дренированную смесь: 90% безторфяного грунта для комнатных растений и 10% мелкого посадочного гравия или перлита.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Repot or divide in late spring once the clump has filled its pot.',
            'Пересаживайте или делите куст поздней весной, когда он освоит горшок.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'Use a low-salt liquid fertiliser with N-P₂O₅-K₂O near 3-1-2 and Ca, Mg, chelated Fe, Mn, Zn, Cu and B. Feed monthly at quarter to half strength from spring to summer.',
            'Выбирайте малосолевое жидкое удобрение с N-P₂O₅-K₂O около 3-1-2, а также Ca, Mg, хелатным Fe, Mn, Zn, Cu и B. С весны до конца лета подкармливайте раз в месяц в ¼–½ дозы.',
          ],
        ],
        [
          ['Grooming', 'Уход за листвой'],
          [
            'No support is needed. Remove only damaged leaves at the base and do not polish the naturally velvety foliage.',
            'Опора не нужна. Удаляйте только повреждённые листья у основания и не полируйте естественно бархатистую листву.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/rufibarba-important-leaves.webp',
        propagationIcon: '/plant-profile/rufibarba-propagation-icon.webp',
        propagationImage: '/plant-profile/rufibarba-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'marantaceae',
    'goeppertia-elliptica-vittata',
    '/plants/goeppertia-elliptica-vittata-home-photo.webp',
    ['Vittata calathea', 'Калатея виттата'],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Give bright, filtered or indirect light. Direct sun fades the pale stripes and can scorch the leaves.',
            'Нужен яркий фильтрованный или рассеянный свет. Прямое солнце обесцвечивает светлые полосы и может обжечь листья.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Keep the mix evenly moist during active growth, allowing only the surface to dry slightly. Never leave the roots waterlogged.',
            'В период роста поддерживайте смесь равномерно влажной, позволяя лишь поверхности слегка подсохнуть. Не допускайте застоя воды у корней.',
          ],
        ],
        [
          ['Humidity', 'Влажность'],
          [
            'High humidity helps preserve smooth leaf edges and clear variegation; avoid dry hot air.',
            'Высокая влажность помогает сохранить ровные края листьев и чёткий рисунок; избегайте сухого горячего воздуха.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Keep warm and draught-free, ideally 18–27°C. Do not place close to cold glass.',
            'Держите в тепле и без сквозняков, лучше при 18–27 °C. Не ставьте растение вплотную к холодному стеклу.',
          ],
        ],
      ),
      4,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Prayer plant family (Marantaceae)', 'Марантовые (Marantaceae)'],
        ],
        [
          ['Origin', 'Родина'],
          ['Tropical northern South America and Brazil', 'Тропики севера Южной Америки и Бразилии'],
        ],
        [
          ['Plant type', 'Тип растения'],
          ['Rhizomatous evergreen perennial', 'Корневищный вечнозелёный многолетник'],
        ],
      ),
      profileFooter(
        [
          [
            'The pale, narrow stripes radiate from the midrib across each leaf.',
            'The pattern stays clearest in stable bright indirect light.',
            'Like other prayer plants, the leaves can rise and fold at night.',
            'It grows as a compact clump, producing new leaves from its rhizome.',
          ],
          [
            'Светлые узкие полосы расходятся от центральной жилки по всей пластинке.',
            'Рисунок остаётся наиболее чётким при стабильном ярком рассеянном свете.',
            'Как и другие марантовые, листья могут подниматься и складываться ночью.',
            'Растение растёт компактным кустом, выпуская новые листья из корневища.',
          ],
        ],
        [
          'Do not let the root ball dry out completely. Keep the plant away from direct sun, cold glass and dry air from radiators.',
          'Не пересушивайте корневой ком полностью. Берегите растение от прямого солнца, холодного стекла и сухого воздуха от батарей.',
        ],
        [
          [
            'Brown tips — humidity may be low or water may be too hard.',
            'Faded stripes — give more bright indirect light, not sun.',
            'Yellowing leaves — check that the mix is not staying wet for too long.',
          ],
          [
            'Коричневые кончики — вероятно, низкая влажность или слишком жёсткая вода.',
            'Полосы бледнеют — добавьте яркого рассеянного света, но не прямого солнца.',
            'Листья желтеют — проверьте, не остаётся ли смесь влажной слишком долго.',
          ],
        ],
        [
          'Divide a mature clump in late spring, keeping healthy roots and several shoots with each new plant.',
          'Делите взрослый куст поздней весной: у каждого нового растения должны остаться здоровые корни и несколько побегов.',
        ],
      ),
      "Goeppertia elliptica 'Vittata'",
      [
        'Often sold as Calathea vittata. This horticultural form is prized for its fine pale pinstripes on fresh green leaves.',
        'Часто продаётся как Calathea vittata. Эту садовую форму ценят за тонкие светлые полосы на свежей зелёной листве.',
      ],
      [
        'Vittata calathea is a striped form of Goeppertia elliptica, a tropical prayer plant that forms a compact clump of pointed, finely variegated leaves.',
        'Калатея виттата — полосатая форма Goeppertia elliptica, тропического растения из марантовых, образующего компактный куст с заострёнными тонко-вариегатными листьями.',
      ],
      quickFacts(['Moderate', 'Умеренный'], ['Clump to 60 cm', 'Куст до 60 см']),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use a moisture-retentive but free-draining mix: 90% peat-free houseplant compost and 10% fine potting grit or perlite.',
            'Используйте влагоёмкую, но хорошо дренированную смесь: 90% безторфяного грунта для комнатных растений и 10% мелкого посадочного гравия или перлита.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Repot or divide in late spring when the clump has filled its pot.',
            'Пересаживайте или делите куст поздней весной, когда он освоит горшок.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'Use a low-salt liquid fertiliser with N-P₂O₅-K₂O near 3-1-2 and Ca, Mg, chelated Fe, Mn, Zn, Cu and B. Feed monthly at quarter to half strength from spring to summer.',
            'Выбирайте малосолевое жидкое удобрение с N-P₂O₅-K₂O около 3-1-2, а также Ca, Mg, хелатным Fe, Mn, Zn, Cu и B. С весны до конца лета подкармливайте раз в месяц в ¼–½ дозы.',
          ],
        ],
        [
          ['Grooming', 'Уход за листвой'],
          [
            'No support is needed. Remove only damaged leaves at the base and wipe dust with a soft damp cloth.',
            'Опора не нужна. Удаляйте только повреждённые листья у основания, а пыль убирайте мягкой влажной салфеткой.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/vittata-important-leaves.webp',
        propagationIcon: '/plant-profile/vittata-propagation-icon.webp',
        propagationImage: '/plant-profile/vittata-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'aglaonema-red-valentine',
    '/plant-profile/aglaonema-red-valentine.webp',
    ["Aglaonema 'Red Valentine'", "Аглаонема 'Red Valentine'"],
    plantProfile(
      careCards(
        [
          ['Light', 'Свет'],
          [
            'Bright diffused light without direct midday sun. Brighter filtered light helps preserve the pink-red coloring.',
            'Яркий рассеянный свет без прямого полуденного солнца. Более светлое место помогает сохранить розово-красную окраску.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Water after the top 2–4 cm of soil dries. Drain excess water and do not leave the roots standing in moisture.',
            'Поливайте после просыхания верхних 2–4 см грунта. Сливайте лишнюю воду и не оставляйте корни в сырости.',
          ],
        ],
        [
          ['Humidity', 'Влажность'],
          [
            'Average room humidity is suitable, but keep the plant away from heaters and dry drafts.',
            'Подходит обычная комнатная влажность, но растение лучше держать подальше от батарей и сухих сквозняков.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Keep at 18–27 °C and protect from cold windows, drafts, and temperatures below 15 °C.',
            'Содержите при 18–27 °C, защищая от холодного стекла, сквозняков и температуры ниже 15 °C.',
          ],
        ],
      ),
      2,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Araceae', 'Ароидные'],
        ],
        [
          ['Origin', 'Происхождение'],
          [
            'Cultivated hybrid; the genus comes from tropical Asia',
            'Культурный гибрид; род происходит из тропической Азии',
          ],
        ],
        [
          ['Type', 'Тип'],
          [
            'Evergreen ornamental foliage perennial',
            'Вечнозелёный декоративно-лиственный многолетник',
          ],
        ],
      ),
      profileFooter(
        [
          [
            'Broad leaves combine a pink-red field with irregular green flecks.',
            'The intensity of the coloring depends on the amount of soft light.',
            'The cultivar forms a compact, lush bush.',
          ],
          [
            'Широкие листья сочетают розово-красное поле с нерегулярными зелёными вкраплениями.',
            'Интенсивность окраски зависит от количества мягкого света.',
            'Сорт формирует компактный пышный куст.',
          ],
        ],
        [
          'The sap contains calcium oxalate crystals. Keep away from children and pets and wash hands after pruning.',
          'Сок содержит кристаллы оксалата кальция. Держите растение подальше от детей и животных, после обрезки мойте руки.',
        ],
        [
          [
            'Yellow, soft leaves usually indicate excess moisture or cold roots.',
            'Brown tips can appear from very dry air or salt buildup in the soil.',
            'Fading pink color usually means the plant needs more diffused light.',
          ],
          [
            'Жёлтые мягкие листья обычно говорят о переувлажнении или переохлаждении корней.',
            'Коричневые кончики могут появляться из-за сухого воздуха или накопления солей в грунте.',
            'Побледнение розовой окраски обычно означает нехватку рассеянного света.',
          ],
        ],
        [
          'Propagate by dividing a mature bush or by rooting stem cuttings during the warm growing season.',
          'Размножайте делением взрослого куста или укоренением стеблевых черенков в тёплый период роста.',
        ],
      ),
      "Aglaonema 'Red Valentine'",
      [
        'Wipe the leaves regularly and rotate the pot so the bush develops evenly.',
        'Регулярно протирайте листья и поворачивайте горшок, чтобы куст развивался равномерно.',
      ],
      [
        "'Red Valentine' is valued for its unusually warm pink-red foliage and compact shape.",
        "'Red Valentine' ценят за необычную тёплую розово-красную листву и компактную форму.",
      ],
      quickFacts(
        ['Moderate', 'Умеренная'],
        ['Compact, about 40–60 cm', 'Компактная, около 40–60 см'],
      ),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use a loose, well-drained mix: 75% peat-free houseplant compost and 25% perlite or fine pumice.',
            'Используйте рыхлую, хорошо дренированную смесь: 75% безторфяного грунта для комнатных растений и 25% перлита или мелкой пемзы.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Repot in spring when roots fill the pot, choosing a container only slightly larger than the previous one.',
            'Пересаживайте весной, когда корни заполнят горшок, выбирая ёмкость лишь немного больше предыдущей.',
          ],
        ],
        [
          ['Feeding', 'Подкормка'],
          [
            'Feed monthly in spring and summer with a balanced foliage fertilizer at half strength.',
            'Весной и летом подкармливайте раз в месяц половинной дозой сбалансированного удобрения для декоративно-лиственных.',
          ],
        ],
        [
          ['Grooming', 'Уход за листьями'],
          [
            'Remove yellow leaves at the base and wipe healthy leaves with a soft damp cloth.',
            'Удаляйте пожелтевшие листья у основания, а здоровые протирайте мягкой влажной тканью.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/aglaonema-red-valentine-important.webp',
        propagationImage: '/plant-profile/aglaonema-red-valentine-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'aglaonema-red-peacock',
    '/plant-profile/aglaonema-red-peacock.webp',
    ["Aglaonema 'Red Peacock'", "Аглаонема 'Red Peacock'"],
    aglaonemaProfile(
      'Red Peacock',
      ['the red and pink tones', 'красные и розовые оттенки'],
      [
        [
          'Each leaf develops its own mix of coral-red, warm pink, lime, and deep green.',
          'Pale pink petioles make the bright leaf pattern look even lighter.',
          'New leaves may open greener and gain warmer tones as they mature.',
          'The compact rosette becomes fuller as basal shoots develop.',
        ],
        [
          'Каждый лист получает собственный рисунок из кораллово-красных, тёплых розовых, лаймовых и тёмно-зелёных пятен.',
          'Светло-розовые черешки делают яркий рисунок листьев ещё воздушнее.',
          'Молодые листья могут раскрываться более зелёными и набирать тёплые оттенки по мере взросления.',
          'Компактная розетка становится пышнее благодаря прикорневым побегам.',
        ],
      ],
      [
        'Wipe the broad leaves gently and turn the pot a quarter turn every week for balanced growth.',
        'Аккуратно протирайте широкие листья и раз в неделю поворачивайте горшок на четверть оборота для равномерного роста.',
      ],
      [
        "'Red Peacock' is a vivid aglaonema cultivar with broad leaves covered in an irregular mosaic of green, lime, pink, and coral-red.",
        "'Red Peacock' — яркий сорт аглаонемы с широкими листьями, покрытыми нерегулярной мозаикой зелёных, лаймовых, розовых и кораллово-красных оттенков.",
      ],
      ['Compact, about 40–60 cm', 'Компактная, около 40–60 см'],
      {
        importantImage: '/plant-profile/aglaonema-red-peacock-important.webp',
        propagationImage: '/plant-profile/aglaonema-red-peacock-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'aglaonema-siam-aurora',
    '/plant-profile/aglaonema-siam-aurora.webp',
    ["Aglaonema 'Siam Aurora'", "Аглаонема 'Сиам Аврора'"],
    aglaonemaProfile(
      'Siam Aurora',
      ['the red-pink margins', 'красно-розовую кайму'],
      [
        [
          'The narrow green leaves are outlined by vivid red-pink margins and matching midribs.',
          'Fine golden-green mottling makes the pattern of every leaf slightly different.',
          'New growth opens from pale pink sheaths at the center of the rosette.',
          'Basal shoots gradually turn a young plant into a fuller clump.',
        ],
        [
          'Узкие зелёные листья очерчены яркой красно-розовой каймой и такой же центральной жилкой.',
          'Мелкий золотисто-зелёный крап делает рисунок каждого листа немного разным.',
          'Новые листья разворачиваются из светло-розовых влагалищ в центре розетки.',
          'Прикорневые побеги постепенно превращают молодое растение в более пышный куст.',
        ],
      ],
      [
        'Keep the leaves clean and turn the pot regularly so the red-edged rosette grows evenly.',
        'Поддерживайте листья чистыми и регулярно поворачивайте горшок, чтобы красноокаймлённая розетка росла равномерно.',
      ],
      [
        "'Siam Aurora' is an elegant aglaonema cultivar with narrow green leaves traced by vivid red-pink margins and midribs.",
        "'Сиам Аврора' — элегантный сорт аглаонемы с узкими зелёными листьями, яркой красно-розовой каймой и центральной жилкой.",
      ],
      ['Compact, about 35–50 cm', 'Компактная, около 35–50 см'],
      {
        importantImage: '/plant-profile/aglaonema-siam-aurora-important.webp',
        propagationImage: '/plant-profile/aglaonema-siam-aurora-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'aglaonema-silver-queen',
    '/plant-profile/aglaonema-silver-queen.webp',
    ["Aglaonema 'Silver Queen'", "Аглаонема 'Silver Queen'"],
    aglaonemaProfile(
      'Silver Queen',
      ['the silvery pattern', 'серебристый рисунок'],
      [
        [
          'Long lance-shaped leaves combine dark green margins with broad silvery gray-green feathering.',
          'Each leaf carries a slightly different irregular camouflage-like pattern.',
          'The arching foliage gives a mature plant a soft fountain-shaped silhouette.',
          'Older clumps develop several upright canes and dense basal growth.',
        ],
        [
          'Длинные ланцетные листья сочетают тёмно-зелёные края с широким серебристо-серо-зелёным рисунком.',
          'На каждом листе формируется немного разный нерегулярный узор, похожий на камуфляж.',
          'Дуговидная листва придаёт взрослому растению мягкий фонтанообразный силуэт.',
          'У старых кустов образуются несколько прямостоячих стеблей и густая прикорневая поросль.',
        ],
      ],
      [
        'Wipe the long leaves carefully and remove aging yellow leaves at the base to keep the clump airy.',
        'Осторожно протирайте длинные листья и удаляйте стареющие жёлтые листья у основания, чтобы куст оставался воздушным.',
      ],
      [
        "'Silver Queen' is a classic aglaonema cultivar valued for its long arching leaves with a broad silvery pattern over deep green.",
        "'Silver Queen' — классический сорт аглаонемы с длинными дуговидными листьями и широким серебристым рисунком на тёмно-зелёном фоне.",
      ],
      ['Moderate, clump-forming', 'Умеренная, кустящаяся'],
      {
        importantImage: '/plant-profile/aglaonema-silver-queen-important.webp',
        propagationImage: '/plant-profile/aglaonema-silver-queen-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'aglaonema-green-bowl',
    '/plant-profile/aglaonema-green-bowl.webp',
    ["Aglaonema 'Green Bowl'", "Аглаонема 'Green Bowl'"],
    aglaonemaProfile(
      'Green Bowl',
      ['the silvery green pattern', 'серебристо-зелёный рисунок'],
      [
        [
          'Broad oval leaves curve gently upward at the edges, giving them a shallow bowl-like shape.',
          'A broad silvery green field fills the centre of each leaf and meets an irregular deep-green margin.',
          'Fine pale flecks and darker brushstrokes make the pattern of every leaf unique.',
          'Short petioles keep the young plant compact and neatly layered.',
        ],
        [
          'Широкие овальные листья слегка загибаются вверх по краям и напоминают неглубокую чашу.',
          'Серебристо-зелёный центр каждого листа обрамлён неровной тёмно-зелёной каймой.',
          'Светлый крап и тёмные штрихи делают рисунок каждого листа неповторимым.',
          'Короткие черешки сохраняют молодой куст компактным и аккуратно ярусным.',
        ],
      ],
      [
        'This new aglaonema immediately stood out for its calm layered greens and broad, almost horizontal leaves.',
        'Эта новая аглаонема сразу выделилась спокойными переливами зелени и широкими, почти горизонтальными листьями.',
      ],
      [
        "'Green Bowl' is a compact aglaonema cultivar with broad cupped leaves, silvery green centres and irregular dark-green margins.",
        "'Green Bowl' — компактный сорт аглаонемы с широкими чашевидными листьями, серебристо-зелёным центром и неровной тёмно-зелёной каймой.",
      ],
      ['Compact, about 35–50 cm', 'Компактная, около 35–50 см'],
      {
        importantImage: '/plant-profile/aglaonema-green-bowl-important.webp',
        propagationImage: '/plant-profile/aglaonema-green-bowl-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'aglaonema-red-anjamani',
    '/plant-profile/aglaonema-red-anjamani.webp',
    ["Aglaonema 'Red Anjamani'", "Аглаонема 'Red Anjamani'"],
    aglaonemaProfile(
      'Red Anjamani',
      ['the intense red coloring', 'насыщенную красную окраску'],
      [
        [
          'The broad pointed leaves are almost completely raspberry red, with only a narrow dark-green edge.',
          'Small green flecks along the margins make each leaf slightly different.',
          'New leaves rise upright from the centre before opening into a dense layered rosette.',
          'The compact habit makes the saturated foliage look especially vivid.',
        ],
        [
          'Широкие заострённые листья почти полностью окрашены в малиново-красный цвет и обведены тонкой тёмно-зелёной каймой.',
          'Мелкие зелёные вкрапления по краям делают каждый лист немного разным.',
          'Новые листья поднимаются вертикально из центра, а затем раскрываются в плотную ярусную розетку.',
          'Компактная форма делает насыщенную окраску особенно выразительной.',
        ],
      ],
      [
        'Its almost solid red foliage makes this newcomer one of the brightest accents in the collection.',
        'Почти полностью красная листва делает эту новинку одним из самых ярких акцентов коллекции.',
      ],
      [
        "'Red Anjamani' is a vivid compact aglaonema cultivar with raspberry-red leaves edged by a fine irregular line of green.",
        "'Red Anjamani' — яркий компактный сорт аглаонемы с малиново-красными листьями и тонкой неровной зелёной каймой.",
      ],
      ['Compact, about 30–50 cm', 'Компактная, около 30–50 см'],
      {
        importantImage: '/plant-profile/aglaonema-red-anjamani-important.webp',
        propagationImage: '/plant-profile/aglaonema-red-anjamani-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'zamioculcas-zamiifolia',
    '/plants/zamioculcas-zamiifolia-home-photo.webp',
    ['ZZ plant', 'Замиокулькас'],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Bright diffused light gives the most compact growth, though the plant tolerates a dimmer room. Protect it from harsh midday sun and rotate the pot occasionally so the stems do not all lean toward the window.',
            'Яркий рассеянный свет даёт самый компактный рост, хотя растение мирится и с более тёмной комнатой. Защищайте его от жёсткого полуденного солнца и иногда поворачивайте горшок, чтобы все побеги не наклонялись к окну.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Let the mix dry almost completely before watering. Then soak it thoroughly, empty the saucer and wait for another full drying cycle; in winter this can take several weeks.',
            'Перед поливом давайте грунту просохнуть почти полностью. Затем хорошо промочите его, слейте воду из поддона и снова дождитесь полного цикла просушки; зимой это может занять несколько недель.',
          ],
        ],
        [
          ['Humidity', 'Влажность'],
          [
            'Normal room humidity is enough. The plant does not need misting; wiping the leaflets with a damp soft cloth is more useful and makes pests easier to notice.',
            'Обычной комнатной влажности достаточно. Опрыскивания растению не нужны; полезнее протирать листочки мягкой влажной тканью, заодно проверяя их на вредителей.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Keep at 18–28 °C and away from cold draughts. Temperatures below about 15 °C make wet roots especially vulnerable to rot.',
            'Содержите при 18–28 °C и берегите от холодных сквозняков. При температуре ниже примерно 15 °C влажные корни особенно легко загнивают.',
          ],
        ],
      ),
      1,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Arum family (Araceae)', 'Ароидные (Araceae)'],
        ],
        [
          ['Origin', 'Происхождение'],
          ['Tropical eastern Africa', 'Тропическая Восточная Африка'],
        ],
        [
          ['Plant type', 'Тип растения'],
          ['Evergreen rhizomatous perennial', 'Вечнозелёный корневищный многолетник'],
        ],
      ),
      profileFooter(
        [
          [
            'Thick potato-like rhizomes and fleshy petioles store water for long dry periods.',
            'What looks like a stem is actually one compound leaf made of many glossy leaflets.',
            'Fresh shoots emerge pale green and gradually darken as they harden.',
            'Growth is naturally slow, especially away from a bright window.',
          ],
          [
            'Толстые корневища, похожие на маленькие картофелины, и мясистые черешки запасают воду на долгий сухой период.',
            'То, что выглядит как стебель, на самом деле является одним сложным листом из множества глянцевых листочков.',
            'Новые побеги появляются светло-зелёными и постепенно темнеют по мере взросления.',
            'Замиокулькас от природы растёт медленно, особенно вдали от яркого окна.',
          ],
        ],
        [
          'Overwatering is the main danger: a soft dark rhizome must be cut back to firm tissue and replanted into fresh dry mix. The sap contains calcium oxalate crystals, so wear gloves when dividing the plant and keep it away from children and pets.',
          'Главная опасность — перелив: мягкое потемневшее корневище нужно обрезать до плотной здоровой ткани и посадить растение в свежий сухой грунт. Сок содержит кристаллы оксалата кальция, поэтому при делении надевайте перчатки и держите растение подальше от детей и животных.',
        ],
        [
          [
            'Yellow lower leaves while the mix stays wet — pause watering and inspect the rhizomes for rot.',
            'Soft dark rhizomes or a sour smell — remove damaged tissue, dry the cuts and repot into an airy mix.',
            'Long sparse leaves leaning strongly to one side — move the plant closer to bright diffused light and rotate it regularly.',
            'Wrinkled leaflets and petioles after a long dry spell — water deeply once, rather than giving small frequent sips.',
          ],
          [
            'Нижние листья желтеют, пока грунт остаётся мокрым, — остановите полив и проверьте корневища на гниль.',
            'Мягкие тёмные корневища или кислый запах — удалите повреждённые ткани, подсушите срезы и пересадите растение в воздушный грунт.',
            'Длинные редкие листья сильно тянутся в одну сторону — поставьте растение ближе к яркому рассеянному свету и регулярно поворачивайте.',
            'Листочки и черешки сморщились после долгой просушки — один раз хорошо промочите грунт вместо частых маленьких порций воды.',
          ],
        ],
        [
          'Division is the quickest method. During repotting, gently separate a section with at least one firm rhizome, healthy roots and a leaf, let damaged areas dry briefly, then pot it into a small container with barely moist airy mix. Individual leaflets can also form a new rhizome, but this often takes many months and requires patience.',
          'Деление — самый быстрый способ. При пересадке аккуратно отделите часть хотя бы с одним плотным корневищем, здоровыми корнями и листом, немного подсушите повреждённые места и посадите в маленький горшок с едва влажным воздушным грунтом. Отдельные листочки тоже способны образовать новое корневище, но на это часто уходят многие месяцы.',
        ],
      ),
      'Zamioculcas zamiifolia',
      [
        'Mine is not a showroom-perfect ZZ plant: a few stems lean toward the window, dust returns to the leaves far too quickly and an occasional lower leaflet turns yellow after an overgenerous watering. Fortunately, its sturdy rhizomes forgive these beginner mistakes surprisingly well.',
        'Мой замиокулькас совсем не выставочный: несколько побегов тянутся к окну, на листьях слишком быстро снова появляется пыль, а после чересчур щедрого полива иногда желтеет нижний листочек. К счастью, крепкие корневища удивительно терпеливо прощают такие ошибки новичка.',
      ],
      [
        'Zamioculcas zamiifolia is an exceptionally resilient East African aroid with glossy compound leaves and underground water-storing rhizomes. It grows slowly, copes with ordinary room conditions and is much more likely to suffer from too much attention than from a short period of neglect.',
        'Замиокулькас — исключительно выносливый восточноафриканский ароид с глянцевыми сложными листьями и подземными корневищами, запасающими воду. Он медленно растёт, спокойно переносит обычные комнатные условия и гораздо чаще страдает от избытка заботы, чем от короткого периода невнимания.',
      ],
      quickFacts(['Slow', 'Медленный'], ['Usually 45–90 cm indoors', 'Обычно 45–90 см в комнате']),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use a fast-draining mix: about 50% light houseplant soil, 30% perlite or pumice and 20% fine bark or mineral grit. A drainage hole is essential.',
            'Используйте быстро просыхающий грунт: примерно 50% лёгкого субстрата для комнатных растений, 30% перлита или пемзы и 20% мелкой коры либо минеральной крошки. Дренажное отверстие обязательно.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Repot every 2–3 years or when the rhizomes begin to distort the pot. Choose a sturdy container only slightly wider than the root mass; an oversized pot stays wet for too long.',
            'Пересаживайте раз в 2–3 года или когда корневища начинают деформировать горшок. Выбирайте устойчивую ёмкость лишь немного шире корневого кома: слишком большой горшок слишком долго остаётся мокрым.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'From spring to early autumn, feed every 4–6 weeks with a balanced foliage fertiliser at half strength. Skip feeding in winter and after repotting.',
            'С весны до начала осени подкармливайте раз в 4–6 недель половинной дозой сбалансированного удобрения для декоративно-лиственных. Зимой и сразу после пересадки подкормки не нужны.',
          ],
        ],
        [
          ['Grooming', 'Уход за листьями'],
          [
            'Wipe dusty leaflets, rotate the pot for balanced growth and cut fully yellow leaves cleanly at soil level. Do not polish the foliage with oil or leaf-shine products.',
            'Протирайте пыль с листочков, поворачивайте горшок для равномерного роста и срезайте полностью пожелтевшие листья у уровня грунта. Не натирайте листву маслом или средствами для блеска.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/zamioculcas-important.webp',
        propagationImage: '/plant-profile/zamioculcas-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'philodendron-white-wizard',
    '/plants/philodendron-white-wizard-home-photo.webp',
    ["Philodendron 'White Wizard'", "Филодендрон 'White Wizard'"],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Give very bright diffused light with a little gentle morning or evening sun. The white sectors scorch easily in harsh midday sun, while a dark position weakens growth and may reduce visible variegation.',
            'Обеспечьте очень яркий рассеянный свет и немного мягкого утреннего или вечернего солнца. Белые участки легко обгорают под жёсткими полуденными лучами, а в тёмном месте рост ослабевает и заметной вариегатности может становиться меньше.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Water after the upper 3–5 cm of the mix dries. Soak the root ball evenly, drain all excess water and let the airy substrate partially dry before watering again.',
            'Поливайте после просыхания верхних 3–5 см грунта. Равномерно промочите корневой ком, полностью слейте лишнюю воду и дайте воздушному субстрату частично подсохнуть перед следующим поливом.',
          ],
        ],
        [
          ['Humidity', 'Влажность'],
          [
            'A stable 50–70% humidity supports smooth new leaves, but good air movement is essential. Do not leave water sitting inside a newly unfurling leaf.',
            'Стабильная влажность 50–70% помогает новым листьям раскрываться ровно, но при этом необходимо движение воздуха. Не оставляйте воду внутри разворачивающегося листа.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Keep at 18–28 °C and protect from cold glass, draughts and temperatures below about 15 °C. Warm roots help the plant grow steadily.',
            'Содержите при 18–28 °C и берегите от холодного стекла, сквозняков и температуры ниже примерно 15 °C. Тёплая корневая система помогает растению расти стабильно.',
          ],
        ],
      ),
      2,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Arum family (Araceae)', 'Ароидные (Araceae)'],
        ],
        [
          ['Origin', 'Происхождение'],
          [
            'Horticultural cultivar of a Colombian species',
            'Садовый сорт вида, происходящего из Колумбии',
          ],
        ],
        [
          ['Plant type', 'Тип растения'],
          ['Evergreen variegated climbing aroid', 'Вечнозелёный вариегатный лазающий ароид'],
        ],
      ),
      profileFooter(
        [
          [
            'Every leaf develops a unique pattern of white sectors, marbling and fine speckles.',
            'White tissue contains no chlorophyll, so the plant needs enough green area to remain vigorous.',
            'A vertical support helps the leaves become larger as the plant matures.',
            'Aerial roots form at stem nodes and can attach to a moss pole or other support.',
          ],
          [
            'Каждый лист получает уникальный рисунок из белых секторов, мраморных пятен и мелкого крапа.',
            'В белой ткани нет хлорофилла, поэтому для сильного роста растению необходимо достаточно зелёной площади.',
            'Вертикальная опора помогает листьям становиться крупнее по мере взросления растения.',
            'Воздушные корни появляются в узлах побега и могут закрепляться на моховой опоре.',
          ],
        ],
        [
          'Philodendron tissue contains insoluble calcium oxalate crystals. The sap can irritate skin and eyes, and chewing causes painful mouth irritation. Wear gloves when pruning, wash tools and keep the plant out of reach of children and pets.',
          'Ткани филодендрона содержат нерастворимые кристаллы оксалата кальция. Сок раздражает кожу и глаза, а при разжёвывании вызывает болезненное жжение во рту. Работайте в перчатках, мойте инструменты и держите растение вдали от детей и животных.',
        ],
        [
          [
            'Brown marks on white sectors — protect from harsh sun and check for dry air or irregular watering.',
            'Several fully green leaves in succession — improve light and consider cutting back to the last clearly variegated node.',
            'Soft yellow leaves with wet mix — let the substrate dry and inspect the roots for rot.',
            'Silvery scratches or distorted new leaves — inspect closely for thrips and spider mites.',
          ],
          [
            'Коричневые пятна на белых участках — защитите от жёсткого солнца и проверьте сухость воздуха и регулярность полива.',
            'Несколько полностью зелёных листьев подряд — добавьте света и при необходимости обрежьте побег до последнего явно вариегатного узла.',
            'Мягкие жёлтые листья при мокром грунте — просушите субстрат и проверьте корни на гниль.',
            'Серебристые потёртости или деформированные новые листья — внимательно проверьте растение на трипса и паутинного клеща.',
          ],
        ],
        [
          'Cut a stem section with at least one healthy node and preferably an aerial root; a leaf without a node cannot produce a new plant. Let the cut dry briefly, then root it in lightly moist sphagnum, water or a fine airy aroid mix in warmth and bright diffused light.',
          'Срежьте часть стебля как минимум с одним здоровым узлом и желательно с воздушным корнем: отдельный лист без узла не даст новое растение. Немного подсушите срез, затем укореняйте в слегка влажном сфагнуме, воде или мелком воздушном ароидном субстрате в тепле и при ярком рассеянном свете.',
        ],
      ),
      "Philodendron 'White Wizard'",
      [
        'The most fascinating part of this young White Wizard is that no two leaves repeat one another: one carries fine pale flecks, another a broad white sector, and the next reveals its pattern only as it slowly unfurls.',
        'Самое интересное в этом молодом White Wizard — ни один лист не повторяет другой: на одном рассыпаны светлые штрихи, на другом появляется крупный белый сектор, а следующий показывает свой рисунок только во время медленного раскрытия.',
      ],
      [
        "Philodendron 'White Wizard' is a climbing aroid prized for glossy oval leaves patterned in deep green and creamy white. Its sectoral variegation is naturally unpredictable, so each new leaf becomes a small surprise.",
        "Филодендрон 'White Wizard' — лазающий ароид с глянцевыми овальными листьями, расписанными тёмно-зелёным и кремово-белым. Секторальная вариегатность проявляется непредсказуемо, поэтому каждый новый лист становится маленьким сюрпризом.",
      ],
      quickFacts(
        ['Moderate', 'Умеренный'],
        ['Usually 60–150 cm with support', 'Обычно 60–150 см с опорой'],
      ),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use a chunky aroid mix: about 40% fine orchid bark, 30% coco coir or light houseplant compost, 20% perlite or pumice and 10% horticultural charcoal.',
            'Используйте крупный ароидный субстрат: примерно 40% мелкой коры для орхидей, 30% кокосового волокна или лёгкого грунта для комнатных растений, 20% перлита или пемзы и 10% древесного угля.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Repot in spring every 2–3 years or when roots densely fill the pot. Choose a container only 2–3 cm wider and keep the stem base at its previous level.',
            'Пересаживайте весной раз в 2–3 года или когда корни плотно заполнят горшок. Выбирайте ёмкость шире всего на 2–3 см и сохраняйте прежний уровень посадки стебля.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'From spring to early autumn, feed every 3–4 weeks with a balanced foliage fertiliser at half strength. Do not fertilise dry soil or a stressed plant.',
            'С весны до начала осени подкармливайте раз в 3–4 недели половинной дозой сбалансированного удобрения для декоративно-лиственных. Не вносите удобрение в сухой грунт или ослабленному растению.',
          ],
        ],
        [
          ['Support and pruning', 'Опора и обрезка'],
          [
            'Guide the stem onto a moss pole or slim support and secure it loosely below a node. Remove damaged leaves with a sterile tool; prune reverted growth only after confirming several new leaves are fully green.',
            'Направляйте стебель по моховой или тонкой опоре и свободно фиксируйте ниже узла. Повреждённые листья удаляйте стерильным инструментом; обрезайте реверсировавший побег только после того, как несколько новых листьев действительно вышли полностью зелёными.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/white-wizard-important.webp',
        propagationImage: '/plant-profile/white-wizard-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'alocasia-baginda-dragon-scale',
    '/plants/alocasia-baginda-dragon-scale-home-photo.webp',
    ["Alocasia 'Dragon Scale'", "Алоказия 'Чешуя дракона'"],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Give bright diffused light with a little gentle morning or evening sun. Harsh midday rays can scorch the thick leaves, while a dark position slows growth and produces weaker petioles.',
            'Обеспечьте яркий рассеянный свет и немного мягкого утреннего или вечернего солнца. Жёсткие полуденные лучи могут обжечь плотные листья, а в тёмном месте рост замедляется и черешки становятся слабее.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Water after the upper 3–4 cm of the mix dries. Moisten the small root ball evenly, drain all excess and let the airy substrate partially dry again; a constantly wet corm rots easily.',
            'Поливайте после просыхания верхних 3–4 см грунта. Равномерно промочите небольшой корневой ком, полностью слейте лишнюю воду и снова дайте воздушному субстрату частично подсохнуть: постоянно мокрый клубень легко загнивает.',
          ],
        ],
        [
          ['Humidity', 'Влажность'],
          [
            'A stable 60–75% humidity supports smooth new growth, but good air movement is essential. Avoid leaving water sitting on the deeply textured leaf surface or inside a new rolled leaf.',
            'Стабильная влажность 60–75% помогает новым листьям раскрываться ровно, но при этом необходимо движение воздуха. Не оставляйте воду на глубоко фактурной поверхности или внутри нового свёрнутого листа.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Keep at 20–28 °C and protect from cold glass, draughts and temperatures below about 17 °C. In cool low-light conditions growth may pause, so reduce watering rather than forcing it.',
            'Содержите при 20–28 °C и берегите от холодного стекла, сквозняков и температуры ниже примерно 17 °C. В прохладе и при слабом свете рост может остановиться — тогда сократите полив, а не пытайтесь стимулировать растение.',
          ],
        ],
      ),
      3,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Arum family (Araceae)', 'Ароидные (Araceae)'],
        ],
        [
          ['Origin', 'Происхождение'],
          ['Cultivar of a species native to Borneo', 'Сорт вида, происходящего с острова Борнео'],
        ],
        [
          ['Plant type', 'Тип растения'],
          ['Compact evergreen rhizomatous aroid', 'Компактный вечнозелёный корневищный ароид'],
        ],
      ),
      profileFooter(
        [
          [
            'Thick bullate leaf tissue forms raised silvery panels that resemble overlapping dragon scales.',
            'Deeply impressed charcoal-green veins create the sculptural pattern without variegation.',
            'The species remains naturally compact, with only a few spreading leaves held at one time.',
            'Small cormels can develop around the main corm and remain dormant until warmth and moisture trigger growth.',
          ],
          [
            'Плотная пузырчатая ткань образует серебристые выпуклые участки, похожие на перекрывающиеся чешуйки дракона.',
            'Глубоко утопленные угольно-зелёные жилки создают скульптурный рисунок без вариегатности.',
            'Вид от природы остаётся компактным и одновременно держит лишь несколько раскидистых листьев.',
            'Вокруг основного клубня могут образовываться маленькие клубеньки, которые остаются спящими до появления тепла и влаги.',
          ],
        ],
        [
          'Alocasia tissue contains insoluble calcium oxalate crystals. Sap can irritate skin and eyes, and chewing causes painful mouth irritation. Wear gloves when dividing or pruning, clean tools afterwards and keep the plant out of reach of children and pets.',
          'Ткани алоказии содержат нерастворимые кристаллы оксалата кальция. Сок раздражает кожу и глаза, а при разжёвывании вызывает болезненное жжение во рту. Работайте в перчатках при делении и обрезке, мойте инструменты и держите растение вдали от детей и животных.',
        ],
        [
          [
            'Soft yellow leaves with wet substrate — let the mix dry and inspect the corm and roots for rot.',
            'Dry brown tips — check dry air, irregular watering, hard water and excess fertiliser salts.',
            'Fine pale stippling or webbing — isolate the plant and inspect both leaf surfaces for spider mites.',
            'One old leaf fading as a new one opens can be normal; several collapsing leaves point to cold, low light or root stress.',
          ],
          [
            'Мягкие жёлтые листья при мокром грунте — просушите субстрат и проверьте клубень и корни на гниль.',
            'Сухие коричневые кончики — проверьте сухость воздуха, регулярность полива, жёсткость воды и избыток солей удобрения.',
            'Мелкий светлый крап или паутинка — изолируйте растение и проверьте обе стороны листьев на паутинного клеща.',
            'Отмирание одного старого листа при раскрытии нового может быть нормальным; массовое увядание указывает на холод, нехватку света или проблемы с корнями.',
          ],
        ],
        [
          'During repotting, separate a basal offset with its own roots or collect firm cormels from around the main corm. Sprout cormels in lightly moist sphagnum or perlite in warmth and high humidity, keeping the growing point above the medium. A detached leaf cannot produce a new plant.',
          'При пересадке отделите дочернюю розетку с собственными корнями или соберите плотные клубеньки вокруг основного клубня. Проращивайте их в слегка влажном сфагнуме или перлите в тепле и высокой влажности, оставляя точку роста над субстратом. Отдельный лист не даст новое растение.',
        ],
      ),
      "Alocasia baginda 'Dragon Scale'",
      [
        "The two broad leaves on this young 'Dragon Scale' already show the cultivar's defining relief: pale metallic panels rise between dark recessed veins, so the surface changes character with every shift of light.",
        "Два широких листа этой молодой 'Чешуи дракона' уже показывают главный признак сорта: светлые металлические участки возвышаются между тёмными утопленными жилками, поэтому рельеф меняется при каждом повороте света.",
      ],
      [
        "Alocasia baginda 'Dragon Scale' is a compact Bornean aroid cultivar valued for unusually thick, matte silver-green leaves divided by deeply impressed dark veins. Its strongly bullate surface resembles armour or reptile scales more than ordinary foliage.",
        "Алоказия багинда 'Чешуя дракона' — компактный борнейский ароидный сорт с необычно плотными матовыми серебристо-зелёными листьями, разделёнными глубоко утопленными тёмными жилками. Их выпуклая поверхность больше напоминает доспех или чешую рептилии, чем обычную листву.",
      ],
      quickFacts(
        ['Slow to moderate', 'Медленный или умеренный'],
        ['Usually 25–40 cm indoors', 'Обычно 25–40 см в помещении'],
      ),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use a loose tropical aroid mix: about 40% fine orchid bark or coco chips, 30% coco coir or light houseplant compost, 20% perlite or pumice and 10% horticultural charcoal.',
            'Используйте рыхлый тропический ароидный субстрат: примерно 40% мелкой коры для орхидей или кокосовых чипсов, 30% кокосового волокна или лёгкого грунта, 20% перлита или пемзы и 10% древесного угля.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Repot in spring every 2–3 years or when roots closely fill the small container. Choose a pot only 2–3 cm wider, keep the main corm at its previous depth and avoid burying the crown.',
            'Пересаживайте весной раз в 2–3 года или когда корни плотно заполнят небольшую ёмкость. Выбирайте горшок шире всего на 2–3 см, сохраняйте прежнюю глубину основного клубня и не заглубляйте основание розетки.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'From spring to early autumn, feed every 3–4 weeks with a balanced foliage fertiliser at half strength. Stop or greatly reduce feeding whenever growth pauses.',
            'С весны до начала осени подкармливайте раз в 3–4 недели половинной дозой сбалансированного удобрения для декоративно-лиственных. Прекратите или сильно сократите подкормки при остановке роста.',
          ],
        ],
        [
          ['Grooming', 'Уход за листьями'],
          [
            'Support each thick leaf from below while wiping it gently with a damp soft cloth. Inspect the recessed veins and leaf undersides for mites, remove only fully yellow foliage and never use leaf shine.',
            'Поддерживайте каждый плотный лист снизу и осторожно протирайте мягкой влажной салфеткой. Проверяйте углублённые жилки и нижнюю сторону на клеща, удаляйте только полностью пожелтевшую листву и не используйте полироли.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/alocasia-dragon-scale-important.webp',
        propagationImage: '/plant-profile/alocasia-dragon-scale-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'alocasia-amazonica-bambino',
    '/plants/alocasia-amazonica-bambino-home-photo.webp',
    ["Alocasia 'Bambino'", "Алоказия 'Бамбино'"],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Give bright diffused light with protection from harsh midday sun. A little gentle morning or evening sun keeps the compact rosette sturdy and the silver veins distinct.',
            'Обеспечьте яркий рассеянный свет с защитой от жёсткого полуденного солнца. Немного мягкого утреннего или вечернего света помогает компактной розетке оставаться крепкой, а серебристым жилкам — выразительными.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Water after the upper 3–4 cm of the mix dries. Soak the root ball evenly, drain all excess and never leave the compact rhizome in permanently wet substrate.',
            'Поливайте после просыхания верхних 3–4 см субстрата. Равномерно промочите корневой ком, слейте всю лишнюю воду и не оставляйте компактное корневище в постоянно мокром грунте.',
          ],
        ],
        [
          ['Humidity', 'Влажность'],
          [
            'Aim for a stable 55–70% humidity with gentle air movement. Dry air may curl the narrow leaf edges, but stagnant humid conditions increase the risk of leaf spots and rot.',
            'Поддерживайте стабильную влажность 55–70% и лёгкое движение воздуха. В сухом воздухе края узких листьев могут скручиваться, а застойная сырость повышает риск пятнистостей и гнили.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Keep at 19–28 °C and away from cold glass, draughts and air-conditioner flow. When light and temperature fall in winter, growth may pause, so reduce watering.',
            'Содержите при 19–28 °C вдали от холодного стекла, сквозняков и потока кондиционера. Зимой при снижении света и температуры рост может остановиться — тогда сократите полив.',
          ],
        ],
      ),
      3,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Arum family (Araceae)', 'Ароидные (Araceae)'],
        ],
        [
          ['Origin', 'Происхождение'],
          ['Compact cultivated hybrid', 'Компактный культурный гибрид'],
        ],
        [
          ['Plant type', 'Тип растения'],
          ['Evergreen rhizomatous perennial', 'Вечнозелёный корневищный многолетник'],
        ],
      ),
      profileFooter(
        [
          [
            'Narrow arrow-shaped leaves distinguish Bambino from broader Alocasia × amazonica forms.',
            'Silvery-white veins contrast sharply with the glossy deep-green blade, while the reverse can carry a purple tone.',
            'Its short internodes and restrained height make it suitable for a windowsill or compact plant shelf.',
            'The underground rhizome may form small cormels that can grow into separate plants.',
          ],
          [
            'Узкие стреловидные листья отличают Бамбино от более широколистных форм Alocasia × amazonica.',
            'Серебристо-белые жилки резко контрастируют с глянцевой тёмно-зелёной пластиной, а изнанка может иметь фиолетовый оттенок.',
            'Короткие междоузлия и сдержанная высота позволяют разместить растение на подоконнике или компактной полке.',
            'Подземное корневище способно образовывать маленькие клубеньки, из которых развиваются самостоятельные растения.',
          ],
        ],
        [
          'All parts contain irritating calcium oxalate crystals. Wear gloves when dividing or pruning, avoid contact between sap and eyes or mouth, clean tools afterwards and keep the plant away from children and pets.',
          'Все части содержат раздражающие кристаллы оксалата кальция. При делении и обрезке надевайте перчатки, не допускайте попадания сока в глаза и рот, мойте инструменты и держите растение вдали от детей и животных.',
        ],
        [
          [
            'Yellow soft leaves with wet soil — reduce watering and inspect the rhizome and roots for rot.',
            'Curled dry margins — check humidity, irregular watering, hot sun and fertiliser salts.',
            'Fine pale stippling or webbing — isolate the plant and inspect for spider mites.',
            'Long weak petioles and small leaves — move gradually to brighter diffused light.',
          ],
          [
            'Мягкие жёлтые листья при мокром грунте — сократите полив и проверьте корневище и корни на гниль.',
            'Скрученные сухие края — проверьте влажность воздуха, регулярность полива, жаркое солнце и избыток солей.',
            'Мелкий светлый крап или паутинка — изолируйте растение и проверьте его на паутинного клеща.',
            'Длинные слабые черешки и мелкие листья — постепенно переставьте растение на более яркий рассеянный свет.',
          ],
        ],
        [
          'During a warm-season repot, separate a basal offset that already has roots or collect firm cormels around the main rhizome. Sprout cormels in lightly moist sphagnum or perlite in warmth, keeping the growing point above the medium. A detached leaf does not reproduce this plant.',
          'При пересадке в тёплый сезон отделите прикорневую детку с собственными корнями или соберите плотные клубеньки вокруг основного корневища. Проращивайте их в слегка влажном сфагнуме или перлите в тепле, оставляя точку роста над субстратом. Отдельным листом это растение не размножается.',
        ],
      ),
      "Alocasia × amazonica 'Bambino'",
      [
        'This young Bambino already holds three neat arrow-shaped leaves. Their narrow silhouette and pale geometric veins make the compact plant look precise and graphic even before it gains a fuller rosette.',
        'У этой молодой Бамбино уже три аккуратных стреловидных листа. Узкий силуэт и светлый геометричный рисунок жилок делают компактное растение выразительным ещё до формирования пышной розетки.',
      ],
      [
        "Alocasia × amazonica 'Bambino' is a compact selection with narrow glossy leaves, contrasting silvery veins and often purple-toned undersides. It keeps the dramatic pattern of larger Amazonica hybrids while occupying much less space.",
        "Алоказия × амазоника 'Бамбино' — компактная форма с узкими глянцевыми листьями, контрастными серебристыми жилками и нередко фиолетовой изнанкой. Она сохраняет эффектный рисунок крупных гибридов Amazonica, но занимает значительно меньше места.",
      ],
      quickFacts(
        ['Moderate', 'Умеренный'],
        ['Usually 30–45 cm indoors', 'Обычно 30–45 см в помещении'],
      ),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use a loose aroid mix: about 40% fine orchid bark or coco chips, 30% coco coir or light houseplant compost, 20% perlite or pumice and 10% horticultural charcoal.',
            'Используйте рыхлый ароидный субстрат: примерно 40% мелкой коры или кокосовых чипсов, 30% кокосового волокна или лёгкого грунта, 20% перлита или пемзы и 10% древесного угля.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Repot in spring every 1–2 years or when roots closely fill the pot. Choose a container only 2–3 cm wider and keep the rhizome at its previous depth.',
            'Пересаживайте весной раз в 1–2 года или когда корни плотно заполнят горшок. Выбирайте ёмкость шире всего на 2–3 см и сохраняйте прежнюю глубину корневища.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'From spring to early autumn, feed every 3–4 weeks with a balanced foliage fertiliser at half strength. Pause feeding when active growth stops.',
            'С весны до начала осени подкармливайте раз в 3–4 недели половинной дозой сбалансированного удобрения для декоративно-лиственных. При остановке активного роста подкормки прекратите.',
          ],
        ],
        [
          ['Rotation and grooming', 'Поворот и уход'],
          [
            'Rotate the pot a quarter-turn every week or two for an even rosette. Support each narrow blade while wiping it gently and remove only leaves that have fully yellowed.',
            'Раз в одну-две недели поворачивайте горшок на четверть оборота для ровной розетки. Поддерживайте узкий лист при осторожном протирании и удаляйте только полностью пожелтевшие листья.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/alocasia-bambino-important.webp',
        propagationImage: '/plant-profile/alocasia-bambino-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'alocasia-black-velvet',
    '/plants/alocasia-black-velvet-home-photo.webp',
    ["Alocasia 'Black Velvet'", "Алоказия 'Блэк Вельвет'"],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Place in bright diffused light without direct midday sun. The dark leaves absorb light efficiently, but a position that is too dim slows the already measured growth and weakens new foliage.',
            'Разместите на ярком рассеянном свету без прямого полуденного солнца. Тёмные листья эффективно поглощают свет, но слишком тёмное место замедляет и без того неспешный рост и ослабляет новую листву.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Let the upper 4–5 cm of the substrate dry before watering. Moisten thoroughly, drain at once and avoid a large pot: the compact rhizome and fleshy roots are sensitive to prolonged wetness.',
            'Перед поливом дайте просохнуть верхним 4–5 см субстрата. Поливайте обильно, сразу сливайте лишнюю воду и избегайте слишком большого горшка: компактное корневище и мясистые корни чувствительны к длительной сырости.',
          ],
        ],
        [
          ['Humidity', 'Влажность'],
          [
            'Keep around 60–75% humidity with steady air circulation. Do not mist the velvety blades heavily or leave droplets sitting on them, as marks and fungal spots can develop.',
            'Поддерживайте влажность около 60–75% при постоянном движении воздуха. Не опрыскивайте бархатистые пластины обильно и не оставляйте на них капли — это может вызвать пятна и грибковые поражения.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Maintain 19–27 °C and protect from temperatures below 16 °C, cold windowsills and draughts. Reduce watering markedly if growth slows in winter.',
            'Поддерживайте 19–27 °C и берегите растение от температуры ниже 16 °C, холодного подоконника и сквозняков. Если зимой рост замедляется, заметно сократите полив.',
          ],
        ],
      ),
      3,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Arum family (Araceae)', 'Ароидные (Araceae)'],
        ],
        [
          ['Origin', 'Происхождение'],
          [
            'Tropical Asian cultivated selection',
            'Культурная форма тропического азиатского происхождения',
          ],
        ],
        [
          ['Plant type', 'Тип растения'],
          ['Compact evergreen rhizomatous aroid', 'Компактный вечнозелёный корневищный ароид'],
        ],
      ),
      profileFooter(
        [
          [
            'The almost black leaf surface is covered with minute hairs that create its velvet appearance.',
            'Pale silver veins look especially bright against the matte rounded blade.',
            'Black Velvet grows slowly and remains compact, usually holding a small architectural rosette.',
            'A mature rhizome may form offsets or cormels below the substrate.',
          ],
          [
            'Почти чёрная поверхность листа покрыта мельчайшими волосками, создающими бархатистый эффект.',
            'Светлые серебристые жилки кажутся особенно яркими на фоне матовой округлой пластины.',
            'Блэк Вельвет растёт медленно и остаётся компактной, формируя небольшую архитектурную розетку.',
            'Зрелое корневище может образовывать под субстратом детки и клубеньки.',
          ],
        ],
        [
          'The sap and all plant tissues contain irritating calcium oxalate crystals. Use gloves for division and pruning, wash hands and tools afterwards, and keep the plant out of reach of children and pets.',
          'Сок и все ткани растения содержат раздражающие кристаллы оксалата кальция. При делении и обрезке используйте перчатки, после работы мойте руки и инструменты и держите растение вдали от детей и животных.',
        ],
        [
          [
            'Soft yellow leaves and a sour-smelling mix — inspect roots and rhizome immediately for rot.',
            'Round brown or translucent marks — keep the foliage dry and improve air circulation.',
            'Faded stippling or fine webbing — inspect the velvet surface and leaf undersides for spider mites.',
            'Crisp margins — check dry air, irregular watering, hard water and accumulated fertiliser salts.',
          ],
          [
            'Мягкие жёлтые листья и кислый запах грунта — немедленно проверьте корни и корневище на гниль.',
            'Округлые коричневые или полупрозрачные пятна — держите листву сухой и улучшите движение воздуха.',
            'Обесцвеченный крап или тонкая паутинка — проверьте бархатистую поверхность и изнанку на паутинного клеща.',
            'Хрустящие края — проверьте сухость воздуха, нерегулярный полив, жёсткую воду и накопление солей.',
          ],
        ],
        [
          'Separate rooted offsets or firm cormels during a spring or summer repot. Place cormels in barely moist sphagnum or perlite, keep them warm and humid, and ventilate regularly. Do not propagate from a detached leaf.',
          'Во время весенней или летней пересадки отделите укоренённые детки или плотные клубеньки. Поместите клубеньки в едва влажный сфагнум или перлит, содержите в тепле и высокой влажности и регулярно проветривайте. Отдельным листом растение не размножается.',
        ],
      ),
      "Alocasia 'Black Velvet'",
      [
        'The two young leaves already show why this Alocasia is called Black Velvet: the rounded dark blades absorb the light, while the pale veins appear almost drawn across their soft surface.',
        'Два молодых листа уже объясняют название Блэк Вельвет: округлые тёмные пластины поглощают свет, а светлые жилки выглядят почти нарисованными на мягкой поверхности.',
      ],
      [
        "Alocasia 'Black Velvet' is a slow-growing compact aroid valued for rounded, nearly black leaves with a soft matte texture and contrasting silver veins. Its restrained size and dramatic foliage make even a young specimen look complete.",
        "Алоказия 'Блэк Вельвет' — медленно растущий компактный ароид с округлыми почти чёрными листьями, мягкой матовой фактурой и контрастными серебристыми жилками. Благодаря сдержанному размеру и эффектной листве даже молодое растение выглядит завершённым.",
      ],
      quickFacts(
        ['Slow', 'Медленный'],
        ['Usually 25–45 cm indoors', 'Обычно 25–45 см в помещении'],
      ),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use a very airy mix: about 35% fine orchid bark, 30% coco coir or light compost, 25% perlite or pumice and 10% horticultural charcoal.',
            'Используйте очень воздушный субстрат: примерно 35% мелкой коры, 30% кокосового волокна или лёгкого грунта, 25% перлита или пемзы и 10% древесного угля.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Repot only when roots fill the container, usually every 2–3 years. Move up by no more than 2 cm and leave the crown and upper rhizome at their former level.',
            'Пересаживайте только после заполнения ёмкости корнями, обычно раз в 2–3 года. Увеличивайте диаметр не более чем на 2 см и сохраняйте прежний уровень основания розетки и верхней части корневища.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'Feed every 4 weeks from spring to early autumn with half-strength balanced foliage fertiliser. Flush the substrate occasionally and do not feed a dormant or stressed plant.',
            'С весны до начала осени подкармливайте раз в 4 недели половинной дозой сбалансированного удобрения. Периодически промывайте субстрат и не удобряйте спящее или ослабленное растение.',
          ],
        ],
        [
          ['Velvet leaf care', 'Уход за бархатными листьями'],
          [
            'Remove dust with a very soft dry brush or a gentle stream of air. Avoid rubbing, leaf-shine products and frequent spraying, which can flatten the fine surface hairs or leave marks.',
            'Удаляйте пыль очень мягкой сухой кистью или слабым потоком воздуха. Не трите листья, не используйте полироли и не опрыскивайте часто: это приминает мелкие волоски или оставляет пятна.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/alocasia-black-velvet-important.webp',
        propagationImage: '/plant-profile/alocasia-black-velvet-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'alocasia-tandurusa-jacklyn',
    '/plants/alocasia-tandurusa-jacklyn-home-photo.webp',
    ["Alocasia 'Jacklyn'", "Алоказия 'Жаклин'"],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Provide bright diffused light and a little gentle morning sun. Strong midday rays can bleach the raised texture, while low light produces smaller, less deeply divided leaves and elongated petioles.',
            'Обеспечьте яркий рассеянный свет и немного мягкого утреннего солнца. Жёсткие полуденные лучи могут высветлить рельеф, а при нехватке света листья становятся мельче и слабее рассечёнными, черешки вытягиваются.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Water after the upper 3–5 cm of the airy mix dries. Wet the root ball evenly, drain excess completely and reduce the frequency whenever cool or low-light conditions slow growth.',
            'Поливайте после просыхания верхних 3–5 см воздушного субстрата. Равномерно промочите корневой ком, полностью слейте лишнюю воду и сократите частоту полива, если прохлада или слабый свет замедляют рост.',
          ],
        ],
        [
          ['Humidity', 'Влажность'],
          [
            'Maintain about 60–75% humidity with regular ventilation. The textured leaves appreciate stable moisture in the air, but standing droplets and stagnant conditions invite spotting.',
            'Поддерживайте влажность около 60–75% при регулярном проветривании. Фактурным листьям полезна стабильная влажность воздуха, но застоявшиеся капли и неподвижный воздух провоцируют пятнистости.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Keep at 20–28 °C and protect from temperatures below about 17 °C, cold glass and draughts. Warm roots and stable conditions are especially important while a new leaf is unfurling.',
            'Содержите при 20–28 °C и берегите от температуры ниже примерно 17 °C, холодного стекла и сквозняков. Тёплые корни и стабильные условия особенно важны во время раскрытия нового листа.',
          ],
        ],
      ),
      3,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Arum family (Araceae)', 'Ароидные (Araceae)'],
        ],
        [
          ['Origin', 'Происхождение'],
          ['Sulawesi, Indonesia', 'Сулавеси, Индонезия'],
        ],
        [
          ['Plant type', 'Тип растения'],
          ['Evergreen tropical rhizomatous aroid', 'Вечнозелёный тропический корневищный ароид'],
        ],
      ),
      profileFooter(
        [
          [
            'Deep rounded lobes give the blade an unmistakable antler-like outline.',
            'The leathery green surface is strongly textured and divided by dark sunken veins.',
            'Mottled or striped petioles add a second ornamental pattern beneath the foliage.',
            'The plant long circulated as Jacklyn before the species was formally described as Alocasia tandurusa in 2023.',
          ],
          [
            'Глубокие округлые лопасти придают пластине узнаваемый силуэт, напоминающий рога.',
            'Кожистая зелёная поверхность сильно фактурная и разделена тёмными утопленными жилками.',
            'Пятнистые или полосатые черешки добавляют второй декоративный рисунок под листвой.',
            'Растение долго продавалось под именем Жаклин, прежде чем в 2023 году вид был официально описан как Alocasia tandurusa.',
          ],
        ],
        [
          'Like other Alocasia, Jacklyn contains calcium oxalate crystals that irritate skin, eyes and the mouth. Wear gloves for repotting and pruning, clean tools afterwards and keep it away from children and pets.',
          'Как и другие алоказии, Жаклин содержит кристаллы оксалата кальция, раздражающие кожу, глаза и слизистые. При пересадке и обрезке надевайте перчатки, мойте инструменты и держите растение вдали от детей и животных.',
        ],
        [
          [
            'Several yellowing leaves with wet substrate — check the roots and rhizome for rot.',
            'Dry brown tips or a new leaf stuck while unfurling — stabilise watering and humidity.',
            'Pale stippling, dull colour or webbing — inspect the textured surface and undersides for spider mites.',
            'Small weakly lobed leaves — increase diffused light gradually and review feeding during active growth.',
          ],
          [
            'Несколько желтеющих листьев при мокром субстрате — проверьте корни и корневище на гниль.',
            'Сухие коричневые кончики или застрявший при раскрытии лист — стабилизируйте полив и влажность.',
            'Светлый крап, тусклый цвет или паутинка — проверьте фактурную поверхность и изнанку на паутинного клеща.',
            'Мелкие слабо рассечённые листья — постепенно увеличьте количество рассеянного света и проверьте режим подкормок в период роста.',
          ],
        ],
        [
          'At a warm-season repot, separate an offset with its own roots or collect firm cormels around the main rhizome. Sprout cormels in lightly moist sphagnum or perlite under warm, humid conditions with ventilation. A leaf without a piece of rhizome cannot form a new plant.',
          'При пересадке в тёплый сезон отделите детку с собственными корнями или соберите плотные клубеньки вокруг основного корневища. Проращивайте их в слегка влажном сфагнуме или перлите в тепле и высокой влажности с проветриванием. Лист без части корневища не образует новое растение.',
        ],
      ),
      "Alocasia tandurusa 'Jacklyn'",
      [
        "Even this very young Jacklyn already carries the plant's signature: the first elongated leaf is deeply divided, heavily textured and traced by a dark central vein. As the rhizome strengthens, the new blades should become larger and even more sculptural.",
        'Даже у совсем молодой Жаклин уже заметен главный признак растения: первый вытянутый лист глубоко рассечён, сильно фактурен и подчёркнут тёмной центральной жилкой. По мере укрепления корневища новые пластины должны становиться крупнее и ещё скульптурнее.',
      ],
      [
        "Alocasia tandurusa, widely known in cultivation as 'Jacklyn', is a Sulawesi aroid with deeply lobed, rugged green leaves and strikingly patterned petioles. Its unusual silhouette becomes increasingly dramatic as each successive leaf matures.",
        "Алоказия тандуруса, широко известная в культуре как 'Жаклин', — ароид с острова Сулавеси с глубоко рассечёнными рельефными зелёными листьями и выразительно окрашенными черешками. Её необычный силуэт становится всё эффектнее с каждым взрослым листом.",
      ],
      quickFacts(
        ['Moderate', 'Умеренный'],
        ['Usually 60–120 cm indoors', 'Обычно 60–120 см в помещении'],
      ),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use a chunky tropical aroid mix: about 40% fine orchid bark or coco chips, 30% coco coir or light compost, 20% perlite or pumice and 10% horticultural charcoal.',
            'Используйте крупный тропический ароидный субстрат: примерно 40% мелкой коры или кокосовых чипсов, 30% кокосового волокна или лёгкого грунта, 20% перлита или пемзы и 10% древесного угля.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Repot in spring every 1–2 years or when roots fill the pot. Increase the diameter by only 2–4 cm, keep the rhizome at its original level and use a stable container as the leaves enlarge.',
            'Пересаживайте весной раз в 1–2 года или когда корни заполнят горшок. Увеличивайте диаметр только на 2–4 см, сохраняйте прежний уровень корневища и по мере роста листьев выбирайте устойчивую ёмкость.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'During active growth, feed every 3–4 weeks with a balanced foliage fertiliser at half strength. Stop feeding when growth pauses and occasionally flush the substrate with soft water.',
            'В период активного роста подкармливайте раз в 3–4 недели половинной дозой сбалансированного удобрения. При остановке роста прекратите подкормки и периодически промывайте субстрат мягкой водой.',
          ],
        ],
        [
          ['Leaf care', 'Уход за листьями'],
          [
            'Support the blade from below and clean between the raised veins with a soft damp cloth. Do not polish the textured surface; inspect the lobes and petiole bases regularly for pests.',
            'Поддерживайте пластину снизу и очищайте пространство между выпуклыми жилками мягкой влажной салфеткой. Не полируйте фактурную поверхность; регулярно проверяйте лопасти и основания черешков на вредителей.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/alocasia-jacklyn-important.webp',
        propagationImage: '/plant-profile/alocasia-jacklyn-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'spathiphyllum-wallisii',
    '/plants/spathiphyllum-wallisii-home-photo.webp',
    ['Peace lily', 'Спатифиллум Уоллиса'],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Give bright diffused light without direct summer sun. The plant tolerates a dimmer position, but growth slows and flowering may become sparse; harsh rays can scorch the broad leaves.',
            'Обеспечьте яркий рассеянный свет без прямого летнего солнца. Растение переносит более тёмное место, но растёт медленнее и может цвести слабее; жёсткие лучи обжигают широкие листья.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Water when the upper 2–3 cm of the mix dries. Moisten the root ball evenly with room-temperature soft or filtered water, drain all excess and never leave the pot standing in water.',
            'Поливайте после просыхания верхних 2–3 см грунта. Равномерно промочите корневой ком мягкой или фильтрованной водой комнатной температуры, полностью слейте излишки и не оставляйте горшок в воде.',
          ],
        ],
        [
          ['Humidity', 'Влажность'],
          [
            'Moderate room humidity of about 45–65% is usually enough. Keep the plant away from hot radiators, provide gentle air movement and wipe the broad leaves regularly.',
            'Обычно достаточно умеренной комнатной влажности около 45–65%. Держите растение подальше от горячих батарей, обеспечьте лёгкое движение воздуха и регулярно протирайте широкие листья.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Keep at 18–27 °C and protect from cold glass, draughts and temperatures below about 15 °C. Chilling and cold wet substrate can damage both leaves and roots.',
            'Содержите при 18–27 °C и берегите от холодного стекла, сквозняков и температуры ниже примерно 15 °C. Переохлаждение и холодный мокрый грунт повреждают листья и корни.',
          ],
        ],
      ),
      1,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Arum family (Araceae)', 'Ароидные (Araceae)'],
        ],
        [
          ['Origin', 'Происхождение'],
          [
            'Horticultural form of a Colombia–Venezuela species',
            'Садовая форма вида из Колумбии и Венесуэлы',
          ],
        ],
        [
          ['Plant type', 'Тип растения'],
          [
            'Evergreen clump-forming rhizomatous perennial',
            'Вечнозелёный кустящийся корневищный многолетник',
          ],
        ],
      ),
      profileFooter(
        [
          [
            'The white sail is a modified leaf called a spathe, not a flower petal.',
            'Tiny true flowers are packed along the cream or greenish central spadix.',
            'White spathes naturally become pale green as they age and may remain decorative for weeks.',
            'Despite its common name, the peace lily is an aroid and not a true lily.',
          ],
          [
            'Белый «парус» — это видоизменённый лист-покрывало, а не лепесток цветка.',
            'Мелкие настоящие цветки плотно расположены вдоль кремового или зеленоватого початка.',
            'Белые покрывала естественно становятся светло-зелёными по мере старения и могут сохранять декоративность ещё несколько недель.',
            'Несмотря на английское название peace lily, спатифиллум относится к ароидным и не является настоящей лилией.',
          ],
        ],
        [
          'Peace lily tissue contains insoluble calcium oxalate crystals. Sap can irritate skin and eyes, and chewing causes painful mouth irritation. Wear gloves when dividing or pruning, clean tools afterwards and keep the plant out of reach of children and pets.',
          'Ткани спатифиллума содержат нерастворимые кристаллы оксалата кальция. Сок раздражает кожу и глаза, а при разжёвывании вызывает болезненное жжение во рту. Работайте в перчатках при делении и обрезке, мойте инструменты и держите растение вдали от детей и животных.',
        ],
        [
          [
            'Soft yellow leaves with wet substrate — let the mix dry and inspect the roots for rot.',
            'Brown leaf tips — check dry air, hard water, irregular watering and excess fertiliser salts.',
            'Repeated dramatic wilting — water more consistently and check whether the root ball has become hydrophobic or overcrowded.',
            'Healthy leaves but no spathes — provide brighter diffused light and allow a young division time to mature.',
          ],
          [
            'Мягкие жёлтые листья при мокром грунте — просушите субстрат и проверьте корни на гниль.',
            'Коричневые кончики — проверьте сухость воздуха, жёсткость воды, регулярность полива и избыток солей удобрения.',
            'Регулярное сильное увядание — поливайте стабильнее и проверьте, не перестал ли корневой ком впитывать воду и не стал ли горшок тесным.',
            'Здоровая листва без покрывал — добавьте яркого рассеянного света и дайте молодой делёнке время повзрослеть.',
          ],
        ],
        [
          'Divide a mature clump after flowering or during active growth. Separate only a side crown with several leaves and its own healthy roots, then pot it into a small container with airy moist substrate and keep it warm in bright diffused light while it establishes.',
          'Делите взрослый куст после цветения или в период активного роста. Отделяйте только боковую розетку с несколькими листьями и собственными здоровыми корнями, затем посадите её в небольшой горшок с воздушным умеренно влажным грунтом и держите в тепле при ярком рассеянном свете до укоренения.',
        ],
      ),
      'Spathiphyllum wallisii hybrid',
      [
        'My mother gave me this peace lily for my birthday. I noticed that its white spathes turn green when I place it on the windowsill. This colour change coincides with the brighter position, but it is also a normal stage of the spathe aging rather than necessarily a sign of too much light.',
        'Этот спатифиллум подарила мне мама на день рождения. Я заметила, что на подоконнике его белые покрывала зеленеют. Изменение совпадает с более ярким местом, но это также нормальный этап старения покрывала, а не обязательно признак избытка света.',
      ],
      [
        'Spathiphyllum wallisii and its compact hybrids form lush clumps of glossy lance-shaped leaves. Slender cream spadices are framed by white sail-like spathes that gradually fade to pale green as the inflorescence matures.',
        'Спатифиллум Уоллиса и его компактные гибриды образуют пышные кусты из глянцевых ланцетных листьев. Тонкие кремовые початки окружены белыми покрывалами-парусами, которые по мере созревания соцветия постепенно становятся светло-зелёными.',
      ],
      quickFacts(
        ['Moderate', 'Умеренный'],
        ['Usually 30–60 cm indoors', 'Обычно 30–60 см в помещении'],
      ),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use a rich but airy mix: about 50% peat-free houseplant compost, 25% fine orchid bark and 25% perlite or pumice. It should hold moderate moisture while draining freely.',
            'Используйте питательный, но воздушный субстрат: примерно 50% безторфяного грунта для комнатных растений, 25% мелкой коры для орхидей и 25% перлита или пемзы. Он должен удерживать умеренную влагу и свободно пропускать лишнюю воду.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Repot in spring every 1–2 years or when roots tightly fill the pot and water passes through poorly. Choose a container only 2–3 cm wider; peace lilies often flower well when slightly snug.',
            'Пересаживайте весной раз в 1–2 года или когда корни плотно заполнят горшок и вода начнёт плохо промачивать ком. Выбирайте ёмкость шире всего на 2–3 см: спатифиллумы часто хорошо цветут в немного тесном горшке.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'From spring to early autumn, feed about once a month with a balanced foliage fertiliser at half strength. Apply only to moist substrate and flush the mix occasionally to limit salt buildup.',
            'С весны до начала осени подкармливайте примерно раз в месяц половинной дозой сбалансированного удобрения для декоративно-лиственных. Вносите только по влажному грунту и иногда обильно промывайте субстрат от накопившихся солей.',
          ],
        ],
        [
          ['Grooming', 'Уход за листьями'],
          [
            'Wipe the broad leaves with a damp cloth. Once an aging green spathe is no longer decorative, cut the entire flower stalk near the base with a sterile tool; remove yellow leaves in the same way.',
            'Протирайте широкие листья влажной салфеткой. Когда постаревшее зелёное покрывало потеряет декоративность, срежьте весь цветонос у основания стерильным инструментом; так же удаляйте пожелтевшие листья.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/spathiphyllum-important.webp',
        propagationImage: '/plant-profile/spathiphyllum-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'anthurium-andraeanum-red-hybrid',
    '/plants/anthurium-andraeanum-red-hybrid-home-photo.webp',
    ['Red flamingo flower', 'Антуриум Андре, красный гибрид'],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Give bright diffused light with a little gentle morning or evening sun. Harsh midday rays can scorch the leaves and spathes, while a dark position often reduces flowering.',
            'Обеспечьте яркий рассеянный свет и немного мягкого утреннего или вечернего солнца. Жёсткие полуденные лучи могут обжечь листья и покрывала, а в тёмном месте цветение часто становится слабее.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Water when the upper 2–3 cm of the mix dries. Moisten the root ball evenly with room-temperature filtered or soft water, drain all excess and never leave the pot standing in water.',
            'Поливайте после просыхания верхних 2–3 см грунта. Равномерно промочите корневой ком мягкой или фильтрованной водой комнатной температуры, полностью слейте излишки и не оставляйте горшок в воде.',
          ],
        ],
        [
          ['Humidity', 'Влажность'],
          [
            'A stable 50–70% humidity supports glossy leaves and smooth growth. Provide gentle air movement and avoid leaving droplets on the colourful spathes.',
            'Стабильная влажность 50–70% поддерживает глянцевую листву и ровный рост. Обеспечьте лёгкое движение воздуха и не оставляйте капли на цветных покрывалах.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Keep at 18–27 °C and protect from cold glass, draughts and temperatures below about 16 °C. Cold wet roots are especially vulnerable to rot.',
            'Содержите при 18–27 °C и берегите от холодного стекла, сквозняков и температуры ниже примерно 16 °C. Холодные мокрые корни особенно уязвимы для гнили.',
          ],
        ],
      ),
      2,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Arum family (Araceae)', 'Ароидные (Araceae)'],
        ],
        [
          ['Origin', 'Происхождение'],
          [
            'Horticultural hybrid derived from a Colombia–Ecuador species',
            'Садовый гибрид вида из Колумбии и Эквадора',
          ],
        ],
        [
          ['Plant type', 'Тип растения'],
          [
            'Evergreen clump-forming epiphytic perennial',
            'Вечнозелёный кустящийся эпифитный многолетник',
          ],
        ],
      ),
      profileFooter(
        [
          [
            'The glossy red heart-shaped structure is a modified leaf called a spathe, not a petal.',
            'The tiny true flowers are arranged along the upright central spadix.',
            'Individual spathes can remain decorative for many weeks and often deepen or green as they age.',
            'Short stems and basal offsets gradually build a dense, rounded clump.',
          ],
          [
            'Глянцевая красная сердцевидная часть — это видоизменённый лист-покрывало, а не лепесток.',
            'Мелкие настоящие цветки расположены вдоль прямостоячего центрального початка.',
            'Отдельные покрывала сохраняют декоративность много недель и с возрастом часто темнеют или зеленеют.',
            'Короткие стебли и прикорневые отпрыски постепенно формируют плотный округлый куст.',
          ],
        ],
        [
          'All parts contain insoluble calcium oxalate crystals. Sap can irritate skin and eyes, and chewing causes painful mouth irritation. Wear gloves when dividing or pruning, clean tools afterwards and keep the plant out of reach of children and pets.',
          'Все части содержат нерастворимые кристаллы оксалата кальция. Сок раздражает кожу и глаза, а при разжёвывании вызывает болезненное жжение во рту. Работайте в перчатках при делении и обрезке, мойте инструменты и держите растение вдали от детей и животных.',
        ],
        [
          [
            'Soft yellow leaves with wet substrate — let the mix dry and inspect the roots for rot.',
            'Dry brown tips — check humidity, irregular watering and mineral buildup from hard water.',
            'Healthy leaves but no new spathes — provide brighter diffused light and avoid an oversized pot.',
            'Dark wet spots on leaves or spathes — keep foliage drier and improve warm air movement.',
          ],
          [
            'Мягкие жёлтые листья при мокром грунте — просушите субстрат и проверьте корни на гниль.',
            'Сухие коричневые кончики — проверьте влажность воздуха, регулярность полива и накопление солей от жёсткой воды.',
            'Здоровая листва без новых покрывал — добавьте яркого рассеянного света и не используйте слишком большой горшок.',
            'Тёмные мокнущие пятна на листьях или покрывалах — держите листву суше и улучшите движение тёплого воздуха.',
          ],
        ],
        [
          'In spring or summer, divide a mature clump only where an offset has its own roots, or root a short rhizome or stem section with a viable growing point. Pot the division into a small airy mix, keep it warm and humid, and water lightly until new growth confirms rooting.',
          'Весной или летом делите взрослый куст только там, где у отпрыска уже есть собственные корни, либо укореняйте короткую часть корневища или стебля с живой точкой роста. Посадите делёнку в небольшой объём воздушного грунта, держите в тепле и повышенной влажности и поливайте умеренно до появления нового роста.',
        ],
      ),
      'Anthurium Andraeanum Group',
      [
        'My mother gave me this anthurium for my birthday. Its red and deep burgundy spathes make it more than a flowering plant in the collection — it is a warm memory of that day and of her care.',
        'Этот антуриум подарила мне мама на день рождения. Его красные и глубокие бордовые покрывала делают его не просто цветущим растением в коллекции, а тёплым напоминанием о том дне и о маминой заботе.',
      ],
      [
        'This red-flowering Anthurium Andraeanum hybrid forms a dense clump of glossy heart-shaped leaves and long-lasting waxy spathes in shades from clear red to deep burgundy. Each spathe surrounds a contrasting yellow or greenish flower-bearing spadix.',
        'Этот красноцветковый гибрид антуриума Андре формирует плотный куст из глянцевых сердцевидных листьев и долговечных восковых покрывал — от ярко-красных до глубоких бордовых. Каждое покрывало окружает контрастный жёлтый или зеленоватый початок с настоящими цветками.',
      ],
      quickFacts(
        ['Moderate', 'Умеренный'],
        ['Usually 30–60 cm indoors', 'Обычно 30–60 см в помещении'],
      ),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use a loose acidic mix: about two parts peat-free ericaceous compost, one part perlite and one part fine orchid bark. A little horticultural charcoal can help keep the structure open.',
            'Используйте рыхлый слабокислый субстрат: примерно две части безторфяного грунта для кислолюбивых растений, одну часть перлита и одну часть мелкой коры для орхидей. Немного древесного угля поможет сохранить структуру воздушной.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Repot in spring every 2–3 years or when roots densely fill the container. Choose a pot only 2–3 cm wider and keep the crown just above the surface.',
            'Пересаживайте весной раз в 2–3 года или когда корни плотно заполнят ёмкость. Выбирайте горшок шире всего на 2–3 см и оставляйте основание розетки чуть выше поверхности грунта.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'From spring to early autumn, feed every 2–4 weeks with a balanced or orchid fertiliser at half strength. Apply only to moist substrate and reduce feeding in winter.',
            'С весны до начала осени подкармливайте раз в 2–4 недели половинной дозой сбалансированного удобрения или удобрения для орхидей. Вносите только по влажному грунту и сокращайте подкормки зимой.',
          ],
        ],
        [
          ['Grooming', 'Уход за листьями'],
          [
            'Wipe the leaves gently and remove yellow foliage or faded flower stems at the base with a sterile tool. Do not polish the leaves or mist the colourful spathes.',
            'Осторожно протирайте листья и удаляйте пожелтевшую листву или отцветшие цветоносы у основания стерильным инструментом. Не используйте полироли для листьев и не опрыскивайте цветные покрывала.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/anthurium-red-important.webp',
        propagationImage: '/plant-profile/anthurium-red-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'philodendron-erubescens-dark-hybrid',
    '/plants/philodendron-erubescens-dark-hybrid-home-photo.webp',
    ['Dark red-leaf philodendron', 'Филодендрон краснеющий, тёмнолистный гибрид'],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Give bright diffused light with a little gentle morning or evening sun. The dark leaves tolerate medium light, but the plant keeps a denser shape and richer colour closer to a bright window without harsh midday rays.',
            'Обеспечьте яркий рассеянный свет и немного мягкого утреннего или вечернего солнца. Тёмные листья переносят среднее освещение, но у светлого окна без жёстких полуденных лучей куст сохраняет более плотную форму и насыщенный цвет.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Water after the upper 3–5 cm of the mix dries. Soak the root ball evenly, drain all excess water and let the airy substrate partially dry before watering again.',
            'Поливайте после просыхания верхних 3–5 см грунта. Равномерно промочите корневой ком, полностью слейте лишнюю воду и дайте воздушному субстрату частично подсохнуть перед следующим поливом.',
          ],
        ],
        [
          ['Humidity', 'Влажность'],
          [
            'A stable 50–70% humidity supports smooth new leaves, but good air movement is essential. Do not leave water sitting inside the central rosette or a newly unfurling leaf.',
            'Стабильная влажность 50–70% помогает новым листьям раскрываться ровно, но при этом необходимо движение воздуха. Не оставляйте воду в центре розетки или внутри разворачивающегося листа.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Keep at 18–28 °C and protect from cold glass, draughts and temperatures below about 15 °C. Cold wet roots are especially vulnerable to rot.',
            'Содержите при 18–28 °C и берегите от холодного стекла, сквозняков и температуры ниже примерно 15 °C. Холодные мокрые корни особенно уязвимы для гнили.',
          ],
        ],
      ),
      2,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Arum family (Araceae)', 'Ароидные (Araceae)'],
        ],
        [
          ['Origin', 'Происхождение'],
          [
            'Horticultural hybrid related to red-leaf philodendrons',
            'Садовый гибрид из группы краснеющих филодендронов',
          ],
        ],
        [
          ['Plant type', 'Тип растения'],
          ['Evergreen self-heading aroid hybrid', 'Вечнозелёный кустовой ароидный гибрид'],
        ],
      ),
      profileFooter(
        [
          [
            'Young petioles and protective cataphylls emerge in rich burgundy tones.',
            'The broad oval leaves mature to a deep, almost black-green colour.',
            'New leaves open lighter and often redder, then darken as their tissue hardens.',
            'Short internodes give the plant a compact, architectural rosette rather than a long trailing habit.',
          ],
          [
            'Молодые черешки и защитные катафиллы появляются в насыщенных бордовых тонах.',
            'Широкие овальные листья по мере взросления становятся глубокого, почти чёрно-зелёного цвета.',
            'Новые листья раскрываются более светлыми и часто красноватыми, а затем темнеют по мере затвердевания ткани.',
            'Короткие междоузлия формируют компактную архитектурную розетку, а не длинный свисающий побег.',
          ],
        ],
        [
          'Philodendron tissue contains insoluble calcium oxalate crystals. Sap can irritate skin and eyes, and chewing causes painful mouth irritation. Wear gloves when pruning, clean tools afterwards and keep the plant out of reach of children and pets.',
          'Ткани филодендрона содержат нерастворимые кристаллы оксалата кальция. Сок раздражает кожу и глаза, а при разжёвывании вызывает болезненное жжение во рту. Работайте в перчатках, мойте инструменты после обрезки и держите растение вдали от детей и животных.',
        ],
        [
          [
            'Soft yellow leaves with wet substrate — let the mix dry and inspect the roots for rot.',
            'Pale, stretched or one-sided growth — provide brighter diffused light and rotate the pot regularly.',
            'Brown leaf margins — check for harsh sun, salt buildup, dry air or irregular watering.',
            'Silvery scars or distorted new leaves — inspect closely for thrips and spider mites.',
          ],
          [
            'Мягкие жёлтые листья при мокром грунте — просушите субстрат и проверьте корни на гниль.',
            'Бледный, вытянутый или односторонний рост — добавьте яркого рассеянного света и регулярно поворачивайте горшок.',
            'Коричневые края листьев — проверьте избыток солнца, накопление солей, сухость воздуха и регулярность полива.',
            'Серебристые потёртости или деформированные новые листья — внимательно проверьте растение на трипса и паутинного клеща.',
          ],
        ],
        [
          'Separate a healthy basal offset once it has its own roots, or take a short stem section with at least one viable node; a detached leaf without a node cannot produce a new plant. Let the cut dry briefly, then root it in lightly moist sphagnum or a fine airy aroid mix in warmth and bright diffused light.',
          'Отделяйте здоровый прикорневой отпрыск, когда у него появятся собственные корни, либо возьмите короткую часть стебля как минимум с одним живым узлом: отдельный лист без узла не даст новое растение. Немного подсушите срез, затем укореняйте в слегка влажном сфагнуме или мелком воздушном ароидном субстрате в тепле и при ярком рассеянном свете.',
        ],
      ),
      'Philodendron erubescens hybrid',
      [
        'This young philodendron is especially striking for the contrast between almost black-green leaf blades and wine-burgundy petioles. The central cataphyll shows that another leaf is already forming.',
        'Этот молодой филодендрон особенно выразителен благодаря контрасту почти чёрно-зелёных листовых пластин и винно-бордовых черешков. Центральный катафилл показывает, что внутри уже формируется следующий лист.',
      ],
      [
        'This compact dark-leaved philodendron belongs to the horticultural group related to red-leaf philodendrons. It forms a self-heading rosette of glossy elongated oval leaves on burgundy petioles; the exact cultivar cannot be confirmed from foliage alone.',
        'Этот компактный тёмнолистный филодендрон относится к садовой группе, близкой краснеющим филодендронам. Он формирует кустовую розетку из глянцевых удлинённо-овальных листьев на бордовых черешках; по одной листве надёжно подтвердить точное сортовое имя нельзя.',
      ],
      quickFacts(
        ['Moderate', 'Умеренный'],
        ['Usually 50–100 cm indoors', 'Обычно 50–100 см в помещении'],
      ),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use a chunky aroid mix: about 40% fine orchid bark, 30% coco coir or light houseplant compost, 20% perlite or pumice and 10% horticultural charcoal.',
            'Используйте крупный ароидный субстрат: примерно 40% мелкой коры для орхидей, 30% кокосового волокна или лёгкого грунта для комнатных растений, 20% перлита или пемзы и 10% древесного угля.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Repot in spring every 2–3 years or when roots densely fill the pot. Choose a container only 2–3 cm wider and keep the central crown above the substrate.',
            'Пересаживайте весной раз в 2–3 года или когда корни плотно заполнят горшок. Выбирайте ёмкость шире всего на 2–3 см и не заглубляйте центральную розетку в субстрат.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'From spring to early autumn, feed every 3–4 weeks with a balanced foliage fertiliser at half strength. Do not fertilise dry soil or a stressed plant.',
            'С весны до начала осени подкармливайте раз в 3–4 недели половинной дозой сбалансированного удобрения для декоративно-лиственных. Не вносите удобрение в сухой грунт или ослабленному растению.',
          ],
        ],
        [
          ['Grooming', 'Уход за листьями'],
          [
            'Wipe the broad leaves gently, remove only yellow or badly damaged foliage with a sterile tool and rotate the pot for even growth. Never pull or force a new leaf out of its cataphyll.',
            'Осторожно протирайте широкие листья, стерильным инструментом удаляйте только пожелтевшую или сильно повреждённую листву и поворачивайте горшок для равномерного роста. Не вытягивайте новый лист из катафилла и не раскрывайте его силой.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/philodendron-dark-important.webp',
        propagationImage: '/plant-profile/philodendron-dark-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'monstera-adansonii',
    '/plants/monstera-adansonii-home-photo.webp',
    ['Swiss cheese vine', 'Монстера адансони'],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Give bright diffused light with a little gentle morning or evening sun. Harsh midday rays can scorch the thin leaves, while a dark position produces longer internodes and smaller, less perforated growth.',
            'Обеспечьте яркий рассеянный свет и немного мягкого утреннего или вечернего солнца. Жёсткие полуденные лучи могут обжечь тонкие листья, а в тёмном месте междоузлия вытягиваются и новые листья становятся мельче и менее перфорированными.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Water after the upper 3–5 cm of the mix dries. Moisten the root ball evenly, drain all excess and let the airy substrate partially dry before the next watering.',
            'Поливайте после просыхания верхних 3–5 см грунта. Равномерно промочите корневой ком, полностью слейте лишнюю воду и дайте воздушному субстрату частично подсохнуть перед следующим поливом.',
          ],
        ],
        [
          ['Humidity', 'Влажность'],
          [
            'A stable 50–70% humidity supports smooth leaves and aerial roots. Good air movement is essential, and water should not remain trapped in unfolding growth.',
            'Стабильная влажность 50–70% помогает листьям раскрываться ровно и поддерживает воздушные корни. При этом необходимо движение воздуха, а вода не должна оставаться внутри разворачивающегося прироста.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Keep at 18–28 °C and protect from cold glass, draughts and temperatures below about 15 °C. Growth slows sharply in cool wet conditions.',
            'Содержите при 18–28 °C и берегите от холодного стекла, сквозняков и температуры ниже примерно 15 °C. В прохладе и мокром грунте рост резко замедляется.',
          ],
        ],
      ),
      1,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Arum family (Araceae)', 'Ароидные (Araceae)'],
        ],
        [
          ['Origin', 'Родина'],
          ['Tropical America', 'Тропическая Америка'],
        ],
        [
          ['Plant type', 'Тип растения'],
          ['Evergreen climbing hemiepiphyte', 'Вечнозелёный лазающий полуэпифит'],
        ],
      ),
      profileFooter(
        [
          [
            'The oval holes are natural fenestrations, not insect or mechanical damage.',
            'Leaves usually become larger and more perforated when the vine climbs in strong diffused light.',
            'Aerial roots emerge from stem nodes and help the plant attach to support.',
            'It stays much smaller and more delicate than Monstera deliciosa.',
          ],
          [
            'Овальные отверстия — естественные фенестрации, а не следы насекомых или механические повреждения.',
            'При подъёме по опоре и ярком рассеянном свете листья обычно становятся крупнее и получают больше отверстий.',
            'Воздушные корни появляются в узлах стебля и помогают растению закрепляться на опоре.',
            'Эта монстера остаётся значительно мельче и изящнее Monstera deliciosa.',
          ],
        ],
        [
          'Monstera tissue contains insoluble calcium oxalate crystals. Sap can irritate skin and eyes, and chewing causes painful mouth irritation. Wear gloves when pruning, clean tools afterwards and keep the plant out of reach of children and pets.',
          'Ткани монстеры содержат нерастворимые кристаллы оксалата кальция. Сок раздражает кожу и глаза, а при разжёвывании вызывает болезненное жжение во рту. Работайте в перчатках, мойте инструменты после обрезки и держите растение вдали от детей и животных.',
        ],
        [
          [
            'Soft yellow leaves with wet substrate — let the mix dry and inspect the roots for rot.',
            'Crisp brown edges — check for excessive sun, dry air, salt buildup or irregular watering.',
            'Long bare stems and small solid leaves — provide brighter diffused light and a vertical support.',
            'Silvery scars or distorted new leaves — inspect closely for thrips and spider mites.',
          ],
          [
            'Мягкие жёлтые листья при мокром грунте — просушите субстрат и проверьте корни на гниль.',
            'Сухие коричневые края — проверьте избыток солнца, сухость воздуха, накопление солей и регулярность полива.',
            'Длинные оголённые побеги и мелкие цельные листья — добавьте яркого рассеянного света и вертикальную опору.',
            'Серебристые потёртости или деформированные новые листья — внимательно проверьте растение на трипса и паутинного клеща.',
          ],
        ],
        [
          'Take a stem section with at least one healthy node and preferably a short aerial root; a detached leaf without a node cannot grow into a new vine. Root the cutting in lightly moist sphagnum, water or a fine airy aroid mix in warmth and bright diffused light.',
          'Возьмите часть стебля как минимум с одним здоровым узлом и желательно с коротким воздушным корнем: отдельный лист без узла не вырастет в новую лиану. Укореняйте черенок в слегка влажном сфагнуме, воде или мелком воздушном ароидном субстрате в тепле и при ярком рассеянном свете.',
        ],
      ),
      'Monstera adansonii',
      [
        'This young monstera already has expressive perforations on nearly every leaf. The new leaf in the centre is still soft and folded, so its final pattern will only become clear after it fully unfurls and hardens.',
        'У этой молодой монстеры выразительные отверстия есть уже почти на каждом листе. Новый лист в центре пока мягкий и сложенный, поэтому его окончательный рисунок станет понятен только после полного раскрытия и затвердевания.',
      ],
      [
        'Monstera adansonii is a tropical climbing aroid with thin oval leaves pierced by characteristic internal fenestrations. Because of this unusual pattern, it is often called the Swiss cheese vine. It can trail from a pot, but develops larger, more mature foliage when guided upward on a support.',
        'Монстера адансони — тропический лазающий ароид с тонкими овальными листьями, пронизанными характерными внутренними фенестрациями. Из-за этого необычного рисунка её часто называют «швейцарским сыром». Она может свисать из горшка, но на вертикальной опоре формирует более крупную и взрослую листву.',
      ],
      quickFacts(
        ['Moderate to fast', 'Умеренный или быстрый'],
        ['Usually 60–200 cm with support', 'Обычно 60–200 см с опорой'],
      ),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use a loose aroid mix: about 40% fine orchid bark, 30% coco coir or light houseplant compost, 20% perlite or pumice and 10% horticultural charcoal.',
            'Используйте рыхлый ароидный субстрат: примерно 40% мелкой коры для орхидей, 30% кокосового волокна или лёгкого грунта для комнатных растений, 20% перлита или пемзы и 10% древесного угля.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Repot in spring every 1–2 years or when roots densely fill the pot. Choose a container only 2–3 cm wider and keep the stem base at its previous level.',
            'Пересаживайте весной раз в 1–2 года или когда корни плотно заполнят горшок. Выбирайте ёмкость шире всего на 2–3 см и сохраняйте прежний уровень посадки стебля.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'From spring to early autumn, feed every 3–4 weeks with a balanced foliage fertiliser at half strength. Do not fertilise dry soil or a stressed plant.',
            'С весны до начала осени подкармливайте раз в 3–4 недели половинной дозой сбалансированного удобрения для декоративно-лиственных. Не вносите удобрение в сухой грунт или ослабленному растению.',
          ],
        ],
        [
          ['Support and pruning', 'Опора и обрезка'],
          [
            'Guide the vine onto a moss pole, coir pole or narrow plank and secure it loosely below the nodes. Trim overly long stems with a sterile tool and replant rooted cuttings into the same pot for a fuller base.',
            'Направляйте лиану по моховой, кокосовой или деревянной опоре и свободно фиксируйте ниже узлов. Слишком длинные побеги обрезайте стерильным инструментом, а укоренённые черенки подсаживайте в тот же горшок для более густого основания.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/monstera-adansonii-important.webp',
        propagationImage: '/plant-profile/monstera-adansonii-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'commelinaceae',
    'tradescantia-collection',
    '/plant-profile/tradescantia-cover.webp',
    ['Tradescantia collection', 'Традесканции'],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Give bright indirect light. Variegated forms keep their colour best close to a bright window without harsh midday sun.',
            'Нужен яркий рассеянный свет. Вариегатные формы лучше сохраняют окраску рядом со светлым окном, но без жёсткого полуденного солнца.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Water after the upper layer of the mix has dried. Let excess water drain freely and never leave the pot standing in water.',
            'Поливайте после подсыхания верхнего слоя грунта. Давайте лишней воде свободно стечь и не оставляйте горшок в воде.',
          ],
        ],
        [
          ['Humidity', 'Влажность'],
          [
            'Normal room humidity is usually enough. Keep hairy T. sillamontana foliage dry and provide gentle air movement.',
            'Обычной комнатной влажности обычно достаточно. Опушённые листья T. sillamontana держите сухими и обеспечьте лёгкое движение воздуха.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Grow at 18–26°C and protect from cold draughts. Prolonged temperatures below about 12°C can damage tender growth.',
            'Выращивайте при 18–26 °C и берегите от холодных сквозняков. Длительная температура ниже примерно 12 °C может повредить нежные побеги.',
          ],
        ],
      ),
      1,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Spiderwort family (Commelinaceae)', 'Коммелиновые (Commelinaceae)'],
        ],
        [
          ['Origin', 'Родина'],
          ['Tropical and subtropical Americas', 'Тропические и субтропические районы Америки'],
        ],
        [
          ['Plant type', 'Тип растения'],
          [
            'Evergreen trailing or spreading perennial',
            'Вечнозелёный стелющийся или раскидистый многолетник',
          ],
        ],
      ),
      profileFooter(
        [
          [
            'Tradescantias root readily from stem nodes.',
            'Leaf colour becomes richer in bright indirect light.',
            'Regular pinching makes the plants fuller and more compact.',
            'The collection includes smooth, striped, purple and softly woolly leaves.',
          ],
          [
            'Традесканции легко укореняются из узлов побега.',
            'При ярком рассеянном свете окраска листьев становится выразительнее.',
            'Регулярная прищипка делает растения гуще и компактнее.',
            'В коллекции есть гладкие, полосатые, пурпурные и мягко опушённые листья.',
          ],
        ],
        [
          'Avoid constantly wet soil. T. sillamontana is especially sensitive to moisture trapped on its dense woolly foliage.',
          'Не держите грунт постоянно мокрым. T. sillamontana особенно чувствительна к влаге, которая задерживается на густо опушённых листьях.',
        ],
        [
          [
            'Long bare stems — pinch the tips and give more light.',
            'Faded variegation — move closer to bright indirect light.',
            'Soft yellowing growth — check for overwatering and poor drainage.',
          ],
          [
            'Длинные оголённые побеги — прищипните верхушки и добавьте света.',
            'Вариегатность бледнеет — переставьте ближе к яркому рассеянному свету.',
            'Мягкие желтеющие побеги — проверьте, нет ли перелива и плохого дренажа.',
          ],
        ],
        [
          'Cut a healthy shoot below a node, remove the lowest leaves and root several cuttings together in a light, slightly moist mix for a full pot.',
          'Срежьте здоровый побег под узлом, удалите нижние листья и укорените сразу несколько черенков в лёгком, слегка влажном грунте, чтобы получить пышный куст.',
        ],
      ),
      'Tradescantia spp. and cultivars',
      [
        'I grow many tradescantias with different leaf colours, stripes and textures. Most of this collection began as small cuttings.',
        'У меня много традесканций с разной окраской, полосами и фактурой листьев. Большая часть этой коллекции начиналась с маленьких черенков.',
      ],
      [
        'Tradescantias are quick-growing plants valued for colourful foliage and their ability to form a lush cascading pot from just a few cuttings.',
        'Традесканции — быстрорастущие растения, которые ценят за яркую листву и способность всего из нескольких черенков превращаться в пышный каскадный куст.',
      ],
      quickFacts(['Fast', 'Быстрый'], ['Trailing shoots 30–60 cm', 'Свисающие побеги 30–60 см']),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use a light, well-drained mix: 70% peat-free houseplant compost, 20% perlite and 10% coarse horticultural sand.',
            'Используйте лёгкую, хорошо дренированную смесь: 70% безторфяного грунта для комнатных растений, 20% перлита и 10% крупного садового песка.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Repot in spring when roots fill the pot. A wide, shallow container suits several rooted cuttings planted together.',
            'Пересаживайте весной, когда корни освоят горшок. Для нескольких укоренённых вместе черенков подойдёт широкий неглубокий горшок.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'From spring to early autumn, feed monthly with a balanced liquid fertiliser at half strength. Do not feed dry or stressed plants.',
            'С весны до начала осени подкармливайте раз в месяц сбалансированным жидким удобрением в половинной дозировке. Не удобряйте пересушенные или ослабленные растения.',
          ],
        ],
        [
          ['Pruning', 'Формирование'],
          [
            'Pinch growing tips regularly and replant rooted cuttings into the same pot to keep the centre dense.',
            'Регулярно прищипывайте верхушки и подсаживайте укоренённые черенки в тот же горшок, чтобы середина куста оставалась густой.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/tradescantia-important.webp',
        propagationImage: '/plant-profile/tradescantia-propagation.webp',
        variants: profileVariants(
          ['My Tradescantia collection', 'Моя коллекция традесканций'],
          [
            'Tradescantias can look completely different while sharing the same lively growth and graceful cascading habit. My collection brings together green, silver, burgundy, pink and variegated foliage, each with its own distinctive pattern.',
            'Традесканции могут выглядеть совершенно по-разному, сохраняя живой рост и изящный каскад побегов. В моей коллекции собралась зелёная, серебристая, бордовая, розовая и пёстрая листва — каждая со своим неповторимым рисунком.',
          ],
          [
            '/plant-profile/tradescantia-variants/dark-broad.webp',
            ['Zebrina Burgundy — burgundy coloration', 'Зебрина Бургунди — бордовая окраска'],
          ],
          [
            '/plant-profile/tradescantia-variants/zebrina-silver.webp',
            ['Zebrina Burgundy — silver coloration', 'Зебрина Бургунди — серебристая окраска'],
          ],
          ['/plant-profile/tradescantia-variants/green.webp', ['Baby Bunny', 'Бэби Банни']],
          ['/plant-profile/tradescantia-variants/purpurea.webp', ['Pallida', 'Паллида']],
          [
            '/plant-profile/tradescantia-variants/pallida-blue-sue.webp',
            ['Pallida Blue Sue', 'Паллида Блю Сью'],
          ],
          ['/plant-profile/tradescantia-variants/thai.webp', ['Thai', 'Тайская']],
          ['/plant-profile/tradescantia-variants/yellow-hill.webp', ['Yellow Hill', 'Желтый холм']],
          [
            '/plant-profile/tradescantia-variants/fluminensis.webp',
            ['T. fluminensis', 'Приречная'],
          ],
          ['/plant-profile/tradescantia-variants/white-pinstripe.webp', ['Elegance', 'Элеганс']],
          [
            '/plant-profile/tradescantia-variants/green-purple.webp',
            ['Green Rhoeo', 'Рео зеленый'],
          ],
          [
            '/plant-profile/tradescantia-variants/variegated.webp',
            ['Variegated gibasis', 'Гибазис вариегатный'],
          ],
          [
            '/plant-profile/tradescantia-variants/white.webp',
            ['White Albiflora', 'Белая Альбифлора'],
          ],
          ['/plant-profile/tradescantia-variants/gold.webp', ['Sitara Gold', 'Ситара Голд']],
          [
            '/plant-profile/tradescantia-variants/sillamontana.webp',
            ['T. sillamontana Velvet Hill', 'Силламонтана Вельвет хилл'],
          ],
          [
            '/plant-profile/tradescantia-variants/sillamontana-variegated.webp',
            ['Variegated T. sillamontana', 'Силламонтана вариегатная'],
          ],
          [
            '/plant-profile/tradescantia-variants/navicularis.webp',
            ['T. navicularis', 'Ладьевидная'],
          ],
          ['/plant-profile/tradescantia-variants/hijau-bari.webp', ['Hijau Bari', 'Хиджау Бари']],
          ['/plant-profile/tradescantia-variants/purpuza.webp', ['Purpuza', 'Пурпуза']],
          ['/plant-profile/tradescantia-variants/unnamed-pink-01.webp', ['Unicorn', 'Юникорн']],
          [
            '/plant-profile/tradescantia-variants/unnamed-pink-02.webp',
            ['Pink Furry', 'Пинк Фурри'],
          ],
          [
            '/plant-profile/tradescantia-variants/pink-paradise.webp',
            ['Pink Paradise', 'Пинк Парадайз'],
          ],
        ),
      },
    ),
    {
      countCover: false,
      profileMainImageInteractive: false,
      showProfileImageBadge: false,
    },
  ),
  collectionPlant(
    'commelinaceae',
    'callisia-collection',
    '/plant-profile/callisia-cover.webp',
    ['Callisia collection', 'Каллизии'],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Give bright indirect light. Gold and Pink Panther keep their colour best near a bright window without harsh midday sun.',
            'Нужен яркий рассеянный свет. «Голд» и «Розовая пантера» лучше сохраняют окраску рядом со светлым окном, но без жёсткого полуденного солнца.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Water when the top 1–2 cm of mix has dried. Let excess water drain and avoid keeping the fine roots constantly wet.',
            'Поливайте после подсыхания верхних 1–2 см грунта. Давайте лишней воде стечь и не держите тонкие корни постоянно мокрыми.',
          ],
        ],
        [
          ['Humidity', 'Влажность'],
          [
            'Average room humidity is suitable. Good air movement helps dense trailing growth stay healthy.',
            'Подходит обычная комнатная влажность. Лёгкое движение воздуха помогает густым свисающим побегам оставаться здоровыми.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Grow at 18–27°C and keep away from cold glass and draughts. Protect from temperatures below about 12°C.',
            'Выращивайте при 18–27 °C и берегите от холодного стекла и сквозняков. Не допускайте температуры ниже примерно 12 °C.',
          ],
        ],
      ),
      1,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Spiderwort family (Commelinaceae)', 'Коммелиновые (Commelinaceae)'],
        ],
        [
          ['Origin', 'Родина'],
          ['Tropical Central and South America', 'Тропические районы Центральной и Южной Америки'],
        ],
        [
          ['Plant type', 'Тип растения'],
          ['Evergreen trailing perennial', 'Вечнозелёный ампельный многолетник'],
        ],
      ),
      profileFooter(
        [
          [
            'Small leaves grow in neat pairs along fine branching stems.',
            'Frequent pinching turns a few cuttings into a dense cushion.',
            'Gold and Pink Panther need brighter indirect light to hold their colour.',
            'The stems root readily wherever a node touches moist mix.',
          ],
          [
            'Мелкие листья растут аккуратными парами на тонких ветвящихся побегах.',
            'Регулярная прищипка превращает несколько черенков в густую подушку.',
            'Формам «Голд» и «Розовая пантера» нужен более яркий рассеянный свет для сохранения окраски.',
            'Побеги легко укореняются там, где узел касается влажного грунта.',
          ],
        ],
        [
          'Do not overwater a freshly rooted plant: its small root system needs air as much as moisture.',
          'Не переливайте недавно укоренённое растение: его небольшой корневой системе воздух нужен не меньше, чем влага.',
        ],
        [
          [
            'Long sparse stems — give more bright indirect light and pinch the tips.',
            'Green reversion in variegated forms — remove green shoots and improve the light.',
            'Soft dark stems — check for excess moisture and poor drainage.',
          ],
          [
            'Длинные редкие побеги — добавьте яркого рассеянного света и прищипните верхушки.',
            'Вариегатная форма зеленеет — удалите зелёные побеги и улучшите освещение.',
            'Мягкие потемневшие стебли — проверьте, нет ли лишней влаги и плохого дренажа.',
          ],
        ],
        [
          'Cut healthy tips below a node, remove the lowest leaves and plant several cuttings together in a light, slightly moist mix.',
          'Срежьте здоровые верхушки под узлом, удалите нижние листья и посадите несколько черенков вместе в лёгкий, слегка влажный грунт.',
        ],
      ),
      'Callisia repens and cultivars',
      [
        'My Callisia collection has three distinct forms: classic green, luminous Gold and pastel Pink Panther.',
        'В моей коллекции три разные каллизии: зелёная классическая, светлая «Голд» и пастельная «Розовая пантера».',
      ],
      [
        'Callisia repens is a compact relative of Tradescantia. Its fine branching stems quickly form a soft cascading cushion of small leaves.',
        'Каллизия ползучая — компактная родственница традесканции. Её тонкие ветвящиеся побеги быстро образуют мягкую каскадную подушку из мелких листьев.',
      ],
      quickFacts(['Fast', 'Быстрый'], ['Trailing shoots 20–40 cm', 'Свисающие побеги 20–40 см']),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use a sandy, well-drained mix: 60% peat-free houseplant compost, 25% perlite and 15% coarse horticultural sand.',
            'Используйте песчаную, хорошо дренированную смесь: 60% безторфяного грунта для комнатных растений, 25% перлита и 15% крупного садового песка.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Repot in spring into a wide, shallow pot. Plant several rooted cuttings together for an even, full cushion.',
            'Пересаживайте весной в широкий неглубокий горшок. Для ровной пышной подушки высаживайте вместе несколько укоренённых черенков.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'From spring to early autumn, feed monthly with a balanced liquid fertiliser at half strength.',
            'С весны до начала осени подкармливайте раз в месяц сбалансированным жидким удобрением в половинной дозировке.',
          ],
        ],
        [
          ['Pruning', 'Формирование'],
          [
            'Pinch growing tips regularly and replant rooted cuttings into the same pot to keep the centre dense.',
            'Регулярно прищипывайте верхушки и подсаживайте укоренённые черенки в тот же горшок, чтобы середина оставалась густой.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/callisia-important.webp',
        mainImageVariantIndex: 2,
        propagationImage: '/plant-profile/callisia-propagation.webp',
        variants: profileVariants(
          ['My Callisia collection', 'Моя коллекция каллизий'],
          [
            'Callisias share their miniature leaves and soft cascading growth, yet every form plays with colour in its own way. My collection ranges from calm green to luminous gold and delicate pink shades.',
            'Каллизии объединяют миниатюрные листья и мягкие ниспадающие побеги, но каждая форма по-своему играет цветом. В моей коллекции оттенки переходят от спокойной зелени к сияющему золоту и нежным розовым тонам.',
          ],
          ['/plant-profile/callisia-variants/classic.webp', ['Classic', 'Классическая']],
          ['/plant-profile/callisia-variants/gold.webp', ['Gold', 'Голд']],
          [
            '/plant-profile/callisia-variants/pink-panther.webp',
            ["'Pink Panther'", '«Розовая пантера»'],
          ],
        ),
      },
    ),
    3,
  ),
  collectionPlant(
    'orchidaceae',
    'phalaenopsis-collection',
    '/plant-profile/orchid-cover.webp',
    ['Phalaenopsis', 'Фаленопсисы'],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Give bright indirect light without harsh midday sun.',
            'Нужен яркий рассеянный свет без жёсткого полуденного солнца.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Soak after the roots turn silvery, then let all excess water drain.',
            'Замачивайте после того, как корни посеребрятся, затем полностью сливайте лишнюю воду.',
          ],
        ],
        [
          ['Humidity', 'Влажность'],
          [
            'About 40–60% humidity with gentle air movement is ideal.',
            'Оптимальна влажность около 40–60% при мягкой циркуляции воздуха.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Keep at 18–27°C and protect from cold draughts.',
            'Держите при 18–27 °C и берегите от холодных сквозняков.',
          ],
        ],
      ),
      3,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Orchid family (Orchidaceae)', 'Орхидные (Orchidaceae)'],
        ],
        [
          ['Origin', 'Родина'],
          ['Tropical Asia and Australia', 'Тропическая Азия и Австралия'],
        ],
        [
          ['Plant type', 'Тип растения'],
          ['Epiphytic flowering perennial', 'Эпифитный цветущий многолетник'],
        ],
      ),
      profileFooter(
        [
          [
            'Flower spikes can stay decorative for several months.',
            'Healthy roots are firm, green after watering and silvery when dry.',
            'A transparent ventilated pot makes root condition easier to monitor.',
            'A small night-time temperature drop can encourage a new spike.',
          ],
          [
            'Цветоносы могут сохранять декоративность несколько месяцев.',
            'Здоровые корни плотные, зелёные после полива и серебристые в сухом состоянии.',
            'Прозрачный проветриваемый горшок помогает следить за состоянием корней.',
            'Небольшой перепад ночной температуры может стимулировать новый цветонос.',
          ],
        ],
        [
          'Keep water out of the crown and never leave the pot standing in water.',
          'Не оставляйте воду в точке роста и не держите горшок в воде.',
        ],
        [
          [
            'Root or crown rot — usually caused by stagnant moisture or water trapped between leaves.',
            'Wrinkled leaves — check the roots: the plant may be dry or unable to absorb water.',
            'Bud blast — often follows draughts, relocation or sharp temperature changes.',
          ],
          [
            'Гниль корней или точки роста — обычно возникает из-за застоя влаги или воды между листьями.',
            'Сморщенные листья — проверьте корни: растение может быть пересушено или не усваивать воду.',
            'Опадение бутонов — часто случается после сквозняка, перестановки или резких перепадов температуры.',
          ],
        ],
        [
          'At home, separate a keiki only after it forms several roots; flower-stem cuttings are unreliable.',
          'В домашних условиях отделяйте детку только после появления нескольких корней; черенки цветоноса ненадёжны.',
        ],
      ),
      'Phalaenopsis hybrids',
      [
        'My collection includes 10 orchids with distinctly different flowers.',
        'В моей коллекции 10 орхидей с заметно разными цветками.',
      ],
      [
        'Phalaenopsis orchids combine sculptural leaves with long-lasting, exceptionally varied blooms.',
        'Фаленопсисы сочетают скульптурные листья с долгим и очень разнообразным цветением.',
      ],
      quickFacts(
        ['Moderate', 'Умеренный'],
        ['Rosette 20–50 cm plus flower spikes', 'Розетка 20–50 см и цветоносы'],
      ),
      careCards(
        [
          ['Substrate', 'Субстрат'],
          [
            'Use chunky orchid bark with a little sphagnum, never dense universal soil.',
            'Используйте крупную кору для орхидей с небольшим количеством сфагнума, а не плотный универсальный грунт.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Repot after flowering or every 2–3 years into a ventilated pot.',
            'Пересаживайте после цветения или раз в 2–3 года в проветриваемый горшок.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'Use a weak orchid fertiliser every second or third watering during active growth.',
            'В период роста используйте слабый раствор удобрения для орхидей каждый второй или третий полив.',
          ],
        ],
        [
          ['Pruning', 'Обрезка'],
          [
            'Remove only fully dry spikes and damaged roots with a sterile tool.',
            'Удаляйте только полностью сухие цветоносы и повреждённые корни стерильным инструментом.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/orchid-important.webp',
        propagationImage: '/plant-profile/orchid-propagation.webp',
        variants: profileVariants(
          ['My Phalaenopsis collection', 'Моя коллекция фаленопсисов'],
          [
            'Ten Phalaenopsis orchids in total: from warm copper and lemon tones to spotted and velvet-purple blooms. The pink cascade is featured in the main image.',
            'Всего в коллекции десять фаленопсисов: от тёплых медных и лимонных оттенков до крапчатых и бархатно-фиолетовых цветков. «Розовый каскад» вынесен в главное изображение.',
          ],
          ['/plant-profile/orchid-variants/01-copper.webp', ['Copper orange', 'Медно-оранжевая']],
          ['/plant-profile/orchid-variants/02-yellow.webp', ['Lemon yellow', 'Лимонно-жёлтая']],
          ['/plant-profile/orchid-variants/04-white.webp', ['Snow white', 'Белоснежная']],
          ['/plant-profile/orchid-variants/05-pale-pink.webp', ['Soft pink', 'Нежно-розовая']],
          [
            '/plant-profile/orchid-variants/06-burgundy-spots.webp',
            ['White with burgundy spots', 'Белая с бордовым крапом'],
          ],
          [
            '/plant-profile/orchid-variants/07-lilac-spots.webp',
            ['Lilac spotted', 'Сиреневая с крапом'],
          ],
          [
            '/plant-profile/orchid-variants/03-veined-white.webp',
            ['White with raspberry veins', 'Белая с малиновыми прожилками'],
          ],
          [
            '/plant-profile/orchid-variants/09-magenta-veins.webp',
            ['Magenta veined', 'Малиновая с прожилками'],
          ],
          [
            '/plant-profile/orchid-variants/10-purple-mini.webp',
            ['Purple miniature', 'Фиолетовая мини'],
          ],
          [
            '/plant-profile/orchid-variants/11-burgundy-rim.webp',
            ['Burgundy with a white rim', 'Бордовая с белой каймой'],
          ],
        ),
      },
    ),
    10,
  ),
  collectionPlant(
    'cactaceae',
    'echinopsis-sp',
    '/plants/echinopsis-sp-home-photo.webp',
    ['Echinopsis cactus', 'Эхинопсис'],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Give the brightest position available with several hours of direct sun. Acclimatise gradually after winter or relocation so the dark-green skin does not scorch.',
            'Поставьте на самое светлое место с несколькими часами прямого солнца. После зимы или перестановки приучайте к яркому свету постепенно, чтобы тёмно-зелёная кожица не получила ожогов.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'During active growth, water thoroughly only after the mix has dried all the way through, then empty the saucer. In a cool winter rest, keep almost completely dry.',
            'В период активного роста обильно поливайте только после полного просыхания грунта, затем сливайте воду из поддона. Во время прохладной зимовки держите почти полностью сухим.',
          ],
        ],
        [
          ['Humidity', 'Влажность'],
          [
            'Dry room air suits this cactus. It needs ventilation rather than misting; water lingering around the ribs or crown increases the risk of rot.',
            'Кактусу подходит сухой комнатный воздух. Ему важнее проветривание, чем опрыскивание: вода между рёбрами или на верхушке повышает риск гнили.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Keep at 18–30 °C while growing. A bright, dry winter rest around 8–12 °C encourages compact growth and can support future flowering.',
            'Во время роста содержите при 18–30 °C. Светлая сухая зимовка примерно при 8–12 °C помогает сохранить компактную форму и может стимулировать будущее цветение.',
          ],
        ],
      ),
      1,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Cactus family (Cactaceae)', 'Кактусовые (Cactaceae)'],
        ],
        [
          ['Origin', 'Родина'],
          ['South America', 'Южная Америка'],
        ],
        [
          ['Plant type', 'Тип растения'],
          ['Ribbed stem succulent cactus', 'Ребристый стеблевой суккулентный кактус'],
        ],
      ),
      profileFooter(
        [
          [
            'Deep ribs allow the water-storing stem to expand and contract.',
            'Each woolly areole carries a star-shaped cluster of long ivory spines.',
            'Echinopsis flowers are often large and funnel-shaped, but flowering is needed for reliable species identification.',
            'The body can become more columnar as the plant matures.',
          ],
          [
            'Глубокие рёбра позволяют запасающему воду стеблю расширяться и сжиматься.',
            'Из каждой опушённой ареолы растёт звездообразный пучок длинных светлых колючек.',
            'У эхинопсисов часто бывают крупные воронковидные цветки, но для надёжного определения вида нужно увидеть цветение.',
            'С возрастом тело растения может становиться более вытянутым и колонновидным.',
          ],
        ],
        [
          'The long rigid spines can puncture skin. Keep the cactus away from children and pets, and handle it with thick gloves, folded cardboard or tongs that do not crush the ribs.',
          'Длинные жёсткие колючки могут проколоть кожу. Держите кактус вдали от детей и животных, а при пересадке используйте плотные перчатки, сложенный картон или щипцы, которые не сдавливают рёбра.',
        ],
        [
          [
            'A soft, dark or translucent base — stop watering and inspect immediately for rot.',
            'A narrow pale top — move gradually to stronger light; this is stretched growth and will not widen later.',
            'White cottony deposits or small brown shields — isolate and check for mealybugs or scale insects.',
          ],
          [
            'Мягкое, потемневшее или полупрозрачное основание — прекратите полив и сразу проверьте растение на гниль.',
            'Узкая бледная верхушка — постепенно переставьте на более яркий свет; вытянувшаяся часть уже не станет шире.',
            'Белые ватные комочки или мелкие коричневые щитки — изолируйте растение и проверьте на мучнистого червеца или щитовку.',
          ],
        ],
        [
          'When a basal offset is large enough, detach it with a sterile blade or gentle twist. Let the cut dry and callus for several days, then place the offset on dry gritty mix. Begin light watering only after roots start to form.',
          'Когда прикорневая детка достаточно подрастёт, отделите её стерильным лезвием или аккуратным поворотом. Подсушите срез несколько дней до образования каллуса, затем поставьте детку на сухой минеральный субстрат. Начинайте понемногу поливать только после появления корней.',
        ],
      ),
      'Echinopsis sp.',
      [
        'The exact species of this cactus is still a small mystery. Its dark body, strongly sculpted ribs and unusually long pale spines already make it distinctive; the first flower may provide the clue needed for a more precise identification.',
        'Точный вид этого кактуса пока остаётся небольшой загадкой. Тёмный стебель, выразительные рёбра и необычно длинные светлые колючки уже делают его узнаваемым, а первое цветение может дать подсказку для более точного определения.',
      ],
      [
        'This Echinopsis-type cactus has a dark-green ribbed body, woolly areoles and long ivory spines. Its rounded young form gradually becomes more columnar, while the fleshy stem stores water for dry periods.',
        'Этот кактус из группы эхинопсисов отличается тёмно-зелёным ребристым стеблем, опушёнными ареолами и длинными светлыми колючками. Молодая округлая форма постепенно становится более колонновидной, а мясистый стебель запасает воду на сухие периоды.',
      ],
      quickFacts(
        ['Slow to moderate', 'Медленный или умеренный'],
        ['Often 20–80 cm indoors', 'Часто 20–80 см в комнате'],
      ),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use a very fast-draining mix with roughly 60–70% mineral material such as pumice, lava grit, coarse sand or fine gravel and 30–40% cactus compost.',
            'Используйте очень быстро просыхающую смесь: примерно 60–70% минеральных компонентов — пемзы, лавовой крошки, крупного песка или мелкого гравия — и 30–40% грунта для кактусов.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Repot in spring every 2–3 years into a pot with a drainage hole, only slightly wider than the root system. Wait about a week before the first watering.',
            'Пересаживайте весной раз в 2–3 года в горшок с дренажным отверстием, лишь немного шире корневой системы. После пересадки подождите около недели до первого полива.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'From late spring to August, use a low-nitrogen cactus fertiliser at half strength about once a month. Do not feed during the winter rest.',
            'С конца весны до августа примерно раз в месяц используйте половинную дозу удобрения для кактусов с низким содержанием азота. Во время зимнего покоя не подкармливайте.',
          ],
        ],
        [
          ['Flowering', 'Цветение'],
          [
            'Strong summer light and a cool, dry winter rest give the best chance of buds. Once buds appear, avoid repeatedly rotating or relocating the pot.',
            'Яркий летний свет и прохладная сухая зимовка дают лучшие шансы на появление бутонов. После их формирования не поворачивайте и не переставляйте горшок без необходимости.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/echinopsis-important.webp',
        propagationImage: '/plant-profile/echinopsis-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'cactaceae',
    'epiphyllum-oxypetalum',
    '/plants/epiphyllum-oxypetalum-home-photo.webp',
    ['Queen of the night cactus', 'Эпифиллум остролепестный'],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Give bright diffused light with a little gentle morning or evening sun. Protect the flat stems from harsh midday rays, especially while the recovering plant is adapting to a new position.',
            'Обеспечьте яркий рассеянный свет и немного мягкого утреннего или вечернего солнца. Защищайте плоские побеги от жёстких полуденных лучей, особенно пока восстанавливающееся растение привыкает к новому месту.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Water thoroughly after roughly the upper half of the airy mix has dried, then drain all excess. Keep it slightly more evenly moist during active summer growth, but never leave the roots standing in water.',
            'Поливайте обильно после просыхания примерно верхней половины воздушного субстрата и полностью сливайте лишнюю воду. Во время активного летнего роста поддерживайте чуть более равномерную влажность, но не оставляйте корни в воде.',
          ],
        ],
        [
          ['Humidity and air', 'Влажность и воздух'],
          [
            'Average to moderately high room humidity suits this forest cactus. Gentle air movement is essential after watering; avoid keeping water on damaged tips and around the base.',
            'Этому лесному кактусу подходит средняя или умеренно высокая комнатная влажность. После полива особенно важно лёгкое движение воздуха; не оставляйте воду на повреждённых кончиках и у основания.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Keep at about 18–27 °C during growth and above 12–15 °C in winter. Stable conditions without cold draughts help weakened roots and stems recover.',
            'В период роста содержите примерно при 18–27 °C, а зимой — выше 12–15 °C. Стабильные условия без холодных сквозняков помогают ослабленным корням и побегам восстановиться.',
          ],
        ],
      ),
      3,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Cactus family (Cactaceae)', 'Кактусовые (Cactaceae)'],
        ],
        [
          ['Origin', 'Родина'],
          ['Central Mexico to Nicaragua', 'Центральная Мексика — Никарагуа'],
        ],
        [
          ['Plant type', 'Тип растения'],
          ['Succulent tropical epiphyte', 'Суккулентный тропический эпифит'],
        ],
      ),
      profileFooter(
        [
          [
            'Its leaf-like ribbons are flattened green stems called cladodes, not true leaves.',
            'Mature plants can open very large fragrant white flowers at night, often for only one evening.',
            'It is a forest epiphyte rather than a desert cactus, so it prefers an airy organic mix and filtered light.',
            'Small areoles along the stem margins reveal its relationship to other cacti.',
          ],
          [
            'Похожие на листья ленты — это уплощённые зелёные стебли, или кладодии, а не настоящие листья.',
            'Взрослое растение способно раскрывать ночью очень крупные ароматные белые цветки, часто всего на один вечер.',
            'Это лесной эпифит, а не пустынный кактус, поэтому ему нужны воздушный органический субстрат и рассеянный свет.',
            'Маленькие ареолы по краям побегов выдают его родство с другими кактусами.',
          ],
        ],
        [
          'Soft brown tissue must not remain wet. Cut a spreading rotten tip back to firm green tissue with a sterile tool, dust or dry the cut and keep it dry until callused. Standing water around oxygen-starved roots can restart rot.',
          'Мягкие коричневые ткани нельзя оставлять мокрыми. Распространяющуюся гниль на кончике срежьте стерильным инструментом до плотной зелёной ткани, присыпьте или подсушите срез и не мочите его до образования каллуса. Застой воды вокруг лишённых кислорода корней может снова вызвать гниль.',
        ],
        [
          [
            'Tips become soft, translucent or spread brown tissue — cut back to healthy green tissue and keep the wound dry.',
            'Flat stems wrinkle while the mix is wet — inspect the roots for rot instead of adding more water.',
            'Long thin pale growth — move gradually to brighter diffused light.',
            'White cottony deposits or brown shields — inspect areoles and stem joints for mealybugs or scale.',
          ],
          [
            'Кончики размягчаются, становятся полупрозрачными или коричневая ткань распространяется — срежьте до здоровой зелени и держите ранку сухой.',
            'Плоские побеги сморщиваются при мокром грунте — вместо нового полива проверьте корни на гниль.',
            'Новые побеги длинные, тонкие и бледные — постепенно переставьте растение на более яркий рассеянный свет.',
            'Появились белые ватные комочки или коричневые щитки — проверьте ареолы и места соединения побегов на червеца и щитовку.',
          ],
        ],
        [
          'Cut a healthy flat segment about 15–20 cm long and let the cut end dry for 3–7 days. Insert it only a few centimetres into a barely moist airy mix, support it upright and begin normal watering after roots and fresh growth appear.',
          'Срежьте здоровый плоский сегмент длиной около 15–20 см и подсушивайте срез 3–7 дней. Заглубите его всего на несколько сантиметров в едва влажный воздушный субстрат, закрепите вертикально и переходите к обычному поливу после появления корней и нового роста.',
        ],
      ),
      'Epiphyllum oxypetalum',
      [
        'I brought this plant home from my mother. For several years it had lived simply in water, and by the time I took it the ends of some segments had already begun to rot. Now it has moved into an airy mineral mix, and I hope that stable care, patience and fresh growth will help it recover.',
        'Это растение я забрала у мамы. Несколько лет оно простояло просто в воде, и к моменту переезда кончики некоторых побегов уже начали подгнивать. Теперь эпифиллум растёт в воздушном минеральном субстрате, и я надеюсь, что стабильный уход, терпение и новый рост помогут ему восстановиться.',
      ],
      [
        'Epiphyllum oxypetalum is a tropical epiphytic cactus with long arching, flattened green stems. Mature specimens are famous for enormous fragrant white flowers that open after dark, giving the plant its popular name “queen of the night”.',
        'Эпифиллум остролепестный — тропический эпифитный кактус с длинными дуговидными уплощёнными зелёными побегами. Взрослые растения знамениты огромными ароматными белыми цветками, раскрывающимися после наступления темноты, за что вид называют «царицей ночи».',
      ],
      quickFacts(['Moderate', 'Умеренный'], ['Trailing stems 1–3 m', 'Свисающие побеги 1–3 м']),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use a very airy epiphytic mix: about 40% fine orchid bark, 30% light houseplant substrate or coco coir, 20% perlite or pumice and 10% horticultural charcoal.',
            'Используйте очень воздушную смесь для эпифитов: примерно 40% мелкой коры для орхидей, 30% лёгкого грунта или кокосового волокна, 20% перлита или пемзы и 10% древесного угля.',
          ],
        ],
        [
          ['Recovery and repotting', 'Восстановление и пересадка'],
          [
            'After years in water, inspect and remove only soft hollow roots, keeping every firm living root. Use a small pot with drainage, keep the crown above the mix and avoid another repot until fresh roots or stems appear.',
            'После нескольких лет в воде удалите только мягкие и пустые корни, сохраняя все плотные живые. Посадите в небольшой горшок с дренажом, не заглубляйте основание и не пересаживайте снова до появления свежих корней или побегов.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'Wait for clear new growth before feeding a recovering plant. Afterwards, from spring to late summer use a balanced or bloom fertiliser at quarter to half strength every 4 weeks.',
            'Не подкармливайте восстанавливающееся растение до появления заметного нового роста. Затем с весны до конца лета раз в 4 недели используйте четверть или половину дозы сбалансированного удобрения либо состава для цветущих.',
          ],
        ],
        [
          ['Support and flowering', 'Опора и цветение'],
          [
            'Let mature stems trail from a stable raised pot or tie them loosely to a broad support. Bright filtered light, maturity and a slightly cooler, drier winter rest improve the chance of buds.',
            'Позвольте взрослым побегам свободно свисать из устойчивого высокого кашпо или мягко закрепите их на широкой опоре. Яркий рассеянный свет, зрелость растения и чуть более прохладный сухой зимний период повышают шанс цветения.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/epiphyllum-oxypetalum-important.webp',
        propagationImage: '/plant-profile/epiphyllum-oxypetalum-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'cactaceae',
    'hatiora-salicornoides',
    '/plants/hatiora-salicornoides-home-photo.webp',
    ['Bottle cactus', 'Хатиора солеросовидная'],
    simplePlantProfile({
      assets: {
        importantImage: '/plant-profile/hatiora-salicornoides-important.webp',
        propagationImage: '/plant-profile/hatiora-salicornoides-propagation.webp',
      },
      difficulty: 2,
      facts: [
        [
          'Hatiora salicornoides is an accepted species native to eastern and southern Brazil.',
          'The green bottle-shaped segments are jointed stems that photosynthesise in place of true leaves.',
          'It grows naturally as an epiphyte on trees or as a lithophyte on rocks.',
          'A mature plant may produce small yellow to orange funnel-shaped flowers at the stem tips.',
        ],
        [
          'Хатиора солеросовидная — признанный вид, происходящий из восточной и южной Бразилии.',
          'Зелёные бутылковидные членики — это соединённые стебли, которые фотосинтезируют вместо настоящих листьев.',
          'В природе она растёт как эпифит на деревьях или как литофит на камнях.',
          'Взрослое растение может образовывать на концах побегов небольшие жёлтые или оранжевые воронковидные цветки.',
        ],
      ],
      family: ['Cactus family (Cactaceae)', 'Кактусовые (Cactaceae)'],
      feeding: [
        'From spring to early autumn, feed monthly with a balanced or epiphytic-cactus fertiliser at half strength. Pause during the cooler, darker rest period.',
        'С весны до начала осени раз в месяц подкармливайте половинной дозой сбалансированного удобрения или состава для эпифитных кактусов. В прохладный тёмный период сделайте паузу.',
      ],
      growth: ['Moderate', 'Умеренный'],
      height: ['Usually about 20–40 cm indoors', 'Обычно около 20–40 см в комнате'],
      humidity: [
        'Average to moderately high room humidity is suitable. Gentle airflow is more useful than frequent misting, especially around the dense crown.',
        'Подходит обычная или умеренно высокая комнатная влажность. Лёгкое движение воздуха полезнее частых опрыскиваний, особенно внутри густой кроны.',
      ],
      important: [
        'This is a forest epiphytic cactus, not a desert cactus. Its roots need a small pot, a drainage hole and a loose bark-rich mix; dense wet peat quickly causes rot.',
        'Это лесной эпифитный, а не пустынный кактус. Его корням нужны небольшой горшок, дренажное отверстие и рыхлый субстрат с корой; плотный мокрый торф быстро вызывает гниль.',
      ],
      latinName: 'Hatiora salicornoides (Haw.) Britton & Rose',
      light: [
        'Give bright diffused light with a little gentle morning or evening sun. Harsh midday rays behind glass can bleach or scorch the green segments.',
        'Обеспечьте яркий рассеянный свет и немного мягкого утреннего или вечернего солнца. Жёсткие полуденные лучи через стекло могут обесцветить или обжечь зелёные членики.',
      ],
      notes: [
        'My hatiora has already formed a broad dense crown with many fresh green tips. The young segments continue to branch actively and gradually make the crown fuller.',
        'Моя хатиора уже сформировала широкую густую крону со множеством свежих зелёных кончиков. Молодые членики продолжают активно ветвиться и постепенно делают крону ещё пышнее.',
      ],
      origin: ['Eastern and southern Brazil', 'Восточная и южная Бразилия'],
      overview: [
        'Hatiora salicornoides is a densely branching epiphytic cactus whose narrow glossy segments resemble tiny bottles or coral branches. The upright young growth gradually arches outward and creates a loose sculptural crown.',
        'Хатиора солеросовидная — густо ветвящийся эпифитный кактус, чьи узкие глянцевые членики напоминают маленькие бутылочки или ветви коралла. Молодые побеги растут вверх, а затем постепенно отклоняются наружу и образуют свободную скульптурную крону.',
      ],
      plantType: [
        'Evergreen epiphytic or lithophytic cactus',
        'Вечнозелёный эпифитный или литофитный кактус',
      ],
      problems: [
        [
          'Soft yellowing segments or a dark stem base — stop watering and inspect for rot.',
          'Thin pale new segments — move gradually to brighter diffused light.',
          'Wrinkled segments in dry substrate — water thoroughly and let all excess drain.',
          'White cottony clusters at the joints — isolate and inspect for mealybugs.',
        ],
        [
          'Членики желтеют и размягчаются, а основание темнеет — прекратите полив и проверьте растение на гниль.',
          'Новые членики тонкие и бледные — постепенно добавьте яркого рассеянного света.',
          'Членики сморщились при сухом субстрате — хорошо полейте и дайте всей лишней воде стечь.',
          'В местах соединения появились белые ватные комочки — изолируйте растение и проверьте на мучнистого червеца.',
        ],
      ],
      propagation: [
        'Twist or cut off a healthy branched section with several joints. Let the cut end dry for one or two days, then insert it shallowly into a barely moist airy epiphytic-cactus mix and keep warm in bright diffused light.',
        'Открутите или срежьте здоровую разветвлённую часть с несколькими сочленениями. Подсушите срез один-два дня, затем неглубоко посадите черенок в едва влажный воздушный субстрат для эпифитных кактусов и держите в тепле на ярком рассеянном свету.',
      ],
      repotting: [
        'Repot in spring every 2–3 years or when roots fill the container. Choose a stable pot with drainage only slightly larger than the root ball and keep the stem bases at the same depth.',
        'Пересаживайте весной раз в 2–3 года или когда корни заполнят ёмкость. Выбирайте устойчивый горшок с дренажом лишь немного шире корневого кома и сохраняйте прежнюю глубину посадки стеблей.',
      ],
      secondaryCare: [
        ['Shaping', 'Формирование'],
        [
          'After flowering or during active growth, shorten only the longest outer branches at a joint. Root the removed pieces and rotate the pot periodically for a balanced but natural crown.',
          'После цветения или во время активного роста укорачивайте только самые длинные внешние ветви по месту сочленения. Укореняйте снятые части и периодически поворачивайте горшок, чтобы крона оставалась равномерной, но естественной.',
        ],
      ],
      soil: [
        'Use a loose epiphytic-cactus mix, for example 40% fine orchid bark, 30% light compost or coco and 30% perlite or pumice.',
        'Используйте рыхлую смесь для эпифитных кактусов: например, 40% мелкой орхидейной коры, 30% лёгкого грунта или кокоса и 30% перлита или пемзы.',
      ],
      temperature: [
        'Keep at 18–27 °C during growth and preferably above 12 °C in winter. Protect from cold draughts and chilled wet substrate.',
        'В период роста содержите при 18–27 °C, зимой желательно не ниже 12 °C. Защищайте от холодных сквозняков и сырого переохлаждённого субстрата.',
      ],
      watering: [
        'Water thoroughly after the upper half of the airy mix has dried, then drain completely. Reduce watering in cooler low-light months without leaving the root ball dry for many weeks.',
        'Хорошо поливайте после просыхания верхней половины воздушного субстрата, затем полностью сливайте лишнюю воду. В прохладные тёмные месяцы поливайте реже, но не оставляйте корневой ком сухим на много недель.',
      ],
    }),
  ),
  collectionPlant(
    'cycadaceae',
    'cycas-revoluta',
    '/plants/cycas-revoluta-home-photo.webp',
    ['Sago palm', 'Цикас поникающий'],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Give very bright diffused light with a few hours of gentle morning or evening sun. Rotate the pot between growth flushes, but do not move it while soft new fronds are unfolding.',
            'Обеспечьте очень яркий рассеянный свет и несколько часов мягкого утреннего или вечернего солнца. Поворачивайте горшок между волнами роста, но не переставляйте его, пока раскрываются мягкие молодые листья.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Let at least the upper third of the mix dry, then water thoroughly and drain all excess. Keep water away from the crown and never leave the roots standing in a wet saucer.',
            'Давайте просохнуть как минимум верхней трети грунта, затем хорошо проливайте и полностью сливайте лишнюю воду. Не лейте воду в центр розетки и не оставляйте корни в мокром поддоне.',
          ],
        ],
        [
          ['Humidity', 'Влажность'],
          [
            'Average room humidity is enough. Good air movement and clean leaves are more important than misting; moisture trapped in the crown can cause rot.',
            'Обычной комнатной влажности достаточно. Хорошее движение воздуха и чистые листья важнее опрыскиваний: влага, задержавшаяся в центре розетки, может вызвать гниль.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Keep at 18–27 °C during active growth. Protect from cold draughts and prolonged temperatures below 10–12 °C.',
            'В период активного роста содержите при 18–27 °C. Берегите от холодных сквозняков и длительного понижения температуры ниже 10–12 °C.',
          ],
        ],
      ),
      2,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Cycad family (Cycadaceae)', 'Саговниковые (Cycadaceae)'],
        ],
        [
          ['Origin', 'Родина'],
          ['Southern Japan and Fujian, China', 'Юг Японии и провинция Фуцзянь в Китае'],
        ],
        [
          ['Plant type', 'Тип растения'],
          ['Evergreen gymnosperm cycad', 'Вечнозелёный голосеменной саговник'],
        ],
      ),
      profileFooter(
        [
          [
            'Despite its common name, it is not a true palm but an ancient cycad.',
            'New fronds emerge as a tight upright flush and slowly unfold into a crown.',
            'Growth is very slow, and long pauses between new flushes are normal.',
            'Rigid pinnate fronds grow from a thick, textured caudex.',
          ],
          [
            'Несмотря на распространённое название, это не настоящая пальма, а древний саговник.',
            'Новые листья появляются плотным вертикальным пучком и постепенно раскрываются в крону.',
            'Цикас растёт очень медленно, и долгие паузы между волнами роста для него нормальны.',
            'Жёсткие перистые листья растут из толстого фактурного каудекса.',
          ],
        ],
        [
          'Every part of the plant is highly toxic if swallowed, and the seeds are especially dangerous. Keep it completely out of reach of children and pets; if ingestion is suspected, contact a veterinarian or poison service immediately.',
          'Все части растения очень ядовиты при проглатывании, особенно опасны семена. Держите цикас в полностью недоступном для детей и животных месте; при подозрении на проглатывание немедленно обратитесь к ветеринару или в токсикологическую службу.',
        ],
        [
          [
            'Yellowing, soft lower fronds with wet soil — reduce watering and inspect the roots for rot.',
            'Pale, stretched or distorted new growth — the plant lacked stable bright light during the flush.',
            'White or brown scales on fronds and stems — isolate the plant and inspect closely for scale insects.',
          ],
          [
            'Желтеющие мягкие нижние листья при мокром грунте — сократите полив и проверьте корни на гниль.',
            'Бледный, вытянутый или искривлённый молодой прирост — во время раскрытия листьям не хватало стабильного яркого света.',
            'Белые или коричневые щитки на листьях и черешках — изолируйте растение и внимательно проверьте его на щитовку.',
          ],
        ],
        [
          'Separate a basal offset only when it is large enough to have stored energy. Cut it away with a sterile blade, let the wound dry for one to two days, then set it in a coarse, barely moist mix in warmth and bright diffused light. Seed propagation is possible but very slow.',
          'Отделяйте прикорневую детку только тогда, когда она достаточно выросла и накопила силы. Срежьте её стерильным лезвием, подсушите ранку один-два дня, затем посадите в крупнозернистый едва влажный субстрат и держите в тепле при ярком рассеянном свете. Размножение семенами возможно, но занимает много времени.',
        ],
      ),
      'Cycas revoluta',
      [
        'The most striking moment is a new flush: tightly rolled upright fronds slowly open into a fresh symmetrical crown. Its measured pace makes every new leaf feel significant.',
        'Самый впечатляющий момент — новая волна роста: туго свёрнутые вертикальные листья постепенно раскрываются в свежую симметричную крону. Из-за неторопливого роста каждый новый лист ощущается настоящим событием.',
      ],
      [
        'Sago palm is a compact, exceptionally slow-growing cycad with stiff dark-green pinnate fronds and a rough caudex. Its architectural crown gives the plant the appearance of a miniature palm.',
        'Цикас поникающий — компактный и исключительно медленно растущий саговник с жёсткими тёмно-зелёными перистыми листьями и фактурным каудексом. Архитектурная крона делает его похожим на миниатюрную пальму.',
      ],
      quickFacts(
        ['Very slow', 'Очень медленный'],
        ['Usually 60–150 cm indoors', 'Обычно 60–150 см в комнате'],
      ),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use a coarse, fast-draining mix: about 50% cactus or light houseplant compost, 30% pumice or perlite and 20% fine bark or grit.',
            'Используйте крупнозернистую быстро просыхающую смесь: примерно 50% грунта для кактусов или лёгкого грунта для комнатных растений, 30% пемзы или перлита и 20% мелкой коры или гравия.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Repot only every 3–4 years into a stable pot with drainage. Keep the caudex above the substrate and disturb the fleshy roots as little as possible.',
            'Пересаживайте только раз в 3–4 года в устойчивый горшок с дренажными отверстиями. Оставляйте каудекс над поверхностью грунта и как можно меньше тревожьте мясистые корни.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'From spring to late summer, feed once a month at half strength. Do not fertilise dry soil or a plant that is resting without active growth.',
            'С весны до конца лета подкармливайте раз в месяц половинной дозой. Не вносите удобрение в сухой грунт или во время покоя без активного роста.',
          ],
        ],
        [
          ['Grooming and new growth', 'Уход за кроной и новый рост'],
          [
            'Remove only fully yellow or brown fronds; green leaves still feed the caudex. Do not touch, tie or reposition the soft new flush until it hardens.',
            'Удаляйте только полностью пожелтевшие или коричневые листья: зелёные продолжают питать каудекс. Не трогайте, не подвязывайте и не переставляйте мягкий молодой прирост, пока он не затвердеет.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/cycas-important.webp',
        propagationImage: '/plant-profile/cycas-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'gesneriaceae',
    'nematanthus-strigillosus',
    '/plants/nematanthus-strigillosus-home-photo.webp',
    ['Small-bristled nematanthus', 'Нематантус мелкощетинистый'],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Bright diffused light with a little gentle morning or evening sun keeps growth compact and supports flowering. Protect the glossy leaves from harsh midday sun.',
            'Яркий рассеянный свет с небольшим количеством мягкого утреннего или вечернего солнца сохраняет куст компактным и помогает цветению. Берегите глянцевые листья от жёсткого полуденного солнца.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Water after the top 2–3 cm of soil dries. Moisten the root ball evenly, drain excess water and let the airy substrate dry slightly before watering again.',
            'Поливайте после просыхания верхних 2–3 см грунта. Равномерно промочите корневой ком, слейте лишнюю воду и дайте воздушному субстрату немного подсохнуть перед следующим поливом.',
          ],
        ],
        [
          ['Humidity', 'Влажность'],
          [
            'Average room humidity of about 40–60% is suitable. Good air movement is more useful than frequent misting, especially while a newly delivered plant adapts.',
            'Подходит обычная комнатная влажность около 40–60%. Хорошее движение воздуха полезнее частых опрыскиваний, особенно пока недавно доставленное растение адаптируется.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Keep at 18–25 °C during active growth and protect from cold glass and draughts. A brighter, slightly cooler winter at 15–18 °C can encourage future flowering.',
            'В период активного роста содержите при 18–25 °C и защищайте от холодного стекла и сквозняков. Более светлая и прохладная зимовка при 15–18 °C может стимулировать будущее цветение.',
          ],
        ],
      ),
      2,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Gesneriad family (Gesneriaceae)', 'Геснериевые (Gesneriaceae)'],
        ],
        [
          ['Origin', 'Происхождение'],
          ['Humid forests of Brazil', 'Влажные леса Бразилии'],
        ],
        [
          ['Plant type', 'Тип растения'],
          [
            'Evergreen branching epiphytic subshrub',
            'Вечнозелёный ветвящийся эпифитный полукустарник',
          ],
        ],
      ),
      profileFooter(
        [
          [
            'Thick glossy leaves grow in opposite pairs along branching stems.',
            'The characteristic orange tubular flowers resemble tiny goldfish.',
            'Pinching young shoots encourages a denser crown and more flowering tips.',
            'The slightly fleshy leaves tolerate brief drying better than constantly wet roots.',
          ],
          [
            'Толстые глянцевые листья расположены попарно на ветвящихся побегах.',
            'Характерные оранжевые трубчатые цветки напоминают маленьких золотых рыбок.',
            'Прищипка молодых побегов помогает сформировать более густую крону и больше цветущих верхушек.',
            'Слегка мясистые листья переносят короткое просыхание лучше, чем постоянно мокрые корни.',
          ],
        ],
        [
          'Keep a marketplace plant separate from the collection for two to three weeks and inspect the undersides of leaves and stem nodes. Existing dry tan patches will not turn green again; watch whether they remain stable. Rapidly spreading, wet or soft spots require isolation and a check of the roots and growing conditions.',
          'Растение с маркетплейса держите отдельно от коллекции две-три недели и осматривайте изнанку листьев и узлы побегов. Уже появившиеся сухие светло-коричневые пятна не позеленеют; важно наблюдать, остаются ли они стабильными. Быстро увеличивающиеся, мокрые или мягкие пятна требуют изоляции и проверки корней и условий содержания.',
        ],
        [
          [
            'Stable dry patches — usually transport, cold or sun damage; monitor the new growth.',
            'Leaves fall while the soil is wet — check for cold exposure and root problems.',
            'Long sparse shoots without flowers — provide brighter diffused light and pinch the tips.',
          ],
          [
            'Стабильные сухие пятна — обычно следствие транспортировки, холода или солнца; наблюдайте за новым ростом.',
            'Листья опадают при влажном грунте — проверьте, не переохладилось ли растение и здоровы ли корни.',
            'Длинные редкие побеги без цветения — обеспечьте более яркий рассеянный свет и прищипните верхушки.',
          ],
        ],
        [
          'Take 6–10 cm terminal cuttings, remove the lower pair of leaves and root the nodes in water or a light, slightly moist mix. Keep warm in bright diffused light; planting several rooted cuttings together creates a fuller pot.',
          'Возьмите верхушечные черенки длиной 6–10 см, удалите нижнюю пару листьев и укорените узлы в воде или лёгкой слегка влажной смеси. Держите в тепле при ярком рассеянном свете; несколько укоренённых черенков в одном горшке образуют более пышный куст.',
        ],
      ),
      'Nematanthus strigillosus',
      [
        'This nematanthus is a completely new plant in my collection. I bought it on a marketplace, so for now I am giving it time to settle in, watching the damaged leaves and waiting for healthy new growth. Its first orange flowers at home are still ahead.',
        'Этот нематантус — совсем новое растение в моей коллекции. Я приобрела его на маркетплейсе, поэтому сейчас даю ему время освоиться, наблюдаю за повреждёнными листьями и жду здорового нового роста. Его первое оранжевое цветение у меня дома ещё впереди.',
      ],
      [
        'Small-bristled nematanthus is a compact Brazilian relative of African violets with branching stems, glossy fleshy leaves and bright orange pouch-shaped flowers. This young specimen is currently adapting after delivery.',
        'Нематантус мелкощетинистый — компактный бразильский родственник сенполий с ветвящимися побегами, глянцевыми мясистыми листьями и яркими оранжевыми цветками-мешочками. Этот молодой экземпляр сейчас адаптируется после доставки.',
      ],
      quickFacts(['Moderate', 'Умеренный'], ['Shoots usually 30–60 cm', 'Побеги обычно 30–60 см']),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use a loose epiphytic mix: about 55% light houseplant compost, 25% fine bark and 20% perlite or pumice. The pot must drain freely.',
            'Используйте рыхлую эпифитную смесь: примерно 55% лёгкого грунта для комнатных растений, 25% мелкой коры и 20% перлита или пемзы. Вода должна свободно уходить из горшка.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Do not rush to repot a new arrival unless the substrate is waterlogged or roots are failing. After quarantine and adaptation, move it into a pot only slightly larger than the root ball.',
            'Не спешите пересаживать новое растение, если грунт не переувлажнён и корни не страдают. После карантина и адаптации перевалите его в горшок лишь немного больше корневого кома.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'After new growth begins, feed every 3–4 weeks from spring to early autumn with half-strength fertiliser for flowering houseplants.',
            'После начала нового роста с весны до начала осени подкармливайте раз в 3–4 недели половинной дозой удобрения для цветущих комнатных растений.',
          ],
        ],
        [
          ['Pruning and flowering', 'Формировка и цветение'],
          [
            'After flowering or during active growth, pinch long shoot tips to encourage branching. Avoid heavy pruning immediately after delivery; first let the plant adapt and produce healthy growth.',
            'После цветения или в период активного роста прищипывайте кончики длинных побегов для ветвления. Не проводите сильную обрезку сразу после доставки: сначала дайте растению адаптироваться и выпустить здоровый прирост.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/nematanthus-important.webp',
        propagationImage: '/plant-profile/nematanthus-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'gesneriaceae',
    'episcia-three-cultivars',
    '/plants/episcia-three-cultivars-home-photo.webp',
    ['Episcias: three cultivars', 'Эписции: три сорта'],
    simplePlantProfile({
      assets: {
        importantImage: '/plant-profile/episcia-three-cultivars-important.webp',
        mainImageVariantIndex: 0,
        propagationImage: '/plant-profile/episcia-three-cultivars-propagation.webp',
        variants: profileVariants(
          ['Three cultivars in my collection', 'Три сорта в моей коллекции'],
          [
            'Each cultivar keeps the same creeping habit but has its own foliage and flowers: lilac blooms over dark pink-veined leaves, red blooms against strawberry foliage, and yellow blooms above the bronze-green Suomi.',
            'У каждого сорта одинаковый стелющийся характер роста, но своя листва и цветение: сиреневые цветки над тёмными листьями с розовыми жилками, красные — на клубничной листве, а жёлтые — у бронзово-зелёной Суоми.',
          ],
          [
            '/plant-profile/episcia-variants/01-lilac-evening.webp',
            ['Lilac Evening', 'Сиреневый вечер'],
          ],
          [
            '/plant-profile/episcia-variants/02-strawberry-haze.webp',
            ['Strawberry Mist', 'Клубничная дымка'],
          ],
          ['/plant-profile/episcia-variants/03-suomi.webp', ['Suomi', 'Суоми']],
        ),
      },
      difficulty: 2,
      facts: [
        [
          'Episcias form two kinds of shoots: compact leafy crowns and long stolons carrying daughter rosettes.',
          'The metallic sheen comes from the quilted surface and fine hairs reflecting light at different angles.',
          'Strawberry Mist blooms red to orange-red, while Suomi is distinguished by creamy yellow flowers with a warm orange centre.',
          'A single shallow pot becomes full quickly when several daughter rosettes are rooted back into the mix.',
        ],
        [
          'Эписции образуют два типа побегов: компактные облиственные розетки и длинные столоны с дочерними розетками.',
          'Металлический блеск создают рельефная поверхность и тонкие волоски, отражающие свет под разными углами.',
          'Клубничная дымка цветёт красными или красно-оранжевыми цветками, а Суоми отличается кремово-жёлтыми цветками с тёплым оранжевым центром.',
          'Неглубокий горшок быстро становится пышным, если укоренять в нём несколько дочерних розеток.',
        ],
      ],
      family: ['Gesneriad family (Gesneriaceae)', 'Геснериевые (Gesneriaceae)'],
      feeding: [
        'From spring to early autumn, feed every 3–4 weeks with half-strength fertiliser for African violets or flowering houseplants. Avoid excess nitrogen, which weakens colour and flowering.',
        'С весны до начала осени подкармливайте раз в 3–4 недели половинной дозой удобрения для сенполий или цветущих растений. Избыток азота ослабляет окраску и цветение.',
      ],
      growth: ['Fast in warmth and good light', 'Быстрый в тепле и при хорошем освещении'],
      height: [
        'Rosettes 10–20 cm; stolons trail farther',
        'Розетки 10–20 см; столоны свисают ниже',
      ],
      humidity: [
        'Aim for about 50–70% humidity with gentle airflow. Do not mist the velvety leaves: trapped droplets can leave marks or encourage rot.',
        'Поддерживайте влажность около 50–70% и лёгкое движение воздуха. Не опрыскивайте бархатистые листья: задержавшиеся капли оставляют пятна и могут вызвать гниль.',
      ],
      important: [
        'Use a shallow pot with a drainage hole and keep the crown above the mix. Water the substrate rather than the fuzzy leaves, and never leave the fine roots standing in water.',
        'Используйте неглубокий горшок с дренажным отверстием и не заглубляйте центр розетки. Поливайте грунт, а не опушённые листья, и не оставляйте тонкие корни в воде.',
      ],
      latinName: 'Episcia cultivars',
      light: [
        'Give bright diffused light with gentle morning or evening sun. Good light intensifies the pink and metallic foliage, but harsh midday sun bleaches and scorches it.',
        'Обеспечьте яркий рассеянный свет с мягким утренним или вечерним солнцем. Хорошее освещение усиливает розовые и металлические оттенки, а жёсткое полуденное солнце обесцвечивает и обжигает листья.',
      ],
      notes: [
        'My collection includes Lilac Evening, Strawberry Mist and Suomi. Their contrasting leaves and different flower colours make the three plants look distinct even though their care and cascading growth habit are similar.',
        'В моей коллекции растут Сиреневый вечер, Клубничная дымка и Суоми. Контрастная листва и разные оттенки цветков делают их непохожими друг на друга, хотя уход и каскадный характер роста у них сходны.',
      ],
      origin: [
        'Cultivated hybrids; the genus comes from tropical Central and South America',
        'Культурные гибриды; род происходит из тропиков Центральной и Южной Америки',
      ],
      overview: [
        'These three evergreen episcias combine velvety metallic foliage, slender stolons and small tubular flowers. As the daughter rosettes grow over the pot edge, each plant develops a loose colourful cascade rather than a rigid upright crown.',
        'Эти три вечнозелёные эписции сочетают бархатистую металлическую листву, тонкие столоны и небольшие трубчатые цветки. Дочерние розетки постепенно спускаются за край горшка, и растение образует свободный цветной каскад, а не строгую вертикальную крону.',
      ],
      plantType: [
        'Evergreen stolon-forming tropical perennial',
        'Вечнозелёный тропический многолетник со столонами',
      ],
      problems: [
        [
          'Long internodes and dull colour — move gradually to brighter diffused light.',
          'Bleached dry patches — protect the foliage from direct midday sun.',
          'A soft crown or blackened stolons — reduce moisture, add airflow and inspect for rot.',
          'White cottony clusters in leaf axils — isolate and check for mealybugs.',
        ],
        [
          'Длинные междоузлия и тусклая окраска — постепенно добавьте яркого рассеянного света.',
          'Выцветшие сухие пятна — защитите листву от прямого полуденного солнца.',
          'Розетка размягчилась или столоны почернели — сократите полив, добавьте движение воздуха и проверьте растение на гниль.',
          'В пазухах появились белые ватные комочки — изолируйте растение и проверьте на мучнистого червеца.',
        ],
      ],
      propagation: [
        'Pin a healthy daughter rosette on its stolon to lightly moist airy mix. Once it roots, cut the connection to the parent. Stem-tip cuttings with two or three nodes also root readily in warmth.',
        'Прижмите здоровую дочернюю розетку на столоне к слегка влажному воздушному субстрату. После укоренения отделите её от материнского растения. Верхушечные черенки с двумя-тремя узлами тоже легко укореняются в тепле.',
      ],
      repotting: [
        'Repot in spring when runners crowd the pot or roots fill it. Choose a shallow container only slightly wider than the root system and keep the crowns at their original depth.',
        'Пересаживайте весной, когда розеткам становится тесно или корни заполняют горшок. Выбирайте неглубокую ёмкость лишь немного шире корневой системы и сохраняйте прежнюю глубину розеток.',
      ],
      secondaryCare: [
        ['Shaping and flowering', 'Формировка и цветение'],
        [
          'Let a few stolons trail naturally and pin others back into the pot for fullness. Pinch bare tips, remove ageing leaves and rotate the pot occasionally; do not force the plant into a perfectly even dome.',
          'Позвольте части столонов свободно свисать, а остальные укореняйте в том же горшке для пышности. Прищипывайте оголённые концы, удаляйте стареющие листья и иногда поворачивайте горшок, не пытаясь формировать идеально ровный шар.',
        ],
      ],
      soil: [
        'Use a light moisture-retentive mix: about 55% African-violet or fine houseplant compost, 25% perlite and 20% fine orchid bark or chopped sphagnum.',
        'Используйте лёгкую влагоёмкую смесь: около 55% грунта для сенполий или мелкого грунта для комнатных растений, 25% перлита и 20% мелкой коры либо нарезанного сфагнума.',
      ],
      temperature: [
        'Keep at 20–27 °C, preferably never below 16–18 °C. Protect the soft growth from cold glass, draughts and abrupt temperature changes.',
        'Содержите при 20–27 °C, желательно не ниже 16–18 °C. Защищайте нежный прирост от холодного стекла, сквозняков и резких перепадов температуры.',
      ],
      watering: [
        'Water when the top 1–2 cm of mix has dried, keeping the fine root ball lightly and evenly moist during active growth. Use lukewarm soft water and drain the saucer completely.',
        'Поливайте после просыхания верхних 1–2 см грунта, во время активного роста сохраняя тонкий корневой ком слегка и равномерно влажным. Используйте мягкую тёплую воду и полностью сливайте её из поддона.',
      ],
    }),
    3,
  ),
  collectionPlant(
    'gesneriaceae',
    'sinningia-speciosa',
    '/plant-profile/gloxinia-cover-portrait.webp',
    ["Florist's gloxinia", 'Глоксиния'],
    plantProfile(
      careCards(
        [
          ['Light', 'Освещение'],
          [
            'Give bright indirect light without harsh midday sun, which can scorch the soft leaves.',
            'Нужен яркий рассеянный свет без жёсткого полуденного солнца, которое может обжечь нежные листья.',
          ],
        ],
        [
          ['Watering', 'Полив'],
          [
            'Keep the mix consistently moist during active growth, but never waterlog it. Water around the edge of the pot rather than into the crown.',
            'В период активного роста поддерживайте грунт равномерно влажным, но не заболоченным. Поливайте по краю горшка, не попадая в центр розетки.',
          ],
        ],
        [
          ['Humidity', 'Влажность'],
          [
            'Moderate humidity with good air movement is ideal. Do not mist the velvety leaves and flowers.',
            'Лучше всего подходит умеренная влажность при хорошем движении воздуха. Не опрыскивайте бархатистые листья и цветы.',
          ],
        ],
        [
          ['Temperature', 'Температура'],
          [
            'Keep warm while growing. After flowering, a dormant tuber can rest cool at about 16–18°C.',
            'Во время роста держите в тепле. После цветения клубень может отдыхать в прохладе примерно при 16–18 °C.',
          ],
        ],
      ),
      3,
      profileFacts(
        [
          ['Family', 'Семейство'],
          ['Gesneriad family (Gesneriaceae)', 'Геснериевые (Gesneriaceae)'],
        ],
        [
          ['Origin', 'Родина'],
          ['Brazil', 'Бразилия'],
        ],
        [
          ['Plant type', 'Тип растения'],
          ['Tuberous flowering perennial', 'Клубневый цветущий многолетник'],
        ],
      ),
      profileFooter(
        [
          [
            'The large velvety flowers can be single or double.',
            'Modern hybrids bloom in white, pink, red, purple and many contrasting patterns.',
            'The soft scalloped leaves form a compact rosette.',
            'After flowering, the plant can enter a natural dormant period.',
          ],
          [
            'Крупные бархатистые цветки бывают простыми и махровыми.',
            'Современные гибриды цветут белыми, розовыми, красными и фиолетовыми цветами с самыми разными узорами.',
            'Мягкие зубчатые листья образуют компактную розетку.',
            'После цветения растение может уйти в естественный период покоя.',
          ],
        ],
        [
          'Avoid overhead watering: moisture trapped in the crown or on velvety foliage increases the risk of crown rot and grey mould.',
          'Не поливайте сверху: вода в центре розетки и на бархатистой листве повышает риск загнивания и серой гнили.',
        ],
        [
          [
            'Bud drop — check for cold drafts, dry soil or sudden changes.',
            'Brown patches — protect from direct sun and wet foliage.',
            'Soft crown or tuber — stop watering and inspect immediately for rot.',
          ],
          [
            'Бутоны опадают — проверьте, нет ли сквозняка, пересушки или резкой смены условий.',
            'Коричневые пятна — защитите от прямого солнца и не мочите листву.',
            'Розетка или клубень стали мягкими — прекратите полив и сразу проверьте растение на гниль.',
          ],
        ],
        [
          'In spring, root a healthy mature leaf with its petiole in a light, slightly moist mix. Gloxinia can also be propagated by dividing a large tuber with a growing point on each section.',
          'Весной укореняйте здоровый взрослый лист с черешком в лёгком, слегка влажном субстрате. Крупный клубень также можно делить, оставляя на каждой части точку роста.',
        ],
      ),
      'Sinningia speciosa',
      [
        'My gloxinia collection is especially dear to me: it includes many colours, contrasting rims, speckled throats and double flowers.',
        'Глоксинии занимают особое место в моей коллекции: у меня много расцветок — с контрастной каймой, крапом, светлым горлом и махровыми цветами.',
      ],
      [
        "Florist's gloxinia is a Brazilian tuberous perennial related to African violets. Its compact rosette carries spectacular bell-shaped flowers above soft velvety leaves.",
        'Глоксиния — бразильский клубневый многолетник, родственник сенполии. Над компактной розеткой мягких бархатистых листьев раскрываются эффектные колокольчатые цветы.',
      ],
      quickFacts(['Moderate', 'Умеренный'], ['Rosette 15–30 cm', 'Розетка 15–30 см']),
      careCards(
        [
          ['Soil', 'Грунт'],
          [
            'Use a light, moisture-retentive but well-drained mix: 70% peat-free African-violet or houseplant compost, 20% perlite and 10% vermiculite.',
            'Используйте лёгкую, влагоёмкую, но хорошо дренированную смесь: 70% безторфяного грунта для сенполий или комнатных растений, 20% перлита и 10% вермикулита.',
          ],
        ],
        [
          ['Repotting', 'Пересадка'],
          [
            'Repot the tuber as new growth begins, placing it shallowly with the top close to the surface.',
            'Пересаживайте клубень с началом нового роста, размещая его неглубоко, почти у поверхности грунта.',
          ],
        ],
        [
          ['Feeding', 'Подкормки'],
          [
            'During leaf and flower growth, feed every two weeks with a complete liquid fertiliser for flowering houseplants at half strength. Stop during dormancy.',
            'Во время роста листьев и цветения подкармливайте раз в две недели полным жидким удобрением для цветущих растений в половинной дозировке. В период покоя не подкармливайте.',
          ],
        ],
        [
          ['Dormancy & grooming', 'Покой и уход'],
          [
            'Remove spent flowers. After flowering, gradually reduce watering as the foliage dies back; resume regular care only when the tuber sprouts again.',
            'Удаляйте увядшие цветы. После цветения постепенно сокращайте полив по мере отмирания листьев; вернитесь к обычному уходу только с появлением новых ростков.',
          ],
        ],
      ),
      {
        importantImage: '/plant-profile/gloxinia-important.webp',
        propagationImage: '/plant-profile/gloxinia-propagation.webp',
        variants: {
          ...profileVariants(
            ['My collection of colours', 'Моя коллекция расцветок'],
            [
              'Gloxinias can look completely different while sharing the same velvety leaves and generous flowering. Here are the distinct colours and flower forms that have bloomed in my collection.',
              'Глоксинии могут выглядеть совершенно по-разному, сохраняя бархатистую листву и щедрое цветение. Здесь собраны разные расцветки и формы цветка, которые цвели в моей коллекции.',
            ],
            [
              '/plant-profile/gloxinia-variants/01-lilac-twilight.webp',
              ['Lilac Twilight', 'Сиреневые Сумерки'],
            ],
            [
              '/plant-profile/gloxinia-variants/02-ruby-heart.webp',
              ['Ruby Heart', 'Рубиновое Сердце'],
            ],
            [
              '/plant-profile/gloxinia-variants/03-pink-cloud.webp',
              ['Pink Cloud', 'Розовое Облако'],
            ],
            [
              '/plant-profile/gloxinia-variants/04-amethyst-dust.webp',
              ['Amethyst Dust', 'Аметистовая Пыль'],
            ],
            [
              '/plant-profile/gloxinia-variants/05-powder-dawn.webp',
              ['Powder Dawn', 'Пудровый Рассвет'],
            ],
            [
              '/plant-profile/gloxinia-variants/06-lavender-dawn.webp',
              ['Lavender Dawn', 'Лавандовый Рассвет'],
            ],
            [
              '/plant-profile/gloxinia-variants/07-velvet-night.webp',
              ['Velvet Night', 'Бархатная Ночь'],
            ],
            [
              '/plant-profile/gloxinia-variants/08-raspberry-sprinkle.webp',
              ['Raspberry Sprinkle', 'Малиновая Россыпь'],
            ],
            [
              '/plant-profile/gloxinia-variants/09-porcelain-pearl.webp',
              ['Porcelain Pearl', 'Фарфоровая Жемчужина'],
            ],
            [
              '/plant-profile/gloxinia-variants/10-violet-lace.webp',
              ['Violet Lace', 'Фиалковое Кружево'],
            ],
            [
              '/plant-profile/gloxinia-variants/11-carmine-crown.webp',
              ['Carmine Crown', 'Карминовая Корона'],
            ],
            [
              '/plant-profile/gloxinia-variants/12-pearl-veil.webp',
              ['Pearl Veil', 'Жемчужная Вуаль'],
            ],
            [
              '/plant-profile/gloxinia-variants/13-raspberry-heart.webp',
              ['Raspberry Heart', 'Малиновое Сердце'],
            ],
            [
              '/plant-profile/gloxinia-variants/14-royal-velvet.webp',
              ['Royal Velvet', 'Королевский Бархат'],
            ],
            [
              '/plant-profile/gloxinia-variants/15-amethyst-constellation.webp',
              ['Amethyst Constellation', 'Созвездие Аметиста'],
            ],
            [
              '/plant-profile/gloxinia-variants/16-garnet-flame.webp',
              ['Garnet Flame', 'Гранатовое Пламя'],
            ],
            ['/plant-profile/gloxinia-variants/17-snow-veil.webp', ['Snow Veil', 'Снежная Вуаль']],
            ['/plant-profile/gloxinia-variants/18-pink-opal.webp', ['Pink Opal', 'Розовый Опал']],
            [
              '/plant-profile/gloxinia-variants/19-lavender-lace.webp',
              ['Lavender Lace', 'Лавандовое Кружево'],
            ],
            [
              '/plant-profile/gloxinia-variants/20-ink-constellation.webp',
              ['Ink Constellation', 'Чернильное Созвездие'],
            ],
            [
              '/plant-profile/gloxinia-variants/21-amethyst-night.webp',
              ['Amethyst Night', 'Аметистовая Ночь'],
            ],
            [
              '/plant-profile/gloxinia-variants/22-ruby-velvet.webp',
              ['Ruby Velvet', 'Рубиновый Бархат'],
            ],
            [
              '/plant-profile/gloxinia-variants/23-pearl-dawn.webp',
              ['Pearl Dawn', 'Жемчужный Рассвет'],
            ],
            [
              '/plant-profile/gloxinia-variants/24-violet-symphony.webp',
              ['Violet Symphony', 'Фиолетовая Симфония'],
            ],
            [
              '/plant-profile/gloxinia-variants/25-peony-watercolor.webp',
              ['Peony Watercolor', 'Пионовая Акварель'],
            ],
            [
              '/plant-profile/gloxinia-variants/26-twilight-viola.webp',
              ['Twilight Viola', 'Сумеречная Виола'],
            ],
            [
              '/plant-profile/gloxinia-variants/27-carmine-velvet.webp',
              ['Carmine Velvet', 'Карминовый Бархат'],
            ],
            [
              '/plant-profile/gloxinia-variants/28-midnight-amethyst.webp',
              ['Midnight Amethyst', 'Полночный Аметист'],
            ],
            [
              '/plant-profile/gloxinia-variants/29-amethyst-waltz.webp',
              ['Amethyst Waltz', 'Аметистовый Вальс'],
            ],
            [
              '/plant-profile/gloxinia-variants/30-lilac-mirage.webp',
              ['Lilac Mirage', 'Сиреневый Мираж'],
            ],
            [
              '/plant-profile/gloxinia-variants/31-raspberry-peony.webp',
              ['Raspberry Peony', 'Малиновый Пион'],
            ],
            [
              '/plant-profile/gloxinia-variants/32-strawberry-confetti.webp',
              ['Strawberry Confetti', 'Земляничное Конфетти'],
            ],
            [
              '/plant-profile/gloxinia-variants/33-purple-mantle.webp',
              ['Purple Mantle', 'Пурпурная Мантия'],
            ],
          ),
        },
      },
    ),
    33,
  ),
  collectionPlant(
    'asparagaceae',
    'chlorophytum-comosum-green',
    '/plants/chlorophytum-green-home-photo.webp',
    ['Green spider plant', 'Зелёный хлорофитум'],
    chlorophytumCollectionProfile(
      'Chlorophytum comosum',
      ['Solid-green arching leaves', 'Однотонные зелёные дуговидные листья'],
      [
        'This is the fully green spider plant from my windowsill. It is easy to confuse with the plants growing beside it in a crowded corner, but its plain leaves and relaxed fountain shape make it distinct from both of my striped and curly forms.',
        'Это полностью зелёный хлорофитум с моего подоконника. В тесном зелёном уголке его легко спутать с соседними растениями, но однотонные листья и свободная фонтанообразная форма отличают его и от пестролистного, и от кудрявого сорта.',
      ],
      [
        'A vigorous plain-green form of Chlorophytum comosum with long arching leaves and a dense basal rosette. It is forgiving, grows quickly and readily makes plantlets on long runners.',
        'Энергичная зелёная форма Chlorophytum comosum с длинными дуговидными листьями и густой прикорневой розеткой. Она прощает ошибки, быстро растёт и охотно образует деток на длинных цветоносах.',
      ],
      {
        importantImage: '/plant-profile/chlorophytum-green-important.webp',
        propagationImage: '/plant-profile/chlorophytum-green-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'asparagaceae',
    'chlorophytum-comosum-vittatum',
    '/plants/chlorophytum-vittatum-home-photo.webp',
    ["Spider plant 'Vittatum'", 'Хлорофитум Виттатум'],
    chlorophytumCollectionProfile(
      "Chlorophytum comosum 'Vittatum'",
      ['Straight green-and-cream striped leaves', 'Прямые зелёно-кремовые полосатые листья'],
      [
        'The long striped leaves give this spider plant a calm, flowing silhouette: they stay almost straight at first and arch gently as they grow. The little plantlets add volume and make the whole plant feel especially lively.',
        'Длинные полосатые листья придают этому хлорофитуму спокойный, плавный силуэт: сначала они растут почти прямо, а затем мягко изгибаются. Маленькие детки добавляют объёма и делают весь куст особенно живым.',
      ],
      [
        "The classic 'Vittatum' spider plant forms a generous rosette of narrow leaves with a broad cream centre and green margins. Unlike the curly 'Bonnie', its foliage remains straight and flowing.",
        'Классический хлорофитум «Виттатум» образует пышную розетку узких листьев с широкой кремовой серединой и зелёными краями. В отличие от кудрявого «Бонни», его листва остаётся прямой и ниспадающей.',
      ],
      {
        importantImage: '/plant-profile/chlorophytum-vittatum-important.webp',
        propagationImage: '/plant-profile/chlorophytum-vittatum-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'asparagaceae',
    'chlorophytum-comosum-variegatum',
    '/plants/chlorophytum-variegatum-home-photo.webp',
    ["Spider plant 'Variegatum'", 'Хлорофитум Вариегатум'],
    chlorophytumCollectionProfile(
      "Chlorophytum comosum 'Variegatum'",
      [
        'Green arching leaves with narrow cream-white margins',
        'Зелёные дуговидные листья с узкими кремово-белыми краями',
      ],
      [
        'Two young rosettes are growing side by side, giving the plant a lively, slightly asymmetric fountain shape. The pale margins trace every curve and remain clearly visible even on the youngest leaves.',
        'Две молодые розетки растут рядом и образуют живой, слегка асимметричный фонтан. Светлая кайма подчёркивает каждый изгиб и хорошо заметна даже на самых молодых листьях.',
      ],
      [
        "'Variegatum' is the reverse-variegated form of the familiar spider plant: each narrow leaf has a green centre framed by cream-white marginal stripes. Mature plants produce small white flowers and plantlets on long arching runners.",
        '«Вариегатум» — форма хлорофитума с обратной вариегатностью: у каждого узкого листа зелёная середина обрамлена кремово-белыми краевыми полосами. Взрослые растения выпускают длинные дуговидные побеги с мелкими белыми цветками и детками.',
      ],
      {
        importantImage: '/plant-profile/chlorophytum-variegatum-important.webp',
        propagationImage: '/plant-profile/chlorophytum-variegatum-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'asparagaceae',
    'chlorophytum-orchidastrum-green-orange',
    '/plants/chlorophytum-orchidastrum-green-orange-home-photo.webp',
    ['Green Orange spider plant', 'Хлорофитум Грин Оранж'],
    simplePlantProfile({
      assets: {
        importantImage: '/plant-profile/clivia-important.webp',
        propagationImage: '/plant-profile/clivia-propagation.webp',
      },
      difficulty: 2,
      facts: [
        [
          'Broad glossy leaves form a compact upright rosette rather than a loose fountain.',
          'Orange petioles and midribs become brightest in strong diffused light.',
          'Unlike Chlorophytum comosum, this species does not make hanging plantlets on long runners.',
        ],
        [
          'Широкие глянцевые листья образуют компактную вертикальную розетку, а не свободный фонтан.',
          'Оранжевые черешки и центральные жилки ярче всего проявляются при хорошем рассеянном свете.',
          'В отличие от Chlorophytum comosum, этот вид не образует свисающих деток на длинных столонах.',
        ],
      ],
      family: ['Asparagus family (Asparagaceae)', 'Спаржевые (Asparagaceae)'],
      feeding: [
        'Feed every four weeks from spring to early autumn with a balanced foliage fertiliser at half strength. Flush the substrate occasionally to prevent salt buildup.',
        'С весны до начала осени подкармливайте раз в четыре недели половинной дозой удобрения для декоративно-лиственных. Иногда промывайте грунт, чтобы соли не накапливались.',
      ],
      growth: ['Moderate', 'Умеренный'],
      height: ['20–40 cm', '20–40 см'],
      humidity: [
        'Moderate humidity around 50–60% keeps the broad leaves neat. Keep the plant away from hot radiators, but do not leave water standing in the crown.',
        'Умеренная влажность около 50–60% помогает сохранить широкие листья аккуратными. Держите растение подальше от горячих батарей, но не оставляйте воду в центре розетки.',
      ],
      important: [
        'Keep the orange leaf bases above the soil and out of standing water. A buried or constantly wet crown can rot even while the outer leaves still look healthy.',
        'Не заглубляйте оранжевые основания листьев и не оставляйте их в воде. Заглублённая или постоянно мокрая розетка может загнить, даже когда внешние листья ещё выглядят здоровыми.',
      ],
      latinName: "Chlorophytum orchidastrum 'Green Orange'",
      light: [
        'Give bright diffused light with a little gentle morning sun. Harsh midday rays can scorch the broad leaves, while deep shade dulls the orange colour.',
        'Нужен яркий рассеянный свет с небольшим количеством мягкого утреннего солнца. Жёсткие полуденные лучи обжигают широкие листья, а глубокая тень приглушает оранжевую окраску.',
      ],
      notes: [
        'My plant has a low, slightly uneven rosette with broad wavy leaves and warm orange bases. I am keeping its natural asymmetry rather than trying to make every leaf point in the same direction.',
        'У моего растения невысокая, немного неровная розетка с широкими волнистыми листьями и тёплыми оранжевыми основаниями. Я сохраняю её естественную асимметрию и не пытаюсь направить все листья одинаково.',
      ],
      origin: ['West tropical Africa to Zambia', 'Западная тропическая Африка до Замбии'],
      overview: [
        "'Green Orange' is a broad-leaved form of Chlorophytum orchidastrum, valued for glossy green foliage and vivid orange petioles gathered into a dense upright rosette.",
        '«Грин Оранж» — широколистная форма Chlorophytum orchidastrum с глянцевой зелёной листвой и яркими оранжевыми черешками, собранными в плотную вертикальную розетку.',
      ],
      plantType: ['Evergreen clump-forming perennial', 'Вечнозелёный кустящийся многолетник'],
      problems: [
        [
          'Brown tips — raise humidity slightly and check water quality.',
          'Pale orange petioles — move gradually to brighter diffused light.',
          'Soft yellow leaf bases — stop watering and inspect the crown and roots for rot.',
        ],
        [
          'Сухие коричневые кончики — немного повысьте влажность и проверьте качество воды.',
          'Оранжевые черешки бледнеют — постепенно переставьте на более яркий рассеянный свет.',
          'Основания листьев желтеют и размягчаются — прекратите полив и проверьте розетку и корни на гниль.',
        ],
      ],
      propagation: [
        'Propagate during spring repotting by dividing a mature clump. Separate an outer rosette only when it has its own roots, then plant it at the same depth in a small pot with airy substrate.',
        'Размножайте при весенней пересадке делением взрослого куста. Отделяйте боковую розетку только с собственными корнями и высаживайте на прежнюю глубину в небольшой горшок с воздушным грунтом.',
      ],
      repotting: [
        'Repot in spring every one to two years or when roots fill the container. Choose a pot only slightly wider and keep the orange crown at its previous level.',
        'Пересаживайте весной раз в один-два года или когда корни заполнят горшок. Выбирайте ёмкость лишь немного шире и сохраняйте прежний уровень оранжевой розетки.',
      ],
      secondaryCare: [
        ['Leaf care', 'Уход за листьями'],
        [
          'Wipe the broad leaves with a soft damp cloth and remove only fully yellow outer foliage at the base with a clean blade.',
          'Протирайте широкие листья мягкой влажной тканью, а полностью пожелтевшие внешние листья срезайте у основания чистым лезвием.',
        ],
      ],
      soil: [
        'Use a loose loamy mix with about 65% houseplant compost, 20% perlite or pumice and 15% fine bark, in a pot with drainage holes.',
        'Используйте рыхлую суглинистую смесь примерно из 65% грунта для комнатных растений, 20% перлита или пемзы и 15% мелкой коры, обязательно в горшке с дренажными отверстиями.',
      ],
      temperature: [
        'Keep at 18–27 °C and protect from cold glass, draughts and temperatures below 15 °C.',
        'Содержите при 18–27 °C и защищайте от холодного стекла, сквозняков и температуры ниже 15 °C.',
      ],
      watering: [
        'Water when the top 2–3 cm of substrate has dried. Moisten evenly, drain excess completely and let the mix breathe before watering again.',
        'Поливайте после просыхания верхних 2–3 см грунта. Равномерно промочите смесь, полностью слейте лишнюю воду и дайте грунту подышать перед следующим поливом.',
      ],
    }),
  ),
  collectionPlant(
    'araceae',
    'epipremnum-aureum-marble-queen',
    '/plants/epipremnum-marble-queen-home-photo.webp',
    ['Marble Queen pothos', 'Эпипремнум Марбл Квин'],
    epipremnumCollectionProfile(
      "Epipremnum aureum 'Marble Queen'",
      ['cream-and-green marbling', 'кремово-зелёная мраморность'],
      [
        "The young 'Marble Queen' already has a different pattern on every leaf. I keep turning the pot towards the window so that the bush does not lean too strongly to one side and the pale sections receive enough light.",
        'У молодого «Марбл Квин» уже нет двух одинаковых листьев. Я поворачиваю горшок к окну разными сторонами, чтобы куст не наклонялся слишком сильно и светлым участкам хватало света.',
      ],
      [
        'A highly variegated golden pothos cultivar with heart-shaped leaves splashed and marbled in cream, white and green. It grows a little more slowly than the ordinary green-and-gold form because the palest leaf areas contain less chlorophyll.',
        'Сильно пестролистный сорт золотистого эпипремнума с сердцевидными листьями, покрытыми кремовыми, белыми и зелёными мазками. Он растёт немного медленнее обычной зелёно-золотой формы, потому что в самых светлых участках меньше хлорофилла.',
      ],
      {
        importantImage: '/plant-profile/epipremnum-marble-queen-important.webp',
        propagationImage: '/plant-profile/epipremnum-marble-queen-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'epipremnum-aureum-golden',
    '/plants/epipremnum-aureum-home-photo.webp',
    ['Golden pothos', 'Эпипремнум золотистый'],
    epipremnumCollectionProfile(
      'Epipremnum aureum',
      ['green-and-yellow mottling', 'зелёно-жёлтая пятнистость'],
      [
        'This pothos lives right beside the window and grows in several directions at once. Some shoots still look more confident than others, but the new leaves are getting larger and the yellow markings become clearer in good light.',
        'Этот эпипремнум живёт прямо у окна и растёт сразу в несколько сторон. Одни побеги пока увереннее других, но новые листья становятся крупнее, а жёлтый рисунок на хорошем свету проявляется ярче.',
      ],
      [
        'Golden pothos is an adaptable tropical vine with glossy heart-shaped leaves patterned in yellow and green. It can trail from a pot or climb a support, and regular pruning turns a few long stems into a fuller plant.',
        'Эпипремнум золотистый — выносливая тропическая лиана с глянцевыми сердцевидными листьями в зелёно-жёлтых пятнах. Он может свисать из горшка или подниматься по опоре, а регулярная обрезка превращает несколько длинных побегов в более пышный куст.',
      ],
      {
        importantImage: '/plant-profile/epipremnum-aureum-important.webp',
        propagationImage: '/plant-profile/epipremnum-aureum-propagation.webp',
      },
    ),
  ),
  collectionPlant(
    'piperaceae',
    'peperomia-obtusifolia',
    '/plants/peperomia-obtusifolia-home-photo.webp',
    ['Baby rubber plant', 'Пеперомия туполистная'],
    simplePlantProfile({
      assets: {
        importantImage: '/plant-profile/peperomia-obtusifolia-important.webp',
        propagationImage: '/plant-profile/peperomia-obtusifolia-propagation.webp',
      },
      difficulty: 2,
      facts: [
        [
          'Thick leathery leaves store a modest reserve of water.',
          'Trailing stems can root where a node touches a moist airy substrate.',
          'The thin upright flower spikes are typical peperomia inflorescences.',
        ],
        [
          'Толстые кожистые листья запасают небольшой резерв воды.',
          'Полегающие стебли могут укореняться в месте контакта узла с воздушным влажным грунтом.',
          'Тонкие вертикальные колоски — характерные соцветия пеперомии.',
        ],
      ],
      family: ['Pepper family (Piperaceae)', 'Перечные (Piperaceae)'],
      feeding: [
        'Feed monthly in spring and summer with a balanced foliage fertiliser at half strength.',
        'Весной и летом подкармливайте раз в месяц половинной дозой сбалансированного удобрения для декоративно-лиственных.',
      ],
      growth: ['Moderate', 'Умеренный'],
      height: ['20–35 cm, stems may trail', '20–35 см, побеги могут свисать'],
      humidity: [
        'Average room humidity is suitable. Good airflow and dry leaf axils matter more than frequent misting.',
        'Подходит обычная комнатная влажность. Хорошее движение воздуха и сухие пазухи листьев важнее частых опрыскиваний.',
      ],
      important: [
        'The thick leaves do not mean the roots tolerate wet soil. Let the upper half of the mix dry and use a small pot with drainage to prevent stem and root rot.',
        'Толстые листья не означают, что корни любят сырость. Давайте верхней половине грунта просохнуть и используйте небольшой горшок с дренажом, чтобы не допустить гнили корней и стеблей.',
      ],
      latinName: 'Peperomia obtusifolia',
      light: [
        'Give bright diffused light with gentle morning sun. In deep shade the stems stretch and lose their compact shape.',
        'Нужен яркий рассеянный свет с мягким утренним солнцем. В глубокой тени стебли вытягиваются и куст теряет компактность.',
      ],
      notes: [
        'Mine arrived at the collection with very long bare stems and only a few leaves. I am gradually giving it more light and pinching new tips so that the next growth looks denser without forcing the plant all at once.',
        'Моя пеперомия попала в коллекцию с очень длинными голыми стеблями и редкими листьями. Я постепенно добавляю ей света и прищипываю новые верхушки, чтобы следующий прирост был гуще без резких изменений.',
      ],
      origin: ['Florida to tropical America', 'От Флориды до тропической Америки'],
      overview: [
        'Peperomia obtusifolia is a tropical perennial or epiphyte with fleshy stems and rounded, glossy leaves. It naturally roots along reclining stems and becomes fuller when young shoots are pinched.',
        'Пеперомия туполистная — тропический многолетник или эпифит с мясистыми стеблями и округлыми глянцевыми листьями. Полегающие побеги естественно укореняются, а прищипка молодых верхушек делает куст гуще.',
      ],
      plantType: ['Evergreen perennial or epiphyte', 'Вечнозелёный многолетник или эпифит'],
      problems: [
        [
          'Soft dark stems — stop watering and remove rotting sections.',
          'Long gaps between leaves — increase diffused light and pinch the tip.',
          'Wrinkled leaves in dry soil — water thoroughly and let excess drain.',
        ],
        [
          'Мягкие тёмные стебли — прекратите полив и удалите загнившие участки.',
          'Длинные промежутки между листьями — добавьте рассеянного света и прищипните верхушку.',
          'Сморщенные листья при сухом грунте — хорошо полейте и дайте лишней воде стечь.',
        ],
      ],
      propagation: [
        'Take a healthy tip or stem section with at least one node and two leaves. Let the cut dry briefly, then root the node in water or a lightly moist airy mix.',
        'Срежьте здоровую верхушку или часть стебля хотя бы с одним узлом и двумя листьями. Немного подсушите срез и укореняйте узел в воде или слегка влажном воздушном грунте.',
      ],
      repotting: [
        'Repot only when roots fill the container. A slightly snug shallow pot dries more predictably than an oversized deep one.',
        'Пересаживайте только после заполнения ёмкости корнями. Слегка тесный неглубокий горшок просыхает предсказуемее слишком большого и глубокого.',
      ],
      secondaryCare: [
        ['Pruning', 'Формирование'],
        [
          'Pinch stretched tips above a node and root the cut pieces back into the same pot. Rotate the plant regularly for a more even crown.',
          'Прищипывайте вытянутые верхушки над узлом и подсаживайте укоренённые черенки обратно в тот же горшок. Регулярно поворачивайте растение для более ровной кроны.',
        ],
      ],
      soil: [
        'Use a very airy mix: about 50% houseplant compost, 25% fine bark and 25% perlite or pumice.',
        'Используйте очень воздушную смесь: примерно 50% грунта для комнатных растений, 25% мелкой коры и 25% перлита или пемзы.',
      ],
      temperature: [
        'Keep at 18–27 °C and protect from cold draughts and a chilled windowsill.',
        'Содержите при 18–27 °C, защищая от холодных сквозняков и переохлаждённого подоконника.',
      ],
      watering: [
        'Water after the upper half of the substrate dries. Soak evenly, drain completely and never leave water in the saucer.',
        'Поливайте после просыхания верхней половины грунта. Равномерно промочите смесь, полностью слейте лишнюю воду и не оставляйте её в поддоне.',
      ],
    }),
  ),
  collectionPlant(
    'asteraceae',
    'curio-sp',
    '/plants/curio-sp-home-photo.webp',
    ['Trailing Curio', 'Крестовник ампельный'],
    simplePlantProfile({
      assets: {
        importantImage: '/plant-profile/curio-sp-important.webp',
        propagationImage: '/plant-profile/curio-sp-propagation.webp',
      },
      difficulty: 2,
      facts: [
        [
          'Curio is part of the daisy family, even though many species look more like leaf succulents than familiar daisies.',
          'The narrow fleshy leaves store water, while the flexible stems naturally spill over the edge of the pot.',
          'The notation “sp.” means that the genus is known but the exact species has not yet been established.',
        ],
        [
          'Curio относится к семейству Астровые, хотя многие виды больше похожи на листовые суккуленты, чем на привычные ромашки.',
          'Узкие мясистые листья запасают воду, а гибкие побеги естественно свешиваются через край горшка.',
          'Обозначение «sp.» означает, что род установлен, но точный вид пока не определён.',
        ],
      ],
      family: ['Daisy family (Asteraceae)', 'Астровые (Asteraceae)'],
      feeding: [
        'Feed once a month from spring to early autumn with a cactus fertiliser diluted to quarter strength. Skip feeding in cool, low-light conditions.',
        'С весны до начала осени подкармливайте раз в месяц удобрением для кактусов в четвертной дозировке. В прохладе и при слабом освещении подкормки не нужны.',
      ],
      growth: ['Moderate to active in bright light', 'Умеренный, на ярком свету активный'],
      height: [
        'Trailing shoots; final length depends on species',
        'Ампельные побеги; конечная длина зависит от вида',
      ],
      humidity: [
        'Normal dry room air is suitable. Do not mist routinely; good airflow around the crown is more useful.',
        'Подходит обычный сухой комнатный воздух. Регулярные опрыскивания не нужны; лёгкое движение воздуха вокруг кроны полезнее.',
      ],
      important: [
        'The exact species is not confirmed, so the profile uses safe care shared by trailing succulent Curio: abundant light, a fast-draining mineral mix and no standing water. Empty the saucer after every watering.',
        'Точный вид не подтверждён, поэтому в карточке указан безопасный общий уход для ампельных суккулентных Curio: много света, быстро просыхающий минеральный грунт и никакой воды в поддоне.',
      ],
      latinName: 'Curio (Senecio) sp.',
      light: [
        'Provide the brightest available window with several hours of gentle direct sun. Acclimatise gradually; too little light makes the shoots thin and sparse.',
        'Поставьте на самое светлое окно с несколькими часами мягкого прямого солнца. Приучайте постепенно: при нехватке света побеги становятся тонкими и редкими.',
      ],
      notes: [
        'I grew this plant from one detached leaf received in a succulent set. It is now in active growth and has formed several loose trailing shoots. The genus is clear from its succulent leaves and growth habit, but I am keeping the species open until flowering or another reliable diagnostic feature appears.',
        'Я вырастила это растение из одного отдельного листика, полученного в наборе суккулентов. Сейчас оно активно растёт и сформировало несколько свободно свисающих побегов. Род понятен по суккулентным листьям и форме роста, но точный вид оставляю открытым до цветения или появления другого надёжного признака.',
      ],
      origin: [
        'Not established for this specimen; Curio is primarily African',
        'Для этого экземпляра не установлено; род Curio преимущественно африканский',
      ],
      overview: [
        'This is an unidentified trailing Curio, still widely encountered in collections under the older name Senecio. Its flexible green stems carry smooth narrow succulent leaves and naturally spread over the edge of the pot. The exact species is deliberately left unspecified.',
        'Это неопределённый ампельный Curio, который в коллекциях всё ещё часто встречается под прежним названием Senecio. На гибких зелёных побегах расположены гладкие узкие суккулентные листья, а стебли естественно свешиваются через край горшка. Точный вид намеренно не указан.',
      ],
      plantType: ['Trailing succulent perennial', 'Ампельный суккулентный многолетник'],
      problems: [
        [
          'Soft translucent leaves or a dark stem base — stop watering and inspect for rot.',
          'Thin stretched shoots with wide gaps — increase light gradually.',
          'Wrinkled flexible leaves in completely dry soil — water thoroughly and drain fully.',
        ],
        [
          'Мягкие полупрозрачные листья или потемневшее основание стебля — прекратите полив и проверьте растение на гниль.',
          'Тонкие вытянутые побеги с большими промежутками — постепенно увеличьте освещение.',
          'Гибкие сморщенные листья при полностью сухом грунте — хорошо полейте и полностью слейте лишнюю воду.',
        ],
      ],
      propagation: [
        'For reliable propagation, cut a healthy 8–10 cm shoot, remove the lower leaves and let the cut dry for one or two days. Insert one or two nodes into a dry gritty mix, wait several days before the first light watering and keep in bright diffused light.',
        'Для надёжного размножения срежьте здоровый побег длиной 8–10 см, удалите нижние листья и подсушите срез один-два дня. Заглубите один-два узла в сухую минеральную смесь, первый раз слегка полейте через несколько дней и держите на ярком рассеянном свету.',
      ],
      repotting: [
        'Repot in spring when roots fill the container or the mix compacts. Choose a stable pot with a drainage hole, only slightly wider than the root ball.',
        'Пересаживайте весной, когда корни заполнят ёмкость или грунт уплотнится. Выбирайте устойчивый горшок с дренажным отверстием, лишь немного шире корневого кома.',
      ],
      secondaryCare: [
        ['Shaping', 'Формирование'],
        [
          'Pinch the longest shoots above a node and root several cuttings back into the same pot for a fuller, naturally uneven cascade.',
          'Прищипывайте самые длинные побеги над узлом и подсаживайте несколько укоренённых черенков обратно, чтобы получить более пышный, естественно неровный каскад.',
        ],
      ],
      soil: [
        'Use a fast-draining succulent mix with roughly 60–70% mineral material such as pumice, perlite or fine lava and 30–40% light organic compost.',
        'Используйте быстро просыхающую смесь для суккулентов: примерно 60–70% пемзы, перлита или мелкой лавы и 30–40% лёгкого органического грунта.',
      ],
      temperature: [
        'Keep at 18–27 °C and preferably above 12 °C in winter. Protect from cold wet soil and draughts.',
        'Содержите при 18–27 °C, зимой желательно не ниже 12 °C. Защищайте от холодного мокрого грунта и сквозняков.',
      ],
      watering: [
        'Water thoroughly only after the substrate has dried almost completely. Let all excess drain and reduce watering sharply during cool or cloudy periods.',
        'Поливайте обильно только после почти полного просыхания субстрата. Дайте всей лишней воде стечь и резко сократите полив в прохладные или пасмурные периоды.',
      ],
    }),
  ),
  collectionPlant(
    'asteraceae',
    'curio-herreanus',
    '/plants/curio-herreanus-home-photo.webp',
    ['String of tears', 'Крестовник Геррейна'],
    simplePlantProfile({
      assets: {
        importantImage: '/plant-profile/curio-herreanus-important.webp',
        propagationImage: '/plant-profile/curio-herreanus-propagation.webp',
      },
      difficulty: 2,
      facts: [
        [
          'The translucent stripe along each leaf is a window that lets light reach tissues inside the succulent leaf.',
          'The species is also sold as string of tears or string of watermelons because of its pointed striped leaves.',
          'Senecio herreanus is the older botanical name still commonly used in shops and private collections.',
          'A stem node can form roots where it rests against a suitable gritty substrate.',
        ],
        [
          'Полупрозрачная полоска вдоль листа — это световое окно, через которое свет проникает к тканям внутри суккулентного листа.',
          'В продаже вид называют «нитью слёз» или «нитью арбузиков» из-за заострённых полосатых листьев.',
          'Senecio herreanus — прежнее ботаническое название, которое до сих пор часто используют магазины и коллекционеры.',
          'Узел побега способен образовать корни там, где соприкасается с подходящим минеральным субстратом.',
        ],
      ],
      family: ['Daisy family (Asteraceae)', 'Астровые (Asteraceae)'],
      feeding: [
        'Feed monthly in spring and summer with a cactus fertiliser diluted to quarter strength. Do not feed during cool, low-light rest.',
        'Весной и летом подкармливайте раз в месяц удобрением для кактусов в четвертной дозировке. В прохладе и при слабом освещении подкормки не нужны.',
      ],
      growth: ['Moderate, faster in bright light', 'Умеренный, на ярком свету более активный'],
      height: [
        'Trailing stems usually 30–60 cm indoors',
        'Свисающие побеги обычно 30–60 см в комнате',
      ],
      humidity: [
        'Normal dry room air is suitable. Avoid routine misting and keep air moving gently around the crown.',
        'Подходит обычный сухой комнатный воздух. Регулярные опрыскивания не нужны; обеспечьте лёгкое движение воздуха вокруг кроны.',
      ],
      important: [
        'The plump leaves can stay present even while roots are suffering in wet soil. Use a pot with a drainage hole, let the mix dry almost completely and empty the saucer after every watering.',
        'Мясистые листья могут ещё выглядеть наполненными, когда корни уже страдают в сыром грунте. Используйте горшок с дренажным отверстием, почти полностью просушивайте смесь и после каждого полива опорожняйте поддон.',
      ],
      latinName: 'Curio herreanus (syn. Senecio herreanus)',
      light: [
        'Give the brightest available position with several hours of gentle direct sun. Acclimatise gradually; low light lengthens the gaps between leaves and weakens their markings.',
        'Поставьте на самое светлое место с несколькими часами мягкого прямого солнца. Приучайте постепенно: при нехватке света расстояния между листьями увеличиваются, а рисунок бледнеет.',
      ],
      notes: [
        'I bought this plant as one rooted strip and laid the shoot on a gritty substrate. Its nodes are now rooting and producing new growth points. The main image shows the expected form after it fills out, not its current size.',
        'Я купила это растение одной укоренённой полоской и уложила побег на минеральный субстрат. Сейчас узлы укореняются и дают новые точки роста. Основная фотография показывает ожидаемую форму после разрастания, а не его сегодняшний размер.',
      ],
      origin: ['Namibia', 'Намибия'],
      overview: [
        'Curio herreanus is a trailing succulent with flexible stems and pointed oval leaves marked by a translucent longitudinal window. With time it forms an airy uneven cascade and looks most natural when several rooted nodes grow from the same pot.',
        'Curio herreanus — ампельный суккулент с гибкими побегами и заострённо-овальными листьями с полупрозрачным продольным окошком. Со временем он образует воздушный неровный каскад и особенно естественно выглядит, когда в одном горшке укоренено несколько узлов.',
      ],
      plantType: ['Trailing leaf succulent', 'Ампельный листовой суккулент'],
      problems: [
        [
          'Soft translucent leaves or a dark stem base — stop watering and inspect the roots for rot.',
          'Long sparse shoots with wide gaps — increase light gradually.',
          'Wrinkled flexible leaves in completely dry mix — water thoroughly and let all excess drain.',
        ],
        [
          'Мягкие полупрозрачные листья или потемневшее основание стебля — прекратите полив и проверьте корни на гниль.',
          'Длинные редкие побеги с большими промежутками — постепенно увеличьте освещение.',
          'Сморщенные гибкие листья при полностью сухой смеси — хорошо полейте и дайте всей лишней воде стечь.',
        ],
      ],
      propagation: [
        'Cut a healthy 8–10 cm shoot, remove the lowest leaves and let the cut dry for one or two days. Lay the stem on a dry gritty mix or press two or three nodes lightly into it, secure if needed and begin light watering after several days.',
        'Срежьте здоровый побег длиной 8–10 см, удалите нижние листья и подсушите срез один-два дня. Уложите стебель на сухую минеральную смесь или слегка прижмите к ней два-три узла, при необходимости закрепите и начните понемногу поливать через несколько дней.',
      ],
      repotting: [
        'Repot in spring when roots fill the container or the mix compacts. A stable shallow or moderately deep pot with a drainage hole suits the trailing crown.',
        'Пересаживайте весной, когда корни заполнят ёмкость или грунт уплотнится. Свисающей кроне подойдёт устойчивый неглубокий или средней глубины горшок с дренажным отверстием.',
      ],
      secondaryCare: [
        ['Shaping', 'Формирование'],
        [
          'Lay healthy sections of the longest stems back across the substrate and pin a few nodes in place. Once rooted, they create a fuller but still naturally uneven crown.',
          'Укладывайте здоровые участки самых длинных побегов обратно на субстрат и закрепляйте несколько узлов. После укоренения они сделают крону пышнее, сохранив естественную неровность.',
        ],
      ],
      soil: [
        'Use a fast-draining succulent mix with about 60–70% mineral material such as pumice, perlite, fine lava or coarse grit.',
        'Используйте быстро просыхающую смесь для суккулентов с 60–70% минеральных компонентов: пемзы, перлита, мелкой лавы или крупного песка.',
      ],
      temperature: [
        'Keep at 18–27 °C and preferably above 12 °C in winter. Protect roots from cold wet soil and draughts.',
        'Содержите при 18–27 °C, зимой желательно не ниже 12 °C. Защищайте корни от холодного мокрого грунта и сквозняков.',
      ],
      watering: [
        'Water thoroughly only after the substrate has dried almost completely. Drain all excess and water much less often in cool or cloudy conditions.',
        'Поливайте обильно только после почти полного просыхания субстрата. Полностью сливайте лишнюю воду и в прохладе или пасмурную погоду поливайте значительно реже.',
      ],
    }),
  ),
  collectionPlant(
    'crassulaceae',
    'graptopetalum-paraguayense',
    '/plants/graptopetalum-paraguayense-home-photo.webp',
    ['Ghost plant', 'Граптопеталум парагвайский'],
    simplePlantProfile({
      assets: {
        importantImage: '/plant-profile/graptopetalum-paraguayense-important.webp',
        propagationImage: '/plant-profile/graptopetalum-paraguayense-propagation.webp',
      },
      difficulty: 2,
      facts: [
        [
          'The waxy farina gives the leaves their ghostly grey-pink colour.',
          'Rosettes can trail on bare stems as older leaves fall.',
          'Strong light brings out pink, lilac and peach tones.',
        ],
        [
          'Восковой налёт фарина придаёт листьям призрачный серо-розовый цвет.',
          'По мере опадения старых листьев розетки могут свисать на оголённых стеблях.',
          'Яркий свет проявляет розовые, сиреневые и персиковые оттенки.',
        ],
      ],
      family: ['Stonecrop family (Crassulaceae)', 'Толстянковые (Crassulaceae)'],
      feeding: [
        'Feed once or twice during spring and summer with a cactus fertiliser diluted to quarter strength.',
        'Весной и летом подкормите один-два раза удобрением для кактусов в четвертной дозировке.',
      ],
      growth: ['Moderate', 'Умеренный'],
      height: ['Rosettes 8–15 cm; stems trail', 'Розетки 8–15 см; стебли свисают'],
      humidity: [
        'Normal dry room air is ideal. Do not mist the rosettes or let water remain between the leaves.',
        'Обычный сухой комнатный воздух подходит идеально. Не опрыскивайте розетки и не оставляйте воду между листьями.',
      ],
      important: [
        'Do not wipe the powdery leaf coating: farina protects against strong light and water loss and does not grow back on a touched area.',
        'Не стирайте пудровый налёт с листьев: фарина защищает от яркого света и потери влаги и не восстанавливается на месте прикосновения.',
      ],
      latinName: 'Graptopetalum paraguayense',
      light: [
        'Provide several hours of gentle direct sun or the brightest available window, increasing exposure gradually to avoid burns.',
        'Обеспечьте несколько часов мягкого прямого солнца или самое светлое окно, увеличивая освещение постепенно, чтобы избежать ожогов.',
      ],
      notes: [
        'The original plant was a tiny pale rosette with only a few marked leaves in a large pot. I am rebuilding it slowly from healthy leaves and waiting for a compact cluster rather than trying to speed it up with extra water.',
        'Исходное растение было крошечной бледной розеткой с несколькими повреждёнными листьями в большом горшке. Я восстанавливаю его из здоровых листьев и жду компактную группу, не пытаясь ускорить рост лишним поливом.',
      ],
      origin: ['Tamaulipas in north-eastern Mexico', 'Тамаулипас на северо-востоке Мексики'],
      overview: [
        'Ghost plant is a Mexican succulent subshrub that forms pastel rosettes on lengthening stems. Its brittle leaves detach easily but root readily, allowing a damaged plant to renew itself.',
        'Граптопеталум парагвайский — мексиканский суккулентный полукустарник с пастельными розетками на удлиняющихся стеблях. Хрупкие листья легко отделяются, но охотно укореняются, помогая повреждённому растению восстановиться.',
      ],
      plantType: ['Rosette-forming succulent subshrub', 'Розеточный суккулентный полукустарник'],
      problems: [
        [
          'Soft translucent leaves — stop watering and inspect for rot.',
          'Long pale stems — increase light gradually.',
          'Dry lower leaves — normal ageing if the crown remains firm.',
        ],
        [
          'Мягкие прозрачные листья — прекратите полив и проверьте растение на гниль.',
          'Длинные бледные стебли — постепенно увеличьте освещение.',
          'Сухие нижние листья — нормальное старение, если центр розетки остаётся плотным.',
        ],
      ],
      propagation: [
        'Twist off an intact leaf with its whole base, let it callus for two or three days and lay it on dry gritty mix. Begin light watering only after roots and a tiny rosette appear.',
        'Аккуратно отделите целый лист вместе с основанием, подсушите два-три дня и положите на сухую минеральную смесь. Начинайте слегка увлажнять только после появления корней и маленькой розетки.',
      ],
      repotting: [
        'Use a small shallow pot with a drainage hole and repot only when the mix has broken down or the cluster outgrows its container.',
        'Используйте маленький неглубокий горшок с дренажным отверстием и пересаживайте только после разрушения грунта или когда группа перерастёт ёмкость.',
      ],
      secondaryCare: [
        ['Grooming', 'Уход за розеткой'],
        [
          'Handle leaves by the edges, remove only fully dry lower leaves and rotate the pot so growth stays compact rather than leaning towards the window.',
          'Берите листья только за края, удаляйте лишь полностью сухие нижние листья и поворачивайте горшок, чтобы рост оставался компактным и не тянулся в одну сторону.',
        ],
      ],
      soil: [
        'Use a fast-draining mineral mix with about 30% cactus compost and 70% pumice, lava, coarse sand or fine gravel.',
        'Используйте быстро просыхающую минеральную смесь примерно из 30% грунта для кактусов и 70% пемзы, лавы, крупного песка или мелкого гравия.',
      ],
      temperature: [
        'Keep at 16–28 °C during growth. A bright, dry, cooler winter is tolerated, but protect from frost.',
        'В период роста содержите при 16–28 °C. Растение переносит светлую сухую прохладную зимовку, но не мороз.',
      ],
      watering: [
        'Water deeply only after the mix dries all the way through and the leaves begin to feel slightly less firm. Drain completely.',
        'Обильно поливайте только после полной просушки смеси, когда листья становятся чуть менее упругими. Полностью сливайте лишнюю воду.',
      ],
    }),
  ),
  collectionPlant(
    'asphodelaceae',
    'aloe-juvenna',
    '/plants/aloe-juvenna-home-photo.webp',
    ['Tiger tooth aloe', 'Алоэ ювенна'],
    simplePlantProfile({
      assets: {
        importantImage: '/plant-profile/aloe-juvenna-important.webp',
        propagationImage: '/plant-profile/aloe-juvenna-propagation.webp',
      },
      difficulty: 2,
      facts: [
        [
          "The common name 'tiger tooth aloe' refers to the small pale teeth along each leaf edge.",
          'Compact stems form dense clumps by producing offsets at the base.',
          'Bright light keeps growth tight and may add bronze or reddish tones.',
        ],
        [
          'Название «тигровое алоэ» связано с мелкими светлыми зубцами по краям листьев.',
          'Короткие стебли образуют густую группу благодаря прикорневым деткам.',
          'Яркий свет сохраняет компактность и может добавлять бронзовые или красноватые оттенки.',
        ],
      ],
      family: ['Asphodel family (Asphodelaceae)', 'Асфоделовые (Asphodelaceae)'],
      feeding: [
        'Feed once every six to eight weeks in spring and summer with a cactus fertiliser at quarter strength.',
        'Весной и летом подкармливайте раз в шесть-восемь недель удобрением для кактусов в четвертной дозировке.',
      ],
      growth: ['Slow to moderate', 'Медленный или умеренный'],
      height: ['Usually 20–30 cm', 'Обычно 20–30 см'],
      humidity: [
        'Dry room air with good ventilation is ideal. Do not mist and do not let water sit in the leaf cluster.',
        'Идеален сухой комнатный воздух с хорошей вентиляцией. Не опрыскивайте и не оставляйте воду внутри группы листьев.',
      ],
      important: [
        'Let the substrate dry completely between waterings. The dense leaf bases trap moisture easily, and a wet crown can rot before the leaves visibly wilt.',
        'Полностью просушивайте грунт между поливами. Плотные основания листьев легко задерживают влагу, и мокрая розетка может загнить раньше, чем листья заметно увянут.',
      ],
      latinName: 'Aloe juvenna',
      light: [
        'Give the brightest diffused light available with several hours of gentle sun, acclimating gradually after a darker season.',
        'Нужен максимально яркий рассеянный свет с несколькими часами мягкого солнца; после тёмного сезона приучайте к нему постепенно.',
      ],
      notes: [
        'This plant was sold to me as a haworthia. The upright spotted leaves with clear marginal teeth fit Aloe juvenna instead, so the mistaken shop label became part of its story in my collection.',
        'Мне продали это растение как хавортию. Вертикальные пятнистые листья с выраженными зубцами по краям больше соответствуют Aloe juvenna, поэтому ошибочная магазинная этикетка стала частью его истории в моей коллекции.',
      ],
      origin: ['South-western Kenya to northern Tanzania', 'Юго-запад Кении и север Танзании'],
      overview: [
        'Aloe juvenna is a compact East African succulent with stacked triangular leaves marked by white spots and small teeth. It branches from the base and gradually forms an architectural clump.',
        'Алоэ ювенна — компактный восточноафриканский суккулент с ярусами треугольных листьев, белыми пятнами и мелкими зубцами. Он ветвится от основания и постепенно образует архитектурную группу.',
      ],
      plantType: ['Clump-forming succulent subshrub', 'Кустящийся суккулентный полукустарник'],
      problems: [
        [
          'Soft dark leaf bases — stop watering and inspect for crown rot.',
          'Tall pale loose growth — increase light gradually.',
          'Brown dry tips — check for old damage, heat stress or irregular watering.',
        ],
        [
          'Мягкие тёмные основания листьев — прекратите полив и проверьте розетку на гниль.',
          'Высокий бледный рыхлый рост — постепенно увеличьте освещение.',
          'Сухие коричневые кончики — проверьте старые повреждения, перегрев и нерегулярный полив.',
        ],
      ],
      propagation: [
        'Separate an offset only after it has several leaves and some roots of its own. Let the cut dry for a day, then plant it in dry gritty mix and wait several days before the first light watering.',
        'Отделяйте детку после появления нескольких листьев и собственных корней. Подсушите срез сутки, посадите в сухую минеральную смесь и подождите несколько дней до первого лёгкого полива.',
      ],
      repotting: [
        'Repot in spring when offsets crowd the pot. Keep the clump at its previous depth and choose a stable container with a drainage hole.',
        'Пересаживайте весной, когда деткам станет тесно. Сохраняйте прежнюю глубину посадки и выбирайте устойчивый горшок с дренажным отверстием.',
      ],
      secondaryCare: [
        ['Clump care', 'Уход за группой'],
        [
          'Remove only completely dry outer leaves, rotate the pot regularly and leave offsets attached when a fuller clump is desired.',
          'Удаляйте только полностью сухие внешние листья, регулярно поворачивайте горшок и оставляйте деток на месте, если хотите получить более пышную группу.',
        ],
      ],
      soil: [
        'Use a gritty succulent mix with about 35% cactus compost and 65% pumice, lava, perlite or coarse mineral material.',
        'Используйте минеральную смесь примерно из 35% грунта для кактусов и 65% пемзы, лавы, перлита или другого крупного минерального материала.',
      ],
      temperature: [
        'Keep at 18–30 °C during active growth and above 10 °C in winter. Protect from frost and cold wet soil.',
        'В период роста содержите при 18–30 °C, зимой — выше 10 °C. Защищайте от мороза и холодного мокрого грунта.',
      ],
      watering: [
        'Soak the substrate thoroughly, then wait until it is completely dry before watering again. Water much less often in cool low-light months.',
        'Полностью промочите грунт, затем дождитесь его полной просушки до следующего полива. В прохладные тёмные месяцы поливайте значительно реже.',
      ],
    }),
  ),
  collectionPlant(
    'asphodelaceae',
    'aloe-vera',
    '/plants/aloe-vera-home-photo.webp',
    ['Aloe vera', 'Алоэ вера'],
    simplePlantProfile({
      assets: {
        importantImage: '/plant-profile/aloe-vera-important.webp',
        propagationImage: '/plant-profile/aloe-vera-propagation.webp',
      },
      difficulty: 1,
      facts: [
        [
          'The clear inner gel is generally well tolerated on intact skin and may cool and moisturise minor irritation or mild sunburn; patch-test it first.',
          'Evidence for treating acne, hair loss or accelerating hair growth is limited, so aloe should not replace proven treatment.',
          'The bitter yellow latex directly beneath the rind contains aloin and is different from the clear gel.',
        ],
        [
          'Прозрачный внутренний гель обычно хорошо переносится неповреждённой кожей и может охлаждать и увлажнять при лёгком раздражении или небольшом солнечном ожоге; сначала сделайте пробу на маленьком участке.',
          'Доказательств пользы при акне, выпадении волос и для ускорения их роста мало, поэтому алоэ не заменяет полноценное лечение.',
          'Горький жёлтый латекс сразу под кожицей содержит алоин и отличается от прозрачного геля.',
        ],
      ],
      family: ['Asphodel family (Asphodelaceae)', 'Асфоделовые (Asphodelaceae)'],
      feeding: [
        'Feed once every six to eight weeks in spring and summer with a cactus fertiliser at quarter strength.',
        'Весной и летом подкармливайте раз в шесть-восемь недель удобрением для кактусов в четвертной дозировке.',
      ],
      growth: ['Moderate', 'Умеренный'],
      height: ['Usually 50–90 cm indoors', 'Обычно 50–90 см в комнате'],
      humidity: [
        'Normal dry room air and steady ventilation are ideal. Do not mist the rosettes or leave water between the leaves.',
        'Идеальны обычный сухой комнатный воздух и стабильное проветривание. Не опрыскивайте розетки и не оставляйте воду между листьями.',
      ],
      important: [
        'Do not eat a home-grown leaf or drink its juice. Aloe latex can cause severe cramps and diarrhoea and may interact with medicines. Use gel only on intact skin; serious burns, deep wounds and infected areas need medical care.',
        'Не ешьте домашний лист и не пейте его сок. Латекс алоэ может вызвать сильные спазмы и диарею, а также взаимодействовать с лекарствами. Наносите гель только на неповреждённую кожу; серьёзные ожоги, глубокие раны и инфекции требуют медицинской помощи.',
      ],
      latinName: 'Aloe vera',
      light: [
        'Give very bright diffused light with several hours of gentle morning or evening sun. Acclimate gradually after winter or a move from a darker place.',
        'Обеспечьте очень яркий рассеянный свет с несколькими часами мягкого утреннего или вечернего солнца. После зимы или тёмного места приучайте к солнцу постепенно.',
      ],
      notes: [
        'This specimen is already a clump of several rosettes rather than a single plant. New basal offsets can remain for a fuller group or be separated to start more aloes.',
        'Этот экземпляр уже представляет собой куртину из нескольких розеток, а не одиночное растение. Новые прикорневые детки можно оставлять для пышной группы или отделять, получая новые алоэ.',
      ],
      origin: [
        'Northern Oman; now widely cultivated and naturalised',
        'Север Омана; сейчас широко выращивается и натурализовано во многих регионах',
      ],
      overview: [
        'Aloe vera is a clump-forming succulent with thick, gel-filled leaves arranged in upright rosettes. It stores water efficiently, produces offsets freely and is valued mainly for the clear inner leaf gel.',
        'Алоэ вера — кустящийся суккулент с толстыми наполненными гелем листьями, собранными в вертикальные розетки. Оно хорошо запасает воду, охотно образует деток и ценится прежде всего за прозрачный гель внутри листа.',
      ],
      plantType: ['Clump-forming rosette succulent', 'Куртинный розеточный суккулент'],
      problems: [
        [
          'Soft translucent leaf bases — stop watering and inspect the roots and crowns for rot.',
          'Long weak leaves leaning towards the window — increase light gradually.',
          'Flat wrinkled leaves — check for prolonged drought or damaged roots before watering again.',
        ],
        [
          'Мягкие полупрозрачные основания листьев — прекратите полив и проверьте корни и розетки на гниль.',
          'Длинные слабые листья тянутся к окну — постепенно увеличьте освещение.',
          'Плоские сморщенные листья — перед новым поливом проверьте длительную пересушку и состояние корней.',
        ],
      ],
      propagation: [
        'Separate a basal offset after it has several leaves and its own roots. Let damaged tissue dry for a day, then pot it into dry gritty mix and wait several days before the first light watering.',
        'Отделяйте прикорневую детку после появления нескольких листьев и собственных корней. Подсушите повреждённое место сутки, посадите в сухую минеральную смесь и подождите несколько дней до первого лёгкого полива.',
      ],
      repotting: [
        'Repot in spring when offsets crowd the container. Use a stable pot with a drainage hole and keep every rosette at its previous depth.',
        'Пересаживайте весной, когда деткам становится тесно. Используйте устойчивый горшок с дренажным отверстием и сохраняйте прежнюю глубину каждой розетки.',
      ],
      secondaryCare: [
        ['Using a leaf externally', 'Наружное применение листа'],
        [
          'Use only clear inner gel from a clean mature leaf. Drain and rinse away the yellow latex, patch-test the gel, and stop if burning, itching or a rash appears.',
          'Используйте только прозрачный внутренний гель из чистого зрелого листа. Дайте стечь жёлтому латексу, тщательно смойте его, сделайте кожную пробу и прекратите применение при жжении, зуде или сыпи.',
        ],
      ],
      soil: [
        'Use a fast-draining mix with about 30–40% cactus compost and 60–70% pumice, lava, perlite or coarse mineral material.',
        'Используйте быстро просыхающую смесь примерно из 30–40% грунта для кактусов и 60–70% пемзы, лавы, перлита или другого крупного минерального материала.',
      ],
      temperature: [
        'Keep at 18–30 °C during active growth and above 10 °C in winter. Protect from frost, cold glass and wet chilled soil.',
        'В период роста содержите при 18–30 °C, зимой — выше 10 °C. Защищайте от мороза, холодного стекла и сырого переохлаждённого грунта.',
      ],
      watering: [
        'Soak the substrate thoroughly, then let it dry completely before watering again. Water much less often during cool, dark months.',
        'Полностью промочите субстрат, затем дождитесь его полной просушки до следующего полива. В прохладные тёмные месяцы поливайте значительно реже.',
      ],
    }),
  ),
  collectionPlant(
    'aspleniaceae',
    'asplenium-nidus-variegata',
    '/plants/asplenium-nidus-variegata-home-photo.webp',
    ["Variegated bird's-nest fern", 'Асплениум гнездовой «Вариегата»'],
    simplePlantProfile({
      assets: {
        importantImage: '/plant-profile/asplenium-nidus-variegata-important.webp',
        propagationImage: '/plant-profile/asplenium-nidus-variegata-propagation.webp',
      },
      difficulty: 3,
      facts: [
        [
          "The cultivar's cream-white pinstripes follow the veins of each undivided frond.",
          'New fronds unfurl from the central nest and become more strongly waved as they mature.',
          'Like other true ferns, it produces spores rather than flowers or seeds.',
          'Asplenium nidus naturally grows as an epiphyte or lithophyte in wet tropical forests.',
        ],
        [
          'Кремово-белые полосы сорта идут вдоль жилок каждой цельной вайи.',
          'Новые вайи разворачиваются из центра розетки и с возрастом становятся более волнистыми.',
          'Как настоящий папоротник, он образует споры, а не цветки и семена.',
          'В природе Asplenium nidus растёт эпифитом или литофитом во влажных тропических лесах.',
        ],
      ],
      family: ['Spleenwort family (Aspleniaceae)', 'Костенцовые (Aspleniaceae)'],
      feeding: [
        'Feed monthly in spring and summer with one-quarter to one-half strength balanced fern fertiliser, applied only to moist substrate.',
        'Весной и летом подкармливайте раз в месяц четвертью или половиной дозы сбалансированного удобрения для папоротников, только по влажному грунту.',
      ],
      growth: ['Slow to moderate', 'Медленный или умеренный'],
      height: ['Rosette usually 30–60 cm indoors', 'Розетка обычно 30–60 см в комнате'],
      humidity: [
        'Prefer humidity above 60% with gentle airflow. Dry air often causes brown, crisp frond tips.',
        'Предпочитает влажность выше 60% и мягкое движение воздуха. В сухом воздухе кончики вай часто коричневеют и подсыхают.',
      ],
      important: [
        'Never pour water into the central nest: stagnant moisture can rot the growing point. Water the substrate around the pot edge and keep the crown open.',
        'Не лейте воду в центр розетки: застой влаги может погубить точку роста. Поливайте грунт по краю горшка и сохраняйте центр открытым.',
      ],
      latinName: "Asplenium nidus 'Variegata'",
      light: [
        'Give bright filtered light without direct midday sun. Too little light weakens the striping, while hot sun burns the pale tissue.',
        'Нужен яркий рассеянный свет без прямого полуденного солнца. В тени полосы бледнеют, а жаркое солнце обжигает светлые ткани.',
      ],
      notes: [
        'The striped, strongly waved fronds form a loose sculptural rosette; fresh growth may emerge paler before its pattern settles.',
        'Полосатые сильно волнистые вайи образуют свободную скульптурную розетку; молодой прирост может быть светлее, пока рисунок не проявится полностью.',
      ],
      origin: [
        'A cultivated form of a wet-tropical species native from Malesia to northern and north-eastern Queensland',
        'Культурная форма влажнотропического вида из Малезии, севера и северо-востока Квинсленда',
      ],
      overview: [
        "Asplenium nidus 'Variegata' is a variegated bird's-nest fern with long glossy fronds marked by fine cream stripes along the veins. The undivided but strongly waved foliage rises from a central nest and gives the plant an airy fountain-like silhouette.",
        'Асплениум гнездовой «Вариегата» — пестролистный папоротник с длинными глянцевыми вайями, покрытыми тонкими кремовыми полосами вдоль жилок. Цельная, но сильно волнистая листва выходит из центральной розетки и образует воздушный фонтанный силуэт.',
      ],
      plantType: [
        'Evergreen epiphytic rosette fern',
        'Вечнозелёный эпифитный розеточный папоротник',
      ],
      problems: [
        [
          'Brown crisp tips — increase humidity and check for dry substrate or cold draughts.',
          'Yellow soft fronds or a dark crown — stop watering and inspect the crown and roots for rot.',
          'Faded striping — provide brighter filtered light; bleached dry patches indicate sun scorch.',
          'Sticky fronds, pale stippling or distorted growth — isolate and inspect for scale, mites or thrips.',
        ],
        [
          'Коричневые сухие кончики — повысьте влажность и проверьте пересушку грунта или холодный сквозняк.',
          'Жёлтые мягкие вайи или потемневший центр — прекратите полив и проверьте розетку и корни на гниль.',
          'Бледные полосы — добавьте яркого рассеянного света; выцветшие сухие пятна говорят о солнечном ожоге.',
          'Липкость, светлый крап или деформированный прирост — изолируйте растение и проверьте на щитовку, клеща и трипса.',
        ],
      ],
      propagation: [
        'Propagate from freshly collected spores at about 21 °C in a sterile, constantly humid medium. Divide only a mature plant that has naturally formed separate rooted crowns; never cut the single central rosette.',
        'Размножайте свежими спорами при температуре около 21 °C в стерильной постоянно влажной среде. Делите только взрослое растение, которое само образовало отдельные укоренённые розетки; единственный центр разрезать нельзя.',
      ],
      repotting: [
        'Repot every two to three years or when roots fill the pot. Choose a container only slightly larger and keep the crown above the substrate.',
        'Пересаживайте раз в два-три года или когда корни заполнят горшок. Берите ёмкость лишь немного больше и оставляйте центр розетки над грунтом.',
      ],
      secondaryCare: [
        ['Crown care', 'Уход за центром розетки'],
        [
          'Keep the central nest free of fallen leaves and substrate. Remove debris carefully without touching the tender coiled new fronds.',
          'Не допускайте скопления опавших листьев и грунта в центре розетки. Убирайте мусор осторожно, не задевая нежные свёрнутые молодые вайи.',
        ],
      ],
      soil: [
        'Use an airy, moisture-retentive mix such as 50% fine bark or coco chips, 30% fern compost and 20% perlite, with reliable drainage.',
        'Используйте воздушный влагоёмкий грунт: например, 50% мелкой коры или кокосовых чипсов, 30% грунта для папоротников и 20% перлита, с надёжным дренажем.',
      ],
      temperature: [
        'Keep at 18–27 °C and above 15 °C in winter. Protect the crown from cold glass, air-conditioners and sharp temperature changes.',
        'Содержите при 18–27 °C и не ниже 15 °C зимой. Защищайте розетку от холодного стекла, кондиционера и резких перепадов температуры.',
      ],
      watering: [
        'Keep the mix lightly and evenly moist, letting the top 1–2 cm dry first. Water around the pot rim and drain all excess from the saucer.',
        'Поддерживайте грунт слегка и равномерно влажным, давая верхним 1–2 см подсохнуть. Поливайте по краю горшка и сливайте лишнюю воду из поддона.',
      ],
    }),
  ),
  collectionPlant(
    'polypodiaceae',
    'phlebodium-aureum-davana',
    '/plants/phlebodium-aureum-davana-home-photo.webp',
    ['Phlebodium Davana', 'Плебодиум Давана'],
    simplePlantProfile({
      assets: {
        importantImage: '/plant-profile/phlebodium-aureum-davana-important.webp',
        propagationImage: '/plant-profile/phlebodium-aureum-davana-propagation.webp',
      },
      difficulty: 2,
      facts: [
        [
          "'Davana' is recognised by broad, frilled and deeply lobed green to blue-green fronds.",
          'Round golden sori on the underside of mature fronds produce spores and are not pests.',
          'The species name aureum refers to the golden scales covering its creeping rhizome.',
        ],
        [
          'Сорт «Давана» узнают по широким, волнистым и глубоко рассечённым зелёным или сизо-зелёным вайям.',
          'Круглые золотистые сорусы на нижней стороне зрелых вай образуют споры и не являются вредителями.',
          'Видовое название aureum связано с золотистыми чешуйками на ползучем корневище.',
        ],
      ],
      family: ['Polypody family (Polypodiaceae)', 'Многоножковые (Polypodiaceae)'],
      feeding: [
        'Feed every four to six weeks in spring and summer with a balanced fertiliser at half strength. Do not feed dry or stressed roots.',
        'Весной и летом подкармливайте раз в четыре-шесть недель половинной дозой сбалансированного удобрения. Не удобряйте сухие или ослабленные корни.',
      ],
      growth: ['Moderate', 'Умеренный'],
      height: ['Usually 20–50 cm indoors', 'Обычно 20–50 см в комнате'],
      humidity: [
        'Aim for 50–70% humidity with gentle air movement. Keep away from radiators; a humidifier is safer than constantly wetting the fronds.',
        'Поддерживайте влажность 50–70% и мягкое движение воздуха. Держите подальше от батарей; увлажнитель безопаснее постоянного смачивания вай.',
      ],
      important: [
        'Keep the creeping golden-scaled rhizome on the substrate surface: burying it in a wet mix can cause rot. Neat rows of round sori beneath mature fronds are a normal part of the fern life cycle.',
        'Оставляйте ползучее золотисто-чешуйчатое корневище на поверхности: в сыром грунте заглублённое корневище может загнить. Ровные ряды круглых сорусов под зрелыми вайями — нормальная часть жизни папоротника.',
      ],
      latinName: "Phlebodium aureum 'Davana'",
      light: [
        'Give bright filtered light or light partial shade. Protect the fronds from harsh midday sun, especially behind hot glass.',
        'Обеспечьте яркий рассеянный свет или лёгкую полутень. Защищайте вайи от жёсткого полуденного солнца, особенно за нагретым стеклом.',
      ],
      notes: [
        'The crown is already dense and lively, with fronds of different ages spreading freely around the pot. The irregular outline suits this naturally architectural fern.',
        'Крона уже густая и живая: вайи разного возраста свободно расходятся вокруг горшка. Неровный силуэт хорошо подходит этому естественно архитектурному папоротнику.',
      ],
      origin: [
        'The species is native from the south-eastern United States and the Caribbean to tropical South America',
        'Вид происходит с юго-востока США, Карибских островов и из тропической Южной Америки',
      ],
      overview: [
        "Phlebodium aureum 'Davana' is an evergreen rhizomatous fern with broad frilled fronds growing from a creeping golden-scaled rhizome. It does not flower: its ornamental value comes from the sculptural foliage and the changing texture of new growth.",
        'Плебодиум золотистый «Давана» — вечнозелёный корневищный папоротник с широкими волнистыми вайями, растущими из ползучего золотисто-чешуйчатого корневища. Он не цветёт: его декоративность создают скульптурная листва и меняющаяся фактура молодого прироста.',
      ],
      plantType: [
        'Evergreen rhizomatous epiphytic fern',
        'Вечнозелёный корневищный эпифитный папоротник',
      ],
      problems: [
        [
          'Brown crisp edges — raise humidity and check for drought or excess fertiliser salts.',
          'Yellow soft fronds or a dark soft rhizome — reduce watering and inspect for rot.',
          'Pale sparse growth — move gradually to brighter filtered light.',
          'Distorted new fronds or silvery marks — isolate and inspect for thrips or mites.',
        ],
        [
          'Коричневые сухие края — повысьте влажность и проверьте пересушку или избыток солей удобрения.',
          'Жёлтые мягкие вайи или потемневшее мягкое корневище — сократите полив и проверьте на гниль.',
          'Бледный редкий прирост — постепенно переставьте на более яркий рассеянный свет.',
          'Деформированные молодые вайи или серебристые следы — изолируйте и проверьте на трипса или клеща.',
        ],
      ],
      propagation: [
        'In warm active growth, divide the creeping rhizome so each section has roots and at least one active bud or frond. Lay every piece on the surface of a loose moist mix, secure it gently and never bury the rhizome.',
        'В тёплый период активного роста разделите ползучее корневище так, чтобы у каждой части остались корни и хотя бы одна активная почка или вайя. Уложите части на поверхность рыхлого влажного грунта, аккуратно закрепите и не заглубляйте корневище.',
      ],
      repotting: [
        'Repot in spring when the rhizome reaches the pot edge or the mix breaks down. Choose a shallow wide pot with drainage and keep the rhizome at the same surface level.',
        'Пересаживайте весной, когда корневище достигнет края горшка или грунт потеряет структуру. Выбирайте неглубокую широкую ёмкость с дренажом и сохраняйте корневище на прежнем уровне поверхности.',
      ],
      secondaryCare: [
        ['Frond and rhizome care', 'Уход за вайями и корневищем'],
        [
          'Remove only fully dry fronds at their base with clean scissors. Do not scrape the natural golden scales from the rhizome, and keep its growing tips uncovered.',
          'Срезайте чистыми ножницами только полностью высохшие вайи у основания. Не счищайте естественные золотистые чешуйки с корневища и оставляйте его растущие кончики открытыми.',
        ],
      ],
      soil: [
        'Use a loose epiphytic mix of about 45% peat-free houseplant compost or coco, 30% fine bark or coco chips and 25% perlite or pumice.',
        'Используйте рыхлую эпифитную смесь примерно из 45% безторфяного грунта или кокоса, 30% мелкой коры или кокосовых чипсов и 25% перлита или пемзы.',
      ],
      temperature: [
        'Keep at 18–26 °C during growth and preferably above 15 °C in winter. Protect from cold draughts and chilled wet roots.',
        'В период роста содержите при 18–26 °C, зимой желательно выше 15 °C. Защищайте от холодных сквозняков и переохлаждённых мокрых корней.',
      ],
      watering: [
        'Water thoroughly when the top 1–2 cm of the mix begins to dry. Keep it lightly and evenly moist, but never waterlogged, and do not allow the root ball to dry completely for long.',
        'Обильно поливайте, когда верхние 1–2 см смеси начинают подсыхать. Поддерживайте лёгкую равномерную влажность без заболачивания и не оставляйте ком полностью сухим надолго.',
      ],
    }),
  ),
  collectionPlant(
    'asparagaceae',
    'asparagus-densiflorus-sprengeri',
    '/plants/asparagus-densiflorus-sprengeri-home-photo.webp',
    ['Sprenger asparagus', 'Аспарагус Шпренгера'],
    simplePlantProfile({
      assets: {
        importantImage: '/plant-profile/asparagus-densiflorus-sprengeri-important.webp',
        propagationImage: '/plant-profile/asparagus-densiflorus-sprengeri-propagation.webp',
      },
      difficulty: 2,
      facts: [
        [
          'Despite its airy fern-like appearance, this plant is a flowering relative of edible asparagus rather than a true fern.',
          'Its needle-like “leaves” are cladodes: flattened green stem parts that perform photosynthesis.',
          'Mature plants can produce small white flowers followed by round red berries.',
        ],
        [
          'Несмотря на воздушный облик папоротника, это цветковый родственник съедобной спаржи, а не настоящий папоротник.',
          'Игольчатые «листья» — это кладодии: уплощённые зелёные части стебля, выполняющие фотосинтез.',
          'Взрослое растение может образовывать мелкие белые цветки, а затем круглые красные ягоды.',
        ],
      ],
      family: ['Asparagus family (Asparagaceae)', 'Спаржевые (Asparagaceae)'],
      feeding: [
        'Feed every three to four weeks from spring to early autumn with a balanced foliage fertiliser at half strength. Do not feed dry roots.',
        'С весны до начала осени подкармливайте раз в три-четыре недели половинной дозой сбалансированного удобрения для декоративно-лиственных. Не удобряйте сухие корни.',
      ],
      growth: ['Moderate to fast', 'Умеренный или быстрый'],
      height: ['Shoots usually 60–150 cm indoors', 'Побеги обычно 60–150 см в комнате'],
      humidity: [
        'Average to moderately high room humidity is suitable. Keep away from hot radiators; prolonged dry air and drought cause cladodes to brown and shed.',
        'Подходит обычная или умеренно повышенная комнатная влажность. Держите растение подальше от горячих батарей: длительная сухость воздуха и грунта вызывает побурение и осыпание кладодиев.',
      ],
      important: [
        'Older stems may carry small recurved thorns, and the red berries are harmful if eaten. Wear gloves when untangling or pruning mature shoots and keep fruits away from children and pets.',
        'На старых побегах могут появляться небольшие загнутые колючки, а красные ягоды вредны при проглатывании. Разбирайте и обрезайте взрослые побеги в перчатках, держите плоды подальше от детей и животных.',
      ],
      latinName: 'Asparagus densiflorus Sprengeri Group',
      light: [
        'Give bright filtered light or light partial shade with gentle morning or evening sun. Harsh midday rays can bleach and scorch the fine cladodes.',
        'Обеспечьте яркий рассеянный свет или лёгкую полутень с мягким утренним либо вечерним солнцем. Жёсткие полуденные лучи обесцвечивают и обжигают тонкие кладодии.',
      ],
      notes: [
        'The clump has a dense upright centre and several long stems that arch freely to one side. This asymmetric fountain-and-cascade shape is natural for Sprenger asparagus and will become fuller as new shoots emerge from the base.',
        'У куста густая вертикальная середина и несколько длинных побегов, свободно изгибающихся в одну сторону. Такая асимметричная фонтанно-каскадная форма естественна для аспарагуса Шпренгера и станет пышнее по мере появления новых побегов от основания.',
      ],
      origin: ['Mozambique to South Africa', 'От Мозамбика до Южной Африки'],
      overview: [
        'Sprenger asparagus is a tuberous-rooted evergreen perennial with long arching or trailing stems clothed in clusters of narrow green cladodes. Its loose airy crown works especially well on a stand or in a hanging container.',
        'Аспарагус Шпренгера — вечнозелёный многолетник с клубневидными запасающими корнями и длинными дуговидными или свисающими побегами, покрытыми пучками узких зелёных кладодиев. Его свободная воздушная крона особенно выразительна на подставке или в подвесном горшке.',
      ],
      plantType: [
        'Tuberous-rooted evergreen perennial',
        'Вечнозелёный многолетник с клубневидными корнями',
      ],
      problems: [
        [
          'Yellow soft growth or dark roots — reduce watering and inspect for rot.',
          'Brown brittle cladodes and heavy shedding — check for drought, hot dry air or excess salts.',
          'Pale stretched shoots — move gradually to brighter filtered light.',
          'Fine webbing and pale speckling — isolate and inspect for spider mites.',
        ],
        [
          'Жёлтый мягкий прирост или потемневшие корни — сократите полив и проверьте растение на гниль.',
          'Сухие коричневые кладодии и сильное осыпание — проверьте пересушку, горячий сухой воздух и избыток солей.',
          'Бледные вытянутые побеги — постепенно переставьте на более яркий рассеянный свет.',
          'Тонкая паутина и светлый крап — изолируйте растение и проверьте на паутинного клеща.',
        ],
      ],
      propagation: [
        'During spring repotting, divide a mature clump so each section keeps several shoots, fine roots and some fleshy storage tubers. Plant at the original depth in a small pot, water lightly and keep in bright filtered light until growth resumes.',
        'При весенней пересадке разделите взрослый куст так, чтобы у каждой части осталось несколько побегов, тонкие корни и часть мясистых запасающих клубней. Посадите на прежнюю глубину в небольшой горшок, слегка полейте и держите на ярком рассеянном свету до возобновления роста.',
      ],
      repotting: [
        'Repot in spring when the dense roots and storage tubers crowd or distort the pot. Choose a stable container only one size larger and keep the crown at its previous level.',
        'Пересаживайте весной, когда густые корни и запасающие клубни заполняют или деформируют горшок. Выбирайте устойчивую ёмкость лишь на размер больше и сохраняйте прежний уровень основания куста.',
      ],
      secondaryCare: [
        ['Shaping and grooming', 'Формировка и уход'],
        [
          'Let healthy stems arch naturally and cut fully yellow, bare or damaged shoots cleanly at the base. Avoid shortening every tip into a rigid ball; removing an old stem entirely preserves the graceful habit.',
          'Позвольте здоровым побегам изгибаться естественно, а полностью пожелтевшие, оголённые или повреждённые срезайте у основания. Не укорачивайте все концы до строгого шара: полное удаление старого побега лучше сохраняет изящный силуэт.',
        ],
      ],
      soil: [
        'Use an airy moisture-retentive mix of about 55% houseplant compost or coco, 25% fine bark and 20% perlite or pumice in a pot with drainage holes.',
        'Используйте воздушную влагоёмкую смесь примерно из 55% грунта для комнатных растений или кокоса, 25% мелкой коры и 20% перлита либо пемзы в горшке с дренажными отверстиями.',
      ],
      temperature: [
        'Keep at 16–26 °C, preferably above 10 °C in winter. Protect the fine growth and moist root ball from cold glass, draughts and frost.',
        'Содержите при 16–26 °C, зимой желательно выше 10 °C. Защищайте нежный прирост и влажный корневой ком от холодного стекла, сквозняков и мороза.',
      ],
      watering: [
        'Water thoroughly when the top 2–3 cm of mix has dried, then drain the saucer. Keep the root ball lightly and evenly moist during active growth, but never waterlogged; water less in winter.',
        'Обильно поливайте после просыхания верхних 2–3 см грунта и сливайте воду из поддона. Во время активного роста поддерживайте лёгкую равномерную влажность без заболачивания, зимой поливайте реже.',
      ],
    }),
  ),
  collectionPlant(
    'balsaminaceae',
    'impatiens-new-guinea-pink',
    '/plants/impatiens-new-guinea-pink-home-photo.webp',
    ['Pink New Guinea impatiens', 'Бальзамин новогвинейский, розовый'],
    simplePlantProfile({
      assets: {
        importantImage: '/plant-profile/impatiens-new-guinea-pink-important.webp',
        propagationImage: '/plant-profile/impatiens-new-guinea-pink-propagation.webp',
      },
      difficulty: 2,
      facts: [
        [
          'The name Impatiens refers to ripe capsules that spring open and scatter their seeds when touched.',
          'New Guinea impatiens are a garden hybrid group derived from several species, especially Impatiens hawkeri.',
          'Their asymmetric flowers carry a curved nectar spur behind the petals.',
          'Warmth and bright filtered light can support repeated flowering for much of the year indoors.',
        ],
        [
          'Название Impatiens связано со зрелыми коробочками, которые при прикосновении мгновенно раскрываются и разбрасывают семена.',
          'Новогвинейские бальзамины — садовая гибридная группа на основе нескольких видов, прежде всего Impatiens hawkeri.',
          'У их несимметричных цветков за лепестками расположен изогнутый нектарный шпорец.',
          'В тепле и при ярком рассеянном свете растение способно повторно цвести большую часть года.',
        ],
      ],
      family: ['Balsam family (Balsaminaceae)', 'Бальзаминовые (Balsaminaceae)'],
      feeding: [
        'From spring to early autumn, feed every two to three weeks with a balanced flowering-plant fertiliser at half strength. Apply only to already moist soil.',
        'С весны до начала осени подкармливайте раз в две-три недели половинной дозой сбалансированного удобрения для цветущих растений. Вносите его только по уже влажному грунту.',
      ],
      growth: ['Fast', 'Быстрый'],
      height: ['Usually 30–60 cm indoors', 'Обычно 30–60 см в комнате'],
      humidity: [
        'Aim for moderate humidity around 45–65% with gentle airflow. Avoid repeatedly wetting flowers and crowded foliage, which encourages spotting and rot.',
        'Поддерживайте умеренную влажность около 45–65% и мягкое движение воздуха. Не мочите постоянно цветки и густую листву: это провоцирует пятна и гниль.',
      ],
      important: [
        'The juicy stems are brittle and snap easily. Turn, tie and pinch the plant gently, and never leave the soft root system standing in water.',
        'Сочные стебли хрупкие и легко ломаются. Поворачивайте, подвязывайте и прищипывайте растение осторожно, а мягкие корни никогда не оставляйте в стоячей воде.',
      ],
      latinName: 'Impatiens New Guinea Group',
      light: [
        'Give bright filtered light with a little gentle morning or evening sun. Protect the dark leaves and flowers from hot midday rays behind glass.',
        'Обеспечьте яркий рассеянный свет и немного мягкого утреннего или вечернего солнца. Защищайте тёмную листву и цветки от жарких полуденных лучей за стеклом.',
      ],
      notes: [
        'This upright young plant has burgundy succulent stems, bronze-green serrated leaves and vivid pink buds. Pinching the growing tips after flowering will help it branch into a fuller, more relaxed crown.',
        'У молодого прямостоячего растения бордовые сочные стебли, бронзово-зелёные зубчатые листья и ярко-розовые бутоны. Прищипка точек роста после цветения поможет сформировать более пышную свободную крону.',
      ],
      origin: [
        'Cultivated hybrid group derived from species native to New Guinea and nearby Pacific islands',
        'Садовая гибридная группа на основе видов из Новой Гвинеи и соседних островов Тихого океана',
      ],
      overview: [
        'Pink New Guinea impatiens is a warm-growing evergreen perennial with glossy dark foliage, reddish succulent stems and broad vivid flowers. Compared with common bedding impatiens, it has larger, more architectural leaves and appreciates brighter filtered light.',
        'Розовый новогвинейский бальзамин — теплолюбивый вечнозелёный многолетник с глянцевой тёмной листвой, красноватыми сочными стеблями и крупными яркими цветками. От обычного садового бальзамина он отличается более крупными архитектурными листьями и предпочитает более яркий рассеянный свет.',
      ],
      plantType: [
        'Tender evergreen herbaceous perennial',
        'Теплолюбивый вечнозелёный травянистый многолетник',
      ],
      problems: [
        [
          'Leaves hang limp while the mix is dry — water thoroughly and shield from excessive heat.',
          'Yellow leaves and soft dark stems — reduce watering and inspect the roots for rot.',
          'Pale stretched growth or few buds — increase filtered light and review feeding.',
          'Distorted tips, sticky residue or fine webbing — isolate and inspect for aphids, thrips or spider mites.',
        ],
        [
          'Листья повисли, а грунт сухой — обильно полейте и защитите растение от чрезмерной жары.',
          'Листья желтеют, стебли темнеют и размягчаются — сократите полив и проверьте корни на гниль.',
          'Прирост бледный и вытянутый, бутонов мало — добавьте рассеянного света и скорректируйте подкормки.',
          'Верхушки деформируются, появились липкость или тонкая паутинка — изолируйте и проверьте на тлю, трипсов и клеща.',
        ],
      ],
      propagation: [
        'Take a healthy 7–10 cm tip cutting just below a node, remove the lower pair of leaves and root it in water or a lightly moist airy mix. Keep warm in bright filtered light and pot when several pale roots are 2–4 cm long.',
        'Срежьте здоровый верхушечный черенок длиной 7–10 см сразу под узлом, удалите нижнюю пару листьев и укореняйте в воде или слегка влажной воздушной смеси. Держите в тепле на ярком рассеянном свету и посадите, когда несколько светлых корней достигнут 2–4 см.',
      ],
      repotting: [
        'Repot in spring when roots fill the container, moving up only one size. Keep the stem bases at the same depth and always use a pot with open drainage holes.',
        'Пересаживайте весной, когда корни заполнят ёмкость, увеличивая горшок лишь на один размер. Сохраняйте прежнюю глубину оснований стеблей и обязательно используйте открытые дренажные отверстия.',
      ],
      secondaryCare: [
        ['Pinching and flowering', 'Прищипка и цветение'],
        [
          'Remove faded flowers and pinch long soft tips above a leaf node to encourage side shoots. Make small cuts regularly instead of one severe pruning of the fragile crown.',
          'Удаляйте увядшие цветки и прищипывайте вытянувшиеся мягкие верхушки над листовым узлом, чтобы стимулировать боковые побеги. Лучше делать небольшие срезы регулярно, чем один раз сильно обрезать хрупкую крону.',
        ],
      ],
      soil: [
        'Use an airy moisture-retentive mix such as 60% houseplant compost or coco, 20% fine bark and 20% perlite. The pot must drain freely while the mix remains lightly moist.',
        'Используйте воздушную влагоёмкую смесь: примерно 60% грунта для комнатных растений или кокоса, 20% мелкой коры и 20% перлита. Горшок должен свободно отводить воду, а смесь — сохранять лёгкую влажность.',
      ],
      temperature: [
        'Keep at 18–26 °C and preferably above 15 °C. Protect the soft growth from cold glass, draughts and sudden temperature drops.',
        'Содержите при 18–26 °C и желательно не ниже 15 °C. Защищайте мягкий прирост от холодного стекла, сквозняков и резких падений температуры.',
      ],
      watering: [
        'Water thoroughly when the upper 1–2 cm of the mix begins to dry, then empty the saucer. Keep the root ball lightly and evenly moist without constant saturation or prolonged drought.',
        'Обильно поливайте, когда верхние 1–2 см смеси начинают подсыхать, затем сливайте воду из поддона. Поддерживайте лёгкую равномерную влажность без постоянной сырости и длительной пересушки.',
      ],
    }),
  ),
  collectionPlant(
    'podocarpaceae',
    'podocarpus-macrophyllus',
    '/plants/podocarpus-macrophyllus-home-photo.webp',
    ['Buddhist pine bonsai', 'Подокарпус крупнолистный'],
    simplePlantProfile({
      assets: {
        importantImage: '/plant-profile/podocarpus-macrophyllus-important.webp',
        propagationImage: '/plant-profile/podocarpus-macrophyllus-propagation.webp',
      },
      difficulty: 3,
      facts: [
        [
          'Despite its common name, Buddhist pine is not a true pine.',
          'Its flat strap-like leaves are arranged spirally around the shoots.',
          'Regular pinching keeps the crown compact without hiding the trained trunk.',
        ],
        [
          'Несмотря на обиходное название, подокарпус не относится к настоящим соснам.',
          'Плоские ремневидные листья расположены по спирали вокруг побегов.',
          'Регулярная прищипка сохраняет компактную крону и не скрывает сформированный ствол.',
        ],
      ],
      family: ['Podocarp family (Podocarpaceae)', 'Подокарповые (Podocarpaceae)'],
      feeding: [
        'Feed every three to four weeks from spring to early autumn with a balanced fertiliser at half strength. Do not feed a stressed or freshly repotted tree.',
        'С весны до начала осени подкармливайте раз в три-четыре недели половинной дозой сбалансированного удобрения. Не удобряйте ослабленное или недавно пересаженное дерево.',
      ],
      growth: ['Slow to moderate', 'Медленный или умеренный'],
      height: ['30–100 cm as an indoor bonsai', '30–100 см в форме комнатного бонсай'],
      humidity: [
        'Average room humidity is suitable, but keep the tree away from hot dry radiators. Good air movement is more useful than constant misting.',
        'Подходит обычная комнатная влажность, но дерево нужно держать подальше от горячих батарей. Хорошее движение воздуха полезнее постоянных опрыскиваний.',
      ],
      important: [
        'A shallow bonsai pot can swing quickly from dry to waterlogged. Check the substrate by touch, water thoroughly only when the surface begins to dry, and never leave water in the tray.',
        'Неглубокий горшок бонсай может быстро переходить от пересушки к переувлажнению. Проверяйте грунт пальцем, обильно поливайте после начала просыхания поверхности и никогда не оставляйте воду в поддоне.',
      ],
      latinName: 'Podocarpus macrophyllus',
      light: [
        'Give very bright diffused light with gentle morning or evening sun. Rotate the pot regularly so the crown does not grow only towards the window.',
        'Нужен очень яркий рассеянный свет с мягким утренним или вечерним солнцем. Регулярно поворачивайте горшок, чтобы крона не росла только в сторону окна.',
      ],
      notes: [
        'My tree already has a strongly curved trunk and an informal crown with several uneven leaf pads. I am keeping that personal, slightly untidy character while gradually removing only shoots that hide the trunk line.',
        'У моего дерева уже сформирован сильно изогнутый ствол и свободная крона из нескольких неровных пучков листвы. Я сохраняю этот живой, немного небрежный характер и постепенно убираю только побеги, скрывающие линию ствола.',
      ],
      origin: [
        'Southern and south-eastern China, northern Myanmar, Taiwan and Japan',
        'Юг и юго-восток Китая, север Мьянмы, Тайвань и Япония',
      ],
      overview: [
        'Podocarpus macrophyllus is an evergreen East Asian conifer with narrow glossy leaves rather than needles. Its flexible shoots, textured bark and tolerance of pruning make it a classic bonsai subject with a calm, architectural silhouette.',
        'Подокарпус крупнолистный — вечнозелёное восточноазиатское хвойное растение с узкими глянцевыми листьями вместо иголок. Гибкие побеги, фактурная кора и хорошая переносимость обрезки делают его классическим бонсай со спокойным архитектурным силуэтом.',
      ],
      plantType: [
        'Evergreen conifer trained as bonsai',
        'Вечнозелёное хвойное дерево, сформированное как бонсай',
      ],
      problems: [
        [
          'Yellowing lower leaves — check for stagnant moisture or an abrupt light change.',
          'Dry brittle tips — the root ball may have dried too far or stood near hot air.',
          'White cottony clusters or brown shields — isolate and inspect for mealybugs or scale.',
        ],
        [
          'Желтеющие нижние листья — проверьте застой влаги и резкую смену освещения.',
          'Сухие ломкие кончики — корневой ком мог сильно пересохнуть или стоять у горячего воздуха.',
          'Белые ватные комочки или коричневые щитки — изолируйте растение и проверьте на червеца или щитовку.',
        ],
      ],
      propagation: [
        'In late summer, take a 10–15 cm semi-ripe heel cutting, remove the lower leaves and root it in a lightly moist mix of perlite and fine bark under high humidity. Rooting is slow and may take several months.',
        'В конце лета возьмите полуодревесневший черенок с пяткой длиной 10–15 см, удалите нижние листья и укореняйте в слегка влажной смеси перлита и мелкой коры при высокой влажности. Корни образуются медленно, иногда несколько месяцев.',
      ],
      repotting: [
        'Repot in spring every two to three years as growth begins. Prune roots moderately, keep part of the old root ball intact and return the tree to a stable shallow pot with drainage mesh.',
        'Пересаживайте весной раз в два-три года в начале роста. Умеренно подрежьте корни, сохраните часть старого кома и посадите дерево в устойчивую неглубокую ёмкость с сеткой на дренажных отверстиях.',
      ],
      secondaryCare: [
        ['Bonsai shaping', 'Формирование бонсай'],
        [
          'Pinch fresh shoots after they lengthen, leaving a few leaves on each branch. Prune selectively to reveal the trunk line; wire only flexible young branches and remove wire before it marks the bark.',
          'Прищипывайте вытянувшийся молодой прирост, оставляя на каждой ветви несколько листьев. Выборочно открывайте линию ствола; проволоку накладывайте только на гибкие молодые ветви и снимайте до появления следов на коре.',
        ],
      ],
      soil: [
        'Use a free-draining bonsai mix with akadama or fired clay, pumice and fine bark. The mix should hold a little moisture while allowing air to reach the fine roots.',
        'Используйте дренированный грунт для бонсай из акадамы или обожжённой глины, пемзы и мелкой коры. Смесь должна удерживать немного влаги и пропускать воздух к тонким корням.',
      ],
      temperature: [
        'Keep at 16–26 °C during active growth. A bright cooler winter around 10–16 °C is helpful; protect the shallow root ball from frost and cold draughts.',
        'В период роста содержите при 16–26 °C. Полезна светлая прохладная зимовка при 10–16 °C; защищайте неглубокий корневой ком от мороза и холодных сквозняков.',
      ],
      watering: [
        'Water thoroughly when the top layer has just begun to dry, until water runs from the drainage holes. Do not let the whole root ball become bone-dry or remain constantly saturated.',
        'Обильно поливайте, когда верхний слой только начал подсыхать, пока вода не выйдет из дренажных отверстий. Не пересушивайте ком полностью и не держите его постоянно мокрым.',
      ],
    }),
  ),
  collectionPlant(
    'marantaceae',
    'maranta-leuconeura-erythroneura',
    '/plants/maranta-leuconeura-erythroneura-home-photo.webp',
    ["Red prayer plant 'Erythroneura'", 'Маранта беложильчатая Эритроневра'],
    simplePlantProfile({
      assets: {
        importantImage: '/plant-profile/maranta-erythroneura-important.webp',
        propagationImage: '/plant-profile/maranta-erythroneura-propagation.webp',
      },
      difficulty: 3,
      facts: [
        [
          'The leaves fold upward in dim evening light, giving prayer plants their common name.',
          'Red veins and lime-green feathered markings distinguish this cultivar.',
          'New leaves emerge tightly rolled from the centre of each shoot.',
        ],
        [
          'В сумерках листья поднимаются вверх, поэтому маранты называют молитвенными растениями.',
          'Сорт отличают красные жилки и салатовый перистый рисунок.',
          'Новые листья выходят из центра побега плотно свёрнутыми.',
        ],
      ],
      family: ['Prayer plant family (Marantaceae)', 'Марантовые (Marantaceae)'],
      feeding: [
        'Feed every four weeks from spring to early autumn with half-strength foliage fertiliser.',
        'С весны до начала осени подкармливайте раз в четыре недели половинной дозой удобрения для декоративно-лиственных.',
      ],
      growth: ['Moderate', 'Умеренный'],
      height: ['Usually 25–40 cm', 'Обычно 25–40 см'],
      humidity: [
        'Aim for 55–70% humidity with gentle airflow. Keep the plant away from hot radiators and dry draughts.',
        'Поддерживайте влажность 55–70% и лёгкое движение воздуха. Держите растение вдали от батарей и сухих сквозняков.',
      ],
      important: [
        'Marantas react strongly to hard water and accumulated salts. Use soft water and flush the substrate occasionally to prevent crisp brown edges.',
        'Маранты чувствительны к жёсткой воде и накоплению солей. Используйте мягкую воду и иногда промывайте грунт, чтобы края листьев не сохли.',
      ],
      latinName: 'Maranta leuconeura var. erythroneura',
      light: [
        'Give bright diffused light without direct midday sun. Deep shade weakens the pattern, while harsh rays bleach and scorch the leaves.',
        'Нужен яркий рассеянный свет без прямого полуденного солнца. В глубокой тени рисунок слабеет, а жёсткие лучи обесцвечивают и обжигают листья.',
      ],
      notes: [
        'The broad dark leaves of my plant carry especially vivid pink-red veins. Its naturally spreading crown looks lively even when the leaves point in different directions.',
        'На широких тёмных листьях моей маранты особенно ярко видны розово-красные жилки. Её естественно раскидистая крона выглядит живой, даже когда листья направлены в разные стороны.',
      ],
      origin: ['Cultivated form of a Brazilian species', 'Культурная форма вида из Бразилии'],
      overview: [
        "'Erythroneura' is a compact tropical perennial with oval dark-green leaves, lime feathering and vivid red veins. Its foliage changes position through the day in response to light.",
        '«Эритроневра» — компактный тропический многолетник с овальными тёмно-зелёными листьями, салатовым перистым рисунком и яркими красными жилками. В течение дня листва меняет положение вслед за светом.',
      ],
      plantType: ['Evergreen rhizomatous perennial', 'Вечнозелёный корневищный многолетник'],
      problems: [
        [
          'Crisp brown edges — check humidity, water quality and fertiliser buildup.',
          'Rolled leaves in daytime — inspect for drought, heat or spider mites.',
          'Yellow soft leaves — let the mix breathe and inspect the roots.',
        ],
        [
          'Сухие коричневые края — проверьте влажность, качество воды и накопление удобрений.',
          'Листья свёрнуты днём — проверьте пересушку, жару и паутинного клеща.',
          'Мягкие жёлтые листья — дайте грунту подышать и проверьте корни.',
        ],
      ],
      propagation: [
        'During a warm-season repot, divide the rhizome so every section keeps several shoots and healthy roots. Pot each division at the original depth in a small container.',
        'При пересадке в тёплый сезон разделите корневище так, чтобы у каждой части осталось несколько побегов и здоровые корни. Посадите делёнки на прежнюю глубину в небольшие горшки.',
      ],
      repotting: [
        'Repot in spring when roots fill the pot, moving up only one size and keeping the shallow rhizome at its former level.',
        'Пересаживайте весной после заполнения горшка корнями, увеличивая ёмкость лишь на один размер и сохраняя прежний уровень корневища.',
      ],
      secondaryCare: [
        ['Leaf care', 'Уход за листьями'],
        [
          'Rinse dust gently with lukewarm water and let the leaves dry in moving air. Remove only fully yellow or dry foliage at the base.',
          'Аккуратно смывайте пыль тёплой водой и давайте листьям высохнуть при движении воздуха. Удаляйте у основания только полностью пожелтевшие или сухие листья.',
        ],
      ],
      soil: [
        'Use an airy moisture-retentive mix with coco or light compost, fine bark and perlite in a pot with drainage holes.',
        'Используйте воздушную влагоёмкую смесь из кокоса или лёгкого грунта, мелкой коры и перлита в горшке с дренажными отверстиями.',
      ],
      temperature: [
        'Keep at 19–27 °C and protect from cold glass, draughts and temperatures below 16 °C.',
        'Содержите при 19–27 °C и защищайте от холодного стекла, сквозняков и температуры ниже 16 °C.',
      ],
      watering: [
        'Water with soft room-temperature water when the top 1–2 cm dries. Keep the mix lightly even, never saturated or bone-dry.',
        'Поливайте мягкой водой комнатной температуры после просыхания верхних 1–2 см. Поддерживайте лёгкую равномерную влажность без сырости и полной пересушки.',
      ],
    }),
  ),
  collectionPlant(
    'gesneriaceae',
    'nematanthus-tropicana',
    '/plants/nematanthus-tropicana-home-photo.webp',
    ["Nematanthus 'Tropicana'", 'Нематантус Тропикана'],
    simplePlantProfile({
      assets: {
        importantImage: '/plant-profile/nematanthus-tropicana-important.webp',
        propagationImage: '/plant-profile/nematanthus-tropicana-propagation.webp',
      },
      difficulty: 2,
      facts: [
        [
          'The flowers are deep yellow with red-brown stripes and conspicuous red calyx lobes.',
          'Young stems grow upright before older branches begin to trail.',
          'Glossy, slightly fleshy leaves help the plant tolerate brief drying.',
        ],
        [
          'Цветки тёмно-жёлтые, с красно-коричневыми полосами и заметными красными долями чашечки.',
          'Молодые побеги растут вверх, а с возрастом ветви начинают свисать.',
          'Глянцевые слегка мясистые листья помогают переносить короткую пересушку.',
        ],
      ],
      family: ['Gesneriad family (Gesneriaceae)', 'Геснериевые (Gesneriaceae)'],
      feeding: [
        'Feed every three to four weeks during active growth with half-strength fertiliser for flowering plants.',
        'В период активного роста подкармливайте раз в три-четыре недели половинной дозой удобрения для цветущих растений.',
      ],
      growth: ['Moderate', 'Умеренный'],
      height: ['About 30–50 cm, then trailing', 'Около 30–50 см, затем побеги свисают'],
      humidity: [
        'Average to moderately high room humidity is suitable. Prioritise airflow over frequent misting of flowers.',
        'Подходит обычная или умеренно высокая комнатная влажность. Движение воздуха важнее частого опрыскивания цветков.',
      ],
      important: [
        "'Tropicana' is distinct from the orange pouch-flowered nematanthus already in the collection: its striped yellow corolla and red calyx are stable cultivar traits.",
        '«Тропикана» отличается от уже имеющегося нематантуса с оранжевыми цветками-мешочками: полосатый жёлтый венчик и красная чашечка — устойчивые признаки сорта.',
      ],
      latinName: "Nematanthus 'Tropicana'",
      light: [
        'Give bright diffused light with gentle morning or evening sun. Good light supports dense growth and repeated flowering.',
        'Обеспечьте яркий рассеянный свет с мягким утренним или вечерним солнцем. Хорошее освещение поддерживает густой рост и повторное цветение.',
      ],
      notes: [
        'This mature plant forms a generous cascade around the pot and carries many red-and-yellow flowers among glossy leaves.',
        'Это взрослое растение образует пышный каскад вокруг горшка и несёт множество красно-жёлтых цветков среди глянцевой листвы.',
      ],
      origin: ['Cultivated Nematanthus hybrid', 'Культурный гибрид нематантуса'],
      overview: [
        "Nematanthus 'Tropicana' is a trailing evergreen gesneriad with glossy opposite leaves and unusual striped flowers: yellow corollas marked red-brown emerge from red calyces.",
        'Нематантус «Тропикана» — свисающий вечнозелёный представитель геснериевых с глянцевыми супротивными листьями и необычными полосатыми цветками: жёлтые венчики с красно-коричневым рисунком выходят из красных чашечек.',
      ],
      plantType: ['Evergreen epiphytic subshrub', 'Вечнозелёный эпифитный полукустарник'],
      problems: [
        [
          'Leaves fall while the mix is wet — inspect for cold damage and root problems.',
          'Long bare shoots — increase diffused light and pinch after flowering.',
          'No buds — review light, feeding and the cooler winter rest.',
        ],
        [
          'Листья опадают при влажном грунте — проверьте переохлаждение и состояние корней.',
          'Длинные голые побеги — добавьте рассеянного света и прищипните после цветения.',
          'Нет бутонов — проверьте освещение, подкормки и прохладную зимовку.',
        ],
      ],
      propagation: [
        'Take 6–10 cm tip cuttings, remove the lower leaves and root one or two nodes in water or a light, slightly moist mix. Plant several together for a full pot.',
        'Возьмите верхушечные черенки длиной 6–10 см, удалите нижние листья и укорените один-два узла в воде или лёгкой слегка влажной смеси. Для пышности посадите несколько черенков вместе.',
      ],
      repotting: [
        'Repot after flowering or in spring when roots fill the pot. Use a container only slightly larger because the fine roots dislike stagnant moisture.',
        'Пересаживайте после цветения или весной, когда корни заполнят горшок. Берите ёмкость лишь немного больше: тонкие корни не любят застоя влаги.',
      ],
      secondaryCare: [
        ['Pruning and flowering', 'Обрезка и цветение'],
        [
          'After a flowering flush, shorten long shoots above a node to encourage branching and more flowering tips.',
          'После волны цветения укоротите длинные побеги над узлом, чтобы стимулировать ветвление и образование новых цветущих верхушек.',
        ],
      ],
      soil: [
        'Use a loose epiphytic mix of light compost, fine bark and perlite with free drainage.',
        'Используйте рыхлую эпифитную смесь из лёгкого грунта, мелкой коры и перлита со свободным оттоком воды.',
      ],
      temperature: [
        'Keep at 18–25 °C in growth. A bright winter around 15–18 °C can help initiate buds.',
        'В период роста содержите при 18–25 °C. Светлая зимовка при 15–18 °C может помочь закладке бутонов.',
      ],
      watering: [
        'Water after the top 2–3 cm dries, then drain excess completely. Reduce frequency in cool, low-light conditions.',
        'Поливайте после просыхания верхних 2–3 см и полностью сливайте лишнюю воду. В прохладе и при слабом свете сокращайте частоту.',
      ],
    }),
  ),
  collectionPlant(
    'araceae',
    'philodendron-hederaceum-brasil',
    '/plants/philodendron-hederaceum-brasil-home-photo.webp',
    ["Heartleaf philodendron 'Brasil'", 'Филодендрон сердцелистный Бразил'],
    simplePlantProfile({
      assets: {
        importantImage: '/plant-profile/philodendron-brasil-important.webp',
        propagationImage: '/plant-profile/philodendron-brasil-propagation.webp',
      },
      difficulty: 1,
      facts: [
        [
          'Every heart-shaped leaf carries a different chartreuse central stripe.',
          'Aerial roots at the nodes help the vine climb or root into moist substrate.',
          'Brighter filtered light keeps internodes shorter and variegation clearer.',
        ],
        [
          'На каждом сердцевидном листе складывается своя салатовая центральная полоса.',
          'Воздушные корни в узлах помогают лиане карабкаться или укореняться во влажном субстрате.',
          'Более яркий рассеянный свет сохраняет междоузлия короткими, а вариегатность — чёткой.',
        ],
      ],
      family: ['Arum family (Araceae)', 'Ароидные (Araceae)'],
      feeding: [
        'Feed every three to four weeks in spring and summer with half-strength balanced foliage fertiliser.',
        'Весной и летом подкармливайте раз в три-четыре недели половинной дозой сбалансированного удобрения.',
      ],
      growth: ['Fast', 'Быстрый'],
      height: ['Trails or climbs 1–2 m indoors', 'Побеги 1–2 м в комнате'],
      humidity: [
        'Average room humidity is suitable. Keep the plant away from hot dry air and clean dust from the leaves.',
        'Подходит обычная комнатная влажность. Держите растение вдали от горячего сухого воздуха и очищайте листья от пыли.',
      ],
      important: [
        'The sap contains irritating calcium oxalate crystals. Wear gloves when pruning and keep the plant and cuttings away from children and pets.',
        'Сок содержит раздражающие кристаллы оксалата кальция. При обрезке надевайте перчатки и держите растение и черенки вдали от детей и животных.',
      ],
      latinName: "Philodendron hederaceum 'Brasil'",
      light: [
        'Give bright diffused light without harsh midday sun. Low light reduces the yellow-green stripe and stretches the vine.',
        'Нужен яркий рассеянный свет без жёсткого полуденного солнца. При нехватке света жёлто-зелёная полоса уменьшается, а побеги вытягиваются.',
      ],
      notes: [
        'My plant has both climbing and trailing shoots, with broad lime flashes that make even the youngest leaves look luminous.',
        'У моего растения есть и поднимающиеся, и свисающие побеги, а широкие лаймовые мазки делают светящимися даже самые молодые листья.',
      ],
      origin: [
        'Cultivated form of a tropical American species',
        'Культурная форма тропического американского вида',
      ],
      overview: [
        "'Brasil' is a vigorous heartleaf philodendron whose dark-green leaves are painted with broad chartreuse and yellow-green bands. It can trail from a shelf or climb a support.",
        '«Бразил» — энергичный сердцелистный филодендрон с тёмно-зелёными листьями и широкими салатовыми и жёлто-зелёными полосами. Он может свисать с полки или подниматься по опоре.',
      ],
      plantType: ['Evergreen tropical climber', 'Вечнозелёная тропическая лиана'],
      problems: [
        [
          'Yellow soft leaves — let the mix dry and inspect the roots.',
          'Long bare internodes — increase filtered light and prune above a node.',
          'Loss of variegation — move gradually to a brighter position.',
        ],
        [
          'Мягкие жёлтые листья — просушите грунт и проверьте корни.',
          'Длинные голые междоузлия — добавьте рассеянного света и обрежьте над узлом.',
          'Пестролистность исчезает — постепенно переставьте в более светлое место.',
        ],
      ],
      propagation: [
        'Cut the vine into sections with one healthy node and at least one leaf. Root the node in water or an airy moist mix, then combine several cuttings in one pot.',
        'Разрежьте побег на части с одним здоровым узлом и хотя бы одним листом. Укорените узел в воде или воздушном влажном грунте, затем посадите несколько черенков вместе.',
      ],
      repotting: [
        'Repot in spring when roots circle the pot, choosing a container only slightly larger.',
        'Пересаживайте весной, когда корни оплетут горшок, выбирая ёмкость лишь немного больше.',
      ],
      secondaryCare: [
        ['Training and pruning', 'Опора и обрезка'],
        [
          'Pin vines to a support for larger leaves, or trim above a node to keep a fuller trailing plant.',
          'Закрепляйте побеги на опоре для более крупных листьев или обрезайте над узлом, чтобы свисающий куст оставался пышным.',
        ],
      ],
      soil: [
        'Use an airy aroid mix with light compost, fine bark and perlite or pumice.',
        'Используйте воздушную ароидную смесь из лёгкого грунта, мелкой коры и перлита или пемзы.',
      ],
      temperature: [
        'Keep at 18–28 °C and protect from cold draughts and temperatures below 15 °C.',
        'Содержите при 18–28 °C, защищая от холодных сквозняков и температуры ниже 15 °C.',
      ],
      watering: [
        'Water after the top 3–5 cm dries, wet the root ball fully and drain excess.',
        'Поливайте после просыхания верхних 3–5 см, полностью промачивайте корневой ком и сливайте лишнюю воду.',
      ],
    }),
  ),
  collectionPlant(
    'piperaceae',
    'peperomia-scandens-variegata',
    '/plants/peperomia-scandens-variegata-home-photo.webp',
    ["Climbing peperomia 'Variegata'", 'Пеперомия лазящая Вариегата'],
    simplePlantProfile({
      assets: {
        importantImage: '/plant-profile/peperomia-scandens-variegata-important.webp',
        propagationImage: '/plant-profile/peperomia-scandens-variegata-propagation.webp',
      },
      difficulty: 1,
      facts: [
        [
          'Small succulent heart-shaped leaves have green centres and broad cream margins.',
          'Flexible stems trail naturally and can root from their nodes.',
          'The thin upright spikes are typical peperomia inflorescences.',
        ],
        [
          'Маленькие сочные сердцевидные листья имеют зелёную середину и широкую кремовую кайму.',
          'Гибкие побеги естественно свисают и способны укореняться в узлах.',
          'Тонкие вертикальные колоски — характерные соцветия пеперомий.',
        ],
      ],
      family: ['Pepper family (Piperaceae)', 'Перечные (Piperaceae)'],
      feeding: [
        'Feed every four to six weeks in spring and summer with half-strength balanced fertiliser.',
        'Весной и летом подкармливайте раз в четыре-шесть недель половинной дозой сбалансированного удобрения.',
      ],
      growth: ['Moderate', 'Умеренный'],
      height: ['Trails 30–90 cm', 'Побеги 30–90 см'],
      humidity: [
        'Average room humidity is sufficient. Good airflow and a dry crown are more important than misting.',
        'Обычной комнатной влажности достаточно. Хорошее движение воздуха и сухое основание важнее опрыскиваний.',
      ],
      important: [
        'The fleshy leaves and stems store water, so overwatering is the main risk. Let a substantial part of the mix dry before watering again.',
        'Мясистые листья и стебли запасают воду, поэтому главная опасность — переувлажнение. Давайте значительной части грунта просохнуть перед новым поливом.',
      ],
      latinName: "Peperomia scandens 'Variegata'",
      light: [
        'Give bright diffused light with gentle morning sun. Too little light weakens the cream margins; hot midday rays scorch them.',
        'Нужен яркий рассеянный свет с мягким утренним солнцем. В тени кремовая кайма слабеет, а жаркие полуденные лучи её обжигают.',
      ],
      notes: [
        'My plant has formed a wide, soft cascade of cream-edged hearts, with several flowering spikes weaving through the stems.',
        'Моё растение образовало широкий мягкий каскад сердечек с кремовой каймой, среди которых проходят несколько цветущих колосков.',
      ],
      origin: [
        'Cultivated variegated form of a tropical American species',
        'Культурная пестролистная форма тропического американского вида',
      ],
      overview: [
        "Peperomia scandens 'Variegata' is a compact trailing perennial with succulent heart-shaped leaves edged in cream. Its light foliage and relaxed habit suit shelves and hanging pots.",
        'Пеперомия лазящая «Вариегата» — компактный свисающий многолетник с сочными сердцевидными листьями, обрамлёнными кремовой каймой. Светлая листва и свободный силуэт хорошо подходят для полок и подвесных кашпо.',
      ],
      plantType: ['Evergreen epiphytic perennial', 'Вечнозелёный эпифитный многолетник'],
      problems: [
        [
          'Soft translucent stems — stop watering and inspect for rot.',
          'Long sparse growth — increase filtered light and pinch the tips.',
          'Brown crisp margins — check hot sun, drought and salt buildup.',
        ],
        [
          'Стебли мягкие и полупрозрачные — прекратите полив и проверьте растение на гниль.',
          'Длинный редкий прирост — добавьте рассеянного света и прищипните верхушки.',
          'Сухая коричневая кайма — проверьте жаркое солнце, пересушку и накопление солей.',
        ],
      ],
      propagation: [
        'Take a stem cutting with two or three nodes, remove the lowest leaves and root one node in water or a barely moist airy mix. Combine several rooted cuttings for a full pot.',
        'Возьмите стеблевой черенок с двумя-тремя узлами, удалите нижние листья и укорените один узел в воде или едва влажной воздушной смеси. Для пышности посадите несколько черенков вместе.',
      ],
      repotting: [
        'Repot only when roots fill the pot, moving up one small size and keeping the stems above the soil line.',
        'Пересаживайте только после заполнения горшка корнями, увеличивая ёмкость на один небольшой размер и не заглубляя стебли.',
      ],
      secondaryCare: [
        ['Shaping', 'Формировка'],
        [
          'Pinch long tips above a node and return rooted cuttings to the pot to keep the centre dense.',
          'Прищипывайте длинные концы над узлом и возвращайте укоренённые черенки в горшок, чтобы середина оставалась густой.',
        ],
      ],
      soil: [
        'Use a loose fast-draining mix of light compost, fine bark and generous perlite in a pot with drainage.',
        'Используйте рыхлую быстро просыхающую смесь из лёгкого грунта, мелкой коры и большого количества перлита в горшке с дренажом.',
      ],
      temperature: [
        'Keep at 18–27 °C and protect the succulent stems from cold glass and draughts.',
        'Содержите при 18–27 °C и защищайте сочные стебли от холодного стекла и сквозняков.',
      ],
      watering: [
        'Water after roughly the upper half of the mix dries. Soak evenly, drain completely and avoid a permanently damp root ball.',
        'Поливайте после просыхания примерно верхней половины грунта. Равномерно промочите, полностью слейте воду и не держите ком постоянно влажным.',
      ],
    }),
  ),
  collectionPlant(
    'araceae',
    'alocasia-regal-shields',
    '/plants/alocasia-regal-shields-home-photo.webp',
    ["Alocasia 'Regal Shields'", 'Алоказия Регал Шилдс'],
    simplePlantProfile({
      assets: {
        importantImage: '/plant-profile/alocasia-regal-shields-important.webp',
        propagationImage: '/plant-profile/alocasia-regal-shields-propagation.webp',
      },
      difficulty: 3,
      facts: [
        [
          "'Regal Shields' is a hybrid of Alocasia odora and Alocasia reginula.",
          'Mature shield-shaped leaves are dark green with light-green veins and purple undersides.',
          'The cultivar was released in 2014 and grows more vigorously than jewel Alocasias.',
        ],
        [
          '«Регал Шилдс» — гибрид Alocasia odora и Alocasia reginula.',
          'Взрослые щитовидные листья тёмно-зелёные со светло-зелёными жилками и пурпурной изнанкой.',
          'Сорт выпущен в 2014 году и растёт энергичнее драгоценных алоказий.',
        ],
      ],
      family: ['Arum family (Araceae)', 'Ароидные (Araceae)'],
      feeding: [
        'Feed every three to four weeks during active growth with half-strength balanced foliage fertiliser.',
        'В период активного роста подкармливайте раз в три-четыре недели половинной дозой сбалансированного удобрения.',
      ],
      growth: ['Moderately vigorous', 'Умеренно быстрый'],
      height: ['Usually 60–150 cm indoors', 'Обычно 60–150 см в комнате'],
      humidity: [
        'Aim for 55–75% humidity with regular airflow. Avoid standing droplets on the broad leaves.',
        'Поддерживайте влажность 55–75% и регулярное движение воздуха. Не оставляйте капли на широких листьях.',
      ],
      important: [
        'All tissues contain irritating calcium oxalate crystals. Wear gloves for division and keep the plant away from children and pets.',
        'Все ткани содержат раздражающие кристаллы оксалата кальция. При делении надевайте перчатки и держите растение вдали от детей и животных.',
      ],
      latinName: "Alocasia 'Regal Shields'",
      light: [
        'Give bright diffused light with gentle morning sun. Harsh midday rays scorch the dark blades; deep shade weakens growth.',
        'Нужен яркий рассеянный свет с мягким утренним солнцем. Жёсткие полуденные лучи обжигают тёмные пластины, а глубокая тень ослабляет рост.',
      ],
      notes: [
        'The three leaves already show the cultivar clearly: broad dark shields with lime-green veins, held on sturdy upright petioles.',
        'Уже по трём листьям сорт хорошо узнаваем: широкие тёмные щиты с лаймово-зелёными жилками держатся на крепких вертикальных черешках.',
      ],
      origin: [
        'Cultivated hybrid created in Florida, USA',
        'Культурный гибрид, созданный во Флориде, США',
      ],
      overview: [
        "Alocasia 'Regal Shields' is a large upright hybrid combining the scale of Alocasia odora with the dark colouring of Alocasia reginula. Its broad leaves mature to deep green above and burgundy-purple beneath.",
        'Алоказия «Регал Шилдс» — крупный вертикальный гибрид, сочетающий размер Alocasia odora с тёмной окраской Alocasia reginula. Широкие листья становятся насыщенно-зелёными сверху и бордово-пурпурными снизу.',
      ],
      plantType: [
        'Evergreen rhizomatous tropical hybrid',
        'Вечнозелёный корневищный тропический гибрид',
      ],
      problems: [
        [
          'Yellow leaves with wet soil — inspect roots and rhizome for rot.',
          'Crisp edges or a stuck new leaf — stabilise watering and humidity.',
          'Pale stippling or webbing — isolate and inspect for spider mites.',
        ],
        [
          'Листья желтеют при мокром грунте — проверьте корни и корневище на гниль.',
          'Сухие края или застрявший новый лист — стабилизируйте полив и влажность.',
          'Светлый крап или паутинка — изолируйте и проверьте на паутинного клеща.',
        ],
      ],
      propagation: [
        'During a warm-season repot, separate an offset with its own roots or collect firm cormels. Sprout cormels in lightly moist sphagnum or perlite with warmth, humidity and ventilation.',
        'При пересадке в тёплый сезон отделите детку с собственными корнями или соберите плотные клубеньки. Проращивайте их в слегка влажном сфагнуме или перлите в тепле, высокой влажности и с проветриванием.',
      ],
      repotting: [
        'Repot in spring when roots fill the container, increasing the diameter by only 2–4 cm and keeping the rhizome at its former level.',
        'Пересаживайте весной после заполнения ёмкости корнями, увеличивая диаметр лишь на 2–4 см и сохраняя прежний уровень корневища.',
      ],
      secondaryCare: [
        ['Leaf care', 'Уход за листьями'],
        [
          'Support each blade from below and wipe gently with a soft damp cloth. Do not use leaf-shine products.',
          'Поддерживайте пластину снизу и аккуратно протирайте мягкой влажной салфеткой. Не используйте полироли для листьев.',
        ],
      ],
      soil: [
        'Use a chunky moisture-retentive aroid mix with fine bark, coco or light compost, perlite and charcoal.',
        'Используйте крупную влагоёмкую ароидную смесь из мелкой коры, кокоса или лёгкого грунта, перлита и древесного угля.',
      ],
      temperature: [
        'Keep at 20–29 °C and protect from cold glass, draughts and temperatures below 17 °C.',
        'Содержите при 20–29 °C и защищайте от холодного стекла, сквозняков и температуры ниже 17 °C.',
      ],
      watering: [
        'Water after the top 3–5 cm dries, then drain excess completely. Reduce frequency whenever cool or low-light conditions slow growth.',
        'Поливайте после просыхания верхних 3–5 см и полностью сливайте лишнюю воду. Сокращайте частоту, когда прохлада или слабый свет замедляют рост.',
      ],
    }),
  ),
];

const hiddenCollectionPlantIds = new Set(['succulent-groundcover-mix']);

export const collectionPlants: readonly CollectionPlant[] = allCollectionPlants.filter(
  (plant) => !hiddenCollectionPlantIds.has(plant.id),
);

const getCollectionEntryPlantCount = (plant: CollectionPlant) => plant.plantCount;

export const getCollectionPlantCount = () =>
  collectionPlants.reduce((total, plant) => total + getCollectionEntryPlantCount(plant), 0);

export const getCollectionFamilyCount = () =>
  new Set(collectionPlants.map((plant) => plant.familyId)).size;

export const getCollectionPlantCountByFamily = (familyId: CollectionFamilyId) =>
  collectionPlants
    .filter((plant) => plant.familyId === familyId)
    .reduce((total, plant) => total + getCollectionEntryPlantCount(plant), 0);

export const formatCollectionPlantCount = (count: number, locale: Locale) => {
  if (locale === 'en') {
    return `${count} ${count === 1 ? 'plant' : 'plants'}`;
  }

  const lastTwoDigits = count % 100;
  const lastDigit = count % 10;
  let ending = 'растений';

  if (lastTwoDigits < 11 || lastTwoDigits > 14) {
    if (lastDigit === 1) {
      ending = 'растение';
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      ending = 'растения';
    }
  }

  return `${count} ${ending}`;
};

export const getCollectionPlantsByFamily = (familyId: CollectionFamilyId, locale: Locale) =>
  collectionPlants
    .filter((plant) => plant.familyId === familyId)
    .map((plant) => ({ id: plant.id, image: plant.image, name: plant.name[locale] }));
