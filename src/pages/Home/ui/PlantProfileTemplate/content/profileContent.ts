import type { Locale } from 'src/shared/config';

export const profileCopy = {
  en: {
    difficulty: 'Difficulty level',
    fastGrowth: 'Fast growth',
    facts: 'Useful facts',
    important: 'Important',
    notes: 'My notes',
    problems: 'Possible problems',
    propagation: 'Propagation',
  },
  ru: {
    difficulty: 'Уровень сложности',
    fastGrowth: 'Рост',
    facts: 'Полезные факты',
    important: 'Важно!',
    notes: 'Мои заметки',
    problems: 'Возможные проблемы',
    propagation: 'Размножение',
  },
} as const;

export type ProfileCopy = (typeof profileCopy)[Locale];

export const secondaryCare = {
  en: [
    ['Soil', 'A humus-rich, airy mix that holds some moisture but drains well.'],
    ['Repotting', 'Repot in spring when the roots have filled the pot.'],
    ['Feeding', 'Use a balanced fertiliser during active growth, following the product instructions.'],
    ['Support & shaping', 'Offer a support for the tendrils and prune long shoots to keep the vine neat.'],
  ],
  ru: [
    ['Грунт', 'Гумусный и воздухопроницаемый субстрат, который удерживает немного влаги, но хорошо дренируется.'],
    ['Пересадка', 'Пересаживайте весной, когда корни полностью освоят горшок.'],
    ['Подкормки', 'В период активного роста используйте сбалансированное удобрение по инструкции производителя.'],
    ['Опоры и формировка', 'Дайте усикам опору и подрезайте длинные побеги, чтобы лиана оставалась аккуратной.'],
  ],
} as const;

export const profileFooter = {
  en: {
    facts: ['An evergreen woody climber native to eastern Australia.', 'Simple toothed leaves are usually ovate to oblong.', 'The vine climbs with simple or two-branched tendrils.'],
    important: 'Do not let the root ball dry out completely during active growth, but never leave it standing in water.',
    problems: ['Yellowing leaves — check for waterlogging.', 'Brown edges — air may be too dry or the soil has dried too far.', 'Sparse growth — move to brighter indirect light.'],
    propagation: 'Propagate from stem cuttings during active growth in a lightly moist, airy substrate.',
  },
  ru: {
    facts: ['Вечнозелёная древеснеющая лиана, родом с восточного побережья Австралии.', 'Простые зубчатые листья обычно имеют яйцевидную или продолговатую форму.', 'Лиана цепляется за опору простыми или двураздельными усиками.'],
    important: 'В период активного роста не пересушивайте корневой ком полностью, но и не оставляйте растение стоять в воде.',
    problems: ['Желтеют листья — проверьте, нет ли застоя воды.', 'Края листьев буреют — воздух может быть слишком сухим или грунт сильно пересох.', 'Побеги вытягиваются — переставьте растение в более яркий рассеянный свет.'],
    propagation: 'Размножайте стеблевыми черенками в период активного роста в слегка влажном, воздухопроницаемом субстрате.',
  },
} as const;
