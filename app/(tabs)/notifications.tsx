import { Screen } from '@/components/screen';
import { Text } from 'react-native-paper';

export default function Notifications() {
    return (
        <Screen style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' }}>
            <Text style={{ color: 'white' }}>Уведомления</Text>
        </Screen>
    );
}

