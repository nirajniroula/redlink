// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { QueryClient } from '@tanstack/react-query';
import auth from '@react-native-firebase/auth';
import { UserContext } from '../context/UserContext';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import { addUser } from '../firebase';

const queryClient = new QueryClient();

function MainScreen() {
  const { state, dispatch } = React.useContext<any>(UserContext);

  // Handle user state changes
  async function onAuthStateChanged(user: any) {
    if (user) {
      const appUser = { phoneNumber: user.phoneNumber as string };
      const res = await addUser(appUser);
      if (res) {
        dispatch({ type: 'SET_USER', payload: { ...appUser, userId: res } });
      }
    } else {
      dispatch({ type: 'CLEAR_USER' });
    }
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={'tomato'} />
      <NavigationContainer>
        {state?.user ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
export default MainScreen;
