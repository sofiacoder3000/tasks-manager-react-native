import {useDbContext} from '../context/DatabaseContext';
import {Task, TaskDTO} from '@models/task';
import {tasksDB} from '@database/tasksDb.utils';
import {useState} from 'react';

export function useTasks() {
  const db = useDbContext();
  const [tasks, setTasks] = useState<Task[]>([]);

  async function refreshList() {
    const _tasks = await getTasksFromDB();
    setTasks(_tasks);
  }

  async function initializeTasks() {
    if (tasks.length === 0) {
      await refreshList();
    }
  }

  function getTasks(): Task[] {
    return tasks;
  }

  async function getTasksFromDB(): Promise<Task[]> {
    return tasksDB.getTasks(db);
  }

  async function addTask(newTask: TaskDTO): Promise<void> {
    tasksDB.saveTask(db, newTask).then(refreshList);
  }

  async function editTask(task: Task): Promise<void> {
    tasksDB.editTask(db, task).then(refreshList);
  }

  function toggleTask(id: number) {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? {...task, completed: !task.completed} : task,
      ),
    );
  }

  async function deleteTask(idTask: number): Promise<void> {
    if (idTask !== undefined) {
      return tasksDB.deleteTask(db, idTask).then(refreshList);
    }
    return Promise.reject(Error('Could not delete an undefined list'));
  }

  return {
    tasks,
    initializeTasks,
    getTasks,
    addTask,
    editTask,
    toggleTask,
    deleteTask,
  };
}
