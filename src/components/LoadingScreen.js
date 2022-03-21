import React from 'react';
import {StyleSheet, ActivityIndicator, View, Alert, Modal} from 'react-native';

const LoadingScreen = navigation => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        navigation.goBack();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.centeredcontainer}>
          <ActivityIndicator size="large" color="#085D7A" />
        </View>
      </View>
    </Modal>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  // Modal View style
  centeredcontainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
  },
});
