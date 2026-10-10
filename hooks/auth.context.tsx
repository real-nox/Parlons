import { createContext, useContext } from "react";

export type AuthData = {
  claims?: Record<string, any> | null;
  profile?: any | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  setProfile: (profile: any) => void;
};

export const AuthContext = createContext<AuthData>({
  claims: undefined,
  profile: undefined,
  isLoading: true,
  isLoggedIn: false,
  setProfile: () => {},
});

export const useAuthContext = () => useContext(AuthContext);
