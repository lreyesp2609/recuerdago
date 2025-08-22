import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { decodeTokenWithRefresh } from '../components/config/api';
import { useThemeColors } from '../hooks/useThemeColor';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const colors = useThemeColors();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('access_token');
        const refreshToken = await AsyncStorage.getItem('refresh_token');
        
        if (!accessToken || !refreshToken) {
          setIsAuthenticated(false);
          return;
        }

        // Intentar decodificar el token (con auto-refresh si es necesario)
        await decodeTokenWithRefresh();
        setIsAuthenticated(true);
      } catch (error) {
        // Si hay algún error, limpiar tokens y enviar al login
        await AsyncStorage.removeItem('access_token');
        await AsyncStorage.removeItem('refresh_token');
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  if (isLoading) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: colors.background 
      }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="/tabs" />;
  }

  return <Redirect href="/auth/inicio_sesion" />;
}