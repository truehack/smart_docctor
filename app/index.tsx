import { useDatabase } from '@/database/useDatabase';
import { Redirect } from 'expo-router';

export default function Index() {
    useDatabase();

    return <Redirect href="/(tabs)/schedule" />;
}
