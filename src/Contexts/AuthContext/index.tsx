import React, {createContext, useEffect, useState} from 'react';
import {UserData} from '../../ServicesDB/Users/types';
import {AuthContextProps, AuthProviderProps, signup} from './types';
import {StringSchema} from 'yup';
import auth from '@react-native-firebase/auth';
import {usersManager} from '../../ServicesDB/Users';

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [userData, setUserData] = useState<UserData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
