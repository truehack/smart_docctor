import React, { useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { Text, Card, useTheme, Button } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useMedications } from '@/database/useMedications';
import { Screen } from '@/components/screen';

export default function Schedule() {
    const { medications, loading, reload } = useMedications();
    const navigation = useNavigation();
    const theme = useTheme();

    // 🔁 автоматическое обновление при возвращении на экран
    useFocusEffect(
        useCallback(() => {
            reload();
        }, [reload])
    );

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Загрузка...</Text>
            </View>
        );
    }

    const days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
    const today = new Date().getDay(); // 0 = воскресенье

    return (
        <Screen style={{ flex: 1, backgroundColor: '#121212', paddingHorizontal: 16, paddingTop: 20 }}>
            {/* 📅 Панель дней недели */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                {days.map((day, i) => {
                    const isToday = (i + 1) % 7 === today;
                    return (
                        <View
                            key={day}
                            style={{
                                backgroundColor: isToday ? '#4A3AFF' : '#1E1E1E',
                                borderRadius: 25,
                                width: 36,
                                height: 36,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    color: isToday ? 'white' : '#aaa',
                                    fontWeight: '600',
                                }}
                            >
                                {day}
                            </Text>
                        </View>
                    );
                })}
            </View>

            {/* Заголовок */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text
                    variant="titleLarge"
                    style={{
                        color: 'white',
                        marginBottom: 12,
                        fontWeight: '700',
                    }}
                >
                    Медикаменты
                </Text>
                <Button
                    mode="contained"
                    onPress={() => navigation.navigate('Add' as never)}
                    style={{
                        marginBottom: 8,
                        backgroundColor: '#4A3AFF',
                    }}
                >
                    Добавить
                </Button>
            </View>

            {/* 💊 Список медикаментов */}
            <FlatList
                data={medications}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => {
                    const status = 'Не принято';
                    const statusColor = '#FF3B30';
                    const time = item.times_list || '—';
                    const desc = `${item.dosage || ''} ${item.form || ''}`.trim();

                    return (
                        <View style={{ marginBottom: 16 }}>
                            <Text
                                style={{
                                    color: '#aaa',
                                    marginBottom: 4,
                                    fontSize: 14,
                                    fontWeight: '600',
                                }}
                            >
                                {time}{' '}
                                <Text style={{ color: statusColor, fontWeight: '500' }}>{status}</Text>
                            </Text>

                            <Card
                                mode="contained"
                                style={{
                                    backgroundColor: '#1E1E1E',
                                    borderRadius: 12,
                                    paddingVertical: 12,
                                    paddingHorizontal: 16,
                                }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 20,
                                            backgroundColor: '#2C2C2C',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginRight: 12,
                                        }}
                                    >
                                        <Text style={{ fontSize: 20 }}>
                                            {item.form === 'tablet'
                                            ? '💊'
                                            : item.form === 'drop'
                                            ? '💧'
                                            : item.form === 'spray'
                                            ? '🧴'
                                            : '❓'}
                                        </Text>
                                    </View>


                                    <View style={{ flex: 1 }}>
                                        <Text
                                            style={{
                                                color: 'white',
                                                fontSize: 16,
                                                fontWeight: '600',
                                                marginBottom: 2,
                                            }}
                                        >
                                            {item.name}
                                        </Text>
                                        <Text style={{ color: '#ccc', fontSize: 13 }}>
                                            {desc || '—'}
                                        </Text>
                                    </View>
                                </View>
                            </Card>
                        </View>
                    );
                }}
                ListEmptyComponent={
                    <Text style={{ color: '#999', textAlign: 'center', marginTop: 40 }}>
                        Пока нет медикаментов. Нажми «Добавить».
                    </Text>
                }
            />
        </Screen>
    );
}
