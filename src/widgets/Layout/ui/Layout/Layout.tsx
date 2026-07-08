import { Box } from '@chakra-ui/react';

interface LayoutProps {
  readonly children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      background="linear-gradient(180deg, #f4edde 0%, #ebe0cd 100%)"
      height="100dvh"
      overflow="hidden"
      padding="18px"
      width="100%"
    >
      <Box
        background="#f2eadb"
        borderRadius="18px"
        boxShadow="0 24px 80px rgba(52, 43, 28, 0.16)"
        height="calc(100dvh - 36px)"
        overflow="auto"
        position="relative"
        width="100%"
      >
        {children}
      </Box>
    </Box>
  );
};
