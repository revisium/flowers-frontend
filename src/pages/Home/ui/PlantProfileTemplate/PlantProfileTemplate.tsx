import { Box, Button, Flex, Grid, Image, Text } from '@chakra-ui/react';
import type { CollectionPlant } from 'src/entities/collection';
import type { Locale } from 'src/shared/config';

interface PlantProfileTemplateProps {
  readonly locale: Locale;
  readonly plant: CollectionPlant;
  readonly onBack: () => void;
  readonly onClose: () => void;
}

const copy = {
  en: {
    difficulty: 'Difficulty level',
    fastGrowth: 'Fast growth',
    facts: 'Useful facts',
    humidity: 'Humidity',
    important: 'Important',
    light: 'Light',
    notes: 'My notes',
    problems: 'Possible problems',
    propagation: 'Propagation',
    repotting: 'Repotting',
    soil: 'Soil',
    support: 'Support & shaping',
    temperature: 'Temperature',
  },
  ru: {
    difficulty: 'Уровень сложности',
    fastGrowth: 'Рост',
    facts: 'Полезные факты',
    humidity: 'Влажность',
    important: 'Важно!',
    light: 'Освещение',
    notes: 'Мои заметки',
    problems: 'Возможные проблемы',
    propagation: 'Размножение',
    repotting: 'Пересадка',
    soil: 'Грунт',
    support: 'Опоры и формировка',
    temperature: 'Температура',
  },
} as const;

const secondaryCare = {
  en: [
    ['Soil', 'A humus-rich, airy mix that holds some moisture but drains well.'],
    ['Repotting', 'Repot in spring when the roots have filled the pot.'],
    ['Feeding', 'Use a balanced fertiliser during active growth, following the product instructions.'],
    ['Support & shaping', 'Offer a support for the tendrils and prune long shoots to keep the vine neat.'],
  ],
  ru: [
    ['Грунт', 'Гумусный и воздухопроницаемый субстрат, который удерживает немного влаги, но хорошо дренируется.'],
    ['Пересадка', 'Пересаживайте весной, когда корни полностью освоят горшок.'],
    ['Подкормки', 'В период активного роста используйте сбалансированное удобрение по инструкции производителя.'],
    ['Опоры и формировка', 'Дайте усикам опору и подрезайте длинные побеги, чтобы лиана оставалась аккуратной.'],
  ],
} as const;

const profileFooter = {
  en: {
    facts: ['An evergreen woody climber native to eastern Australia.', 'Simple toothed leaves are usually ovate to oblong.', 'The vine climbs with simple or two-branched tendrils.'],
    important: 'Do not let the root ball dry out completely during active growth, but never leave it standing in water.',
    problems: ['Yellowing leaves — check for waterlogging.', 'Brown edges — air may be too dry or the soil has dried too far.', 'Sparse growth — move to brighter indirect light.'],
    propagation: 'Propagate from stem cuttings during active growth in a lightly moist, airy substrate.',
  },
  ru: {
    facts: ['Вечнозелёная древеснеющая лиана, родом с восточного побережья Австралии.', 'Простые зубчатые листья обычно имеют яйцевидную или продолговатую форму.', 'Лиана цепляется за опору простыми или двураздельными усиками.'],
    important: 'В период активного роста не пересушивайте корневой ком полностью, но и не оставляйте растение стоять в воде.',
    problems: ['Желтеют листья — проверьте, нет ли застоя воды.', 'Края листьев буреют — воздух может быть слишком сухим или грунт сильно пересох.', 'Побеги вытягиваются — переставьте растение в более яркий рассеянный свет.'],
    propagation: 'Размножайте стеблевыми черенками в период активного роста в слегка влажном, воздухопроницаемом субстрате.',
  },
} as const;

const getFactCellDividerStyles = (index: number) => ({
  _after: {
    background: 'linear-gradient(180deg, transparent 0%, #eadfce 18%, #eadfce 82%, transparent 100%)',
    bottom: { md: '12px', lg: '10px' },
    content: '""',
    display: {
      base: 'none',
      md: index % 2 === 1 ? 'block' : 'none',
      lg: index === 0 ? 'none' : 'block',
    },
    left: 0,
    position: 'absolute',
    top: { md: '12px', lg: '10px' },
    width: '1px',
  },
  _before: {
    background: 'linear-gradient(90deg, transparent 0%, #eadfce 18%, #eadfce 82%, transparent 100%)',
    content: '""',
    display: {
      base: index === 0 ? 'none' : 'block',
      md: index >= 2 ? 'block' : 'none',
      lg: 'none',
    },
    height: '1px',
    left: { base: '18px', md: '20px' },
    position: 'absolute',
    right: { base: '18px', md: '20px' },
    top: 0,
  },
  position: 'relative',
});

