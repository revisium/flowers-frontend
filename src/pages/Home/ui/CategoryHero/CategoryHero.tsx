import { Box, Button, Text } from '@chakra-ui/react';
import { type RefObject } from 'react';

import { type CategoryDetailData } from '../CategoryDetailModal/types';

interface CategoryHeroProps {
  readonly closeButtonRef: RefObject<HTMLButtonElement | null>;
  readonly data: CategoryDetailData;
  readonly titleId: string;
  readonly onClose: () => void;
}

const getTitleFontSize = (title: string) => {
  if (title.length > 12) {
    return { base: '2.18rem', md: '3.35rem' };
  }

  if (title.length > 9) {
    return { base: '2.35rem', md: '3.85rem' };
  }

  if (title.length > 7) {
    return { base: '2.58rem', md: '4.28rem' };
  }

  return { base: '3.1rem', md: '5.25rem' };
};

export const CategoryHero = ({ closeButtonRef, data, onClose, titleId }: CategoryHeroProps) => {
  const titleFontSize = getTitleFontSize(data.title);

  return (
    <Box
      background={{
        base: 'linear-gradient(90deg, rgba(255, 253, 247, 0.97) 0%, rgba(255, 253, 247, 0.8) 62%, rgba(255, 253, 247, 0.16) 100%)',
        md: 'linear-gradient(90deg, rgba(255, 253, 247, 0.98) 0%, rgba(255, 253, 247, 0.88) 34%, rgba(255, 253, 247, 0.18) 62%, rgba(255, 253, 247, 0) 78%)',
      }}
      minHeight={{ base: '430px', md: '620px', lg: '720px' }}
      padding={{ base: '18px 18px 90px', md: '38px 48px 170px', lg: '38px 48px 220px' }}
      position="relative"
      zIndex={1}
    >
      <Button
        ref={closeButtonRef}
        alignItems="center"
        background="transparent"
        color="#75816e"
        display="inline-flex"
        fontSize={{ base: '0.88rem', md: '0.95rem' }}
        fontWeight={720}
        gap="10px"
        marginBottom={{ base: '24px', md: '48px' }}
        padding={0}
        position="relative"
        type="button"
        variant="plain"
        zIndex={1}
        _focusVisible={{
          boxShadow: '0 0 0 3px rgba(122, 143, 100, 0.28)',
          outline: 'none',
        }}
        _hover={{ color: '#314034' }}
        onClick={onClose}
      >
        <Box as="span" fontSize="20px" lineHeight={1} marginBottom="3px">
          ←
        </Box>
        {data.backLabel}
      </Button>

      <Box
        background="rgba(255, 253, 247, 0.85)"
        borderRadius="1000px"
        boxShadow="0 0 72px 58px rgba(255, 253, 247, 0.9)"
        maxWidth="100%"
        position="relative"
        w="450px"
        zIndex={1}
      >
        <Text
          as="h2"
          color="#1f3d2b"
          fontSize={titleFontSize}
          fontWeight={500}
          hyphens="none"
          id={titleId}
          lineHeight={0.92}
          margin={0}
          overflowWrap="normal"
          textStyle="serif"
          whiteSpace={{ base: 'normal', md: 'nowrap' }}
          wordBreak="normal"
        >
          {data.title}
        </Text>
        <Text
          color="#6f835d"
          fontSize={{ base: '2rem', md: '3.1rem' }}
          lineHeight={1.05}
          marginTop="6px"
          textStyle="serif"
        >
          {data.latinName}
        </Text>
        <Text
          color="#465247"
          fontSize={{ base: '1rem', md: '1.08rem' }}
          lineHeight={1.75}
          marginTop={{ base: '22px', md: '30px' }}
          maxWidth="430px"
        >
          {data.description}
        </Text>
      </Box>
    </Box>
  );
};
