import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { supabase } from '../../supabase/supabase';

export default function VerifyScreen() {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const router = useRouter();
    const { email } = useLocalSearchParams<{ email: string }>();

    const handleVerify = async () => {
        if (!code.trim()) {
            Alert.alert('Error', 'Por favor ingresa el código de verificación');
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.auth.verifyOtp({
                email: email,
                token: code.trim(),
                type: 'signup'
            });

            if (error) throw error;

            Alert.alert(
                'Éxito',
                'Email verificado correctamente',
                [{ text: 'OK', onPress: () => router.replace('/login') }]
            );

        } catch (error: unknown) {
            console.error('Error de verificación:', error);
            let errorMessage = 'Error al verificar el código';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        setResending(true);
        try {
            const { error } = await supabase.auth.resend({
                type: 'signup',
                email: email,
            });

            if (error) throw error;

            Alert.alert('Éxito', 'Código de verificación reenviado');
        } catch (error: unknown) {
            console.error('Error al reenviar:', error);
            let errorMessage = 'Error al reenviar el código';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            Alert.alert('Error', errorMessage);
        } finally {
            setResending(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.innerContainer}>
                    <View style={styles.logoContainer}>
                        <Ionicons name="mail-outline" size={80} color="#4E8AF4" />
                    </View>

                    <Text style={styles.title}>Verificar Email</Text>
                    <Text style={styles.subtitle}>
                        Te hemos enviado un código de verificación a:
                    </Text>
                    <Text style={styles.email}>{email}</Text>

                    <View style={styles.inputContainer}>
                        <FontAwesome name="key" size={20} color="#ccc" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Código de verificación"
                            value={code}
                            onChangeText={setCode}
                            keyboardType="number-pad"
                            maxLength={6}
                            autoCapitalize="none"
                            autoFocus
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, loading && styles.disabledButton]}
                            onPress={handleVerify}
                            disabled={loading}
                        >
                            <Text style={styles.buttonText}>
                                {loading ? 'Verificando...' : 'Verificar'}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.resendButton}
                            onPress={handleResendCode}
                            disabled={resending}
                        >
                            <Text style={styles.resendText}>
                                {resending ? 'Reenviando...' : '¿No recibiste el código? Reenviar'}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => router.back()}>
                            <Text style={styles.backText}>Volver</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    innerContainer: {
        paddingHorizontal: 30,
    },
    logoContainer: {
        marginBottom: 40,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4E8AF4',
        textAlign: 'center',
        marginBottom: 30,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 20,
        width: '100%',
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: '#333',
    },
    buttonContainer: {
        width: '100%',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#4E8AF4',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    resendButton: {
        paddingVertical: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    resendText: {
        color: '#4E8AF4',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    backText: {
        color: '#666',
        fontSize: 14,
        textAlign: 'center',
    },
});