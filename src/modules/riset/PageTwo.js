import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const PageTwo = () => {
  return (
    <View style={styles.page}>
      <Text>PageTwo</Text>
    </View>
  );
};

export default PageTwo;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
});
