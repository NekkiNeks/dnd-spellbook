import '../styles/levelfilter.css'

interface LevelFilterProps {
    activeLevels: Set<number>;
    toggleLevel: (level: number) => void;
    togglePrepared: () => void;
    handleClearPrepared: () => void
    showPrepared: boolean;
}

export function LevelFilter({ activeLevels, toggleLevel, showPrepared, togglePrepared, handleClearPrepared }: LevelFilterProps) {
    const levels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <div className="level-filter-fixed">
            <div className="filter-grid">
                {levels.map((lvl) => (
                    <button
                        key={lvl}
                        type="button"
                        className={`button level-btn ${activeLevels.has(lvl) ? 'active' : ''}`}
                        onClick={() => toggleLevel(lvl)}
                    >
                        {lvl}
                    </button>
                ))}
            </div>
            <div className="prepared-buttons">
                <button className={showPrepared ? 'active button' : 'button'} onClick={togglePrepared}> Показать подготовленные </button>
                <button className="button " onClick={handleClearPrepared}> Очистить все подготовленные </button>
            </div>
        </div >
    );
}
