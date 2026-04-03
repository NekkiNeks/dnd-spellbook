import '../styles/levelfilter.css'

interface LevelFilterProps {
    activeLevels: Set<number>;
    toggleLevel: (level: number) => void;
}

export function LevelFilter({ activeLevels, toggleLevel }: LevelFilterProps) {
    const levels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <div className="level-filter-fixed">
            <div className="filter-grid">
                {levels.map((lvl) => (
                    <button
                        key={lvl}
                        type="button"
                        className={`level-btn ${activeLevels.has(lvl) ? 'active' : ''}`}
                        onClick={() => toggleLevel(lvl)}
                    >
                        {lvl}
                    </button>
                ))}
            </div>
        </div>
    );
}
