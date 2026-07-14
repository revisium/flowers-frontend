import { Flex } from '@chakra-ui/react';
import { useLayoutContext } from 'src/shared/config';

import { careCopy } from '../../model/carePageData';
import { CareGuidesSection } from '../CareGuidesSection/CareGuidesSection';
import { CareHero } from '../CareHero/CareHero';
import { CareRoutine } from '../CareRoutine/CareRoutine';

export const CarePage = () => {
  const { locale } = useLayoutContext();
  const text = careCopy[locale];

  return (
    <Flex as="main" color="#2d3c2d" direction="column" minHeight="100%" width="100%">
      <CareHero text={text} />
      <CareGuidesSection text={text} />
      <CareRoutine text={text} />
    </Flex>
  );
};
