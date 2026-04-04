import '../styles/levelfilter.css'
import { useState } from 'preact/hooks';

interface LevelFilterProps {
    activeLevels: Set<number>;
    toggleLevel: (level: number) => void;
    togglePrepared: () => void;
    handleClearPrepared: () => void
    showPrepared: boolean;
}

export function LevelFilter({ activeLevels, toggleLevel, showPrepared, togglePrepared, handleClearPrepared }: LevelFilterProps) {
    const levels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const [hidden, setHidden] = useState(false)

    function toggleHidden() {
        setHidden(!hidden)
    }

    return (
        <div className={hidden ? "level-filter-fixed hidden" : "level-filter-fixed"}>
            <button className="hide-btn" onClick={toggleHidden}> {hidden ? 'Показать' : 'Спрятать'} </button>

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
