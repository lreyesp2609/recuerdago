import { Feather } from '@expo/vector-icons';
import { StyleSheet, Switch, Text, View } from 'react-native';

export default function Configuración() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Configuración</Text>

            <View style={styles.option}>
                <Feather name="bell" size={24} color="#4E8AF4" />
                <Text style={styles.optionText}>Notificaciones</Text>
                <Switch trackColor={{ false: "#767577", true: "#4E8AF4" }} />
            </View>

            <View style={styles.option}>
                <Feather name="map-pin" size={24} color="#4E8AF4" />
                <Text style={styles.optionText}>Precisión de ubicación</Text>
                <Text style={styles.optionValue}>Alta</Text>
            </View>

            <View style={styles.option}>
                <Feather name="shield" size={24} color="#4E8AF4" />
                <Text style={styles.optionText}>Privacidad</Text>
            </View>

            <View style={styles.option}>
                <Feather name="help-circle" size={24} color="#4E8AF4" />
                <Text style={styles.optionText}>Ayuda y soporte</Text>
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
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    optionText: {
        flex: 1,
        marginLeft: 15,
        fontSize: 16,
    },
    optionValue: {
        color: '#7F8C8D',
    },
});