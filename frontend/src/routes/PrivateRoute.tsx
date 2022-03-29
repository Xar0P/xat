import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectToken } from '../store/modules/Auth/reducer';

const PrivateRoute: React.FC = () => {
  const isLoggedIn = useSelector(selectToken);
  const location = useLocation();

  if (!isLoggedIn) {
    return (
      <Navigate to="/login/" replace state={{ prevPath: location.pathname }} />
    );
  }

  return <Outlet />;
};

export default PrivateRoute;
