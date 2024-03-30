import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import React from 'react';
import {useAuth} from '../../../context/auth-context';
import {useTheme} from '../../../hooks';

export function ProfileScreen() {
  const {logout} = useAuth();
  const {currentColor} = useTheme();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: currentColor.primary,
      }}>
      <TouchableOpacity onPress={logout}>
        <Text>ProfileScreen</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
