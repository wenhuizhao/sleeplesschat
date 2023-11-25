/* eslint-disable import/no-extraneous-dependencies, import/extensions */

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import axios from 'axios';
import { Env } from '../libs/Env.mjs';

const Login = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const BACKEND_URL = Env.NEXT_PUBLIC_BACKEND_URL;
  const handleLogin = (e) => {
    console.log('login');
    e.preventDefault();
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
  const guestUser = () => {
    console.log('logout');
    logout();
    router.push('/');
  };
  return (
    <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
      <p>Login so that I can remember you.</p>
      <button onClick={(e) => handleLogin(e)} className="login">
        <img
          style={{ width: '50px', height: '50px', paddingTop: '10px' }}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
          alt="Google Logo"
        />
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
