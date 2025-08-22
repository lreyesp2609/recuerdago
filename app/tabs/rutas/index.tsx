import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Modal,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useThemeColors } from '../../../hooks/useThemeColor';
import UserRoutesComponent from '../../components/rutas/_lista_rutas';

export default function RutasScreen() {
    const colors = useThemeColors();
    const [hasLocationPermission, setHasLocationPermission] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [locationName, setLocationName] = useState('');
    const [locationAddress, setLocationAddress] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // Animaciones
    const bounceValue = useRef(new Animated.Value(0)).current;
    const fadeValue = useRef(new Animated.Value(0)).current;
    const scaleValue = useRef(new Animated.Value(0.8)).current;

    // Datos simulados de ubicaciones del usuario
    const [userLocations] = useState([
        {
            id: 1,
            name: "🏠 Casa",
            address: "Av. Principal 123, Quevedo",
            frequency: 85,
            lastUsed: "Hace 2 horas",
            color: "#FF6B6B"
        },
        {
            id: 2,
            name: "🎓 Universidad",
            address: "Campus UTQ, Quevedo",
            frequency: 92,
            lastUsed: "Ayer",
            color: "#4ECDC4"
        },
        {
            id: 3,
            name: "💼 Trabajo",
            address: "Centro Comercial, Quevedo",
            frequency: 78,
            lastUsed: "Hace 1 día",
            color: "#45B7D1"
        },
        {
            id: 4,
            name: "🛒 Supermercado",
            address: "Mi Comisariato, Quevedo",
            frequency: 45,
            lastUsed: "Hace 3 días",
            color: "#96CEB4"
        }
    ]);

    useEffect(() => {
        checkLocationPermission();
    }, []);

    const checkLocationPermission = async () => {
        const { status } = await Location.getForegroundPermissionsAsync();
        setHasLocationPermission(status === 'granted');
    };

    useEffect(() => {
        // Animación de entrada
        Animated.parallel([
            Animated.spring(bounceValue, {
                toValue: 1,
                tension: 100,
                friction: 8,
                useNativeDriver: true,
            }),
            Animated.timing(fadeValue, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(scaleValue, {
                toValue: 1,
                tension: 120,
                friction: 8,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    const requestLocationPermission = async () => {
        try {
            // Verificar si ya tenemos permisos
            let { status } = await Location.getForegroundPermissionsAsync();

            if (status !== 'granted') {
                // Solicitar permisos
                const { status: newStatus } = await Location.requestForegroundPermissionsAsync();

                if (newStatus !== 'granted') {
                    Alert.alert(
                        "Permisos Denegados",
                        "Para usar esta función, ve a Configuración > Aplicaciones > RecuerdaGo > Permisos y activa la ubicación.",
                        [{ text: "Entendido" }]
                    );
                    return;
                }
                status = newStatus;
            }

            // Si llegamos aquí, tenemos permisos
            setHasLocationPermission(true);

            // Opcional: Obtener ubicación actual para confirmar
            const location = await Location.getCurrentPositionAsync({});
            console.log('📍 Ubicación obtenida:', location.coords);

            Alert.alert(
                "¡Perfecto! 🎉",
                `Ubicación activada correctamente.\nLatitud: ${location.coords.latitude.toFixed(6)}\nLongitud: ${location.coords.longitude.toFixed(6)}`
            );

        } catch (error) {
            console.error('❌ Error obteniendo ubicación:', error);
            Alert.alert(
                "Error",
                "Hubo un problema al activar la ubicación. Intenta nuevamente.",
                [{ text: "OK" }]
            );
        }
    };
    const analyzeRoutes = async () => {
        setIsAnalyzing(true);
        // Simulación de análisis ML
        setTimeout(() => {
            setIsAnalyzing(false);
            Alert.alert(
                "🤖 Análisis Completado",
                "He encontrado 3 rutas alternativas optimizadas basadas en tus patrones de movilidad y tráfico en tiempo real.",
                [{ text: "Ver Rutas", onPress: () => { } }]
            );
        }, 3000);
    };

    const addNewLocation = () => {
        if (locationName.trim() && locationAddress.trim()) {
            Alert.alert("✅ Ubicación Guardada", `${locationName} ha sido agregada a tus ubicaciones favoritas.`);
            setLocationName('');
            setLocationAddress('');
            setIsModalVisible(false);
        }
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={colors.isDark ? 'light-content' : 'dark-content'} />

            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
            >
                {/* Header con animación */}
                <Animated.View
                    style={[
                        styles.header,
                        {
                            backgroundColor: colors.primary,
                            transform: [{
                                translateY: Animated.multiply(bounceValue, -20).interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 0]
                                })
                            }],
                            opacity: fadeValue
                        }
                    ]}
                >
                    <View style={styles.headerContent}>
                        <View style={styles.headerIcon}>
                            <Ionicons name="navigate" size={32} color="white" />
                            <View style={[styles.aiIndicator, { backgroundColor: colors.secondary }]}>
                                <Text style={styles.aiText}>ML</Text>
                            </View>
                        </View>
                        <Text style={styles.headerTitle}>Rutas Inteligentes</Text>
                        <Text style={styles.headerSubtitle}>
                            Encuentra el mejor camino con IA
                        </Text>
                    </View>
                </Animated.View>

                {/* Stats Cards */}
                <Animated.View
                    style={[
                        styles.statsContainer,
                        {
                            opacity: fadeValue,
                            transform: [{ scale: scaleValue }]
                        }
                    ]}
                >
                    <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
                        <FontAwesome5 name="route" size={20} color="#4ECDC4" />
                        <Text style={[styles.statNumber, { color: colors.text }]}>12</Text>
                        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Rutas Guardadas</Text>
                    </View>
                    <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
                        <Ionicons name="time" size={20} color="#FF6B6B" />
                        <Text style={[styles.statNumber, { color: colors.text }]}>45min</Text>
                        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Tiempo Ahorrado</Text>
                    </View>
                    <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
                        <MaterialIcons name="eco" size={20} color="#96CEB4" />
                        <Text style={[styles.statNumber, { color: colors.text }]}>2.3kg</Text>
                        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>CO₂ Reducido</Text>
                    </View>
                </Animated.View>

                {/* Permission Section */}
                {!hasLocationPermission && (
                    <Animated.View
                        style={[
                            styles.permissionCard,
                            {
                                backgroundColor: colors.surface,
                                opacity: fadeValue
                            }
                        ]}
                    >
                        <View style={styles.permissionIcon}>
                            <Ionicons name="location" size={40} color={colors.primary} />
                        </View>
                        <Text style={[styles.permissionTitle, { color: colors.text }]}>
                            Activar Ubicación
                        </Text>
                        <Text style={[styles.permissionText, { color: colors.textSecondary }]}>
                            Necesitamos tu ubicación para crear rutas personalizadas y encontrar alternativas optimizadas.
                        </Text>
                        <TouchableOpacity
                            style={[styles.permissionButton, { backgroundColor: colors.primary }]}
                            onPress={requestLocationPermission}
                            activeOpacity={0.8}
                        >
                            <Ionicons name="location-sharp" size={20} color="white" />
                            <Text style={styles.permissionButtonText}>Permitir Acceso</Text>
                        </TouchableOpacity>
                    </Animated.View>
                )}

                {/* Quick Actions */}
                {hasLocationPermission && (
                    <Animated.View
                        style={[
                            styles.actionsContainer,
                            { opacity: fadeValue }
                        ]}
                    >
                        <TouchableOpacity
                            style={[styles.actionButton, { backgroundColor: colors.primary }]}
                            onPress={() => setIsModalVisible(true)}
                            activeOpacity={0.8}
                        >
                            <Ionicons name="add-circle" size={24} color="white" />
                            <Text style={styles.actionButtonText}>Nueva Ubicación</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.actionButton, { backgroundColor: colors.secondary }]}
                            onPress={analyzeRoutes}
                            activeOpacity={0.8}
                            disabled={isAnalyzing}
                        >
                            {isAnalyzing ? (
                                <>
                                    <Animated.View
                                        style={{
                                            transform: [{
                                                rotate: bounceValue.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: ['0deg', '360deg']
                                                })
                                            }]
                                        }}
                                    >
                                        <MaterialIcons name="autorenew" size={24} color="white" />
                                    </Animated.View>
                                    <Text style={styles.actionButtonText}>Analizando...</Text>
                                </>
                            ) : (
                                <>
                                    <MaterialIcons name="psychology" size={24} color="white" />
                                    <Text style={styles.actionButtonText}>Analizar con IA</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </Animated.View>
                )}

                {/* User Locations */}
                <Animated.View
                    style={[
                        styles.locationsSection,
                        { opacity: fadeValue }
                    ]}
                >
                    <View style={styles.sectionHeader}>
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>
                            Mis Ubicaciones
                        </Text>
                        <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
                            Lugares que visitas frecuentemente
                        </Text>
                    </View>

                    {userLocations.map((location, index) => (
                        <TouchableOpacity
                            key={location.id}
                            style={[
                                styles.locationCard,
                                {
                                    backgroundColor: colors.surface,
                                    borderLeftColor: location.color
                                }
                            ]}
                            activeOpacity={0.7}
                        >
                            <View style={styles.locationInfo}>
                                <Text style={[styles.locationName, { color: colors.text }]}>
                                    {location.name}
                                </Text>
                                <Text style={[styles.locationAddress, { color: colors.textSecondary }]}>
                                    {location.address}
                                </Text>
                                <View style={styles.locationMeta}>
                                    <View style={styles.frequencyBadge}>
                                        <Text style={[styles.frequencyText, { color: location.color }]}>
                                            {location.frequency}% frecuencia
                                        </Text>
                                    </View>
                                    <Text style={[styles.lastUsed, { color: colors.textSecondary }]}>
                                        {location.lastUsed}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.locationActions}>
                                <TouchableOpacity style={styles.actionIcon}>
                                    <Ionicons name="navigate" size={20} color={colors.primary} />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    ))}
                </Animated.View>

                {/* User Routes Component */}
                {hasLocationPermission && (
                    <UserRoutesComponent />
                )}
            </ScrollView>

            {/* Modal para nueva ubicación */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
                        <View style={styles.modalHeader}>
                            <Text style={[styles.modalTitle, { color: colors.text }]}>
                                Nueva Ubicación
                            </Text>
                            <TouchableOpacity
                                onPress={() => setIsModalVisible(false)}
                                style={styles.closeButton}
                            >
                                <Ionicons name="close" size={24} color={colors.textSecondary} />
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.inputContainer, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder }]}>
                            <FontAwesome5 name="map-pin" size={18} color={colors.inputIcon} style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input, { color: colors.text }]}
                                placeholder="Nombre del lugar (ej: Casa, Trabajo)"
                                placeholderTextColor={colors.placeholder}
                                value={locationName}
                                onChangeText={setLocationName}
                                autoCapitalize="words"
                                keyboardAppearance={colors.isDark ? 'dark' : 'light'}
                            />
                        </View>

                        <View style={[styles.inputContainer, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder }]}>
                            <Ionicons name="location" size={18} color={colors.inputIcon} style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input, { color: colors.text }]}
                                placeholder="Dirección completa"
                                placeholderTextColor={colors.placeholder}
                                value={locationAddress}
                                onChangeText={setLocationAddress}
                                multiline
                                keyboardAppearance={colors.isDark ? 'dark' : 'light'}
                            />
                        </View>

                        <TouchableOpacity
                            style={[
                                styles.saveButton,
                                {
                                    backgroundColor: colors.primary,
                                    opacity: (locationName.trim() && locationAddress.trim()) ? 1 : 0.5
                                }
                            ]}
                            onPress={addNewLocation}
                            disabled={!(locationName.trim() && locationAddress.trim())}
                            activeOpacity={0.8}
                        >
                            <Ionicons name="save" size={20} color="white" />
                            <Text style={styles.saveButtonText}>Guardar Ubicación</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    header: {
        padding: 20,
        paddingTop: 60,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
    },
    headerContent: {
        alignItems: 'center',
    },
    headerIcon: {
        position: 'relative',
        marginBottom: 10,
    },
    aiIndicator: {
        position: 'absolute',
        right: -8,
        top: -8,
        borderRadius: 12,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    aiText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    headerTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    headerSubtitle: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 14,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        marginTop: -20,
    },
    statCard: {
        flex: 1,
        alignItems: 'center',
        padding: 15,
        borderRadius: 12,
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        textAlign: 'center',
    },
    permissionCard: {
        margin: 20,
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    permissionIcon: {
        marginBottom: 15,
    },
    permissionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    permissionText: {
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 20,
    },
    permissionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        shadowColor: '#4E8AF4',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    permissionButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    actionsContainer: {
        flexDirection: 'row',
        padding: 20,
        gap: 12,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    actionButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 8,
    },
    locationsSection: {
        padding: 20,
    },
    sectionHeader: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    sectionSubtitle: {
        fontSize: 14,
    },
    locationCard: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderLeftWidth: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
    locationInfo: {
        flex: 1,
    },
    locationName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    locationAddress: {
        fontSize: 14,
        marginBottom: 8,
    },
    locationMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    frequencyBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        backgroundColor: 'rgba(78, 205, 196, 0.1)',
    },
    frequencyText: {
        fontSize: 12,
        fontWeight: '600',
    },
    lastUsed: {
        fontSize: 12,
    },
    locationActions: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
    },
    actionIcon: {
        padding: 8,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 8,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginVertical: 8,
        borderWidth: 1,
        minHeight: 48,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 12,
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        paddingVertical: 15,
        borderRadius: 8,
        shadowColor: '#4E8AF4',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    saveButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
        marginLeft: 8,
    },
});