import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Link } from 'expo-router';
import { Screen } from '@/components/screen';

export default function Onboarding3() {
    return (
        <Screen style={styles.container}>
            <Text style={styles.title}>Всё готово!</Text>
            <Text style={styles.subtitle}>
                Теперь вы всегда будете в курсе приёма лекарств. Здоровье — в
                ваших руках!
            </Text>

            <View style={styles.icon}>
                <Text style={{ fontSize: 60 }}>✅</Text>
            </View>

            <View style={styles.pagination}>
                <View style={styles.dot} />
                <View style={styles.dot} />
                <View style={[styles.dot, styles.activeDot]} />
            </View>

            <Link href="/(tabs)/schedule" asChild>
                <Button mode="contained" style={styles.startButton}>
                    Начать использовать
                </Button>
            </Link>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 22,
    },
    icon: {
        marginBottom: 30,
    },
    pagination: {
        flexDirection: 'row',
        marginBottom: 40,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ccc',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#3498db',
    },
    startButton: {
        width: '80%',
    },
});
