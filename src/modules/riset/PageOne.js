import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const PageOne = () => {
  return (
    <View style={styles.page}>
      <Text>PageOne</Text>
    </View>
  );
};

export default PageOne;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
