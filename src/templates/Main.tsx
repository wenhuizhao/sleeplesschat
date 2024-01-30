import Link from 'next/link';
import type { ReactNode } from 'react';
import { useRouter } from 'next/router';

import api from '@/services/api';
import { AppConfig } from '@/utils/AppConfig';

import { useAuth } from '../hooks/useAuth';

type IMainProps = {
  meta?: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  // console.log("Main, user:", user);
  const handleLogout = async () => {
    logout();
    await api.post('/logout');
    router.push("/");
  };
  return (
    <div className="w-full px-1 text-gray-700 antialiased">
      {props.meta}

      <div className="mx-auto max-w-screen-lg">
        <header className="border-b border-neutral-50">
        <div className="flex justify-end">
            <nav>
              <ul className="flex flex-wrap text-xl">
                <li className="mr-2 menu">
                  <Link
                    href="/"
                    className="border-none text-gray-300 hover:text-gray-500"
                  >
                    Home
                  </Link>
                </li>
                <li className="mr-2 menu">
                  <Link
                    href="/about/"
                    className="border-none text-gray-300 hover:text-gray-500"
                  >
                    About
                  </Link>
                </li>
                <li className="mr-2 menu">
                  <Link
                    href="/guestbook/"
                    className="border-none text-gray-300 hover:text-gray-500"
                  >
                    Forum
                  </Link>
                </li>
                <li className="mr-2 menu">
                  <Link
                    href="/blog/"
                    className="border-none text-gray-300 hover:text-gray-500"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </nav>

            <nav>
              <ul className="flex flex-wrap text-xl">
                {user ? (
                  <li className="ml-6 menu">
                    <Link
                      onClick={(_e) => handleLogout()}
                      href="/"
                      className="border-none text-gray-300 hover:text-gray-500"
                    >
                      Logout
                    </Link>
                  </li>
                ) : (
                  <li className="ml-6 menu">
                    <Link
                      href="/login/"
                      className="border-none text-gray-300 hover:text-gray-500"
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

          <div className="pb-32 pt-4">
            <h1 className="text-3xl font-bold text-neutral-200">
              {AppConfig.title}
            </h1>
            
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
