import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  org?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('access_token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const isAuthenticated = !!user && !!token;

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('access_token');
      if (savedToken) {
        try {
          // TODO: Replace with actual API call to verify token and get user
          const mockUser: User = {
            id: '1',
            email: 'demo@legalresearch.in',
            name: 'Demo User',
            role: 'user',
            org: 'Legal Research India',
            phone: '+91 9876543210'
          };
          setUser(mockUser);
          setToken(savedToken);
        } catch (error) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      const mockResponse = {
        access_token: 'mock_access_token_' + Date.now(),
        refresh_token: 'mock_refresh_token_' + Date.now(),
        user: {
          id: '1',
          email,
          name: 'Demo User',
          role: 'user',
          org: 'Legal Research India',
          phone: '+91 9876543210'
        }
      };

      localStorage.setItem('access_token', mockResponse.access_token);
      localStorage.setItem('refresh_token', mockResponse.refresh_token);
      setToken(mockResponse.access_token);
      setUser(mockResponse.user);
      
      navigate('/dashboard');
    } catch (error) {
      throw new Error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      const mockResponse = {
        access_token: 'mock_access_token_' + Date.now(),
        refresh_token: 'mock_refresh_token_' + Date.now(),
        user: {
          id: '1',
          email,
          name,
          role: 'user'
        }
      };

      localStorage.setItem('access_token', mockResponse.access_token);
      localStorage.setItem('refresh_token', mockResponse.refresh_token);
      setToken(mockResponse.access_token);
      setUser(mockResponse.user);
      
      navigate('/dashboard');
    } catch (error) {
      throw new Error('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    signup,
    logout,
    loading,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};