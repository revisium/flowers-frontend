import { ChakraProvider } from '@chakra-ui/react';
import { chakraSystem } from 'src/shared/ui';

interface AppProviderProps {
  readonly children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return <ChakraProvider value={chakraSystem}>{children}</ChakraProvider>;
};
