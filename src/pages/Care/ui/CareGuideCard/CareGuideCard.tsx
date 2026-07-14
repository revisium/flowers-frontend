import { Box, Flex, Image, List, Text } from '@chakra-ui/react';

import type { CareGuide } from '../../model/carePageData';

interface CareGuideCardProps {
  readonly guide: CareGuide;
  readonly index: number;
}

export const CareGuideCard = ({ guide, index }: CareGuideCardProps) => {
  return (
    <Flex
      as="article"
      background="#fbf7ee"
      border="1px solid rgba(104, 91, 67, 0.13)"
      borderRadius="16px"
      boxShadow="0 16px 42px rgba(76, 61, 40, 0.07)"
      direction="column"
      id={guide.id}
      minWidth={0}
      overflow="hidden"
      scrollMarginTop="110px"
    >
      <Box
        height={{ base: '240px', md: '260px', lg: '300px' }}
        overflow="hidden"
        position="relative"
      >
        <Image
          alt=""
          height="100%"
          objectFit="cover"
          objectPosition={guide.imagePosition ?? 'center'}
          src={guide.image}
          transition="transform 500ms ease"
          width="100%"
          _groupHover={{ transform: 'scale(1.02)' }}
        />
        <Flex
          align="center"
          background="rgba(255,250,240,.9)"
          borderRadius="999px"
          color="#3e493b"
          fontSize="0.8rem"
          fontWeight={800}
          height="38px"
          justify="center"
          left="16px"
          position="absolute"
          top="16px"
          width="38px"
        >
          0{index + 1}
        </Flex>
      </Box>
      <Flex direction="column" flex="1" padding={{ base: '22px', md: '26px' }}>
        <Text
          color={guide.accent}
          fontSize="0.74rem"
          fontWeight={800}
          letterSpacing="0.12em"
          textTransform="uppercase"
        >
          {guide.eyebrow}
        </Text>
        <Text
          as="h3"
          color="#314034"
          fontSize={{ base: '1.45rem', md: '1.65rem' }}
          fontWeight={700}
          lineHeight={1.08}
          marginTop="10px"
        >
          {guide.title}
        </Text>
        <Text color="#64695f" fontSize="0.98rem" lineHeight={1.5} marginTop="12px">
          {guide.summary}
        </Text>
        <List.Root gap="9px" listStyle="none" marginTop="22px">
          {guide.tips.map((tip) => (
            <List.Item
              alignItems="flex-start"
              color="#4c584a"
              display="flex"
              fontSize="0.92rem"
              gap="10px"
              key={tip}
              lineHeight={1.35}
            >
              <Box
                background={guide.accent}
                borderRadius="50%"
                flex="0 0 auto"
                height="6px"
                marginTop="7px"
                width="6px"
              />
              {tip}
            </List.Item>
          ))}
        </List.Root>
      </Flex>
    </Flex>
  );
};
