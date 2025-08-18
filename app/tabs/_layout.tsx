import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../../components/idioma/languagecontexttype';
import { useThemeColors } from '../../hooks/useThemeColor';

export default function TabsLayout() {
    const colors = useThemeColors();
    const { t } = useLanguage();
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.tabIconDefault,
                // Dejar títulos visibles (puedes quitar esta línea, true es default)
                tabBarShowLabel: true, 
                tabBarStyle: {
                    backgroundColor: colors.surface,
                    borderTopColor: colors.border,
                    borderTopWidth: 1,
                    height: Platform.OS === 'ios' ? 88 + insets.bottom : 65 + insets.bottom,
                    paddingBottom: Platform.OS === 'ios' ? Math.max(insets.bottom, 25) : Math.max(insets.bottom, 10),
                    paddingTop: 8,
                    elevation: 8,
                    shadowColor: colors.shadow,
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                },
                tabBarItemStyle: {
                    borderRadius: 4, // un poco más cuadrado, menos redondo
                    marginHorizontal: 6,
                    overflow: 'hidden',
                },
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Inicio', // Aquí pones el título que quieres mostrar
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="rutas/rutas"
                options={{
                    title: 'Rutas',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="map" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="recordatorios/recordatorios"
                options={{
                    title: 'Recordatorios',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="notifications" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="grupos/grupos"
                options={{
                    title: 'Grupos',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="people" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
