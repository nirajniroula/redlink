// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import * as React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { Colors } from '../../utils/colors';
import { Button, Icon, TextInput } from 'react-native-paper';
import { UserContext } from '../../context/UserContext';
import { updateUser } from '../../firebase';
import { AppUser } from '../../context/types';
import DropDownPicker from 'react-native-dropdown-picker';
import { allCountries, bloodGroupsList } from '../../utils/constants';
import { getLocation } from '../../utils/locations';
const EditProfileScreen = () => {
  const { state, dispatch } = React.useContext<any>(UserContext);
  const { user } = state;
  const defaultEditUser = user;
  const [editUser, setEditUser] = React.useState(defaultEditUser);
  const [loading, setLoading] = React.useState(false);
  const [showBloodDropDown, setShowBloodDropDown] = React.useState(false);
  const [showCountryDropDown, setShowCountryDropDown] = React.useState(false);
  const [address, setAddress] = React.useState<string>();
  const [loadingAddress, setLoadingAddress] = React.useState<boolean>(false);

  const areUsersDifferent = (obj1: AppUser, obj2: AppUser): boolean => {
    const keys1 = Object.keys(obj1) as (keyof AppUser)[];
    const keys2 = Object.keys(obj2) as (keyof AppUser)[];

    const allKeys = new Set([...keys1, ...keys2]);

    return Array.from(allKeys).some((key) => obj1[key] !== obj2[key]);
  };

  const onLocationPress = async () => {
    setLoadingAddress(true);
    const geoLoc = await getLocation();
    const displayAddress = `${geoLoc?.address?.city_district}, ${geoLoc?.address?.county}`;
    // setAddress(displayAddress);
    const loc = {
      lat: geoLoc?.lat,
      lon: geoLoc?.lon,
      address: geoLoc?.address,
      displayAddress: displayAddress,
    };

    setEditUser({ ...editUser, location: loc });
    setLoadingAddress(false);
  };

  const onSubmitPress = async () => {
    if (editUser.userId && areUsersDifferent(user, editUser)) {
      setLoading(true);
      console.log('user', editUser);

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
            style={[
              styles.textInput,
              {
                alignItems: 'center',
                justifyContent: 'space-between',
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
              },
            ]}
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

          <TextInput
            label="Location"
            style={styles.textInput}
            value={editUser?.location?.displayAddress}
            left={<TextInput.Icon icon="map-marker" size={20} />}
            disabled={loadingAddress}
            right={
              loadingAddress ? (
                <TextInput.Icon icon="loading" size={20} />
              ) : null
            }
            onPressIn={onLocationPress}
            onChangeText={(text) => {
              setEditUser({
                ...editUser,
                location: { ...editUser?.location, displayAddress: text },
              });
            }}
          />
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
