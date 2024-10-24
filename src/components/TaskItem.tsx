import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Task} from '@models/task';
import {CheckBox} from '@rneui/base';

interface TaskItemProps {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({task, onToggle, onDelete}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onToggle(task)} style={styles.row}>
        <CheckBox
          checked={task.completed}
          onPress={() => onToggle(task)}
          containerStyle={styles.checkbox}
          checkedColor="#fff000"
        />
        <View style={styles.textContainer}>
          <Text style={[styles.text, task.completed && styles.completed]}>
            {task.text}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => onDelete(task)}
          style={styles.deleteTask}>
          <Text style={styles.text}>X</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#6A5AE0',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginRight: 10,
  },
  checkboxText: {
    color: '#fff',
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Quicksand-Regular',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#fff',
  },
  deleteTask: {
    minHeight: 48,
    minWidth: 48,
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});

export default TaskItem;
