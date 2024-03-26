import React, {createContext, useEffect, useState} from 'react';
import {UserData} from '../../ServicesDB/Users/types';
import {AuthContextProps, AuthProviderProps, signup} from './types';
import auth from '@react-native-firebase/auth';
import {usersManager} from '../../ServicesDB/Users';
import {handleError} from '../../utils/handleErrors';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      console.log("LOGEADo")
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

      const userData = {
        id: userId,
        email,
        fullName,
        profilePicture,
        userName,
      } as UserData;

      await usersManager.create(userData);
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
        updateUserData
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
