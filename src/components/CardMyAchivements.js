import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import fonts from '../utils/FontsConfig/Fonts';
import {colors} from '../utils/ColorsConfig/Colors';
import Gap from './Gap';
import Divider from './Divider';

const CardMyAchivements = ({achievement = []}) => {
  return (
    <>
      {achievement.map((item, index) => {
        return (
          <>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>
              {item.desc} {item.date}
            </Text>
            {index + 1 !== achievement.length && (
              <>
                <Gap height={8} />
                <Divider colors={colors.divider2} />
                <Gap height={8} />
              </>
            )}
          </>
        );
      })}
    </>
  );
};

export default CardMyAchivements;

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.secondary[600],
    fontSize: 12,
    lineHeight: 15,
    color: colors.text.primary,
  },
  desc: {
    fontFamily: fonts.primary[400],
    fontSize: 12,
    lineHeight: 22,
    color: colors.text.tertiary2,
  },
});
