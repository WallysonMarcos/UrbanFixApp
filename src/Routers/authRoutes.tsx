import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
 
import SignIn from '../Views/Auth/SignIn';
import SignUp from '../Views/Auth/SignUp';
import Confirm from '../Views/Auth/Confirm';


const AuthStack = createNativeStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <AuthStack.Navigator
      initialRouteName={"SignIn"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name={"SignIn"} component={SignIn} />
      <AuthStack.Screen name={"SignUp"} component={SignUp} />

      <AuthStack.Group>

        <AuthStack.Screen name={"Confirm"} component={Confirm} options={
          { 
            presentation: 'transparentModal',
        }}/>
      </AuthStack.Group>
    </AuthStack.Navigator>
  );
};

export default AuthRoutes;
