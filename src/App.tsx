import React from 'react';
import {DbContextProvider} from './context/DatabaseContext';
import TaskScreen from './screens/Taks';

const App: React.FC = () => {
  return (
    <DbContextProvider>
      <TaskScreen />
    </DbContextProvider>
  );
};

export default App;
