import { Button, Flex, Link } from '@chakra-ui/react';
import type { Locale } from 'src/shared/config';

interface HeaderNavigationProps {
  readonly locale: Locale;
  readonly onCollectionOpen: () => void;
}

const links = {
  ru: [
    ['Главная', '/'],
    ['Семейства', '/#greenhouse-categories-title'],
    ['Уход', '/care'],
    ['Обо мне', '/about'],
    ['Блог', '/blog'],
  ],
  en: [
    ['Home', '/'],
    ['Families', '/#greenhouse-categories-title'],
    ['Care', '/care'],
    ['About me', '/about'],
    ['Blog', '/blog'],
  ],
} as const;

export const HeaderNavigation = ({ locale, onCollectionOpen }: HeaderNavigationProps) => (
  <Flex
    alignItems="center"
    aria-label={locale === 'ru' ? 'Основная навигация' : 'Main navigation'}
    as="nav"
    display={{ base: 'none', lg: 'flex' }}
    flex="1 1 auto"
    gap="clamp(12px, 1.65vw, 26px)"
    justifyContent="center"
    minWidth={0}
  >
    <Link color="#343a31" fontSize="0.82rem" fontWeight={500} href="/" textDecoration="none">
      {locale === 'ru' ? 'Главная' : 'Home'}
    </Link>
    <Button
      background="transparent"
      color="#343a31"
      fontSize="0.82rem"
      fontWeight={500}
      height="auto"
      minWidth={0}
      onClick={onCollectionOpen}
      padding={0}
      _hover={{ color: '#536448' }}
    >
      {locale === 'ru' ? 'Мои растения' : 'My plants'}
    </Button>
    {links[locale].slice(1).map(([label, href]) => (
      <Link color="#343a31" fontSize="0.82rem" fontWeight={500} href={href} key={href} textDecoration="none">
        {label}
      </Link>
    ))}
  </Flex>
);
