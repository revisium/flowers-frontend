import { Flex } from '@chakra-ui/react';
import { useLayoutContext } from 'src/shared/config';

import { homeCopy } from '../../model/homePageData';
import { HomeCategoriesSection } from '../HomeCategoriesSection/HomeCategoriesSection';
import { HomeHero } from '../HomeHero/HomeHero';

export const HomePage = () => {
  const { locale } = useLayoutContext();

  return (
    <Flex as="main" color="#2d3c2d" direction="column" minHeight="100%" width="100%">
      <HomeHero text={homeCopy[locale]} />
      <HomeCategoriesSection locale={locale} text={homeCopy[locale]} />
    </Flex>
  );
};
