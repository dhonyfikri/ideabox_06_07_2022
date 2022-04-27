import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator, Modal} from 'react-native';

const LoadingFull = ({
  visible = false,
  message = 'Loading...',
  backgroundOpacity = 0.5,
  onRequestClose,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View style={styles.wrapper(backgroundOpacity)}>
        <View style={styles.container}>
          <ActivityIndicator size="small" color="white" />
          <Text style={styles.text}>{message}</Text>
        </View>
      </View>
    </Modal>
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
