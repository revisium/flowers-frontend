import { Flex } from '@chakra-ui/react';
import { Layout, useLayoutContext } from 'src/widgets/Layout';

import { homeCopy } from '../../model/homePageData';
import { HomeCategoriesSection } from '../HomeCategoriesSection/HomeCategoriesSection';
import { HomeHero } from '../HomeHero/HomeHero';

export const HomePage = () => {
  const { locale } = useLayoutContext();

  return (
    <Layout>
      <Flex border="1px solid red" color="#2d3c2d" direction="column" minHeight="100%" width="100%">
        <HomeHero locale={locale} text={homeCopy[locale]} />
        {/*<HomeCategoriesSection locale={locale} text={homeCopy[locale]} />*/}
      </Flex>
    </Layout>
  );
};
