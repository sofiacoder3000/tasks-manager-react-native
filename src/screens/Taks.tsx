import React, {useCallback, useEffect, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import TaskInput from '@components/TaskInput';
import TaskList from '@components/TaskList';
import SearchBar from '@components/SearchBar';
import TaskFilter from '@components/TaskFilter';
import {Task, TaskDTO} from '@models/task';
import {useTasks} from '@hooks/useTasks';

const TaskScreen: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState<'all' | 'completed'>('all');
  const {tasks, initializeTasks, addTask, editTask} = useTasks();

  const loadDataCallback = useCallback(async () => {
    try {
      initializeTasks();
    } catch (error) {
      console.error(error);
    }
  }, [initializeTasks]);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  const handleAddTask = async (text: string) => {
    if (!text.trim()) return;
    try {
      const newTask: TaskDTO = {
        text,
        completed: false,
      };
      addTask(newTask);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleTask = (_task: Task) => {
    editTask({..._task, completed: !_task.completed});
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.text
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesFilter =
      filter === 'all' || (filter === 'completed' && task.completed);
    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Image
          source={require('../../assets/worker.png')}
          style={styles.backgroundImage}
          resizeMode="cover"></Image>
        <Text style={styles.titleContent}>Task Manager</Text>
      </View>
      <View style={styles.content}>
        <SearchBar onSearch={setSearchText} />
        <TaskFilter
          filter={filter}
          onFilterChange={setFilter}
          total={tasks.length}
        />
        <TaskInput onAddTask={handleAddTask} />
        <TaskList tasks={filteredTasks} onToggle={handleToggleTask} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#6A5AE0',
    justifyContent: 'flex-end',
    color: '#fff',
  },
  backgroundImage: {
    position: 'absolute',
    right: 12,
    bottom: 0,
    width: 180,
    height: 180,
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  titleContent: {
    fontSize: 34,
    color: '#fff',
    width: '50%',
    fontFamily: 'Quicksand-Medium',
    position: 'relative',
  },
  content: {
    height: '75%',
    backgroundColor: '#f0f4fd',
    borderTopStartRadius: 26,
    borderTopEndRadius: 26,
    padding: 20,
    paddingTop: 30,
  },
});

export default TaskScreen;
