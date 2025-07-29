import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="inicio_sesion" />
      <Stack.Screen name="registrar_usuario" />
    </Stack>
  );
}