// eslint-disable-next-line react/jsx-no-constructed-context-values
// @ts-nocheck
import '@/styles/global.css';

import type { AppProps } from 'next/app';
import { useMemo, useState } from 'react';

import type { User } from '@/types/User';

import { AuthContext } from '../context/AuthContext';
// import { useRouter } from 'next/router'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [user, setUser] = useState<User | null>(null);
  // const router = useRouter();

  // api.interceptors.response.use(
  //   (response) => {
  //       return response;
  //   },
  //   (error) => {
  //       if (error.response && error.response.status === 401) {
  //           // Use router.push() to navigate to the login screen
  //           router.push('/login'); // Adjust the route as needed
  //           // Throw an exception to stop further execution
  //           return Promise.reject('Unauthorized');
  //       }
  //       // Handle other errors here
  //       return Promise.reject(error);
  //   }
  // );

  return (
    // @ts-ignore
    <AuthContext.Provider
      value={useMemo(() => ({ user, setUser }), [user, setUser])}
    >
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
};

export default MyApp;
