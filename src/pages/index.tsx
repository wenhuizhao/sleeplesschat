import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { Chat } from '@/components/Chat';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import type { User } from '@/types/User';

import { useAuth } from '../hooks/useAuth';
import api from '@/services/api';

const Index = () => {
  const { push } = useRouter();
  const { login } = useAuth();
  
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('jwt');
    const newUser = query.get('new_user');

    const loginUser = async (user: User) => {
      const guestItem = sessionStorage.getItem('guest');
      console.log("logUser user:", user, " guestItem:", guestItem, " newUser:", newUser);
      if (guestItem && newUser === 'true') {
        const guest  = JSON.parse(guestItem);
        console.log("syncGuestToUser");
        login(user);
        await syncGuestToUser(guest.name);
        push('/');  
      } else {
        login(user);
        push('/');
      }
      await syncTimezoneToUser();
    }
    // console.log("Index get token from query:", token);
    if (token) {
      const decoded: { uuid: string; name: string; email: string; picture: string } =
        jwtDecode(token);
      console.log('decoded token:', decoded);
      const user: User = {
        uuid: decoded.uuid,
        name: decoded.name,
        email: decoded.email,
        authToken: token,
        avatar: decoded.picture,
      };
      loginUser(user);
      
    }
  }, []);

  const syncGuestToUser = async(guestName: string) => {
    await api.post('/sync_guest_user',
      {
        guest: guestName,
      },
    );
  } 

  const syncTimezoneToUser = async() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    await api.post('/sync_timezone_user', 
      {
        timezone: timezone
      },
    );
  }


  return (
    <Main
      meta={
        <Meta
          title="Insomnia Space"
          description="Chatbot to help you say goodnight to insomnia"
        />
      }
    >
      <Chat />
      <p />
    </Main>
  );
};

export default Index;
