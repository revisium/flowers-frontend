import { Box, Flex, Grid, Image, Text } from '@chakra-ui/react';
import type { SucculentLeavesStoryCopy } from '../../model/succulentLeavesStoryData';

interface SucculentStoryUpdateProps {
  readonly text: SucculentLeavesStoryCopy;
}

export const SucculentStoryUpdate = ({ text }: SucculentStoryUpdateProps) => (
  <Box
    as="section"
    background="#eef1e8"
    borderY="1px solid #d9dfd1"
    padding={{ base: '64px 18px', md: '86px 42px', xl: '104px 54px' }}
  >
    <Flex direction="column" margin="0 auto" maxWidth="1240px">
      <Grid
        alignItems="start"
        gap={{ base: '24px', md: '68px' }}
        gridTemplateColumns={{ base: '1fr', md: 'minmax(0, .82fr) minmax(0, 1.18fr)' }}
      >
        <Flex alignItems="flex-start" direction="column">
          <Text
            color="#857154"
            fontSize="0.7rem"
            fontWeight={700}
            letterSpacing="0.12em"
            textTransform="uppercase"
          >
            {text.update.eyebrow}
          </Text>
          <Text
            as="h2"
            color="#34402d"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize={{ base: '2.35rem', md: '3.15rem' }}
            fontWeight={400}
            letterSpacing="-0.04em"
            lineHeight={1.03}
            marginTop="12px"
          >
            {text.update.title}
          </Text>
        </Flex>
        <Flex color="#555c52" direction="column" fontSize="0.94rem" gap="15px" lineHeight={1.72}>
          {text.update.lead.map((paragraph) => (
            <Text key={paragraph}>{paragraph}</Text>
          ))}
        </Flex>
      </Grid>

      <Text
        as="h3"
        color="#3b4836"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize={{ base: '1.65rem', md: '2rem' }}
        fontWeight={400}
        marginTop={{ base: '58px', md: '76px' }}
      >
        {text.update.progressTitle}
      </Text>
      <Grid
        gap={{ base: '28px', md: '30px' }}
        gridTemplateColumns={{ base: '1fr', md: 'repeat(2, minmax(0, 1fr))' }}
        marginTop="25px"
      >
        {text.update.progress.map((entry) => (
          <Box
            background="#fbfaf5"
            border="1px solid #dce1d6"
            borderRadius="12px"
            overflow="hidden"
            key={entry.title}
          >
            <Box aspectRatio={{ base: '4 / 3', md: '16 / 11' }} overflow="hidden">
              <Image
                alt={entry.imageAlt}
                height="100%"
                objectFit="cover"
                src={entry.image}
                width="100%"
              />
            </Box>
            <Box padding={{ base: '21px 20px 24px', md: '24px 26px 28px' }}>
              <Text
                as="h4"
                color="#3b4736"
                fontFamily="Georgia, 'Times New Roman', serif"
                fontSize="1.35rem"
                fontWeight={400}
              >
                {entry.title}
              </Text>
              <Text color="#676d63" fontSize="0.82rem" lineHeight={1.6} marginTop="10px">
                {entry.caption}
              </Text>
            </Box>
          </Box>
        ))}
      </Grid>

      <Text
        as="h3"
        color="#3b4836"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize={{ base: '1.65rem', md: '2rem' }}
        fontWeight={400}
        marginTop={{ base: '66px', md: '86px' }}
      >
        {text.update.resultTitle}
      </Text>
      <Grid
        alignItems="start"
        gap={{ base: '30px', md: '34px' }}
        gridTemplateColumns={{ base: '1fr', lg: 'minmax(0, 1.08fr) minmax(0, .92fr)' }}
        marginTop="25px"
      >
        {text.update.compositions.map((entry, index) => (
          <Box
            background="#fffdf8"
            border="1px solid #dddcd2"
            borderRadius="12px"
            gridRow={{ lg: index === 0 ? 'span 2' : 'auto' }}
            overflow="hidden"
            key={entry.image}
          >
            <Box aspectRatio={index === 0 ? '5 / 4' : '4 / 3'} overflow="hidden">
              <Image
                alt={entry.imageAlt}
                height="100%"
                objectFit="cover"
                objectPosition={
                  index === 0 ? { base: 'center 42%', md: 'center', lg: 'center 42%' } : 'center'
                }
                src={entry.image}
                width="100%"
              />
            </Box>
            <Box padding={{ base: '20px', md: '23px 25px 26px' }}>
              <Text color="#718061" fontSize="0.69rem" fontWeight={700} letterSpacing="0.06em">
                {entry.plantName}
              </Text>
              <Text color="#62675f" fontSize="0.82rem" lineHeight={1.6} marginTop="9px">
                {entry.caption}
              </Text>
            </Box>
          </Box>
        ))}
      </Grid>
    </Flex>
  </Box>
);
