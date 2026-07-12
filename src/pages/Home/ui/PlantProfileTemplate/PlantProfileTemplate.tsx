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
    category: 'Vines & hanging plants',
    difficulty: 'Difficulty level',
    fastGrowth: 'Fast growth',
    facts: 'Useful facts',
    humidity: 'Humidity',
    ideal: 'Ideal look',
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
    category: 'Лианы и ампельные',
    difficulty: 'Уровень сложности',
    fastGrowth: 'Рост',
    facts: 'Полезные факты',
    humidity: 'Влажность',
    ideal: 'Идеальный вид',
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
    ['Soil', 'Light, nutritious, and airy. A mix for decorative foliage plants works well.'],
    ['Repotting', 'Young plants — every spring; adult plants — every 2–3 years.'],
    ['Feeding', 'From spring to autumn, feed every 2–3 weeks with a balanced fertiliser.'],
    ['Support & shaping', 'A support or trellis helps it grow neatly. Pinch tips for density.'],
  ],
  ru: [
    ['Грунт', 'Лёгкий, питательный, воздухопроницаемый. Подойдёт смесь для декоративно-лиственных растений.'],
    ['Пересадка', 'Молодые растения — каждой весной, взрослые — раз в 2–3 года.'],
    ['Подкормки', 'С весны до осени каждые 2–3 недели комплексным удобрением.'],
    ['Опоры и формировка', 'Нуждается в опоре или решётке. Прищипывайте верхушки для густоты.'],
  ],
} as const;

const profileFooter = {
  en: {
    facts: ['Fast-growing vine; can add 1–1.5 m in a season.', 'A lovely choice for vertical greenery.', 'Unpretentious and suitable for beginners.'],
    important: 'Avoid overwatering and direct summer sun. Wipe the leaves gently for better photosynthesis.',
    problems: ['Yellow leaves — overwatering or stagnant water.', 'Leaf fall — not enough light or dry air.', 'Pale leaves — lack of nutrients.'],
    propagation: 'Propagates from cuttings. In spring or summer, roots form easily in water or a moist substrate.',
  },
  ru: {
    facts: ['Быстрорастущая лиана: за сезон может вырасти на 1–1,5 м.', 'Идеальна для вертикального озеленения.', 'Неприхотлива и отлично подходит для начинающих цветоводов.'],
    important: 'Не любит переувлажнения и прямых солнечных лучей. Регулярно протирайте листья для лучшего фотосинтеза.',
    problems: ['Желтеют листья — перелив или застой воды.', 'Опадают листья — недостаток света или сухой воздух.', 'Бледные листья — нехватка питания.'],
    propagation: 'Черенками. Весной или летом черенки с 2–3 узлами легко укореняются в воде или влажном субстрате.',
  },
} as const;

