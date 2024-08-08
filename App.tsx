import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/presentation/navigators/StackNavigator';

import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';

export default () => {
  return <PaperProvider>
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  </PaperProvider>
  
}