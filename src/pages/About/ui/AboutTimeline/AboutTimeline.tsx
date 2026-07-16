import { Flex, Grid, Text } from '@chakra-ui/react';
import type { Locale } from 'src/shared/config';
import { aboutMilestones, type AboutCopy } from '../../model/aboutPageData';
import { AboutIcon } from '../AboutIcon/AboutIcon';
import { BotanicalHeading } from '../BotanicalHeading/BotanicalHeading';

interface AboutTimelineProps {
  readonly locale: Locale;
  readonly text: AboutCopy;
}

export const AboutTimeline = ({ locale, text }: AboutTimelineProps) => (
  <Flex direction="column" padding={{ base: '44px 20px 36px', md: '38px 48px 34px' }}>
    <Flex justifyContent="center">
      <BotanicalHeading id="about-history">{text.history}</BotanicalHeading>
    </Flex>
    <Grid
      aria-labelledby="about-history"
      gap={{ base: '28px', md: 0 }}
      gridTemplateColumns={{ base: '1fr', md: 'repeat(5, minmax(0, 1fr))' }}
      marginTop="24px"
      position="relative"
      _before={{
        background: '#d8cfbc',
        content: '""',
        display: { base: 'none', md: 'block' },
        height: '1px',
        left: '7%',
        position: 'absolute',
        right: '7%',
        top: '26px',
      }}
    >
      {aboutMilestones[locale].map(([icon, year, title, description], index) => (
        <Flex alignItems="center" direction="column" key={year} paddingX={{ md: '14px' }} position="relative" textAlign="center">
          <Flex alignItems="center" aria-hidden="true" background="#ecebdd" borderRadius="50%" color="#4e5e43" height="52px" justifyContent="center" position="relative" width="52px" zIndex={1}>
            <AboutIcon name={icon} size={27} />
          </Flex>
          {index < aboutMilestones[locale].length - 1 ? (
            <Flex
              aria-hidden="true"
              background="#fbf9f3"
              border="2px solid #d4c6a9"
              borderRadius="50%"
              display={{ base: 'none', md: 'block' }}
              height="10px"
              position="absolute"
              right="-5px"
              top="21px"
              width="10px"
              zIndex={2}
            />
          ) : null}
          <Text fontSize="0.82rem" marginTop="15px">{year}</Text>
          <Text fontSize="0.86rem" fontWeight={600} marginTop="5px">{title}</Text>
          <Text color="#696c64" fontSize="0.76rem" lineHeight={1.5} marginTop="9px" maxWidth="190px">{description}</Text>
        </Flex>
      ))}
    </Grid>
  </Flex>
);
