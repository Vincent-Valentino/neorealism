import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from './auth'; // Ensure this hook handles the authentication state correctly
import Loading from '../utilities/loading';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
    <div>
      <Loading/>
    </div>);
  }

  if (!isAuthenticated) {
    // Redirect them to the login page, but save the current location they were trying to go to
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <div>
      {element}
    </div>
  );
};

export default ProtectedRoute;
