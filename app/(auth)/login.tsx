import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // En tu LoginScreen (login.tsx)
    const handleLogin = () => {
        console.log('Email:', email, 'Password:', password);
        // Después de la lógica de autenticación exitosa:
        router.replace('/(home)/'); // Usamos replace para no poder volver atrás
    };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.innerContainer}>
                {/* Nuevo logo */}
                <View style={styles.logoContainer}>
                    <Ionicons name="location-sharp" size={60} color="#4E8AF4" style={styles.logoIcon} />
                    <Ionicons name="alarm" size={30} color="#FF6B6B" style={styles.bellIcon} />
                </View>

                <Text style={styles.title}>RecuerdaGo</Text>

                <View style={styles.inputContainer}>
                    <FontAwesome name="envelope" size={20} color="#ccc" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Correo electrónico"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <FontAwesome name="lock" size={20} color="#ccc" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </TouchableOpacity>

                <Text style={styles.footerText}>
                    ¿No tienes cuenta?{' '}
                    <Text style={styles.linkText} onPress={() => router.push('/register')}>
                        Regístrate
                    </Text>
                </Text>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    // Nuevos estilos para el logo
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
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    headlineMedium: {
        fontSize: 24,
        fontWeight: 'bold',
        lineHeight: 32,
    },
    title: {
        textAlign: 'center',
        marginBottom: 20,
        color: '#2C3E50',
        fontSize: 24,
        fontWeight: '700'
    },
    icon: {
        alignSelf: 'center',
        marginBottom: 30,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#4E8AF4',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    footerText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#666',
    },
    linkText: {
        color: '#4E8AF4',
        fontWeight: 'bold',
    },
});