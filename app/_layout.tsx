import { Stack } from 'expo-router';
import { MD3DarkTheme, PaperProvider } from 'react-native-paper';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';

// кастомная тёмная тема
const DarkThemeCustom = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    background: '#121212',   // фон всего приложения
    surface: '#121212',      // фон карточек и TextInput
    onSurface: 'white',      // цвет текста на поверхностях
    primary: '#4A3AFF',      // основной цвет
    onPrimary: 'white',
    outline: '#121212',      // рамки TextInput
  },
};

export default function RootLayout() {
  return (
    <PaperProvider theme={DarkThemeCustom}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <Stack initialRouteName="onboarding/index" screenOptions={{
          headerStyle: { backgroundColor: DarkThemeCustom.colors.background },
          headerTintColor: DarkThemeCustom.colors.onBackground,
          headerShown: false,
        }}>
          <Stack.Screen name="onboarding/index" />
          <Stack.Screen name="onboarding/screen2" />
          <Stack.Screen name="onboarding/screen3" />
          <Stack.Screen name="tabs" />
        </Stack>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

