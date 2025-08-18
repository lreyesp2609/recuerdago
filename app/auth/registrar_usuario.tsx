import { useLanguage } from '../../components/idioma/languagecontexttype';
import LanguageSelector from '../../components/idioma/languageselector';
import { useThemeColors } from '../../hooks/useThemeColor';

import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Animated,
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
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
    const [isRegistering, setIsRegistering] = useState(false);
    const colors = useThemeColors();

    // Animaciones
    const bounceValue = new Animated.Value(0);
    const rotateValue = new Animated.Value(0);

    useEffect(() => {
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

        Animated.loop(
            Animated.timing(rotateValue, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    useEffect(() => {
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

    const handleRegister = async () => {
        if (!nombre || !apellidos || !email || !password) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Error', 'Por favor ingresa un email válido');
            return;
        }

        if (!passwordsMatch) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setIsRegistering(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            console.log('✅ Usuario registrado exitosamente:', {
                nombre,
                apellidos,
                email
            });

            router.replace('/tabs');
        } catch (error) {
            console.error('Error en registro:', error);
            Alert.alert('Error', 'Error al crear la cuenta. Inténtalo de nuevo.');
        } finally {
            setIsRegistering(false);
        }
    };

    const handleBackToLogin = () => {
        if (isRegistering) return;
        router.back();
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
            <KeyboardAvoidingView behavior="height" style={styles.container}>
                {/* Selector flotante */}
                <View style={[
                    styles.floatingLanguageSelector,
                    { backgroundColor: colors.floatingBg, top: 50 }
                ]}>
                    <LanguageSelector showInHeader={true} />
                </View>

                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    bounces={false}
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
                                size={50}
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
                                    size={24}
                                    color={colors.secondary}
                                />
                            </Animated.View>
                        </Animated.View>

                        <Text style={[styles.title, { color: colors.text }]}>
                            {t('register.title') || 'Crear Cuenta'}
                        </Text>

                        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                            {t('register.subtitle') || '¡Únete a RecuerdaGo!'}
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
                                size={18}
                                color={colors.inputIcon}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={[styles.input, { color: colors.text }]}
                                placeholder={t('register.name') || 'Nombre'}
                                placeholderTextColor={colors.placeholder}
                                value={nombre}
                                onChangeText={setNombre}
                                autoCapitalize="words"
                                keyboardAppearance={colors.isDark ? 'dark' : 'light'}
                                editable={!isRegistering}
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
                                size={18}
                                color={colors.inputIcon}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={[styles.input, { color: colors.text }]}
                                placeholder={t('register.lastName') || 'Apellidos'}
                                placeholderTextColor={colors.placeholder}
                                value={apellidos}
                                onChangeText={setApellidos}
                                autoCapitalize="words"
                                keyboardAppearance={colors.isDark ? 'dark' : 'light'}
                                editable={!isRegistering}
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
                                size={18}
                                color={colors.inputIcon}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={[styles.input, { color: colors.text }]}
                                placeholder={t('register.email') || 'Email'}
                                placeholderTextColor={colors.placeholder}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                keyboardAppearance={colors.isDark ? 'dark' : 'light'}
                                editable={!isRegistering}
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
                                size={18}
                                color={colors.inputIcon}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={[styles.input, { color: colors.text }]}
                                placeholder={t('register.password') || 'Contraseña'}
                                placeholderTextColor={colors.placeholder}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                keyboardAppearance={colors.isDark ? 'dark' : 'light'}
                                editable={!isRegistering}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                style={styles.eyeIcon}
                                disabled={isRegistering}
                            >
                                <Ionicons
                                    name={showPassword ? "eye-off" : "eye"}
                                    size={18}
                                    color={colors.inputIcon}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Indicador de longitud mínima */}
                        {password.length > 0 && password.length < 6 && (
                            <Text style={[styles.passwordHint, { color: colors.textSecondary }]}>
                                {t('register.passwordMinLength')}
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
                                size={18}
                                color={colors.inputIcon}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={[styles.input, { color: colors.text }]}
                                placeholder={t('register.confirmPassword') || 'Confirmar contraseña'}
                                placeholderTextColor={colors.placeholder}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!showPassword}
                                keyboardAppearance={colors.isDark ? 'dark' : 'light'}
                                editable={!isRegistering}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                style={styles.eyeIcon}
                                disabled={isRegistering}
                            >
                                <Ionicons
                                    name={showPassword ? "eye-off" : "eye"}
                                    size={18}
                                    color={colors.inputIcon}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Mensaje de contraseñas no coinciden */}
                        {!passwordsMatch && confirmPassword.length > 0 && (
                            <Text style={styles.errorText}>
                                {t('register.passwordsNotMatch')}
                            </Text>
                        )}

                        {/* Botón de registro */}
                        <TouchableOpacity
                            style={[
                                styles.button,
                                {
                                    backgroundColor: colors.primary,
                                    opacity: (isRegistering || !passwordsMatch || !nombre || !apellidos || !email || !password) ? 0.7 : 1
                                }
                            ]}
                            onPress={handleRegister}
                            activeOpacity={0.8}
                            disabled={isRegistering || !passwordsMatch || !nombre || !apellidos || !email || !password}
                        >
                            {isRegistering ? (
                                <View style={styles.loadingButton}>
                                    <ActivityIndicator
                                        size="small"
                                        color="#ffffff"
                                        style={styles.loadingIndicator}
                                    />
                                    <Text style={styles.buttonText}>Creando cuenta...</Text>
                                </View>
                            ) : (
                                <Text style={styles.buttonText}>{t('register.button') || 'Crear Cuenta'}</Text>
                            )}
                        </TouchableOpacity>

                        {/* Footer */}
                        <View style={styles.footerContainer}>
                            <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                                {t('register.hasAccount') || '¿Ya tienes cuenta?'}{' '}
                                <Text
                                    style={[
                                        styles.linkText,
                                        {
                                            color: isRegistering ? colors.textSecondary : colors.primary,
                                            opacity: isRegistering ? 0.5 : 1
                                        }
                                    ]}
                                    onPress={handleBackToLogin}
                                >
                                    {t('register.signIn') || 'Iniciar Sesión'}
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
        paddingTop: 100,
        paddingBottom: 40,
    },
    logoContainer: {
        position: 'relative',
        alignSelf: 'center',
        marginBottom: 20,
    },
    logoIcon: {
        opacity: 0.9,
    },
    bellIcon: {
        position: 'absolute',
        right: -8,
        top: -8,
        borderRadius: 12,
        padding: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        textAlign: 'center',
        marginBottom: 8,
        fontSize: 22,
        fontWeight: '700'
    },
    subtitle: {
        textAlign: 'center',
        marginBottom: 25,
        fontSize: 15,
        fontStyle: 'italic',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginVertical: 5,
        borderWidth: 1,
        height: 48,
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
    passwordHint: {
        textAlign: 'center',
        fontSize: 11,
        marginTop: -2,
        marginBottom: 8,
        fontWeight: '500',
    },
    errorText: {
        color: '#FF6B6B',
        textAlign: 'center',
        fontSize: 11,
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
    loadingButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    loadingIndicator: {
        marginRight: 8,
    },
    footerContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    footerText: {
        textAlign: 'center',
        fontSize: 14,
    },
    linkText: {
        fontWeight: '600',
    },
});