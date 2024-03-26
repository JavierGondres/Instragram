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
  const [savedAccounts, setSavedAccounts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /*
  Se ejecuta el autoLogin si la data del usuario se encuentra en el storage y si es así
  también se llaman las cuentas con las cuales ha iniciado sesión el usuario desde el
  storage
  */
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
            if (savedAccounts) setSavedAccounts(savedAccounts);
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

  //Se actualiza la data del usuario en el storage
  const updateUserData = async (userData: UserData) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      setUserData(prevData => ({...prevData, ...userData}));
    } catch (error) {
      handleError('Hubo un error al actualizar la información del usuario.');
    }
  };

  //Se cargan las cuentas guardadas en el storage
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

  //Se guardan los id de los usuarios con las cuales se inicia sesion
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
        setSavedAccounts(newStoredAccounts);
      } else {
        console.log('La cuenta ya existe');
      }
    } catch (error) {
      console.error('Hubo un error en saveAccounts', error);
      throw error;
    }
  };

  /*
  Incia sesion en la app, también se actualiza la data del usuario en el storage
  y se agrega las cuentas que se iniciaron sesión en el storage. 
  */
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

  /*
  Se registran los usuarios
  */
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

  //Cierra sesion la cuenta del usuario y borra la data del usuario en el storage
  const signOut = async () => {
    setIsLoading(true);
    try {
      await auth().signOut();
      await AsyncStorage.removeItem('userData');
      setUserData(undefined);
    } catch (error) {
      console.error('Error in signOut: ', error);
      handleError('Error al cerrar sesión. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  console.log('User: ', userData?.userName);
  console.log('Cuentas: ', savedAccounts);

  return (
    <AuthContext.Provider
      value={{
        userData,
        savedAccounts,
        isLoading,
        signUp,
        signIn,
        signOut,
        updateUserData,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
