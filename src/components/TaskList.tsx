import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import TaskItem from '@components/TaskItem';
import {Task} from '@models/task';

interface TaskListProps {
  tasks: {id: number; text: string; completed: boolean}[];
  onToggle: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({tasks, onToggle, onDelete}) => {
  return (
    <FlatList
      data={tasks}
      renderItem={({item}) => (
        <TaskItem task={item} onToggle={onToggle} onDelete={onDelete} />
      )}
      keyExtractor={item => item.id.toString()}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TaskList;
