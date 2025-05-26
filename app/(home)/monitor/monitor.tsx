import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const responsiveFontSize = (size: number) => {
    const scale = Math.min(width, height) / 400; // Base 400px
    return Math.round(size * scale);
};

export default function MonitorScreen() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <MaterialIcons name="gps-fixed" size={responsiveFontSize(40)} color="#3498db" />
                <Text style={styles.title}>Monitoreo de Recorridos</Text>
            </View>

            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Ionicons name="location" size={responsiveFontSize(24)} color="#2ecc71" />
                    <Text style={styles.cardTitle}>Ruta Actual</Text>
                </View>
                <Text style={styles.cardText}>
                    Detectando tu ubicación en tiempo real...
                </Text>
            </View>

            <View style={[styles.card, styles.alertCard]}>
                <View style={styles.cardHeader}>
                    <Ionicons name="alert-circle" size={responsiveFontSize(24)} color="#e74c3c" />
                    <Text style={styles.cardTitle}>Sistema de Alertas</Text>
                </View>
                <Text style={styles.cardText}>
                    Te avisaremos si te desvías de manera inusual de tu ruta programada
                </Text>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Ionicons name="time" size={responsiveFontSize(30)} color="#9b59b6" />
                    <Text style={styles.statText}>15 min</Text>
                    <Text style={styles.statLabel}>Tiempo estimado</Text>
                </View>

                <View style={styles.statItem}>
                    <MaterialIcons name="directions-walk" size={responsiveFontSize(30)} color="#1abc9c" />
                    <Text style={styles.statText}>1.2 km</Text>
                    <Text style={styles.statLabel}>Distancia</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: width * 0.05, // 5% ancho pantalla
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.03, // 3% alto pantalla
    },
    title: {
        fontSize: responsiveFontSize(24),
        fontWeight: 'bold',
        marginLeft: width * 0.025,
        color: '#2C3E50',
        flexShrink: 1,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: responsiveFontSize(12),
        padding: responsiveFontSize(20),
        marginBottom: height * 0.025,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: responsiveFontSize(2) },
        shadowOpacity: 0.1,
        shadowRadius: responsiveFontSize(6),
        elevation: 3,
    },
    alertCard: {
        borderLeftWidth: responsiveFontSize(5),
        borderLeftColor: '#e74c3c',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: responsiveFontSize(10),
    },
    cardTitle: {
        fontSize: responsiveFontSize(18),
        fontWeight: '600',
        marginLeft: width * 0.025,
        color: '#2C3E50',
        flexShrink: 1,
    },
    cardText: {
        fontSize: responsiveFontSize(14),
        color: '#7f8c8d',
        lineHeight: responsiveFontSize(20),
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: height * 0.015,
    },
    statItem: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: responsiveFontSize(12),
        padding: responsiveFontSize(15),
        width: '48%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: responsiveFontSize(2) },
        shadowOpacity: 0.1,
        shadowRadius: responsiveFontSize(6),
        elevation: 3,
    },
    statText: {
        fontSize: responsiveFontSize(22),
        fontWeight: 'bold',
        color: '#2C3E50',
        marginVertical: responsiveFontSize(5),
    },
    statLabel: {
        fontSize: responsiveFontSize(12),
        color: '#7f8c8d',
        textAlign: 'center',
    },
});
