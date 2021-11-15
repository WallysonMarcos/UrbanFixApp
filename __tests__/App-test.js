/**
 * @format
 */

import 'react-native';
import React from 'react';
import 'react-native-gesture-handler';
import SignUp from '../src/Views/Auth/SignUp';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('react-native-gesture-handler', () => {});
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon')
jest.mock('@react-native-community/async-storage', () => 'AsyncStorage');

it('renders correctly', () => {
  renderer.create(<SignUp />);
});
