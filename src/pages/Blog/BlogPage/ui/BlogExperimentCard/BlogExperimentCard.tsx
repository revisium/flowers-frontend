import { Button, Flex, Grid, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import type { BlogCopy, BlogEntry } from '../../model/blogPageData';

interface BlogExperimentCardProps {
  readonly entry: BlogEntry;
  readonly text: BlogCopy;
}

export const BlogExperimentCard = ({ entry, text }: BlogExperimentCardProps) => {
  const navigate = useNavigate();

  return (
    <Grid
      background="#fffdf8"
      border="1px solid #ded8ca"
      borderRadius="12px"
      gridTemplateColumns={{ base: '1fr', lg: 'minmax(360px, .96fr) minmax(0, 1.04fr)' }}
      overflow="hidden"
    >
      <Image alt={entry.imageAlt} height="100%" minHeight={{ base: '320px', lg: '455px' }} objectFit="cover" src={entry.image} width="100%" />
      <Flex alignItems="flex-start" direction="column" justifyContent="center" padding={{ base: '30px 22px', md: '38px', xl: '42px' }}>
        <Text color="#7a806f" fontSize="0.72rem" fontWeight={700} letterSpacing="0.04em" textTransform="uppercase">
          {entry.date}
        </Text>
        <Text
          as="h3"
          color="#34402d"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize={{ base: '1.85rem', md: '2.35rem' }}
          fontWeight={400}
          letterSpacing="-0.03em"
          lineHeight={1.08}
          marginTop="14px"
        >
          {entry.title}
        </Text>
        <Text color="#5f625b" fontSize="0.86rem" lineHeight={1.65} marginTop="20px" maxWidth="570px">{entry.excerpt}</Text>
        <Grid gap="14px" gridTemplateColumns="repeat(3, minmax(0, 1fr))" marginTop="28px" width="100%">
          {entry.stats.map(([value, label], index) => (
            <Flex borderLeft={index === 0 ? '0' : '1px solid #e3ddcf'} direction="column" key={label} paddingLeft={index === 0 ? 0 : '16px'}>
              <Text color="#3d4937" fontFamily="Georgia, 'Times New Roman', serif" fontSize="1.25rem">{value}</Text>
              <Text color="#77786f" fontSize="0.67rem" lineHeight={1.35} marginTop="4px">{label}</Text>
            </Flex>
          ))}
        </Grid>
        <Button
          background="#42583a"
          borderRadius="999px"
          color="white"
          fontSize="0.78rem"
          height="40px"
          marginTop="30px"
          onClick={() => navigate('/blog/gloxinia-story')}
          paddingX="20px"
          _hover={{ background: '#34482e' }}
        >
          {text.readLabel} →
        </Button>
      </Flex>
    </Grid>
  );
};
