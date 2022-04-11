import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';

const LoadingFull = ({message, backgroundOpacity}) => {
  const textToShow = message !== undefined ? message : 'Loading...';
  const alphaColor = backgroundOpacity !== undefined ? backgroundOpacity : 0.5;
  return (
    <View style={styles.wrapper(alphaColor)}>
      <View style={styles.container}>
        <ActivityIndicator size="small" color="white" />
        <Text style={styles.text}>{textToShow}</Text>
      </View>
    </View>
  );
};

export default LoadingFull;

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
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#085D7A',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#aaaaaa',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {color: 'white', marginLeft: 15, fontSize: 15},
});
