import React, { useCallback, useState, useMemo } from 'react';
import { View, FlatList, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useMedications } from '@/database/useMedications';
import { Screen } from '@/components/screen';
import dayjs from 'dayjs';

export default function Schedule() {
  const { medications, reload, loading, markMedicationTaken, unmarkMedicationTaken } = useMedications();

  const navigation = useNavigation();

  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [takenMeds, setTakenMeds] = useState<Record<number, boolean>>({}); // id -> true/false

  // при возврате на экран — обновляем
  useFocusEffect(
    useCallback(() => {
    (async () => {
      if (typeof reload === 'function') await reload();

      const takenState: Record<number, boolean> = {};
      for (const m of medications) {
        try {
          const list = m.taken_dates ? JSON.parse(m.taken_dates) : [];
          if (list.includes(selectedDate)) takenState[m.id!] = true;
        } catch {}
      }
      setTakenMeds(takenState);
    })();
  }, [reload, selectedDate])
);

  // неделя (3 дня до, 3 после)
  const weekDays = useMemo(() => {
    const today = dayjs();
    return Array.from({ length: 7 }).map((_, i) => today.add(i - 3, 'day'));
  }, []);

  const parseTimes = (raw?: string) => {
    if (!raw) return [];
    try {
      const p = JSON.parse(raw);
      if (Array.isArray(p)) return p;
    } catch {
      const s = String(raw).replace(/[\[\]"]/g, '');
      return s.split(',').map(x => x.trim()).filter(Boolean);
    }
    return [];
  };

  const medsForDate = useMemo(() => {
    return (medications || []).filter((m) => {
      if (!m || !m.start_date) return false;
      const start = dayjs(m.start_date, 'YYYY-MM-DD');
      const end = m.end_date ? dayjs(m.end_date, 'YYYY-MM-DD') : null;
      const current = dayjs(selectedDate, 'YYYY-MM-DD');

      if (end) {
        return (
          (current.isSame(start, 'day') || current.isAfter(start, 'day')) &&
          (current.isSame(end, 'day') || current.isBefore(end, 'day'))
        );
      }
      return current.isSame(start, 'day');
    });
  }, [medications, selectedDate]);

  // обработчик "принятия"
  const handleTake = async (id: number) => {
    await markMedicationTaken(id, selectedDate);
    setTakenMeds(prev => ({ ...prev, [id]: true }));
  };

  // обработчик "не принятия"
  const handleSkip = async (id: number) => {
    await unmarkMedicationTaken(id, selectedDate);
    setTakenMeds(prev => ({ ...prev, [id]: false }));
  };

  // окно выбора действия
  const handlePressMed = (item: any) => {
    const taken = takenMeds[item.id];
    Alert.alert(
      item.name,
      'Отметить приём?',
      [
        {
          text: taken ? 'Снять отметку' : 'Принять 💊',
          onPress: () => handleTake(item.id),
        },
        {
          text: 'Не принять ❌',
          onPress: () => handleSkip(item.id),
          style: 'cancel',
        },
        {
          text: 'Закрыть',
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Загрузка...</Text>
      </View>
    );
  }

  return (
    <Screen style={{ flex: 1, backgroundColor: '#121212', padding: 16 }}>
      {/* 📅 календарь */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 10, marginTop: 5 }}
        contentContainerStyle={{ paddingVertical: 4 }}
      >
        {weekDays.map((date) => {
          const formatted = date.format('YYYY-MM-DD');
          const isSelected = formatted === selectedDate;
          return (
            <TouchableOpacity
              key={formatted}
              onPress={() => setSelectedDate(formatted)}
              style={{
                backgroundColor: isSelected ? '#4A3AFF' : '#1E1E1E',
                borderRadius: 25,
                width: 52,
                height: 52,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 12,
                shadowColor: '#000',
                shadowOpacity: isSelected ? 0.4 : 0.15,
                shadowRadius: 3,
                elevation: isSelected ? 4 : 1,
              }}
            >
              <Text
                style={{
                  color: isSelected ? 'white' : '#bbb',
                  fontWeight: '600',
                  fontSize: 16,
                }}
              >
                {date.format('DD')}
              </Text>
              <Text style={{ color: isSelected ? 'white' : '#888', fontSize: 10 }}>
                {date.format('dd').toUpperCase()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* 📌 Заголовок */}
      <View
        style={{
          marginTop: -250,
          marginBottom: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text
          variant="titleLarge"
          style={{
            color: 'white',
            fontWeight: '700',
            fontSize: 20,
          }}
        >
          Расписание {dayjs(selectedDate).format('DD MMM')}
        </Text>
      </View>

      {/* 💊 список медикаментов */}
      <FlatList
        data={medsForDate}
        keyExtractor={(item) => String(item?.id ?? Math.random())}
        renderItem={({ item }) => {
          const times = parseTimes(item.times_list).join(', ') || '—';
          const desc = `${item.instructions || ''}`.trim();
          const taken = takenMeds[item.id];

          return (
            <TouchableOpacity onPress={() => handlePressMed(item)}>
              <Card
                style={{
                  backgroundColor: '#1E1E1E',
                  borderRadius: 14,
                  marginVertical: 8,
                  padding: 16,
                  borderWidth: taken ? 2 : 0,
                  borderColor: taken ? '#4A3AFF' : 'transparent',
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      backgroundColor: '#2C2C2C',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 14,
                    }}
                  >
                    <Text style={{ fontSize: 22 }}>
                      {taken
                        ? '✅'
                        : item.form === 'tablet'
                        ? '💊'
                        : item.form === 'drop'
                        ? '💧'
                        : item.form === 'spray'
                        ? '🌫️'
                        : '❓'}
                    </Text>
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: '600',
                        textDecorationLine: taken ? 'line-through' : 'none',
                      }}
                    >
                      {item.name}
                    </Text>
                    {desc ? (
                      <Text style={{ color: '#aaa', fontSize: 13 }}>{desc}</Text>
                    ) : null}
                    <Text style={{ color: '#777', fontSize: 12, marginTop: 4 }}>⏰ {times}</Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <Text style={{ color: '#888', textAlign: 'center', marginTop: 30 }}>
            На эту дату нет медикаментов.
          </Text>
        }
      />
    </Screen>
  );
}








