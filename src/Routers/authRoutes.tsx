import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
 
import SignIn from '../Views/Auth/SignIn';
import SignUp from '../Views/Auth/SignUp';

const AuthStack = createNativeStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <AuthStack.Navigator
      initialRouteName={"SignIn"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name={"SignIn"} component={SignIn} options={{}}  />
      <AuthStack.Screen name={"SignUp"} component={SignUp} options={{}}  />
    </AuthStack.Navigator>
  );
};

export default AuthRoutes;