export const PlantProfileTemplate = ({ locale, onBack, onClose, plant }: PlantProfileTemplateProps) => {
  const text = copy[locale];
  const profile = plant.profile;
  const footer = profileFooter[locale];

  return (
    <Flex background="#fdfaf3" direction="column" margin="0 auto" maxWidth="1200px" padding={{ base: '16px', md: '22px 28px 28px' }} position="relative" width="100%">
      <Flex alignItems="center" justifyContent="space-between" marginTop="8px" width="100%">
        <Button color="#526246" fontWeight={720} padding={0} type="button" variant="plain" onClick={onBack}>← {locale === 'ru' ? 'Мои растения' : 'My plants'}</Button>
        <Button aria-label={locale === 'ru' ? 'Закрыть карточку растения' : 'Close plant profile'} border="1px solid rgba(82, 98, 70, 0.35)" borderRadius="999px" color="#3e513d" fontSize="24px" height="42px" minWidth="42px" padding={0} type="button" variant="plain" onClick={onClose}>×</Button>
      </Flex>

      <Flex alignItems="center" direction="column" marginTop={{ base: '18px', md: '8px' }} textAlign="center">
        <Text as="h2" color="#104820" fontSize={{ base: '2.2rem', md: 'clamp(3.1rem, 5vw, 4.8rem)' }} fontWeight={520} lineHeight={0.95} margin={0} textStyle="serif">{plant.name[locale]}</Text>
        <Text color="#627c4b" fontSize={{ base: '1.45rem', md: '2.05rem' }} fontStyle="italic" marginTop="6px" textStyle="serif">{profile.latinName}</Text>
      </Flex>

      <Grid background="#fffaf3" border="1px solid #e8dece" borderRadius="10px" boxShadow="0 10px 24px rgba(91, 76, 54, 0.06)" gap={0} gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} margin={{ base: '20px 0 16px', md: '18px auto 16px' }} maxWidth="1050px" padding={{ base: '14px', md: '16px 18px', lg: '12px 18px' }} width="100%">
        {profile.facts.map((fact, index) => (
          <Box {...getFactCellDividerStyles(index)} key={fact.label[locale]} minHeight="78px" padding={{ base: '18px 4px', md: '18px 12px', lg: '4px 26px' }}>
            <Text color="#364b32" fontSize="0.68rem" fontWeight={800} textTransform="uppercase">❧ {fact.label[locale]}</Text>
            <Text color="#242c24" fontSize="0.85rem" fontWeight={700} lineHeight={1.35} marginTop="4px">{fact.value[locale]}</Text>
          </Box>
        ))}
        <Flex {...getFactCellDividerStyles(3)} alignItems="flex-start" direction="column" gap="4px" justifyContent="center" minHeight="78px" padding={{ base: '18px 4px', md: '18px 12px', lg: '4px 26px' }}>
          <Text color="#364b32" fontSize="0.68rem" fontWeight={800} textTransform="uppercase">❧ {text.difficulty}</Text>
          <LeafMeter level={profile.difficulty} />
        </Flex>
      </Grid>

      <Grid gap="18px">
        <ReferenceCard image={plant.image} label={locale === 'ru' ? 'Моё растение' : 'My plant'} />
      </Grid>

      <Flex background="#f9f4eb" border="1px solid #e8dece" borderRadius="10px" direction="column" gap="12px" marginTop="12px" padding="20px 22px">
        <Text color="#202820" fontSize="0.93rem" lineHeight={1.52}>{profile.overview[locale]}</Text>
        <Text color="#495b3f" fontSize="0.9rem" lineHeight={1.48}>❧ {profile.notes[locale]}</Text>
      </Flex>

      <Grid background="#fffaf3" border="1px solid #e8dece" borderRadius="10px" gap="0" gridTemplateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' }} marginTop="12px">
        <QuickFact icon="↗" label={text.fastGrowth} value={profile.quickFacts.growth[locale]} />
        <QuickFact icon="↕" label={locale === 'ru' ? 'Побеги' : 'Shoots'} value={profile.quickFacts.height[locale]} />
        <QuickFact icon="◌" label={text.humidity} value={profile.quickFacts.humidity[locale]} />
        <QuickFact icon="☀" label={text.light} value={profile.quickFacts.light[locale]} />
        <QuickFact icon="♨" label={text.temperature} value={profile.quickFacts.temperature[locale]} />
      </Grid>

      <Grid gap="0" gridTemplateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} marginTop="12px">
        {profile.care.map((care, index) => <CareCard body={care.body[locale]} icon={['☀', '◌', '◒', '♨'][index]!} key={care.title[locale]} title={care.title[locale]} />)}
      </Grid>
      <Grid gap="0" gridTemplateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} marginTop="1px">
        {secondaryCare[locale].map(([title, body], index) => <CareCard body={body} icon={['♧', '▣', '▤', '▦'][index]!} key={title} title={title} />)}
      </Grid>

      <Grid gap="1px" gridTemplateColumns={{ base: '1fr', lg: '1.1fr 0.9fr 1.2fr' }} marginTop="12px">
        <FooterCard icon="♧" title={text.propagation}>{footer.propagation}</FooterCard>
        <FooterCard icon="⚠" title={text.problems}>{footer.problems.map((item) => <Text key={item}>❧ {item}</Text>)}</FooterCard>
        <FooterCard icon="♧" title={text.facts}>{footer.facts.map((item) => <Text key={item}>› {item}</Text>)}</FooterCard>
      </Grid>

      <Grid gap="1px" gridTemplateColumns={{ base: '1fr', md: '0.85fr 1.15fr' }} marginTop="10px">
        <FooterCard accent icon="!" title={text.important}>{footer.important}</FooterCard>
        <FooterCard title={text.notes}><Box borderBottom="1px dashed #d8c9b3" height="22px" /><Box borderBottom="1px dashed #d8c9b3" height="22px" /><Box borderBottom="1px dashed #d8c9b3" height="22px" /></FooterCard>
      </Grid>
    </Flex>
  );
};

