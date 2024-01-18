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
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');

  const [loading, setLoading] = useState(false);

  // Handle the button press
  async function signInWithPhoneNumber() {
    if (phone) {
      console.log('phone', phone);
      try {
        setLoading(true);
        const confirmation = await auth().signInWithPhoneNumber(`+977${phone}`);
        setConfirm(confirmation);
        setLoading(false);
      } catch (err) {
        console.log('Auth error:', err);
        setLoading(false);
      }
    }
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
                left={<TextInput.Affix text="+977 " />}
                value={phone} //Test firebase phone number
                label="Phone number"
                style={{ width: '100%', marginBottom: 16 }}
                onChangeText={(text) => setPhone(text)}
              />
              <Button
                onPress={signInWithPhoneNumber}
                disabled={loading}
                mode="outlined"
                loading={loading}
              >
                Continue
              </Button>
            </>
          ) : (
            <>
              <TextInput
                label="OTP code"
                value={code}
                onChangeText={(text) => setCode(text)}
                keyboardType="number-pad"
                style={{ width: '100%', marginBottom: 16 }}
              />

              <Button
                onPress={() => confirmCode()}
                disabled={loading}
                mode="outlined"
                loading={loading}
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
