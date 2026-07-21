import { Box, Flex, Image, Text } from '@chakra-ui/react';
import type { BlogCopy } from '../../model/blogPageData';
import { BlogExperimentCard } from '../BlogExperimentCard/BlogExperimentCard';

interface BlogEntriesProps {
  readonly text: BlogCopy;
}

export const BlogEntries = ({ text }: BlogEntriesProps) => (
  <Box
    as="section"
    padding={{ base: '48px 18px 54px', md: '58px 34px 66px', xl: '62px 42px 72px' }}
  >
    <Flex alignItems="center" as="h2" color="#34402d" gap="12px" margin={0}>
      <Image
        alt=""
        aria-hidden="true"
        height="34px"
        src="/about/botanical-heading-sprig-v2.png"
        width="auto"
      />
      <Text
        as="span"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize={{ base: '1.7rem', md: '2rem' }}
        fontWeight={400}
      >
        {text.entriesTitle}
      </Text>
    </Flex>
    <Flex direction="column" gap={{ base: '28px', md: '36px' }} marginTop="32px">
      {text.entries.map((entry) => (
        <BlogExperimentCard entry={entry} key={entry.href} text={text} />
      ))}
    </Flex>
  </Box>
);
