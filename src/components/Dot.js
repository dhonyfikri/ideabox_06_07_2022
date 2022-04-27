import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../utils/ColorsConfig/Colors';

const Dot = ({width = 4, height = 4}) => {
  return <View style={styles.gapStyle(width, height)} />;
};

export default Dot;

const styles = StyleSheet.create({
  gapStyle: (width, height) => ({
    width: width,
    height: height,
    backgroundColor: colors.dot,
    borderRadius: height / 2,
  }),
});
