'use client';

import { useEffect, useState } from 'react';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { jwtDecode } from 'jwt-decode';
import type { User } from '@/types/User';

import { useLocalStorage } from './useLocalStorage';
import { useUser } from './useUser';

export const useAuth = () => {
  const { user, addUser, removeUser } = useUser();
  const { getItem } = useLocalStorage();
  const [guest, setGuest] = useState<User | null>();

  const loadOrCreateGuest = () => {
    const guestItem = sessionStorage.getItem('guest');
    if (guestItem) {
      setGuest(JSON.parse(guestItem));
    } else {
      const guestUser = {
        uuid: uuidv4(),
        name: `guest-${Math.floor(Math.random() * 1000000)}`,
      };
      setGuest(guestUser);
      sessionStorage.setItem('guest', JSON.stringify(guestUser));
    }
  };

  useEffect(() => {
    const userData = getItem('user');
    // console.log("useAuth useeffect user:", user);
    if (userData) {
      const userLoaded = JSON.parse(userData);
      const decoded = jwtDecode(userLoaded.authToken)
      if(decoded && decoded.exp && decoded.exp * 1000 < Date.now()) {
        removeUser();
      } else {
        addUser(userLoaded);
      }
    } else {
      loadOrCreateGuest();
    }
  }, []);

  const login = (loginUser: User) => {
    // console.log("useAuth login user:", user);
    addUser(loginUser);
    setGuest(null);
  };

  const logout = () => {
    // console.log("logout in useAuth");
    removeUser();
    loadOrCreateGuest();
  };
  return { user, login, logout, guest };
};
