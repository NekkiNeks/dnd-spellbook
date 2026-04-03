import DatabaseConstructor, { Database } from "better-sqlite3";
const database: Database = new DatabaseConstructor('test.db', {})

export default database;

