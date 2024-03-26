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
  const [accounts, setAccounts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          const result = await usersManager.get(
            (JSON.parse(storedUserData) as UserData).id,
          );
          if (result) {
            setUserData(result);
            const savedAccounts = await loadSavedAccounts();
            if (savedAccounts) setAccounts(savedAccounts);
          }
        }
      } catch (error) {
        console.error('Error al checkUserAuthentication: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserAuthentication();
  }, []);

  const updateUserData = async (userData: UserData) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      setUserData(prevData => ({...prevData, ...userData}));
    } catch (error) {
      handleError('Hubo un error al actualizar la información del usuario.');
    }
  };

  const loadSavedAccounts = async (): Promise<string[] | null> => {
    try {
      const storedAccounts = await AsyncStorage.getItem('accounts');
      if (!storedAccounts) return null;
      const newStoredAccounts = JSON.parse(storedAccounts) as string[];
      return Array.isArray(newStoredAccounts) ? newStoredAccounts : [];
    } catch (error) {
      console.error('Hubo un error en loadSavedAccounts', error);
      throw error;
    }
  };

  const saveAccounts = async (id: string) => {
    try {
      const storedAccounts = await AsyncStorage.getItem('accounts');
      let newStoredAccounts: string[] = [];
      if (storedAccounts) {
        newStoredAccounts = JSON.parse(storedAccounts) as string[];
        if (!Array.isArray(newStoredAccounts)) newStoredAccounts = [];
      }
      const accountIdIndex = newStoredAccounts.findIndex(
        account => account === id,
      );
      if (accountIdIndex === -1) {
        console.log('No existe la cuenta, así que se agrega');
        newStoredAccounts.push(id);
        await AsyncStorage.setItem(
          'accounts',
          JSON.stringify(newStoredAccounts),
        );
        setAccounts(newStoredAccounts);
      } else {
        console.log('La cuenta ya existe');
      }
    } catch (error) {
      console.error('Hubo un error en saveAccounts', error);
      throw error;
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
      await saveAccounts(user.id);
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
      handleError(
        'Error al tratar de registrarse, vuelve a verificar tus campos',
      );
    } finally {
      setIsLoading(false);
    }
  };

  console.log('User: ', userData?.userName);
  console.log('Cuentas: ', accounts);

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
