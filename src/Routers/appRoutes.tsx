import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../Views/Home';
import NewTicket from '../Views/NewTicket';
import TicketDetail from '../Views/TicketDetail';

import PlaceConfirm from '../Views/NewTicket/PlaceConfirm';

import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
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
          headerTitleStyle: {color: Constants.colorGray,  fontWeight: '400'},
          headerRight: () => (
            <TouchableOpacity onPress={() => handleSignOut()}>
              <Icon name="log-out" size={20} color={Constants.colorError} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => Alert.alert('Aviso','Em desenvolvimento...')}>
              <Icon name="user" size={20} color={Constants.colorGray} />
            </TouchableOpacity>
          ),
        
      }}/>
      <AppStack.Screen name="NewTicket" component={NewTicket}
        options={{ 
          headerShown: true, 
          headerTransparent: true, 
          title:'Nova Solicitação', 
          headerTitleStyle: {color: Constants.colorGray,  fontWeight: '400'}
        }} />
      <AppStack.Screen name="PlaceConfirm" component={PlaceConfirm}
        options={{ 
          headerShown: true, 
          headerTransparent: true, 
          title:'Nova Solicitação', 
          headerTitleStyle: {color: Constants.colorGray,  fontWeight: '400'}
        }} />
      <AppStack.Screen name="TicketDetail" component={TicketDetail}
        options={{ 
          headerShown: true, 
          headerTransparent: true, 
          title:'Ticket Detail', 
          headerTitleStyle: {color: Constants.colorGray,  fontWeight: '400'}
        }} />
    </AppStack.Navigator>
  );
};

export default AppRoutes;
