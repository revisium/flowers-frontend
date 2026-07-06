import { useState } from 'react';

type RoomZone = 'window' | 'shelf' | 'sunny' | 'table';
type PlantCategory = 'all' | 'foliage' | 'aroid' | 'flowering' | 'succulent' | 'palm';
type Locale = 'ru' | 'en';

interface Plant {
  readonly id: string;
  readonly name: string;
  readonly nameEn: string;
  readonly latinName: string;
  readonly category: Exclude<PlantCategory, 'all'>;
  readonly zone: RoomZone;
  readonly x: number;
  readonly y: number;
  readonly size: 'sm' | 'md' | 'lg';
}

interface CategoryOption {
  readonly key: PlantCategory;
}

const plants: readonly Plant[] = [
  {
    id: '8a9m6r',
    name: 'Монстера Адансона',
    nameEn: 'Adanson’s Monstera',
    latinName: 'Monstera adansonii',
    category: 'aroid',
    zone: 'window',
    x: 43,
    y: 55,
    size: 'lg',
  },
  {
    id: 'cth-orn',
    name: 'Калатея Орната',
    nameEn: 'Pinstripe Calathea',
    latinName: 'Calathea ornata',
    category: 'foliage',
    zone: 'window',
    x: 54,
    y: 60,
    size: 'md',
  },
  {
    id: 'epi-gld',
    name: 'Эпипремнум Золотистый',
    nameEn: 'Golden Pothos',
    latinName: 'Epipremnum aureum',
    category: 'foliage',
    zone: 'shelf',
    x: 55,
    y: 25,
    size: 'sm',
  },
  {
    id: 'chl-bon',
    name: "Хлорофитум 'Bonnie'",
    nameEn: "Spider Plant 'Bonnie'",
    latinName: 'Chlorophytum comosum',
    category: 'foliage',
    zone: 'shelf',
    x: 78,
    y: 30,
    size: 'md',
  },
  {
    id: 'spa-wal',
    name: 'Спатифиллум',
    nameEn: 'Peace Lily',
    latinName: 'Spathiphyllum wallisii',
    category: 'flowering',
    zone: 'window',
    x: 62,
    y: 62,
    size: 'md',
  },
  {
    id: 'agl-val',
    name: 'Аглаонема Red Valentine',
    nameEn: 'Aglaonema Red Valentine',
    latinName: 'Aglaonema commutatum',
    category: 'aroid',
    zone: 'shelf',
    x: 86,
    y: 62,
    size: 'lg',
  },
  {
    id: 'ech-elg',
    name: 'Эхеверия Элеганс',
    nameEn: 'Echeveria Elegans',
    latinName: 'Echeveria elegans',
    category: 'succulent',
    zone: 'sunny',
    x: 69,
    y: 57,
    size: 'sm',
  },
  {
    id: 'ham-elg',
    name: 'Хамедорея',
    nameEn: 'Parlor Palm',
    latinName: 'Chamaedorea elegans',
    category: 'palm',
    zone: 'table',
    x: 30,
    y: 70,
    size: 'md',
  },
];

const categories: readonly CategoryOption[] = [
  { key: 'all' },
  { key: 'foliage' },
  { key: 'aroid' },
  { key: 'flowering' },
  { key: 'succulent' },
  { key: 'palm' },
];

const categoryLabels: Record<Locale, Record<PlantCategory, string>> = {
  ru: {
    all: 'Все растения',
    foliage: 'Лиственные',
    aroid: 'Ароидные',
    flowering: 'Цветущие',
    succulent: 'Суккуленты',
    palm: 'Пальмы',
  },
  en: {
    all: 'All plants',
    foliage: 'Foliage',
    aroid: 'Aroids',
    flowering: 'Blooming',
    succulent: 'Succulents',
    palm: 'Palms',
  },
};

const copy: Record<
  Locale,
  {
    readonly brandSubtitle: string;
    readonly collection: string;
    readonly searchLabel: string;
    readonly searchPlaceholder: string;
    readonly show: string;
    readonly quote: string;
    readonly weatherLabel: string;
    readonly sunny: string;
  }
