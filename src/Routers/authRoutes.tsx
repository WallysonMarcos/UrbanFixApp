import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
 
import SignIn from '../Views/Auth/SignIn';

const Auth = createNativeStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Auth.Screen name="SignIn" component={SignIn}  />
    </Auth.Navigator>
  );
};

export default AuthRoutes;
