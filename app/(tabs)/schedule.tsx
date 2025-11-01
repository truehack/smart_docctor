import React from 'react';
import { View, FlatList } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useMedications } from '@/database/useMedications';
import { Screen } from '@/components/screen';

export default function MedicationsScreen() {
    const { medications, loading, addMedication, reload } = useMedications();

    const handleAdd = async () => {
        await addMedication({
            name: 'Залупа',
            form: 'tablet',
            start_date: '2025-10-01',
            schedule_type: 'weekly_days', 
            times_list: JSON.stringify(['08:00', '20:00']),
        });
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>Загрузка...</Text>
            </View>
        );
    }

    return (
        <Screen style={{ justifyContent: 'center', padding: 20 }}>
            <Button mode="contained" onPress={handleAdd}>
                Добавить медикамент
            </Button>

            <Button mode="outlined" onPress={reload} style={{ marginTop: 8 }}>
                Обновить
            </Button>

            <FlatList
                data={medications}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <View
                        style={{
                            padding: 12,
                            borderBottomWidth: 1,
                            borderColor: '#ccc',
                        }}
                    >
                        <Text variant="titleMedium">{item.name}</Text>
                        <Text variant="bodySmall">{item.form}</Text>
                        <Text variant="bodySmall">{item.instructions}</Text>
                        <Text variant="bodySmall">{item.times_list}</Text>
                        <Text variant="bodySmall">{item.schedule_type}</Text>
                    </View>
                )}
                style={{ marginTop: 16 }}
            />
        </Screen>
    );
}
