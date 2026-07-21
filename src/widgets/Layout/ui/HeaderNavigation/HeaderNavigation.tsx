import { Flex, Link } from '@chakra-ui/react';
import { useLocation } from 'react-router';
import type { Locale } from 'src/shared/config';

import { layoutNavigationLinks } from '../../model/layoutNavigation';

interface HeaderNavigationProps {
  readonly locale: Locale;
}

const isNavigationLinkActive = (href: string, pathname: string, hash: string) => {
  const [hrefPathname, hrefHash] = href.split('#');

  if (hrefHash) {
    return pathname === hrefPathname && hash === `#${hrefHash}`;
  }

  if (hrefPathname === '/') {
    return pathname === hrefPathname && hash === '';
  }

  return pathname === hrefPathname || pathname.startsWith(`${hrefPathname}/`);
};

export const HeaderNavigation = ({ locale }: HeaderNavigationProps) => {
  const { hash, pathname } = useLocation();

  return (
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
      {layoutNavigationLinks[locale].map(([label, href]) => {
        const isActive = isNavigationLinkActive(href, pathname, hash);

        return (
          <Link
            aria-current={isActive ? 'location' : undefined}
            color={isActive ? '#4f603f' : '#343a31'}
            fontSize={{ base: '0.84rem', md: '0.92rem', lg: '0.96rem' }}
            fontWeight={isActive ? 700 : 600}
            href={href}
            key={href}
            lineHeight={1.35}
            position="relative"
            textDecoration="none"
            transition="color 180ms ease"
            whiteSpace="nowrap"
            _after={{
              background: '#71815f',
              borderRadius: '999px',
              bottom: '-5px',
              content: '""',
              height: '2px',
              left: 0,
              position: 'absolute',
              transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'center',
              transition: 'transform 180ms ease',
              width: '100%',
            }}
            _focusVisible={{
              color: '#4f603f',
              outline: '2px solid rgba(113, 129, 95, 0.38)',
              outlineOffset: '5px',
            }}
            _hover={{
              color: '#4f603f',
              textDecoration: 'none',
              _after: { transform: 'scaleX(1)' },
            }}
          >
            {label}
          </Link>
        );
      })}
    </Flex>
  );
};
