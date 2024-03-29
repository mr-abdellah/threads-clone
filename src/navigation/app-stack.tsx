import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppStackRoutes} from './_types/navigation';
import BottomTabs from './bottom-tabs';

const Stack = createNativeStackNavigator<AppStackRoutes>();
export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
