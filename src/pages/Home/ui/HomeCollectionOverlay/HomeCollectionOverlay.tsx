import { Box, Button, Flex, Grid, Image, Input, Text } from '@chakra-ui/react';
import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react';
import type { Locale } from 'src/shared/config';
import { PlantCollectionIcon } from 'src/shared/ui';

import { homeCategories } from '../../model/homePageData';
import { categoryDetailDataById } from '../AraceaeCategoryModal/data';

type FamilyId = keyof typeof categoryDetailDataById;

interface CatalogPlant {
  readonly categoryId: FamilyId;
  readonly categoryName: string;
  readonly id: string;
  readonly image: string;
  readonly name: string;
}

interface HomeCollectionOverlayProps {
  readonly locale: Locale;
  readonly onClose: () => void;
}

const copy = {
  en: {
    allFamilies: 'All families',
    allPlants: 'All',
    clearSearch: 'Clear search',
    close: 'Close my plants',
    empty: 'No plants matched your search.',
    plantCount: 'plants',
    searchLabel: 'Search plants',
    searchPlaceholder: 'Find a plant',
    title: 'My plants',
  },
  ru: {
    allFamilies: 'Все семейства',
    allPlants: 'Все',
    clearSearch: 'Очистить поиск',
    close: 'Закрыть каталог растений',
    empty: 'По вашему запросу растений не нашлось.',
    plantCount: 'растений',
    searchLabel: 'Поиск растения',
    searchPlaceholder: 'Найти растение',
    title: 'Мои растения',
  },
} as const;

const catalogByLocale: Record<Locale, readonly CatalogPlant[]> = {
  en: createCatalog('en'),
  ru: createCatalog('ru'),
};

