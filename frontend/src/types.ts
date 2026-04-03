export interface ISpell {
    id: number;
    level: string;
    name: string;
    type: string;
    time: string;
    distance: string;
    foo: string;
    duration: string;
    text: string;
    owner: string;
}

export type CharClass =
    | "artificer" | "bard" | "cleric" | "druid"
    | "paladin" | "ranger" | "sorcerer" | "warlock" | "wizard";
