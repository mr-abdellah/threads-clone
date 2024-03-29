import {View, Text} from 'react-native';
import React from 'react';
import {ThreadsList} from './_components/threads-list';
import {SafeAreaView} from 'react-native-safe-area-context';

export function HomeScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ThreadsList />
    </SafeAreaView>
  );
}
