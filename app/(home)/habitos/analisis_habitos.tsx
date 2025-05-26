import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export default function AnalisisHabitosScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Análisis de Hábitos</Text>
            
            <View style={styles.card}>
                <MaterialCommunityIcons name="chart-line" size={40} color="#9B59B6" />
                <Text style={styles.cardTitle}>Tus patrones de movimiento</Text>
                <Text style={styles.cardText}>Recorridos frecuentes detectados: 3</Text>
            </View>

            <View style={styles.card}>
                <MaterialCommunityIcons name="clock" size={40} color="#4E8AF4" />
                <Text style={styles.cardTitle}>Horarios habituales</Text>
                <Text style={styles.cardText}>De 8:00 AM a 5:00 PM en días laborables</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F8F9FA',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2C3E50',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        marginBottom: 15,
        alignItems: 'center',
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginVertical: 10,
    },
    cardText: {
        textAlign: 'center',
        color: '#7F8C8D',
    },
});