import { Text, View } from 'react-native';
import { useThemeColors } from '../../../hooks/useThemeColor';

export default function RecordatoriosScreen() {
    const colors = useThemeColors();
    
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
            <Text style={{ color: colors.text, fontSize: 18 }}>📍 Recordatorios - Próximamente</Text>
        </View>
    );
}