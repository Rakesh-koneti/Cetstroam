import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AdminSession {
  email: string;
  isAuthenticated: boolean;
  timestamp: string;
}

// Demo credentials
const DEMO_CREDENTIALS = {
  email: 'demo@example.com',
  password: 'demo123'
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const session = localStorage.getItem('adminSession');
        if (session) {
          const parsedSession = JSON.parse(session) as AdminSession;
          const now = new Date().getTime();
          const sessionTime = new Date(parsedSession.timestamp).getTime();
          const isValid = now - sessionTime < 24 * 60 * 60 * 1000; // 24 hours

          if (isValid && parsedSession.isAuthenticated) {
            setIsAuthenticated(true);
            // If on login page and authenticated, redirect to dashboard
            if (location.pathname === '/admin/login') {
              navigate('/admin/dashboard', { replace: true });
            }
          } else {
            localStorage.removeItem('adminSession');
            setIsAuthenticated(false);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        localStorage.removeItem('adminSession');
        setIsAuthenticated(false);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [location.pathname, navigate]);

  // Handle protected route access
  useEffect(() => {
    if (!isInitialized) return;

    const isAdminRoute = location.pathname.startsWith('/admin');
    const isLoginPage = location.pathname === '/admin/login';

    if (!isAuthenticated && isAdminRoute && !isLoginPage) {
      navigate('/admin/login', { state: { from: location }, replace: true });
    }
  }, [isAuthenticated, isInitialized, location, navigate]);

  const login = async (email: string, password: string) => {
    try {
      // Validate inputs
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Check credentials (case-insensitive email comparison)
      if (email.toLowerCase() === DEMO_CREDENTIALS.email.toLowerCase() && 
          password === DEMO_CREDENTIALS.password) {
        // Create session
        const session: AdminSession = {
          email: email.toLowerCase(),
          isAuthenticated: true,
          timestamp: new Date().toISOString()
        };

        // Save session
        localStorage.setItem('adminSession', JSON.stringify(session));
        setIsAuthenticated(true);

        // Navigate to dashboard or intended page
        const from = location.state?.from?.pathname || '/admin/dashboard';
        navigate(from, { replace: true });
      } else {
        throw new Error(`Invalid credentials. Use demo credentials:\nEmail: ${DEMO_CREDENTIALS.email}\nPassword: ${DEMO_CREDENTIALS.password}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('An unexpected error occurred during login');
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('adminSession');
    setIsAuthenticated(false);
    navigate('/admin/login', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isInitialized, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 