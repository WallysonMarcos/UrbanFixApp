import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
 
import SignIn from '../Views/Auth/SignIn';
import SignUp from '../Views/Auth/SignUp';
import Confirm from '../Views/Auth/Confirm';
import IntroApp from '../Views/Intro';

import {RootStackParamList} from './rootStackParam';

const AuthStack = createNativeStackNavigator<RootStackParamList>();

type Props = {
  showIntroWelcome: boolean;
}



const AuthRoutes: React.FC<Props> = ({showIntroWelcome}) => {

  return (
    <AuthStack.Navigator
      initialRouteName={ showIntroWelcome ? "IntroApp" : "SignIn" }
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name={"SignIn"} component={SignIn} />
      <AuthStack.Screen name={"SignUp"} component={SignUp} />
      <AuthStack.Screen name={"IntroApp"} component={IntroApp} />

      <AuthStack.Group>

        <AuthStack.Screen name={"Confirm"} component={Confirm}
          initialParams={{cellNumber: ''}}
          options={{ presentation: 'transparentModal', }}/>
      </AuthStack.Group>
    </AuthStack.Navigator>
  );
};

export default AuthRoutes;
