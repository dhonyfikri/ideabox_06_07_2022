import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const PageSeven = () => {
  return (
    <View style={styles.page}>
      <Text>PageSeven</Text>
    </View>
  );
};

export default PageSeven;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
