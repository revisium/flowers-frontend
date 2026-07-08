import { Box } from '@chakra-ui/react';
import { usePreferredLocale } from 'src/shared/config';
import { Layout } from 'src/widgets/Layout';

import { homeCopy } from '../../model/homePageData';
import { HomeCategoriesSection } from '../HomeCategoriesSection/HomeCategoriesSection';
import { HomeHero } from '../HomeHero/HomeHero';

export const HomePage = () => {
  const [locale, changeLocale] = usePreferredLocale();

  return (
    <Layout>
      <Box as="main" color="#2d3c2d" minHeight="100%">
        <HomeHero
          locale={locale}
          onLocaleChange={changeLocale}
          text={homeCopy[locale]}
        />
        <HomeCategoriesSection locale={locale} text={homeCopy[locale]} />
      </Box>
    </Layout>
  );
};
