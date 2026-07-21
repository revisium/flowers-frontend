import { Flex, Link, Text } from '@chakra-ui/react';

interface EditorialBreadcrumbsProps {
  readonly ariaLabel: string;
  readonly currentLabel?: string;
  readonly rootLabel: string;
  readonly sectionHref?: string;
  readonly sectionLabel: string;
}

export const EditorialBreadcrumbs = ({
  ariaLabel,
  currentLabel,
  rootLabel,
  sectionHref,
  sectionLabel,
}: EditorialBreadcrumbsProps) => (
  <Flex
    alignItems="center"
    aria-label={ariaLabel}
    as="nav"
    color="#62685d"
    fontSize={{ base: '0.74rem', md: '0.82rem' }}
    gap="9px"
    left={{ base: '20px', md: '42px' }}
    position="absolute"
    top={{ base: '18px', md: '22px' }}
    zIndex={2}
  >
    <Link href="/" _hover={{ color: '#34402d', textDecoration: 'underline' }}>
      {rootLabel}
    </Link>
    <Text aria-hidden="true">›</Text>
    {currentLabel && sectionHref ? (
      <>
        <Link href={sectionHref} _hover={{ color: '#34402d', textDecoration: 'underline' }}>
          {sectionLabel}
        </Link>
        <Text aria-hidden="true">›</Text>
        <Text aria-current="page" fontWeight={600}>
          {currentLabel}
        </Text>
      </>
    ) : (
      <Text aria-current="page" fontWeight={600}>
        {sectionLabel}
      </Text>
    )}
  </Flex>
);
