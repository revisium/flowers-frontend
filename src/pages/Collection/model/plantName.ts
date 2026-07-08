import type { Locale, Plant } from './collectionModel';

export const getPlantName = (plant: Plant, locale: Locale) => {
  return locale === 'ru' ? plant.name : plant.nameEn;
};
