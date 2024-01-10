// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import * as React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { Colors } from '../../utils/colors';
import { Button, TextInput } from 'react-native-paper';
import { UserContext } from '../../context/UserContext';
import { Picker } from '@react-native-picker/picker';
import { updateUser } from '../../firebase';
import { AppUser } from '../../context/types';
const EditProfileScreen = () => {
  const { state, dispatch } = React.useContext<any>(UserContext);
  const { user } = state;
  const defaultEditUser = user;
  const [editUser, setEditUser] = React.useState(defaultEditUser);

  const areUsersDifferent = (obj1: AppUser, obj2: AppUser): boolean => {
    const keys1 = Object.keys(obj1) as (keyof AppUser)[];
    const keys2 = Object.keys(obj2) as (keyof AppUser)[];

    const allKeys = new Set([...keys1, ...keys2]);

    return Array.from(allKeys).some((key) => obj1[key] !== obj2[key]);
  };

  const onSubmitPress = async () => {
    console.log('...', user, editUser);
    if (areUsersDifferent(user, editUser)) {
      const res = await updateUser(editUser.userId, editUser);
      if (res) {
        dispatch({ type: 'SET_USER', payload: editUser });
      }
    } else {
      console.log('No update made.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{ flex: 1, padding: 16, backgroundColor: Colors.PAGE_WHITE }}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <TextInput
            label="First name"
            style={styles.textInput}
            value={editUser.firstName}
            onChangeText={(text) =>
              setEditUser({ ...editUser, firstName: text.trim() })
            }
          />
          <TextInput
            label="Last name"
            style={styles.textInput}
            value={editUser.lastName}
            onChangeText={(text) =>
              setEditUser({ ...editUser, lastName: text.trim() })
            }
          />
          <TextInput
            label="Phone number"
            style={styles.textInput}
            value={defaultEditUser.phoneNumber}
            disabled
          />
          <TextInput
            label="Email"
            style={styles.textInput}
            value={editUser.email}
            onChangeText={(text) =>
              setEditUser({ ...editUser, email: text.trim() })
            }
          />
          <Picker
            style={styles.textInput}
            placeholder="Blood Group"
            selectedValue={editUser.bloodGroup}
            onValueChange={(itemValue, itemIndex) =>
              setEditUser({ ...editUser, email: itemValue })
            }
          >
            <Picker.Item label="A+" value="A+" />
            <Picker.Item label="B+" value="B+" />
          </Picker>
        </View>
        <Button mode="contained" onPress={onSubmitPress}>
          Submit
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    marginBottom: 12,
  },
});
export default EditProfileScreen;