const focusableSelector = 'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const HomeCollectionOverlay = ({ locale, onClose }: HomeCollectionOverlayProps) => {
  const [activeFamily, setActiveFamily] = useState<FamilyId | 'all'>('all');
  const [query, setQuery] = useState('');
  const [showAllFamilies, setShowAllFamilies] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const text = copy[locale];
  const families = homeCategories[locale];
  const normalizedQuery = query.trim().toLocaleLowerCase(locale);
  const visiblePlants = useMemo(
    () =>
      catalogByLocale[locale].filter((plant) => {
        const belongsToFamily = activeFamily === 'all' || plant.categoryId === activeFamily;
        return belongsToFamily && plant.name.toLocaleLowerCase(locale).includes(normalizedQuery);
      }),
    [activeFamily, locale, normalizedQuery],
  );

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButtonRef.current?.focus();

    return () => {
      previousFocus?.focus();
    };
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []);
    const firstElement = focusable.at(0);
    const lastElement = focusable.at(-1);

    if (!firstElement || !lastElement) {
      event.preventDefault();
    } else if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const selectFamily = (familyId: FamilyId | 'all') => {
    setActiveFamily(familyId);
    setShowAllFamilies(false);
  };

  return (
    <Flex
      alignItems={{ base: 'stretch', md: 'center' }}
      aria-labelledby="my-plants-title"
      aria-modal="true"
      background="rgba(38, 43, 31, 0.38)"
      inset={0}
      justifyContent="center"
      padding={{ base: 0, md: '22px' }}
      position="fixed"
      role="dialog"
      zIndex={80}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
    >
      <Flex
        ref={dialogRef}
        background="linear-gradient(145deg, #fffdf7 0%, #f4eddf 100%)"
        border={{ base: 0, md: '1px solid rgba(218, 204, 178, 0.9)' }}
        borderRadius={{ base: 0, md: '20px' }}
        boxShadow="0 28px 90px rgba(38, 33, 23, 0.28)"
        direction="column"
        height={{ base: '100dvh', md: 'min(850px, calc(100dvh - 44px))' }}
        maxWidth="1320px"
        overflow="hidden"
        padding={{ base: '18px', md: '28px' }}
        width="100%"
      >
        <Flex alignItems={{ base: 'stretch', lg: 'center' }} direction={{ base: 'column', lg: 'row' }} gap="14px" justifyContent="space-between">
          <Flex alignItems="baseline" gap="12px">
            <Flex alignItems="center" as="h2" color="#314034" gap="8px" id="my-plants-title" margin={0} textStyle="bold-xl">
              <PlantCollectionIcon size={28} />
              {text.title}
            </Flex>
            <Text color="#64705f" textStyle="medium-sm">
              {catalogByLocale[locale].length} {text.plantCount}
            </Text>
          </Flex>
          <Flex alignItems="center" gap="10px" width={{ base: '100%', lg: 'min(480px, 52%)' }}>
            <Box flex="1 1 auto" position="relative">
              <Input
                aria-label={text.searchLabel}
                background="rgba(255, 250, 240, 0.92)"
                border="1px solid rgba(126, 104, 69, 0.26)"
                borderRadius="999px"
                color="#314034"
                height="46px"
                padding="0 48px 0 18px"
                placeholder={text.searchPlaceholder}
                type="search"
                value={query}
                width="100%"
                _focusVisible={{ borderColor: '#6f9253', boxShadow: '0 0 0 3px rgba(111, 146, 83, 0.22)', outline: 'none' }}
                _placeholder={{ color: 'rgba(70, 84, 59, 0.58)' }}
                onChange={(event) => {
                  setQuery(event.target.value);
                }}
              />
              {query ? (
                <Button
                  aria-label={text.clearSearch}
                  borderRadius="999px"
                  color="#68715d"
                  fontSize="21px"
                  height="30px"
                  minWidth="30px"
                  padding={0}
                  position="absolute"
                  right="8px"
                  top="8px"
                  type="button"
                  variant="plain"
                  width="30px"
                  onClick={() => setQuery('')}
                  _focusVisible={{ boxShadow: '0 0 0 3px rgba(94, 127, 57, 0.22)', outline: 'none' }}
                  _hover={{ background: 'rgba(218, 204, 178, 0.38)', color: '#314034' }}
                >
                  ×
                </Button>
              ) : null}
            </Box>
            <Button
              ref={closeButtonRef}
              aria-label={text.close}
              border="1px solid rgba(82, 98, 70, 0.35)"
              borderRadius="999px"
              color="#3e513d"
              flex="0 0 auto"
              fontSize="24px"
              height="46px"
              minWidth="46px"
              padding={0}
              type="button"
              variant="plain"
              onClick={onClose}
              _focusVisible={{ boxShadow: '0 0 0 3px rgba(94, 127, 57, 0.26)', outline: 'none' }}
              _hover={{ background: 'rgba(218, 204, 178, 0.3)' }}
            >
              ×
            </Button>
          </Flex>
        </Flex>

        <Flex alignItems="center" gap="10px" marginTop="20px" minWidth={0}>
          <Flex
            gap="8px"
            minWidth={0}
            overflowX="auto"
            paddingBottom="4px"
            css={{
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            <FamilyFilter active={activeFamily === 'all'} label={text.allPlants} onClick={() => selectFamily('all')} />
            {families.map((family) => (
              <FamilyFilter active={activeFamily === family.id} key={family.id} label={family.name} onClick={() => selectFamily(family.id as FamilyId)} />
            ))}
          </Flex>
          <Button
            aria-expanded={showAllFamilies}
            background="#fffaf0"
            border="1px solid rgba(126, 104, 69, 0.26)"
            borderRadius="999px"
            color="#46543b"
            flex="0 0 auto"
            fontWeight={720}
            height="38px"
            padding="0 14px"
            type="button"
            variant="plain"
            onClick={() => setShowAllFamilies((isOpen) => !isOpen)}
            _focusVisible={{ boxShadow: '0 0 0 3px rgba(94, 127, 57, 0.22)', outline: 'none' }}
            _hover={{ background: '#f5edde' }}
          >
            {text.allFamilies} ⌄
          </Button>
        </Flex>

        {showAllFamilies ? (
          <Grid background="rgba(255, 250, 240, 0.7)" border="1px solid rgba(218, 204, 178, 0.72)" borderRadius="12px" gap="8px" gridTemplateColumns={{ base: 'repeat(2, minmax(0, 1fr))', md: 'repeat(3, minmax(0, 1fr))', lg: 'repeat(5, minmax(0, 1fr))' }} marginTop="10px" padding="10px">
            {families.map((family) => (
              <Button key={family.id} justifyContent="flex-start" padding="8px 10px" type="button" variant="plain" onClick={() => selectFamily(family.id as FamilyId)} _hover={{ background: 'rgba(220, 232, 200, 0.75)' }}>
                {family.name}
              </Button>
            ))}
          </Grid>
        ) : null}

        <Box
          flex="1 1 auto"
          marginTop="20px"
          overflowY="auto"
          paddingRight={{ base: 0, md: '6px' }}
          css={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {visiblePlants.length ? (
            <Grid gap={{ base: '12px', md: '16px' }} gridTemplateColumns={{ base: 'repeat(2, minmax(0, 1fr))', sm: 'repeat(3, minmax(0, 1fr))', lg: 'repeat(4, minmax(0, 1fr))', xl: 'repeat(5, minmax(0, 1fr))' }}>
              {visiblePlants.map((plant) => (
                <Flex background="rgba(255, 253, 247, 0.9)" border="1px solid rgba(218, 204, 178, 0.75)" borderRadius="12px" direction="column" key={plant.id} overflow="hidden">
                  <Image alt="" aspectRatio="1 / 0.82" background="#f4ede0" objectFit="cover" src={plant.image} width="100%" />
                  <Flex direction="column" gap="4px" padding="12px">
                    <Text color="#314034" fontWeight={760} lineClamp={2} lineHeight={1.2} minHeight="38px">
                      {plant.name}
                    </Text>
                    <Text color="#68715d" fontSize="0.78rem" lineClamp={1}>
                      {plant.categoryName}
                    </Text>
                  </Flex>
                </Flex>
              ))}
            </Grid>
          ) : (
            <Flex alignItems="center" color="#68715d" height="100%" justifyContent="center" textAlign="center">
              {text.empty}
            </Flex>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

interface FamilyFilterProps {
  readonly active: boolean;
  readonly label: string;
  readonly onClick: () => void;
}

const FamilyFilter = ({ active, label, onClick }: FamilyFilterProps) => (
  <Button
    aria-pressed={active}
    background={active ? '#526246' : '#fffaf0'}
    border="1px solid rgba(126, 104, 69, 0.26)"
    borderRadius="999px"
    color={active ? '#fffaf0' : '#46543b'}
    flex="0 0 auto"
    fontWeight={active ? 760 : 640}
    height="38px"
    padding="0 14px"
    type="button"
    variant="plain"
    onClick={onClick}
    _focusVisible={{ boxShadow: '0 0 0 3px rgba(94, 127, 57, 0.22)', outline: 'none' }}
    _hover={{ background: active ? '#3e513d' : '#f5edde' }}
  >
    {label}
  </Button>
);

function createCatalog(locale: Locale): readonly CatalogPlant[] {
  return homeCategories[locale].flatMap((family) => {
    const categoryId = family.id as FamilyId;
    const details = categoryDetailDataById[categoryId][locale];
    const count = Number.parseInt(family.count, 10);

    return details.collectionPlants.slice(0, count).map((plant, index) => ({
      categoryId,
      categoryName: family.name,
      id: `${categoryId}-${index}`,
      image: plant.image,
      name: plant.name,
    }));
  });
}
