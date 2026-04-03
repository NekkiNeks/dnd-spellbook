/**
 * Описываем структуру объекта из CSV. 
 * Все значения — строки, так как это стандарт поведения csv-parser.
 */
interface CSVRow {
    [key: string]: string;
}

/**
 * Сортирует массив объектов по нескольким полям с учетом типов (числа/строки)
 * @param data - Исходный массив данных
 * @param fields - Массив имен полей для сортировки в порядке приоритета
 * @param order - Направление: 'asc' или 'desc'
 */
export function multiLevelSort<T extends CSVRow>(
    data: T[],
    fields: string[],
    order: 'asc' | 'desc' = 'asc'
): T[] {
    if (!fields.length) {
        fields = ['level']
    };

    const modifier = order === 'desc' ? -1 : 1;

    // Создаем копию массива, чтобы не мутировать оригинал
    return [...data].sort((a, b) => {
        for (const field of fields) {
            const valA = a[field];
            const valB = b[field];

            // Если одного из полей нет в объекте, пропускаем этот уровень
            if (valA === undefined || valB === undefined) continue;

            // Пытаемся преобразовать строки в числа для корректного сравнения
            // Проверка на пустую строку важна, так как Number('') === 0
            const numA = valA.trim() !== '' ? Number(valA) : NaN;
            const numB = valB.trim() !== '' ? Number(valB) : NaN;

            const isNumA = !isNaN(numA);
            const isNumB = !isNaN(numB);

            let comparison = 0;

            if (isNumA && isNumB) {
                // Числовое сравнение
                comparison = numA - numB;
            } else {
                // Строковое сравнение с учетом локали (правильная сортировка букв)
                comparison = valA.localeCompare(valB, undefined, { numeric: true, sensitivity: 'base' });
            }

            if (comparison !== 0) {
                return comparison * modifier;
            }
        }
        return 0;
    });
}
