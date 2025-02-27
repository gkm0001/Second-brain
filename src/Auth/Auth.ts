// Auth.ts
import { atom } from 'recoil';

interface AuthStateType {
  isAuthenticated: boolean;
}

export const AuthState = atom<AuthStateType>({
  key: 'AuthState', // Unique key
  default: {
    isAuthenticated: false
  }
});


 