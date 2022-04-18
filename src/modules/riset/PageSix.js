import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const PageSix = () => {
  return (
    <View style={styles.page}>
      <Text>PageSix</Text>
    </View>
  );
};

export default PageSix;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
