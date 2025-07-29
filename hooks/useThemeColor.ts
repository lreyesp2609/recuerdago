/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

// Hook adicional para obtener todos los colores del tema actual
export function useThemeColors() {
  const theme = useColorScheme() ?? 'light';
  const isDark = theme === 'dark';
  
  return {
    ...Colors[theme],
    isDark,
    theme,
  };
}

// Hook para obtener colores específicos con fallback
export function useThemedColor(
  lightColor: string,
  darkColor: string
): string {
  const theme = useColorScheme() ?? 'light';
  return theme === 'dark' ? darkColor : lightColor;
}