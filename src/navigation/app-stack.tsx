import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppStackRoutes} from './_types/navigation';
import {HomeScreen} from '../screens';

const Stack = createNativeStackNavigator<AppStackRoutes>();
export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}
