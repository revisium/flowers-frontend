import { plants, type Locale, type Plant, type PlantCategory } from './homeModel';

export interface PlantItemViewModel {
  readonly id: string;
  readonly image: string;
  readonly name: string;
  readonly position: {
    readonly left: string;
    readonly top: string;
    readonly width: string;
  };
}

interface CreatePlantItemViewModelsOptions {
  readonly activeCategory: PlantCategory;
  readonly locale: Locale;
  readonly query: string;
}

function getPlantName(plant: Plant, locale: Locale) {
  return locale === 'ru' ? plant.name : plant.nameEn;
}

function matchesQuery(plant: Plant, locale: Locale, query: string) {
  const normalizedQuery = query.trim().toLocaleLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  return [plant.name, plant.nameEn, plant.latinName, getPlantName(plant, locale)].some((value) =>
    value.toLocaleLowerCase().includes(normalizedQuery),
  );
}

export function createPlantItemViewModels({
  activeCategory,
  locale,
  query,
}: CreatePlantItemViewModelsOptions): readonly PlantItemViewModel[] {
  return plants
    .filter((plant) => {
      const categoryMatches = activeCategory === 'all' || plant.category === activeCategory;

      return categoryMatches && matchesQuery(plant, locale, query);
    })
    .map((plant) => ({
      id: plant.id,
      image: plant.image,
      name: getPlantName(plant, locale),
      position: {
        left: `${plant.x}px`,
        top: `${plant.y}px`,
        width: `${plant.width}px`,
      },
    }));
}
