import { Box, Grid } from '@chakra-ui/react';

import { hoyaGuideMethods } from '../../model/hoyaGuideData';
import { HoyaMethodCard } from '../HoyaMethodCard/HoyaMethodCard';
import { ReferenceCrop } from '../ReferenceCrop/ReferenceCrop';

export const HoyaMethodsSection = () => {
  return (
    <Box padding={{ base: '0 18px', md: '0 30px' }}>
      <ReferenceCrop
        alt="6 способов, что делать с длинными побегами"
        crop={[30, 520, 964, 47]}
        rounded="0"
      />
      <Grid
        border="1px solid rgba(127, 122, 91, .32)"
        borderRadius="22px"
        gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
        marginTop="9px"
        overflow="hidden"
        css={{
          '& > article:nth-of-type(3n)': { borderRightWidth: { lg: '0' } },
          '& > article:nth-last-of-type(-n + 3)': { borderBottomWidth: { lg: '0' } },
        }}
      >
        {hoyaGuideMethods.map((method) => (
          <HoyaMethodCard key={method.number} method={method} />
        ))}
      </Grid>
    </Box>
  );
};
