import { useState } from 'preact/hooks';
import type { ISpell } from '../types';
import '../styles/spellcard.css'

interface SpellCardProps {
    spell: ISpell;
    enablePrepared: (spellId: string) => void;
    disablePrepared: (spellId: string) => void;
}

function removeBrackets(str: string): string {
    return str.replace(/\[[^\]]*\]/g, '').trim();
}
export function SpellCard({ spell, enablePrepared, disablePrepared }: SpellCardProps) {
    const [isOpened, setIsOpened] = useState(false);
    // const [isPrepared, setIsPrepared] = useState(false);

    const handleToggle = () => {
        setIsOpened(!isOpened);
    };

    function handlePrepareClick(e: Event) {
        e.stopPropagation()
        spell.prepared ? disablePrepared(spell.id) : enablePrepared(spell.id)
    }
    return (
        <div
            className={`card ${isOpened ? 'opened' : ''} ${spell.prepared ? 'prepared' : ''}`}
            onClick={handleToggle}
        >
            <div className="card-header">
                <span className="level">Lvl {spell.level}</span>
                <p className="name">{removeBrackets(spell.name)}</p>
                <p className="components">{spell.components.split(', ').join('')}</p>
            </div>

            <div className="card-body">

                <hr />
                <button className="prepare-button" onClick={handlePrepareClick}>
                    {spell.prepared ? 'Удалить из подготовленных' : 'Подготовить'}
                </button>
                <div className="stats">
                    <p><strong>Тип заклинания:</strong> {spell.type}</p>
                    <p><strong>Время каста:</strong> {spell.time}</p>
                    <p><strong>Дистанция:</strong> {spell.distance}</p>
                    <p><strong>Время действия:</strong> {spell.duration}</p>
                    <p><strong>Компоненты:</strong> {spell.components}</p>
                    {
                        spell.resources &&
                        <p><strong>Ресурс для сотворения:</strong> {spell.resources}</p>
                    }
                </div>
                <hr />

                <p
                    className="description"
                    dangerouslySetInnerHTML={{ __html: spell.text }}
                />
            </div>

            <div className="card-footer">
            </div>
        </div >
    );
}



