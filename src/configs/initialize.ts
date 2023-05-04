import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from '../components/providers/AuthProvider';

export type InitialSettings = {
  user: User | null;
  isFirstUse: boolean;
};

export async function initialize(): Promise<InitialSettings> {
  const [user, isFirstUse] = await Promise.all([
    getUserFromStorage(),
    getIsFirstUseFromStorage(),
  ]);
  return {user, isFirstUse};
}

async function getUserFromStorage(): Promise<User | null> {
  return AsyncStorage.getItem('user').then(user => {
    if (user) {
      return JSON.parse(user);
    }
    return null;
  });
}

async function getIsFirstUseFromStorage(): Promise<boolean> {
  return AsyncStorage.getItem('isFirstUse').then(isFirstUse => {
    if (isFirstUse) {
      return JSON.parse(isFirstUse) as boolean;
    }
    return true;
  });
}

export async function setIsFirstUseToStorage(): Promise<void> {
  return AsyncStorage.setItem('isFirstUse', 'false');
}
