import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(auth)/login"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="(auth)/register"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="(auth)/verify"
        options={{
          headerShown: false,
          title: 'Verificar Email'
        }}
      />
    </Stack>
  );
}