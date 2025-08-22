import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Toast from 'react-native-toast-message';
import { decodeToken, refreshAccessToken } from '../config/api';

interface Usuario {
    nombre: string;
    apellido: string;
}

interface SessionContextProps {
    usuario: Usuario | null;
    cerrarSesion: () => void;
    isLoading: boolean;
}

const SessionContext = createContext<SessionContextProps>({
    usuario: null,
    cerrarSesion: () => { },
    isLoading: true,
});

export const useSession = () => useContext(SessionContext);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    
    // Referencias para evitar llamadas duplicadas
    const isValidatingRef = useRef(false);
    const lastValidationRef = useRef(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

    const cerrarSesion = async () => {
        // Limpiar interval al cerrar sesión
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        
        await AsyncStorage.removeItem('access_token');
        await AsyncStorage.removeItem('refresh_token');
        setUsuario(null);
        router.replace('/auth/inicio_sesion');
    };

    const verificarYRenovarToken = async (force = false): Promise<boolean> => {
        // Evitar llamadas duplicadas - solo si han pasado al menos 30 segundos o es forzado
        const now = Date.now();
        if (!force && (isValidatingRef.current || (now - lastValidationRef.current) < 30000)) {
            console.log('🔒 Validación en progreso o muy reciente, saltando...');
            return usuario !== null;
        }

        isValidatingRef.current = true;
        lastValidationRef.current = now;

        try {
            let accessToken = await AsyncStorage.getItem('access_token');
            if (!accessToken) {
                console.log('❌ No hay access token');
                return false;
            }

            try {
                // Intentar decodificar el token actual
                const data = await decodeToken(accessToken);
                setUsuario({ nombre: data.nombre, apellido: data.apellido });
                console.log('✅ Token válido - Usuario cargado');
                return true;
            } catch (error: any) {
                console.log('⚠️ Token inválido/expirado, intentando renovar...');
                
                // Solo renovar si el error es por token expirado
                if (error.message?.includes('TOKEN_EXPIRADO') || 
                    error.message?.includes('401') ||
                    error.message?.includes('Error 401')) {
                    
                    try {
                        const newAccessToken = await refreshAccessToken();
                        const data = await decodeToken(newAccessToken);
                        setUsuario({ nombre: data.nombre, apellido: data.apellido });
                        console.log('✅ Token renovado exitosamente');
                        return true;
                    } catch (refreshError) {
                        console.log('❌ Error renovando token:', refreshError);
                        return false;
                    }
                } else {
                    console.log('❌ Error no relacionado con expiración:', error.message);
                    return false;
                }
            }
        } catch (error) {
            console.log('❌ Error general verificando sesión:', error);
            return false;
        } finally {
            isValidatingRef.current = false;
        }
    };

    const verificarSesion = async () => {
        console.log('🔍 Verificando sesión inicial...');
        const sesionValida = await verificarYRenovarToken(true); // Forzar validación inicial
        
        if (!sesionValida) {
            const refreshToken = await AsyncStorage.getItem('refresh_token');
            if (!refreshToken) {
                console.log('🚪 No hay refresh token, cerrando sesión');
                await cerrarSesion();
            } else {
                console.log('🚪 Sesión expirada, cerrando sesión');
                Toast.show({
                    type: 'info',
                    text1: 'Sesión expirada',
                    text2: 'Por favor, inicia sesión nuevamente.',
                    position: 'top',
                });
                await cerrarSesion();
            }
        }
        
        setIsLoading(false);
    };

    const configurarRenovacionAutomatica = () => {
        // Limpiar interval anterior si existe
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        // Solo configurar renovación automática si hay usuario logueado
        if (usuario) {
            console.log('⏰ Configurando renovación automática cada 10 minutos');
            intervalRef.current = setInterval(async () => {
                console.log('🔄 Renovación automática programada ejecutándose...');
                const sesionValida = await verificarYRenovarToken();
                if (!sesionValida) {
                    console.log('🚪 Sesión inválida en renovación automática, cerrando sesión');
                    await cerrarSesion();
                }
            }, 10 * 60 * 1000); // 10 minutos
        }
    };

    // Effect para verificación inicial (solo una vez)
    useEffect(() => {
        verificarSesion();
        
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []); // Sin dependencias para ejecutar solo una vez

    // Effect separado para configurar renovación automática cuando cambie el usuario
    useEffect(() => {
        configurarRenovacionAutomatica();
        
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [usuario?.nombre]); // Solo cuando realmente cambie el usuario

    return (
        <SessionContext.Provider value={{ usuario, cerrarSesion, isLoading }}>
            {children}
        </SessionContext.Provider>
    );
};