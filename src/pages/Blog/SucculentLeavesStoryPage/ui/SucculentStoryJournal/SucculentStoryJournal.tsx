import { Box, Flex, Grid, Image, Text } from '@chakra-ui/react';
import type { Locale } from 'src/shared/config';
import type { SucculentLeavesStoryCopy } from '../../model/succulentLeavesStoryData';

interface SucculentStoryJournalProps {
  readonly locale: Locale;
  readonly text: SucculentLeavesStoryCopy;
}

export const SucculentStoryJournal = ({ locale, text }: SucculentStoryJournalProps) => (
  <Flex direction="column" gap={{ base: '72px', md: '96px', xl: '120px' }}>
    <Grid
      alignItems="start"
      gap={{ base: '30px', md: '64px' }}
      gridTemplateColumns={{ base: '1fr', md: 'minmax(0, .8fr) minmax(0, 1.2fr)' }}
      margin="0 auto"
      maxWidth="1180px"
      paddingX={{ base: '22px', md: '42px' }}
      width="100%"
    >
      <Flex alignItems="center" gap="11px">
        <Image
          alt=""
          aria-hidden="true"
          height="34px"
          src="/about/botanical-heading-sprig-v2.png"
          width="auto"
        />
        <Text
          as="h2"
          color="#34402d"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize={{ base: '1.85rem', md: '2.25rem' }}
          fontWeight={400}
          lineHeight={1.12}
          margin={0}
        >
          {text.introTitle}
        </Text>
      </Flex>
      <Flex color="#545a51" direction="column" fontSize="0.96rem" gap="16px" lineHeight={1.75}>
        {text.intro.map((paragraph) => (
          <Text key={paragraph}>{paragraph}</Text>
        ))}
      </Flex>
    </Grid>

    <Grid
      background="#e9eee3"
      borderY="1px solid #d6dece"
      gap={{ base: '22px', md: '0' }}
      gridTemplateColumns={{ base: '1fr', md: 'repeat(3, minmax(0, 1fr))' }}
      padding={{ base: '30px 24px', md: '34px 42px' }}
    >
      {text.stats.map(([value, label], index) => (
        <Flex
          alignItems="center"
          borderLeft={{ base: '0', md: index === 0 ? '0' : '1px solid #cbd4c2' }}
          direction="column"
          key={label}
          textAlign="center"
        >
          <Text
            color="#374632"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize={{ base: '1.65rem', md: '1.9rem' }}
          >
            {value}
          </Text>
          <Text color="#73796d" fontSize="0.74rem" marginTop="4px">
            {label}
          </Text>
        </Flex>
      ))}
    </Grid>

    <Flex
      direction="column"
      gap={{ base: '72px', md: '110px' }}
      margin="0 auto"
      maxWidth="1280px"
      paddingX={{ base: '18px', md: '42px' }}
      width="100%"
    >
      {text.journal.map((entry, index) => (
        <Grid
          alignItems="center"
          gap={{ base: '28px', md: '56px', xl: '76px' }}
          gridTemplateColumns={{ base: '1fr', md: 'minmax(0, 1.08fr) minmax(320px, .92fr)' }}
          key={entry.title}
        >
          <Box gridColumn={{ md: index % 2 === 0 ? '1' : '2' }} gridRow={{ md: '1' }}>
            <Box
              aspectRatio={index === 1 ? '3 / 4' : '3 / 2'}
              borderRadius="12px"
              boxShadow="0 18px 45px rgba(55, 62, 49, .10)"
              overflow="hidden"
            >
              <Image
                alt={entry.imageAlt}
                height="100%"
                objectFit="cover"
                objectPosition="center"
                src={entry.image}
                width="100%"
              />
            </Box>
            <Text color="#8a877c" fontSize="0.68rem" marginTop="10px" paddingX="3px">
              {entry.label}
            </Text>
          </Box>
          <Flex
            alignItems="flex-start"
            direction="column"
            gridColumn={{ md: index % 2 === 0 ? '2' : '1' }}
            gridRow={{ md: '1' }}
          >
            <Text
              color="#8b7558"
              fontSize="0.7rem"
              fontWeight={700}
              letterSpacing="0.11em"
              textTransform="uppercase"
            >
              {locale === 'ru' ? `Этап ${index + 1}` : `Stage ${index + 1}`}
            </Text>
            <Text
              as="h2"
              color="#34402d"
              fontFamily="Georgia, 'Times New Roman', serif"
              fontSize={{ base: '2rem', md: '2.55rem' }}
              fontWeight={400}
              letterSpacing="-0.03em"
              lineHeight={1.08}
              marginTop="11px"
            >
              {entry.title}
            </Text>
            <Flex
              color="#575d53"
              direction="column"
              fontSize="0.92rem"
              gap="15px"
              lineHeight={1.72}
              marginTop="22px"
            >
              {entry.body.map((paragraph) => (
                <Text key={paragraph}>{paragraph}</Text>
              ))}
            </Flex>
            {entry.note ? (
              <Box
                background="#f0eee5"
                borderLeft="3px solid #93a77f"
                borderRadius="0 8px 8px 0"
                marginTop="25px"
                padding="15px 18px"
              >
                <Text color="#62685d" fontSize="0.8rem" lineHeight={1.55}>
                  {entry.note}
                </Text>
              </Box>
            ) : null}
          </Flex>
        </Grid>
      ))}
    </Flex>

    <Box
      margin="0 auto"
      maxWidth="840px"
      paddingX={{ base: '24px', md: '42px' }}
      textAlign="center"
    >
      <Text
        color="#42503c"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize={{ base: '1.55rem', md: '2.05rem' }}
        fontStyle="italic"
        lineHeight={1.42}
      >
        «{text.quote}»
      </Text>
    </Box>
  </Flex>
);
