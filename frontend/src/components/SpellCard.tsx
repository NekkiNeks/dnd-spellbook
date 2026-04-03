import { useState } from 'preact/hooks';
import type { ISpell } from '../types';
import '../styles/spellcard.css'

interface SpellCardProps {
    spell: ISpell;
}

function removeBrackets(str: string): string {
    return str.replace(/\[[^\]]*\]/g, '').trim();
}
export function SpellCard({ spell }: SpellCardProps) {
    const [isOpened, setIsOpened] = useState(false);
    const [isPrepared, setIsPrepared] = useState(false);

    const handleToggle = () => {
        setIsOpened(!isOpened);
    };

    function handlePrepareClick(e: Event) {
        e.stopPropagation()
        setIsPrepared(!isPrepared)
    }
    return (
        <div
            className={`card ${isOpened ? 'opened' : ''} ${isPrepared ? 'prepared' : ''}`}
            onClick={handleToggle}
        >
            <div className="card-header">
                <span className="level">Lvl {spell.level}</span>
                <p className="name">{removeBrackets(spell.name)}</p>
            </div>

            <div className="card-body">
                <div className="stats">
                    <p><strong>Тип заклинания:</strong> {spell.type}</p>
                    <p><strong>Время каста:</strong> {spell.time}</p>
                    <p><strong>Дистанция:</strong> {spell.distance}</p>
                    <p><strong>Время действия:</strong> {spell.duration}</p>
                </div>
                <hr />

                <p
                    className="description"
                    dangerouslySetInnerHTML={{ __html: spell.text }}
                />


                <button className="prepare-button" onClick={handlePrepareClick}>
                    {isPrepared ? 'Удалить из подготовленных' : 'Подготовить'}
                </button>
            </div>

            <div className="card-footer">
            </div>
        </div >
    );
}



