import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import fonts from '../utils/FontsConfig/Fonts';
import {colors} from '../utils/ColorsConfig/Colors';

const InitialIcon = ({
  name = '-',
  width,
  height,
  marginLeft = 0,
  fontSize = 12,
}) => {
  const background = [
    'blue',
    'darkorange',
    'green',
    'brown',
    'red',
    'olive',
    'navy',
    'purple',
    'teal',
    'deeppink',
    'forestgreen',
  ];
  return (
    <View
      style={{
        width: width,
        height: height,
        borderRadius: width / 2,
        backgroundColor: background[name.length % background.length],
        marginLeft: marginLeft,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
      {name && (
        <Text
          style={{
            ...styles.initialText,
            fontSize: fontSize,
            lineHeight: fontSize + 4,
          }}>
          {name
            .trim()
            .split(' ')
            .map(item => item.slice(0, 1).toUpperCase())
            .slice(0, 2)}
        </Text>
      )}
    </View>
  );
};

const InitialNumberIcon = ({number, width, height}) => {
  return (
    <View
      style={{
        width: width,
        height: height,
        borderRadius: width / 2,
        backgroundColor: colors.divider,
        marginLeft: -5,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
      <Text style={{...styles.initialText, color: colors.text.primary}}>
        {'+'}
        {number <= 9 ? number : 9}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  initialText: {
    fontFamily: fonts.secondary[400],
    fontSize: 12,
    lineHeight: 16,
    color: colors.white,
  },
});

export {InitialIcon, InitialNumberIcon};
