import React, { useEffect } from 'react';
import { useNavigate, Outlet, useLocation  } from 'react-router-dom';

import { useAuth } from './AuthContext'; // Import your useAuth hook

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/login");
      }else {
        // If the user is already logged in and the current URL is a non-private route, redirect them to the home page
        if (location.pathname !== '/login' && location.pathname !== '/forget-password') {
          navigate('/');
        }
      }
 },[isAuthenticated,location]);
  return <Outlet />;
};

export default PrivateRoute;
