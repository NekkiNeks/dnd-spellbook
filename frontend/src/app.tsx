import { useState, useEffect, useMemo } from 'preact/hooks';
import { SpellCard } from './components/SpellCard';
import { LevelFilter } from './components/LevelFilter';
import { ClassSelector } from './components/ClassSelector';
import './styles/app.css'
import type { ISpell, CharClass } from './types';

const CLASSES: CharClass[] = [
    "artificer", "bard", "cleric", "druid",
    "paladin", "ranger", "sorcerer", "warlock", "wizard"
];

/**
 * Функция для очистки названия от текста в квадратных скобках
 * Например: "Fireball [Wizard]" -> "Fireball"
 */
const formatName = (name: string): string => {
    return name.replace(/\[[^\]]*\]/g, '').trim();
};

export function App() {
    // Состояния
    const [selectedClass, setSelectedClass] = useState<CharClass>(CLASSES[0]);
    const [spells, setSpells] = useState<ISpell[]>([]);
    const [activeLevels, setActiveLevels] = useState<Set<number>>(new Set());
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Загрузка данных при смене класса
    useEffect(() => {
        const fetchSpells = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:3333/spells/${selectedClass}`);
                if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);

                const result = await response.json();
                const data: ISpell[] = Array.isArray(result) ? result : result.data;

                // Сразу при получении очищаем имена во всем массиве
                const cleanedData = data.map(s => ({
                    ...s,
                    name: formatName(s.name)
                }));

                setSpells(cleanedData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Не удалось загрузить данные');
            } finally {
                setLoading(false);
            }
        };

        fetchSpells();
    }, [selectedClass]);

    // Логика переключения уровней в фильтре
    const toggleLevel = (level: number) => {
        const newLevels = new Set(activeLevels);
        if (newLevels.has(level)) {
            newLevels.delete(level);
        } else {
            newLevels.add(level);
        }
        setActiveLevels(newLevels);
    };

    // Фильтрация: если Set пустой — показываем всё, если нет — только выбранные уровни
    const filteredSpells = useMemo(() => {
        if (activeLevels.size === 0) return spells;
        return spells.filter(s => activeLevels.has(parseInt(s.level)));
    }, [spells, activeLevels]);

    // Обработчик смены класса (логика остается прежней, запросы пойдут по value)
    const handleClassChange = (newClass: CharClass) => {
        setSelectedClass(newClass);
        setActiveLevels(new Set()); // Сбрасываем уровни при смене класса
    };

    return (
        <div className="container">
            <header>
                <h1>D&D 5e Spellbook</h1>

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
                    {filteredSpells.map((spell, index) => (
                        <SpellCard
                            key={`${selectedClass}-${spell.name}-${index}`}
                            spell={spell}
                        />
                    ))}
                </div>
            )}

            {/* Фиксированное меню уровней снизу */}
            <LevelFilter
                activeLevels={activeLevels}
                toggleLevel={toggleLevel}
            />
        </div>
    );
}
