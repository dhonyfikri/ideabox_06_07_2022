import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../utils/ColorsConfig/Colors';
import fonts from '../utils/FontsConfig/Fonts';

const CardMySkills = ({skills = []}) => {
  return (
    <View style={styles.container(skills.length > 0)}>
      {skills.map((item, index) => {
        return (
          <View key={index.toString()} style={styles.tag(false)}>
            <Text style={styles.tagText}>{item}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default CardMySkills;

const styles = StyleSheet.create({
  container: dataAvailable => ({
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginBottom: dataAvailable ? -8 : 0,
  }),
  tag: isLast => ({
    borderWidth: 1,
    borderColor: colors.border2,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 32,
    marginRight: isLast ? 0 : 8,
    marginBottom: 8,
  }),
  tagText: {
    color: colors.text.tertiary2,
    fontFamily: fonts.secondary[600],
    fontSize: 12,
    lineHeight: 15,
  },
});
