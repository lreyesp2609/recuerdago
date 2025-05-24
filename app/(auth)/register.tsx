import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const router = useRouter(); // Reemplaza navigation

    const handleRegister = () => {
        console.log('Registrando:', { name, email, password });
        // Lógica de registro aquí
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.innerContainer}>
                <View style={styles.logoContainer}>
                    <Ionicons name="location-sharp" size={60} color="#4E8AF4" style={styles.logoIcon} />
                    <Ionicons name="alarm" size={30} color="#FF6B6B" style={styles.bellIcon} />
                </View>

                <Text style={styles.title}>Crear Cuenta</Text>

                <View style={styles.inputContainer}>
                    <FontAwesome name="user" size={20} color="#ccc" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre completo"
                        value={name}
                        onChangeText={setName}
                        autoCapitalize="words"
                    />
                </View>

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

                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>

                <Text style={styles.footerText}>
                    ¿Ya tienes cuenta?{' '}
                    <Text style={styles.linkText} onPress={() => router.back()}>
                        Inicia Sesión
                    </Text>
                </Text>
            </View>
        </KeyboardAvoidingView>
    );
}

// Reutiliza los mismos estilos del Login o personalízalos
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
    title: {
        textAlign: 'center',
        marginBottom: 20,
        color: '#2C3E50',
        fontSize: 24,
        fontWeight: '700'
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