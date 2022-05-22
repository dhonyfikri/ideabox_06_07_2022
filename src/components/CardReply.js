import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {IcCloseLight} from '../assets/icon';
import {colors} from '../utils/ColorsConfig/Colors';
import fonts from '../utils/FontsConfig/Fonts';
import Gap from './Gap';

const CardReply = ({name, onClosePress}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const handleFadeIn = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    handleFadeIn();
  }, [name]);

  return (
    <Animated.View style={{...styles.container, opacity: fadeAnim}}>
      <Text numberOfLines={1} style={styles.text}>
        Reply to {name}
      </Text>
      <Gap width={16} />
      <TouchableOpacity onPress={onClosePress}>
        <IcCloseLight />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CardReply;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    marginHorizontal: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  text: {
    flex: 1,
    fontFamily: fonts.primary[600],
    fontSize: 12,
    lineHeight: 22,
    color: colors.white,
  },
});
