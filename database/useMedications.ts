import { useEffect, useState, useCallback } from 'react';
import * as SQLite from 'expo-sqlite';

export type MedicationForm = 'tablet' | 'drop' | 'spray' | 'other';
export type ScheduleType = 'daily' | 'weekly_days' | 'every_x_days';

export interface Medication {
    id?: number;
    server_id?: number;
    name: string;
    form: MedicationForm;
    instructions?: string;
    start_date: string;
    end_date?: string | null;
    schedule_type: ScheduleType;
    weekly_days?: string | null;
    interval_days?: number | null;
    times_list: string;
    synced?: boolean;
}

const db = SQLite.openDatabaseSync('app.db');

async function initMedicationsTable() {
    await db.execAsync(`
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS medications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      server_id INTEGER UNIQUE,
      name TEXT NOT NULL,
      form TEXT NOT NULL CHECK(form IN ('tablet', 'drop', 'spray', 'other')),
      instructions TEXT,
      start_date DATE NOT NULL,
      end_date DATE,
      schedule_type TEXT NOT NULL CHECK(schedule_type IN ('daily', 'weekly_days', 'every_x_days')),
      weekly_days TEXT,
      interval_days INTEGER CHECK (interval_days > 0 AND interval_days <= 30),
      times_list TEXT NOT NULL,
      synced BOOLEAN NOT NULL DEFAULT FALSE
    );
  `);
}

export function useMedications() {
    const [medications, setMedications] = useState<Medication[]>([]);
    const [loading, setLoading] = useState(true);

    const getMedications = useCallback(async () => {
        try {
            const rows = await db.getAllAsync<Medication>(
                'SELECT * FROM medications ORDER BY id DESC',
            );
            setMedications(rows);
        } catch (err) {
            console.error('Ошибка получения медикаментов:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const addMedication = useCallback(
        async (med: Medication) => {
            try {
                await db.runAsync(
                    `INSERT INTO medications 
          (name, form, instructions, start_date, end_date, schedule_type, weekly_days, interval_days, times_list)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        med.name,
                        med.form,
                        med.instructions ?? null,
                        med.start_date,
                        med.end_date ?? null,
                        med.schedule_type,
                        med.weekly_days ?? null,
                        med.interval_days ?? null,
                        med.times_list,
                    ],
                );
                await getMedications();
            } catch (err) {
                console.error('Ошибка добавления медикамента:', err);
                throw err;
            }
        },
        [getMedications],
    );

    useEffect(() => {
        (async () => {
            await initMedicationsTable();
            await getMedications();
        })();
    }, [getMedications]);

    return { medications, loading, addMedication, reload: getMedications };
}
