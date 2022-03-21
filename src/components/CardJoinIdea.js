import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {ArrowDown, ArrowUp, Trash} from '../assets/icon';
import style from '../config/Style/style.cfg';
const CardJoinIdea = props => {
  return (
    <View style={styles.cardContent}>
      <View style={{flexDirection: 'row', height: 80}}>
        <View style={styles.title}>
          <Text style={style.h5}>{props.title}</Text>
        </View>
        <View style={styles.title}>
          <Text style={[style.h5, {textTransform: 'capitalize'}]}>
            {props.name}
          </Text>
        </View>
        <View style={styles.email}>
          <Text style={style.h5}>{props.createdDate}</Text>
        </View>
      </View>
    </View>
  );
};

export default CardJoinIdea;

const styles = StyleSheet.create({
  title: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 5,
  },
  email: {
    flex: 1,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title2: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  email2: {
    flex: 1,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    flex: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
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
});
