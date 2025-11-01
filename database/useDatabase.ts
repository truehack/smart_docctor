import { useEffect } from 'react';
import { initDatabase } from './index';

export function useDatabase() {
    useEffect(() => {
        initDatabase().catch((err) => console.error('DB init error:', err));
    }, []);
}
