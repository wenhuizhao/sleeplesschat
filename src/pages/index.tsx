import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { Chat } from '@/components/Chat';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import type { User } from '@/types/User';

import { useAuth } from '../hooks/useAuth';

const Index = () => {
  const { push } = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('jwt');

    // console.log("Index get token from query:", token);
    if (token) {
      const decoded: { uuid: string; name: string; email: string } =
        jwtDecode(token);
      console.log('decoded token:', decoded);
      const user: User = {
        uuid: decoded.uuid,
        name: decoded.name,
        email: decoded.email,
        authToken: token,
      };
      login(user);
      push('/');
    }
  }, []);

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
