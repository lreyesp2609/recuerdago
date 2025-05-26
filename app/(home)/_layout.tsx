import { Feather, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
    type DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { Pressable, Text, View } from 'react-native';

const COLOR_PRIMARY = '#4E8AF4';
const COLOR_DANGER = '#FF6B6B';
const COLOR_BACKGROUND = '#2C3E50';
const COLOR_SUCCESS = '#2ECC71';
const COLOR_PURPLE = '#9B59B6';

function HeaderTitle() {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="map" size={24} color={COLOR_PRIMARY} />
            <Text style={{ color: COLOR_PRIMARY, fontWeight: 'bold', fontSize: 20, marginLeft: 8 }}>
                RecuerdaGo
            </Text>
        </View>
    );
}

// 🔻 Contenido personalizado del Drawer
function CustomDrawerContent(props: DrawerContentComponentProps) {
    return (
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}
        >
            <View>
                <DrawerItemList {...props} />
            </View>

            <View style={{ borderTopWidth: 1, borderTopColor: '#ccc', paddingTop: 10 }}>
                <DrawerItem
                    label="Configuración"
                    icon={({ color, size }) => <Feather name="settings" size={size} color={color} />}
                    onPress={() => props.navigation.navigate('config/configuracion')}
                    labelStyle={{ fontWeight: '600', fontSize: 16 }}
                />
                <DrawerItem
                    label="Cerrar Sesión"
                    icon={({ color, size }) => (
                        <MaterialIcons name="logout" size={size} color={COLOR_DANGER} />
                    )}
                    onPress={() => props.navigation.navigate('logout/logout')}
                    labelStyle={{ color: COLOR_DANGER, fontWeight: '600', fontSize: 16 }}
                />
            </View>
        </DrawerContentScrollView>
    );
}

export default function HomeLayout() {
    return (
        <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={({ navigation }) => ({
                headerShown: true,
                drawerType: 'slide',
                drawerStyle: {
                    width: 240,
                    backgroundColor: COLOR_BACKGROUND,
                },
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: COLOR_BACKGROUND },
                headerTitleStyle: { color: '#fff' },
                headerTitle: () => <HeaderTitle />,
                headerLeft: () => (
                    <Pressable onPress={() => navigation.toggleDrawer()} style={{ marginLeft: 15 }}>
                        <Ionicons name="menu" size={28} color="white" />
                    </Pressable>
                ),
                drawerActiveTintColor: COLOR_PRIMARY,
                drawerInactiveTintColor: '#ccc',
                drawerLabelStyle: {
                    fontWeight: '600',
                    fontSize: 16,
                },
            })}
        >
            {/* Secciones principales del menú */}
            <Drawer.Screen
                name="index"
                options={{
                    drawerLabel: 'Inicio',
                    drawerIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
                }}
            />

            <Drawer.Screen
                name="monitor/monitor"
                options={{
                    drawerLabel: 'Monitoreo',
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons name="gps-fixed" size={size} color={color} />
                    ),
                }}
            />

            <Drawer.Screen
                name="zonas/zonas_seguras"
                options={{
                    drawerLabel: 'Zonas Seguras',
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="shield-check" size={size} color={color} />
                    ),
                }}
            />

            <Drawer.Screen
                name="habitos/analisis_habitos"
                options={{
                    drawerLabel: 'Análisis de Hábitos',
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="chart-bell-curve" size={size} color={color} />
                    ),
                }}
            />

            <Drawer.Screen
                name="dataset/dataset_publico"
                options={{
                    drawerLabel: 'Dataset Público',
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="database-export" size={size} color={color} />
                    ),
                }}
            />

            {/* 🔻 AGREGAR ESTAS PANTALLAS */}
            <Drawer.Screen
                name="config/configuracion"
                options={{
                    drawerLabel: 'Configuración',
                    drawerIcon: ({ color, size }) => <Feather name="settings" size={size} color={color} />,
                    drawerItemStyle: { display: 'none' }, // Ocultar del menú principal
                }}
            />

            <Drawer.Screen
                name="logout/logout"
                options={{
                    drawerLabel: 'Cerrar Sesión',
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons name="logout" size={size} color={COLOR_DANGER} />
                    ),
                    drawerItemStyle: { display: 'none' }, // Ocultar del menú principal
                }}
            />
        </Drawer>
    );
}