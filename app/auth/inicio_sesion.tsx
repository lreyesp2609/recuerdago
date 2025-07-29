import { useLanguage } from '../../components/idioma/languagecontexttype';
import LanguageSelector from '../../components/idioma/languageselector';
import { useThemeColors } from '../../hooks/useThemeColor';

import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function LoginScreen() {
    const router = useRouter();
    const { t, isLoading } = useLanguage();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const colors = useThemeColors();

    const handleLogin = () => {
        console.log('Email:', email, 'Password:', password);
        // Aquí no se navega a ninguna ruta
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
                {/* Selector flotante - Respeta la SafeArea */}
                <View style={[
                    styles.floatingLanguageSelector,
                    {
                        backgroundColor: colors.floatingBg,
                        top: Platform.OS === 'ios' ? 60 : 50, // Valores seguros para ambas plataformas
                    }
                ]}>
                    <LanguageSelector showInHeader={true} />
                </View>

                <View style={styles.innerContainer}>
                    {/* Logo */}
                    <View style={styles.logoContainer}>
                        <Ionicons
                            name="location-sharp"
                            size={60}
                            color={colors.primary}
                            style={styles.logoIcon}
                        />
                        <Ionicons
                            name="alarm"
                            size={30}
                            color={colors.secondary}
                            style={[styles.bellIcon, { backgroundColor: colors.surface }]}
                        />
                    </View>

                    <Text style={[styles.title, { color: colors.text }]}>
                        {t('login.title')}
                    </Text>

                    {/* Email Input */}
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
                            placeholder={t('login.email')}
                            placeholderTextColor={colors.placeholder}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            keyboardAppearance={colors.isDark ? 'dark' : 'light'}
                        />
                    </View>

                    {/* Password Input */}
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
                            placeholder={t('login.password')}
                            placeholderTextColor={colors.placeholder}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            keyboardAppearance={colors.isDark ? 'dark' : 'light'}
                        />
                    </View>

                    {/* Login Button */}
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: colors.primary }]}
                        onPress={handleLogin}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>{t('login.button')}</Text>
                    </TouchableOpacity>

                    {/* Footer */}
                    <View style={styles.footerContainer}>
                        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                            {t('login.noAccount')}{' '}
                            <Text
                                style={[styles.linkText, { color: colors.primary }]}
                                onPress={() => router.push('/auth/registrar_usuario')}
                            >
                                {t('login.register')}
                            </Text>
                        </Text>
                    </View>
                </View>
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
    },
    logoContainer: {
        position: 'relative',
        alignSelf: 'center',
        marginBottom: 25,
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
        marginBottom: 40,
        fontSize: 24,
        fontWeight: '700'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginVertical: 8,
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
    button: {
        marginTop: 20,
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
        marginTop: 30,
    },
    footerText: {
        textAlign: 'center',
        fontSize: 14,
    },
    linkText: {
        fontWeight: '600',
    },
});