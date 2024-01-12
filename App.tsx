// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import * as React from 'react';
import { PaperProvider } from 'react-native-paper';
import { theme } from './src/config/theme';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { UserProvider } from './src/context/UserContext';
import MainScreen from './src/screens/MainScreen';
import Geolocation from '@react-native-community/geolocation';

const queryClient = new QueryClient();
Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
});
function App() {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={theme}>
          <MainScreen />
        </PaperProvider>
      </QueryClientProvider>
    </UserProvider>
  );
}
export default App;
