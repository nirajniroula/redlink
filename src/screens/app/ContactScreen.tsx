// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  PermissionsAndroid,
  FlatList,
} from 'react-native';
import { Avatar, ProgressBar, Text } from 'react-native-paper';
import Contacts, { Contact } from 'react-native-contacts';
import {
  getSortedConatcts,
  mapContactsWithBloodGroups,
} from '../../utils/contacts';
import { RLContactType } from '../../context/types';

const ContactsScreen = () => {
  const [contacts, setContacts] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    checkAndRequestPermission();
  }, []);

  const checkAndRequestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts',
          message: 'This app would like to view your contacts.',
          buttonPositive: 'Please accept bare mortal',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        doBackgroundTasks();
      } else {
        console.warn('Contacts permission denied');
      }
    } catch (error) {
      console.error('Permission error:', error);
    }
  };

  const doBackgroundTasks = async () => {
    setLoading(true);
    const deviceContacts = await Contacts.getAllWithoutPhotos();
    const sortedDeviceContacts = getSortedConatcts(deviceContacts);
    setContacts(sortedDeviceContacts);
    const updatedContacts = await mapContactsWithBloodGroups(
      sortedDeviceContacts,
    );
    const sortedUpdatedContacts = getSortedConatcts(updatedContacts);
    setContacts(sortedUpdatedContacts);
    setLoading(false);
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: RLContactType;
    index: number;
  }) => (
    <View
      id={`contact-${index}`}
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Avatar.Text
        size={32}
        label={item?.bloodGroup || '?'}
        color="white"
        style={{ backgroundColor: 'tomato' }}
        labelStyle={{ fontSize: 12 }}
      />
      <View
        style={{
          display: 'flex',
          flex: 1,
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          {item.displayName}
        </Text>

        <Text>{item.phoneNumbers[0]?.number}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ProgressBar indeterminate color={'tomato'} visible={loading} />
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FlatList
            style={{ width: '100%' }}
            data={contacts}
            keyExtractor={(item) => item.recordID}
            renderItem={renderItem}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: 'gray', borderRadius: 5, margin: 5 },
  inputDes: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    margin: 5,
    height: 70,
  },
  dropdown2BtnStyle: {
    width: '100%',
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    margin: 5,
  },
  dropdown2BtnTxtStyle: {
    color: '#444',
    textAlign: 'left',
  },
  dropdown2DropdownStyle: {
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});
export default ContactsScreen;
