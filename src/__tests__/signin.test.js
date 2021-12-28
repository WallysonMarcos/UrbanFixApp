import React  from "react";
import 'react-native';  
import { fireEvent, render, act } from '@testing-library/react-native' 

 
import SignIn from '../Views/Auth/SignIn';
//import Home from '../Views/Home';

import {  AuthContext } from '../Context/Auth';
import { Alert } from 'react-native';

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
jest.mock('@react-native-community/async-storage',() => {});
jest.spyOn(Alert, 'alert');
 

describe('SigIn Render Test', () => {  
  
  test("SignIn ", async() => { 
 
    const handleSignIn  =  jest.fn(); 

      const { queryByText, queryByTestId } = render(
        <AuthContext.Provider value={{ 
          handleSignIn
        }}> 
          <SignIn /> 
        </AuthContext.Provider>
      );
         
      const username = queryByTestId("username");
      fireEvent.changeText(username, '69981282195');
      const password = queryByTestId("password");
      fireEvent.changeText(password, '123123');

      const btnSubmit = queryByTestId("submitForm");

      await act(async () => {        
        await fireEvent.press(btnSubmit);
      });
      
      expect(handleSignIn).toHaveBeenCalledTimes(1); 
       
  }); 
});