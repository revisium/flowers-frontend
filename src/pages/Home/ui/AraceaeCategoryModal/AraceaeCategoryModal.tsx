import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  Text,
} from '@chakra-ui/react';
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

const araceaeGenera = [
  { image: '/plants/araceae-modal/alocasia.jpg', name: 'Alocasia', species: '97 видов' },
  { image: '/plants/araceae-modal/philodendron.jpg', name: 'Philodendron', species: '489 видов' },
  { image: '/plants/araceae-modal/monstera.jpg', name: 'Monstera', species: '60 видов' },
  { image: '/plants/araceae-modal/aglaonema.jpg', name: 'Aglaonema', species: '50 видов' },
  { image: '/plants/araceae-modal/anthurium.jpg', name: 'Anthurium', species: '1100 видов' },
  { image: '/plants/araceae-modal/spathiphyllum.jpg', name: 'Spathiphyllum', species: '45 видов' },
] as const;

const araceaePlants = [
  { image: '/plants/araceae-modal/alocasia.jpg', name: "Alocasia baginda 'Dragon Scale'" },
  { image: '/plants/araceae-modal/alocasia.jpg', name: "Alocasia x amazonica 'Bambino'" },
  { image: '/plants/araceae-modal/alocasia.jpg', name: "Alocasia reginula 'Black Velvet'" },
  { image: '/plants/araceae-modal/aglaonema.jpg', name: "Aglaonema 'Red Valentine'" },
  { image: '/plants/araceae-modal/aglaonema.jpg', name: "Aglaonema 'Silver Queen'" },
  { image: '/plants/araceae-modal/aglaonema.jpg', name: 'Aglaonema розовая' },
  { image: '/plants/araceae-modal/philodendron.jpg', name: "Philodendron erubescens 'Imperial Red'" },
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
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
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
          backgroundImage="url('/plants/araceae-modal/hero.jpg')"
          backgroundPosition={{ base: 'right 38px bottom -8px', md: 'right -18px bottom -54px', lg: 'right -8px bottom -74px' }}
          backgroundRepeat="no-repeat"
          backgroundSize={{ base: '520px auto', md: '720px auto', lg: '760px auto' }}
          minHeight={{ base: '640px', md: '610px', lg: '570px' }}
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
            type="button"
            variant="plain"
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

          <Grid>
            <Box maxWidth={{ base: '100%', md: '460px' }} position="relative" zIndex={1}>
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
                Ароидные - одно из крупнейших семейств цветковых растений. Большинство
                представителей происходят из тропических и субтропических регионов и
                отличаются эффектными листьями, воздушными корнями и соцветиями-початками.
              </Text>
            </Box>
          </Grid>
        </Box>

        <Grid
          gap="10px"
          gridTemplateColumns={{ base: '1fr', lg: '0.95fr 0.95fr 1.15fr' }}
          padding={{ base: '0 18px 18px', md: '0 34px 26px' }}
        >
          <InfoPanel title="Происхождение">
            <Box
              background="linear-gradient(135deg, rgba(231, 226, 211, 0.82), rgba(249, 246, 237, 0.96))"
              borderRadius="10px"
              height="116px"
              marginBottom="18px"
              overflow="hidden"
              position="relative"
            >
              {['18% 54%', '34% 45%', '48% 58%', '66% 48%', '79% 59%'].map((position) => (
                <Box
                  background="#6a8d58"
                  borderRadius="48% 52% 44% 56%"
                  height="32px"
                  key={position}
                  left={position.split(' ')[0]}
                  opacity={0.88}
                  position="absolute"
                  top={position.split(' ')[1]}
                  transform="translate(-50%, -50%) rotate(-12deg)"
                  width="58px"
                />
              ))}
              <Box
                border="1px solid rgba(116, 126, 102, 0.24)"
                borderRadius="999px"
                height="64px"
                left="12%"
                position="absolute"
                right="10%"
                top="26px"
              />
            </Box>
            <Text color="#5d675b" fontSize="0.9rem" lineHeight={1.55}>
              Тропические и субтропические регионы Азии, Центральной и Южной Америки,
              Африки, Австралии и островов Тихого океана.
            </Text>
          </InfoPanel>

          <InfoPanel title="Отличительные признаки">
            {araceaeTraits.map((trait) => (
              <Flex alignItems="center" gap="12px" key={trait.body} marginBottom="14px">
                <Image
                  alt=""
                  borderRadius="8px"
                  height="36px"
                  objectFit="cover"
                  src={trait.image}
                  width="36px"
                />
                <Text color="#465247" fontSize="0.88rem" lineHeight={1.45}>
                  {trait.body}
                </Text>
              </Flex>
            ))}
          </InfoPanel>

          <InfoPanel title="Интересные факты">
            {araceaeFacts.map((fact) => (
              <Flex alignItems="flex-start" gap="10px" key={fact} marginBottom="14px">
                <Box background="#758f62" borderRadius="999px" flexShrink={0} height="5px" marginTop="9px" width="5px" />
                <Text color="#465247" fontSize="0.9rem" lineHeight={1.55}>
                  {fact}
                </Text>
              </Flex>
            ))}
          </InfoPanel>
        </Grid>

        <Box padding={{ base: '0 18px 18px', md: '0 34px 26px' }}>
          <Box
            background="rgba(255, 253, 247, 0.76)"
            border="1px solid rgba(218, 204, 178, 0.72)"
            borderRadius="13px"
            padding={{ base: '18px', md: '24px' }}
          >
            <Text as="h3" color="#25382b" fontFamily="Georgia, 'Times New Roman', serif" fontSize="1.45rem" marginBottom="22px">
              Дерево родов
            </Text>
            <Flex alignItems="center" direction="column" gap="18px">
              <Box
                background="#dfe8c1"
                borderRadius="9px"
                color="#2d3b2f"
                fontWeight={760}
                padding="10px 34px"
              >
                Araceae
              </Box>
              <Grid gap="14px" gridTemplateColumns={{ base: 'repeat(2, minmax(0, 1fr))', md: 'repeat(3, 1fr)', xl: 'repeat(6, 1fr)' }} width="100%">
                {araceaeGenera.map((genus) => (
                  <Box
                    background="#fffdf7"
                    border="1px solid rgba(218, 204, 178, 0.78)"
                    borderRadius="10px"
                    boxShadow="0 10px 24px rgba(76, 64, 42, 0.06)"
                    key={genus.name}
                    minHeight="154px"
                    padding="10px"
                    textAlign="center"
                  >
                    <Text color="#344334" fontSize="0.88rem" fontWeight={760} lineClamp={1}>
                      {genus.name}
                    </Text>
                    <Image alt="" height="76px" margin="8px auto" objectFit="contain" src={genus.image} width="84px" />
                    <Text color="#7a7a68" fontSize="0.72rem">
                      ≈ {genus.species}
                    </Text>
                  </Box>
                ))}
              </Grid>
            </Flex>
            <Flex
              alignItems="center"
              borderTop="1px solid rgba(218, 204, 178, 0.68)"
              color="#7a7f70"
              fontSize="0.86rem"
              gap="10px"
              marginTop="22px"
              paddingTop="14px"
            >
              <Box border="1px solid #9ba88a" borderRadius="999px" color="#7b8f6c" flexShrink={0} height="22px" lineHeight="20px" textAlign="center" width="22px">
                i
              </Box>
              Количество видов указано приблизительно и может меняться по мере новых исследований.
            </Flex>
          </Box>
        </Box>

        <Box padding={{ base: '0 18px 22px', md: '0 34px 34px' }}>
          <Box
            background="rgba(255, 253, 247, 0.78)"
            border="1px solid rgba(218, 204, 178, 0.72)"
            borderRadius="13px"
            padding={{ base: '18px', md: '24px' }}
          >
            <Text as="h3" color="#25382b" fontFamily="Georgia, 'Times New Roman', serif" fontSize="1.45rem" marginBottom="20px">
              Растения из моей коллекции (9)
            </Text>
            <Grid gap="16px" gridTemplateColumns={{ base: 'repeat(2, minmax(0, 1fr))', md: 'repeat(3, 1fr)', lg: 'repeat(5, 1fr)' }}>
              {araceaePlants.map((plant) => (
                <Box
                  background="#fffdf7"
                  border="1px solid rgba(218, 204, 178, 0.72)"
                  borderRadius="9px"
                  boxShadow="0 10px 22px rgba(76, 64, 42, 0.06)"
                  key={plant.name}
                  overflow="hidden"
                >
                  <Image alt="" aspectRatio="1.25 / 1" objectFit="cover" src={plant.image} width="100%" />
                  <Text color="#344334" fontSize="0.86rem" fontWeight={760} lineHeight={1.22} minHeight="42px" padding="10px">
                    {plant.name}
                  </Text>
                </Box>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

const InfoPanel = ({ children, title }: { readonly children: ReactNode; readonly title: string }) => {
  return (
    <Box
      background="rgba(255, 253, 247, 0.76)"
      border="1px solid rgba(218, 204, 178, 0.72)"
      borderRadius="13px"
      boxShadow="0 10px 26px rgba(76, 64, 42, 0.05)"
      padding={{ base: '18px', md: '22px' }}
    >
      <Text as="h3" color="#25382b" fontFamily="Georgia, 'Times New Roman', serif" fontSize="1.2rem" marginBottom="18px">
        {title}
      </Text>
      {children}
    </Box>
  );
};
