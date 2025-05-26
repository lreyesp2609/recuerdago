import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Logout() {
    const router = useRouter();

    const handleLogout = () => {
        // Aquí iría la lógica de cierre de sesión
        router.replace('/(auth)/login');
    };

    return (
        <View style={styles.container}>
            <MaterialIcons name="warning" size={60} color="#FF6B6B" style={styles.icon} />
            <Text style={styles.title}>¿Cerrar sesión?</Text>
            <Text style={styles.subtitle}>Estás a punto de salir de RecuerdaGo</Text>
            
            <TouchableOpacity 
                style={styles.logoutButton}
                onPress={handleLogout}
            >
                <Text style={styles.logoutButtonText}>Confirmar cierre de sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => router.back()}
            >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F8F9FA',
    },
    icon: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#2C3E50',
    },
    subtitle: {
        fontSize: 16,
        color: '#7F8C8D',
        marginBottom: 30,
        textAlign: 'center',
    },
    logoutButton: {
        backgroundColor: '#FF6B6B',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginBottom: 15,
    },
    logoutButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    cancelButton: {
        padding: 15,
        width: '100%',
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#4E8AF4',
        fontWeight: '600',
        fontSize: 16,
    },
});