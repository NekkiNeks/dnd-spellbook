import { parseCsvFile } from "../utils/csv"

const classNames = ["artificer", "bard", "cleric", "druid", "paladin", "ranger", "sorcerer", "warlock", "wizard"]

export async function getAllSpells(className: string) {
    if (!classNames.includes(className)) {
        throw new Error('Отсутствует класс с таким именем')
    }

    const data = await parseCsvFile(className);

    // Добавляем поле id для каждого item
    data.forEach((item, index) => {
        item.id = index;
    });

    return data;
}
