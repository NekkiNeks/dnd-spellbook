export interface ISpell {
    id: string;
    level: string;
    name: string;
    type: string;
    time: string;
    distance: string;
    components: string;
    resources: string | null;
    duration: string;
    text: string;
    owner: string;
    prepared: boolean;
}

export type CharClass =
    | "artificer" | "bard" | "cleric" | "druid"
    | "paladin" | "ranger" | "sorcerer" | "warlock" | "wizard";
