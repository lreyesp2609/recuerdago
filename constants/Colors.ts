/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#4E8AF4';
const tintColorDark = '#5A9DFF';

export const Colors = {
  light: {
    text: '#11181C',
    textSecondary: '#666666',
    textTertiary: '#999999',
    background: '#f8f9fa',
    surface: '#ffffff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    primary: '#4E8AF4',
    secondary: '#FF6B6B',
    inputBackground: '#ffffff',
    inputBorder: '#dddddd',
    inputIcon: '#cccccc',
    placeholder: '#999999',
    border: '#e0e0e0',
    shadow: '#000000',
    floatingBg: 'rgba(255, 255, 255, 0.95)',
  },
  dark: {
    text: '#ECEDEE',
    textSecondary: '#b3b3b3',
    textTertiary: '#888888',
    background: '#121212',
    surface: '#1e1e1e',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    primary: '#5A9DFF',
    secondary: '#FF7B7B',
    inputBackground: '#2a2a2a',
    inputBorder: '#404040',
    inputIcon: '#888888',
    placeholder: '#666666',
    border: '#333333',
    shadow: '#000000',
    floatingBg: 'rgba(30, 30, 30, 0.95)',
  },
};