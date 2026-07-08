import { Button, Grid, Input, Link } from '@chakra-ui/react';
import { GreenhouseLogo } from 'src/widgets/GreenhouseLogo';

import { homeTotalPlantsCount } from '../../model/homePageData';
import { BellIcon } from '../BellIcon/BellIcon';
import { SearchIcon } from '../SearchIcon/SearchIcon';

export function HomeHeader() {
  return (
    <Grid
      as="header"
      alignItems="center"
      gap="12px"
      gridTemplateColumns={{ base: '1fr max-content', md: 'max-content max-content 1fr', xl: 'max-content max-content minmax(260px, 1fr) 52px' }}
      position="relative"
      zIndex={2}
    >
      <GreenhouseLogo tone="dark" />

      <Link
        background="rgba(255, 248, 235, 0.74)"
        border="1px solid rgba(125, 104, 72, 0.18)"
        borderRadius="999px"
        color="#7a6548"
        fontSize={{ base: '0.9rem', sm: '1rem' }}
        fontWeight={720}
        href="/collection"
        justifySelf={{ base: 'end', md: 'auto' }}
        padding={{ base: '9px 12px', sm: '10px 16px' }}
        whiteSpace="nowrap"
      >
        Коллекция · {homeTotalPlantsCount}
      </Link>

      <Grid
        alignItems="center"
        background="rgba(255, 255, 255, 0.78)"
        border="1px solid rgba(128, 111, 83, 0.14)"
        borderRadius="8px"
        gap="10px"
        gridColumn={{ base: '1 / -1', md: 'auto' }}
        gridTemplateColumns="18px 1fr"
        justifySelf={{ base: 'stretch', xl: 'end' }}
        maxWidth={{ base: 'none', xl: '520px' }}
        padding="0 16px"
        width="100%"
      >
        <SearchIcon />
        <Input
          aria-label="Поиск по названию растения"
          background="transparent"
          border={0}
          boxShadow="none"
          color="#46513c"
          minHeight="52px"
          outline={0}
          padding={0}
          placeholder="Поиск по названию растения..."
          _focusVisible={{ boxShadow: '0 0 0 2px #6c923e' }}
          _placeholder={{ color: '#776f63' }}
        />
      </Grid>

      <Button
        aria-label="Уведомления"
        background="rgba(255, 255, 255, 0.72)"
        borderRadius="8px"
        display={{ base: 'none', xl: 'inline-flex' }}
        height="52px"
        minWidth="52px"
        type="button"
        variant="plain"
        width="52px"
      >
        <BellIcon />
      </Button>
    </Grid>
  );
}
