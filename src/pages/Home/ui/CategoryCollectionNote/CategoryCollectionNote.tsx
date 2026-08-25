import { Flex } from '@chakra-ui/react';

import { SproutIcon } from '../SproutIcon/SproutIcon';

interface CategoryCollectionNoteProps {
  readonly children: string;
}

export const CategoryCollectionNote = ({ children }: CategoryCollectionNoteProps) => (
  <Flex
    alignItems="center"
    background="linear-gradient(90deg, rgba(235, 242, 218, 0.9), rgba(246, 248, 235, 0.96))"
    border="1px solid rgba(151, 175, 126, 0.42)"
    borderRadius="12px"
    color="#465247"
    fontSize={{ base: '0.9rem', md: '0.98rem' }}
    fontWeight={720}
    gap="12px"
    justifyContent="center"
    lineHeight={1.45}
    margin={{ base: '0 18px 22px', md: '0 34px 26px' }}
    minHeight="56px"
    padding={{ base: '14px 16px', md: '14px 24px' }}
    position="relative"
    textAlign="center"
    zIndex={2}
  >
    <SproutIcon />
    {children}
  </Flex>
);
