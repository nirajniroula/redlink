// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import { Button } from '@rneui/base';
import * as React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import auth from '@react-native-firebase/auth';

const ProfileScreen = ({ route, navigation }) => {
  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button onPress={signOut}>Log out</Button>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'grey',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});
export default ProfileScreen;
