import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#36454F' },
      }}>
      <Stack.Screen name='index' options={{ title: 'Sign In' }} />
      <Stack.Screen name='signup' options={{ title: 'Create Account' }} />
      <Stack.Screen name='employee-form' options={{ title: 'Employee Info' }} />
    </Stack >
  )
}
