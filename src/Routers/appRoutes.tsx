import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IntroApp from '../Views/Intro';
import Home from '../Views/Home';
import NewTicket from '../Views/NewTicket';
import TicketDetail from '../Views/TicketDetail';

import PlaceConfirm from '../Views/NewTicket/PlaceConfirm';

import { TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../Context/Auth';
import Constants from '../Constants';
import { Alert, Button, Touchable, TouchableOpacityBase, View } from 'react-native';


const AppStack = createNativeStackNavigator();

type Props = {
  showIntroWelcome: boolean;
}

const AppRoutes: React.FC<Props> = ({showIntroWelcome})  => {

  const { handleSignOut } = useAuth();

  return (
    <AppStack.Navigator
    initialRouteName={ showIntroWelcome ? "IntroApp" : "Home" }
    >
      <AppStack.Screen name={"IntroApp"} component={IntroApp} 
        options={{
          headerShown: false
        }}/>
      <AppStack.Screen name="Home" component={Home} 
        
        options={{ 
          title: 'Minhas Solicitações', 
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: Constants.colorBackground },
          headerTitleStyle: { color: Constants.colorGray, fontWeight: '400' },
          headerRight: () => ( 
              <TouchableOpacity  onPress={() => handleSignOut()}>
                <Icon name="log-out" size={20} color={Constants.colorError} />
              </TouchableOpacity> 
          ),
          headerLeft: () => (
            <TouchableOpacity  onPress={() => Alert.alert('Aviso', 'Em desenvolvimento...')} style={{zIndex: 999}}>
              <Icon name="user" size={20} color={Constants.colorGray} />
            </TouchableOpacity>
          ),
      }} />
      <AppStack.Screen name="NewTicket" component={NewTicket}
        options={{
          headerShown: true,
          headerTransparent: true,
          title:'Nova Solicitação', 
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {color: Constants.colorGray,  fontWeight: '400'}
        }} />
      <AppStack.Screen name="PlaceConfirm" component={PlaceConfirm}
        options={{ 
          headerShown: true, 
          headerTransparent: true, 
          headerShadowVisible: false,
          title:'Nova Solicitação', 
          headerTitleAlign: 'center',
          headerTitleStyle: {color: Constants.colorGray,  fontWeight: '600'}
        }} />
      <AppStack.Screen name="TicketDetail" component={TicketDetail}
        options={{ 
          headerShown: true, 
          headerTransparent: true, 
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          title:'Detalhe da Solicitação', 
          headerTitleStyle: {color: Constants.colorGray,  fontWeight: '400'}
        }} />
    </AppStack.Navigator>
  );
};

export default AppRoutes;
