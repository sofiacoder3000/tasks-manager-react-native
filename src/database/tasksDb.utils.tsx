import {ResultSet, SQLiteDatabase} from 'react-native-sqlite-storage';
import {Task, TaskDTO} from '@models/task';

interface ITasksDatabase {
  getTasks(db: SQLiteDatabase): Promise<Task[]>;
  saveTask(db: SQLiteDatabase, task: TaskDTO): Promise<[ResultSet]>;
  saveTasks(db: SQLiteDatabase, task: TaskDTO[]): Promise<[ResultSet]>;
  editTask(db: SQLiteDatabase, task: Task): Promise<void>;
  deleteTask(db: SQLiteDatabase, idTask: number): Promise<[ResultSet]>;
}

const tableName = 'tasks';

export const getTasks = async (db: SQLiteDatabase): Promise<Task[]> => {
  try {
    const taskItems: Task[] = [];
    const results = await db.executeSql(
      `SELECT rowid as id, text, completed FROM ${tableName}`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        taskItems.push(result.rows.item(index));
      }
    });
    return taskItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get taskItems !!!');
  }
};

export const saveTask = async (db: SQLiteDatabase, task: TaskDTO) => {
  const insertQuery = `INSERT OR REPLACE INTO ${tableName}( text, completed) 
  values ( '${task.text}', ${task.completed})`;

  return db.executeSql(insertQuery);
};

export const saveTasks = async (db: SQLiteDatabase, taskItems: TaskDTO[]) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}( text, completed) values` +
    taskItems.map(_task => `('${_task.text}', '${_task.completed}')`).join(',');

  return db.executeSql(insertQuery);
};

async function editTask(db: SQLiteDatabase, task: Task): Promise<void> {
  const {id, text, completed} = task;
  return db
    .executeSql(`UPDATE ${tableName} SET text= ?, completed= ? WHERE id = ?;`, [
      text,
      completed,
      id,
    ])
    .then(([results]) => {
      console.log(
        `[db] ${tableName} with "${text}" updated successfully with id: ${results.insertId}`,
      );
    });
}

export const deleteTask = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  return db.executeSql(deleteQuery);
};

export const tasksDB: ITasksDatabase = {
  getTasks,
  saveTask,
  saveTasks,
  editTask,
  deleteTask,
};
