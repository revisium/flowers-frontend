import type { Locale } from 'src/shared/config';

export type CollectionFamilyId =
  | 'aizoaceae'
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
  | 'lamiaceae'
  | 'marantaceae'
  | 'moraceae'
  | 'nephrolepidaceae'
  | 'orchidaceae'
  | 'piperaceae'
  | 'vitaceae';

export interface CollectionPlant {
  readonly familyId: CollectionFamilyId;
  readonly id: string;
  readonly image: string;
  readonly name: Record<Locale, string>;
  readonly plantCount: number;
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
  readonly propagationIcon?: string;
  readonly propagationImage?: string;
  readonly saleImage?: string;
  readonly variants?: PlantProfileVariants;
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
  plantCount = 1 + (profile.variants?.items.length ?? 0),
): CollectionPlant => ({ familyId, id, image, name: localized(name), plantCount, profile });

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
  readonly propagationIcon?: string;
  readonly propagationImage?: string;
  readonly quickFacts: PlantProfileQuickFacts;
  readonly saleImage?: string;
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
  readonly facts: LocalizedListPair;
  readonly height: LocalizedPair;
  readonly latinName: string;
  readonly notes: LocalizedPair;
  readonly origin: LocalizedPair;
  readonly overview: LocalizedPair;
}

