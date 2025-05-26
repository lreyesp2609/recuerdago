import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ZonasSegurasScreen() {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Zonas Seguras</Text>
            
            <TouchableOpacity style={styles.addButton}>
                <MaterialCommunityIcons name="plus-circle" size={24} color="#4E8AF4" />
                <Text style={styles.addButtonText}>Agregar nueva zona</Text>
            </TouchableOpacity>

            <View style={styles.zoneCard}>
                <MaterialCommunityIcons name="home" size={30} color="#2ECC71" />
                <View style={styles.zoneInfo}>
                    <Text style={styles.zoneName}>Casa</Text>
                    <Text style={styles.zoneAddress}>Av. Principal 123</Text>
                </View>
            </View>

            <View style={styles.zoneCard}>
                <MaterialCommunityIcons name="school" size={30} color="#3498DB" />
                <View style={styles.zoneInfo}>
                    <Text style={styles.zoneName}>Universidad</Text>
                    <Text style={styles.zoneAddress}>Campus Central</Text>
                </View>
            </View>
        </ScrollView>
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
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        padding: 10,
    },
    addButtonText: {
        marginLeft: 10,
        color: '#4E8AF4',
        fontWeight: '600',
    },
    zoneCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        alignItems: 'center',
    },
    zoneInfo: {
        marginLeft: 15,
    },
    zoneName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    zoneAddress: {
        color: '#7F8C8D',
        fontSize: 14,
    },
});