import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Link } from 'expo-router';
import { Screen } from '@/components/screen';

export default function Onboarding1() {
    return (
        <Screen style={styles.container}>
            <Text style={styles.title}>
                Не забывайте принимать лекарства вовремя!
            </Text>
            <Text style={styles.subtitle}>
                Наше приложение напомнит вам о каждом приёме лекарств — даже
                если вы заняты, устали или в дороге.
            </Text>

            <View style={styles.pagination}>
                <View style={[styles.dot, styles.activeDot]} />
                <View style={styles.dot} />
                <View style={styles.dot} />
            </View>

            <Link href="/onboarding/screen2" asChild>
                <Button mode="text">Далее</Button>
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
        marginBottom: 40,
        lineHeight: 22,
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
    nextButton: {
        marginTop: 20,
    },
});
