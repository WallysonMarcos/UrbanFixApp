import React from 'react';
import { useAuth } from '../Context/Auth';

import AuthRoutes from './authRoutes';
import AppRoutes from './appRoutes'; 

import { ActivityIndicator } from 'react-native';

const Routes: React.FC = () => {

  const { authorized, initializing, showIntro } = useAuth();
  
  if(!initializing){
    return  authorized ? <AppRoutes showIntroWelcome={showIntro} />  : <AuthRoutes />;
  }
  else {
    return  < ActivityIndicator/>;
  }
 
};

export default Routes;
