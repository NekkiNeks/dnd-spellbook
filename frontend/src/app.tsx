import { useState, useEffect, useMemo } from 'preact/hooks';
import { SpellCard } from './components/SpellCard';
import { LevelFilter } from './components/LevelFilter';
import { ClassSelector } from './components/ClassSelector';
import './styles/app.css'
import type { ISpell, CharClass } from './types';
import {
    clearIdsInLocalStorage,
    removeIdFromLocalStorage,
    addIdToLocalStorage,
    getIdsFromLocalStorage,
    getClassFromLocalStorage,
    setClassToLocalStorage,
} from './functions/localhost'
import { updateColorByClass } from './functions/colors';

// const API_URL = import.meta.env.VITE_API_URL;
const API_URL = `http://${window.location.hostname}:3333`;

async function apiRequest<T>(url: string): Promise<T> {
    try {
        // Проверка на наличие переменной
        if (!API_URL) throw new Error('В переменных окружения отуствует переменная VITE_API_URL')

        const response = await fetch(url);
        if (!response.ok) throw new Error(`Ошибка при запросе к API: ${response.status}`)

        const result = await response.json();
        const data = result.data as T

        return data;
    } catch (error) {
        throw error
    }
}

export function App() {
    // Состояния
    const [selectedClass, setSelectedClass] = useState<CharClass>(getClassFromLocalStorage());
    const [spells, setSpells] = useState<ISpell[]>([]);
    const [activeLevels, setActiveLevels] = useState<Set<number>>(new Set());
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showPrepared, setShowPrepared] = useState<boolean>(false)
    const [firstLoad, setFirstLoad] = useState<boolean>(true)

    // Загрузка данных при смене класса
    useEffect(() => {
        const fetchSpells = async () => {
            setLoading(true);
            setError(null);
            try {
                let data = await apiRequest<ISpell[]>(`${API_URL}/spells/${selectedClass}`)

                if (firstLoad) {
                    // Получение ID из localStorage
                    const savedIds = getIdsFromLocalStorage()

                    data = data.map(spell => ({
                        ...spell,
                        prepared: savedIds.has(spell.id)
                    }));

                    updateColorByClass(selectedClass)

                    setFirstLoad(false)
                }

                setSpells(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Не удалось загрузить данные');
            } finally {
                setLoading(false);
            }
        };

        fetchSpells();
    }, [selectedClass]);

    // ФИЛЬТРАЦИЯ ЗАКЛИНАНИЙ
    const filteredSpells = useMemo(() => {
        return spells.filter(spell => {
            // 1. Фильтр по уровню: 
            const matchesLevel = activeLevels.size === 0 || activeLevels.has(parseInt(spell.level));

            // 2. Фильтр по подготовке: 
            const matchesPrepared = !showPrepared || spell.prepared === true;

            // Заклинание остается в массиве, только если оба условия выполнены
            return matchesLevel && matchesPrepared;
        });
    }, [spells, activeLevels, showPrepared]);

    // Обработчик смены класса (логика остается прежней, запросы пойдут по value)
    function handleClassChange(newClass: CharClass) {
        setSelectedClass(newClass);
        setClassToLocalStorage(newClass)
        updateColorByClass(newClass)
        setActiveLevels(new Set()); // Сбрасываем уровни при смене класса
    };

    // Логика переключения уровней в фильтре
    function toggleLevel(level: number) {
        const newLevels = new Set(activeLevels);
        if (newLevels.has(level)) {
            newLevels.delete(level);
        } else {
            newLevels.add(level);
        }
        setActiveLevels(newLevels);
    };

    // ЗАГОТОВЛЕННЫЕ ЗАКЛИНАНИЯ

    function enablePrepared(spellId: string) {
        const newSpells = spells.map(spell => spell.id === spellId ? { ...spell, prepared: true } : spell)
        addIdToLocalStorage(spellId)
        setSpells(newSpells)
    }
    function disablePrepared(spellId: string) {
        const newSpells = spells.map(spell => spell.id === spellId ? { ...spell, prepared: false } : spell)
        removeIdFromLocalStorage(spellId)
        setSpells(newSpells)
    }

    function clearPrepared() {
        const newSpells = spells.map(spell => {
            return { ...spell, prepared: false }
        })
        clearIdsInLocalStorage()
        setSpells(newSpells)
    }

    function toggleShowPrepared() {
        setShowPrepared(!showPrepared)
    }

    return (
        <div className="container">
            <header>
                <h1>D&D 5.5 Spellbook</h1>

                <ClassSelector
                    selectedClass={selectedClass}
                    onClassChange={handleClassChange}
                />
            </header>

            {error && <div className="error">{error}</div>}

            {loading ? (
                <div className="loader">Изучение магических свитков...</div>
            ) : (
                <div className="grid">
                    {filteredSpells.map(spell => (
                        <SpellCard
                            key={spell.id}
                            spell={spell}
                            enablePrepared={enablePrepared}
                            disablePrepared={disablePrepared}
                        />
                    ))}
                </div>
            )}

            {/* Фиксированное меню уровней снизу */}
            <LevelFilter
                activeLevels={activeLevels}
                toggleLevel={toggleLevel}
                togglePrepared={toggleShowPrepared}
                handleClearPrepared={clearPrepared}
                showPrepared={showPrepared}
            />
        </div>
    );
}
