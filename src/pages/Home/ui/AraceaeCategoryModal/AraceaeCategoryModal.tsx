import { Box, Button, Flex, Grid, Image, Text } from '@chakra-ui/react';
import { type KeyboardEvent, type ReactNode, useEffect, useRef, useState } from 'react';

interface AraceaeCategoryModalProps {
  readonly onClose: () => void;
}

const araceaeTraits = [
  {
    body: 'Соцветие-початок с покрывалом, которое часто выглядит как отдельный цветок.',
    image: '/plants/araceae-modal/spathiphyllum.jpg',
  },
  {
    body: 'Листья простые, часто крупные, с выразительными жилками и разными формами пластины.',
    image: '/plants/araceae-modal/alocasia.jpg',
  },
  {
    body: 'Многие представители образуют воздушные корни и цепляются за опору.',
    image: '/plants/araceae-modal/monstera.jpg',
  },
  {
    body: 'Часть видов содержит оксалаты кальция, поэтому их лучше держать вдали от животных.',
    image: '/plants/araceae-modal/philodendron.jpg',
  },
] as const;

const araceaeFacts = [
  'Семейство включает более 100 родов и тысячи видов, от миниатюрных растений до крупных лиан.',
  'Белое покрывало спатифиллума и красная пластина антуриума - это не лепестки, а видоизмененный лист.',
  'Монстеры в природе могут подниматься по деревьям и выращивать листья больше человеческой руки.',
  'У многих ароидных молодые и взрослые листья выглядят так по-разному, будто это разные растения.',
] as const;

const araceaePlants = [
  { image: '/plants/araceae-modal/alocasia.jpg', name: "Alocasia baginda 'Dragon Scale'" },
  { image: '/plants/araceae-modal/alocasia.jpg', name: "Alocasia x amazonica 'Bambino'" },
  { image: '/plants/araceae-modal/alocasia.jpg', name: "Alocasia reginula 'Black Velvet'" },
  { image: '/plants/araceae-modal/aglaonema.jpg', name: "Aglaonema 'Red Valentine'" },
  { image: '/plants/araceae-modal/aglaonema.jpg', name: "Aglaonema 'Silver Queen'" },
  { image: '/plants/araceae-modal/aglaonema.jpg', name: 'Aglaonema розовая' },
  {
    image: '/plants/araceae-modal/philodendron.jpg',
    name: "Philodendron erubescens 'Imperial Red'",
  },
  { image: '/plants/araceae-modal/monstera.jpg', name: 'Monstera adansonii' },
  { image: '/plants/araceae-modal/anthurium.jpg', name: 'Anthurium' },
  { image: '/plants/araceae-modal/spathiphyllum.jpg', name: 'Spathiphyllum' },
] as const;