export const PlantProfileTemplate = ({ locale, onBack, onClose, plant }: PlantProfileTemplateProps) => {
  const text = copy[locale];
  const profile = plant.profile;
  const footer = profileFooter[locale];

  return (
    <Flex background="#fdfaf3" direction="column" margin="0 auto" maxWidth="1200px" padding={{ base: '16px', md: '22px 28px 28px' }} position="relative" width="100%">
      <Flex alignItems="flex-start" justifyContent="space-between">
        <Flex alignItems="center" background="#f2e8d8" borderRadius="8px" overflow="hidden">
          <Text background="#24551e" color="#fffaf0" fontSize={{ base: '1rem', md: '1.3rem' }} padding="7px 12px">04</Text>
          <Text color="#405238" fontSize={{ base: '0.72rem', md: '0.88rem' }} fontWeight={800} padding="0 12px" textTransform="uppercase">{text.category}</Text>
        </Flex>
        <Flex alignItems="center" background="#fffaf1" border="1px solid #ddcfb9" borderRadius="8px" direction="column" gap="6px" padding="10px 18px">
          <Text color="#29342a" fontSize="0.67rem" fontWeight={800} textTransform="uppercase">{text.difficulty}</Text>
          <LeafMeter level={profile.difficulty} />
        </Flex>
      </Flex>

      <Button alignSelf="flex-start" color="#526246" fontWeight={720} marginTop="8px" padding={0} type="button" variant="plain" onClick={onBack}>← {locale === 'ru' ? 'Мои растения' : 'My plants'}</Button>
      <Button aria-label={locale === 'ru' ? 'Закрыть карточку растения' : 'Close plant profile'} border="1px solid rgba(82, 98, 70, 0.35)" borderRadius="999px" color="#3e513d" fontSize="24px" height="42px" minWidth="42px" padding={0} position="absolute" right={{ base: '16px', md: '28px' }} top={{ base: '78px', md: '82px' }} type="button" variant="plain" onClick={onClose}>×</Button>

      <Flex alignItems="center" direction="column" marginTop={{ base: '6px', md: '-28px' }} textAlign="center">
        <Text as="h2" color="#104820" fontSize={{ base: '2.2rem', md: 'clamp(3.1rem, 5vw, 4.8rem)' }} fontWeight={520} lineHeight={0.95} margin={0} textStyle="serif">{plant.name[locale]}</Text>
        <Text color="#627c4b" fontSize={{ base: '1.45rem', md: '2.05rem' }} fontStyle="italic" marginTop="6px" textStyle="serif">{profile.latinName}</Text>
      </Flex>

      <Grid background="#fffaf3" borderRadius="10px" boxShadow="0 10px 24px rgba(91, 76, 54, 0.06)" gap="0" gridTemplateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} margin={{ base: '20px 0 16px', md: '18px auto 16px' }} maxWidth="820px" padding="10px 0" width="100%">
        {profile.facts.map((fact, index) => (
          <Box borderLeft={index === 0 ? 'none' : { base: 'none', md: '1px solid #eadfce' }} key={fact.label[locale]} padding="0 18px">
            <Text color="#364b32" fontSize="0.68rem" fontWeight={800} textTransform="uppercase">❧ {fact.label[locale]}</Text>
            <Text color="#242c24" fontSize="0.85rem" fontWeight={700} lineHeight={1.35} marginTop="4px">{fact.value[locale]}</Text>
          </Box>
        ))}
      </Grid>

      <Grid gap="18px" gridTemplateColumns={{ base: '1fr', lg: '0.82fr 1.18fr' }}>
        <ReferenceCard image={plant.image} label={locale === 'ru' ? 'Моё растение' : 'My plant'} />
        <Flex background="#f9f4eb" border="1px solid #e8dece" borderRadius="10px" direction={{ base: 'column', sm: 'row' }} overflow="hidden" position="relative">
          <Text background="#526c2d" borderRadius="0 0 8px 0" color="#fffaf0" fontSize="0.72rem" fontWeight={800} left={0} padding="8px 12px" position="absolute" textTransform="uppercase" top={0} zIndex={1}>{text.ideal}</Text>
          <Image alt="" minHeight={{ base: '260px', sm: '350px' }} objectFit="cover" src={profile.idealImage} width={{ base: '100%', sm: '68%' }} />
          <Flex direction="column" gap="18px" justifyContent="center" padding="26px 22px">
            <Text color="#202820" fontSize="0.93rem" lineHeight={1.48}>{profile.overview[locale]}</Text>
            <Text color="#495b3f" fontSize="0.9rem" lineHeight={1.48}>❧ {profile.notes[locale]}</Text>
          </Flex>
        </Flex>
      </Grid>

      <Grid background="#fffaf3" border="1px solid #e8dece" borderRadius="10px" gap="0" gridTemplateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' }} marginTop="12px">
        <QuickFact icon="↗" label={text.fastGrowth} value={locale === 'ru' ? 'Быстрый' : 'Fast'} />
        <QuickFact icon="↕" label={locale === 'ru' ? 'Высота' : 'Height'} value={locale === 'ru' ? 'До 2–3 м' : 'Up to 2–3 m'} />
        <QuickFact icon="◌" label={text.humidity} value={locale === 'ru' ? 'Средняя — высокая' : 'Medium to high'} />
        <QuickFact icon="☀" label={text.light} value={locale === 'ru' ? 'Яркий рассеянный свет' : 'Bright indirect light'} />
            <QuickFact icon="♨" label={text.temperature} value="18–25 °C" />
      </Grid>

      <Grid gap="0" gridTemplateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} marginTop="12px">
        {profile.care.map((care, index) => <CareCard body={care.body[locale]} icon={['☀', '◌', '◒', '♨'][index]!} key={care.title[locale]} title={care.title[locale]} />)}
      </Grid>
      <Grid gap="0" gridTemplateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} marginTop="1px">
        {secondaryCare[locale].map(([title, body], index) => <CareCard body={body} icon={['♧', '▣', '▤', '▦'][index]!} key={title} title={title} />)}
      </Grid>

      <Grid gap="1px" gridTemplateColumns={{ base: '1fr', lg: '1.1fr 0.9fr 1.2fr' }} marginTop="12px">
        <FooterCard image="/plants/vitaceae-modal/cissus-rhombifolia.png" icon="♧" title={text.propagation}>{footer.propagation}</FooterCard>
        <FooterCard icon="⚠" title={text.problems}>{footer.problems.map((item) => <Text key={item}>❧ {item}</Text>)}</FooterCard>
        <FooterCard image="/plants/vitaceae-modal/cissus-rhombifolia.png" icon="♧" title={text.facts}>{footer.facts.map((item) => <Text key={item}>› {item}</Text>)}</FooterCard>
      </Grid>

      <Grid gap="1px" gridTemplateColumns={{ base: '1fr', md: '0.85fr 1.15fr' }} marginTop="10px">
        <FooterCard accent image="/plants/vitaceae-modal/cissus-rhombifolia.png" icon="!" title={text.important}>{footer.important}</FooterCard>
        <FooterCard image="/plants/vitaceae-modal/cissus-rhombifolia.png" title={text.notes}><Box borderBottom="1px dashed #d8c9b3" height="22px" /><Box borderBottom="1px dashed #d8c9b3" height="22px" /><Box borderBottom="1px dashed #d8c9b3" height="22px" /></FooterCard>
      </Grid>
    </Flex>
  );
};

const ReferenceCard = ({ image, label }: { readonly image: string; readonly label: string }) => (
  <Box background="#f9f4eb" border="1px solid #e8dece" borderRadius="10px" overflow="hidden" position="relative">
    <Text background="#526c2d" borderRadius="0 0 8px 0" color="#fffaf0" fontSize="0.72rem" fontWeight={800} left={0} padding="8px 12px" position="absolute" textTransform="uppercase" top={0} zIndex={1}>{label}</Text>
    <Image alt="" aspectRatio={{ base: '1.1 / 1', lg: '0.78 / 1' }} objectFit="cover" src={image} width="100%" />
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
      <Box as="span" color={index < level ? '#6d8b3f' : '#d9cbb3'} fontSize="1.35rem" key={index} transform="rotate(-24deg)">◒</Box>
    ))}
  </Flex>
);
