import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

interface TaskFilterProps {
  filter: 'all' | 'completed';
  onFilterChange: (filter: 'all' | 'completed') => void;
  total: number;
}

const TaskFilter: React.FC<TaskFilterProps> = ({
  filter,
  onFilterChange,
  total,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, filter === 'all' && styles.activeButton]}
        onPress={() => onFilterChange('all')}>
        <Text
          style={[
            styles.buttonText,
            filter === 'all' && styles.activeButtonText,
          ]}>
          See All ({total})
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, filter === 'completed' && styles.activeButton]}
        onPress={() => onFilterChange('completed')}>
        <Text
          style={[
            styles.buttonText,
            filter === 'completed' && styles.activeButtonText,
          ]}>
          Completed
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#e1e3fc',
  },
  button: {
    width: '50%',
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#cccdfb',
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
    fontFamily: 'Quicksand-Regular',
  },
  activeButtonText: {
    // fontWeight: 'bold',
  },
});

export default TaskFilter;
