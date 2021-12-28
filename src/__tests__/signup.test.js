import React, { useContext } from "react";
import 'react-native';
 
import { fireEvent, render, act } from '@testing-library/react-native'


import SignUp from '../Views/Auth/SignUp';
import SignIn from '../Views/Auth/SignIn';

import { AuthContext } from '../Context/Auth';

import { Alert } from 'react-native';

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
jest.mock('@react-native-community/async-storage',() => {});

jest.spyOn(Alert, 'alert');
 
describe('SigIn Test', () => {

  test("SignUp", async () => {

    const handleSignUp = jest.fn();

    const { queryByText, queryByTestId } = render(
      <AuthContext.Provider value={{
        handleSignUp
      }}>
        <SignUp />
      </AuthContext.Provider>
    );

    const register = queryByTestId("REGISTAR");
    const name = queryByTestId("name");
    fireEvent.changeText(name, 'Teste');
    const lastname = queryByTestId("lastname");
    fireEvent.changeText(lastname, 'Native');
    const email = queryByTestId("email");
    fireEvent.changeText(email, 'ajest@gmail.com');
    const cellNumber = queryByTestId("cellNumber");
    fireEvent.changeText(cellNumber, '69981282189');
    const password = queryByTestId("password");
    fireEvent.changeText(password, '123123');

    await act( async() => {
      await fireEvent.press(register);
      
    });

    expect(handleSignUp).toHaveBeenCalledTimes(1);
  });


});  