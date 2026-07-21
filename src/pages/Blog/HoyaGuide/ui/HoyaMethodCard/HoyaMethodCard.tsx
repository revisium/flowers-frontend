import { Box, Flex, Image, Text } from '@chakra-ui/react';

import type { HoyaGuideMethod } from '../../model/hoyaGuideData';
import { ReferenceCrop } from '../ReferenceCrop/ReferenceCrop';

interface HoyaMethodCardProps {
  readonly method: HoyaGuideMethod;
}

export const HoyaMethodCard = ({ method }: HoyaMethodCardProps) => {
  return (
    <Flex
      as="article"
      borderColor="rgba(127, 122, 91, .22)"
      borderStyle="solid"
      borderWidth="0 1px 1px 0"
      direction="column"
      minWidth={0}
      padding={{ base: '16px', md: '13px 15px' }}
    >
      <Flex align="center" gap="10px" minHeight="34px">
        <Flex
          align="center"
          background="#8b984e"
          borderRadius="50%"
          color="white"
          flex="0 0 33px"
          fontFamily="Georgia, serif"
          fontSize="1.4rem"
          height="33px"
          justify="center"
        >
          {method.number}
        </Flex>
        <Text
          as="h3"
          color="#46502f"
          fontSize="0.88rem"
          fontWeight={700}
          letterSpacing="0.015em"
          lineHeight={1.08}
          textTransform="uppercase"
        >
          {method.title}
        </Text>
      </Flex>
      <Box marginTop="10px">
        <ReferenceCrop alt={method.title} crop={method.crop} rounded="18px" />
      </Box>
      <Text color="#31342f" fontSize="0.77rem" lineHeight={1.35} margin="9px 5px 0">
        {method.description}
      </Text>
      <Flex
        alignItems="flex-start"
        background="#eeece3"
        borderRadius="999px"
        gap="10px"
        marginTop="auto"
        minHeight="49px"
        padding="10px 15px"
      >
        <Image
          alt=""
          aria-hidden="true"
          flex="0 0 20px"
          height="20px"
          marginTop="1px"
          src="/blog/hoya-pubicalyx-care/tip-leaf.svg"
          width="20px"
        />
        <Text color="#3d4138" fontSize="0.86rem" lineHeight={1.35}>
          <Box as="span" fontWeight={700}>
            Совет:{' '}
          </Box>
          {method.tip}
        </Text>
      </Flex>
    </Flex>
  );
};
