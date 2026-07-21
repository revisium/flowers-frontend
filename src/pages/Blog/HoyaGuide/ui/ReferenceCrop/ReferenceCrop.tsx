import { Box } from '@chakra-ui/react';

interface ReferenceCropProps {
  readonly alt: string;
  readonly crop: readonly [number, number, number, number];
  readonly rounded?: string;
}

const SOURCE_WIDTH = 1024;
const SOURCE_HEIGHT = 1536;

export const ReferenceCrop = ({ alt, crop, rounded = '20px' }: ReferenceCropProps) => {
  const [x, y, width, height] = crop;
  const xPosition = width === SOURCE_WIDTH ? 0 : (x / (SOURCE_WIDTH - width)) * 100;
  const yPosition = height === SOURCE_HEIGHT ? 0 : (y / (SOURCE_HEIGHT - height)) * 100;

  return (
    <Box
      aria-label={alt}
      backgroundImage="url('/blog/hoya-pubicalyx-care/hoya-pubicalyx-reference.png')"
      backgroundPosition={`${xPosition}% ${yPosition}%`}
      backgroundRepeat="no-repeat"
      backgroundSize={`${(SOURCE_WIDTH / width) * 100}% auto`}
      borderRadius={rounded}
      overflow="hidden"
      role="img"
      width="100%"
      css={{ aspectRatio: `${width} / ${height}` }}
    />
  );
};
