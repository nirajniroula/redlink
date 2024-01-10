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
      return { ...userToAdd, userId: generatedUserId };
    } else {
      const userSnapshot = querySnapshot.docs[0].data();
      return { ...userSnapshot };
    }
  } catch (error) {
    console.log('Firestore error:', error);
    return false;
  }
};

export const updateUser = async (userId: string, user: Partial<AppUser>) => {
  try {
    const userToUpdate: Record<string, any> = {};
    Object.entries(user).forEach(([key, value]) => {
      if (value !== undefined) {
        userToUpdate[key] = value;
      }
    });
    // Get the reference to the user document using the provided userId
    const userDocRef = usersRef.doc(userId);

    // Update the user document with the provided data
    await userDocRef.update(userToUpdate);
    return true;
    console.log('User updated successfully.');
  } catch (error) {
    console.error('Error updating user:', error);
    return false;
  }
};

export { addUser };
