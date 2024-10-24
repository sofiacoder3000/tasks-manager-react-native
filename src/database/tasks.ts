import {enablePromise, SQLiteDatabase} from 'react-native-sqlite-storage';
import {TaskDTO} from '../models/task';

const tableName = 'tasks';
export const tasksDefault: TaskDTO[] = [
  {text: 'Wake Up', completed: true},
  {text: 'Clean the house', completed: false},
  {text: 'Cooking food', completed: false},
  {text: 'Wash the clothes', completed: false},
];

enablePromise(true);

export const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        completed BOOLEAN NOT NULL
    );`;

  await db.executeSql(query);
};

export const deleteTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${tableName}`;

  await db.executeSql(query);
};

export const createTasksDefault = async (
  database: SQLiteDatabase,
): Promise<void> => {
  try {
    let query = `INSERT INTO ${tableName} (text, completed) VALUES`;
    for (let i = 0; i < tasksDefault.length; ++i) {
      query =
        query +
        "('" +
        tasksDefault[i].text +
        "'," +
        tasksDefault[i].completed +
        ')';
      if (i !== tasksDefault.length - 1) {
        query = query + ',';
      }
    }
    query = query + ';';
    let multipleInsert = await database.executeSql(query, []);
  } catch (error) {
    console.error(error);
  }
};
