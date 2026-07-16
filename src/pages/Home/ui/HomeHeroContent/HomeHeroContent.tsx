import { Button, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router';
import { PlantCollectionIcon } from 'src/shared/ui';

import type { HomeCopy, HomeHeroStat } from '../../model/homePageData';
import { HomeStats } from '../HomeStats/HomeStats';
import { SmallCanIcon } from '../SmallCanIcon/SmallCanIcon';

interface HomeHeroContentProps {
  readonly onCollectionOpen: () => void;
  readonly stats: readonly HomeHeroStat[];
  readonly text: HomeCopy;
}

export const HomeHeroContent = ({ onCollectionOpen, stats, text }: HomeHeroContentProps) => {
  return (
    <Flex align="flex-start" direction="column">
      <Text
        color="#687258"
        fontSize={{ base: '0.72rem', md: '0.78rem' }}
        fontWeight={750}
        letterSpacing="0.14em"
        textTransform="uppercase"
      >
        {text.heroEyebrow}
      </Text>
      <Text
        as="h1"
        color="#2f3c2f"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize={{ base: '2.4rem', sm: '2.75rem', md: '3.1rem', lg: '3.55rem' }}
        fontWeight={400}
        letterSpacing="-0.035em"
        lineHeight={{ base: 1.04, md: 1 }}
        marginTop={{ base: '16px', md: '14px', lg: '20px' }}
        maxWidth="10.8em"
      >
        {text.heroTitle}
      </Text>
      <Text
        color="#596255"
        fontSize={{ base: '0.98rem', md: '1.06rem' }}
        lineHeight={1.6}
        marginTop={{ base: '22px', md: '16px', lg: '26px' }}
        maxWidth="500px"
      >
        {text.heroSummary}
      </Text>
      <HomeStats stats={stats} />
      <Flex
        align="stretch"
        direction={{ base: 'column', sm: 'row' }}
        flexWrap="wrap"
        gap="10px"
        marginTop={{ base: '28px', md: '22px', lg: '34px' }}
      >
        <Button
          background="#526246"
          borderRadius="10px"
          color="#fffaf1"
          fontSize={{ base: '0.9rem', md: '0.96rem' }}
          fontWeight={720}
          flexShrink={0}
          gap="9px"
          height={{ base: '46px', md: '48px' }}
          padding="0 20px"
          type="button"
          variant="plain"
          onClick={onCollectionOpen}
          _focusVisible={{ boxShadow: '0 0 0 3px rgba(94, 127, 57, 0.3)', outline: 'none' }}
          _hover={{ background: '#3e513d', transform: 'translateY(-1px)' }}
        >
          <PlantCollectionIcon size={22} />
          {text.collectionActionLabel}
          <Text aria-hidden="true" as="span" fontSize="1.05rem">
            →
          </Text>
        </Button>
        <Button
          asChild
          background="rgba(255, 252, 246, 0.48)"
          border="1px solid rgba(82, 98, 70, 0.26)"
          borderRadius="10px"
          color="#43513f"
          fontSize={{ base: '0.9rem', md: '0.96rem' }}
          fontWeight={680}
          flexShrink={0}
          gap="9px"
          height={{ base: '46px', md: '48px' }}
          padding="0 18px"
          variant="plain"
          _focusVisible={{ boxShadow: '0 0 0 3px rgba(94, 127, 57, 0.24)', outline: 'none' }}
          _hover={{
            background: 'rgba(255, 252, 246, 0.78)',
            borderColor: 'rgba(82, 98, 70, 0.42)',
          }}
        >
          <Link to="/care">
            <SmallCanIcon />
            {text.actionLabel}
          </Link>
        </Button>
      </Flex>
    </Flex>
  );
};
