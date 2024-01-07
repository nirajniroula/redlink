// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import * as React from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/home/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import SettingsScreen from './src/screens/profile/ProfileScreen';
import ProfileScreen from './src/screens/profile/SettingsScreen';
import { Colors } from './src/utils/colors';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import AddNewScreen from './src/screens/contact/Contacts';
import Contacts from './src/screens/contact/Contacts';
import { ThemeProvider } from '@rneui/themed';
import { theme } from './src/config/theme';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <StatusBar backgroundColor={'tomato'} />
          <NavigationContainer>
            <Tab.Navigator
              initialRouteName="Feed"
              screenOptions={({ route }) => ({
                headerStyle: { backgroundColor: 'tomato' },
                tabBarStyle: {
                  backgroundColor: Colors.PAGE_WHITE,
                  borderTopWidth: 0,
                  elevation: 0,
                },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' },
                tabBarActiveBackgroundColor: Colors.BOTTOM_TAB_BAR_BG,
                tabBarInactiveBackgroundColor: Colors.BOTTOM_TAB_BAR_BG,
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  if (route.name === 'HomeStack') {
                    iconName = focused ? 'home' : 'home-outline';
                  } else if (route.name === 'ProfileStack') {
                    iconName = focused
                      ? 'account-circle'
                      : 'account-circle-outline';
                  } else if (route.name === 'AddNew') {
                    iconName = focused
                      ? 'account-group'
                      : 'account-group-outline';
                  }
                  return (
                    <MaterialCommunityIcons
                      name={iconName}
                      size={size}
                      color={color}
                    />
                  );
                },
              })}
            >
              <Tab.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                  tabBarLabel: 'Home',
                  title: 'Home',
                }}
              />

              <Tab.Screen
                name="AddNew"
                component={Contacts}
                options={{
                  tabBarLabel: 'Contacts',
                  title: 'Contacts',
                }}
                // options={{
                //   tabBarButton: (props) => (
                //     <TabFloatButton bgColor={Colors.BOTTOM_TAB_BAR_BG} {...props} />
                //   ),
                // }}
              />

              <Tab.Screen
                name="ProfileStack"
                component={ProfileStack}
                options={{
                  tabBarLabel: 'Profile',
                  title: 'Profile',
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
export default App;
