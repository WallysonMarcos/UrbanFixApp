import React from 'react';
import { useAuth } from '../Context/Auth';

import AuthRoutes from './authRoutes';
import AppRoutes from './appRoutes';
 

const Routes: React.FC = () => {

  const { authorized } = useAuth();

  return  authorized ? <AppRoutes /> : <AuthRoutes />;

};

export default Routes;
