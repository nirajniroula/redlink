import * as React from 'react';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../utils/colors';
import {
  ContactScreen,
  EditProfileScreen,
  HomeScreen,
  ProfileScreen,
  SettingsScreen,
  AddRequest
} from './app';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconButton } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const AppStack = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  const commonScreenOptions = {
    headerShown: true,
    headerStyle: { backgroundColor: 'tomato' },
    headerTintColor: '#fff',
    headerTitleStyle: { fontWeight: 'bold' },
  } as NativeStackNavigationOptions;

  function HomeStack() {
    return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={commonScreenOptions}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddRequest" component={AddRequest} />

      </Stack.Navigator>
    );
  }

  function ContactStack() {
    return (
      <Stack.Navigator
        initialRouteName="Contact"
        screenOptions={commonScreenOptions}
      >
        <Stack.Screen name="Contacts" component={ContactScreen} />
      </Stack.Navigator>
    );
  }

  function ProfileStack() {
    return (
      <Stack.Navigator
        initialRouteName="Profile"
        screenOptions={commonScreenOptions}
      >
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerRight: () => (
              <IconButton icon="cog" iconColor={'white'} onPress={signOut} />
            ),
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{ title: 'Edit profile' }}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <>
      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: Colors.PAGE_WHITE,
            borderTopWidth: 0,
            elevation: 0,
          },

          tabBarActiveBackgroundColor: Colors.BOTTOM_TAB_BAR_BG,
          tabBarInactiveBackgroundColor: Colors.BOTTOM_TAB_BAR_BG,
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
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
          component={ContactStack}
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
