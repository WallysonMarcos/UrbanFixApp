import React from 'react';
import { useAuth } from '../Context/Auth';

import AuthRoutes from './authRoutes';
import AppRoutes from './appRoutes';
import { ActivityIndicator } from 'react-native';
import Constants from '../Constants';
 

const Routes: React.FC = () => {

  const { authorized, loading } = useAuth();

  if(loading){
    return (
       <ActivityIndicator animating={loading} size="large" color={Constants.colorPrimary} />
    );
  }else{
    return  authorized ? <AppRoutes /> : <AuthRoutes />;
  }
  

};

export default Routes;
