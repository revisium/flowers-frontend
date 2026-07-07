import { Box, Flex, Text } from '@chakra-ui/react';

import type { HomeCopy } from '../../model/homeModel';

interface RoomAmbientInfoProps {
  readonly text: HomeCopy;
}

export function RoomAmbientInfo({ text }: RoomAmbientInfoProps) {
  return (
    <>
      <Flex as="article" className="room-quote">
        <Box as="span" className="room-quote__spark" />
        <Text>{text.quote}</Text>
      </Flex>

      <Box as="article" className="room-weather" aria-label={text.weatherLabel}>
        <Text as="strong">24°</Text>
        <Text as="span">{text.sunny}</Text>
        <Text as="time">09:45</Text>
      </Box>
    </>
  );
}
