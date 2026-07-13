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
          body: { en: 'A humus-rich, airy mix that holds some moisture but drains well.', ru: 'Гумусный и воздухопроницаемый субстрат, который удерживает немного влаги, но хорошо дренируется.' },
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
