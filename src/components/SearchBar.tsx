import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SearchBarProps {
  onSearch: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({onSearch}) => {
  const [searchText, setSearchText] = useState('');

  const handleClear = () => {
    setSearchText('');
    onSearch('');
  };

  return (
    <View style={styles.container}>
      <Icon name="search" size={20} color="#ccc" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search task"
        placeholderTextColor="#ccc"
        value={searchText}
        onChangeText={text => {
          setSearchText(text);
          onSearch(text);
        }}
      />
      {searchText.length > 0 && (
        <TouchableOpacity onPress={handleClear}>
          <Icon
            name="close-circle"
            size={20}
            color="#ccc"
            style={styles.clearIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    color: '#333',
    borderColor: '#ccc',
    fontSize: 16,
    fontFamily: 'Quicksand-Regular',
  },
  clearIcon: {
    marginLeft: 10,
  },
});

export default SearchBar;
