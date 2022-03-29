import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';

import { Login, Register } from '../pages';
import PrivateRoute from './PrivateRoute';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" element={<PrivateRoute />}>
      <Route path="/" element={<p>Opa</p>} />
    </Route>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Switch>
);

export default Routes;
