import React, {useEffect, useLayoutEffect} from 'react';
import AppStack from './app-stack';
import AuthStack from './auth-stack';
import {NavigationContainer} from '@react-navigation/native';
import {useAuth} from '../context/auth-context';
import {Loading} from '../components';

export default function AppNav() {
  const {isAuthenticated, getUserCollection, checking, userID} = useAuth();

  useLayoutEffect(() => {
    getUserCollection();
  }, [userID]);

  if (checking) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
