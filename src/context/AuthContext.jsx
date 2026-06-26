import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/axios';

const AuthContext = createContext(null);

const normalizeUser = (user) => (user ? { ...user, id: user.id || user._id } : null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await api.get('/auth/me');
      setUser(normalizeUser(res.data.user));
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    setUser(normalizeUser(res.data.user));
    return res.data;
  };

  const register = async (name, email, password, photoURL) => {
    const res = await api.post('/auth/register', { name, email, password, photoURL });
    setUser(normalizeUser(res.data.user));
    return res.data;
  };

  const googleLogin = async (credential) => {
    const res = await api.post('/auth/google', { credential });
    setUser(normalizeUser(res.data.user));
    return res.data;
  };

  const logout = async () => {
    await api.post('/auth/logout');
    setUser(null);
  };

  const updateProfile = async (data) => {
    const res = await api.put('/auth/update-profile', data);
    setUser(normalizeUser(res.data.user));
    return res.data;
  };

  const updateUser = (userData) => {
    setUser(normalizeUser(userData));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, googleLogin, logout, updateProfile, updateUser, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
