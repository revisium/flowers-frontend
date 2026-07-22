import { Box, Flex, Image, Text } from '@chakra-ui/react';
import type { Locale } from 'src/shared/config';
import type { GloxiniaStoryCopy } from '../../model/gloxiniaStoryData';

interface GloxiniaClosingProps {
  readonly locale: Locale;
  readonly text: GloxiniaStoryCopy;
}

export const GloxiniaClosing = ({ locale, text }: GloxiniaClosingProps) => {
  const breakAfter = locale === 'ru' ? 'всходов,' : 'seedlings,';
  const breakIndex = text.quote.indexOf(breakAfter);
  const quoteStart =
    breakIndex >= 0 ? text.quote.slice(0, breakIndex + breakAfter.length) : text.quote;
  const quoteEnd =
    breakIndex >= 0 ? text.quote.slice(breakIndex + breakAfter.length).trimStart() : '';

  return (
    <Box padding={{ base: '0 18px 22px', md: '0 34px 34px', xl: '0 40px 42px' }}>
      <Flex
        alignItems="center"
        as="section"
        backgroundImage="url('/blog/gloxinia-story/closing-banner.webp')"
        backgroundPosition="center"
        backgroundSize="cover"
        borderRadius="12px"
        justifyContent="center"
        h={{ base: '230px', md: '310px', xl: '420px' }}
        minHeight={{ base: '230px', md: '210px' }}
        overflow="hidden"
        padding={{ base: '34px 26px', md: '34px 70px' }}
        position="relative"
        textAlign="center"
      >
        <Box
          aria-hidden="true"
          background="linear-gradient(90deg, rgba(249,247,238,.18), rgba(249,247,238,.9) 28%, rgba(249,247,238,.92) 72%, rgba(249,247,238,.18))"
          inset={0}
          position="absolute"
        />
        <Flex
          alignItems="center"
          direction="column"
          maxWidth="900px"
          position="relative"
          pt={{ base: '30px', md: '0' }}
          zIndex={1}
        >
          <Text
            color="#384431"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize={{ base: '1.18rem', md: '1.52rem' }}
            lineHeight={1.4}
          >
            «{quoteStart}
            <Box as="br" display={{ base: 'none', lg: 'initial' }} />
            {quoteEnd ? ` ${quoteEnd}` : ''}»
          </Text>
          {locale === 'ru' ? (
            <Image
              alt=""
              aria-hidden="true"
              height="auto"
              marginTop={{ base: '14px', md: '10px' }}
              src="/blog/gloxinia-story/story-continues-signature.webp"
              width={{ base: '280px', md: '390px' }}
            />
          ) : (
            <Text
              color="#6a755f"
              fontFamily="Georgia, 'Times New Roman', serif"
              fontSize="1.15rem"
              fontStyle="italic"
              marginTop="18px"
            >
              ♡ The story continues…
            </Text>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};
