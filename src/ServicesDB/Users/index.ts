import firestore from '@react-native-firebase/firestore';
import {Collections} from '../../enums/collectionType/collectionTypeEnum';
import {UserData} from './types';
import {handleError} from '../../utils/handleErrors';

class Users {
  async create(userData: UserData) {
    try {
      const usersRef = firestore().collection(Collections.Users);
      await usersRef.doc(userData.id).set(userData);
      console.log('User data saved to Firestore successfully');
    } catch (error) {
      console.error('Error in create', error);
      handleError();
      throw error;
    }
  }

  async get(id: string): Promise<UserData | null> {
    try {
      const userDoc = await firestore()
        .collection(Collections.Users)
        .doc(id)
        .get();

      if (!userDoc.exists) return null;
      else return userDoc.data() as UserData;
    } catch (error) {
      console.error('Error in getUser', error);
      handleError();
      throw error;
    }
  }
}

export const usersManager = new Users();
