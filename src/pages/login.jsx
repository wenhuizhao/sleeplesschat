/* eslint-disable import/no-extraneous-dependencies, import/extensions */

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import axios from 'axios';
import { Env } from '../libs/Env.mjs';
import Image from 'next/image'
const googleSignin = "/assets/images/googleSignin.png";

const BACKEND_URL = Env.NEXT_PUBLIC_BACKEND_URL;
export const handleGoogleLogin = (e=null) => {
  console.log('login');
  if (e) {
    e.preventDefault();
  }
  axios
    .get(`${BACKEND_URL}/auth/google`, {
      headers: {
        'Access-Control-Allow-Origin': '* ',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
    .then((res) => {
      window.location.assign(res.data.auth_url);
    })
    .catch((err) => console.log(err));
  console.log(BACKEND_URL);
};

const Login = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const guestUser = () => {
    console.log('logout');
    logout();
    router.push('/');
  };
  return (
    <Main meta={<Meta title="Insomnia Space" description="Say good night to insomnia" />}>
      <p>Login so that I can remember you.</p>
      <button onClick={(e) => handleGoogleLogin(e)} className="login">
        <Image src="/assets/images/googleSignin.png" height={40} width={175}/>
        Log in With Google
      </button>
      <br />
      Or continue use as{' '}
      <Link href="/" onClick={() => guestUser()}>
        Guest User.
      </Link>
    </Main>
  );
};

export default Login;
