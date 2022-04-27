import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Gap = ({width = 0, height = 0}) => {
  return <View style={styles.gapStyle(width, height)} />;
};

export default Gap;

const styles = StyleSheet.create({
  gapStyle: (width, height) => ({
    width: width,
    height: height,
  }),
});
