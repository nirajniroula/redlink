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
import { Text } from 'react-native-paper';
import Contacts from 'react-native-contacts';
const ContactsScreen = () => {
  const [contacts, setContacts] = useState();

  useEffect(() => {
    if (PermissionsAndroid.PERMISSIONS.READ_CONTACTS !== 'granted') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal',
      })
        .then((res) => {
          console.log('Permission: ', res);
          fetchAllContacts();
        })
        .catch((error) => {
          console.error('Permission error: ', error);
        });
    } else {
      fetchAllContacts();
    }
  }, []);

  const fetchAllContacts = () => {
    Contacts.getAll()
      .then((contacts) => {
        // work with contacts
        const sortedContacts = getSortedConatcts(contacts);
        setContacts(sortedContacts);
        console.log(sortedContacts.length);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getSortedConatcts = (phoneContacts) => {
    const sortedContacts = phoneContacts.sort((a, b) => {
      const nameA = a.displayName.toUpperCase(); // ignore case
      const nameB = b.displayName.toUpperCase(); // ignore case

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0; // names must be equal
    });
    return sortedContacts;
  };

  const renderItem = ({ item }) => (
    <View
      style={{
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
  );

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
