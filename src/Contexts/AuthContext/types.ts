import React from 'react';
import {UserData} from '../../ServicesDB/Users/types';

export type AuthContextProps = {
  userData?: UserData;
  isLoading: boolean;
  signUp: ({
    email,
    fullName,
    password,
    userName,
    profilePicture,
  }: signup) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  updateUserData: (userData: UserData) => Promise<void>;
};

export interface AuthProviderProps {
  children: React.ReactNode;
}

export type signup = {
  email: string;
  userName: string;
  password: string;
  fullName: string;
  profilePicture: string | null;
};
