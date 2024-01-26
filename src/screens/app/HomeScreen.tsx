// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import * as React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { Colors } from '../../utils/colors';
import { FAB } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{ flex: 1, padding: 16, backgroundColor: Colors.PAGE_WHITE }}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16,
              color: 'grey',
            }}
          >
            No recent activities!
          </Text>
        </View>
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => navigation.navigate('AddRequest')}
        />
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
  fab: {
    position: 'absolute',
    margin: 24,
    right: 0,
    bottom: 0,
  },
});
export default HomeScreen;
