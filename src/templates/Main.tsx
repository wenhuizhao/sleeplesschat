import Link from 'next/link';
import type { ReactNode } from 'react';

import api from '@/services/api';
import { AppConfig } from '@/utils/AppConfig';

import { useAuth } from '../hooks/useAuth';

type IMainProps = {
  meta?: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const { user, logout } = useAuth();
  // console.log("Main, user:", user);
  const handleLogout = async () => {
    logout();
    await api.post('/logout');
  };
  return (
    <div className="w-full px-1 text-gray-700 antialiased">
      {props.meta}

      <div className="mx-auto max-w-screen-md">
        <header className="border-b border-gray-300">
          <div className="pb-8 pt-16">
            <h1 className="text-3xl font-bold text-gray-900">
              {AppConfig.title}
            </h1>
            <h2 className="text-xl">{AppConfig.description}</h2>
          </div>

          <div className="flex justify-between">
            <nav>
              <ul className="flex flex-wrap text-xl">
                <li className="mr-6">
                  <Link
                    href="/"
                    className="border-none text-gray-700 hover:text-gray-900"
                  >
                    Home
                  </Link>
                </li>
                <li className="mr-6">
                  <Link
                    href="/about/"
                    className="border-none text-gray-700 hover:text-gray-900"
                  >
                    About
                  </Link>
                </li>
                <li className="mr-6">
                  <Link
                    href="/guestbook/"
                    className="border-none text-gray-700 hover:text-gray-900"
                  >
                    Forum
                  </Link>
                </li>
                <li className="mr-6">
                  <Link
                    href="/blog/"
                    className="border-none text-gray-700 hover:text-gray-900"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </nav>

            <nav>
              <ul className="flex flex-wrap text-xl">
                {user ? (
                  <li className="mr-6">
                    <Link
                      onClick={(_e) => handleLogout()}
                      href="/"
                      className="border-none text-gray-700 hover:text-gray-900"
                    >
                      Logout
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link
                      href="/login/"
                      className="border-none text-gray-700 hover:text-gray-900"
                    >
                      Login
                    </Link>
                  </li>
                )}
                {/* { !user &&  
                <li className="mr-6">
                  <Link
                    href="/sign-up/"
                    className="border-none text-gray-700 hover:text-gray-900"
                  >
                    Sign up
                  </Link>
                </li>
              } */}
              </ul>
            </nav>
          </div>
        </header>

        <main className="content py-5 text-xl">{props.children}</main>

        <footer className="border-t border-gray-300 py-8 text-center text-sm">
          © Copyright {new Date().getFullYear()} {AppConfig.title}.
        </footer>
      </div>
    </div>
  );
};

export { Main };
