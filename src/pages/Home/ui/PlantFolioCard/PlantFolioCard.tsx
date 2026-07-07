import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Table,
  Text,
} from '@chakra-ui/react';
import { type KeyboardEvent, useEffect, useRef, useState } from 'react';

import type { HomeCopy } from '../../model/homeModel';
import type { PlantCardViewModel } from '../../model/plantCardViewModel';

interface PlantFolioCardProps {
  readonly plant: PlantCardViewModel;
  readonly text: HomeCopy;
  readonly onClose: () => void;
}

export function PlantFolioCard({ onClose, plant, text }: PlantFolioCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const animationFrame = window.requestAnimationFrame(() => {
      setIsOpen(true);
      closeButtonRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      previousFocusRef.current?.focus();
    };
  }, [plant.id]);

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      onClose();
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    const focusableElements = cardRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const focusable = Array.from(focusableElements ?? []).filter((element) => element.offsetParent);
    const firstElement = focusable.at(0);
    const lastElement = focusable.at(-1);

    if (!firstElement || !lastElement) {
      event.preventDefault();
      return;
    }

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  return (
    <Flex
      alignItems="center"
      aria-modal="true"
      aria-label={text.cardOpenLabel}
      background="rgba(24, 20, 12, 0.34)"
      inset={0}
      justifyContent="center"
      padding={{ base: '18px', md: '34px' }}
      position="absolute"
      role="dialog"
      tabIndex={-1}
      zIndex={30}
      onKeyDown={handleDialogKeyDown}
    >
      <Box
        ref={cardRef}
        background="linear-gradient(135deg, rgba(255, 252, 241, 0.98), rgba(247, 238, 218, 0.96))"
        border="1px solid rgba(224, 205, 170, 0.95)"
        borderRadius="20px"
        boxShadow="0 28px 80px rgba(36, 28, 12, 0.32), inset 0 0 80px rgba(210, 178, 118, 0.12)"
        maxHeight="calc(100% - 24px)"
        maxWidth="1040px"
        opacity={isOpen ? 1 : 0}
        overflow="auto"
        padding={{ base: '18px', md: '26px' }}
        position="relative"
        transform={isOpen ? 'perspective(1100px) rotateX(0deg) scaleY(1)' : 'perspective(1100px) rotateX(12deg) scaleY(0.78)'}
        transformOrigin="top center"
        transition="opacity 260ms ease, transform 360ms cubic-bezier(0.2, 0.8, 0.2, 1)"
        width="min(100%, 1040px)"
      >
        <Button
          ref={closeButtonRef}
          aria-label={text.cardCloseLabel}
          background="rgba(239, 226, 198, 0.9)"
          borderRadius="999px"
          color="#2f3d28"
          fontSize="1.2rem"
          height="40px"
          minWidth="40px"
          padding={0}
          position="absolute"
          right="18px"
          top="18px"
          type="button"
          variant="plain"
          width="40px"
          _hover={{ background: 'rgba(224, 205, 170, 0.98)' }}
          onClick={onClose}
        >
          x
        </Button>

        <Grid
          columnGap={{ base: '18px', lg: '26px' }}
          rowGap="18px"
          templateColumns={{ base: '1fr', lg: '0.85fr 1.15fr' }}
        >
          <GridItem>
            <Flex alignItems="center" gap="10px" marginBottom="14px">
              <Text
                background="#3f6436"
                borderRadius="9px"
                color="#fff9ec"
                fontSize="0.92rem"
                fontWeight={800}
                padding="5px 9px"
              >
                {plant.id.slice(0, 2).toUpperCase()}
              </Text>
              <Text color="#415339" fontSize="0.74rem" fontWeight={800} letterSpacing="0.12em" textTransform="uppercase">
                {plant.category}
              </Text>
            </Flex>

            <Box
              background="rgba(255, 249, 236, 0.78)"
              border="1px solid rgba(224, 205, 170, 0.76)"
              borderRadius="16px"
              overflow="hidden"
            >
              <Flex
                alignItems="flex-end"
                background="linear-gradient(180deg, rgba(235, 226, 202, 0.38), rgba(255, 251, 241, 0.9))"
                height={{ base: '260px', md: '340px' }}
                justifyContent="center"
                padding="22px"
              >
                <Image alt={plant.name} draggable={false} maxHeight="100%" objectFit="contain" src={plant.image} />
              </Flex>
              <Box padding="16px">
                <Text color="#2f3d28" fontSize="0.96rem">
                  {plant.description}
                </Text>
              </Box>
            </Box>
          </GridItem>

          <GridItem paddingRight={{ base: 0, md: '36px' }}>
            <Text
              as="h2"
              color="#173f24"
              fontFamily="Georgia, serif"
              fontSize={{ base: '2.1rem', md: '3rem' }}
              fontWeight={600}
              lineHeight={1.05}
              marginBottom="4px"
            >
              {plant.name}
            </Text>
            <Text
              color="#647250"
              fontFamily="Georgia, serif"
              fontSize={{ base: '1.2rem', md: '1.6rem' }}
              fontStyle="italic"
              marginBottom="18px"
            >
              {plant.latinName}
            </Text>

            <Grid gap="10px" marginBottom="18px" templateColumns={{ base: '1fr', sm: 'repeat(3, 1fr)' }}>
              <FactBox label={text.cardCategoryLabel} value={plant.category} />
              <FactBox label={text.cardOriginLabel} value={plant.origin} />
              <FactBox label={text.cardDifficultyLabel} value={`${plant.difficulty}/5`} />
            </Grid>

            <Grid gap="10px" templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}>
              {plant.care.map((section) => (
                <Box
                  background="rgba(255, 252, 244, 0.68)"
                  border="1px solid rgba(224, 205, 170, 0.72)"
                  borderRadius="14px"
                  key={section.title}
                  padding="14px"
                >
                  <Text color="#27482d" fontSize="0.84rem" fontWeight={800} letterSpacing="0.08em" marginBottom="8px" textTransform="uppercase">
                    {section.title}
                  </Text>
                  <Text color="#2f3d28" fontSize="0.92rem" lineHeight={1.5}>
                    {section.body}
                  </Text>
                </Box>
              ))}
            </Grid>
          </GridItem>

          <GridItem colSpan={{ base: 1, lg: 2 }}>
            <Grid gap="12px" templateColumns={{ base: '1fr', lg: '1.2fr 0.8fr' }}>
              <Box
                background="rgba(255, 252, 244, 0.68)"
                border="1px solid rgba(224, 205, 170, 0.72)"
                borderRadius="14px"
                overflow="hidden"
                padding="14px"
              >
                <Text color="#27482d" fontSize="0.84rem" fontWeight={800} letterSpacing="0.08em" marginBottom="8px" textTransform="uppercase">
                  {text.cardProblemsTitle}
                </Text>
                <Table.Root size="sm">
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeader>{text.cardProblemColumn}</Table.ColumnHeader>
                      <Table.ColumnHeader>{text.cardReasonColumn}</Table.ColumnHeader>
                      <Table.ColumnHeader>{text.cardSolutionColumn}</Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {plant.problems.map((row) => (
                      <Table.Row key={`${row.problem}-${row.reason}`}>
                        <Table.Cell>{row.problem}</Table.Cell>
                        <Table.Cell>{row.reason}</Table.Cell>
                        <Table.Cell>{row.solution}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </Box>

              <Box
                background="rgba(255, 252, 244, 0.68)"
                border="1px solid rgba(224, 205, 170, 0.72)"
                borderRadius="14px"
                padding="14px"
              >
                <Text color="#27482d" fontSize="0.84rem" fontWeight={800} letterSpacing="0.08em" marginBottom="8px" textTransform="uppercase">
                  {text.cardFactsTitle}
                </Text>
                {plant.facts.map((fact) => (
                  <Flex alignItems="flex-start" gap="9px" key={fact} marginTop="10px">
                    <Box background="#8a9a72" borderRadius="999px" flexShrink={0} height="7px" marginTop="8px" width="7px" />
                    <Text color="#2f3d28" fontSize="0.92rem" lineHeight={1.5}>
                      {fact}
                    </Text>
                  </Flex>
                ))}
              </Box>
            </Grid>
          </GridItem>
        </Grid>
      </Box>
    </Flex>
  );
}

function FactBox({ label, value }: { readonly label: string; readonly value: string }) {
  return (
    <Box
      background="rgba(239, 226, 198, 0.58)"
      border="1px solid rgba(224, 205, 170, 0.72)"
      borderRadius="13px"
      padding="12px"
    >
      <Text color="#7f7968" fontSize="0.72rem" fontWeight={800} letterSpacing="0.08em" marginBottom="5px" textTransform="uppercase">
        {label}
      </Text>
      <Text color="#2f3d28" fontSize="0.95rem" fontWeight={800} lineHeight={1.25}>
        {value}
      </Text>
    </Box>
  );
}
