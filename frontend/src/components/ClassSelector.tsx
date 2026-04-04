import type { CharClass } from '../types';

// Словарь соответствий: техническое имя -> русское имя
const CLASS_LABELS: Record<CharClass, string> = {
    artificer: "Изобретатель",
    bard: "Бард",
    cleric: "Жрец",
    druid: "Друид",
    paladin: "Паладин",
    ranger: "Следопыт",
    sorcerer: "Чародей",
    warlock: "Колдун",
    wizard: "Волшебник"
};

interface ClassSelectorProps {
    selectedClass: CharClass;
    onClassChange: (newClass: CharClass) => void;
}

export function ClassSelector({ selectedClass, onClassChange }: ClassSelectorProps) {
    // Список ключей из нашего словаря
    const classes = Object.keys(CLASS_LABELS) as CharClass[];


    return (
        <div className="selector-wrapper">
            <select
                id="class-select"
                value={selectedClass}
                onChange={(e) => onClassChange((e.target as HTMLSelectElement).value as CharClass)}
                className="class-dropdown"
            >
                {classes.map((cls) => (
                    <option key={cls} value={cls}>
                        {CLASS_LABELS[cls]} {/* Здесь выводится русский текст */}
                    </option>
                ))}
            </select>
        </div>
    );
}

