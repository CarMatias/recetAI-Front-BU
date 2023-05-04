import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import qs from 'qs';
import React, {createContext, useContext, useState} from 'react';
import Api from '../../../api';
import {delay} from '../../../utils/functions';
import {useGlobalContext} from '../../ui/Splash/Splash';

export interface User {
  id: string;
  token: string;
  first_name: string;
  last_name: string;
  email: string;
  id: string;
}

interface authProviderProps {
  children: React.ReactNode;
}

interface EmailParams {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}
interface AuthContextProps {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  register(params: EmailParams): Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const baseUrl = 'https://recet-ai-back-end.vercel.app/login';

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function useAuth() {
  const user = useContext(AuthContext);
  if (!user) throw new Error('useAuth must be used within an AuthProvider');
  return user;
}

export default function AuthProvider({children}: authProviderProps) {
  const {user: initialUser} = useGlobalContext();
  const [user, setUser] = useState({
    user: initialUser,
    isLoading: false,
    error: null,
  });

  console.log(user.user);

  const login = async (email: string, pass: string) => {
    try {
      setUser({...user, isLoading: true});
      const res = await Api.Auth.login(email, pass);
      await delay(1000);

      if (res?.access_token) {
        const userData = {
          token: res.access_token,
          first_name: res.user?.user_metadata.first_name,
          last_name: res.user?.user_metadata.last_name,
          email: res.user?.email,
          id: res.user?.id,
        };
        setUser({error: null, user: userData, isLoading: false});
        AsyncStorage.setItem('user', JSON.stringify(userData));
      } else if (res === 'Usuario y/o Contraseña invalidos.') {
        setUser({error: res, user: null, isLoading: false});
      } else {
        setUser({error: 'Error desconocido', user: null, isLoading: false});
      }
    } catch (e) {
      console.log('🚀 ~ file: index.tsx ~ line 55 ~ login ~ e', e);
    }
  };

  const register = async (params: EmailParams) => {
    setUser({user: null, isLoading: true, error: null});
    const res = await Api.Auth.signup(params);
    await delay(1000);
    if (res?.access_token) {
      const userData = {
        token: res.access_token,
        first_name: res.user?.user_metadata.first_name,
        last_name: res.user?.user_metadata.last_name,
        email: res.user?.email,
        id: res.user?.id,
      };
      setUser({user: userData, isLoading: false, error: null});
    }
    console.log(res);
  };

  const logout = async () => {
    setUser({user: null, isLoading: false, error: null});
    await AsyncStorage.removeItem('user');
    //TODO: logout from server
  };

  return (
    <AuthContext.Provider
      value={{
        user: user.user,
        register,
        login,
        logout,
        isLoading: user.isLoading,
        error: user.error,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
