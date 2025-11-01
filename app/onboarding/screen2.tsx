import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Link } from 'expo-router';
import { Screen } from '@/components/screen';

export default function Onboarding2() {
    return (
        <Screen style={styles.container}>
            <Text style={styles.title}>Напоминания под ваш график</Text>
            <Text style={styles.subtitle}>
                Вы сами выбираете время, частоту и название препарата. Мы будем
                напоминать — мягко, но надёжно.
            </Text>

            <View style={styles.icon}>
                <Text style={{ fontSize: 60 }}>⏰</Text>
            </View>

            <View style={styles.pagination}>
                <View style={styles.dot} />
                <View style={[styles.dot, styles.activeDot]} />
                <View style={styles.dot} />
            </View>

            <View style={styles.buttonRow}>
                <Link href="/onboarding" asChild>
                    <Button mode="text">Назад</Button>
                </Link>
                <Link href="/onboarding/screen3" asChild>
                    <Button mode="text">Далее</Button>
                </Link>
            </View>
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
        marginBottom: 30,
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
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
    },
});
