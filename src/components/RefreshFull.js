import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {colors} from '../utils/ColorsConfig/Colors';
import fonts from '../utils/FontsConfig/Fonts';
import Gap from './Gap';

const RefreshFull = ({
  visible,
  message = 'Failed to retrieve data, server error',
  onPress,
  disabled,
  onOffsetTouch,
  backgroundOpacity,
}) => {
  const opacity = backgroundOpacity !== undefined ? backgroundOpacity : 0.5;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onOffsetTouch}>
      <TouchableOpacity
        style={styles.wrapper(opacity)}
        onPress={onOffsetTouch}
        activeOpacity={onOffsetTouch ? 0.2 : 1}>
        <View style={styles.container}>
          <Image
            style={{width: 80, height: 80, marginBottom: 5}}
            source={require('../assets/image/il_confused.png')}
          />
          <Gap height={10} />
          <Text style={styles.message}>{message}</Text>
          <Gap height={16} />
          <TouchableOpacity
            style={styles.button(disabled)}
            onPress={onPress}
            disabled={disabled}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../assets/image/refresh.png')}
            />
            <Text style={styles.text}>Refresh</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default RefreshFull;

const styles = StyleSheet.create({
  wrapper: opacity => ({
    width: '100%',
    height: '100%',
    backgroundColor: `rgba(0, 0, 0, ${opacity})`,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  }),
  container: {
    padding: 20,
    backgroundColor: '#eeeeee',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#888888',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontFamily: fonts.secondary[400],
    color: colors.text.primary,
    fontSize: 12,
    textAlign: 'center',
  },
  button: disabled => ({
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: disabled ? '#888888' : colors.primary,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  text: {
    fontFamily: fonts.secondary[500],
    color: 'white',
    marginLeft: 10,
    fontSize: 12,
    lineHeight: 15,
  },
});
