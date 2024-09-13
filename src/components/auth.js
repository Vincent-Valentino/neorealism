import { useContext, useState, useEffect } from 'react';
import { AuthContext } from './authprovider';

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const { Token, setToken, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  if (!setToken || !setIsAuthenticated) {
    throw new Error('AuthContext is not properly initialized.');
  }

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const storedRefreshToken = localStorage.getItem('refreshToken');
        const storedAccessToken = localStorage.getItem('token');

        if (!storedRefreshToken) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        // Attempt to refresh the access token using the refresh token
        const response = await fetch('http://localhost:4000/api/refresh-token', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${storedRefreshToken}`, // Send the refresh token
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('token', data.accessToken); // Store the new access token
          setToken(data.accessToken); // Update context with the new token
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          setToken(null);
          throw new Error('Failed to refresh token: ' + data.message);
        }
      } catch (error) {
        console.error('Access token refresh error:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    refreshAccessToken(); // Attempt to refresh the token on component mount
  }, [setToken, setIsAuthenticated]);

  return { isAuthenticated, loading };
};

export default useAuth;
