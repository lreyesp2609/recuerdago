import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useThemeColors } from '../../../hooks/useThemeColor';

interface Route {
    id: number;
    origin: string;
    destination: string;
    distance: string;
    duration: string;
    frequency: number;
    optimizationScore: number;
    trafficPattern: 'low' | 'medium' | 'high';
    alternatives: number;
    co2Saved: string;
    lastUsed: string;
    isRecommended: boolean;
}

export default function UserRoutesComponent() {
    const colors = useThemeColors();
    const [routes, setRoutes] = useState<Route[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const fadeValue = useRef(new Animated.Value(0)).current;
    const slideValue = useRef(new Animated.Value(50)).current;

    // Simulación de llamada a API
    useEffect(() => {
        fetchUserRoutes();
    }, []);

    const fetchUserRoutes = async () => {
        // Simulando llamada a API con ML
        setIsLoading(true);
        
        setTimeout(() => {
            const mockRoutes: Route[] = [
                {
                    id: 1,
                    origin: "🏠 Casa",
                    destination: "🎓 Universidad",
                    distance: "12.5 km",
                    duration: "18 min",
                    frequency: 92,
                    optimizationScore: 95,
                    trafficPattern: 'low',
                    alternatives: 3,
                    co2Saved: "2.1 kg",
                    lastUsed: "Hoy 07:30",
                    isRecommended: true
                },
                {
                    id: 2,
                    origin: "🎓 Universidad",
                    destination: "💼 Trabajo",
                    distance: "8.2 km",
                    duration: "12 min",
                    frequency: 78,
                    optimizationScore: 88,
                    trafficPattern: 'medium',
                    alternatives: 2,
                    co2Saved: "1.3 kg",
                    lastUsed: "Ayer 14:15",
                    isRecommended: true
                },
                {
                    id: 3,
                    origin: "💼 Trabajo",
                    destination: "🛒 Supermercado",
                    distance: "5.7 km",
                    duration: "9 min",
                    frequency: 45,
                    optimizationScore: 72,
                    trafficPattern: 'high',
                    alternatives: 4,
                    co2Saved: "0.8 kg",
                    lastUsed: "Hace 2 días",
                    isRecommended: false
                },
                {
                    id: 4,
                    origin: "🛒 Supermercado",
                    destination: "🏠 Casa",
                    distance: "15.3 km",
                    duration: "22 min",
                    frequency: 67,
                    optimizationScore: 85,
                    trafficPattern: 'medium',
                    alternatives: 2,
                    co2Saved: "2.5 kg",
                    lastUsed: "Hace 2 días",
                    isRecommended: true
                }
            ];
            
            setRoutes(mockRoutes);
            setIsLoading(false);
            
            // Animación de entrada
            Animated.parallel([
                Animated.timing(fadeValue, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(slideValue, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true,
                })
            ]).start();
        }, 1500);
    };

    const getTrafficColor = (pattern: string) => {
        switch (pattern) {
            case 'low': return '#4ECDC4';
            case 'medium': return '#FFE66D';
            case 'high': return '#FF6B6B';
            default: return '#4ECDC4';
        }
    };

    const getTrafficIcon = (pattern: string) => {
        switch (pattern) {
            case 'low': return 'checkmark-circle';
            case 'medium': return 'warning';
            case 'high': return 'alert-circle';
            default: return 'checkmark-circle';
        }
    };

    const getOptimizationGrade = (score: number) => {
        if (score >= 90) return { grade: 'A+', color: '#4ECDC4' };
        if (score >= 80) return { grade: 'A', color: '#96CEB4' };
        if (score >= 70) return { grade: 'B', color: '#FFE66D' };
        return { grade: 'C', color: '#FF6B6B' };
    };

    const showRouteDetails = (route: Route) => {
        Alert.alert(
            `🗺️ ${route.origin} → ${route.destination}`,
            `📍 Distancia: ${route.distance}\n⏱️ Tiempo: ${route.duration}\n🚗 Frecuencia: ${route.frequency}%\n📈 Optimización: ${route.optimizationScore}%\n🌱 CO₂ Ahorrado: ${route.co2Saved}\n🔄 ${route.alternatives} rutas alternativas`,
            [
                { text: "Ver Alternativas", onPress: () => {} },
                { text: "Navegar Ahora", onPress: () => {} },
                { text: "Cerrar", style: "cancel" }
            ]
        );
    };

    const renderRoute = ({ item, index }: { item: Route; index: number }) => {
        const optimizationGrade = getOptimizationGrade(item.optimizationScore);
        
        return (
            <Animated.View
                style={[
                    styles.routeCard,
                    { 
                        backgroundColor: colors.surface,
                        opacity: fadeValue,
                        transform: [{ translateY: slideValue }],
                        borderLeftColor: item.isRecommended ? colors.primary : colors.inputBorder
                    }
                ]}
            >
                {item.isRecommended && (
                    <View style={[styles.recommendedBadge, { backgroundColor: colors.primary }]}>
                        <Ionicons name="star" size={12} color="white" />
                        <Text style={styles.recommendedText}>IA Recomienda</Text>
                    </View>
                )}
                
                <TouchableOpacity
                    onPress={() => showRouteDetails(item)}
                    style={styles.routeContent}
                    activeOpacity={0.7}
                >
                    {/* Header de la ruta */}
                    <View style={styles.routeHeader}>
                        <View style={styles.routePoints}>
                            <Text style={[styles.routePoint, { color: colors.text }]}>
                                {item.origin}
                            </Text>
                            <View style={styles.routeArrow}>
                                <Ionicons name="arrow-forward" size={16} color={colors.textSecondary} />
                            </View>
                            <Text style={[styles.routePoint, { color: colors.text }]}>
                                {item.destination}
                            </Text>
                        </View>
                        
                        <View style={[styles.gradeCircle, { backgroundColor: optimizationGrade.color }]}>
                            <Text style={styles.gradeText}>{optimizationGrade.grade}</Text>
                        </View>
                    </View>

                    {/* Métricas principales */}
                    <View style={styles.routeMetrics}>
                        <View style={styles.metric}>
                            <MaterialIcons name="straighten" size={16} color={colors.primary} />
                            <Text style={[styles.metricValue, { color: colors.text }]}>{item.distance}</Text>
                        </View>
                        <View style={styles.metric}>
                            <Ionicons name="time" size={16} color={colors.secondary} />
                            <Text style={[styles.metricValue, { color: colors.text }]}>{item.duration}</Text>
                        </View>
                        <View style={styles.metric}>
                            <Ionicons 
                                name={getTrafficIcon(item.trafficPattern)} 
                                size={16} 
                                color={getTrafficColor(item.trafficPattern)} 
                            />
                            <Text style={[styles.metricValue, { color: colors.text }]}>
                                {item.trafficPattern === 'low' ? 'Fluido' : 
                                 item.trafficPattern === 'medium' ? 'Medio' : 'Congestionado'}
                            </Text>
                        </View>
                    </View>

                    {/* Estadísticas avanzadas */}
                    <View style={styles.advancedStats}>
                        <View style={styles.statGroup}>
                            <View style={styles.frequencyBar}>
                                <View style={styles.frequencyLabel}>
                                    <FontAwesome5 name="chart-line" size={12} color={colors.textSecondary} />
                                    <Text style={[styles.frequencyText, { color: colors.textSecondary }]}>
                                        Uso: {item.frequency}%
                                    </Text>
                                </View>
                                <View style={[styles.progressBar, { backgroundColor: colors.inputBackground }]}>
                                    <View 
                                        style={[
                                            styles.progressFill, 
                                            { 
                                                width: `${item.frequency}%`,
                                                backgroundColor: colors.primary 
                                            }
                                        ]} 
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.statGroup}>
                            <View style={styles.ecoStats}>
                                <MaterialIcons name="eco" size={14} color="#96CEB4" />
                                <Text style={[styles.ecoText, { color: colors.textSecondary }]}>
                                    -{item.co2Saved} CO₂
                                </Text>
                            </View>
                            <Text style={[styles.lastUsed, { color: colors.textSecondary }]}>
                                {item.lastUsed}
                            </Text>
                        </View>
                    </View>

                    {/* Footer con acciones */}
                    <View style={styles.routeFooter}>
                        <View style={styles.alternativesInfo}>
                            <Ionicons name="git-branch" size={14} color={colors.textSecondary} />
                            <Text style={[styles.alternativesText, { color: colors.textSecondary }]}>
                                +{item.alternatives} alternativas
                            </Text>
                        </View>
                        
                        <View style={styles.routeActions}>
                            <TouchableOpacity 
                                style={[styles.quickAction, { backgroundColor: colors.inputBackground }]}
                                onPress={() => {}}
                            >
                                <Ionicons name="share" size={16} color={colors.primary} />
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.quickAction, { backgroundColor: colors.primary }]}
                                onPress={() => {}}
                            >
                                <Ionicons name="navigate" size={16} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    const renderEmptyState = () => (
        <Animated.View 
            style={[
                styles.emptyState,
                { 
                    backgroundColor: colors.surface,
                    opacity: fadeValue 
                }
            ]}
        >
            <MaterialIcons name="route" size={60} color={colors.textSecondary} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
                No hay rutas guardadas
            </Text>
            <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
                Crea tu primera ubicación y empieza a recibir rutas inteligentes personalizadas
            </Text>
        </Animated.View>
    );

    const renderLoadingState = () => (
        <View style={styles.loadingContainer}>
            {[1, 2, 3].map((item) => (
                <Animated.View
                    key={item}
                    style={[
                        styles.skeletonCard,
                        { 
                            backgroundColor: colors.surface,
                            opacity: fadeValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.3, 0.7]
                            })
                        }
                    ]}
                >
                    <View style={[styles.skeletonLine, { backgroundColor: colors.inputBackground }]} />
                    <View style={[styles.skeletonLine, { backgroundColor: colors.inputBackground, width: '70%' }]} />
                    <View style={[styles.skeletonLine, { backgroundColor: colors.inputBackground, width: '90%' }]} />
                </Animated.View>
            ))}
            <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
                🤖 Analizando patrones de movilidad con IA...
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.sectionHeader}>
                <View style={styles.headerLeft}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>
                        Rutas Inteligentes
                    </Text>
                    <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
                        Optimizadas con Machine Learning
                    </Text>
                </View>
                <TouchableOpacity
                    style={[styles.refreshButton, { backgroundColor: colors.inputBackground }]}
                    onPress={fetchUserRoutes}
                    disabled={isLoading}
                >
                    <Animated.View
                        style={{
                            transform: [{
                                rotate: isLoading ? fadeValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '360deg']
                                }) : '0deg'
                            }]
                        }}
                    >
                        <Ionicons 
                            name="refresh" 
                            size={20} 
                            color={colors.primary} 
                        />
                    </Animated.View>
                </TouchableOpacity>
            </View>

            {isLoading ? renderLoadingState() : (
                <FlatList
                    data={routes}
                    renderItem={renderRoute}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={renderEmptyState}
                    scrollEnabled={false}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    headerLeft: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    sectionSubtitle: {
        fontSize: 14,
    },
    refreshButton: {
        padding: 10,
        borderRadius: 20,
    },
    routeCard: {
        marginBottom: 16,
        borderRadius: 16,
        borderLeftWidth: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    recommendedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        position: 'absolute',
        top: 12,
        right: 12,
        borderRadius: 12,
        zIndex: 1,
    },
    recommendedText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    routeContent: {
        padding: 16,
    },
    routeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    routePoints: {
        flex: 1,
        marginRight: 12,
    },
    routePoint: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 4,
    },
    routeArrow: {
        alignSelf: 'flex-start',
        marginVertical: 2,
    },
    gradeCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    routeMetrics: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    metric: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    metricValue: {
        fontSize: 13,
        fontWeight: '500',
        marginLeft: 6,
    },
    advancedStats: {
        marginBottom: 12,
    },
    statGroup: {
        marginBottom: 8,
    },
    frequencyBar: {
        marginBottom: 8,
    },
    frequencyLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    frequencyText: {
        fontSize: 12,
        marginLeft: 6,
    },
    progressBar: {
        height: 4,
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 2,
    },
    ecoStats: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ecoText: {
        fontSize: 12,
        marginLeft: 4,
    },
    lastUsed: {
        fontSize: 12,
        textAlign: 'right',
    },
    routeFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
        paddingTop: 12,
        marginTop: 4,
    },
    alternativesInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    alternativesText: {
        fontSize: 12,
        marginLeft: 6,
    },
    routeActions: {
        flexDirection: 'row',
        gap: 8,
    },
    quickAction: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyState: {
        alignItems: 'center',
        padding: 40,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
        textAlign: 'center',
    },
    emptySubtitle: {
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
    },
    loadingContainer: {
        gap: 12,
    },
    skeletonCard: {
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
    },
    skeletonLine: {
        height: 12,
        borderRadius: 6,
        marginBottom: 8,
    },
    loadingText: {
        textAlign: 'center',
        fontSize: 14,
        fontStyle: 'italic',
        marginTop: 20,
    },
});