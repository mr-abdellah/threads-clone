import React from 'react';
import AppNav from './src/navigation/app-nav';
import {AuthProvider} from './src/context/auth-context';

export default function App() {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}
