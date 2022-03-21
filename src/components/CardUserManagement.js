import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {Trash} from '../assets/icon';
import style from '../config/Style/style.cfg';

const CardContentManagement = props => {
  return (
    <TouchableNativeFeedback onPress={props.onPress}>
      <View style={styles.cardContent}>
        <View style={styles.title}>
          <Text style={style.h5}>{props.title}</Text>
        </View>
        <View style={styles.email}>
          <Text style={style.h5}>{props.email}</Text>
        </View>
        <View style={styles.title}>
          <Text style={style.h5}>{props.nik}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default CardContentManagement;

const styles = StyleSheet.create({
  title: {
    flex: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  email: {
    flex: 3,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    height: 80,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    marginBottom: 10,
    marginTop: 10,
  },
});
