import React from 'react';
import { View, StatusBar, Text, Image, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './Context/Auth';
import { TicketProvider } from './Context/Ticket';

import Routes from './Routers'; 

const App: React.FC = () => {

  return (
    < NavigationContainer >
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor='transparent' />
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <AuthProvider>
          <TicketProvider>
            <Routes />
          </TicketProvider>
        </AuthProvider>
      </View>
    </NavigationContainer >
  )
};

export default App;