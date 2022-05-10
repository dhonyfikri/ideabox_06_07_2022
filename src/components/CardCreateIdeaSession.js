import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../utils/ColorsConfig/Colors';
import fonts from '../utils/FontsConfig/Fonts';
import Gap from './Gap';

const CardCreateIdeaSession = ({children, title, desc, mandatory}) => {
  return (
    <View style={styles.container}>
      {title && (
        <>
          <Text style={styles.sessionTitle}>
            {title} {mandatory && <Text style={{color: colors.alert}}>*</Text>}
          </Text>
          {desc && <Text style={styles.sessionDesc}>{desc}</Text>}
          <Gap height={16} />
        </>
      )}
      {children}
    </View>
  );
};

export default CardCreateIdeaSession;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: 32,
  },
  sessionTitle: {
    fontFamily: fonts.secondary[700],
    fontSize: 16,
    lineHeight: 25.6,
    color: colors.text.primary,
  },
  sessionDesc: {
    fontFamily: fonts.primary[400],
    fontSize: 14,
    lineHeight: 22,
    color: colors.text.tertiary2,
  },
});
