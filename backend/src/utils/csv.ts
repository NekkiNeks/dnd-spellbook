import csv from 'csv-parser'
import fs from 'node:fs'
import path from 'node:path';

export async function parseCsvFile(filename: string): Promise<Record<string, any>[] | null> {
    const cleanName = filename.endsWith('.csv') ? filename : `${filename}.csv`;
    const filePath = path.resolve(__dirname, '../../assets', cleanName);

    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return null;
    }

    // Сразу типизируем массив результатов
    const results: Record<string, any>[] = [];

    // Указываем тип возвращаемого значения для Промиса
    return new Promise<Record<string, any>[]>((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv({
                separator: ';',
                headers: ['level', 'name', 'type', 'time', 'distance', 'foo', 'duration', 'text', 'owner']
            }))
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (err) => reject(err));
    });
}
