import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../Views/Home';
import NewTicket from '../Views/NewTicket';
import PlaceConfirm from '../Views/NewTicket/PlaceConfirm';

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
      <AppStack.Screen name="NewTicket" component={NewTicket} 
                       options={{headerShown: true, headerTransparent: true}}  />
      <AppStack.Screen name="PlaceConfirm" component={PlaceConfirm}
                       options={{headerShown: true, headerTransparent: true}}  />

    </AppStack.Navigator>
  );
};

export default AppRoutes;
