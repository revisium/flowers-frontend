import { Flex, Grid, Text } from '@chakra-ui/react';

import type { CareCopy } from '../../model/carePageData';
import { CareGuideCard } from '../CareGuideCard/CareGuideCard';

interface CareGuidesSectionProps {
  readonly text: CareCopy;
}

export const CareGuidesSection = ({ text }: CareGuidesSectionProps) => {
  return (
    <Flex
      as="section"
      background="#f2eadb"
      direction="column"
      padding={{ base: '62px 18px', md: '82px 36px', lg: '96px 46px' }}
    >
      <Flex
        align={{ base: 'flex-start', md: 'flex-end' }}
        direction={{ base: 'column', md: 'row' }}
        gap="20px"
        justify="space-between"
      >
        <Flex direction="column" maxWidth="650px">
          <Text
            color="#788368"
            fontSize="0.76rem"
            fontWeight={800}
            letterSpacing="0.14em"
            textTransform="uppercase"
          >
            {text.guidesEyebrow}
          </Text>
          <Text
            as="h2"
            color="#314034"
            fontSize={{ base: '2rem', md: '3rem' }}
            fontWeight={650}
            letterSpacing="-0.035em"
            lineHeight={1.02}
            marginTop="10px"
          >
            {text.guidesTitle}
          </Text>
        </Flex>
        <Text color="#686c62" fontSize="1rem" lineHeight={1.5} maxWidth="440px">
          {text.guidesIntro}
        </Text>
      </Flex>

      <Grid
        gap={{ base: '18px', lg: '22px' }}
        gridTemplateColumns={{
          base: '1fr',
          md: 'repeat(2, minmax(0, 1fr))',
          lg: 'repeat(3, minmax(0, 1fr))',
        }}
        marginTop={{ base: '34px', md: '46px' }}
      >
        {text.guides.map((guide, index) => (
          <CareGuideCard guide={guide} index={index} key={guide.id} />
        ))}
      </Grid>
    </Flex>
  );
};
