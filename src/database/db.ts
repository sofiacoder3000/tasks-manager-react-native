import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';
import {version as appVersion} from '../../package.json';
import {createTasksDefault, createTable} from './tasks';

export async function getDbConnection(): Promise<SQLiteDatabase> {
  const db = await SQLite.openDatabase({
    name: `TASKS_${appVersion}.db`,
    location: 'default',
  });
  return db;
}

export const existTableCreated = async (
  database: SQLiteDatabase,
  tableName: string,
): Promise<boolean> => {
  const query = `SELECT COUNT(*) AS "Exists" FROM sqlite_master WHERE type = "table" AND name = "${tableName}";`;
  return database.executeSql(query).then(([results]: any) => {
    if (results.rows && results.rows.length > 0) {
      const itemOne = results.rows.item(0);
      return itemOne.Exists ? true : false;
    } else {
      return false;
    }
  });
};

export async function updateDatabaseTables(
  database: SQLite.SQLiteDatabase,
): Promise<void> {
  console.log('Beginning database updates...');
  const existTable = await existTableCreated(database, 'tasks');
  if (!existTable) {
    await createTable(database);
    console.log('Tablas creadas');
    await createTasksDefault(database);
    console.log('Data dafault creadas');
  }
}

export async function initDb(db: SQLiteDatabase): Promise<void> {
  console.log('Init db .......');
  SQLite.DEBUG(true);
  SQLite.enablePromise(true);
  await updateDatabaseTables(db);
}
