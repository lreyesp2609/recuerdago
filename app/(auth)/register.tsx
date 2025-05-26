import { FontAwesome, Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { supabase } from '../../supabase/supabase';

export default function RegisterScreen() {
    // Estados para los datos del formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [genero, setGenero] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState(new Date());

    // Estados para el control del flujo
    const [currentStep, setCurrentStep] = useState(1);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showGenderModal, setShowGenderModal] = useState(false);
    const [loading, setLoading] = useState(false);

    // Estados para validación de email
    const [emailError, setEmailError] = useState('');
    const [emailStatus, setEmailStatus] = useState<'idle' | 'valid' | 'invalid' | 'error'>('idle');

    const router = useRouter();
    const totalSteps = 4;

    const opcionesGenero = [
        'Masculino',
        'Femenino',
        'Prefiero no decirlo'
    ];

    const formatDate = (date: Date): string => {
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatDateForDB = (date: Date): string => {
        return date.toISOString().split('T')[0];
    };

    const handleDateChange = (selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setFechaNacimiento(selectedDate);
        }
    };

    const checkEmailAvailability = async (email: string) => {
        if (!email) {
            setEmailStatus('idle');
            setEmailError('');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailStatus('invalid');
            setEmailError('Formato de correo inválido');
            return;
        }

        try {
            const { data: profilesData, error: profilesError } = await supabase
                .from('perfiles')
                .select('correo_electronico')
                .eq('correo_electronico', email.toLowerCase().trim());

            if (profilesError) throw profilesError;

            const { data: authData, error: authError } = await supabase
                .rpc('check_email_exists', { p_email: email.toLowerCase().trim() });

            if (authError) throw authError;

            if ((profilesData && profilesData.length > 0) || (authData?.exists)) {
                setEmailStatus('invalid');
                setEmailError('Este correo ya está registrado');
            } else {
                setEmailStatus('valid');
                setEmailError('');
            }
        } catch (error) {
            console.error('Error verificando email:', error);
            setEmailStatus('error');
            setEmailError('Error verificando disponibilidad');
        }
    };

    const validateCurrentStep = () => {
        switch (currentStep) {
            case 1:
                if (!nombre.trim() || !apellido.trim()) {
                    Alert.alert('Error', 'Por favor ingresa tu nombre y apellido');
                    return false;
                }
                break;
            case 2:
                // Validación de fecha - ya está seleccionada por defecto
                break;
            case 3:
                if (!email.trim()) {
                    Alert.alert('Error', 'Por favor ingresa tu correo electrónico');
                    return false;
                }
                if (emailStatus !== 'valid') {
                    Alert.alert('Error', 'Por favor ingresa un correo válido y disponible');
                    return false;
                }
                if (!password.trim()) {
                    Alert.alert('Error', 'Por favor ingresa tu contraseña');
                    return false;
                }
                if (password.length < 6) {
                    Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
                    return false;
                }
                break;
        }
        return true;
    };

    const handleNext = () => {
        if (validateCurrentStep()) {
            if (currentStep < totalSteps) {
                setCurrentStep(currentStep + 1);
            } else {
                handleRegister();
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        } else {
            router.back();
        }
    };

    const handleRegister = async () => {
        setLoading(true);

        try {
            const nombreCompleto = `${nombre.trim()} ${apellido.trim()}`;

            // 1. Registrar usuario en Auth (con nombre completo en metadata)
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: email.toLowerCase().trim(),
                password: password,
                options: {
                    data: {
                        nombre_completo: nombreCompleto,
                        display_name: nombreCompleto
                    }
                }
            });

            if (authError) throw authError;

            if (authData.user) {
                // 2. Crear perfil con nombres separados
                const { error: perfilError } = await supabase
                    .from('perfiles')
                    .insert({
                        id: authData.user.id,
                        nombre: nombre.trim(),
                        apellidos: apellido.trim(),
                        correo_electronico: email.toLowerCase().trim(),
                        genero: genero || null,
                        fecha_nacimiento: formatDateForDB(fechaNacimiento),
                        rol_id: 1
                    });

                if (perfilError) throw perfilError;

                router.push({
                    pathname: '/verify',
                    params: { email: email.toLowerCase().trim() }
                });
            }

        } catch (error: any) {
            console.error('Error completo:', error);
            Alert.alert('Error', error?.message || 'Error durante el registro');
        } finally {
            setLoading(false);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepTitle}>¿Cómo te llamas?</Text>
                        <Text style={styles.stepSubtitle}>Ingresa tu nombre y apellido</Text>

                        <View style={styles.inputContainer}>
                            <FontAwesome name="user" size={20} color="#ccc" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Nombre"
                                value={nombre}
                                onChangeText={setNombre}
                                autoCapitalize="words"
                                autoFocus
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <FontAwesome name="user" size={20} color="#ccc" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Apellido"
                                value={apellido}
                                onChangeText={setApellido}
                                autoCapitalize="words"
                            />
                        </View>
                    </View>
                );

            case 2:
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepTitle}>¿Cuándo naciste?</Text>
                        <Text style={styles.stepSubtitle}>Selecciona tu fecha de nacimiento</Text>

                        <TouchableOpacity
                            style={styles.inputContainer}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <FontAwesome name="calendar" size={20} color="#ccc" style={styles.inputIcon} />
                            <Text style={[styles.input, styles.selectText]}>
                                {formatDate(fechaNacimiento)}
                            </Text>
                            <FontAwesome name="chevron-down" size={16} color="#ccc" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.inputContainer, styles.genderContainer]}
                            onPress={() => setShowGenderModal(true)}
                        >
                            <FontAwesome name="venus-mars" size={20} color="#ccc" style={styles.inputIcon} />
                            <Text style={[styles.input, styles.selectText, !genero && styles.placeholderText]}>
                                {genero || 'Género (opcional)'}
                            </Text>
                            <FontAwesome name="chevron-down" size={16} color="#ccc" />
                        </TouchableOpacity>
                    </View>
                );

            case 3:
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepTitle}>Datos de acceso</Text>
                        <Text style={styles.stepSubtitle}>Ingresa tu correo y contraseña</Text>

                        <View style={styles.inputContainer}>
                            <FontAwesome name="envelope" size={20} color="#ccc" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Correo electrónico"
                                value={email}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    checkEmailAvailability(text);
                                }}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoFocus
                            />
                            {emailStatus === 'valid' && (
                                <Ionicons name="checkmark-circle" size={24} color="#4CAF50" style={styles.statusIcon} />
                            )}
                            {(emailStatus === 'invalid' || emailStatus === 'error') && (
                                <Ionicons name="close-circle" size={24} color="#F44336" style={styles.statusIcon} />
                            )}
                        </View>
                        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                        <View style={styles.inputContainer}>
                            <FontAwesome name="lock" size={20} color="#ccc" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Contraseña (mín. 6 caracteres)"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>
                    </View>
                );

            case 4:
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepTitle}>¡Confirma tus datos!</Text>
                        <Text style={styles.stepSubtitle}>Revisa que todo esté correcto</Text>

                        <View style={styles.summaryContainer}>
                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryLabel}>Nombre:</Text>
                                <Text style={styles.summaryValue}>{nombre} {apellido}</Text>
                            </View>

                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryLabel}>Fecha de nacimiento:</Text>
                                <Text style={styles.summaryValue}>{formatDate(fechaNacimiento)}</Text>
                            </View>

                            {genero && (
                                <View style={styles.summaryItem}>
                                    <Text style={styles.summaryLabel}>Género:</Text>
                                    <Text style={styles.summaryValue}>{genero}</Text>
                                </View>
                            )}

                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryLabel}>Correo:</Text>
                                <Text style={styles.summaryValue}>{email}</Text>
                            </View>
                        </View>
                    </View>
                );

            default:
                return null;
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        >
            <ScrollView
                style={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.innerContainer}>


                    {/* Indicador de progreso */}
                    <View style={styles.progressContainer}>
                        <Text style={styles.progressText}>Paso {currentStep} de {totalSteps}</Text>
                        <View style={styles.progressBar}>
                            <View
                                style={[
                                    styles.progressFill,
                                    { width: `${(currentStep / totalSteps) * 100}%` }
                                ]}
                            />
                        </View>
                    </View>

                    {/* Contenido del paso actual */}
                    {renderStep()}

                    {/* Botones de navegación */}
                    <View style={styles.fixedButtonContainer}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={handleBack}
                        >
                            <FontAwesome name="arrow-left" size={16} color="#666" />
                            <Text style={styles.backButtonText}>Atrás</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.nextButton, loading && styles.disabledButton]}
                            onPress={handleNext}
                            disabled={loading}
                        >
                            <Text style={styles.nextButtonText}>
                                {loading ? 'Registrando...' :
                                    currentStep === totalSteps ? 'Registrarse' : 'Siguiente'}
                            </Text>
                            {currentStep < totalSteps && (
                                <FontAwesome name="arrow-right" size={16} color="#fff" style={styles.arrowIcon} />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Modal para seleccionar género */}
            <Modal
                visible={showGenderModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowGenderModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Selecciona tu género</Text>
                        {opcionesGenero.map((opcion, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.modalOption}
                                onPress={() => {
                                    setGenero(opcion);
                                    setShowGenderModal(false);
                                }}
                            >
                                <Text style={styles.modalOptionText}>{opcion}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            style={styles.modalCancel}
                            onPress={() => setShowGenderModal(false)}
                        >
                            <Text style={styles.modalCancelText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* DateTimePicker */}
            {showDatePicker && (
                <DateTimePicker
                    value={fechaNacimiento}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event: any, selectedDate?: Date) => handleDateChange(selectedDate)}
                    maximumDate={new Date()}
                    minimumDate={new Date(1900, 0, 1)}
                />
            )}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    keyboardContainer: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 100, // Espacio para los botones fijos
    },
    innerContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        minHeight: 400,
    },
    progressContainer: {
        marginBottom: 40,
        alignItems: 'center',
        marginTop: 20,
    },
    progressText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    progressBar: {
        width: '100%',
        height: 6,
        backgroundColor: '#E0E0E0',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#4E8AF4',
        borderRadius: 3,
    },
    stepContainer: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 40,
    },
    stepTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#333',
    },
    stepSubtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 40,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        minHeight: 50,
        paddingVertical: 5,
    },
    genderContainer: {
        marginTop: 20,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        paddingVertical: 0,
    },
    inputIcon: {
        marginRight: 10,
    },
    selectText: {
        paddingTop: 15,
        color: '#333',
    },
    placeholderText: {
        color: '#999',
    },
    statusIcon: {
        marginLeft: 10,
        alignSelf: 'center',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        marginLeft: 10,
        fontSize: 14,
    },
    summaryContainer: {
        backgroundColor: '#F8F9FA',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    summaryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    summaryLabel: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
    },
    summaryValue: {
        fontSize: 16,
        color: '#333',
        fontWeight: '600',
        flex: 1,
        textAlign: 'right',
        marginLeft: 10,
    },
    fixedButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
    },
    backButtonText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#666',
    },
    nextButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4E8AF4',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 10,
        flex: 1,
        marginLeft: 15,
        justifyContent: 'center',
    },
    nextButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    arrowIcon: {
        marginLeft: 8,
    },
    disabledButton: {
        backgroundColor: '#cccccc',
    },
    // Estilos del modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        maxWidth: 300,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    modalOption: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalOptionText: {
        fontSize: 16,
        textAlign: 'center',
    },
    modalCancel: {
        paddingVertical: 15,
        marginTop: 10,
    },
    modalCancelText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
});