import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../../components/idioma/languagecontexttype';
import { SessionProvider, useSession } from '../../components/session/SessionContext';
import { useThemeColors } from '../../hooks/useThemeColor';

function TabsContent() {
    const colors = useThemeColors();
    const { t } = useLanguage();
    const insets = useSafeAreaInsets();
    const { isLoading } = useSession();

    if (isLoading) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.background
            }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.tabIconDefault,
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
                    borderRadius: 4,
                    marginHorizontal: 6,
                    overflow: 'hidden',
                },
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Inicio',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="rutas/index"
                options={{
                    title: "Rutas",
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
            <Tabs.Screen
                name="configuracion/configuracion"
                options={{
                    title: 'Configuración',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}

export default function TabsLayout() {
    return (
        <SessionProvider>
            <TabsContent />
        </SessionProvider>
    );
}