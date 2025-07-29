import { useLanguage } from '../../components/idioma/languagecontexttype';
import LanguageSelector from '../../components/idioma/languageselector';
import { useThemeColors } from '../../hooks/useThemeColor';

import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
    Animated,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function RegisterScreen() {
    const router = useRouter();
    const { t, isLoading } = useLanguage();
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const colors = useThemeColors();

    // Animación para el logo
    const bounceValue = new Animated.Value(0);
    const rotateValue = new Animated.Value(0);

    useEffect(() => {
        // Animación de rebote para el logo
        Animated.loop(
            Animated.sequence([
                Animated.timing(bounceValue, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(bounceValue, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Animación de rotación sutil para la campanita
        Animated.loop(
            Animated.timing(rotateValue, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    useEffect(() => {
        // Verificar si las contraseñas coinciden
        if (confirmPassword.length > 0) {
            setPasswordsMatch(password === confirmPassword);
        } else {
            setPasswordsMatch(true);
        }
    }, [password, confirmPassword]);

    const bounceTranslateY = bounceValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -10],
    });

    const rotateInterpolate = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '15deg'],
    });

    const handleRegister = () => {
        if (!passwordsMatch) {
            console.log('Las contraseñas no coinciden');
            return;
        }

        console.log('¡Nuevo usuario registrado!', {
            nombre,
            apellidos,
            email,
            password
        });
        console.log('🎉 ¡Bienvenido a RecuerdaGo! 🎉');
        // Aquí iría la lógica de registro
    };

    const handleBackToLogin = () => {
        console.log('Regresando al login... 👋');
        router.back();
    };

    const getPasswordStrength = () => {
        if (password.length === 0) return '';
        if (password.length < 4) return '😱 ¡Muy débil!';
        if (password.length < 6) return '😐 Débil';
        if (password.length < 8) return '🙂 Aceptable';
        return '💪 ¡Fuerte!';
    };

    const getPasswordStrengthColor = () => {
        if (password.length === 0) return colors.textSecondary;
        if (password.length < 4) return '#FF6B6B';
        if (password.length < 6) return '#FFD93D';
        if (password.length < 8) return '#6BCF7F';
        return '#4ECDC4';
    };

    if (isLoading) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
                <StatusBar style={colors.isDark ? 'light' : 'dark'} />
                <Text style={[styles.loadingText, { color: colors.primary }]}>
                    RecuerdaGo
                </Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <StatusBar style={colors.isDark ? 'light' : 'dark'} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                {/* Selector flotante */}
                <View style={[
                    styles.floatingLanguageSelector,
                    {
                        backgroundColor: colors.floatingBg,
                        top: Platform.OS === 'ios' ? 60 : 50,
                    }
                ]}>
                    <LanguageSelector showInHeader={true} />
                </View>

                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.innerContainer}>
                        {/* Logo animado */}
                        <Animated.View
                            style={[
                                styles.logoContainer,
                                { transform: [{ translateY: bounceTranslateY }] }
                            ]}
                        >
                            <Ionicons
                                name="location-sharp"
                                size={60}
                                color={colors.primary}
                                style={styles.logoIcon}
                            />
                            <Animated.View
                                style={[
                                    styles.bellIcon,
                                    {
                                        backgroundColor: colors.surface,
                                        transform: [{ rotate: rotateInterpolate }]
                                    }
                                ]}
                            >
                                <Ionicons
                                    name="alarm"
                                    size={30}
                                    color={colors.secondary}
                                />
                            </Animated.View>
                        </Animated.View>

                        <Text style={[styles.title, { color: colors.text }]}>
                            ¡Únete a RecuerdaGo! 🚀
                        </Text>

                        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                            Crea tu cuenta y nunca más olvides nada
                        </Text>

                        {/* Nombre */}
                        <View style={[
                            styles.inputContainer,
                            {
                                backgroundColor: colors.inputBackground,
                                borderColor: colors.inputBorder
                            }
                        ]}>
                            <FontAwesome
                                name="user"
                                size={20}
                                color={colors.inputIcon}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={[styles.input, { color: colors.text }]}
                                placeholder="Tu nombre"
                                placeholderTextColor={colors.placeholder}
                                value={nombre}
                                onChangeText={setNombre}
                                autoCapitalize="words"
                                keyboardAppearance={colors.isDark ? 'dark' : 'light'}
                            />
                        </View>

                        {/* Apellidos */}
                        <View style={[
                            styles.inputContainer,
                            {
                                backgroundColor: colors.inputBackground,
                                borderColor: colors.inputBorder
                            }
                        ]}>
                            <MaterialIcons
                                name="family-restroom"
                                size={20}
                                color={colors.inputIcon}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={[styles.input, { color: colors.text }]}
                                placeholder="Tus apellidos"
                                placeholderTextColor={colors.placeholder}
                                value={apellidos}
                                onChangeText={setApellidos}
                                autoCapitalize="words"
                                keyboardAppearance={colors.isDark ? 'dark' : 'light'}
                            />
                        </View>

                        {/* Email */}
                        <View style={[
                            styles.inputContainer,
                            {
                                backgroundColor: colors.inputBackground,
                                borderColor: colors.inputBorder
                            }
                        ]}>
                            <FontAwesome
                                name="envelope"
                                size={20}
                                color={colors.inputIcon}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={[styles.input, { color: colors.text }]}
                                placeholder="tu@email.com"
                                placeholderTextColor={colors.placeholder}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                keyboardAppearance={colors.isDark ? 'dark' : 'light'}
                            />
                        </View>

                        {/* Contraseña */}
                        <View style={[
                            styles.inputContainer,
                            {
                                backgroundColor: colors.inputBackground,
                                borderColor: colors.inputBorder
                            }
                        ]}>
                            <FontAwesome
                                name="lock"
                                size={20}
                                color={colors.inputIcon}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={[styles.input, { color: colors.text }]}
                                placeholder="Contraseña súper secreta"
                                placeholderTextColor={colors.placeholder}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                keyboardAppearance={colors.isDark ? 'dark' : 'light'}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                style={styles.eyeIcon}
                            >
                                <Ionicons
                                    name={showPassword ? "eye-off" : "eye"}
                                    size={20}
                                    color={colors.inputIcon}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Indicador de fuerza de contraseña */}
                        {password.length > 0 && (
                            <Text style={[
                                styles.passwordStrength,
                                { color: getPasswordStrengthColor() }
                            ]}>
                                {getPasswordStrength()}
                            </Text>
                        )}

                        {/* Confirmar Contraseña */}
                        <View style={[
                            styles.inputContainer,
                            {
                                backgroundColor: colors.inputBackground,
                                borderColor: !passwordsMatch ? '#FF6B6B' : colors.inputBorder
                            }
                        ]}>
                            <FontAwesome
                                name="lock"
                                size={20}
                                color={colors.inputIcon}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={[styles.input, { color: colors.text }]}
                                placeholder="Repite tu contraseña"
                                placeholderTextColor={colors.placeholder}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!showConfirmPassword}
                                keyboardAppearance={colors.isDark ? 'dark' : 'light'}
                            />
                            <TouchableOpacity
                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={styles.eyeIcon}
                            >
                                <Ionicons
                                    name={showConfirmPassword ? "eye-off" : "eye"}
                                    size={20}
                                    color={colors.inputIcon}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Mensaje de contraseñas no coinciden */}
                        {!passwordsMatch && confirmPassword.length > 0 && (
                            <Text style={styles.errorText}>
                                😅 ¡Oops! Las contraseñas no coinciden
                            </Text>
                        )}

                        {/* Botón de registro */}
                        <TouchableOpacity
                            style={[
                                styles.button,
                                {
                                    backgroundColor: colors.primary,
                                    opacity: (!passwordsMatch || !nombre || !apellidos || !email || !password) ? 0.6 : 1
                                }
                            ]}
                            onPress={handleRegister}
                            activeOpacity={0.8}
                            disabled={!passwordsMatch || !nombre || !apellidos || !email || !password}
                        >
                            <Text style={styles.buttonText}>¡Crear mi cuenta! 🎉</Text>
                        </TouchableOpacity>

                        {/* Footer */}
                        <View style={styles.footerContainer}>
                            <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                                ¿Ya tienes cuenta? {' '}
                                <Text
                                    style={[styles.linkText, { color: colors.primary }]}
                                    onPress={handleBackToLogin}
                                >
                                    ¡Inicia sesión aquí! 👈
                                </Text>
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
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
    scrollContainer: {
        flexGrow: 1,
    },
    floatingLanguageSelector: {
        position: 'absolute',
        right: 16,
        zIndex: 1000,
        borderRadius: 25,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 24,
        fontWeight: '700',
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        paddingTop: 80,
    },
    logoContainer: {
        position: 'relative',
        alignSelf: 'center',
        marginBottom: 15,
    },
    logoIcon: {
        opacity: 0.9,
    },
    bellIcon: {
        position: 'absolute',
        right: -10,
        top: -10,
        borderRadius: 15,
        padding: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 24,
        fontWeight: '700'
    },
    subtitle: {
        textAlign: 'center',
        marginBottom: 25,
        fontSize: 16,
        fontStyle: 'italic',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginVertical: 6,
        borderWidth: 1,
        height: 50,
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
    },
    eyeIcon: {
        padding: 5,
    },
    passwordStrength: {
        textAlign: 'center',
        fontSize: 12,
        marginTop: -2,
        marginBottom: 8,
        fontWeight: '600',
    },
    errorText: {
        color: '#FF6B6B',
        textAlign: 'center',
        fontSize: 12,
        marginTop: -2,
        marginBottom: 8,
    },
    button: {
        marginTop: 15,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: '#4E8AF4',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 16,
    },
    footerContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    footerText: {
        textAlign: 'center',
        fontSize: 14,
    },
    linkText: {
        fontWeight: '600',
    },
});