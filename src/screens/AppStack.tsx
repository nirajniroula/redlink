import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../utils/colors';
import {
  ContactScreen,
  HomeScreen,
  ProfileScreen,
  SettingsScreen,
} from './app';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AppStack = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function HomeStack() {
    return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    );
  }

  function ProfileStack() {
    return (
      <Stack.Navigator
        initialRouteName="Profile"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <>
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
            let iconName = '';
            if (route.name === 'HomeStack') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'ProfileStack') {
              iconName = focused ? 'account-circle' : 'account-circle-outline';
            } else if (route.name === 'AddNew') {
              iconName = focused ? 'account-group' : 'account-group-outline';
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
          component={ContactScreen}
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
    </>
  );
};

export default AppStack;
