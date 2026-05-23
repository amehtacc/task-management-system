import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import api from "../api/axios";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children
}) => {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const fetchCurrentUser =
    async () => {
      try {
        const response =
          await api.get(
            "/auth/me"
          );

        setUser(
          response.data.data
        );
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);