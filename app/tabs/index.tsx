import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../../components/idioma/languagecontexttype';
import { useSession } from '../../components/session/SessionContext';
import { useThemeColors } from '../../hooks/useThemeColor';
const { width, height } = Dimensions.get('window');

export default function IntroductionScreen() {
    const colors = useThemeColors();
    const { t } = useLanguage();
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const { usuario } = useSession();

    // Animaciones
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const bounceValue = useRef(new Animated.Value(0)).current;
    const rotateValue = useRef(new Animated.Value(0)).current;
    const logoFadeAnim = useRef(new Animated.Value(0)).current;

    // Animaciones
    useEffect(() => {
        Animated.sequence([
            Animated.timing(logoFadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.parallel([
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ]),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
            }),
        ]).start();

        // Animaciones looping
        Animated.loop(
            Animated.sequence([
                Animated.timing(bounceValue, { toValue: 1, duration: 3000, useNativeDriver: true }),
                Animated.timing(bounceValue, { toValue: 0, duration: 3000, useNativeDriver: true }),
            ])
        ).start();

        Animated.loop(
            Animated.timing(rotateValue, { toValue: 1, duration: 4000, useNativeDriver: true })
        ).start();
    }, []);

    const bounceTranslateY = bounceValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -3],
    });

    const rotateInterpolate = rotateValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['0deg', '8deg', '0deg'],
    });

    return (
        <SafeAreaView style={[styles.introContainer, { backgroundColor: colors.background }]}>
            <StatusBar style={colors.isDark ? 'light' : 'dark'} />

            {/* Logo pequeño flotante */}
            <Animated.View
                style={[
                    styles.floatingLogo,
                    {
                        backgroundColor: colors.surface,
                        top: insets.top + 10,
                        opacity: logoFadeAnim,
                        transform: [{ translateY: bounceTranslateY }]
                    }
                ]}
            >
                <View style={styles.smallLogoContainer}>
                    <Ionicons name="location-sharp" size={24} color={colors.primary} />
                    <Animated.View
                        style={[
                            styles.smallBellIcon,
                            { backgroundColor: colors.primary, transform: [{ rotate: rotateInterpolate }] }
                        ]}
                    >
                        <Ionicons name="alarm" size={12} color={colors.surface} />
                    </Animated.View>
                </View>
            </Animated.View>

            <Animated.View
                style={[
                    styles.introContent,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                        paddingTop: insets.top + 80,
                        paddingBottom: insets.bottom + 80
                    }
                ]}
            >
                {/* Título */}
                <Animated.Text
                    style={[
                        styles.mainTitle,
                        { color: colors.text, opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
                    ]}
                >
                    RecuerdaGo
                </Animated.Text>

                {/* Subtítulo */}
                <Animated.Text
                    style={[styles.subtitle, { color: colors.textSecondary, opacity: fadeAnim }]}
                >
                    Tu compañero inteligente de movilidad urbana
                </Animated.Text>

                {/* Saludo al usuario */}
                {usuario && (
                    <Animated.View
                        style={[
                            styles.welcomeMessage,
                            { backgroundColor: `${colors.primary}10`, opacity: fadeAnim }
                        ]}
                    >
                        <Text style={[styles.welcomeText, { color: colors.primary }]}>
                            👋 Hola {usuario.nombre} {usuario.apellido}, bienvenido!
                        </Text>
                    </Animated.View>
                )}
            </Animated.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    introContainer: {
        flex: 1,
    },
    floatingLogo: {
        position: 'absolute',
        left: 16,
        zIndex: 1000,
        borderRadius: 25,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    smallLogoContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
    },
    smallBellIcon: {
        position: 'absolute',
        right: -5,
        top: -5,
        borderRadius: 8,
        padding: 2,
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    introContent: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    mainTitle: {
        fontSize: Math.min(width * 0.08, 28), // Responsivo basado en ancho de pantalla
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 8,
        letterSpacing: 1,
    },
    subtitle: {
        fontSize: Math.min(width * 0.04, 16),
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 22,
        paddingHorizontal: 10,
    },
    featuresContainer: {
        marginBottom: 20,
    },
    featureCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 12,
        marginBottom: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },
    featureIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    featureText: {
        flex: 1,
    },
    featureTitle: {
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 3,
    },
    featureDescription: {
        fontSize: 13,
        lineHeight: 17,
    },
    welcomeMessage: {
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 15,
    },
    welcomeText: {
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: 18,
    },
});