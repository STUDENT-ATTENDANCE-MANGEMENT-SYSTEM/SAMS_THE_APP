import React from 'react';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store';
import Toast from 'react-native-toast-message';
import toastConfig from '../toastConfig';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack initialRouteName='index'>
          <Stack.Screen
            name='index'
            options={{ headerShown: false, title: 'Welcome' }}
          />
          <Stack.Screen
            name='onboarding'
            options={{ headerShown: false, title: 'Onboarding' }}
          />
          <Stack.Screen
            name='(attendance)'
            options={{ headerShown: false, title: 'Attendance' }}
          />
          <Stack.Screen
            name='(auth)'
            options={{ headerShown: false, title: 'Auth' }}
          />
        </Stack>
        <Toast config={toastConfig} />
      </PersistGate>
    </Provider>
  );
}