> = {
  ru: {
    brandSubtitle: 'моя коллекция растений',
    collection: 'Моя коллекция',
    searchLabel: 'Поиск растения',
    searchPlaceholder: 'Найти растение...',
    show: 'Показать',
    quote: 'Растения не просто украшают дом, они делают его живым',
    weatherLabel: 'Погода и время',
    sunny: 'Солнечно',
  },
  en: {
    brandSubtitle: 'my plant collection',
    collection: 'My collection',
    searchLabel: 'Search plants',
    searchPlaceholder: 'Search plants...',
    show: 'Show',
    quote: 'Plants do not just decorate a home, they make it feel alive',
    weatherLabel: 'Weather and time',
    sunny: 'Sunny',
  },
};

function countPlantsByCategory(category: PlantCategory) {
  if (category === 'all') {
    return plants.length;
  }

  return plants.filter((plant) => plant.category === category).length;
}

export function HomePage() {
  const [category, setCategory] = useState<PlantCategory>('all');
  const [query, setQuery] = useState('');
  const [locale, setLocale] = useState<Locale>('ru');
  const text = copy[locale];

  return (
    <main className="room-page">
      <section className="room-scene" aria-label="Домашняя оранжерея">
        <aside className="room-nav" aria-label="Разделы оранжереи">
          <a aria-label="Оранжерея, главная" className="room-brand" href="/">
            <span className="room-brand__leaf" />
            <span>
              <strong>Оранжерея</strong>
              <small>{text.brandSubtitle}</small>
            </span>
          </a>

          <nav className="room-menu" aria-label={text.collection}>
            <button
              aria-pressed={category === 'all'}
              className={
                category === 'all' ? 'room-menu__item room-menu__item--active' : 'room-menu__item'
              }
              onClick={() => {
                setCategory('all');
              }}
              type="button"
            >
              <span className="room-icon room-icon--plant" />
              {text.collection}
              <b>{plants.length}</b>
            </button>
            <div className="room-category-list" aria-label={text.show}>
              {categories
                .filter((option) => option.key !== 'all')
                .map((option) => (
                  <button
                    aria-pressed={category === option.key}
                    className={
                      category === option.key
                        ? 'room-category room-category--active'
                        : 'room-category'
                    }
                    key={option.key}
                    onClick={() => {
                      setCategory(option.key);
                    }}
                    type="button"
                  >
                    <span className={`room-category__dot room-category__dot--${option.key}`} />
                    {categoryLabels[locale][option.key]}
                    <b>{countPlantsByCategory(option.key)}</b>
                  </button>
                ))}
            </div>
          </nav>
        </aside>

        <div className="room-tools">
          <label className="room-search">
            <span className="room-search__icon" />
            <input
              aria-label={text.searchLabel}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
              placeholder={text.searchPlaceholder}
              type="search"
              value={query}
            />
          </label>
          <div className="language-switch" aria-label="Language">
            <button
              aria-pressed={locale === 'ru'}
              className={
                locale === 'ru'
                  ? 'language-switch__item language-switch__item--active'
                  : 'language-switch__item'
              }
              onClick={() => {
                setLocale('ru');
              }}
              type="button"
            >
              RU
            </button>
            <button
              aria-pressed={locale === 'en'}
              className={
                locale === 'en'
                  ? 'language-switch__item language-switch__item--active'
                  : 'language-switch__item'
              }
              onClick={() => {
                setLocale('en');
              }}
              type="button"
            >
              EN
            </button>
          </div>
        </div>

        <article className="room-quote">
          <span className="room-quote__spark" />
          <p>{text.quote}</p>
        </article>

        <article className="room-weather" aria-label={text.weatherLabel}>
          <strong>24°</strong>
          <span>{text.sunny}</span>
          <time>09:45</time>
        </article>
      </section>
    </main>
  );
}
