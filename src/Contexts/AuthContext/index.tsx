import React, {createContext, useEffect, useState} from 'react';
import {UserData} from '../../ServicesDB/Users/types';
import {AuthContextProps, AuthProviderProps, signup} from './types';
import auth from '@react-native-firebase/auth';
import {usersManager} from '../../ServicesDB/Users';
import {handleError} from '../../utils/handleErrors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';
import {navigate} from '../../utils/navigationref/rootNavigation';

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [userData, setUserData] = useState<UserData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateUserData = async (userData: UserData) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      setUserData(prevData => ({...prevData, ...userData}));
    } catch (error) {
      handleError('Hubo un error al actualizar la información del usuario.');
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await auth().signInWithEmailAndPassword(email, password);
      const user = await usersManager.get(result.user.uid);

      if (!user) {
        handleError('No se pudo recuperar el usuario');
        return;
      }

      await updateUserData(user);
    } catch (error) {
      console.log('Error in login: ', error);
      handleError();
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async ({
    email,
    fullName,
    password,
    userName,
    profilePicture,
  }: signup) => {
    setIsLoading(true);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      const userId = userCredential?.user?.uid;

      let downloadUrl = null;
      if (profilePicture) {
        const reference = storage().ref(`profilePictures/${userId}`);

        await reference.putFile(profilePicture);
        downloadUrl = await reference.getDownloadURL();
        console.log('Image uploaded to Firebase Storage:', downloadUrl);
      }

      const userData = {
        id: userId,
        email,
        fullName,
        profilePicture: downloadUrl,
        userName,
      } as UserData;

      await usersManager.create(userData);

      await AsyncStorage.removeItem('userData');
      setUserData(undefined);
      navigate('Login');
    } catch (error) {
      console.log('Error in signup: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        isLoading,
        signUp,
        signIn,
        updateUserData,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
