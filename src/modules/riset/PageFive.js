import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const PageFive = () => {
  return (
    <View style={styles.page}>
      <Text>PageFive</Text>
    </View>
  );
};

export default PageFive;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
