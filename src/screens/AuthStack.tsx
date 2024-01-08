import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EnterPhoneScreen from './auth/EnterPhoneScreen';

const AuthStack = () => {
  const Stack = createNativeStackNavigator();

  function SignInStack() {
    return (
      <Stack.Navigator
        initialRouteName="EnterPhone"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="EnterPhone" component={EnterPhoneScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <>
      <SignInStack />
    </>
  );
};

export default AuthStack;
