import { Flex, Image, Text } from '@chakra-ui/react';

import { hoyaRecommendations } from '../../model/hoyaGuideData';

const recommendationIcons = [
  '/blog/hoya-pubicalyx-care/recommendation-light-icon.png',
  '/blog/hoya-pubicalyx-care/recommendation-water-icon.png',
  '/blog/hoya-pubicalyx-care/recommendation-feed-icon.png',
  '/blog/hoya-pubicalyx-care/recommendation-support-icon.png',
  '/blog/hoya-pubicalyx-care/recommendation-stability-icon.png',
] as const;

export const HoyaRecommendationsPanel = () => {
  return (
    <Flex
      background="#788650"
      borderRadius="24px"
      color="white"
      direction="column"
      height="100%"
      padding={{ base: '25px 22px', md: '28px 26px' }}
    >
      <Text
        as="h2"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize={{ base: '1.05rem', md: '1.15rem' }}
        fontWeight={400}
        lineHeight={1.2}
        textTransform="uppercase"
      >
        Дополнительные рекомендации
      </Text>

      <Flex direction="column" gap={{ base: '12px', md: '14px' }} marginTop="20px">
        {hoyaRecommendations.map((recommendation, index) => {
          const icon = recommendationIcons[index];

          if (!icon) return null;

          return (
            <Flex alignItems="center" gap="12px" key={recommendation}>
              <Image
                alt=""
                aria-hidden="true"
                flex="0 0 48px"
                height="48px"
                src={icon}
                width="48px"
              />
              <Text fontSize={{ base: '0.9rem', md: '0.95rem' }} lineHeight={1.35}>
                {recommendation}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};
