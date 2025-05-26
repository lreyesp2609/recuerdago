import { Stack } from 'expo-router';

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: 'fade',
            }}
        >
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
            <Stack.Screen
                name="verify"
                options={{
                    title: 'Verificar Email',
                    headerShown: true, // Quizás quieres mostrar header aquí
                }}
            />
        </Stack>
    );
}