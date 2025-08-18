import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useThemeColors } from '../../hooks/useThemeColor';
import { useLanguage } from './languagecontexttype';

interface LanguageSelectorProps {
    showInHeader?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ showInHeader = false }) => {
    const { language, setLanguage, t } = useLanguage();
    const [modalVisible, setModalVisible] = useState(false);
    const colors = useThemeColors(); // Usar el sistema de colores temáticos

    const languages = [
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'en', name: 'English', flag: '🇺🇸' },
    ];

    const handleLanguageSelect = (langCode: string) => {
        setLanguage(langCode);
        setModalVisible(false);
    };

    const currentLanguage = languages.find(lang => lang.code === language);

    return (
        <View>
            <TouchableOpacity
                style={[
                    showInHeader ? styles.headerButton : styles.settingsButton,
                    {
                        backgroundColor: showInHeader 
                            ? colors.floatingBg || colors.surface 
                            : colors.surface,
                        borderColor: showInHeader ? 'transparent' : colors.inputBorder,
                    }
                ]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.flagText}>{currentLanguage?.flag}</Text>
                {!showInHeader && (
                    <Text style={[styles.buttonText, { color: colors.text }]}>
                        {t('settings.language')}
                    </Text>
                )}
                <Ionicons
                    name="chevron-down"
                    size={16}
                    color={colors.textSecondary}
                />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
                        <Text style={[styles.modalTitle, { color: colors.text }]}>
                            {t('settings.selectLanguage')}
                        </Text>

                        {languages.map((lang) => (
                            <TouchableOpacity
                                key={lang.code}
                                style={[
                                    styles.languageOption,
                                    language === lang.code && {
                                        backgroundColor: colors.isDark 
                                            ? 'rgba(78, 138, 244, 0.2)' 
                                            : '#E8F4FD'
                                    }
                                ]}
                                onPress={() => handleLanguageSelect(lang.code)}
                            >
                                <Text style={styles.flagText}>{lang.flag}</Text>
                                <Text style={[
                                    styles.languageText,
                                    { color: colors.text },
                                    language === lang.code && { 
                                        color: colors.primary,
                                        fontWeight: 'bold' 
                                    }
                                ]}>
                                    {lang.name}
                                </Text>
                                {language === lang.code && (
                                    <Ionicons name="checkmark" size={20} color={colors.primary} />
                                )}
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity
                            style={[
                                styles.closeButton,
                                { backgroundColor: colors.inputBackground }
                            ]}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={[styles.closeButtonText, { color: colors.textSecondary }]}>
                                {t('general.cancel')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    headerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderRadius: 20,
        minWidth: 60,
        justifyContent: 'center',
    },
    settingsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
        borderWidth: 1,
        justifyContent: 'space-between',
    },
    flagText: {
        fontSize: 18,
        marginRight: 5,
    },
    buttonText: {
        fontSize: 16,
        flex: 1,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        borderRadius: 20,
        padding: 20,
        margin: 20,
        minWidth: 300,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 8,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    languageOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
    },
    languageText: {
        fontSize: 16,
        flex: 1,
        marginLeft: 10,
    },
    closeButton: {
        marginTop: 20,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 16,
    },
});

export default LanguageSelector;