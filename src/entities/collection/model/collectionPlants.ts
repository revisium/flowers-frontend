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
      footer: {
        facts: {
          en: ['An evergreen woody climber native to eastern Australia.', 'Simple toothed leaves are usually ovate to oblong.', 'The vine climbs with simple or two-branched tendrils.'],
          ru: ['Вечнозелёная древеснеющая лиана, родом с восточного побережья Австралии.', 'Простые зубчатые листья обычно имеют яйцевидную или продолговатую форму.', 'Лиана цепляется за опору простыми или двураздельными усиками.'],
        },
        important: {
          en: 'Do not let the root ball dry out completely during active growth, but never leave it standing in water.',
          ru: 'В период активного роста не пересушивайте корневой ком полностью, но и не оставляйте растение стоять в воде.',
        },
        problems: {
          en: ['Yellowing leaves — check for waterlogging.', 'Brown edges — air may be too dry or the soil has dried too far.', 'Sparse growth — move to brighter indirect light.'],
          ru: ['Желтеют листья — проверьте, нет ли застоя воды.', 'Края листьев буреют — воздух может быть слишком сухим или грунт сильно пересох.', 'Побеги вытягиваются — переставьте растение в более яркий рассеянный свет.'],
        },
        propagation: {
          en: 'Propagate from stem cuttings during active growth in a lightly moist, airy substrate.',
          ru: 'Размножайте стеблевыми черенками в период активного роста в слегка влажном, воздухопроницаемом субстрате.',
        },
      },
      latinName: 'Cissus antarctica',
      notes: {
        en: 'Guide the young shoots onto a support and prune them after active growth to keep the vine tidy.',
        ru: 'Направляйте молодые побеги на опору и подрезайте их после активного роста, чтобы лиана сохраняла аккуратную форму.',
      },
      overview: {
        en: 'Kangaroo vine is an Australian evergreen climber with simple toothed leaves and tendrils. In nature it grows in warm coastal rainforests and their margins.',
        ru: 'Кенгуровая лиана — австралийская вечнозелёная лиана с простыми зубчатыми листьями и усиками. В природе растёт во влажных лесах и на их опушках восточного побережья.',
      },
      importantImage: '/plant-profile/important-vine.png',
      propagationIcon: '/plant-profile/footer-propagation.png',
      propagationImage: '/plant-profile/propagation-cuttings.jpg',
      saleImage: '/plant-profile/cuttings-for-sale.png',
      quickFacts: {
        growth: { en: 'Fast-growing', ru: 'Быстрый' },
        height: { en: 'Long climbing shoots', ru: 'Длинные побеги' },
      },
      secondaryCare: [
        {
          body: {
            en: 'Mix by volume: 50% peat-free loam-based houseplant compost, 25% coco coir, 15% perlite and 10% fine pine bark. This gives the vine organic matter, air around the roots and reliable drainage.',
            ru: 'Смешайте по объёму: 50% безторфяного грунта для декоративнолистных на суглинистой основе, 25% кокосового субстрата, 15% перлита и 10% мелкой сосновой коры. Смесь питательная, воздушная и хорошо отводит лишнюю воду.',
          },
          title: { en: 'Soil', ru: 'Грунт' },
        },
        {
          body: { en: 'Repot in spring when the roots have filled the pot.', ru: 'Пересаживайте весной, когда корни полностью освоят горшок.' },
          title: { en: 'Repotting', ru: 'Пересадка' },
        },
        {
          body: {
            en: 'From spring to early autumn, use a balanced liquid fertiliser with near-equal N-P-K (for example 10-10-10), plus Mg, Fe, Mn, Zn and B. Apply monthly at half the label rate; do not feed in winter.',
            ru: 'С весны до начала осени — жидкое удобрение с примерно равным N-P-K (например, 10-10-10) и Mg, Fe, Mn, Zn, B. Вносите раз в месяц в половинной дозировке; зимой не подкармливайте.',
          },
          title: { en: 'Feeding', ru: 'Подкормки' },
        },
        {
          body: { en: 'Offer a support for the tendrils and prune long shoots to keep the vine neat.', ru: 'Дайте усикам опору и подрезайте длинные побеги, чтобы лиана оставалась аккуратной.' },
          title: { en: 'Support & shaping', ru: 'Опоры и формировка' },
        },
      ],
    },
  },
  {
    familyId: 'marantaceae',
    id: 'goeppertia-insignis',
    image: '/plants/calathea-lancifolia-home-photo.jpg',
    name: {
      en: 'Rattlesnake plant',
      ru: 'Калатея лансифолия',
    },
    profile: {
      care: [
        {
          body: { en: 'Give bright filtered or indirect light. Direct sun can scorch the patterned leaves.', ru: 'Нужен яркий фильтрованный или рассеянный свет. Прямое солнце может обжечь узорчатые листья.' },
          title: { en: 'Light', ru: 'Освещение' },
        },
        {
          body: { en: 'Keep the compost evenly moist during active growth, but never soggy. Water less in winter.', ru: 'В период роста поддерживайте грунт равномерно влажным, но не мокрым. Зимой поливайте реже.' },
          title: { en: 'Watering', ru: 'Полив' },
        },
        {
          body: { en: 'High humidity helps prevent leaf edges from browning and curling.', ru: 'Высокая влажность помогает избежать подсыхания и скручивания краёв листьев.' },
          title: { en: 'Humidity', ru: 'Влажность' },
        },
        {
          body: { en: 'Keep warm and draught-free, ideally above 16°C with no sudden temperature changes.', ru: 'Держите в тепле и без сквозняков, желательно выше 16 °C и без резких перепадов температуры.' },
          title: { en: 'Temperature', ru: 'Температура' },
        },
      ],
      difficulty: 4,
      facts: [
        { label: { en: 'Family', ru: 'Семейство' }, value: { en: 'Prayer plant family (Marantaceae)', ru: 'Марантовые (Marantaceae)' } },
        { label: { en: 'Origin', ru: 'Родина' }, value: { en: 'Brazil, Rio de Janeiro', ru: 'Бразилия, штат Рио-де-Жанейро' } },
        { label: { en: 'Plant type', ru: 'Тип растения' }, value: { en: 'Rhizomatous evergreen perennial', ru: 'Корневищный вечнозелёный многолетник' } },
      ],
      footer: {
        facts: {
          en: ['The wavy, lance-shaped leaves are marked with dark oval blotches.', 'The underside of each leaf is deep purple to maroon.', 'In the evening the leaves lift and fold, then open again in the morning.', 'Small yellow flowers are uncommon on indoor plants.'],
          ru: ['Волнистые ланцетные листья украшены тёмными овальными пятнами.', 'Изнанка листьев окрашена в глубокий пурпурно-бордовый цвет.', 'Вечером листья поднимаются и складываются, а утром снова раскрываются.', 'Небольшие жёлтые цветки в комнатных условиях появляются редко.'],
        },
        important: {
          en: 'Do not let the compost dry out completely and keep the plant away from direct sun, cold glass and draughts.',
          ru: 'Не пересушивайте грунт полностью и берегите растение от прямого солнца, холодного стекла и сквозняков.',
        },
        problems: {
          en: ['Brown, curling edges — humidity may be too low.', 'Faded patches — move away from direct sun.', 'Yellowing leaves — check that the compost is not waterlogged.'],
          ru: ['Края листьев буреют и скручиваются — вероятно, слишком сухой воздух.', 'Узор бледнеет или появляются ожоги — уберите от прямого солнца.', 'Листья желтеют — проверьте, не переувлажнён ли грунт.'],
        },
        propagation: {
          en: 'Divide a mature clump in late spring, keeping several healthy shoots and roots in each section.',
          ru: 'Делите взрослый куст поздней весной: у каждой делёнки должны остаться здоровые побеги и корни.',
        },
      },
      latinName: 'Goeppertia insignis',
      notes: {
        en: 'Also sold as Calathea lancifolia. Its patterned leaves look their best in stable, humid conditions.',
        ru: 'Также встречается под названием Calathea lancifolia. Узорчатые листья лучше всего выглядят в стабильных влажных условиях.',
      },
      overview: {
        en: 'Rattlesnake plant is a tropical Brazilian perennial grown for its long, wavy leaves with dark oval markings and purple undersides.',
        ru: 'Калатея лансифолия — тропический многолетник из Бразилии, который ценят за длинные волнистые листья с тёмным овальным узором и пурпурной изнанкой.',
      },
      importantImage: '/plant-profile/calathea-important-leaves.png',
      propagationIcon: '/plant-profile/calathea-propagation-icon.png',
      propagationImage: '/plant-profile/calathea-propagation.jpg',
      quickFacts: {
        growth: { en: 'Moderate', ru: 'Умеренный' },
        height: { en: 'Clump to 60 cm', ru: 'Куст до 60 см' },
      },
      secondaryCare: [
        {
          body: {
            en: 'Mix by volume: 40% quality houseplant compost, 30% coco coir, 20% perlite and 10% fine pine bark. The mix stays evenly moist yet airy around the roots.',
            ru: 'Смешайте по объёму: 40% качественного грунта для декоративнолистных, 30% кокосового субстрата, 20% перлита и 10% мелкой сосновой коры. Смесь удерживает влагу, но остаётся воздушной у корней.',
          },
          title: { en: 'Soil', ru: 'Грунт' },
        },
        {
          body: { en: 'Repot or divide in late spring when the clump has filled its pot.', ru: 'Пересаживайте или делите куст поздней весной, когда он освоит горшок.' },
          title: { en: 'Repotting', ru: 'Пересадка' },
        },
        {
          body: {
            en: 'Use a low-salt liquid fertiliser with N-P₂O₅-K₂O close to 3-1-2 (for example 18-6-12), including Ca, Mg, chelated Fe, Mn, Zn, Cu and B. Feed monthly at quarter to half strength from spring to summer; avoid fluoride-containing products.',
            ru: 'Выбирайте малосолевое жидкое удобрение с N-P₂O₅-K₂O около 3-1-2 (например, 18-6-12), с Ca, Mg, хелатным Fe, Mn, Zn, Cu и B. Подкармливайте с весны до конца лета раз в месяц в ¼–½ дозы; избегайте средств с фтором.',
          },
          title: { en: 'Feeding', ru: 'Подкормки' },
        },
        {
          body: { en: 'No support is needed. Remove only yellowed or damaged leaves at the base.', ru: 'Опора не нужна. Удаляйте только пожелтевшие или повреждённые листья у основания.' },
          title: { en: 'Grooming', ru: 'Уход за листвой' },
        },
      ],
      saleImage: '/plant-profile/calathea-for-sale.png',
    },
  },
  {
    familyId: 'aizoaceae',
    id: 'faucaria-tigrina',
    image: '/plants/faucaria-tigrina-home-photo.jpg',
    name: {
      en: 'Tiger jaws',
      ru: 'Фаукария тигровая',
    },
    profile: {
      care: [
        {
          body: { en: 'Give the brightest available position, ideally with several hours of direct sun after gradual acclimatisation.', ru: 'Поставьте на самое светлое место; после постепенного привыкания полезны несколько часов прямого солнца.' },
          title: { en: 'Light', ru: 'Освещение' },
        },
        {
          body: { en: 'Water thoroughly only after the gritty mix has dried. Never leave water in the saucer.', ru: 'Поливайте обильно только после просыхания минеральной смеси. Не оставляйте воду в поддоне.' },
          title: { en: 'Watering', ru: 'Полив' },
        },
        {
          body: { en: 'Normal dry room air suits it well; high humidity is unnecessary.', ru: 'Обычный сухой комнатный воздух подходит хорошо; повышенная влажность не нужна.' },
          title: { en: 'Humidity', ru: 'Влажность' },
        },
        {
          body: { en: 'Keep warm in growth, then give a bright, cool and dry winter rest above 8°C.', ru: 'В период роста держите в тепле, а зимой обеспечьте светлый, прохладный и сухой отдых выше 8 °C.' },
          title: { en: 'Temperature', ru: 'Температура' },
        },
      ],
      difficulty: 2,
      facts: [
        { label: { en: 'Family', ru: 'Семейство' }, value: { en: 'Ice plant family (Aizoaceae)', ru: 'Аизовые (Aizoaceae)' } },
        { label: { en: 'Origin', ru: 'Родина' }, value: { en: 'Eastern Cape, South Africa', ru: 'Восточная Капская провинция, ЮАР' } },
        { label: { en: 'Plant type', ru: 'Тип растения' }, value: { en: 'Clumping succulent subshrub', ru: 'Кустящийся суккулентный полукустарник' } },
      ],
      footer: {
        facts: {
          en: ['The paired triangular leaves have soft white marginal teeth that give the plant its tiger-jaw name.', 'Leaf surfaces are dotted with pale translucent spots.', 'Mature plants can open large yellow flowers in bright sunshine.', 'It forms new rosettes at the base and gradually becomes a small clump.'],
          ru: ['Парные треугольные листья с мягкими белыми зубчиками по краю дали растению «тигровое» название.', 'Поверхность листьев усеяна светлыми полупрозрачными точками.', 'Взрослые растения могут раскрывать крупные жёлтые цветки на ярком солнце.', 'У основания появляются новые розетки, и со временем образуется компактная куртинка.'],
        },
        important: {
          en: 'The main risk is prolonged dampness. Protect the roots from waterlogging and do not water a cold plant.',
          ru: 'Главный риск — длительная сырость. Берегите корни от застоя воды и не поливайте холодное растение.',
        },
        problems: {
          en: ['Soft, translucent leaves — stop watering and inspect the roots.', 'Stretched, pale growth — move to brighter light gradually.', 'Shrivelled leaves in dry soil — water once, then let the mix drain fully.'],
          ru: ['Мягкие полупрозрачные листья — прекратите полив и проверьте корни.', 'Вытянутый бледный прирост — постепенно переставьте на более яркий свет.', 'Сморщенные листья при сухом грунте — один раз полейте и дайте смеси полностью стечь.'],
        },
        propagation: {
          en: 'Separate a rooted offset in late spring or summer. Let the cut dry for a day, then plant into a dry gritty mix and wait before the first light watering.',
          ru: 'Отделяйте укоренённую дочернюю розетку поздней весной или летом. Подсушите срез сутки, посадите в сухую минеральную смесь и лишь затем осторожно полейте.',
        },
      },
      latinName: 'Faucaria tigrina',
      notes: {
        en: 'Tiger jaws is a compact South African succulent prized for its patterned leaves with tooth-like margins.',
        ru: 'Фаукарию тигровую ценят за компактные узорчатые листья с зубчиками по краям.',
      },
      overview: {
        en: 'Tiger jaws is a small clumping succulent from South Africa. Its thick paired leaves are edged with soft, pale teeth and store water for dry periods.',
        ru: 'Фаукария тигровая — небольшой кустящийся суккулент из Южной Африки. Толстые парные листья с мягкими светлыми зубчиками запасают воду на засушливый период.',
      },
      importantImage: '/plant-profile/faucaria-important-leaves.png',
      propagationIcon: '/plant-profile/faucaria-propagation-icon.png',
      propagationImage: '/plant-profile/faucaria-propagation.jpg',
      quickFacts: {
        growth: { en: 'Slow', ru: 'Медленный' },
        height: { en: 'Rosette to 15 cm', ru: 'Розетка до 15 см' },
      },
      saleImage: '/plant-profile/faucaria-for-sale.png',
      secondaryCare: [
        {
          body: { en: 'Mix by volume: 30% cactus compost, 35% pumice or fine gravel, 25% perlite and 10% coarse sand. Use a pot with a drainage hole.', ru: 'Смешайте по объёму: 30% грунта для кактусов, 35% пемзы или мелкого гравия, 25% перлита и 10% крупного песка. Горшок нужен с дренажным отверстием.' },
          title: { en: 'Soil', ru: 'Грунт' },
        },
        {
          body: { en: 'Repot in spring only when the clump has filled its pot. Keep the neck of the plant above the mix.', ru: 'Пересаживайте весной, только когда куртинка освоила горшок. Шейку растения оставляйте над уровнем смеси.' },
          title: { en: 'Repotting', ru: 'Пересадка' },
        },
        {
          body: { en: 'Use a low-nitrogen cactus fertiliser with micronutrients once a month in active growth at half strength. Do not feed a dormant or stressed plant.', ru: 'Раз в месяц в период роста давайте удобрение для кактусов с пониженным азотом и микроэлементами в половинной дозе. Не подкармливайте спящее или ослабленное растение.' },
          title: { en: 'Feeding', ru: 'Подкормки' },
        },
        {
          body: { en: 'No support is needed. Remove only fully dry old leaves; the pale marginal teeth are natural and soft.', ru: 'Опора не нужна. Удаляйте только полностью сухие старые листья; светлые зубчики по краю — естественная мягкая особенность.' },
          title: { en: 'Grooming', ru: 'Уход за розеткой' },
        },
      ],
    },
  },
  {
    familyId: 'crassulaceae',
    id: 'kalanchoe-tomentosa',
    image: '/plants/kalanchoe-tomentosa-home-photo.jpg',
    name: { en: 'Panda plant', ru: 'Каланхоэ войлочное' },
    profile: {
      care: [
        { body: { en: 'Give bright light and several hours of gentle direct sun after acclimatisation.', ru: 'Нужен яркий свет и несколько часов мягкого прямого солнца после постепенного привыкания.' }, title: { en: 'Light', ru: 'Освещение' } },
        { body: { en: 'Water only when the gritty mix has dried almost completely. Drain excess water.', ru: 'Поливайте только после почти полного просыхания минеральной смеси. Излишки воды всегда сливайте.' }, title: { en: 'Watering', ru: 'Полив' } },
        { body: { en: 'Normal dry room air is ideal; do not mist the velvety leaves.', ru: 'Обычный сухой комнатный воздух подходит идеально; бархатистые листья не опрыскивайте.' }, title: { en: 'Humidity', ru: 'Влажность' } },
        { body: { en: 'Keep warm in growth and brighter, drier and cooler in winter, above 10°C.', ru: 'В период роста держите в тепле, а зимой — светлее, суше и прохладнее, выше 10 °C.' }, title: { en: 'Temperature', ru: 'Температура' } },
      ],
      difficulty: 2,
      facts: [
        { label: { en: 'Family', ru: 'Семейство' }, value: { en: 'Stonecrop family (Crassulaceae)', ru: 'Толстянковые (Crassulaceae)' } },
        { label: { en: 'Origin', ru: 'Родина' }, value: { en: 'Central-eastern Madagascar', ru: 'Центрально-восточный Мадагаскар' } },
        { label: { en: 'Plant type', ru: 'Тип растения' }, value: { en: 'Velvety succulent subshrub', ru: 'Бархатистый суккулентный полукустарник' } },
      ],
      footer: {
        facts: { en: ['The dense felt-like hairs protect the leaves from intense sun and reduce water loss.', 'Brown markings along the leaf margins give the plant a distinctive outline.', 'Indoor plants rarely flower, but mature plants can produce tubular blooms.', 'It is often called panda plant for its soft, fuzzy foliage.'], ru: ['Густое войлочное опушение защищает листья от яркого солнца и уменьшает потерю влаги.', 'Коричневые отметины по краям листьев создают узнаваемый рисунок.', 'В помещении растение цветёт редко, но взрослые экземпляры могут дать трубчатые цветки.', 'Из-за мягкой пушистой листвы его часто называют панда-плант.'] },
        important: { en: 'Never keep the roots wet for long and avoid getting water trapped in the leaf fuzz.', ru: 'Не держите корни во влажном грунте долго и не оставляйте воду в опушении листьев.' },
        problems: { en: ['Soft dark leaves — likely excess moisture.', 'Long pale growth — move gradually to brighter light.', 'Leaf marks rub off easily — handle the velvet foliage gently.'], ru: ['Мягкие тёмные листья — вероятно, избыток влаги.', 'Вытянутый бледный прирост — постепенно добавьте света.', 'Налёт на листьях легко стирается — обращайтесь с бархатистой листвой бережно.'] },
        propagation: { en: 'Take a healthy stem cutting in spring or summer. Let the cut dry for several days, then root it in a dry gritty mix.', ru: 'Весной или летом возьмите здоровый стеблевой черенок. Подсушите срез несколько дней, затем укореняйте в сухой минеральной смеси.' },
      },
      latinName: 'Kalanchoe tomentosa',
      notes: { en: 'Velvety foliage and chocolate-brown leaf markings make this a quietly sculptural succulent.', ru: 'Бархатистая листва и шоколадно-коричневые отметины делают этот суккулент особенно графичным.' },
      overview: { en: 'Kalanchoe tomentosa is a Madagascan succulent subshrub with soft silver-green felted leaves and brown margins.', ru: 'Каланхоэ войлочное — мадагаскарский суккулентный полукустарник с мягкими серебристо-зелёными войлочными листьями и коричневыми краями.' },
      importantImage: '/plant-profile/kalanchoe-important-leaves.png',
      propagationIcon: '/plant-profile/kalanchoe-propagation-icon.png',
      propagationImage: '/plant-profile/kalanchoe-propagation.jpg',
      quickFacts: { growth: { en: 'Slow to moderate', ru: 'Медленный' }, height: { en: 'Up to 45 cm indoors', ru: 'До 45 см в помещении' } },
      saleImage: '/plant-profile/kalanchoe-for-sale.png',
      secondaryCare: [
        { body: { en: 'Mix by volume: 35% cactus compost, 30% pumice or fine gravel, 25% perlite and 10% coarse sand. Use a drainage hole.', ru: 'Смешайте по объёму: 35% грунта для кактусов, 30% пемзы или мелкого гравия, 25% перлита и 10% крупного песка. Горшок нужен с дренажным отверстием.' }, title: { en: 'Soil', ru: 'Грунт' } },
        { body: { en: 'Repot in spring only when the roots have filled the pot.', ru: 'Пересаживайте весной, только когда корни полностью освоят горшок.' }, title: { en: 'Repotting', ru: 'Пересадка' } },
        { body: { en: 'Use a low-nitrogen cactus fertiliser with micronutrients once a month in active growth at half strength.', ru: 'Раз в месяц в период роста используйте удобрение для кактусов с пониженным азотом и микроэлементами в половинной дозе.' }, title: { en: 'Feeding', ru: 'Подкормки' } },
        { body: { en: 'No support is needed. Do not rub or wash the leaves: their felted coating is natural protection.', ru: 'Опора не нужна. Не трите и не мойте листья: войлочное покрытие — естественная защита.' }, title: { en: 'Grooming', ru: 'Уход за листвой' } },
      ],
    },
  },
  {
    familyId: 'marantaceae',
    id: 'goeppertia-rufibarba',
    image: '/plants/goeppertia-rufibarba-home-photo.jpg',
    name: { en: 'Velvet calathea', ru: 'Калатея руфибарба' },
    profile: {
      care: [
        { body: { en: 'Give bright, filtered or indirect light. Direct sun can fade and scorch the velvety leaves.', ru: 'Нужен яркий фильтрованный или рассеянный свет. Прямое солнце может обесцветить и обжечь бархатистые листья.' }, title: { en: 'Light', ru: 'Освещение' } },
        { body: { en: 'Keep the mix lightly and evenly moist while it grows, then water less in winter. Never leave the roots standing in water.', ru: 'В период роста поддерживайте смесь слегка и равномерно влажной, а зимой поливайте реже. Не оставляйте корни в воде.' }, title: { en: 'Watering', ru: 'Полив' } },
        { body: { en: 'A humid room helps the leaf edges remain smooth; keep it away from dry hot airflow.', ru: 'Влажный воздух помогает краям листьев оставаться ровными; не ставьте растение на пути сухого горячего воздуха.' }, title: { en: 'Humidity', ru: 'Влажность' } },
        { body: { en: 'Keep warm and draught-free, ideally 18–27°C and never close to cold glass.', ru: 'Держите в тепле и без сквозняков, лучше при 18–27 °C и не вплотную к холодному стеклу.' }, title: { en: 'Temperature', ru: 'Температура' } },
      ],
      difficulty: 4,
      facts: [
        { label: { en: 'Family', ru: 'Семейство' }, value: { en: 'Prayer plant family (Marantaceae)', ru: 'Марантовые (Marantaceae)' } },
        { label: { en: 'Origin', ru: 'Родина' }, value: { en: 'Bahia, north-eastern Brazil', ru: 'Баия, северо-восток Бразилии' } },
        { label: { en: 'Plant type', ru: 'Тип растения' }, value: { en: 'Rhizomatous evergreen perennial', ru: 'Корневищный вечнозелёный многолетник' } },
      ],
      footer: {
        facts: {
          en: ['The long, narrow leaves have strongly wavy edges and a velvety surface.', 'The leaf undersides and petioles show a rich burgundy tone.', 'Its name rufibarba refers to the fine reddish hairs around the leaf stems.', 'Like other prayer plants, it can raise and fold its leaves as light changes.'],
          ru: ['Длинные узкие листья имеют заметно волнистый край и бархатистую поверхность.', 'Изнанка листьев и черешки окрашены в насыщенный бордовый тон.', 'Название rufibarba связано с тонкими рыжеватыми волосками у черешков.', 'Как и другие марантовые, растение может поднимать и складывать листья при смене освещения.'],
        },
        important: { en: 'Do not allow the root ball to dry out fully, and keep the plant away from hard direct sun, cold glass and draughts.', ru: 'Не пересушивайте корневой ком полностью и берегите растение от жёсткого прямого солнца, холодного стекла и сквозняков.' },
        problems: {
          en: ['Crisp brown edges — humidity may be too low or watering uneven.', 'Faded patches — move away from direct sunlight.', 'Yellowing leaves — let the mix drain and check that the roots are not waterlogged.'],
          ru: ['Сухие коричневые края — вероятно, слишком сухой воздух или неравномерный полив.', 'Бледные пятна — уберите от прямого солнца.', 'Листья желтеют — дайте смеси просохнуть и проверьте, нет ли застоя у корней.'],
        },
        propagation: { en: 'Divide a mature clump in late spring, keeping several healthy shoots and roots with each division.', ru: 'Делите взрослый куст поздней весной: у каждой делёнки должны остаться несколько здоровых побегов и корней.' },
      },
      latinName: 'Goeppertia rufibarba',
      notes: { en: 'Often sold as Calathea rufibarba. It is especially valued for its narrow, softly velvety leaves and wine-coloured undersides.', ru: 'Часто продаётся под названием Calathea rufibarba. Её ценят за узкие мягко-бархатистые листья и винную изнанку.' },
      overview: { en: 'Velvet calathea is a tropical Brazilian prayer plant with long wavy leaves, reddish petioles and deep burgundy undersides.', ru: 'Калатея руфибарба — тропическое бразильское растение из марантовых с длинными волнистыми листьями, красноватыми черешками и глубокой бордовой изнанкой.' },
      importantImage: '/plant-profile/rufibarba-important-leaves.png',
      propagationIcon: '/plant-profile/rufibarba-propagation-icon.png',
      propagationImage: '/plant-profile/rufibarba-propagation.jpg',
      quickFacts: { growth: { en: 'Moderate', ru: 'Умеренный' }, height: { en: 'Clump to 90 cm', ru: 'Куст до 90 см' } },
      saleImage: '/plant-profile/rufibarba-for-sale.png',
      secondaryCare: [
        { body: { en: 'Mix by volume: 40% quality foliage-plant compost, 30% coco coir, 20% perlite and 10% fine pine bark. It holds moisture evenly while keeping air around the roots.', ru: 'Смешайте по объёму: 40% качественного грунта для декоративнолистных, 30% кокосового субстрата, 20% перлита и 10% мелкой сосновой коры. Смесь равномерно удерживает влагу, но остаётся воздушной у корней.' }, title: { en: 'Soil', ru: 'Грунт' } },
        { body: { en: 'Repot or divide in late spring once the clump has filled its pot.', ru: 'Пересаживайте или делите куст поздней весной, когда он освоит горшок.' }, title: { en: 'Repotting', ru: 'Пересадка' } },
        { body: { en: 'Use a low-salt liquid fertiliser with N-P₂O₅-K₂O near 3-1-2 and Ca, Mg, chelated Fe, Mn, Zn, Cu and B. Feed monthly at quarter to half strength from spring to summer.', ru: 'Выбирайте малосолевое жидкое удобрение с N-P₂O₅-K₂O около 3-1-2, а также Ca, Mg, хелатным Fe, Mn, Zn, Cu и B. С весны до конца лета подкармливайте раз в месяц в ¼–½ дозы.' }, title: { en: 'Feeding', ru: 'Подкормки' } },
        { body: { en: 'No support is needed. Remove only damaged leaves at the base and do not polish the naturally velvety foliage.', ru: 'Опора не нужна. Удаляйте только повреждённые листья у основания и не полируйте естественно бархатистую листву.' }, title: { en: 'Grooming', ru: 'Уход за листвой' } },
      ],
    },
  },
  {
    familyId: 'marantaceae',
    id: 'goeppertia-elliptica-vittata',
    image: '/plants/goeppertia-elliptica-vittata-home-photo.jpg',
    name: { en: 'Vittata calathea', ru: 'Калатея виттата' },
    profile: {
      care: [
        { body: { en: 'Give bright, filtered or indirect light. Direct sun fades the pale stripes and can scorch the leaves.', ru: 'Нужен яркий фильтрованный или рассеянный свет. Прямое солнце обесцвечивает светлые полосы и может обжечь листья.' }, title: { en: 'Light', ru: 'Освещение' } },
        { body: { en: 'Keep the mix evenly moist during active growth, allowing only the surface to dry slightly. Never leave the roots waterlogged.', ru: 'В период роста поддерживайте смесь равномерно влажной, позволяя лишь поверхности слегка подсохнуть. Не допускайте застоя воды у корней.' }, title: { en: 'Watering', ru: 'Полив' } },
        { body: { en: 'High humidity helps preserve smooth leaf edges and clear variegation; avoid dry hot air.', ru: 'Высокая влажность помогает сохранить ровные края листьев и чёткий рисунок; избегайте сухого горячего воздуха.' }, title: { en: 'Humidity', ru: 'Влажность' } },
        { body: { en: 'Keep warm and draught-free, ideally 18–27°C. Do not place close to cold glass.', ru: 'Держите в тепле и без сквозняков, лучше при 18–27 °C. Не ставьте растение вплотную к холодному стеклу.' }, title: { en: 'Temperature', ru: 'Температура' } },
      ],
      difficulty: 4,
      facts: [
        { label: { en: 'Family', ru: 'Семейство' }, value: { en: 'Prayer plant family (Marantaceae)', ru: 'Марантовые (Marantaceae)' } },
        { label: { en: 'Origin', ru: 'Родина' }, value: { en: 'Tropical northern South America and Brazil', ru: 'Тропики севера Южной Америки и Бразилии' } },
        { label: { en: 'Plant type', ru: 'Тип растения' }, value: { en: 'Rhizomatous evergreen perennial', ru: 'Корневищный вечнозелёный многолетник' } },
      ],
      footer: {
        facts: {
          en: ['The pale, narrow stripes radiate from the midrib across each leaf.', 'The pattern stays clearest in stable bright indirect light.', 'Like other prayer plants, the leaves can rise and fold at night.', 'It grows as a compact clump, producing new leaves from its rhizome.'],
          ru: ['Светлые узкие полосы расходятся от центральной жилки по всей пластинке.', 'Рисунок остаётся наиболее чётким при стабильном ярком рассеянном свете.', 'Как и другие марантовые, листья могут подниматься и складываться ночью.', 'Растение растёт компактным кустом, выпуская новые листья из корневища.'],
        },
        important: { en: 'Do not let the root ball dry out completely. Keep the plant away from direct sun, cold glass and dry air from radiators.', ru: 'Не пересушивайте корневой ком полностью. Берегите растение от прямого солнца, холодного стекла и сухого воздуха от батарей.' },
        problems: {
          en: ['Brown tips — humidity may be low or water may be too hard.', 'Faded stripes — give more bright indirect light, not sun.', 'Yellowing leaves — check that the mix is not staying wet for too long.'],
          ru: ['Коричневые кончики — вероятно, низкая влажность или слишком жёсткая вода.', 'Полосы бледнеют — добавьте яркого рассеянного света, но не прямого солнца.', 'Листья желтеют — проверьте, не остаётся ли смесь влажной слишком долго.'],
        },
        propagation: { en: 'Divide a mature clump in late spring, keeping healthy roots and several shoots with each new plant.', ru: 'Делите взрослый куст поздней весной: у каждого нового растения должны остаться здоровые корни и несколько побегов.' },
      },
      latinName: "Goeppertia elliptica 'Vittata'",
      notes: { en: 'Often sold as Calathea vittata. This horticultural form is prized for its fine pale pinstripes on fresh green leaves.', ru: 'Часто продаётся как Calathea vittata. Эту садовую форму ценят за тонкие светлые полосы на свежей зелёной листве.' },
      overview: { en: 'Vittata calathea is a striped form of Goeppertia elliptica, a tropical prayer plant that forms a compact clump of pointed, finely variegated leaves.', ru: 'Калатея виттата — полосатая форма Goeppertia elliptica, тропического растения из марантовых, образующего компактный куст с заострёнными тонко-вариегатными листьями.' },
      importantImage: '/plant-profile/vittata-important-leaves.png',
      propagationIcon: '/plant-profile/vittata-propagation-icon.png',
      propagationImage: '/plant-profile/vittata-propagation.jpg',
      quickFacts: { growth: { en: 'Moderate', ru: 'Умеренный' }, height: { en: 'Clump to 60 cm', ru: 'Куст до 60 см' } },
      saleImage: '/plant-profile/vittata-for-sale.png',
      secondaryCare: [
        { body: { en: 'Mix by volume: 40% quality foliage-plant compost, 30% coco coir, 20% perlite and 10% fine pine bark. It keeps moisture available without compacting around the roots.', ru: 'Смешайте по объёму: 40% качественного грунта для декоративнолистных, 30% кокосового субстрата, 20% перлита и 10% мелкой сосновой коры. Смесь удерживает влагу, но не уплотняется у корней.' }, title: { en: 'Soil', ru: 'Грунт' } },
        { body: { en: 'Repot or divide in late spring when the clump has filled its pot.', ru: 'Пересаживайте или делите куст поздней весной, когда он освоит горшок.' }, title: { en: 'Repotting', ru: 'Пересадка' } },
        { body: { en: 'Use a low-salt liquid fertiliser with N-P₂O₅-K₂O near 3-1-2 and Ca, Mg, chelated Fe, Mn, Zn, Cu and B. Feed monthly at quarter to half strength from spring to summer.', ru: 'Выбирайте малосолевое жидкое удобрение с N-P₂O₅-K₂O около 3-1-2, а также Ca, Mg, хелатным Fe, Mn, Zn, Cu и B. С весны до конца лета подкармливайте раз в месяц в ¼–½ дозы.' }, title: { en: 'Feeding', ru: 'Подкормки' } },
        { body: { en: 'No support is needed. Remove only damaged leaves at the base and wipe dust with a soft damp cloth.', ru: 'Опора не нужна. Удаляйте только повреждённые листья у основания, а пыль убирайте мягкой влажной салфеткой.' }, title: { en: 'Grooming', ru: 'Уход за листвой' } },
      ],
    },
  },
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
