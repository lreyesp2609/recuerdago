import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Tipos para el contexto
interface LanguageContextType {
    language: string;
    setLanguage: (lang: string) => void;
    t: (key: string) => string;
    isLoading: boolean;
}

// Traducciones
const translations = {
    es: {
        // Login Screen
        'login.title': 'RecuerdaGo',
        'login.email': 'Correo electrónico',
        'login.password': 'Contraseña',
        'login.button': 'Iniciar Sesión',
        'login.noAccount': '¿No tienes cuenta?',
        'login.register': 'Regístrate',

        // Register Screen
        'register.title': '¡Únete a RecuerdaGo! 🚀',
        'register.subtitle': 'Crea tu cuenta y nunca más olvides nada',
        'register.name': 'Tu nombre',
        'register.lastName': 'Tus apellidos',
        'register.email': 'tu@email.com',
        'register.password': 'Contraseña súper secreta',
        'register.confirmPassword': 'Repite tu contraseña',
        'register.button': '¡Crear mi cuenta! 🎉',
        'register.hasAccount': '¿Ya tienes cuenta?',
        'register.signIn': '¡Inicia sesión aquí! 👈',
        'register.passwordsNotMatch': 'Las contraseñas no coinciden',
        'register.passwordMinLength': 'Mínimo 6 caracteres',

        // General
        'general.cancel': 'Cancelar',

        // Settings
        'settings.language': 'Idioma',
        'settings.selectLanguage': 'Seleccionar Idioma',
    },
    en: {
        // Login Screen
        'login.title': 'RecuerdaGo',
        'login.email': 'Email',
        'login.password': 'Password',
        'login.button': 'Sign In',
        'login.noAccount': 'Don\'t have an account?',
        'login.register': 'Sign Up',

        // Register Screen
        'register.title': 'Join RecuerdaGo! 🚀',
        'register.subtitle': 'Create your account and never forget anything',
        'register.name': 'Your name',
        'register.lastName': 'Your last name',
        'register.email': 'your@email.com',
        'register.password': 'Super secret password',
        'register.confirmPassword': 'Repeat your password',
        'register.button': 'Create my account! 🎉',
        'register.hasAccount': 'Already have an account?',
        'register.signIn': 'Sign in here! 👈',
        'register.passwordsNotMatch': 'Passwords don\'t match',
        'register.passwordMinLength': 'Minimum 6 characters',

        // General
        'general.cancel': 'Cancel',

        // Settings
        'settings.language': 'Language',
        'settings.selectLanguage': 'Select Language',
    }
};

// Crear el contexto
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Constante para la clave de AsyncStorage
const LANGUAGE_KEY = '@app_language';

// Función para detectar el idioma del sistema
const getSystemLanguage = (): string => {
    try {
        // Usar getLocales() en lugar de Localization.locale
        const locales = getLocales();

        if (locales && locales.length > 0) {
            // Obtener el primer locale del array
            const primaryLocale = locales[0];

            // Extraer el código del idioma usando la estructura correcta del objeto Locale
            let languageCode = 'es'; // Por defecto

            // Según la documentación, el objeto Locale tiene estas propiedades:
            if (primaryLocale.languageCode) {
                // languageCode es la propiedad principal para el código del idioma
                languageCode = primaryLocale.languageCode;
            } else if (primaryLocale.languageTag) {
                // languageTag es como "es-ES", "en-US", etc.
                languageCode = primaryLocale.languageTag.split('-')[0];
            }

            // Verificar si el idioma está soportado
            const supportedLanguages = ['es', 'en'];
            const detectedLanguage = supportedLanguages.includes(languageCode) ? languageCode : 'es';

            console.log('Detected language:', detectedLanguage, 'from locale:', primaryLocale);
            return detectedLanguage;
        }

        console.warn('No locales found, using default language');
        return 'es';
    } catch (error) {
        console.error('Error detecting system language:', error);
        return 'es'; // Idioma por defecto en caso de error
    }
};

// Provider del contexto
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<string>('es');
    const [isLoading, setIsLoading] = useState(true);

    // Cargar idioma guardado al iniciar la app
    useEffect(() => {
        loadLanguage();
    }, []);

    const loadLanguage = async () => {
        try {
            // Intentar cargar el idioma guardado
            const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);

            if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
                // Si hay un idioma guardado válido, usarlo
                setLanguageState(savedLanguage);
                console.log('Loaded saved language:', savedLanguage);
            } else {
                // Si no hay idioma guardado o es inválido, detectar automáticamente del sistema
                const systemLanguage = getSystemLanguage();
                setLanguageState(systemLanguage);
                console.log('Using system language:', systemLanguage);

                // Guardar la detección automática para futuras sesiones
                try {
                    await AsyncStorage.setItem(LANGUAGE_KEY, systemLanguage);
                } catch (saveError) {
                    console.error('Error saving detected language:', saveError);
                }
            }
        } catch (error) {
            console.error('Error loading language:', error);
            // En caso de error, usar español por defecto
            setLanguageState('es');
        } finally {
            // Asegurarse de que el loading termine
            setIsLoading(false);
        }
    };

    const setLanguage = async (lang: string) => {
        try {
            await AsyncStorage.setItem(LANGUAGE_KEY, lang);
            setLanguageState(lang);
        } catch (error) {
            console.error('Error saving language:', error);
        }
    };

    // Función para obtener traducciones
    const t = (key: string): string => {
        const languageTranslations = translations[language as keyof typeof translations];
        return languageTranslations?.[key as keyof typeof languageTranslations] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, isLoading }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

// Componente por defecto
const LanguageContextComponent = () => {
    return null;
};

export default LanguageContextComponent;