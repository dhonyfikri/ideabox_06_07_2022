import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../utils/ColorsConfig/Colors';

const Divider = ({stroke = 1, lineColors}) => {
  const _colors = lineColors !== undefined ? lineColors : colors.divider;
  return <View style={styles.gapStyle(stroke, _colors)} />;
};

export default Divider;

const styles = StyleSheet.create({
  gapStyle: (stroke, colors) => ({
    width: '100%',
    height: stroke,
    backgroundColor: colors,
    marginVertical: 4,
  }),
});
