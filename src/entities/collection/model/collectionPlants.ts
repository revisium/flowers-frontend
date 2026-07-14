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
): CollectionPlant => ({ familyId, id, image, name: localized(name), profile });

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

export const collectionPlants: readonly CollectionPlant[] = [
  collectionPlant(
    'vitaceae',
    'cissus-antarctica',
    '/plants/cissus-antarctica-home-photo.jpg',
    ['Kangaroo vine', 'Циссус антарктический'],
    plantProfile(
      careCards(
        [['Light', 'Освещение'], ['Bright indirect light or light shade. Protect the foliage from harsh direct sun.', 'Яркий рассеянный свет или лёгкая полутень. Берегите листву от жёсткого прямого солнца.']],
        [['Watering', 'Полив'], ['Keep the substrate lightly and evenly moist while the plant is growing. Avoid waterlogging.', 'В период роста поддерживайте грунт слегка и равномерно влажным. Не допускайте застоя воды.']],
        [['Humidity', 'Влажность'], ['Average to higher room humidity suits this rainforest vine; dry air can mark the foliage.', 'Эта лиана из влажных лесов любит среднюю и повышенную влажность; сухой воздух отражается на листве.']],
        [['Temperature', 'Температура'], ['A warm, stable room suits it best. Keep it away from cold glass and drafts.', 'Лучше всего подходит тёплое, стабильное помещение. Берегите от холодного стекла и сквозняков.']],
      ),
      2,
      profileFacts(
        [['Family', 'Семейство'], ['Grape family (Vitaceae)', 'Виноградовые (Vitaceae)']],
        [['Origin', 'Родина'], ['Eastern Australia', 'Восточное побережье Австралии']],
        [['Plant type', 'Тип растения'], ['Woody climbing vine with tendrils', 'Древеснеющая лиана с усиками']],
      ),
      profileFooter(
        [['An evergreen woody climber native to eastern Australia.', 'Simple toothed leaves are usually ovate to oblong.', 'The vine climbs with simple or two-branched tendrils.'], ['Вечнозелёная древеснеющая лиана, родом с восточного побережья Австралии.', 'Простые зубчатые листья обычно имеют яйцевидную или продолговатую форму.', 'Лиана цепляется за опору простыми или двураздельными усиками.']],
        ['Do not let the root ball dry out completely during active growth, but never leave it standing in water.', 'В период активного роста не пересушивайте корневой ком полностью, но и не оставляйте растение стоять в воде.'],
        [['Yellowing leaves — check for waterlogging.', 'Brown edges — air may be too dry or the soil has dried too far.', 'Sparse growth — move to brighter indirect light.'], ['Желтеют листья — проверьте, нет ли застоя воды.', 'Края листьев буреют — воздух может быть слишком сухим или грунт сильно пересох.', 'Побеги вытягиваются — переставьте растение в более яркий рассеянный свет.']],
        ['Propagate from stem cuttings during active growth in a lightly moist, airy substrate.', 'Размножайте стеблевыми черенками в период активного роста в слегка влажном, воздухопроницаемом субстрате.'],
      ),
      'Cissus antarctica',
      ['Guide the young shoots onto a support and prune them after active growth to keep the vine tidy.', 'Направляйте молодые побеги на опору и подрезайте их после активного роста, чтобы лиана сохраняла аккуратную форму.'],
      ['Kangaroo vine is an Australian evergreen climber with simple toothed leaves and tendrils. In nature it grows in warm coastal rainforests and their margins.', 'Кенгуровая лиана — австралийская вечнозелёная лиана с простыми зубчатыми листьями и усиками. В природе растёт во влажных лесах и на их опушках восточного побережья.'],
      quickFacts(['Fast-growing', 'Быстрый'], ['Long climbing shoots', 'Длинные побеги']),
      careCards(
        [['Soil', 'Грунт'], ['Mix by volume: 50% peat-free loam-based houseplant compost, 25% coco coir, 15% perlite and 10% fine pine bark. This gives the vine organic matter, air around the roots and reliable drainage.', 'Смешайте по объёму: 50% безторфяного грунта для декоративнолистных на суглинистой основе, 25% кокосового субстрата, 15% перлита и 10% мелкой сосновой коры. Смесь питательная, воздушная и хорошо отводит лишнюю воду.']],
        [['Repotting', 'Пересадка'], ['Repot in spring when the roots have filled the pot.', 'Пересаживайте весной, когда корни полностью освоят горшок.']],
        [['Feeding', 'Подкормки'], ['From spring to early autumn, use a balanced liquid fertiliser with near-equal N-P-K (for example 10-10-10), plus Mg, Fe, Mn, Zn and B. Apply monthly at half the label rate; do not feed in winter.', 'С весны до начала осени — жидкое удобрение с примерно равным N-P-K (например, 10-10-10) и Mg, Fe, Mn, Zn, B. Вносите раз в месяц в половинной дозировке; зимой не подкармливайте.']],
        [['Support & shaping', 'Опоры и формировка'], ['Offer a support for the tendrils and prune long shoots to keep the vine neat.', 'Дайте усикам опору и подрезайте длинные побеги, чтобы лиана оставалась аккуратной.']],
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
    'marantaceae',
    'goeppertia-insignis',
    '/plants/calathea-lancifolia-home-photo.jpg',
    ['Rattlesnake plant', 'Калатея лансифолия'],
    plantProfile(
      careCards(
        [['Light', 'Освещение'], ['Give bright filtered or indirect light. Direct sun can scorch the patterned leaves.', 'Нужен яркий фильтрованный или рассеянный свет. Прямое солнце может обжечь узорчатые листья.']],
        [['Watering', 'Полив'], ['Keep the compost evenly moist during active growth, but never soggy. Water less in winter.', 'В период роста поддерживайте грунт равномерно влажным, но не мокрым. Зимой поливайте реже.']],
        [['Humidity', 'Влажность'], ['High humidity helps prevent leaf edges from browning and curling.', 'Высокая влажность помогает избежать подсыхания и скручивания краёв листьев.']],
        [['Temperature', 'Температура'], ['Keep warm and draught-free, ideally above 16°C with no sudden temperature changes.', 'Держите в тепле и без сквозняков, желательно выше 16 °C и без резких перепадов температуры.']],
      ),
      4,
      profileFacts(
        [['Family', 'Семейство'], ['Prayer plant family (Marantaceae)', 'Марантовые (Marantaceae)']],
        [['Origin', 'Родина'], ['Brazil, Rio de Janeiro', 'Бразилия, штат Рио-де-Жанейро']],
        [['Plant type', 'Тип растения'], ['Rhizomatous evergreen perennial', 'Корневищный вечнозелёный многолетник']],
      ),
      profileFooter(
        [['The wavy, lance-shaped leaves are marked with dark oval blotches.', 'The underside of each leaf is deep purple to maroon.', 'In the evening the leaves lift and fold, then open again in the morning.', 'Small yellow flowers are uncommon on indoor plants.'], ['Волнистые ланцетные листья украшены тёмными овальными пятнами.', 'Изнанка листьев окрашена в глубокий пурпурно-бордовый цвет.', 'Вечером листья поднимаются и складываются, а утром снова раскрываются.', 'Небольшие жёлтые цветки в комнатных условиях появляются редко.']],
        ['Do not let the compost dry out completely and keep the plant away from direct sun, cold glass and draughts.', 'Не пересушивайте грунт полностью и берегите растение от прямого солнца, холодного стекла и сквозняков.'],
        [['Brown, curling edges — humidity may be too low.', 'Faded patches — move away from direct sun.', 'Yellowing leaves — check that the compost is not waterlogged.'], ['Края листьев буреют и скручиваются — вероятно, слишком сухой воздух.', 'Узор бледнеет или появляются ожоги — уберите от прямого солнца.', 'Листья желтеют — проверьте, не переувлажнён ли грунт.']],
        ['Divide a mature clump in late spring, keeping several healthy shoots and roots in each section.', 'Делите взрослый куст поздней весной: у каждой делёнки должны остаться здоровые побеги и корни.'],
      ),
      'Goeppertia insignis',
      ['Also sold as Calathea lancifolia. Its patterned leaves look their best in stable, humid conditions.', 'Также встречается под названием Calathea lancifolia. Узорчатые листья лучше всего выглядят в стабильных влажных условиях.'],
      ['Rattlesnake plant is a tropical Brazilian perennial grown for its long, wavy leaves with dark oval markings and purple undersides.', 'Калатея лансифолия — тропический многолетник из Бразилии, который ценят за длинные волнистые листья с тёмным овальным узором и пурпурной изнанкой.'],
      quickFacts(['Moderate', 'Умеренный'], ['Clump to 60 cm', 'Куст до 60 см']),
      careCards(
        [['Soil', 'Грунт'], ['Mix by volume: 40% quality houseplant compost, 30% coco coir, 20% perlite and 10% fine pine bark. The mix stays evenly moist yet airy around the roots.', 'Смешайте по объёму: 40% качественного грунта для декоративнолистных, 30% кокосового субстрата, 20% перлита и 10% мелкой сосновой коры. Смесь удерживает влагу, но остаётся воздушной у корней.']],
        [['Repotting', 'Пересадка'], ['Repot or divide in late spring when the clump has filled its pot.', 'Пересаживайте или делите куст поздней весной, когда он освоит горшок.']],
        [['Feeding', 'Подкормки'], ['Use a low-salt liquid fertiliser with N-P₂O₅-K₂O close to 3-1-2 (for example 18-6-12), including Ca, Mg, chelated Fe, Mn, Zn, Cu and B. Feed monthly at quarter to half strength from spring to summer; avoid fluoride-containing products.', 'Выбирайте малосолевое жидкое удобрение с N-P₂O₅-K₂O около 3-1-2 (например, 18-6-12), с Ca, Mg, хелатным Fe, Mn, Zn, Cu и B. Подкармливайте с весны до конца лета раз в месяц в ¼–½ дозы; избегайте средств с фтором.']],
        [['Grooming', 'Уход за листвой'], ['No support is needed. Remove only yellowed or damaged leaves at the base.', 'Опора не нужна. Удаляйте только пожелтевшие или повреждённые листья у основания.']],
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
        [['Light', 'Освещение'], ['Give the brightest available position, ideally with several hours of direct sun after gradual acclimatisation.', 'Поставьте на самое светлое место; после постепенного привыкания полезны несколько часов прямого солнца.']],
        [['Watering', 'Полив'], ['Water thoroughly only after the gritty mix has dried. Never leave water in the saucer.', 'Поливайте обильно только после просыхания минеральной смеси. Не оставляйте воду в поддоне.']],
        [['Humidity', 'Влажность'], ['Normal dry room air suits it well; high humidity is unnecessary.', 'Обычный сухой комнатный воздух подходит хорошо; повышенная влажность не нужна.']],
        [['Temperature', 'Температура'], ['Keep warm in growth, then give a bright, cool and dry winter rest above 8°C.', 'В период роста держите в тепле, а зимой обеспечьте светлый, прохладный и сухой отдых выше 8 °C.']],
      ),
      2,
      profileFacts(
        [['Family', 'Семейство'], ['Ice plant family (Aizoaceae)', 'Аизовые (Aizoaceae)']],
        [['Origin', 'Родина'], ['Eastern Cape, South Africa', 'Восточная Капская провинция, ЮАР']],
        [['Plant type', 'Тип растения'], ['Clumping succulent subshrub', 'Кустящийся суккулентный полукустарник']],
      ),
      profileFooter(
        [['The paired triangular leaves have soft white marginal teeth that give the plant its tiger-jaw name.', 'Leaf surfaces are dotted with pale translucent spots.', 'Mature plants can open large yellow flowers in bright sunshine.', 'It forms new rosettes at the base and gradually becomes a small clump.'], ['Парные треугольные листья с мягкими белыми зубчиками по краю дали растению «тигровое» название.', 'Поверхность листьев усеяна светлыми полупрозрачными точками.', 'Взрослые растения могут раскрывать крупные жёлтые цветки на ярком солнце.', 'У основания появляются новые розетки, и со временем образуется компактная куртинка.']],
        ['The main risk is prolonged dampness. Protect the roots from waterlogging and do not water a cold plant.', 'Главный риск — длительная сырость. Берегите корни от застоя воды и не поливайте холодное растение.'],
        [['Soft, translucent leaves — stop watering and inspect the roots.', 'Stretched, pale growth — move to brighter light gradually.', 'Shrivelled leaves in dry soil — water once, then let the mix drain fully.'], ['Мягкие полупрозрачные листья — прекратите полив и проверьте корни.', 'Вытянутый бледный прирост — постепенно переставьте на более яркий свет.', 'Сморщенные листья при сухом грунте — один раз полейте и дайте смеси полностью стечь.']],
        ['Separate a rooted offset in late spring or summer. Let the cut dry for a day, then plant into a dry gritty mix and wait before the first light watering.', 'Отделяйте укоренённую дочернюю розетку поздней весной или летом. Подсушите срез сутки, посадите в сухую минеральную смесь и лишь затем осторожно полейте.'],
      ),
      'Faucaria tigrina',
      ['Tiger jaws is a compact South African succulent prized for its patterned leaves with tooth-like margins.', 'Фаукарию тигровую ценят за компактные узорчатые листья с зубчиками по краям.'],
      ['Tiger jaws is a small clumping succulent from South Africa. Its thick paired leaves are edged with soft, pale teeth and store water for dry periods.', 'Фаукария тигровая — небольшой кустящийся суккулент из Южной Африки. Толстые парные листья с мягкими светлыми зубчиками запасают воду на засушливый период.'],
      quickFacts(['Slow', 'Медленный'], ['Rosette to 15 cm', 'Розетка до 15 см']),
      careCards(
        [['Soil', 'Грунт'], ['Mix by volume: 30% cactus compost, 35% pumice or fine gravel, 25% perlite and 10% coarse sand. Use a pot with a drainage hole.', 'Смешайте по объёму: 30% грунта для кактусов, 35% пемзы или мелкого гравия, 25% перлита и 10% крупного песка. Горшок нужен с дренажным отверстием.']],
        [['Repotting', 'Пересадка'], ['Repot in spring only when the clump has filled its pot. Keep the neck of the plant above the mix.', 'Пересаживайте весной, только когда куртинка освоила горшок. Шейку растения оставляйте над уровнем смеси.']],
        [['Feeding', 'Подкормки'], ['Use a low-nitrogen cactus fertiliser with micronutrients once a month in active growth at half strength. Do not feed a dormant or stressed plant.', 'Раз в месяц в период роста давайте удобрение для кактусов с пониженным азотом и микроэлементами в половинной дозе. Не подкармливайте спящее или ослабленное растение.']],
        [['Grooming', 'Уход за розеткой'], ['No support is needed. Remove only fully dry old leaves; the pale marginal teeth are natural and soft.', 'Опора не нужна. Удаляйте только полностью сухие старые листья; светлые зубчики по краю — естественная мягкая особенность.']],
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
        [['Light', 'Освещение'], ['Give bright light and several hours of gentle direct sun after acclimatisation.', 'Нужен яркий свет и несколько часов мягкого прямого солнца после постепенного привыкания.']],
        [['Watering', 'Полив'], ['Water only when the gritty mix has dried almost completely. Drain excess water.', 'Поливайте только после почти полного просыхания минеральной смеси. Излишки воды всегда сливайте.']],
        [['Humidity', 'Влажность'], ['Normal dry room air is ideal; do not mist the velvety leaves.', 'Обычный сухой комнатный воздух подходит идеально; бархатистые листья не опрыскивайте.']],
        [['Temperature', 'Температура'], ['Keep warm in growth and brighter, drier and cooler in winter, above 10°C.', 'В период роста держите в тепле, а зимой — светлее, суше и прохладнее, выше 10 °C.']],
      ),
      2,
      profileFacts(
        [['Family', 'Семейство'], ['Stonecrop family (Crassulaceae)', 'Толстянковые (Crassulaceae)']],
        [['Origin', 'Родина'], ['Central-eastern Madagascar', 'Центрально-восточный Мадагаскар']],
        [['Plant type', 'Тип растения'], ['Velvety succulent subshrub', 'Бархатистый суккулентный полукустарник']],
      ),
      profileFooter(
        [['The dense felt-like hairs protect the leaves from intense sun and reduce water loss.', 'Brown markings along the leaf margins give the plant a distinctive outline.', 'Indoor plants rarely flower, but mature plants can produce tubular blooms.', 'It is often called panda plant for its soft, fuzzy foliage.'], ['Густое войлочное опушение защищает листья от яркого солнца и уменьшает потерю влаги.', 'Коричневые отметины по краям листьев создают узнаваемый рисунок.', 'В помещении растение цветёт редко, но взрослые экземпляры могут дать трубчатые цветки.', 'Из-за мягкой пушистой листвы его часто называют панда-плант.']],
        ['Never keep the roots wet for long and avoid getting water trapped in the leaf fuzz.', 'Не держите корни во влажном грунте долго и не оставляйте воду в опушении листьев.'],
        [['Soft dark leaves — likely excess moisture.', 'Long pale growth — move gradually to brighter light.', 'Leaf marks rub off easily — handle the velvet foliage gently.'], ['Мягкие тёмные листья — вероятно, избыток влаги.', 'Вытянутый бледный прирост — постепенно добавьте света.', 'Налёт на листьях легко стирается — обращайтесь с бархатистой листвой бережно.']],
        ['Take a healthy stem cutting in spring or summer. Let the cut dry for several days, then root it in a dry gritty mix.', 'Весной или летом возьмите здоровый стеблевой черенок. Подсушите срез несколько дней, затем укореняйте в сухой минеральной смеси.'],
      ),
      'Kalanchoe tomentosa',
      ['Velvety foliage and chocolate-brown leaf markings make this a quietly sculptural succulent.', 'Бархатистая листва и шоколадно-коричневые отметины делают этот суккулент особенно графичным.'],
      ['Kalanchoe tomentosa is a Madagascan succulent subshrub with soft silver-green felted leaves and brown margins.', 'Каланхоэ войлочное — мадагаскарский суккулентный полукустарник с мягкими серебристо-зелёными войлочными листьями и коричневыми краями.'],
      quickFacts(['Slow to moderate', 'Медленный'], ['Up to 45 cm indoors', 'До 45 см в помещении']),
      careCards(
        [['Soil', 'Грунт'], ['Mix by volume: 35% cactus compost, 30% pumice or fine gravel, 25% perlite and 10% coarse sand. Use a drainage hole.', 'Смешайте по объёму: 35% грунта для кактусов, 30% пемзы или мелкого гравия, 25% перлита и 10% крупного песка. Горшок нужен с дренажным отверстием.']],
        [['Repotting', 'Пересадка'], ['Repot in spring only when the roots have filled the pot.', 'Пересаживайте весной, только когда корни полностью освоят горшок.']],
        [['Feeding', 'Подкормки'], ['Use a low-nitrogen cactus fertiliser with micronutrients once a month in active growth at half strength.', 'Раз в месяц в период роста используйте удобрение для кактусов с пониженным азотом и микроэлементами в половинной дозе.']],
        [['Grooming', 'Уход за листвой'], ['No support is needed. Do not rub or wash the leaves: their felted coating is natural protection.', 'Опора не нужна. Не трите и не мойте листья: войлочное покрытие — естественная защита.']],
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
        [['Light', 'Освещение'], ['Give bright, filtered or indirect light. Direct sun can fade and scorch the velvety leaves.', 'Нужен яркий фильтрованный или рассеянный свет. Прямое солнце может обесцветить и обжечь бархатистые листья.']],
        [['Watering', 'Полив'], ['Keep the mix lightly and evenly moist while it grows, then water less in winter. Never leave the roots standing in water.', 'В период роста поддерживайте смесь слегка и равномерно влажной, а зимой поливайте реже. Не оставляйте корни в воде.']],
        [['Humidity', 'Влажность'], ['A humid room helps the leaf edges remain smooth; keep it away from dry hot airflow.', 'Влажный воздух помогает краям листьев оставаться ровными; не ставьте растение на пути сухого горячего воздуха.']],
        [['Temperature', 'Температура'], ['Keep warm and draught-free, ideally 18–27°C and never close to cold glass.', 'Держите в тепле и без сквозняков, лучше при 18–27 °C и не вплотную к холодному стеклу.']],
      ),
      4,
      profileFacts(
        [['Family', 'Семейство'], ['Prayer plant family (Marantaceae)', 'Марантовые (Marantaceae)']],
        [['Origin', 'Родина'], ['Bahia, north-eastern Brazil', 'Баия, северо-восток Бразилии']],
        [['Plant type', 'Тип растения'], ['Rhizomatous evergreen perennial', 'Корневищный вечнозелёный многолетник']],
      ),
      profileFooter(
        [['The long, narrow leaves have strongly wavy edges and a velvety surface.', 'The leaf undersides and petioles show a rich burgundy tone.', 'Its name rufibarba refers to the fine reddish hairs around the leaf stems.', 'Like other prayer plants, it can raise and fold its leaves as light changes.'], ['Длинные узкие листья имеют заметно волнистый край и бархатистую поверхность.', 'Изнанка листьев и черешки окрашены в насыщенный бордовый тон.', 'Название rufibarba связано с тонкими рыжеватыми волосками у черешков.', 'Как и другие марантовые, растение может поднимать и складывать листья при смене освещения.']],
        ['Do not allow the root ball to dry out fully, and keep the plant away from hard direct sun, cold glass and draughts.', 'Не пересушивайте корневой ком полностью и берегите растение от жёсткого прямого солнца, холодного стекла и сквозняков.'],
        [['Crisp brown edges — humidity may be too low or watering uneven.', 'Faded patches — move away from direct sunlight.', 'Yellowing leaves — let the mix drain and check that the roots are not waterlogged.'], ['Сухие коричневые края — вероятно, слишком сухой воздух или неравномерный полив.', 'Бледные пятна — уберите от прямого солнца.', 'Листья желтеют — дайте смеси просохнуть и проверьте, нет ли застоя у корней.']],
        ['Divide a mature clump in late spring, keeping several healthy shoots and roots with each division.', 'Делите взрослый куст поздней весной: у каждой делёнки должны остаться несколько здоровых побегов и корней.'],
      ),
      'Goeppertia rufibarba',
      ['Often sold as Calathea rufibarba. It is especially valued for its narrow, softly velvety leaves and wine-coloured undersides.', 'Часто продаётся под названием Calathea rufibarba. Её ценят за узкие мягко-бархатистые листья и винную изнанку.'],
      ['Velvet calathea is a tropical Brazilian prayer plant with long wavy leaves, reddish petioles and deep burgundy undersides.', 'Калатея руфибарба — тропическое бразильское растение из марантовых с длинными волнистыми листьями, красноватыми черешками и глубокой бордовой изнанкой.'],
      quickFacts(['Moderate', 'Умеренный'], ['Clump to 90 cm', 'Куст до 90 см']),
      careCards(
        [['Soil', 'Грунт'], ['Mix by volume: 40% quality foliage-plant compost, 30% coco coir, 20% perlite and 10% fine pine bark. It holds moisture evenly while keeping air around the roots.', 'Смешайте по объёму: 40% качественного грунта для декоративнолистных, 30% кокосового субстрата, 20% перлита и 10% мелкой сосновой коры. Смесь равномерно удерживает влагу, но остаётся воздушной у корней.']],
        [['Repotting', 'Пересадка'], ['Repot or divide in late spring once the clump has filled its pot.', 'Пересаживайте или делите куст поздней весной, когда он освоит горшок.']],
        [['Feeding', 'Подкормки'], ['Use a low-salt liquid fertiliser with N-P₂O₅-K₂O near 3-1-2 and Ca, Mg, chelated Fe, Mn, Zn, Cu and B. Feed monthly at quarter to half strength from spring to summer.', 'Выбирайте малосолевое жидкое удобрение с N-P₂O₅-K₂O около 3-1-2, а также Ca, Mg, хелатным Fe, Mn, Zn, Cu и B. С весны до конца лета подкармливайте раз в месяц в ¼–½ дозы.']],
        [['Grooming', 'Уход за листвой'], ['No support is needed. Remove only damaged leaves at the base and do not polish the naturally velvety foliage.', 'Опора не нужна. Удаляйте только повреждённые листья у основания и не полируйте естественно бархатистую листву.']],
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
        [['Light', 'Освещение'], ['Give bright, filtered or indirect light. Direct sun fades the pale stripes and can scorch the leaves.', 'Нужен яркий фильтрованный или рассеянный свет. Прямое солнце обесцвечивает светлые полосы и может обжечь листья.']],
        [['Watering', 'Полив'], ['Keep the mix evenly moist during active growth, allowing only the surface to dry slightly. Never leave the roots waterlogged.', 'В период роста поддерживайте смесь равномерно влажной, позволяя лишь поверхности слегка подсохнуть. Не допускайте застоя воды у корней.']],
        [['Humidity', 'Влажность'], ['High humidity helps preserve smooth leaf edges and clear variegation; avoid dry hot air.', 'Высокая влажность помогает сохранить ровные края листьев и чёткий рисунок; избегайте сухого горячего воздуха.']],
        [['Temperature', 'Температура'], ['Keep warm and draught-free, ideally 18–27°C. Do not place close to cold glass.', 'Держите в тепле и без сквозняков, лучше при 18–27 °C. Не ставьте растение вплотную к холодному стеклу.']],
      ),
      4,
      profileFacts(
        [['Family', 'Семейство'], ['Prayer plant family (Marantaceae)', 'Марантовые (Marantaceae)']],
        [['Origin', 'Родина'], ['Tropical northern South America and Brazil', 'Тропики севера Южной Америки и Бразилии']],
        [['Plant type', 'Тип растения'], ['Rhizomatous evergreen perennial', 'Корневищный вечнозелёный многолетник']],
      ),
      profileFooter(
        [['The pale, narrow stripes radiate from the midrib across each leaf.', 'The pattern stays clearest in stable bright indirect light.', 'Like other prayer plants, the leaves can rise and fold at night.', 'It grows as a compact clump, producing new leaves from its rhizome.'], ['Светлые узкие полосы расходятся от центральной жилки по всей пластинке.', 'Рисунок остаётся наиболее чётким при стабильном ярком рассеянном свете.', 'Как и другие марантовые, листья могут подниматься и складываться ночью.', 'Растение растёт компактным кустом, выпуская новые листья из корневища.']],
        ['Do not let the root ball dry out completely. Keep the plant away from direct sun, cold glass and dry air from radiators.', 'Не пересушивайте корневой ком полностью. Берегите растение от прямого солнца, холодного стекла и сухого воздуха от батарей.'],
        [['Brown tips — humidity may be low or water may be too hard.', 'Faded stripes — give more bright indirect light, not sun.', 'Yellowing leaves — check that the mix is not staying wet for too long.'], ['Коричневые кончики — вероятно, низкая влажность или слишком жёсткая вода.', 'Полосы бледнеют — добавьте яркого рассеянного света, но не прямого солнца.', 'Листья желтеют — проверьте, не остаётся ли смесь влажной слишком долго.']],
        ['Divide a mature clump in late spring, keeping healthy roots and several shoots with each new plant.', 'Делите взрослый куст поздней весной: у каждого нового растения должны остаться здоровые корни и несколько побегов.'],
      ),
      "Goeppertia elliptica 'Vittata'",
      ['Often sold as Calathea vittata. This horticultural form is prized for its fine pale pinstripes on fresh green leaves.', 'Часто продаётся как Calathea vittata. Эту садовую форму ценят за тонкие светлые полосы на свежей зелёной листве.'],
      ['Vittata calathea is a striped form of Goeppertia elliptica, a tropical prayer plant that forms a compact clump of pointed, finely variegated leaves.', 'Калатея виттата — полосатая форма Goeppertia elliptica, тропического растения из марантовых, образующего компактный куст с заострёнными тонко-вариегатными листьями.'],
      quickFacts(['Moderate', 'Умеренный'], ['Clump to 60 cm', 'Куст до 60 см']),
      careCards(
        [['Soil', 'Грунт'], ['Mix by volume: 40% quality foliage-plant compost, 30% coco coir, 20% perlite and 10% fine pine bark. It keeps moisture available without compacting around the roots.', 'Смешайте по объёму: 40% качественного грунта для декоративнолистных, 30% кокосового субстрата, 20% перлита и 10% мелкой сосновой коры. Смесь удерживает влагу, но не уплотняется у корней.']],
        [['Repotting', 'Пересадка'], ['Repot or divide in late spring when the clump has filled its pot.', 'Пересаживайте или делите куст поздней весной, когда он освоит горшок.']],
        [['Feeding', 'Подкормки'], ['Use a low-salt liquid fertiliser with N-P₂O₅-K₂O near 3-1-2 and Ca, Mg, chelated Fe, Mn, Zn, Cu and B. Feed monthly at quarter to half strength from spring to summer.', 'Выбирайте малосолевое жидкое удобрение с N-P₂O₅-K₂O около 3-1-2, а также Ca, Mg, хелатным Fe, Mn, Zn, Cu и B. С весны до конца лета подкармливайте раз в месяц в ¼–½ дозы.']],
        [['Grooming', 'Уход за листвой'], ['No support is needed. Remove only damaged leaves at the base and wipe dust with a soft damp cloth.', 'Опора не нужна. Удаляйте только повреждённые листья у основания, а пыль убирайте мягкой влажной салфеткой.']],
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
    'commelinaceae',
    'tradescantia-collection',
    '/plant-profile/tradescantia-cover.webp',
    ['Tradescantia collection', 'Традесканции'],
    plantProfile(
      careCards(
        [['Light', 'Освещение'], ['Give bright indirect light. Variegated forms keep their colour best close to a bright window without harsh midday sun.', 'Нужен яркий рассеянный свет. Вариегатные формы лучше сохраняют окраску рядом со светлым окном, но без жёсткого полуденного солнца.']],
        [['Watering', 'Полив'], ['Water after the upper layer of the mix has dried. Let excess water drain freely and never leave the pot standing in water.', 'Поливайте после подсыхания верхнего слоя грунта. Давайте лишней воде свободно стечь и не оставляйте горшок в воде.']],
        [['Humidity', 'Влажность'], ['Normal room humidity is usually enough. Keep hairy T. sillamontana foliage dry and provide gentle air movement.', 'Обычной комнатной влажности обычно достаточно. Опушённые листья T. sillamontana держите сухими и обеспечьте лёгкое движение воздуха.']],
        [['Temperature', 'Температура'], ['Grow at 18–26°C and protect from cold draughts. Prolonged temperatures below about 12°C can damage tender growth.', 'Выращивайте при 18–26 °C и берегите от холодных сквозняков. Длительная температура ниже примерно 12 °C может повредить нежные побеги.']],
      ),
      1,
      profileFacts(
        [['Family', 'Семейство'], ['Spiderwort family (Commelinaceae)', 'Коммелиновые (Commelinaceae)']],
        [['Origin', 'Родина'], ['Tropical and subtropical Americas', 'Тропические и субтропические районы Америки']],
        [['Plant type', 'Тип растения'], ['Evergreen trailing or spreading perennial', 'Вечнозелёный стелющийся или раскидистый многолетник']],
      ),
      profileFooter(
        [['Tradescantias root readily from stem nodes.', 'Leaf colour becomes richer in bright indirect light.', 'Regular pinching makes the plants fuller and more compact.', 'The collection includes smooth, striped, purple and softly woolly leaves.'], ['Традесканции легко укореняются из узлов побега.', 'При ярком рассеянном свете окраска листьев становится выразительнее.', 'Регулярная прищипка делает растения гуще и компактнее.', 'В коллекции есть гладкие, полосатые, пурпурные и мягко опушённые листья.']],
        ['Avoid constantly wet soil. T. sillamontana is especially sensitive to moisture trapped on its dense woolly foliage.', 'Не держите грунт постоянно мокрым. T. sillamontana особенно чувствительна к влаге, которая задерживается на густо опушённых листьях.'],
        [['Long bare stems — pinch the tips and give more light.', 'Faded variegation — move closer to bright indirect light.', 'Soft yellowing growth — check for overwatering and poor drainage.'], ['Длинные оголённые побеги — прищипните верхушки и добавьте света.', 'Вариегатность бледнеет — переставьте ближе к яркому рассеянному свету.', 'Мягкие желтеющие побеги — проверьте, нет ли перелива и плохого дренажа.']],
        ['Cut a healthy shoot below a node, remove the lowest leaves and root several cuttings together in a light, slightly moist mix for a full pot.', 'Срежьте здоровый побег под узлом, удалите нижние листья и укорените сразу несколько черенков в лёгком, слегка влажном грунте, чтобы получить пышный куст.'],
      ),
      'Tradescantia spp. and cultivars',
      ['I grow many tradescantias with different leaf colours, stripes and textures. Most of this collection began as small cuttings.', 'У меня много традесканций с разной окраской, полосами и фактурой листьев. Большая часть этой коллекции начиналась с маленьких черенков.'],
      ['Tradescantias are quick-growing plants valued for colourful foliage and their ability to form a lush cascading pot from just a few cuttings.', 'Традесканции — быстрорастущие растения, которые ценят за яркую листву и способность всего из нескольких черенков превращаться в пышный каскадный куст.'],
      quickFacts(['Fast', 'Быстрый'], ['Trailing shoots 30–60 cm', 'Свисающие побеги 30–60 см']),
      careCards(
        [['Soil', 'Грунт'], ['Use an airy, free-draining mix: 50% quality houseplant compost, 25% coco coir, 15% perlite and 10% fine pine bark.', 'Используйте воздушную дренированную смесь: 50% качественного универсального грунта, 25% кокосового субстрата, 15% перлита и 10% мелкой сосновой коры.']],
        [['Repotting', 'Пересадка'], ['Repot in spring when roots fill the pot. A wide, shallow container suits several rooted cuttings planted together.', 'Пересаживайте весной, когда корни освоят горшок. Для нескольких укоренённых вместе черенков подойдёт широкий неглубокий горшок.']],
        [['Feeding', 'Подкормки'], ['From spring to early autumn, feed monthly with a balanced liquid fertiliser at half strength. Do not feed dry or stressed plants.', 'С весны до начала осени подкармливайте раз в месяц сбалансированным жидким удобрением в половинной дозировке. Не удобряйте пересушенные или ослабленные растения.']],
        [['Pruning', 'Формирование'], ['Pinch growing tips regularly and replant rooted cuttings into the same pot to keep the centre dense.', 'Регулярно прищипывайте верхушки и подсаживайте укоренённые черенки в тот же горшок, чтобы середина куста оставалась густой.']],
      ),
      {
        importantImage: '/plant-profile/tradescantia-variants/sillamontana.webp',
        propagationImage: '/plant-profile/tradescantia-variants/green.webp',
        saleImage: '/plant-profile/tradescantia-variants/tricolor.webp',
        variants: profileVariants(
          ['My Tradescantia collection', 'Моя коллекция традесканций'],
          ['These plants began as small cuttings with distinctly different leaves. The gallery shows how each one can look as a mature, full potted plant.', 'Эти растения начинались с маленьких черенков с совершенно разными листьями. В галерее показано, как каждый из них может выглядеть взрослым пышным растением в горшке.'],
          ['/plant-profile/tradescantia-variants/nanouk.webp', ["'Nanouk' (likely)", "'Nanouk' (предположительно)"]],
          ['/plant-profile/tradescantia-variants/dark-broad.webp', ['Dark broad-leaved form', 'Тёмная широколистная форма']],
          ['/plant-profile/tradescantia-variants/fine-striped.webp', ['Fine-striped form', 'Тонкополосатая форма']],
          ['/plant-profile/tradescantia-variants/green.webp', ['Green form', 'Зелёная форма']],
          ['/plant-profile/tradescantia-variants/tricolor.webp', ["'Tricolor' (likely)", "'Tricolor' (предположительно)"]],
          ['/plant-profile/tradescantia-variants/baby-bunny.webp', ["'Baby Bunny Bellies' (likely)", "'Baby Bunny Bellies' (предположительно)"]],
          ['/plant-profile/tradescantia-variants/purpurea.webp', ["T. pallida 'Purpurea'", "T. pallida 'Purpurea'"]],
          ['/plant-profile/tradescantia-variants/zebrina-burgundy.webp', ['T. zebrina, burgundy form', 'T. zebrina, бордовая форма']],
          ['/plant-profile/tradescantia-variants/white-pinstripe.webp', ['White pinstripe form', 'Бело-полосатая форма']],
          ['/plant-profile/tradescantia-variants/green-purple.webp', ['Green-purple form', 'Зелёно-пурпурная форма']],
          ['/plant-profile/tradescantia-variants/zebrina-silver.webp', ['T. zebrina, silver form', 'T. zebrina, серебристая форма']],
          ['/plant-profile/tradescantia-variants/variegated.webp', ['Variegated trailing form', 'Вариегатная ампельная форма']],
          ['/plant-profile/tradescantia-variants/dark-green-striped.webp', ['Dark green striped form', 'Тёмно-зелёная полосатая форма']],
          ['/plant-profile/tradescantia-variants/white.webp', ['White', 'Белая']],
          ['/plant-profile/tradescantia-variants/gold.webp', ['Gold', 'Голд']],
          ['/plant-profile/tradescantia-variants/sillamontana.webp', ['T. sillamontana', 'Силламонтана']],
        ),
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
        [['Light', 'Освещение'], ['Give bright indirect light without harsh midday sun, which can scorch the soft leaves.', 'Нужен яркий рассеянный свет без жёсткого полуденного солнца, которое может обжечь нежные листья.']],
        [['Watering', 'Полив'], ['Keep the mix consistently moist during active growth, but never waterlog it. Water around the edge of the pot rather than into the crown.', 'В период активного роста поддерживайте грунт равномерно влажным, но не заболоченным. Поливайте по краю горшка, не попадая в центр розетки.']],
        [['Humidity', 'Влажность'], ['Moderate humidity with good air movement is ideal. Do not mist the velvety leaves and flowers.', 'Лучше всего подходит умеренная влажность при хорошем движении воздуха. Не опрыскивайте бархатистые листья и цветы.']],
        [['Temperature', 'Температура'], ['Keep warm while growing. After flowering, a dormant tuber can rest cool at about 16–18°C.', 'Во время роста держите в тепле. После цветения клубень может отдыхать в прохладе примерно при 16–18 °C.']],
      ),
      3,
      profileFacts(
        [['Family', 'Семейство'], ['Gesneriad family (Gesneriaceae)', 'Геснериевые (Gesneriaceae)']],
        [['Origin', 'Родина'], ['Brazil', 'Бразилия']],
        [['Plant type', 'Тип растения'], ['Tuberous flowering perennial', 'Клубневый цветущий многолетник']],
      ),
      profileFooter(
        [['The large velvety flowers can be single or double.', 'Modern hybrids bloom in white, pink, red, purple and many contrasting patterns.', 'The soft scalloped leaves form a compact rosette.', 'After flowering, the plant can enter a natural dormant period.'], ['Крупные бархатистые цветки бывают простыми и махровыми.', 'Современные гибриды цветут белыми, розовыми, красными и фиолетовыми цветами с самыми разными узорами.', 'Мягкие зубчатые листья образуют компактную розетку.', 'После цветения растение может уйти в естественный период покоя.']],
        ['Avoid overhead watering: moisture trapped in the crown or on velvety foliage increases the risk of crown rot and grey mould.', 'Не поливайте сверху: вода в центре розетки и на бархатистой листве повышает риск загнивания и серой гнили.'],
        [['Bud drop — check for cold drafts, dry soil or sudden changes.', 'Brown patches — protect from direct sun and wet foliage.', 'Soft crown or tuber — stop watering and inspect immediately for rot.'], ['Бутоны опадают — проверьте, нет ли сквозняка, пересушки или резкой смены условий.', 'Коричневые пятна — защитите от прямого солнца и не мочите листву.', 'Розетка или клубень стали мягкими — прекратите полив и сразу проверьте растение на гниль.']],
        ['In spring, root a healthy mature leaf with its petiole in a light, slightly moist mix. Gloxinia can also be propagated by dividing a large tuber with a growing point on each section.', 'Весной укореняйте здоровый взрослый лист с черешком в лёгком, слегка влажном субстрате. Крупный клубень также можно делить, оставляя на каждой части точку роста.'],
      ),
      'Sinningia speciosa',
      ['My gloxinia collection is especially dear to me: it includes many colours, contrasting rims, speckled throats and double flowers.', 'Глоксинии занимают особое место в моей коллекции: у меня много расцветок — с контрастной каймой, крапом, светлым горлом и махровыми цветами.'],
      ["Florist's gloxinia is a Brazilian tuberous perennial related to African violets. Its compact rosette carries spectacular bell-shaped flowers above soft velvety leaves.", 'Глоксиния — бразильский клубневый многолетник, родственник сенполии. Над компактной розеткой мягких бархатистых листьев раскрываются эффектные колокольчатые цветы.'],
      quickFacts(['Moderate', 'Умеренный'], ['Rosette 15–30 cm', 'Розетка 15–30 см']),
      careCards(
        [['Soil', 'Грунт'], ['Use a light, moisture-retentive but well-drained mix: 45% quality houseplant compost, 30% coco coir, 15% perlite and 10% fine pine bark.', 'Используйте лёгкую, влагоёмкую, но дренированную смесь: 45% качественного универсального грунта, 30% кокосового субстрата, 15% перлита и 10% мелкой сосновой коры.']],
        [['Repotting', 'Пересадка'], ['Repot the tuber as new growth begins, placing it shallowly with the top close to the surface.', 'Пересаживайте клубень с началом нового роста, размещая его неглубоко, почти у поверхности грунта.']],
        [['Feeding', 'Подкормки'], ['During leaf and flower growth, feed every two weeks with a complete liquid fertiliser for flowering houseplants at half strength. Stop during dormancy.', 'Во время роста листьев и цветения подкармливайте раз в две недели полным жидким удобрением для цветущих растений в половинной дозировке. В период покоя не подкармливайте.']],
        [['Dormancy & grooming', 'Покой и уход'], ['Remove spent flowers. After flowering, gradually reduce watering as the foliage dies back; resume regular care only when the tuber sprouts again.', 'Удаляйте увядшие цветы. После цветения постепенно сокращайте полив по мере отмирания листьев; вернитесь к обычному уходу только с появлением новых ростков.']],
      ),
      {
        importantImage: '/plant-profile/gloxinia-variants/velvet-red.webp',
        propagationImage: '/plant-profile/gloxinia-variants/lilac-speckled-double.webp',
        saleImage: '/plant-profile/gloxinia-variants/pink-white-edge.webp',
        variants: profileVariants(
          ['My collection of colours', 'Моя коллекция расцветок'],
          ['Gloxinias can look completely different while sharing the same velvety leaves and generous flowering. Here are the distinct colours and flower forms that have bloomed in my collection.', 'Глоксинии могут выглядеть совершенно по-разному, сохраняя бархатистую листву и щедрое цветение. Здесь собраны разные расцветки и формы цветка, которые цвели в моей коллекции.'],
          ['/plant-profile/gloxinia-variants/raspberry.webp', ['Raspberry with a pale throat', 'Малиновая со светлым горлом']],
          ['/plant-profile/gloxinia-variants/lilac-white.webp', ['White and lilac', 'Бело-лиловая']],
          ['/plant-profile/gloxinia-variants/burgundy-speckles.webp', ['Burgundy speckles', 'Бордовый крап']],
          ['/plant-profile/gloxinia-variants/lavender-double.webp', ['Double lavender', 'Лавандовая махровая']],
          ['/plant-profile/gloxinia-variants/pink-speckled-double.webp', ['Double pink speckles', 'Розовая крапчатая махровая']],
          ['/plant-profile/gloxinia-variants/deep-purple.webp', ['Deep purple', 'Глубокая фиолетовая']],
          ['/plant-profile/gloxinia-variants/crimson.webp', ['Crimson', 'Малиновая']],
          ['/plant-profile/gloxinia-variants/plum-speckles.webp', ['Plum speckles', 'Сливовый крап']],
          ['/plant-profile/gloxinia-variants/white-pink-ring.webp', ['White with a pink ring', 'Белая с розовым кольцом']],
          ['/plant-profile/gloxinia-variants/white-speckled-double.webp', ['Double white speckles', 'Белая крапчатая махровая']],
          ['/plant-profile/gloxinia-variants/hot-pink.webp', ['Hot pink', 'Ярко-розовая']],
          ['/plant-profile/gloxinia-variants/raspberry-white-edge.webp', ['Raspberry with a white edge', 'Малиновая с белым кантом']],
          ['/plant-profile/gloxinia-variants/velvet-red.webp', ['Velvet red', 'Бархатная красная']],
          ['/plant-profile/gloxinia-variants/violet-stippled.webp', ['Violet stippling', 'Фиолетовая крапчатая']],
          ['/plant-profile/gloxinia-variants/pink-white-edge.webp', ['Pink with a white edge', 'Розовая с белым кантом']],
          ['/plant-profile/gloxinia-variants/lilac-speckled-double.webp', ['Double lilac speckles', 'Лиловая крапчатая махровая']],
        ),
      },
    ),
  ),
];

export const getCollectionPlantCount = () => collectionPlants.length;

export const getCollectionPlantCountByFamily = (familyId: CollectionFamilyId) =>
  collectionPlants.filter((plant) => plant.familyId === familyId).length;

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
