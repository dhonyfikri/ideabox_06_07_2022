import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../utils/ColorsConfig/Colors';
import fonts from '../utils/FontsConfig/Fonts';
import Gap from './Gap';

const LeanCanvasItem = ({title, content = [], mandatory}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
        {mandatory && <Text style={styles.mandatory}>*</Text>}
      </Text>
      <View style={styles.contentCantainer}>
        {content.length > 0 ? (
          content.map((item, index) => (
            <View style={{flexDirection: 'row', marginBottom: 2}}>
              <View style={{minWidth: 10}}>
                <Text style={styles.contentNumberText}>{index + 1 + '.'}</Text>
              </View>
              <Gap width={5} />
              <Text style={styles.contentText}>{item}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.contentText}>-</Text>
        )}
      </View>
    </View>
  );
};

export default LeanCanvasItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  title: {
    color: colors.text.primary,
    fontFamily: fonts.secondary[600],
    fontSize: 12,
    lineHeight: 15,
    marginBottom: 15,
    marginTop: 4,
  },
  mandatory: {
    color: 'red',
  },
  contentCantainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  contentNumberText: {
    fontFamily: fonts.secondary[600],
    color: colors.text.secondary,
    fontSize: 12,
    lineHeight: 15,
  },
  contentText: {
    flex: 1,
    fontFamily: fonts.secondary[400],
    color: colors.text.secondary,
    fontSize: 12,
    lineHeight: 15,
  },
});
