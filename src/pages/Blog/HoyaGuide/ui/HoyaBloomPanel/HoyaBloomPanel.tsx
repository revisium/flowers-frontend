import { Box, Flex, Grid, Image, Text } from '@chakra-ui/react';

const bloomImages = [
  {
    alt: 'Бордовое шаровидное соцветие хойи пубикаликс',
    src: '/blog/hoya-pubicalyx-care/hoya-bloom-burgundy.webp',
  },
  {
    alt: 'Молочно-белое шаровидное соцветие хойи пубикаликс',
    src: '/blog/hoya-pubicalyx-care/hoya-bloom-ivory.webp',
  },
  {
    alt: 'Нежно-розовое шаровидное соцветие хойи пубикаликс',
    src: '/blog/hoya-pubicalyx-care/hoya-bloom-pink.webp',
  },
] as const;

export const HoyaBloomPanel = () => {
  return (
    <Flex
      border="1px solid rgba(127, 122, 91, .34)"
      borderRadius="24px"
      direction="column"
      height="100%"
      padding={{ base: '23px 18px', md: '27px 25px' }}
    >
      <Flex alignItems="center" gap="14px">
        <Box background="rgba(127, 122, 91, .32)" height="1px" flex="1" />
        <Text
          as="h2"
          color="#76814f"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize={{ base: '1.05rem', md: '1.18rem' }}
          fontWeight={400}
          lineHeight={1.2}
          textAlign="center"
          textTransform="uppercase"
        >
          Цветение хойи пубикаликс
        </Text>
        <Box background="rgba(127, 122, 91, .32)" height="1px" flex="1" />
      </Flex>

      <Grid
        gap={{ base: '10px', md: '18px' }}
        gridTemplateColumns="repeat(3, minmax(0, 1fr))"
        marginTop="20px"
      >
        {bloomImages.map((image) => (
          <Image
            alt={image.alt}
            aspectRatio="1"
            border="7px solid #fffdf7"
            borderRadius="50%"
            boxShadow="0 8px 22px rgba(82, 76, 55, .12)"
            key={image.src}
            objectFit="cover"
            src={image.src}
            width="100%"
          />
        ))}
      </Grid>

      <Text
        color="#4b4e43"
        fontSize={{ base: '0.88rem', md: '0.96rem' }}
        lineHeight={1.45}
        marginTop="19px"
        textAlign="center"
      >
        Правильный уход и стабильные условия — залог ароматного и пышного цветения!
      </Text>
      <Flex alignItems="center" gap="12px" marginTop="auto" paddingTop="13px">
        <Box background="rgba(127, 122, 91, .32)" height="1px" flex="1" />
        <Text aria-hidden="true" color="#76814f" fontSize="1.45rem" lineHeight={1}>
          ♡
        </Text>
        <Box background="rgba(127, 122, 91, .32)" height="1px" flex="1" />
      </Flex>
    </Flex>
  );
};
