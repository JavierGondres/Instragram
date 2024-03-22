import React from 'react';
import {UserData} from '../../ServicesDB/Users/types';

export type AuthContextProps = {
  userData?: UserData;
};

export interface AuthProviderProps {
  children: React.ReactNode;
}
