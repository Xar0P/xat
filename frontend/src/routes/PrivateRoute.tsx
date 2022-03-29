import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute: React.FC = () => {
  const isLoggedIn = useSelector<any>((state) => state.userReducer.token);
  const location = useLocation();

  if (!isLoggedIn) {
    return (
      <Navigate to="/login/" replace state={{ prevPath: location.pathname }} />
    );
  }

  return <Outlet />;
};

export default PrivateRoute;
