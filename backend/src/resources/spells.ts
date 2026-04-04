import { parseCsvFile } from "../utils/csv"

const classNames = ["artificer", "bard", "cleric", "druid", "paladin", "ranger", "sorcerer", "warlock", "wizard"]
const RESOURCE_REGEX = /^["\s]*\(([^)]+)\)/;

const formatName = (name: string): string => {
    return name.replace(/\[[^\]]*\]/g, '').trim();
};

function prepareItem(item: Record<string, any>) {
    const text = item.text?.trim() || "";

    const match = text.match(RESOURCE_REGEX);

    if (match) {
        // Записываем текст из скобок в поле resources
        // match[1] содержит текст БЕЗ самих скобок
        item.resources = match[1];

        // Очищаем само описание от этих скобок, чтобы данные не дублировались
        item.text = text.replace(RESOURCE_REGEX, "").trim();
    } else {
        // Если скобок в начале нет, явно ставим null
        item.resources = null;
    }

    item.name = formatName(item.name)
    item.prepared = false;
}

export async function getAllSpells(className: string) {
    if (!classNames.includes(className)) {
        throw new Error('Отсутствует класс с таким именем')
    }

    const data = await parseCsvFile(className);

    // Добавляем поле prepared
    data.forEach(prepareItem);

    return data;
}
