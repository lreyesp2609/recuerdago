// app/(home)/index.tsx
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

// Función para calcular tamaño de fuente responsivo
const responsiveFontSize = (size: number) => {
    const scale = Math.min(width, height) / 400; // 400 es nuestro tamaño base de referencia
    return Math.round(size * scale);
};

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <MaterialCommunityIcons
                    name="map-marker-path"
                    size={responsiveFontSize(40)}
                    color="#3498db"
                />
                <Text style={styles.title}>Bienvenido a RecuerdaGo</Text>
            </View>

            <Text style={styles.subtitle}>
                Tu asistente personal para recordar recorridos importantes
            </Text>

            <View style={styles.featureContainer}>
                <View style={styles.featureItem}>
                    <MaterialCommunityIcons
                        name="bell-alert"
                        size={responsiveFontSize(30)}
                        color="#e74c3c"
                    />
                    <Text style={styles.featureText}>Alertas inteligentes</Text>
                </View>

                <View style={styles.featureItem}>
                    <MaterialCommunityIcons
                        name="map-check"
                        size={responsiveFontSize(30)}
                        color="#2ecc71"
                    />
                    <Text style={styles.featureText}>Monitoreo en tiempo real</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: width * 0.05, // 5% del ancho de pantalla
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.02, // 2% de la altura
    },
    title: {
        fontSize: responsiveFontSize(24),
        fontWeight: 'bold',
        marginLeft: width * 0.02,
        color: '#2C3E50',
        flex: 1,          // toma todo el espacio horizontal posible
        // quito maxWidth: '80%',
        flexShrink: 1,    // opcional, para que se adapte bien en pantallas chicas
    },

    subtitle: {
        fontSize: responsiveFontSize(16),
        color: '#7f8c8d',
        marginBottom: height * 0.04,
        lineHeight: responsiveFontSize(20),
    },
    featureContainer: {
        marginTop: height * 0.03,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: responsiveFontSize(10),
        padding: responsiveFontSize(15),
        marginBottom: height * 0.02,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: responsiveFontSize(2) },
        shadowOpacity: 0.1,
        shadowRadius: responsiveFontSize(6),
        elevation: 3,
    },
    featureText: {
        fontSize: responsiveFontSize(16),
        marginLeft: width * 0.04,
        color: '#34495e',
        flexShrink: 1,
    },
});