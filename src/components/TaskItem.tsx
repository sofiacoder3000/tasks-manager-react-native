import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Task} from '@models/task';
import {CheckBox} from '@rneui/base';

interface TaskItemProps {
  task: Task;
  onToggle: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({task, onToggle}) => {
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
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
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
});

export default TaskItem;
