import React, { useState } from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { TextInput, Button } from 'react-native-paper';
type ScreenType = { navigation: any; route: any };

const EnterPhoneScreen = ({ navigation }: ScreenType) => {
  // If null, no SMS has been sent
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult>();

  // verification code (Test OTP - One-Time-Passcode)
  const [code, setCode] = useState('222222');
  const [loading, setLoading] = useState(false);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber: string) {
    setLoading(true);
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
    setLoading(false);
  }

  async function confirmCode() {
    try {
      setLoading(true);
      await confirm?.confirm(code);
    } catch (error) {
      setLoading(false);
      console.log('Invalid code.');
    }
  }

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
          {!confirm ? (
            <>
              <TextInput
                value="+977 1212121212" //Test firebase phone number
                disabled
                label="Phone number"
                style={{ width: '100%', marginBottom: 16 }}
              />
              <Button
                onPress={() => signInWithPhoneNumber('+977 1212121212')}
                disabled={loading}
                mode="outlined"
              >
                Continue
              </Button>
            </>
          ) : (
            <>
              <TextInput
                label="OTP code"
                value={code}
                disabled
                onChangeText={(text) => setCode(text)}
                keyboardType="number-pad"
                style={{ width: '100%', marginBottom: 16 }}
              />

              <Button
                onPress={() => confirmCode()}
                disabled={loading}
                mode="outlined"
              >
                Confirm
              </Button>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
export default EnterPhoneScreen;
