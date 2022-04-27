import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {colors} from '../utils/ColorsConfig/Colors';
import {IcChevronLeft, IcNotificationBell} from '../assets/icon';
import Gap from './Gap';
import fonts from '../utils/FontsConfig/Fonts';

const Header = ({
  backButton,
  onBackPress,
  onNotificationPress,
  backText,
  title,
  withLogo,
}) => {
  return (
    <View style={styles.container}>
      {backButton && (
        <TouchableOpacity
          onPress={onBackPress}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
          }}>
          <IcChevronLeft />
          <Gap width={4} />
          <Text style={styles.backText}>{backText}</Text>
        </TouchableOpacity>
      )}
      {withLogo && (
        <Image
          style={{
            width: 70,
            height: 28,
            resizeMode: 'contain',
            marginRight: 16,
            marginLeft: backButton ? 0 : 16,
          }}
          source={require('../assets/image/img_header_logo.png')}
        />
      )}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: backButton ? 0 : 16,
        }}>
        {title && <Text style={styles.titleText}>{title}</Text>}
      </View>
      <TouchableOpacity
        onPress={onNotificationPress}
        style={{
          justifyContent: 'center',
          paddingHorizontal: 16,
        }}>
        <IcNotificationBell />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    justifyContent: 'space-between',
    elevation: 6,
  },
  backText: {
    color: colors.text.secondary,
    fontFamily: fonts.secondary[400],
    fontSize: 14,
    lineHeight: 18,
  },
  titleText: {
    color: colors.text.secondary,
    fontFamily: fonts.secondary[400],
    fontSize: 16,
    lineHeight: 20,
  },
});
