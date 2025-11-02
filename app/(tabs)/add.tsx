import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput, Dialog, Portal, useTheme } from 'react-native-paper';
import { MedicationForm, ScheduleType, useMedications } from '@/database/useMedications';
import { Screen } from '@/components/screen';
import { useNavigation } from '@react-navigation/native';

export default function Add() {
    const { addMedication } = useMedications();
    const navigation = useNavigation();
    const theme = useTheme();

    const [name, setName] = useState('');
    const [form, setForm] = useState<MedicationForm>('tablet');
    const [startDate, setStartDate] = useState('');
    const [scheduleType, setScheduleType] = useState<ScheduleType>('daily');
    const [timesList, setTimesList] = useState('');
    const [formDialogVisible, setFormDialogVisible] = useState(false);

    const handleAdd = async () => {
        if (!name || !form || !startDate || !scheduleType || !timesList) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        await addMedication({
            name,
            form,
            start_date: startDate,
            schedule_type: scheduleType,
            times_list: JSON.stringify(timesList.split(',').map((t) => t.trim())),
        });

        alert('Медикамент добавлен!');
        navigation.goBack();
    };

    const formOptions = [
        { key: 'tablet', label: '💊 Таблетка' },
        { key: 'drop', label: '💧 Капли' },
        { key: 'spray', label: '🌫️ Спрей' },
        { key: 'other', label: '❓ Другое' },
    ];

    return (
        <Screen style={{ flex: 1, backgroundColor: '#121212', justifyContent: 'center', padding: 20 }}>
            <Text variant="titleLarge" style={{ marginBottom: 10, color: 'white' }}>
                Добавить медикамент
            </Text>

            <TextInput
                label="Название"
                value={name}
                onChangeText={setName}
                mode="outlined"
                style={{ marginBottom: 8, backgroundColor: '#121212' }} // фон поля как экран
                textColor="white"
                outlineColor="#444"
                activeOutlineColor="#4A3AFF"
            />

            <TextInput
                label="Форма"
                value={formOptions.find((o) => o.key === form)?.label || form}
                mode="outlined"
                style={{ marginBottom: 8, backgroundColor: '#121212' }} // фон поля
                editable={false}
                textColor="white"
                outlineColor="#444"
                activeOutlineColor="#4A3AFF"
                right={<TextInput.Icon icon="chevron-down" onPress={() => setFormDialogVisible(true)} />}
            />

            <TextInput
                label="Дата начала (YYYY-MM-DD)"
                value={startDate}
                onChangeText={setStartDate}
                mode="outlined"
                style={{ marginBottom: 8, backgroundColor: '#121212' }} // фон поля
                textColor="white"
                outlineColor="#444"
                activeOutlineColor="#4A3AFF"
            />

            <TextInput
                label="Тип расписания (например: weekly_days)"
                value={scheduleType}
                onChangeText={(val) => setScheduleType(val as ScheduleType)}
                mode="outlined"
                style={{ marginBottom: 8, backgroundColor: '#121212' }} // фон поля
                textColor="white"
                outlineColor="#444"
                activeOutlineColor="#4A3AFF"
            />

            <TextInput
                label="Время приёма (через запятую, напр. 08:00, 20:00)"
                value={timesList}
                onChangeText={setTimesList}
                mode="outlined"
                style={{ marginBottom: 8, backgroundColor: '#121212' }} // фон поля
                textColor="white"
                outlineColor="#444"
                activeOutlineColor="#4A3AFF"
            />


            <Button mode="contained" onPress={handleAdd} style={{ backgroundColor: '#4A3AFF' }}>
                Добавить
            </Button>

            {/* Диалог выбора формы */}
            <Portal>
                <Dialog visible={formDialogVisible} onDismiss={() => setFormDialogVisible(false)}>
                    <Dialog.Title style={{ color: 'white' }}>Выбери форму</Dialog.Title>
                    <Dialog.Content>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {formOptions.map((option) => (
                                <Button
                                    key={option.key}
                                    mode={form === option.key ? 'contained' : 'outlined'}
                                    onPress={() => {
                                        setForm(option.key as MedicationForm);
                                        setFormDialogVisible(false);
                                    }}
                                    style={{ margin: 4 }}
                                >
                                    {option.label}
                                </Button>
                            ))}
                        </View>
                    </Dialog.Content>
                </Dialog>
            </Portal>
        </Screen>
    );
}


