import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StackNavigator } from './src/presentation/navigators/StackNavigator';
import { ThemeProvider } from './src/presentation/providers/ThemeProvider';

import 'react-native-gesture-handler';


// Create a client
const queryClient = new QueryClient()

export default () => {
  return <QueryClientProvider client={ queryClient }>
    <ThemeProvider>
      <StackNavigator />
    </ThemeProvider>
  </QueryClientProvider>
}