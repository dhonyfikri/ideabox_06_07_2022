import React from 'react';
import {StyleSheet, View, TouchableOpacity, TextInput} from 'react-native';
import {Drawer, Notif, Search} from '../assets/icon';
import {windowHeight} from './WindowDimensions';

const Header = props => {
  return (
    <View style={styles.container}>
      <View style={styles.sideIcon}>
        <TouchableOpacity onPress={props.onPress}>
          <Drawer />
        </TouchableOpacity>
      </View>
      <View style={styles.sideIcon}>
        <TouchableOpacity onPress={props.notification}>
          <Notif />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: windowHeight / 13,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  sideIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
