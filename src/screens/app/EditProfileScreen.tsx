// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import * as React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { Colors } from '../../utils/colors';
import { TextInput } from 'react-native-paper';
import { UserContext } from '../../context/UserContext';
const EditProfileScreen = () => {
  const { state } = React.useContext<any>(UserContext);
  const { user } = state;
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
          <TextInput label="First name" style={styles.textInput} />
          <TextInput label="Last name" style={styles.textInput} />
          <TextInput
            label="Phone number"
            style={styles.textInput}
            value={user.phoneNumber}
            disabled
          />
          <TextInput label="Email" style={styles.textInput} />
        </View>
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
