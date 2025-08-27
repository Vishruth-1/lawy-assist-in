import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const NotFound = () => {
  const { isAuthenticated } = useAuth();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Page Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="space-x-4">
          <a 
            href="/dashboard" 
            className="btn-legal-primary inline-flex items-center px-6 py-3 rounded-xl text-white font-medium hover:scale-105 transition-transform"
          >
            Return to Dashboard
          </a>
          <a 
            href="/ai-legal-search" 
            className="btn-legal-secondary inline-flex items-center px-6 py-3 rounded-xl font-medium hover:scale-105 transition-transform"
          >
            Start Legal Search
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
