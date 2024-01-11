// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import * as React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { Colors } from '../../utils/colors';
import { Button, TextInput } from 'react-native-paper';
import { UserContext } from '../../context/UserContext';
import { updateUser } from '../../firebase';
import { AppUser } from '../../context/types';
import DropDownPicker from 'react-native-dropdown-picker';

const iso3166 = require('iso-3166-1-alpha-2');
const countryEmoji = require('country-emoji');

const allCountries = iso3166.getCodes().map((code: string) => {
  const countryName = iso3166.getCountry(code);
  const flag = countryEmoji.flag(code);
  return { label: `${flag} ${countryName}`, value: code };
});

const bloodGroupsList = [
  {
    label: 'A+',
    value: 'A+',
  },
  {
    label: 'A-',
    value: 'A-',
  },
  {
    label: 'B+',
    value: 'B+',
  },
  {
    label: 'B-',
    value: 'B-',
  },
  {
    label: 'AB+',
    value: 'AB+',
  },
  {
    label: 'AB-',
    value: 'AB-',
  },
  {
    label: 'O+',
    value: 'O+',
  },
  {
    label: 'O-',
    value: 'O-',
  },
];

const EditProfileScreen = () => {
  const { state, dispatch } = React.useContext<any>(UserContext);
  const { user } = state;
  const defaultEditUser = user;
  const [editUser, setEditUser] = React.useState(defaultEditUser);
  const [loading, setLoading] = React.useState(false);
  const [showBloodDropDown, setShowBloodDropDown] = React.useState(false);
  const [showCountryDropDown, setShowCountryDropDown] = React.useState(false);

  const areUsersDifferent = (obj1: AppUser, obj2: AppUser): boolean => {
    const keys1 = Object.keys(obj1) as (keyof AppUser)[];
    const keys2 = Object.keys(obj2) as (keyof AppUser)[];

    const allKeys = new Set([...keys1, ...keys2]);

    return Array.from(allKeys).some((key) => obj1[key] !== obj2[key]);
  };

  const onSubmitPress = async () => {
    console.log('...', user, editUser);
    if (editUser.userId && areUsersDifferent(user, editUser)) {
      setLoading(true);

      const res = await updateUser(editUser.userId, editUser).finally(() => {
        setLoading(false);
      });
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

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
            }}
          >
            <DropDownPicker
              open={showBloodDropDown}
              value={editUser.bloodGroup}
              items={bloodGroupsList}
              setOpen={setShowBloodDropDown}
              setValue={() => {}}
              onSelectItem={(item) => {
                setEditUser({ ...editUser, bloodGroup: item.value });
                console.log('...', item.value);
              }}
              placeholder={'Blood Group'}
              containerStyle={{ width: '36%' }}
            />

            <DropDownPicker
              open={showCountryDropDown}
              value={editUser.country}
              items={allCountries}
              searchable={true}
              setOpen={setShowCountryDropDown}
              setValue={() => {}}
              onSelectItem={(item) => {
                setEditUser({ ...editUser, country: item.value });
              }}
              placeholder={'Country'}
              containerStyle={{ width: '60%' }}
            />
          </View>
        </View>
        <Button
          mode="contained"
          onPress={onSubmitPress}
          loading={loading}
          disabled={loading}
        >
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
