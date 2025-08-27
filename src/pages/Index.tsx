import { Navigate } from 'react-router-dom';

const Index = () => {
  // Redirect to login for login-first flow
  return <Navigate to="/login" replace />;
};

export default Index;
