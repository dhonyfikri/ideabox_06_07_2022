import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

const RefreshFull = ({
  message,
  onPress,
  disabled,
  onOffsetTouch,
  backgroundOpacity,
}) => {
  const textToShow = message !== undefined ? message : 'Failed';
  const opacity = backgroundOpacity !== undefined ? backgroundOpacity : 0.5;
  return (
    <TouchableOpacity
      style={styles.wrapper(opacity)}
      onPress={onOffsetTouch}
      activeOpacity={onOffsetTouch ? 0.2 : 1}>
      <View style={styles.container}>
        <Image
          style={{width: 60, height: 60, marginBottom: 5}}
          source={require('../assets/image/noInternet.png')}
        />
        <Text style={styles.message}>{textToShow}</Text>
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
    color: '#085D7A',
    fontSize: 15,
    marginBottom: 15,
    textAlign: 'center',
  },
  button: disabled => ({
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: disabled ? '#888888' : '#085D7A',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#aaaaaa',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  text: {color: 'white', marginLeft: 10, fontSize: 15},
});
