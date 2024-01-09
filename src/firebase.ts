import firestore from '@react-native-firebase/firestore';
import { AppUser } from './context/types';

const usersRef = firestore().collection('users');
const eventsRef = firestore().collection('events');
const requestsRef = firestore().collection('requests');
const commentsRef = firestore().collection('comments');

const addUser = async (user: { phoneNumber: string }) => {
  try {
    const querySnapshot = await usersRef
      .where('phoneNumber', '==', user.phoneNumber)
      .get();

    if (querySnapshot.empty) {
      const userToAdd: Record<string, any> = {};
      Object.entries(user).forEach(([key, value]) => {
        if (value !== undefined) {
          userToAdd[key] = value;
        }
      });

      const userDocRef = await usersRef.add(userToAdd);
      const generatedUserId = userDocRef.id;
      console.log('User added successfully.');
      return generatedUserId;
    } else {
      const userId = querySnapshot.docs[0].id;
      console.log('User already exists.');
      return userId;
    }
  } catch (error) {
    console.log('Firestore error:', error);
    return false;
  }
};

export { addUser };