const ReferenceCard = ({ image, label }: { readonly image: string; readonly label: string }) => (
  <Box background="#f9f4eb" border="1px solid #e8dece" borderRadius="10px" overflow="hidden" position="relative">
    <Text background="#526c2d" borderRadius="0 0 8px 0" color="#fffaf0" fontSize="0.72rem" fontWeight={800} left={0} padding="8px 12px" position="absolute" textTransform="uppercase" top={0} zIndex={1}>{label}</Text>
    <Image alt="" background="#f9f4eb" height={{ base: '520px', md: '680px' }} objectFit="contain" src={image} width="100%" />
  </Box>
);

const QuickFact = ({ icon, label, value }: { readonly icon: string; readonly label: string; readonly value: string }) => (
  <Flex alignItems="center" borderLeft="1px solid #e8dece" direction="column" gap="3px" minHeight="94px" padding="12px" textAlign="center">
    <Text color="#788d52" fontSize="1.3rem">{icon}</Text><Text color="#344434" fontSize="0.7rem" fontWeight={800} textTransform="uppercase">{label}</Text><Text color="#4d574a" fontSize="0.75rem" lineHeight={1.25}>{value}</Text>
  </Flex>
);

const CareCard = ({ body, icon, title }: { readonly body: string; readonly icon: string; readonly title: string }) => (
  <Flex background="#fffaf3" border="1px solid #e8dece" direction="column" gap="7px" minHeight="160px" padding="16px">
    <Text color="#728b50" fontSize="1.35rem">{icon}</Text><Text color="#27502d" fontSize="0.78rem" fontWeight={800} textTransform="uppercase">{title}</Text><Text color="#2e372e" fontSize="0.78rem" lineHeight={1.42}>{body}</Text>
  </Flex>
);

const FooterCard = ({ accent = false, children, icon, image, title }: { readonly accent?: boolean; readonly children: React.ReactNode; readonly icon?: string; readonly image?: string; readonly title: string }) => (
  <Flex background={accent ? '#fff3e9' : '#fffaf3'} border="1px solid #e8dece" direction="column" gap="9px" minHeight="138px" overflow="hidden" padding="16px" position="relative">
    {image ? <Image alt="" bottom="-24px" opacity={0.26} pointerEvents="none" position="absolute" right="-20px" src={image} width="120px" /> : null}
    <Text color={accent ? '#b24132' : '#27502d'} fontSize="0.8rem" fontWeight={800} textTransform="uppercase" zIndex={1}>{icon ? `${icon} ` : ''}{title}</Text><Box color="#2d362d" fontSize="0.8rem" lineHeight={1.48} maxWidth={image ? '82%' : '100%'} zIndex={1}>{children}</Box>
  </Flex>
);

const LeafMeter = ({ level }: { readonly level: number }) => (
  <Flex gap="5px">
    {Array.from({ length: 6 }, (_, index) => (
      <Image
        alt=""
        height="28px"
        key={index}
        objectFit="contain"
        src={index < level ? '/plant-profile/difficulty-leaf-filled.png' : '/plant-profile/difficulty-leaf-outline.png'}
        width="25px"
      />
    ))}
  </Flex>
);
