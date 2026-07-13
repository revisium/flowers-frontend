import { Flex, Image } from '@chakra-ui/react';

interface LeafMeterProps {
  readonly level: number;
}

export const LeafMeter = ({ level }: LeafMeterProps) => (
  <Flex gap="5px">
    {Array.from({ length: 6 }, (_, index) => (
      <Image
        alt=""
        height="28px"
        key={index}
        objectFit="contain"
        src={index < level ? '/plant-profile/difficulty-leaf-filled.png' : '/plant-profile/difficulty-leaf-outline.png'}
        width="25px"
      />
    ))}
  </Flex>
);
