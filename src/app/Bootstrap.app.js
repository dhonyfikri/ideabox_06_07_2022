/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './../config/Routes/Routes.cfg';
import links from '../components/Links';
import { LogBox } from 'react-native';

const Bootstrap = () => {
  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer linking={links}>
      <Routes />
    </NavigationContainer>
  );
};
export default Bootstrap;
