import React from 'react';
import AppStack from './app-stack';
import AuthStack from './auth-stack';
import {NavigationContainer} from '@react-navigation/native';

export default function AppNav() {
  const token = '';
  return (
    <NavigationContainer>
      {token?.length > 0 ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
