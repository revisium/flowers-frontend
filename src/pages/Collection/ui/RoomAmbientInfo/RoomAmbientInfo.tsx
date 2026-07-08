import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { memo } from 'react';

import type { CollectionCopy } from '../../model/collectionModel';

interface RoomAmbientInfoProps {
  readonly text: CollectionCopy;
}

export const RoomAmbientInfo = memo(({ text }: RoomAmbientInfoProps) => {
  return (
    <>
      <Flex
        as="article"
        alignItems="center"
        background="rgba(55, 54, 28, 0.74)"
        borderRadius="16px"
        bottom={{ base: '92px', md: '28px' }}
        color="#fff8e9"
        gap="12px"
        left={{ base: '20px', md: '50%' }}
        maxWidth={{ base: 'none', md: '410px' }}
        padding="14px 18px"
        position="absolute"
        right={{ base: '20px', md: 'auto' }}
        transform={{ base: 'none', md: 'translateX(-50%)' }}
        width={{ base: 'auto', md: 'auto' }}
        zIndex={7}
      >
        <Box
          as="span"
          border="2px solid rgba(255, 248, 233, 0.78)"
          borderRadius="999px"
          display="inline-block"
          height="14px"
          width="14px"
        />
        <Text fontSize="0.92rem" lineHeight={1.35} margin={0}>
          {text.quote}
        </Text>
      </Flex>

      <Grid
        as="article"
        alignItems="baseline"
        aria-label={text.weatherLabel}
        background="rgba(42, 34, 17, 0.68)"
        borderRadius="16px"
        bottom={{ base: '20px', md: '24px' }}
        color="#fff8e9"
        gap="0 12px"
        gridTemplateColumns="64px 86px"
        left="auto"
        minHeight="88px"
        padding="16px 20px"
        position="absolute"
        right={{ base: '20px', md: '28px' }}
        transform="translateZ(0)"
        width="190px"
        willChange="transform"
        zIndex={7}
      >
        <Text as="strong" fontSize="1.28rem" fontWeight={700} lineHeight="32px">
          24°
        </Text>
        <Text as="span" color="rgba(255, 248, 233, 0.74)" fontSize="0.76rem" lineHeight="32px" whiteSpace="nowrap">
          {text.sunny}
        </Text>
        <Text as="time" fontSize="1.28rem" fontWeight={700} lineHeight="32px">
          09:45
        </Text>
      </Grid>
    </>
  );
});

RoomAmbientInfo.displayName = 'RoomAmbientInfo';
