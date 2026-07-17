import { Box } from '@chakra-ui/react';
import { useLayoutContext } from 'src/shared/config';
import { blogCopy } from '../../model/blogPageData';
import { BlogEntries } from '../BlogEntries/BlogEntries';
import { BlogHero } from '../BlogHero/BlogHero';

export const BlogPage = () => {
  const { locale } = useLayoutContext();
  const text = blogCopy[locale];

  return (
    <Box
      as="main"
      background="#fbf9f3"
      color="#343a31"
      paddingTop={{ base: '99px', md: '80px' }}
      width="100%"
    >
      <BlogHero locale={locale} text={text} />
      <BlogEntries text={text} />
    </Box>
  );
};
