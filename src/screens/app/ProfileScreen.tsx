// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import * as React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Text, Button, Avatar } from 'react-native-paper';
import { UserContext } from '../../context/UserContext';

const ProfileScreen = ({ navigation }) => {
  const { state } = React.useContext<any>(UserContext);
  const { user } = state;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Avatar.Text
            size={72}
            label={user.bloodGroup || '?'}
            color="white"
            style={{ backgroundColor: 'tomato' }}
            labelStyle={{fontSize: 24}}
            
          />
          {user.firstName ? (
            <Text
              style={{
                marginTop: 16,
              }}
            >
              {user.firstName} {user.lastName}
            </Text>
          ) : null}
          <Text style={{ marginVertical: 8 }}> {user.phoneNumber}</Text>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('EditProfile')}
          >
            Edit profile
          </Button>
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: 'lightgrey',
              marginVertical: 16,
            }}
          />

          <Text> Activities</Text>
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