export const AraceaeCategoryModal = ({ onClose }: AraceaeCategoryModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const frame = window.requestAnimationFrame(() => {
      setIsOpen(true);
      closeButtonRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(frame);
      previousFocusRef.current?.focus();
    };
  }, []);

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      onClose();
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    const focusableElements = cardRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const focusable = Array.from(focusableElements ?? []).filter((element) => element.offsetParent);
    const firstElement = focusable.at(0);
    const lastElement = focusable.at(-1);

    if (!firstElement || !lastElement) {
      event.preventDefault();
      return;
    }

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  return (
    <Flex
      alignItems="flex-start"
      aria-labelledby="araceae-modal-title"
      aria-modal="true"
      background="rgba(34, 29, 18, 0.28)"
      inset={0}
      justifyContent="center"
      overflowY="auto"
      padding={{ base: '14px', md: '28px' }}
      position="fixed"
      role="dialog"
      tabIndex={-1}
      zIndex={80}
      onKeyDown={handleDialogKeyDown}
    >
      <Box
        ref={cardRef}
        background="linear-gradient(135deg, rgba(255, 253, 247, 0.99), rgba(248, 242, 230, 0.98))"
        border="1px solid rgba(218, 204, 178, 0.9)"
        borderRadius={{ base: '12px', md: '14px' }}
        boxShadow="0 24px 90px rgba(46, 38, 24, 0.28)"
        maxWidth="1180px"
        opacity={isOpen ? 1 : 0}
        overflow="hidden"
        position="relative"
        transform={isOpen ? 'translateY(0) scale(1)' : 'translateY(18px) scale(0.985)'}
        transition="opacity 220ms ease, transform 260ms ease"
        width="100%"
      >
        <Box
          backgroundImage="url('/plants/araceae-modal/hero-cutout-transparent.png')"
          backgroundPosition="calc(100% + 70px) top"
          backgroundRepeat="no-repeat"
          backgroundSize={{ base: '540px auto', md: '650px auto', lg: '700px auto' }}
          minHeight={{ base: '340px', md: '410px', lg: '497px' }}
          overflow="hidden"
          padding={{ base: '18px 18px 22px', md: '38px 48px 18px' }}
          position="relative"
        >
          <Button
            ref={closeButtonRef}
            alignItems="center"
            background="transparent"
            color="#75816e"
            display="inline-flex"
            fontSize={{ base: '0.88rem', md: '0.95rem' }}
            fontWeight={720}
            gap="10px"
            marginBottom={{ base: '24px', md: '48px' }}
            padding={0}
            position="relative"
            type="button"
            variant="plain"
            zIndex={1}
            _focusVisible={{
              boxShadow: '0 0 0 3px rgba(122, 143, 100, 0.28)',
              outline: 'none',
            }}
            _hover={{ color: '#314034' }}
            onClick={onClose}
          >
            <Box as="span" fontSize="20px" lineHeight={1}>
              ←
            </Box>
            Назад к категориям
          </Button>

          <Box
            w="450px"
            position="relative"
            zIndex={1}
            background="rgba(255, 253, 247, 0.55)"
            borderRadius="1000px"
            boxShadow="0 0 72px 58px rgba(255, 253, 247, 0.6)"
          >
            <Text
              as="h2"
              color="#1f3d2b"
              fontFamily="Georgia, 'Times New Roman', serif"
              fontSize={{ base: '3.1rem', md: '5.25rem' }}
              fontWeight={500}
              id="araceae-modal-title"
              lineHeight={0.92}
              margin={0}
            >
              Ароидные
            </Text>
            <Text
              color="#6f835d"
              fontFamily="Georgia, 'Times New Roman', serif"
              fontSize={{ base: '2rem', md: '3.1rem' }}
              lineHeight={1.05}
              marginTop="6px"
            >
              Araceae
            </Text>
            <Text
              color="#465247"
              fontSize={{ base: '1rem', md: '1.08rem' }}
              lineHeight={1.75}
              marginTop={{ base: '22px', md: '30px' }}
              maxWidth="430px"
            >
              Ароидные - одно из крупнейших семейств цветковых растений. Большинство представителей
              происходят из тропических и субтропических регионов и отличаются эффектными листьями,
              воздушными корнями и соцветиями-початками.
            </Text>
          </Box>
        </Box>

        <Grid
          alignItems="stretch"
          gap="8px"
          gridTemplateColumns={{
            base: '1fr',
            md: 'repeat(2, minmax(0, 1fr))',
            lg: 'repeat(3, minmax(0, 1fr))',
          }}
          padding={{ base: '0 18px 18px', md: '0 34px 26px' }}
          position="relative"
          zIndex={2}
        >
          <Box gridColumn={{ base: 'auto', md: '1 / -1', lg: 'auto' }} height="100%">
            <InfoPanel title="Происхождение">
              <Box
                alignItems="center"
                display="flex"
                height="150px"
                justifyContent="center"
                marginBottom="18px"
                overflow="visible"
              >
                <Image
                  alt=""
                  height="100%"
                  objectFit="contain"
                  src="/plants/araceae-modal/origin-map-transparent.png"
                  width="100%"
                />
              </Box>
              <Text color="#5d675b" fontSize="0.9rem" lineHeight={1.55}>
                Тропические и субтропические регионы Азии, Центральной и Южной Америки, Африки,
                Австралии и островов Тихого океана.
              </Text>
            </InfoPanel>
          </Box>

          <InfoPanel title="Отличительные признаки">
            {araceaeTraits.map((trait) => (
              <Flex alignItems="center" gap="12px" key={trait.body}>
                <Image
                  alt=""
                  borderRadius="8px"
                  height="36px"
                  objectFit="cover"
                  src={trait.image}
                  width="36px"
                />
                <Text color="#465247" fontSize="0.9rem" lineHeight={1.5}>
                  {trait.body}
                </Text>
              </Flex>
            ))}
          </InfoPanel>

          <InfoPanel title="Интересные факты">
            {araceaeFacts.map((fact) => (
              <Flex alignItems="flex-start" gap="13px" key={fact}>
                <Box
                  background="#758f62"
                  borderRadius="999px"
                  flexShrink={0}
                  height="4px"
                  marginTop="10px"
                  width="4px"
                />
                <Text color="#465247" fontSize="0.9rem" lineHeight={1.58}>
                  {fact}
                </Text>
              </Flex>
            ))}
          </InfoPanel>
        </Grid>

        <Box padding={{ base: '0 18px 22px', md: '0 34px 34px' }}>
          <Box
            background="rgba(255, 253, 247, 0.78)"
            border="1px solid rgba(218, 204, 178, 0.72)"
            borderRadius="13px"
            padding={{ base: '18px', md: '24px' }}
          >
            <Text
              as="h3"
              color="#25382b"
              fontFamily="Georgia, 'Times New Roman', serif"
              fontSize="1.45rem"
              marginBottom="20px"
            >
              Растения из моей коллекции (9)
            </Text>
            <Grid
              gap="16px"
              gridTemplateColumns={{
                base: 'repeat(2, minmax(0, 1fr))',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(5, 1fr)',
              }}
            >
              {araceaePlants.map((plant) => (
                <Box
                  background="#fffdf7"
                  border="1px solid rgba(218, 204, 178, 0.72)"
                  borderRadius="9px"
                  boxShadow="0 10px 22px rgba(76, 64, 42, 0.06)"
                  key={plant.name}
                  overflow="hidden"
                >
                  <Image
                    alt=""
                    aspectRatio="1.25 / 1"
                    objectFit="cover"
                    src={plant.image}
                    width="100%"
                  />
                  <Text
                    color="#344334"
                    fontSize="0.86rem"
                    fontWeight={760}
                    lineHeight={1.22}
                    minHeight="42px"
                    padding="10px"
                  >
                    {plant.name}
                  </Text>
                </Box>
              ))}
            </Grid>
            <Flex
              alignItems="center"
              background="linear-gradient(90deg, rgba(235, 242, 218, 0.86), rgba(246, 248, 235, 0.94))"
              borderRadius="10px"
              color="#465247"
              fontSize={{ base: '0.86rem', md: '0.95rem' }}
              fontWeight={720}
              gap="12px"
              justifyContent="center"
              lineHeight={1.35}
              marginTop="18px"
              minHeight="48px"
              padding={{ base: '12px 14px', md: '12px 22px' }}
              textAlign="center"
            >
              <SproutIcon />
              Ароидные - это не просто растения, это целый мир удивительных форм и адаптаций.
            </Flex>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

const SproutIcon = () => (
  <svg
    aria-hidden="true"
    height="24px"
    style={{ color: '#6f8f5c', flexShrink: 0 }}
    viewBox="0 0 28 28"
    width="24px"
  >
    <path
      d="M13.6 21.6c.6-4.8.4-8.7 3.2-12.4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2.1"
    />
    <path
      d="M18.8 4.7c4.2.7 5.7 3.6 3.8 7.4-2.2 4.2-6.1 4.7-8.2 4.5-.2-2.7.4-6.1 4.4-11.9Z"
      fill="currentColor"
      opacity={0.82}
    />
    <path
      d="M12.3 21.4c-1.1-3.4-3.1-5.1-6.6-5.7"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2.1"
    />
    <path
      d="M4.2 12.9c3.3-.5 5.8.8 7.4 3.6-1.4 2.3-4.5 3.4-7.1 1.2-1.7-1.5-1.9-3.2-.3-4.8Z"
      fill="currentColor"
      opacity={0.72}
    />
  </svg>
);

const InfoPanel = ({
  children,
  title,
}: {
  readonly children: ReactNode;
  readonly title: string;
}) => {
  return (
    <Flex
      direction="column"
      gap="16px"
      background="rgba(255, 253, 247, 0.88)"
      border="1px solid rgba(218, 204, 178, 0.72)"
      borderRadius="12px"
      boxShadow="0 14px 34px rgba(76, 64, 42, 0.06)"
      height="100%"
      padding={{ base: '18px', md: '24px 24px 22px' }}
    >
      <Text
        as="h3"
        color="#25382b"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="1.24rem"
        lineHeight={1.1}
      >
        {title}
      </Text>
      {children}
    </Flex>
  );
};
