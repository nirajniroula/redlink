// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import * as React from 'react';
import { ThemeProvider } from '@rneui/themed';
import { theme } from './src/config/theme';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { UserProvider } from './src/context/UserContext';
import MainScreen from './src/screens/MainScreen';

const queryClient = new QueryClient();

function App() {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <MainScreen />
        </ThemeProvider>
      </QueryClientProvider>
    </UserProvider>
  );
}
export default App;