const tillandsiaProfile = ({
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
    {},
  );

export const collectionPlants: readonly CollectionPlant[] = [
  collectionPlant(
    'amaryllidaceae',
    'clivia-miniata-rescued',
    '/plants/clivia-miniata-home-photo.jpg',
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
        importantImage: '/plant-profile/clivia-important.png',
        propagationImage: '/plant-profile/clivia-propagation.png',
        saleImage: '/plant-profile/clivia-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'amaryllidaceae',
    'hippeastrum-red-white',
    '/plants/hippeastrum-red-white-home-photo.jpg',
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
        importantImage: '/plant-profile/hippeastrum-important.png',
        propagationImage: '/plant-profile/hippeastrum-propagation.png',
        saleImage: '/plant-profile/hippeastrum-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'arecaceae',
    'chamaedorea-elegans',
    '/plants/chamaedorea-elegans-home-photo.jpg',
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
        importantImage: '/plant-profile/chamaedorea-important.png',
        propagationImage: '/plant-profile/chamaedorea-propagation.png',
        saleImage: '/plant-profile/chamaedorea-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'asparagaceae',
    'chlorophytum-comosum-bonnie',
    '/plants/chlorophytum-curly-home-photo.jpg',
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
        importantImage: '/plant-profile/chlorophytum-important.png',
        propagationImage: '/plant-profile/chlorophytum-propagation.png',
        saleImage: '/plant-profile/chlorophytum-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'asparagaceae',
    'beaucarnea-recurvata',
    '/plants/beaucarnea-recurvata-home-photo.jpg',
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
        importantImage: '/plant-profile/beaucarnea-important.png',
        propagationImage: '/plant-profile/beaucarnea-propagation.png',
        saleImage: '/plant-profile/beaucarnea-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'asparagaceae',
    'dracaena-sanderiana',
    '/plants/dracaena-sanderiana-home-photo.jpg',
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
        importantImage: '/plant-profile/dracaena-sanderiana-important.png',
        propagationImage: '/plant-profile/dracaena-sanderiana-propagation.png',
        saleImage: '/plant-profile/dracaena-sanderiana-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'moraceae',
    'ficus-benjamina',
    '/plants/ficus-benjamina-home-photo.png',
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
        importantImage: '/plant-profile/ficus-benjamina-important.png',
        propagationImage: '/plant-profile/ficus-benjamina-propagation.png',
        saleImage: '/plant-profile/ficus-benjamina-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'asphodelaceae',
    'haworthiopsis-attenuata',
    '/plants/haworthiopsis-attenuata-home-photo.jpg',
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
        importantImage: '/plant-profile/haworthiopsis-attenuata-important.png',
        propagationImage: '/plant-profile/haworthiopsis-attenuata-propagation.png',
        saleImage: '/plant-profile/haworthiopsis-attenuata-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'bromeliaceae',
    'tillandsia-usneoides-thai-composition',
    '/plant-profile/tillandsia-composition-gallery/03-spanish-moss-tail.png',
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
        importantImage: '/plant-profile/tillandsia-composition-important.png',
        propagationImage: '/plant-profile/tillandsia-composition-propagation.png',
        saleImage: '/plant-profile/tillandsia-composition-for-sale.png',
        variants: profileVariants(
          ['The Thai composition', 'Композиция из Таиланда'],
          [
            'The gallery shows how this Spanish moss formed the long silver tail of the original coconut-mounted composition and how the two Tillandsias were displayed after the journey home.',
            'Галерея показывает, как уснеевидная тилландсия образовывала длинный серебристый хвост первоначальной композиции на кокосе и как обе тилландсии были оформлены после возвращения домой.',
          ],
          [
            '/plant-profile/tillandsia-composition-gallery/02-full-composition.png',
            ['Original hanging composition', 'Первоначальная подвесная композиция'],
          ],
          [
            '/plant-profile/tillandsia-composition-gallery/03-spanish-moss-tail.png',
            ['Spanish moss in the composition', 'Уснеевидная тилландсия в композиции'],
          ],
          [
            '/plant-profile/tillandsia-composition-gallery/04-current-display.png',
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
    '/plant-profile/tillandsia-composition-gallery/01-at-purchase.png',
    ['Tillandsia ionantha', 'Тилландсия ионанта'],
    tillandsiaProfile({
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
    '/plants/tillandsia-andreana-home-photo.jpg',
    ['Tillandsia andreana', 'Тилландсия Андреана'],
    tillandsiaProfile({
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
    '/plants/tillandsia-melanocrater-home-photo.jpg',
    ["Tillandsia 'Melanocrater'", 'Тилландсия Меланократер'],
    tillandsiaProfile({
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
    '/plants/dieffenbachia-snow-home-photo.png',
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
        importantImage: '/plant-profile/dieffenbachia-snow-important.png',
        propagationImage: '/plant-profile/dieffenbachia-snow-propagation.png',
        saleImage: '/plant-profile/dieffenbachia-snow-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'apocynaceae',
    'hoya-pubicalyx-splash',
    '/plants/hoya-pubicalyx-splash-home-photo.jpg',
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
        importantImage: '/plant-profile/hoya-pubicalyx-splash-important.png',
        propagationImage: '/plant-profile/hoya-pubicalyx-splash-propagation.png',
        saleImage: '/plant-profile/hoya-pubicalyx-splash-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'piperaceae',
    'peperomia-caperata-santorini',
    '/plants/peperomia-caperata-santorini-home-photo.jpg',
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
        importantImage: '/plant-profile/peperomia-santorini-important.png',
        propagationImage: '/plant-profile/peperomia-santorini-propagation.png',
        saleImage: '/plant-profile/peperomia-santorini-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'vitaceae',
    'cissus-antarctica',
    '/plants/cissus-antarctica-home-photo.jpg',
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
        importantImage: '/plant-profile/important-vine.png',
        propagationIcon: '/plant-profile/footer-propagation.png',
        propagationImage: '/plant-profile/propagation-cuttings.jpg',
        saleImage: '/plant-profile/cuttings-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'crassulaceae',
    'sedum-burrito',
    '/plants/sedum-burrito-home-photo.jpg',
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
        importantImage: '/plant-profile/sedum-burrito-important.png',
        propagationImage: '/plant-profile/sedum-burrito-propagation.png',
        saleImage: '/plant-profile/sedum-burrito-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'crassulaceae',
    'succulent-groundcover-mix',
    '/plants/succulent-mix-home-photo.jpg',
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
        importantImage: '/plant-profile/succulent-mix-important.png',
        propagationImage: '/plant-profile/succulent-mix-propagation.png',
        saleImage: '/plant-profile/succulent-mix-for-sale.png',
      },
    ),
    3,
  ),
  collectionPlant(
    'lamiaceae',
    'glechoma-hederacea-variegata',
    '/plants/glechoma-hederacea-variegata-home-photo.jpg',
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
        importantImage: '/plant-profile/glechoma-variegata-important.png',
        propagationImage: '/plant-profile/glechoma-variegata-propagation.png',
        saleImage: '/plant-profile/glechoma-variegata-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'marantaceae',
    'goeppertia-insignis',
    '/plants/calathea-lancifolia-home-photo.jpg',
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
        importantImage: '/plant-profile/calathea-important-leaves.png',
        propagationIcon: '/plant-profile/calathea-propagation-icon.png',
        propagationImage: '/plant-profile/calathea-propagation.jpg',
        saleImage: '/plant-profile/calathea-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'aizoaceae',
    'faucaria-tigrina',
    '/plants/faucaria-tigrina-home-photo.jpg',
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
        importantImage: '/plant-profile/faucaria-important-leaves.png',
        propagationIcon: '/plant-profile/faucaria-propagation-icon.png',
        propagationImage: '/plant-profile/faucaria-propagation.jpg',
        saleImage: '/plant-profile/faucaria-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'crassulaceae',
    'kalanchoe-tomentosa',
    '/plants/kalanchoe-tomentosa-home-photo.jpg',
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
        importantImage: '/plant-profile/kalanchoe-important-leaves.png',
        propagationIcon: '/plant-profile/kalanchoe-propagation-icon.png',
        propagationImage: '/plant-profile/kalanchoe-propagation.jpg',
        saleImage: '/plant-profile/kalanchoe-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'marantaceae',
    'goeppertia-rufibarba',
    '/plants/goeppertia-rufibarba-home-photo.jpg',
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
        importantImage: '/plant-profile/rufibarba-important-leaves.png',
        propagationIcon: '/plant-profile/rufibarba-propagation-icon.png',
        propagationImage: '/plant-profile/rufibarba-propagation.jpg',
        saleImage: '/plant-profile/rufibarba-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'marantaceae',
    'goeppertia-elliptica-vittata',
    '/plants/goeppertia-elliptica-vittata-home-photo.jpg',
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
        importantImage: '/plant-profile/vittata-important-leaves.png',
        propagationIcon: '/plant-profile/vittata-propagation-icon.png',
        propagationImage: '/plant-profile/vittata-propagation.jpg',
        saleImage: '/plant-profile/vittata-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'aglaonema-red-valentine',
    '/plant-profile/aglaonema-red-valentine.jpg',
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
        importantImage: '/plant-profile/aglaonema-red-valentine-important.png',
        propagationImage: '/plant-profile/aglaonema-red-valentine-propagation.png',
        saleImage: '/plant-profile/aglaonema-red-valentine-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'aglaonema-red-peacock',
    '/plant-profile/aglaonema-red-peacock.jpg',
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
        importantImage: '/plant-profile/aglaonema-red-peacock-important.png',
        propagationImage: '/plant-profile/aglaonema-red-peacock-propagation.png',
        saleImage: '/plant-profile/aglaonema-red-peacock-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'aglaonema-siam-aurora',
    '/plant-profile/aglaonema-siam-aurora.jpg',
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
        importantImage: '/plant-profile/aglaonema-siam-aurora-important.png',
        propagationImage: '/plant-profile/aglaonema-siam-aurora-propagation.png',
        saleImage: '/plant-profile/aglaonema-siam-aurora-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'aglaonema-silver-queen',
    '/plant-profile/aglaonema-silver-queen.jpg',
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
        importantImage: '/plant-profile/aglaonema-silver-queen-important.png',
        propagationImage: '/plant-profile/aglaonema-silver-queen-propagation.png',
        saleImage: '/plant-profile/aglaonema-silver-queen-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'philodendron-white-wizard',
    '/plants/philodendron-white-wizard-home-photo.jpg',
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
        importantImage: '/plant-profile/white-wizard-important.png',
        propagationImage: '/plant-profile/white-wizard-propagation.png',
        saleImage: '/plant-profile/white-wizard-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'alocasia-baginda-dragon-scale',
    '/plants/alocasia-baginda-dragon-scale-home-photo.jpg',
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
        importantImage: '/plant-profile/alocasia-dragon-scale-important.png',
        propagationImage: '/plant-profile/alocasia-dragon-scale-propagation.png',
        saleImage: '/plant-profile/alocasia-dragon-scale-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'alocasia-amazonica-bambino',
    '/plants/alocasia-amazonica-bambino-home-photo.jpg',
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
        importantImage: '/plant-profile/alocasia-bambino-important.png',
        propagationImage: '/plant-profile/alocasia-bambino-propagation.png',
        saleImage: '/plant-profile/alocasia-bambino-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'alocasia-black-velvet',
    '/plants/alocasia-black-velvet-home-photo.jpg',
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
        importantImage: '/plant-profile/alocasia-black-velvet-important.png',
        propagationImage: '/plant-profile/alocasia-black-velvet-propagation.png',
        saleImage: '/plant-profile/alocasia-black-velvet-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'alocasia-tandurusa-jacklyn',
    '/plants/alocasia-tandurusa-jacklyn-home-photo.jpg',
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
        importantImage: '/plant-profile/alocasia-jacklyn-important.png',
        propagationImage: '/plant-profile/alocasia-jacklyn-propagation.png',
        saleImage: '/plant-profile/alocasia-jacklyn-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'spathiphyllum-wallisii',
    '/plants/spathiphyllum-wallisii-home-photo.jpg',
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
        importantImage: '/plant-profile/spathiphyllum-important.png',
        propagationImage: '/plant-profile/spathiphyllum-propagation.png',
        saleImage: '/plant-profile/spathiphyllum-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'anthurium-andraeanum-red-hybrid',
    '/plants/anthurium-andraeanum-red-hybrid-home-photo.jpg',
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
        importantImage: '/plant-profile/anthurium-red-important.png',
        propagationImage: '/plant-profile/anthurium-red-propagation.png',
        saleImage: '/plant-profile/anthurium-red-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'philodendron-erubescens-dark-hybrid',
    '/plants/philodendron-erubescens-dark-hybrid-home-photo.jpg',
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
        importantImage: '/plant-profile/philodendron-dark-important.png',
        propagationImage: '/plant-profile/philodendron-dark-propagation.png',
        saleImage: '/plant-profile/philodendron-dark-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'araceae',
    'monstera-adansonii',
    '/plants/monstera-adansonii-home-photo.jpg',
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
        importantImage: '/plant-profile/monstera-adansonii-important.png',
        propagationImage: '/plant-profile/monstera-adansonii-propagation.png',
        saleImage: '/plant-profile/monstera-adansonii-for-sale.png',
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
        importantImage: '/plant-profile/tradescantia-important.png',
        propagationImage: '/plant-profile/tradescantia-propagation.png',
        saleImage: '/plant-profile/tradescantia-for-sale.png',
        variants: profileVariants(
          ['My Tradescantia collection', 'Моя коллекция традесканций'],
          [
            'These plants began as small cuttings with distinctly different leaves. The gallery shows how each one can look as a mature, full potted plant.',
            'Эти растения начинались с маленьких черенков с совершенно разными листьями. В галерее показано, как каждый из них может выглядеть взрослым пышным растением в горшке.',
          ],
          [
            '/plant-profile/tradescantia-variants/nanouk.webp',
            ["'Nanouk' (likely)", "'Nanouk' (предположительно)"],
          ],
          [
            '/plant-profile/tradescantia-variants/dark-broad.webp',
            ['Dark broad-leaved form', 'Тёмная широколистная форма'],
          ],
          [
            '/plant-profile/tradescantia-variants/fine-striped.webp',
            ['Fine-striped form', 'Тонкополосатая форма'],
          ],
          ['/plant-profile/tradescantia-variants/green.webp', ['Green form', 'Зелёная форма']],
          [
            '/plant-profile/tradescantia-variants/tricolor.webp',
            ["'Tricolor' (likely)", "'Tricolor' (предположительно)"],
          ],
          [
            '/plant-profile/tradescantia-variants/baby-bunny.webp',
            ["'Baby Bunny Bellies' (likely)", "'Baby Bunny Bellies' (предположительно)"],
          ],
          [
            '/plant-profile/tradescantia-variants/purpurea.webp',
            ["T. pallida 'Purpurea'", "T. pallida 'Purpurea'"],
          ],
          [
            '/plant-profile/tradescantia-variants/zebrina-burgundy.webp',
            ['T. zebrina, burgundy form', 'T. zebrina, бордовая форма'],
          ],
          [
            '/plant-profile/tradescantia-variants/white-pinstripe.webp',
            ['White pinstripe form', 'Бело-полосатая форма'],
          ],
          [
            '/plant-profile/tradescantia-variants/green-purple.webp',
            ['Green-purple form', 'Зелёно-пурпурная форма'],
          ],
          [
            '/plant-profile/tradescantia-variants/zebrina-silver.webp',
            ['T. zebrina, silver form', 'T. zebrina, серебристая форма'],
          ],
          [
            '/plant-profile/tradescantia-variants/variegated.webp',
            ['Variegated trailing form', 'Вариегатная ампельная форма'],
          ],
          [
            '/plant-profile/tradescantia-variants/dark-green-striped.webp',
            ['Dark green striped form', 'Тёмно-зелёная полосатая форма'],
          ],
          ['/plant-profile/tradescantia-variants/white.webp', ['White', 'Белая']],
          ['/plant-profile/tradescantia-variants/gold.webp', ['Gold', 'Голд']],
          [
            '/plant-profile/tradescantia-variants/sillamontana.webp',
            ['T. sillamontana', 'Силламонтана'],
          ],
        ),
      },
    ),
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
        importantImage: '/plant-profile/callisia-important.png',
        propagationImage: '/plant-profile/callisia-propagation.png',
        saleImage: '/plant-profile/callisia-for-sale.png',
        variants: profileVariants(
          ['My Callisia collection', 'Моя коллекция каллизий'],
          [
            'These forms began as small rooted shoots. The gallery shows how their different leaf colours look in mature, full pots.',
            'Эти формы начинались с маленьких укоренённых ростков. В галерее показано, как их разная окраска выглядит во взрослых пышных горшках.',
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
        importantImage: '/plant-profile/orchid-important.png',
        propagationImage: '/plant-profile/orchid-propagation.png',
        saleImage: '/plant-profile/orchid-for-sale.png',
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
    '/plants/echinopsis-sp-home-photo.jpg',
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
        importantImage: '/plant-profile/echinopsis-important.png',
        propagationImage: '/plant-profile/echinopsis-propagation.png',
        saleImage: '/plant-profile/echinopsis-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'cactaceae',
    'epiphyllum-oxypetalum',
    '/plants/epiphyllum-oxypetalum-home-photo.jpg',
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
        importantImage: '/plant-profile/epiphyllum-oxypetalum-important.png',
        propagationImage: '/plant-profile/epiphyllum-oxypetalum-propagation.png',
        saleImage: '/plant-profile/epiphyllum-oxypetalum-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'cycadaceae',
    'cycas-revoluta',
    '/plants/cycas-revoluta-home-photo.jpg',
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
        importantImage: '/plant-profile/cycas-important.png',
        propagationImage: '/plant-profile/cycas-propagation.png',
        saleImage: '/plant-profile/cycas-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'gesneriaceae',
    'nematanthus-strigillosus',
    '/plants/nematanthus-strigillosus-home-photo.jpg',
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
        importantImage: '/plant-profile/nematanthus-important.png',
        propagationImage: '/plant-profile/nematanthus-propagation.png',
        saleImage: '/plant-profile/nematanthus-for-sale.png',
      },
    ),
  ),
  collectionPlant(
    'gesneriaceae',
    'sinningia-speciosa',
    '/plant-profile/gloxinia-cover.jpg',
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
        importantImage: '/plant-profile/gloxinia-important.png',
        propagationImage: '/plant-profile/gloxinia-propagation.png',
        saleImage: '/plant-profile/gloxinia-for-sale.png',
        variants: profileVariants(
          ['My collection of colours', 'Моя коллекция расцветок'],
          [
            'Gloxinias can look completely different while sharing the same velvety leaves and generous flowering. Here are the distinct colours and flower forms that have bloomed in my collection.',
            'Глоксинии могут выглядеть совершенно по-разному, сохраняя бархатистую листву и щедрое цветение. Здесь собраны разные расцветки и формы цветка, которые цвели в моей коллекции.',
          ],
          [
            '/plant-profile/gloxinia-variants/raspberry.webp',
            ['Raspberry with a pale throat', 'Малиновая со светлым горлом'],
          ],
          [
            '/plant-profile/gloxinia-variants/lilac-white.webp',
            ['White and lilac', 'Бело-лиловая'],
          ],
          [
            '/plant-profile/gloxinia-variants/burgundy-speckles.webp',
            ['Burgundy speckles', 'Бордовый крап'],
          ],
          [
            '/plant-profile/gloxinia-variants/lavender-double.webp',
            ['Double lavender', 'Лавандовая махровая'],
          ],
          [
            '/plant-profile/gloxinia-variants/pink-speckled-double.webp',
            ['Double pink speckles', 'Розовая крапчатая махровая'],
          ],
          [
            '/plant-profile/gloxinia-variants/deep-purple.webp',
            ['Deep purple', 'Глубокая фиолетовая'],
          ],
          ['/plant-profile/gloxinia-variants/crimson.webp', ['Crimson', 'Малиновая']],
          [
            '/plant-profile/gloxinia-variants/plum-speckles.webp',
            ['Plum speckles', 'Сливовый крап'],
          ],
          [
            '/plant-profile/gloxinia-variants/white-pink-ring.webp',
            ['White with a pink ring', 'Белая с розовым кольцом'],
          ],
          [
            '/plant-profile/gloxinia-variants/white-speckled-double.webp',
            ['Double white speckles', 'Белая крапчатая махровая'],
          ],
          ['/plant-profile/gloxinia-variants/hot-pink.webp', ['Hot pink', 'Ярко-розовая']],
          [
            '/plant-profile/gloxinia-variants/raspberry-white-edge.webp',
            ['Raspberry with a white edge', 'Малиновая с белым кантом'],
          ],
          ['/plant-profile/gloxinia-variants/velvet-red.webp', ['Velvet red', 'Бархатная красная']],
          [
            '/plant-profile/gloxinia-variants/violet-stippled.webp',
            ['Violet stippling', 'Фиолетовая крапчатая'],
          ],
          [
            '/plant-profile/gloxinia-variants/pink-white-edge.webp',
            ['Pink with a white edge', 'Розовая с белым кантом'],
          ],
          [
            '/plant-profile/gloxinia-variants/lilac-speckled-double.webp',
            ['Double lilac speckles', 'Лиловая крапчатая махровая'],
          ],
          ['/plant-profile/gloxinia-variants/pure-white.webp', ['Pure white', 'Чисто-белая']],
          [
            '/plant-profile/gloxinia-variants/pale-lilac-throat.webp',
            ['Pale lilac with a violet throat', 'Светло-лиловая с фиолетовым горлом'],
          ],
        ),
      },
    ),
  ),
];

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
