import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../Views/Home';
import NewTicket from '../Views/NewTicket';
import PlaceConfirm from '../Views/NewTicket/PlaceConfirm';

import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../Context/Auth';
import Constants from '../Constants';
import { Alert } from 'react-native';

const AppStack = createNativeStackNavigator();

const AppRoutes: React.FC = () => {

  const { handleSignOut } = useAuth();

  return (
    <AppStack.Navigator
      initialRouteName={"Home"}
    >
      <AppStack.Screen name="Home" component={Home} options={{
          title: 'Minhas Solicitações', 
          headerTintColor: Constants.colorGray,
          headerRight: () => (
            <TouchableOpacity onPress={() => handleSignOut()}>
              <Icon name="logout" size={25} color={Constants.colorError} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => Alert.alert('Aviso','Em desenvolvimento...')}>
              <Icon name="person" size={25} color={Constants.colorPrimary} />
            </TouchableOpacity>
          ),
        
      }}/>
      <AppStack.Screen name="NewTicket" component={NewTicket}
        options={{ headerShown: true, headerTransparent: true }} />
      <AppStack.Screen name="PlaceConfirm" component={PlaceConfirm}
        options={{ headerShown: true, headerTransparent: true }} />

    </AppStack.Navigator>
  );
};

export default AppRoutes;
