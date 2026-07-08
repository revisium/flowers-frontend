import { Grid, Image, Link, Text } from '@chakra-ui/react';

import { NoteLeafIcon } from '../NoteLeafIcon/NoteLeafIcon';

export const HomeNote = () => {
  return (
    <Grid
      alignItems="center"
      background="linear-gradient(90deg, rgba(204, 220, 174, 0.78), rgba(245, 238, 223, 0.82)), url('/plant-card-texture.jpg')"
      backgroundPosition="center"
      backgroundSize="cover"
      borderRadius="8px"
      gap="18px"
      gridTemplateColumns={{ base: '34px 1fr', md: '44px 1fr max-content 84px' }}
      margin={{ base: '28px 0 0', md: '28px clamp(0px, 4vw, 76px) 0' }}
      minHeight="86px"
      overflow="hidden"
      padding="16px 18px 16px 26px"
    >
      <NoteLeafIcon />
      <Text color="#394438" lineHeight={1.55} margin={0}>
        Каждое растение - это маленькая история.
        <br />
        Продолжайте заботиться, наблюдать и наслаждаться!
      </Text>
      <Link background="rgba(255, 248, 239, 0.84)" borderRadius="8px" color="#6c634d" display={{ base: 'none', md: 'block' }} fontWeight={760} href="/collection" padding="14px 24px" whiteSpace="nowrap">
        Мои заметки
      </Link>
      <Image alignSelf="end" alt="" display={{ base: 'none', md: 'block' }} height="92px" marginBottom="-22px" objectFit="contain" src="/plants/chlorophytum.png" width="92px" />
    </Grid>
  );
};
