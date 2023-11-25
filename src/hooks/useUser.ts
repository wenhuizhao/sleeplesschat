import { useContext } from 'react';

import api from '@/services/api';
import type { User } from '@/types/User';

import { AuthContext } from '../context/AuthContext';
import { useLocalStorage } from './useLocalStorage';

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setItem } = useLocalStorage();

  const addUser = (userAdded: User) => {
    console.log('useUser, addUser user:', userAdded);
    setUser(userAdded);
    setItem('user', JSON.stringify(userAdded));
    api.defaults.headers.Authorization = `Bearer ${userAdded.authToken}`;
  };

  const removeUser = () => {
    // console.log("removeUser");
    setUser(null);
    setItem('user', '');
    api.defaults.headers.Authorization = '';
  };

  return { user, addUser, removeUser };
};
