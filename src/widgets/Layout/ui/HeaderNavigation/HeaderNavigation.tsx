import { Flex, Link } from '@chakra-ui/react';
import type { Locale } from 'src/shared/config';

import { layoutNavigationLinks } from '../../model/layoutNavigation';

interface HeaderNavigationProps {
  readonly locale: Locale;
}

export const HeaderNavigation = ({ locale }: HeaderNavigationProps) => (
  <Flex
    alignItems="center"
    aria-label={locale === 'ru' ? 'Основная навигация' : 'Main navigation'}
    as="nav"
    borderTop={{ base: '1px solid rgba(119, 108, 83, 0.12)', md: 'none' }}
    display="flex"
    flex={{ base: '0 0 100%', md: '1 1 auto' }}
    gap={{ base: 'clamp(12px, 3.5vw, 18px)', md: 'clamp(12px, 1.65vw, 26px)' }}
    justifyContent="center"
    minWidth={0}
    order={{ base: 1, md: 0 }}
    paddingTop={{ base: '7px', md: 0 }}
    width={{ base: '100%', md: 'auto' }}
  >
    {layoutNavigationLinks[locale].map(([label, href]) => (
      <Link
        color="#343a31"
        fontSize={{ base: '0.72rem', md: '0.82rem' }}
        fontWeight={500}
        href={href}
        key={href}
        textDecoration="none"
        whiteSpace="nowrap"
      >
        {label}
      </Link>
    ))}
  </Flex>
);
