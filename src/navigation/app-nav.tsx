import React, {useEffect} from 'react';
import AppStack from './app-stack';
import AuthStack from './auth-stack';
import {NavigationContainer} from '@react-navigation/native';
import {useAuth} from '../context/auth-context';

export default function AppNav() {
  const {isAuthenticated, getUserCollection} = useAuth();

  useEffect(() => {
    getUserCollection();
  }, []);
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
