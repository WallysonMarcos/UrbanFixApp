import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 

import SignIn from "./Views/Auth/SignIn";

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="dark-content" />
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <SignIn />
    </View>
  </NavigationContainer>
);

export default App;
