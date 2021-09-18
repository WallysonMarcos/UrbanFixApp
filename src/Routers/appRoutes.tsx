import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../Views/Home';

const AppStack = createNativeStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <AppStack.Navigator
      initialRouteName={"Home"}
      screenOptions={{
        headerShown: false 
      }}
    >
      <AppStack.Screen name="Home" component={Home}  />
    </AppStack.Navigator>
  );
};

export default AppRoutes;
