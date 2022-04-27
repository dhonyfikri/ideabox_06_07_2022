import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors} from '../utils/ColorsConfig/Colors';
import fonts from '../utils/FontsConfig/Fonts';
import Divider from './Divider';
import Gap from './Gap';

const CardMyIdeas = ({myIdeas = []}) => {
  return (
    <>
      {myIdeas.map((item, index) => {
        return (
          <TouchableOpacity
            key={index.toString()}
            onPress={() => {
              console.log(`index ${index} clicked`);
            }}>
            <View style={styles.main}>
              <Image style={styles.picture} source={item.picture} />
              <Gap width={12} />
              <Text numberOfLines={4} style={styles.title}>
                {item.title}
              </Text>
            </View>
            <Gap height={8} />
            <Text numberOfLines={2} style={styles.desc}>
              {item.desc}
            </Text>
            {index + 1 !== myIdeas.length && (
              <>
                <Gap height={8} />
                <Divider lineColors={colors.divider2} />
                <Gap height={8} />
              </>
            )}
          </TouchableOpacity>
        );
      })}
    </>
  );
};

export default CardMyIdeas;

const styles = StyleSheet.create({
  main: {flexDirection: 'row', width: '83.5%', alignItems: 'center'},
  picture: {width: 100, height: 100, borderRadius: 6, resizeMode: 'cover'},
  title: {
    flex: 1,
    fontFamily: fonts.secondary[600],
    fontSize: 12,
    lineHeight: 15,
    color: colors.text.tertiary3,
  },
  desc: {
    fontFamily: fonts.primary[400],
    fontSize: 12,
    lineHeight: 22,
    color: colors.text.tertiary2,
  },
});
