import { Box, Flex, Image, Text } from '@chakra-ui/react';
import type { BlogCopy } from '../../model/blogPageData';
import { BlogExperimentCard } from '../BlogExperimentCard/BlogExperimentCard';

interface BlogEntriesProps {
  readonly text: BlogCopy;
}

export const BlogEntries = ({ text }: BlogEntriesProps) => (
  <Box as="section" padding={{ base: '48px 18px', md: '58px 34px', xl: '62px 42px' }}>
    <Flex alignItems="center" as="h2" color="#34402d" gap="12px" margin={0}>
      <Image alt="" aria-hidden="true" height="34px" src="/about/botanical-heading-sprig-v2.png" width="auto" />
      <Text as="span" fontFamily="Georgia, 'Times New Roman', serif" fontSize={{ base: '1.7rem', md: '2rem' }} fontWeight={400}>
        {text.entriesTitle}
      </Text>
    </Flex>
    <Box marginTop="32px">
      <BlogExperimentCard entry={text.entry} text={text} />
    </Box>
    <Flex
      alignItems={{ base: 'flex-start', md: 'center' }}
      background="#eeecdf"
      borderRadius="10px"
      direction={{ base: 'column', md: 'row' }}
      gap={{ base: '9px', md: '24px' }}
      justifyContent="space-between"
      marginTop="18px"
      padding={{ base: '24px 20px', md: '24px 28px' }}
    >
      <Text color="#3e4938" fontFamily="Georgia, 'Times New Roman', serif" fontSize="1.25rem">{text.futureTitle}</Text>
      <Text color="#686b62" fontSize="0.78rem" lineHeight={1.55} maxWidth="720px">{text.futureBody}</Text>
    </Flex>
  </Box>
);
