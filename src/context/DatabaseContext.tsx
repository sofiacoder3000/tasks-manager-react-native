import {SQLiteDatabase} from 'react-native-sqlite-storage';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import {getDbConnection, initDb} from '../database/db';
import {useIsAppForeground} from '../hooks/useIsAppForeground';
import {StyleSheet, Text, View} from 'react-native';

const DbContext = createContext<SQLiteDatabase | undefined>(undefined);

export function DbContextProvider({children}: PropsWithChildren<any>) {
  const [loading, setLoading] = useState(true);
  const [db, setDb] = useState<SQLiteDatabase | undefined>(undefined);
  const isForeground = useIsAppForeground();

  useEffect(() => {
    async function closeDb(): Promise<void> {
      if (db === undefined) {
        return;
      }
      const status = await db.close();
      console.log('[db] Database closed is background.');
      console.log(status);
    }

    async function initDatabase(): Promise<void> {
      if (db !== undefined) {
        await getDbConnection();
      }
    }

    if (!isForeground) {
      closeDb();
    } else {
      initDatabase();
    }
  }, [db, isForeground]);

  useEffect(() => {
    let _db: SQLiteDatabase;
    async function getConnection() {
      try {
        _db = await getDbConnection();
        await initDb(_db);
        setDb(_db);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getConnection();
    return () => {
      if (_db !== undefined && _db !== null) {
        _db.close();
      }
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.content}>Init DB...</Text>
      </View>
    );
  }
  return <DbContext.Provider value={db}>{children}</DbContext.Provider>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#6A5AE0',
    justifyContent: 'center',
    color: '#fff',
  },
  content: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Quicksand-Regular',
  },
});

// Hook to pull our database object from the context and return it.
// Inspired by the Kent C. Dodds approach to using context: https://kentcdodds.com/blog/how-to-use-react-context-effectively
export function useDbContext() {
  const database = useContext(DbContext);
  if (database === undefined) {
    throw new Error('useDbContext must be used within a DbContextProvider');
  }
  return database;
}
