import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import type { Locale } from 'src/shared/config';

import { profileFooter, type ProfileCopy } from '../../content/profileContent';

interface ProfileFooterProps {
  readonly locale: Locale;
  readonly text: ProfileCopy;
}

const FooterCard = ({ accent = false, children, icon, title }: { readonly accent?: boolean; readonly children: React.ReactNode; readonly icon?: string; readonly title: string }) => (
  <Flex background={accent ? '#fff3e9' : '#fffaf3'} border="1px solid #e8dece" direction="column" gap="9px" minHeight="138px" padding="16px">
    <Text color={accent ? '#b24132' : '#27502d'} fontSize="0.8rem" fontWeight={800} textTransform="uppercase">{icon ? `${icon} ` : ''}{title}</Text>
    <Box color="#2d362d" fontSize="0.8rem" lineHeight={1.48}>{children}</Box>
  </Flex>
);

export const ProfileFooter = ({ locale, text }: ProfileFooterProps) => {
  const footer = profileFooter[locale];

  return (
    <>
      <Grid gap="1px" gridTemplateColumns={{ base: '1fr', lg: '1.1fr 0.9fr 1.2fr' }} marginTop="12px">
        <FooterCard icon="♧" title={text.propagation}>{footer.propagation}</FooterCard>
        <FooterCard icon="⚠" title={text.problems}>{footer.problems.map((item) => <Text key={item}>❧ {item}</Text>)}</FooterCard>
        <FooterCard icon="♧" title={text.facts}>{footer.facts.map((item) => <Text key={item}>› {item}</Text>)}</FooterCard>
      </Grid>
      <Grid gap="1px" gridTemplateColumns={{ base: '1fr', md: '0.85fr 1.15fr' }} marginTop="10px">
        <FooterCard accent icon="!" title={text.important}>{footer.important}</FooterCard>
        <FooterCard title={text.notes}><Box borderBottom="1px dashed #d8c9b3" height="22px" /><Box borderBottom="1px dashed #d8c9b3" height="22px" /><Box borderBottom="1px dashed #d8c9b3" height="22px" /></FooterCard>
      </Grid>
    </>
  );
};
