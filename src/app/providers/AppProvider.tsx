import { ChakraProvider } from '@chakra-ui/react';
import { chakraSystem } from 'src/shared/ui';

interface AppProviderProps {
  readonly children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return <ChakraProvider value={chakraSystem}>{children}</ChakraProvider>;
}
