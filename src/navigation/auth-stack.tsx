import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackRoutes} from './_types/navigation';
import {LoginScreen, OnboardingScreen} from '../screens';

const Stack = createNativeStackNavigator<AuthStackRoutes>();
export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="onBoardingScreen">
      <Stack.Screen
        name="onBoardingScreen"
        component={OnboardingScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
