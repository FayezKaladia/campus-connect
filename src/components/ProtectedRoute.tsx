import { useState, useEffect } from 'react';
import AdminLogin from '@/pages/AdminLogin';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on mount
    const adminAuth = localStorage.getItem('adminAuth');
    const authenticated = adminAuth ? JSON.parse(adminAuth).isAuthenticated : false;
    setIsAuthenticated(authenticated);
    setIsLoading(false);

    // Listen for custom auth changes (same window)
    const handleAuthChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      setIsAuthenticated(customEvent.detail?.isAuthenticated || false);
    };

    // Listen for storage changes (other windows)
    const handleStorageChange = () => {
      const updatedAuth = localStorage.getItem('adminAuth');
      const updated = updatedAuth ? JSON.parse(updatedAuth).isAuthenticated : false;
      setIsAuthenticated(updated);
    };

    window.addEventListener('authChanged', handleAuthChange);
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('authChanged', handleAuthChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <>{children}</>;
}
