import type { Locale, Plant } from './homeModel';

export function getPlantName(plant: Plant, locale: Locale) {
  return locale === 'ru' ? plant.name : plant.nameEn;
}
