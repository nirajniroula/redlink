import React, { useState } from 'react';
import { View, SafeAreaView, Button } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { TextInput } from 'react-native';

type ScreenType = { navigation: any; route: any };

const EnterPhoneScreen = ({ navigation }: ScreenType) => {
  // If null, no SMS has been sent
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult>();

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');
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
      setLoading(false);
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
            <Button
              title="Phone Number Sign In"
              onPress={() => signInWithPhoneNumber('+977 1212121212')}
              disabled={loading}
            />
          ) : (
            <>
              <TextInput
                style={{
                  backgroundColor: 'lightgray',
                  width: '100%',
                  marginBottom: 8,
                }}
                value={code}
                onChangeText={(text) => setCode(text)}
                keyboardType="number-pad"
              />
              <Button
                title="Confirm Code"
                onPress={() => confirmCode()}
                disabled={loading}
              />
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
export default EnterPhoneScreen;
