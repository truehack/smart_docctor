import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScreenProps, Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper';

export type Tab = ScreenProps & {
    path: string;
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

export const tabs: Tab[] = [
    { name: 'Расписание', path: 'schedule', icon: 'home' },
    { name: 'Добавить', path: 'add', icon: 'plus' },
    { name: 'Уведомления', path: 'notifications', icon: 'account' },
    { name: 'Настройки', path: 'settings', icon: 'cog' },
];

export default function TabsLayout() {
    const theme = useTheme();

    return (
        <Tabs
            initialRouteName="schedule"
            screenOptions={() => ({
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
                tabBarStyle: {
                    backgroundColor: theme.colors.background,
                },
            })}
        >
            {tabs.map((tab) => (
                <Tabs.Screen
                    key={tab.name}
                    name={tab.path}
                    options={{
                        title: tab.name,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name={tab.icon}
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />
            ))}
        </Tabs>
    );
}
