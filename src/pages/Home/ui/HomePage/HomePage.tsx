import { Box, Button, HStack, Input, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';

interface StatCard {
  readonly iconClassName: string;
  readonly label: string;
  readonly value: string;
}

interface HomeCategory {
  readonly count: string;
  readonly image: string;
  readonly name: string;
}

const statCards: readonly StatCard[] = [
  { iconClassName: 'greenhouse-icon-leaf', label: 'всего растений', value: '16' },
  { iconClassName: 'greenhouse-icon-grid', label: 'категорий', value: '8' },
  { iconClassName: 'greenhouse-icon-can', label: 'полить сегодня', value: '4' },
  { iconClassName: 'greenhouse-icon-heart', label: 'легких в уходе', value: '12' },
];

const categories: readonly HomeCategory[] = [
  { count: '4 растения', image: '/plants/monstera-basket.png', name: 'Декоративно-лиственные' },
  { count: '2 растения', image: '/plants/chlorophytum.png', name: 'Ароидные' },
  { count: '2 растения', image: '/plants/gloxinia.png', name: 'Цветущие' },
  { count: '2 растения', image: '/plants/tradescantia.png', name: 'Лианы и ампельные' },
  { count: '3 растения', image: '/plants/phalaenopsis.png', name: 'Суккуленты' },
  { count: '1 растение', image: '/plants/monstera-basket.png', name: 'Пальмы' },
  { count: '1 растение', image: '/plants/chlorophytum.png', name: 'Папоротники' },
  { count: '1 растение', image: '/plants/gloxinia.png', name: 'Кактусы' },
];

export function HomePage() {
  return (
    <Box as="main" className="greenhouse-home">
      <Box className="greenhouse-hero">
        <Box className="greenhouse-hero__shade" />

        <Box as="header" className="greenhouse-topbar">
          <RouterLink aria-label="Оранжерея, главная" className="greenhouse-logo" to="/">
            <span aria-hidden="true" className="greenhouse-logo__leaf" />
            <strong>Оранжерея</strong>
          </RouterLink>
          <RouterLink className="greenhouse-pill-link" to="/collection">
            Коллекция · 16
          </RouterLink>
          <Box className="greenhouse-search">
            <span aria-hidden="true" className="greenhouse-search__icon" />
            <Input aria-label="Поиск по названию растения" placeholder="Поиск по названию растения..." />
          </Box>
          <Button aria-label="Уведомления" className="greenhouse-bell" type="button" variant="plain">
            <span aria-hidden="true" />
          </Button>
        </Box>

        <Box className="greenhouse-hero__content">
          <Text as="h1">Доброе утро, Наташа!</Text>
          <Text className="greenhouse-hero__subtitle">Ваша оранжерея цветет и растет</Text>

          <Box className="greenhouse-stats">
            {statCards.map((card) => (
              <Box className="greenhouse-stat" key={card.label}>
                <span aria-hidden="true" className={`greenhouse-stat__icon ${card.iconClassName}`} />
                <strong>{card.value}</strong>
                <span>{card.label}</span>
              </Box>
            ))}
          </Box>

          <HStack className="greenhouse-actions">
            <Button className="greenhouse-primary-action" type="button">
              <span aria-hidden="true" className="greenhouse-icon-can greenhouse-action-icon" />
              Полить растения
            </Button>
            <Button className="greenhouse-secondary-action" type="button" variant="outline">
              <span aria-hidden="true" className="greenhouse-icon-book greenhouse-action-icon" />
              Уход и советы
            </Button>
          </HStack>
        </Box>

        <Box className="greenhouse-day-card">
          <Button aria-label="Скрыть напоминание" className="greenhouse-day-card__close" type="button" variant="plain">
            x
          </Button>
          <Text as="strong">Сегодня особенный день</Text>
          <Text>Лучшее время подарить растениям свое внимание</Text>
          <RouterLink className="greenhouse-day-card__link" to="/collection">
            Смотреть список
            <span aria-hidden="true">»</span>
          </RouterLink>
        </Box>
      </Box>

      <Box as="section" className="greenhouse-categories" aria-labelledby="greenhouse-categories-title">
        <HStack className="greenhouse-section-head">
          <Text as="h2" id="greenhouse-categories-title">
            Категории
          </Text>
          <RouterLink to="/collection">Показать все</RouterLink>
        </HStack>

        <Box className="greenhouse-category-strip">
          <Button aria-label="Предыдущие категории" className="greenhouse-round-nav" type="button" variant="plain">
            ‹
          </Button>
          <Box className="greenhouse-category-list-home">
            {categories.map((category) => (
              <RouterLink className="greenhouse-category-card" key={category.name} to="/collection">
                <img alt="" src={category.image} />
                <strong>{category.name}</strong>
                <span>{category.count}</span>
              </RouterLink>
            ))}
          </Box>
          <Button aria-label="Следующие категории" className="greenhouse-round-nav greenhouse-round-nav--next" type="button" variant="plain">
            ›
          </Button>
        </Box>

        <Box className="greenhouse-note">
          <span aria-hidden="true" className="greenhouse-note__leaf" />
          <Text>
            Каждое растение - это маленькая история.
            <br />
            Продолжайте заботиться, наблюдать и наслаждаться!
          </Text>
          <RouterLink className="greenhouse-note__button" to="/collection">
            Мои заметки
          </RouterLink>
          <img alt="" src="/plants/chlorophytum.png" />
        </Box>
      </Box>
    </Box>
  );
}
