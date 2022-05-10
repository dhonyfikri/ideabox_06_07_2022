import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../utils/ColorsConfig/Colors';

const Divider = ({
  stroke = 1,
  lineColors,
  width = '100%',
  marginVertical = 4,
}) => {
  const _colors = lineColors !== undefined ? lineColors : colors.divider;
  return (
    <View style={styles.gapStyle(stroke, _colors, width, marginVertical)} />
  );
};

export default Divider;

const styles = StyleSheet.create({
  gapStyle: (stroke, colors, width, marginVertical) => ({
    width: width,
    height: stroke,
    backgroundColor: colors,
    marginVertical: marginVertical,
  }),
});
