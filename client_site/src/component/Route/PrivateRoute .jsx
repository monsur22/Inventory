import React, { useEffect } from 'react';
import { useNavigate, Outlet, useLocation  } from 'react-router-dom';

import { useAuth } from '../AuthContext'; // Import your useAuth hook

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/login");
      }
 },[isAuthenticated]);
  return <Outlet />;
};

export default PrivateRoute;
