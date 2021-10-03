import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 

import { AuthProvider } from './Context/Auth';
import { TicketProvider } from './Context/Ticket';

import Routes from './Routers';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="dark-content" />
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <AuthProvider>
        <TicketProvider>
          <Routes />
        </TicketProvider>
      </AuthProvider>
    </View>
  </NavigationContainer>
);

export default App;
