import firestore from '@react-native-firebase/firestore';
import {Collections} from '../../enums/collectionType/collectionTypeEnum';
import {UserData} from './types';

class Users {
  async create(
    userData: UserData,
    // callbackError: (error: any, customMessage?: string) => void,
  ) {
    try {
      const usersRef = firestore().collection(Collections.Users);
      await usersRef.doc(userData.id).set(userData);
      console.log('User data saved to Firestore successfully');
    } catch (error) {
    //   callbackError(error);
    }
  }
}

export const usersManager = new Users();
