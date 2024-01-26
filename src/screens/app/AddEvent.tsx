// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import * as React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { Colors } from '../../utils/colors';


const AddEvent = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{ flex: 1, padding: 16, backgroundColor: Colors.PAGE_WHITE }}
      ></View>
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
  fab: {
    position: 'absolute',
    margin: 24,
    right: 0,
    bottom: 0,
  },
});
export default AddEvent;
