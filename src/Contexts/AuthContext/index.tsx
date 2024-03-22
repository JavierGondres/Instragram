import React, {createContext, useEffect, useState} from 'react';
import {UserData} from '../../ServicesDB/Users/types';
import {AuthContextProps, AuthProviderProps} from './types';

const AuthContext = createContext<AuthContextProps>({});

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [userData, setUserData] = useState<UserData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <AuthContext.Provider
      value={{
        userData,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
