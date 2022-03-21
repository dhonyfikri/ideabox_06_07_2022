import {View, Text, RefreshControl} from 'react-native';
import React, {useCallback, useState} from 'react';
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
const Refresh = () => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />;
};

export default Refresh;
