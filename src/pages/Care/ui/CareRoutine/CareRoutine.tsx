import { Box, Flex, Grid, Text } from '@chakra-ui/react';

import type { CareCopy } from '../../model/carePageData';

interface CareRoutineProps {
  readonly text: CareCopy;
}

export const CareRoutine = ({ text }: CareRoutineProps) => {
  return (
    <Grid
      as="section"
      background="#dce3cc"
      gap={{ base: '34px', lg: '72px' }}
      gridTemplateColumns={{ base: '1fr', lg: 'minmax(0, 1.35fr) minmax(320px, .65fr)' }}
      padding={{ base: '58px 18px 70px', md: '78px 36px 90px', lg: '88px 46px 100px' }}
    >
      <Flex direction="column">
        <Text
          color="#667451"
          fontSize="0.76rem"
          fontWeight={800}
          letterSpacing="0.14em"
          textTransform="uppercase"
        >
          {text.routine.eyebrow}
        </Text>
        <Text
          as="h2"
          color="#2e3c2d"
          fontSize={{ base: '2rem', md: '2.8rem' }}
          fontWeight={650}
          letterSpacing="-0.035em"
          lineHeight={1.02}
          marginTop="10px"
        >
          {text.routine.title}
        </Text>
        <Grid gap="0" marginTop={{ base: '28px', md: '38px' }}>
          {text.routine.items.map((item) => (
            <Grid
              borderTop="1px solid rgba(55,74,48,.2)"
              gap={{ base: '16px', md: '28px' }}
              gridTemplateColumns="42px minmax(0, 1fr)"
              key={item.label}
              padding={{ base: '18px 0', md: '22px 0' }}
            >
              <Text color="#81906d" fontSize="0.82rem" fontWeight={800}>
                {item.label}
              </Text>
              <Text color="#3e493b" fontSize={{ base: '1rem', md: '1.08rem' }} lineHeight={1.4}>
                {item.text}
              </Text>
            </Grid>
          ))}
        </Grid>
      </Flex>

      <Flex
        alignSelf={{ base: 'stretch', lg: 'end' }}
        background="#536047"
        borderRadius="18px"
        boxShadow="0 18px 42px rgba(48, 61, 41, .14)"
        color="#fffaf0"
        direction="column"
        minHeight={{ base: '320px', lg: '430px' }}
        overflow="hidden"
        padding={{ base: '26px', md: '34px' }}
        position="relative"
      >
        <Box
          border="1px solid rgba(255,250,240,.22)"
          borderRadius="50%"
          height="230px"
          position="absolute"
          right="-94px"
          top="-70px"
          width="230px"
        />
        <Box
          border="1px solid rgba(255,250,240,.12)"
          borderRadius="50%"
          height="150px"
          position="absolute"
          right="-44px"
          top="-30px"
          width="150px"
        />
        <Text
          color="#cdd8b9"
          fontSize="0.74rem"
          fontWeight={800}
          letterSpacing="0.13em"
          position="relative"
          textTransform="uppercase"
        >
          {text.season.eyebrow}
        </Text>
        <Text
          as="h3"
          fontSize={{ base: '1.8rem', md: '2.2rem' }}
          fontWeight={650}
          letterSpacing="-0.025em"
          lineHeight={1.05}
          marginTop="auto"
          position="relative"
        >
          {text.season.title}
        </Text>
        <Text
          color="rgba(255,250,240,.78)"
          fontSize="0.98rem"
          lineHeight={1.55}
          marginTop="18px"
          position="relative"
        >
          {text.season.text}
        </Text>
        <Text
          aria-hidden="true"
          color="#b8c89e"
          fontSize="3.4rem"
          lineHeight={1}
          marginTop="26px"
          position="relative"
        >
          ❧
        </Text>
      </Flex>
    </Grid>
  );
};
