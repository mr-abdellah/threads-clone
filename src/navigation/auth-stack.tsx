import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackRoutes} from './_types/navigation';
import {
  CompleteProfileScreen,
  LoginScreen,
  OnboardingScreen,
  RegisterScreen,
} from '../screens';
import {Text, TouchableOpacity} from 'react-native';
import {useTheme} from '../hooks';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const Stack = createNativeStackNavigator<AuthStackRoutes>();
export default function AuthStack() {
  const {currentColor} = useTheme();
  return (
    <Stack.Navigator initialRouteName="CompleteProfileScreen">
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
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CompleteProfileScreen"
        component={CompleteProfileScreen}
        options={{
          headerShown: true,
          headerTitle: 'Complete Profile',
          headerTitleStyle: {
            color: currentColor.secondary,
          },
          headerRight: () => {
            return (
              <TouchableOpacity>
                <Text
                  style={{
                    color: currentColor.secondary,
                    fontSize: widthPercentageToDP(3.7),
                  }}>
                  Skip
                </Text>
              </TouchableOpacity>
            );
          },
          headerStyle: {
            backgroundColor: currentColor.primary,
          },
          headerBackVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
