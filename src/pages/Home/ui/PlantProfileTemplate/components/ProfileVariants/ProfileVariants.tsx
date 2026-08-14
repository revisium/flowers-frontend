import { Box, Button, Flex, Grid, Image, Text } from '@chakra-ui/react';
import type { CollectionPlant } from 'src/entities/collection';
import type { Locale } from 'src/shared/config';

interface ProfileVariantsProps {
  readonly locale: Locale;
  readonly onImageOpen: (index: number) => void;
  readonly plant: CollectionPlant;
}

export const ProfileVariants = ({ locale, onImageOpen, plant }: ProfileVariantsProps) => {
  const variants = plant.profile.variants;

  if (!variants) {
    return null;
  }

  return (
    <Flex
      background="linear-gradient(145deg, #f3eadf 0%, #faf5ed 46%, #edf2e5 100%)"
      border="1px solid #e3d7c6"
      borderRadius="10px"
      direction="column"
      gap={{ base: '18px', md: '22px' }}
      marginTop="12px"
      overflow="hidden"
      padding={{ base: '20px 16px', md: '26px 24px' }}
    >
      <Flex direction="column" gap="7px" maxWidth="760px">
        <Text
          as="h2"
          color="#2d442f"
          fontSize={{ base: '1.45rem', md: '1.8rem' }}
          lineHeight={1.12}
          textStyle="serif"
        >
          {variants.title[locale]}
        </Text>
        <Text color="#52604d" fontSize={{ base: '0.86rem', md: '0.94rem' }} lineHeight={1.55}>
          {variants.description[locale]}
        </Text>
      </Flex>

      <Grid
        gap={{ base: '10px', md: '14px' }}
        gridTemplateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }}
      >
        {variants.items.map((variant, index) => (
          <Box
            as="figure"
            background="#fffaf3"
            border={0}
            borderRadius="9px"
            boxShadow="0 8px 22px rgba(78, 62, 42, 0.08)"
            key={variant.image}
            margin={0}
            overflow="hidden"
            position="relative"
            _after={{
              border: '1px solid rgba(190, 169, 140, 0.52)',
              borderRadius: 'inherit',
              content: '""',
              inset: 0,
              pointerEvents: 'none',
              position: 'absolute',
              zIndex: 2,
            }}
          >
            <Button
              aria-label={
                locale === 'ru'
                  ? `Открыть фотографию: ${variant.name[locale]}`
                  : `Open photo: ${variant.name[locale]}`
              }
              borderRadius={0}
              cursor="zoom-in"
              display="block"
              height="auto"
              lineHeight={0}
              minWidth={0}
              overflow="hidden"
              padding={0}
              type="button"
              variant="plain"
              width="100%"
              onClick={() => onImageOpen(index)}
              _focusVisible={{ outline: '3px solid #718d4f', outlineOffset: '-3px' }}
              _hover={{ '& img': { transform: 'scale(1.04)' } }}
            >
              <Image
                alt={variant.name[locale]}
                aspectRatio={variants.captionsEmbedded ? '3 / 4' : '4 / 5'}
                display="block"
                loading="lazy"
                objectFit="cover"
                objectPosition={variants.captionsEmbedded ? 'center bottom' : 'center'}
                src={variant.image}
                transform="scale(1.02)"
                transition="transform 180ms ease"
                width="100%"
              />
            </Button>
            {variants.captionsEmbedded ? null : (
              <Text
                as="figcaption"
                color="#3f4d3d"
                fontSize={{ base: '0.72rem', md: '0.78rem' }}
                fontWeight={700}
                lineHeight={1.3}
                minHeight={{ base: '48px', md: '52px' }}
                padding="10px 11px"
              >
                {variant.name[locale]}
              </Text>
            )}
          </Box>
        ))}
      </Grid>
    </Flex>
  );
};
