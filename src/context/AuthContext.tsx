import { createContext } from 'react';

import type { User } from '@/types/User';

interface AuthContextType {
  user?: User | null;
  setUser: (user: User | null) => void;
  guest?: User;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});
