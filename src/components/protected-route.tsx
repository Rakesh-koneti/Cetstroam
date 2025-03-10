import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../lib/auth-context';
import { Loader2 } from 'lucide-react';

export function ProtectedRoute() {
  const { isAuthenticated, isInitialized } = useAuth();
  const location = useLocation();

  // Show loading spinner while auth is initializing
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
} 