import { Box, Button, Text } from '@chakra-ui/react';
import { type RefObject } from 'react';

import { type CategoryDetailData } from './types';

interface CategoryHeroProps {
  readonly closeButtonRef: RefObject<HTMLButtonElement | null>;
  readonly data: CategoryDetailData;
  readonly titleId: string;
  readonly onClose: () => void;
}

export const CategoryHero = ({ closeButtonRef, data, onClose, titleId }: CategoryHeroProps) => (
  <Box
    backgroundImage={`url('${data.heroImage}')`}
    backgroundPosition={data.heroPosition ?? 'top right'}
    backgroundRepeat="no-repeat"
    backgroundSize={data.heroSize ?? { base: '540px auto', md: '650px auto', lg: '700px auto' }}
    minHeight={{ base: '340px', md: '410px', lg: '497px' }}
    overflow="hidden"
    padding={{ base: '18px 18px 22px', md: '38px 48px 18px' }}
    position="relative"
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
      <Box as="span" fontSize="20px" lineHeight={1}>
        ←
      </Box>
      {data.backLabel}
    </Button>

    <Box
      background="rgba(255, 253, 247, 0.55)"
      borderRadius="1000px"
      boxShadow="0 0 72px 58px rgba(255, 253, 247, 0.6)"
      position="relative"
      w="450px"
      zIndex={1}
    >
      <Text
        as="h2"
        color="#1f3d2b"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize={{ base: '3.1rem', md: '5.25rem' }}
        fontWeight={500}
        id={titleId}
        lineHeight={0.92}
        margin={0}
      >
        {data.title}
      </Text>
      <Text
        color="#6f835d"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize={{ base: '2rem', md: '3.1rem' }}
        lineHeight={1.05}
        marginTop="6px"
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
