import {useEffect, useState} from 'react';
import {AppState} from 'react-native';

export function useIsAppForeground() {
  const [isForeground, setForeGround] = useState(true);

  console.log('isForeground: ' + isForeground);
  useEffect(() => {
    const list = AppState.addEventListener('change', nextAppState => {
      console.log('nextAppState: ' + nextAppState);
      setForeGround(nextAppState === 'active');
    });

    return () => {
      list.remove();
    };
  }, []);

  return isForeground;
}
