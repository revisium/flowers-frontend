import { Flex } from '@chakra-ui/react';
import { useLayoutContext } from 'src/shared/config';

import { HoyaGuideFooter } from '../HoyaGuideFooter/HoyaGuideFooter';
import { HoyaGuideHero } from '../HoyaGuideHero/HoyaGuideHero';
import { HoyaMethodsSection } from '../HoyaMethodsSection/HoyaMethodsSection';

export const HoyaGuidePage = () => {
  const { locale } = useLayoutContext();

  return (
    <Flex
      as="main"
      background="#f8f6ef"
      color="#31352f"
      direction="column"
      paddingBottom={{ base: '44px', md: '68px', xl: '84px' }}
      paddingTop={{ base: '99px', md: '80px' }}
      width="100%"
    >
      <Flex
        background="#f8f6ef"
        direction="column"
        gap={{ base: '48px', md: '36px' }}
        overflow="hidden"
        width="100%"
      >
        <HoyaGuideHero locale={locale} />
        <HoyaMethodsSection />
        <HoyaGuideFooter />
      </Flex>
    </Flex>
  );
};
