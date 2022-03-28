import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';

import { Login, Register } from '../pages';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Switch>
);

export default Routes;
