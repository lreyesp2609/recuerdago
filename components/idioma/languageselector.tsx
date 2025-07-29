import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useLanguage } from './languagecontexttype';

interface LanguageSelectorProps {
    showInHeader?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ showInHeader = false }) => {
    const { language, setLanguage, t } = useLanguage();
    const [modalVisible, setModalVisible] = useState(false);

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
                style={showInHeader ? styles.headerButton : styles.settingsButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.flagText}>{currentLanguage?.flag}</Text>
                {!showInHeader && (
                    <Text style={styles.buttonText}>{t('settings.language')}</Text>
                )}
                <Ionicons
                    name="chevron-down"
                    size={16}
                    color={showInHeader ? "#666" : "#333"}
                />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{t('settings.selectLanguage')}</Text>

                        {languages.map((lang) => (
                            <TouchableOpacity
                                key={lang.code}
                                style={[
                                    styles.languageOption,
                                    language === lang.code && styles.selectedOption
                                ]}
                                onPress={() => handleLanguageSelect(lang.code)}
                            >
                                <Text style={styles.flagText}>{lang.flag}</Text>
                                <Text style={[
                                    styles.languageText,
                                    language === lang.code && styles.selectedText
                                ]}>
                                    {lang.name}
                                </Text>
                                {language === lang.code && (
                                    <Ionicons name="checkmark" size={20} color="#4E8AF4" />
                                )}
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>{t('general.cancel')}</Text>
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
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        minWidth: 60,
        justifyContent: 'center',
    },
    settingsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'space-between',
    },
    flagText: {
        fontSize: 18,
        marginRight: 5,
    },
    buttonText: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        margin: 20,
        minWidth: 300,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    languageOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
    },
    selectedOption: {
        backgroundColor: '#E8F4FD',
    },
    languageText: {
        fontSize: 16,
        flex: 1,
        marginLeft: 10,
        color: '#333',
    },
    selectedText: {
        color: '#4E8AF4',
        fontWeight: 'bold',
    },
    closeButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 16,
        color: '#666',
    },
});

export default LanguageSelector;