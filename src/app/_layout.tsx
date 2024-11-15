import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack initialRouteName='index'>
      <Stack.Screen
        name='index'
        options={{ headerShown: false, title: 'Welcome' }}
      />
      <Stack.Screen
        name='(attendance)'
        options={{ headerShown: false, title: 'Attendance' }}
      />
      <Stack.Screen
        name='auth'
        options={{ headerShown: false, title: 'Auth' }}
      />
    </Stack>
  );
}
