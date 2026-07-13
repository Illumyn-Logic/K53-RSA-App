import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const webStorage = {
  getItem: (key: string) => {
    if (typeof window !== 'undefined') return localStorage.getItem(key);
    return null;
  },
  setItem: (key: string, value: string) => {
    if (typeof window !== 'undefined') localStorage.setItem(key, value);
  },
  removeItem: (key: string) => {
    if (typeof window !== 'undefined') localStorage.removeItem(key);
  },
};

export const storage = Platform.OS === 'web' ? webStorage : AsyncStorage;
