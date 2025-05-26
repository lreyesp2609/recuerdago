import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Switch, Text, View } from 'react-native';

export default function DatasetPublicoScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dataset Público</Text>

            <View style={styles.infoBox}>
                <MaterialCommunityIcons name="database" size={30} color="#4E8AF4" />
                <Text style={styles.infoText}>
                    Contribuye anónimamente a la investigación de patrones de movilidad urbana
                </Text>
            </View>

            <View style={styles.option}>
                <Text style={styles.optionText}>Compartir datos anónimos</Text>
                <Switch trackColor={{ false: "#767577", true: "#4E8AF4" }} />
            </View>

            <Text style={styles.disclaimer}>
                Los datos compartidos son completamente anónimos y no contienen información personal identificable.
            </Text>
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
    infoBox: {
        flexDirection: 'row',
        backgroundColor: '#EAF2F8',
        padding: 15,
        borderRadius: 10,
        marginBottom: 25,
        alignItems: 'center',
    },
    infoText: {
        flex: 1,
        marginLeft: 15,
        color: '#2C3E50',
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    optionText: {
        fontSize: 16,
    },
    disclaimer: {
        marginTop: 20,
        color: '#7F8C8D',
        fontSize: 12,
        textAlign: 'center',
    },
});