import { Box, Heading, Text } from '@chakra-ui/react';

// Plain presentational placeholder: no ViewModel or DataSource yet. Proves
// the SSR/build pipeline works end to end.
export function HomePage() {
  return (
    <Box maxW="640px" mx="auto" px="4" py="12">
      <Heading as="h1" mb="2" size="xl">
        Flowers frontend
      </Heading>
      <Text color="gray.600">Bootstrap skeleton. Product concept not yet decided.</Text>
    </Box>
  );
}
